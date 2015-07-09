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
# @param {Object} mocks Hash of mocked dependencies
# @param {Object} others globals vars of the module
# @return {Context} inner context of the module
*/

var forbidden_names = {
  'require': true,
  'module': true,
  'exports': true
};

module.exports = function(filePath, mocks, globals) {
  var context, exports, resolveModule;
  mocks = mocks || {};
  globals = globals || {};
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
    __dirname: path.dirname(filePath),
    console: console,
    exports: exports,
    process: process,
    module: {
      exports: exports
    }
  };
  for (var attrname in globals) {
    if (forbidden_names[attrname]) continue;
    context[attrname] = globals[attrname];
  }
  vm.runInNewContext(fs.readFileSync(filePath), context);
  return context;
};
