const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '@render': '<rootDir>/test-utils/render.tsx',
  },
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>/src'],
};

module.exports = createJestConfig(customJestConfig);
