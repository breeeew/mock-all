# mock-all
NodeJS simple mocking

Example:
<pre><code>
mock = require("mock-all")
fsMock =
  readFileSync: -> return ""

myAnotherModuleMock = 
  foo: ->
    return "bar"

mockedModule = mock("#{__dirname}/../build/mySuperModule.js",
  fs: fsMock
  myAnotherModule: myAnotherModuleMock
  , __dirname # can override global __dirname in mySuperModule.js
)
</pre></code>
