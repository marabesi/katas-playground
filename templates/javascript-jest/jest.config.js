module.exports = {
   'roots': [
    '<rootDir>/'
  ],
  'testMatch': [
    '**/?(*.)+(spec|test).+(js)'
  ],
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
};