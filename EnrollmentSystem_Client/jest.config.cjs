module.exports = {
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // Extend Jest with DOM testing utilities
  testEnvironment: "jest-environment-jsdom",         // Use a browser-like environment for React
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Use Babel to process JS and JSX files
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy", // Mock CSS files to avoid processing issues
  },
};
