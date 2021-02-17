import { request } from "./request";

function transformPermissions(rawPermissionsArray) {
  const removeEmptySubject = ({ subject }) => Boolean(subject);

  const applicationPermissions = ({ subject }) =>
    subject.includes("application::");

  const onlyUpdates = ({ action }) => action.includes("update");

  const permissions = rawPermissionsArray
    .filter(removeEmptySubject)
    .filter(applicationPermissions)
    .filter(onlyUpdates)
    .map((permission) => ({
      ...permission,
      subject: permission.subject.replace("application::", "").split(".").pop(),
    }))
    .reduce((acc, curr) => {
      acc[curr.subject] = curr;

      return acc;
    }, {});

  return permissions;
}

export async function getCollectionTypes() {
  const permissionsRes = await request(
    "http://localhost:1337/admin/users/me/permissions"
  );

  const { data: permissions } = await permissionsRes.json();
  const filteredPermissionsMap = transformPermissions(permissions);

  const res = await request(
    "http://localhost:1337/content-manager/content-types"
  );
  const { data: collectionTypes } = await res.json();

  const collectionTypesMap = {};

  collectionTypes.forEach((collectionType) => {
    const label = collectionType.info.label.toLowerCase();
    const apiID = collectionType.apiID;

    const permission = filteredPermissionsMap[apiID];

    if (permission) {
      const allowedToUpdate = permission.fields.reduce((acc, curr) => {
        acc[curr] = true;

        return acc;
      }, {});

      collectionTypesMap[label] = { allowedToUpdate };
    }
  });

  return collectionTypesMap;
}

export function hasPermissionToUpdate(collectionTypeLabel, fieldName) {
  const collectionType = window.STRAPI_COLLECTION_TYPES[collectionTypeLabel];

  if (!collectionType) {
    return false;
  }

  if (!collectionType.allowedToUpdate) {
    return false;
  }

  if (!collectionType.allowedToUpdate[fieldName]) {
    return false;
  }

  return true;
}
