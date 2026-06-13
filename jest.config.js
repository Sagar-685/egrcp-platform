export default {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['@testing-library/jest-dom'],
  transform: { '^.+\\.(js|jsx)$': 'babel-jest' },
  moduleNameMapper: {
    '\\.(css|module\\.css)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}