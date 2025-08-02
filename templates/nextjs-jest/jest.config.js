const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig  = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  'roots': [
    '<rootDir>/'
  ],
  "transformIgnorePatterns": [
    "<rootDir>/node_modules/?!(.*)"
  ],
  "transform": {
    "^.+\\.tsx?$": "babel-jest"
  },
  moduleNameMapper: {
    '^@/(.*)$': '/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig);