module.exports = {
    testEnvironment: 'jsdom', // Needed for simulating a browser-like environment
    setupFilesAfterEnv: ['./setupTests.js'], // Your setup file for Jest
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest', // Transform JS/TS/JSX/TSX using Babel
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // To mock CSS imports
    },
    transformIgnorePatterns: [
      '/node_modules/(?!your-module-name-to-transform)/', // Optional: If you have specific modules that need to be transformed by Babel
    ],
  };
  