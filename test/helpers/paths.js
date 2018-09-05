const path = require('path');
const Module = require('module');

process.env.NODE_PATH = [
  path.resolve(__dirname, '../../src'),
  __dirname,
].join(':');

Module._initPaths();
