"use strict";

var fs, path, vm;

vm = require("vm");

fs = require("fs");

path = require("path");

/**
# Helper for unit testing:
# - load module with mocked dependencies
# - allow accessing private state of the module
#
# @param {string} filePath Absolute path to module (file to load)
# @param {Object=} mocks Hash of mocked dependencies
# @param {string} pass as __dirname to context
*/


module.exports = function(filePath, mocks, dir) {
  var context, exports, resolveModule;
  mocks = mocks || {};
  resolveModule = function(module) {
    if (module.charAt(0) !== ".") {
      return module;
    }
    return path.resolve(path.dirname(filePath), module);
  };
  exports = {};
  context = {
    require: function(name) {
      return mocks[name] || require(resolveModule(name));
    },
    __dirname: dir,
    console: console,
    exports: exports,
    module: {
      exports: exports
    }
  };
  vm.runInNewContext(fs.readFileSync(filePath), context);
  return context;
};
