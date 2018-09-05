const Module = require('module');
const path = require('path');

require('cache-require-paths');

const packagesDir = path.resolve(__dirname, '..', '..', 'packages');

const internalRequire = Module.prototype.require;

const webpackTest = /^!/;
const packageTest = /^@opallabs\/[a-z]+$/;

function intercepted(moduleId) {
  if (packageTest.test(moduleId)) {
    return require(path.resolve(packagesDir, moduleId.replace('@opallabs/', ''), 'src', 'index.js'));
  }
  if (webpackTest.test(moduleId)) {
    return require(moduleId.replace(/.*!/, ''));
  }
  return internalRequire.apply(this, [moduleId]);
}

Module.prototype.require = intercepted;
