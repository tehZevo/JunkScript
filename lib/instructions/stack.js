var Runner = require("../runner.js");

var $ = {};

module.exports = $;

//copy the last object on the stack
$[":"] = function(runner)
{
  runner.stack.push(runner.stack[runner.stack.length - 1]);
};

//copy the last two objects on the stack (should probably change this)
$[";"] = function(runner)
{
  runner.stack.push(runner.stack[runner.stack.length - 2]);
  runner.stack.push(runner.stack[runner.stack.length - 2]);
};

//swap the last two objects on the stack
$["~"] = function(runner)
{
  var a = runner.stack.pop();
  var b = runner.stack.pop();

  runner.stack.push(b);
  runner.stack.push(a);
};

//cycle the stack left once
$["<"] = function(runner)
{
  runner.stack.push(runner.stack.shift());
};

//cycle the stack right once
$[">"] = function(runner)
{
  runner.stack.unshift(runner.stack.pop());
};
