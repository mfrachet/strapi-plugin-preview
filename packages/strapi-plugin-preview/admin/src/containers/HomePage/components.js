import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: #aaa;
  justify-content: center;
  overflow: auto;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 8px 16px;
  background: white;
`;

export const Anchor = styled.a`
  padding: 8px 16px;
  font-size: 16px;
  display: block;
  background: #efefef;
  border-radius: 3px;

  margin-top: ${(props) => (props.noMargin ? "16px" : "calc(16px + 60px)")};
  margin-bottom: 8px;
  margin-left: 16px;
  margin-right: 16px;
`;
