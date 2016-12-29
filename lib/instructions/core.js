var Runner = require("../runner.js");

var ins = {};

module.exports = ins;

//push the number 0 onto the stack
ins["0"] = function(runner)
{
  runner.stack.push(0);
};

//push the number 1 onto the stack
ins["1"] = function(runner)
{
  runner.stack.push(1);
};

//push the number 9 onto the stack
ins["9"] = function(runner)
{
  runner.stack.push(9);
};

//pop two objects off the stack, add them, push result on the stack
ins["+"] = function(runner)
{
  runner.stack.push(runner.stack.pop() + runner.stack.pop());
};

//copy the last object on the stack
ins[":"] = function(runner)
{
  runner.stack.push(runner.stack[runner.stack.length - 1]);
};

//copy the last two objects on the stack
ins[";"] = function(runner)
{
  runner.stack.push(runner.stack[runner.stack.length - 2]);
  runner.stack.push(runner.stack[runner.stack.length - 2]);
};

//swap the last two objects on the stack
ins["~"] = function(runner)
{
  var a = runner.stack.pop();
  var b = runner.stack.pop();

  runner.stack.push(b);
  runner.stack.push(a);
};

//lookahead on the program and push the function onto the stack (ending with })
//provide running context
ins["{"] = function(runner)
{
  var end = runner.program.indexOf("}");
  var sub = runner.program.substring(runner.pc + 1, end);

  runner.pc = end;

  function fun()
  {
    new Runner(runner.instructions, sub, runner.stack, runner.debug).run();
  }

  runner.stack.push(fun);
};

//pop and execute the last object on the stack (function)
ins["!"] = function(runner)
{
  runner.stack.pop()();
};

//cycle the stack left once
ins["<"] = function(runner)
{
  runner.stack.push(runner.stack.shift());
};

//cycle the stack right once
ins[">"] = function(runner)
{
  runner.stack.unshift(runner.stack.pop());
};

//repeat the function at %2 %1 times
ins["&"] = function(runner)
{
  var count = runner.stack.pop();
  var fun = runner.stack.pop();

  for(var i = 0; i < count; i++)
  {
    fun();
  }
};

//take the last %1 elements (other than %1), and store them in an array
ins["["] = function(runner)
{
  runner.stack.unshift(runner.stack.pop());
};
