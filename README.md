# mock-all
NodeJS simple mocking

Example:

`mySuperModule.js:`
<pre><code>
var myAnotherModule = require('myAnotherModule');
var logger = require(__dirname + "/../config/logging");

exports.func = function func(arg) {
  logger.log(myAnotherModule.foo());
  return new Buffer(arg + myAnotherModule.foo() + arg);
}
</pre></code>

`test_mySuperModule.js:`
<pre><code>
var mock = require("mock-all");
var fsMock = {
  readFileSync: function() {
    return "";
  }
};

myAnotherModuleMock = {
  foo: function () {
    return "bar";
  }
}
var mocks = {
  fs: fsMock,
  myAnotherModule: myAnotherModuleMock,
  "/../config/logging": console
};
var globals = {
  // can override global __dirname in mySuperModule.js
  __dirname: __dirname,
  Buffer: Buffer
};

var mockedModule = mock("#{__dirname}/../build/mySuperModule.js", mocks, globals);
var buf = mockedModule.func("str");
assert.ok(buffer.isBuffer(buf), "Test failed!");
</pre></code>
