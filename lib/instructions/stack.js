var Runner = require("../runner.js");

var $ = {};

module.exports = $;

/** alt 13: duplicate the last object on the stack */
$["♪"] = function(runner)
{
  runner.stack.push(runner.stack[runner.stack.length - 1]);
};

/** alt 14: duplicate the last $1 objects on the stack (not including $1) */
$["♫"] = function(runner)
{
  var count = runner.stack.pop();

  var oldSize = runner.stack.length;
  //cant use concat here, because it returns a new array
  for(var i = oldSize - count; i < oldSize; i++)
  {
    runner.stack.push(runner.stack[i]);
  }
};

/** alt 30: store $1 in the heap at location $2 */
$["▲"] = function(runner)
{
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  runner.heap[$2] = $1;
};

/** alt 31: push object in heap at location $1 back onto stack */
$["▼"] = function(runner)
{
  var $1 = runner.stack.pop();

  runner.stack.push(runner.heap[$1]);
};

//swap the last two objects on the stack
$["~"] = function(runner)
{
  var a = runner.stack.pop();
  var b = runner.stack.pop();

  runner.stack.push(b);
  runner.stack.push(a);
};

//alt 17, shift stack left once
$["◄"] = function(runner)
{
  runner.stack.push(runner.stack.shift());
};

//alt 16, shift stack right once
$["►"] = function(runner)
{
  runner.stack.unshift(runner.stack.pop());
};
