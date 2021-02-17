import React from "react";
import { withTheme, ThemeProvider, css, Global } from "@emotion/react";
import { Wrapper } from "./Wrapper";

const toPx = (x) => `${x}px`;
const toRem = (x) => `${x}rem`;

const breakpoints = {
  mobile: 360,
  phablet: 550,
  tablet: 750,
  desktop: 1000,
  hd: 1300,
};
const createMediaQuery = (breakpoint) => `@media (min-width: ${breakpoint}px)`;

const defaultTheme = {
  breakpoints,
  mq: {
    mobile: createMediaQuery(breakpoints.mobile),
    phablet: createMediaQuery(breakpoints.phablet),
    tablet: createMediaQuery(breakpoints.tablet),
    desktop: createMediaQuery(breakpoints.desktop),
    hd: createMediaQuery(breakpoints.hd),
  },
  spaces: [4, 8, 12, 16, 24, 32, 48, 64, 96].map(toPx),
  fontSizes: [0.7, 0.9, 1, 1.2, 1.3, 1.4, 1.6, 1.8, 2.2, 2.6, 3].map(toRem),
  colors: {
    primary: `hsl(231, 48%, 48%)`,
    secondary: `rgb(233, 32, 99)`,
    text: `hsl(231, 48%, 22%)`,
    background: `hsl(360, 100%, 100%)`,
    background2: `hsl(231, 48%, 90%)`,
    secondaryLight: `#F8BBD0`,
  },
  fontWeights: {
    text: 400,
    heading: 600,
    extraBold: 800,
  },
};

const makeGlobalStyles = (theme) => css`
  html,
  body {
    margin: 0;
    padding: 0;
  }
  /* body */
  body {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    background: ${theme.colors.background};
    font-size: 16px;
    line-height: 1.7;
  }
  /* end of body */
  p {
    margin: 0;
    padding: 0;
    margin-bottom: ${theme.spaces[4]};
    color: ${theme.colors.text};
    font-weight: ${theme.fontWeights.text};
  }
  a {
    color: unset;
    font-weight: ${theme.colors.text};
  }
  a:active {
    opacity: 0.5;
  }
  /* ul */
  ul {
    margin: 0;
    padding: 0;
    margin-bottom: ${theme.spaces[4]};
    margin-left: ${theme.spaces[2]};
  }
  ${theme.mq.desktop} {
    ul {
      margin-left: ${theme.spaces[5]};
    }
  }
  /* end of ul */
  .gatsby-highlight {
    margin-bottom: ${theme.spaces[4]};
    font-size: ${theme.fontSizes[0]};
  }
  /* li */
  li {
    margin: 0;
    padding: 0;
    margin-bottom: ${theme.spaces[1]};
    color: ${theme.colors.text};
    font-weight: ${theme.fontWeights.text};
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  /* end of li */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
    font-weight: ${theme.fontWeights.heading};
  }
  /** h1,h2,h3 */
  h1 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spaces[1]};
    font-size: ${theme.fontSizes[5]};
  }
  h2 {
    margin-bottom: ${theme.spaces[1]};
    font-size: ${theme.fontSizes[5]};
  }
  h3 {
    margin-bottom: ${theme.spaces[1]};
    font-size: ${theme.fontSizes[3]};
  }
  ${theme.mq.desktop} {
    h1 {
      font-size: ${theme.fontSizes[8]};
    }
    h2 {
      font-size: ${theme.fontSizes[7]};
    }
    h3 {
      font-size: ${theme.fontSizes[5]};
    }
  }
  /** end of h1,h2,h3 */
  code.language-text {
    font-size: ${theme.fontSizes[0]};
    padding: ${theme.spaces[0]} ${theme.spaces[1]}!important;
    vertical-align: middle !important;
    background: ${theme.colors.background2}!important;
    color: ${theme.colors.text};
    height: 100%;
  }
  .token.script.language-javascript,
  .token.tag,
  .token.constant {
    color: #ff6347;
  }
  ${theme.mq.desktop} {
    code.language-text {
      font-size: ${theme.fontSizes[1]};
    }
  }
  /* end of language-text */
  time {
    display: block;
    font-size: ${theme.fontSizes[1]};
    margin-bottom: ${theme.spaces[4]};
  }
  abbr {
    text-underline-position: under;
    cursor: help;
  }
`;

const GlobalStyles = withTheme(({ theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
));

export const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
};
