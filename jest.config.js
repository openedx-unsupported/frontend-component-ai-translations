const { createConfig } = require('@openedx/frontend-build');
const { jsWithTs: tsjPreset } = require('ts-jest/presets');

module.exports = createConfig('jest', {
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTest.js',
  ],
  transform: {
    ...tsjPreset.transform,
  },
});
