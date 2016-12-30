var Runner = require("../runner.js");
var Utils = require("../utils.js");

var $ = {};

module.exports = $;

//add the last two objects on the stack
$["+"] = function(runner)
{
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  var result = null;

  if(Utils.isArray($1) && Utils.isArray($2))
  {
    result = $1.concat($2);
  }
  else if(Utils.isArray($1))
  {
    result = $1.slice().push($2);
  }
  else if(Utils.isArray($2))
  {
    result = $2.slice().unshift($1);
  }
  else
  {
    result = $1 + $2;
  }

  runner.stack.push(result);
};

//subtract the last two objects on the stack (1 - 2 would be 12-)
$["-"] = function(runner)
{
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  var result = $1 - $2;

  runner.stack.push(result);
};

//multiply the last two objects on the stack, if the operand at $1 is an array or a string, concat itself $2 times
$["*"] = function(runner)
{
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  var result = null;

  if(Utils.isArray($1))
  {
    result = [];

    for(var i = 0; i < $2; i++)
    {
      result = result.concat($1);
    }
  }
  else if(typeof $1 == "string")
  {
    result = "";

    for(var i = 0; i < $2; i++)
    {
      result = result.concat($1);
    }
  }
  else
  {
    result = $1 * $2;
  }

  runner.stack.push(result);
};

//length of array/string (consumes array/string)
$["#"] = function(runner)
{
  var $1 = runner.stack.pop();

  var result = $1.length;

  runner.stack.push(result);
};

//split the array/string into elements/characters
$["\\"] = function(runner)
{
  var $1 = runner.stack.pop();

  for(var i = 0; i < $1.length; i++)
  {
    runner.stack.push($1[i]);
  }
};

/** alt 159: function definition until the next ; */
$["ƒ"] = function(runner)
{
  //var end = runner.program.indexOf("}", runner.pc);
  var {start, end} = Utils.findMatching(runner.program, runner.pc, -1, "ƒ", ";", "ƒ", ";");

  //console.log(runner.program);
  //console.log(start, end);
  if(start == -1 || end == -1)
  {
    //console.log("foo");
    return;
  }

  var sub = runner.program.substring(start + 1, end);

  //console.log(sub);
  runner.pc = end;

  function fun()
  {
    new Runner(runner.instructions, sub, runner.stack, runner.heap, runner.debug).run();
  }

  runner.stack.push(fun);
};

/** number literal until the next ; */
$["."] = function(runner)
{
  var end = runner.program.indexOf(";", runner.pc);
  var sub = runner.program.substring(runner.pc + 1, end);

  runner.pc = end;

  runner.stack.push(Number(sub));
};

//string literal until the next ;
$["'"] = function(runner)
{
  var end = runner.program.indexOf(";", runner.pc);
  var sub = runner.program.substring(runner.pc + 1, end);

  runner.pc = end;

  runner.stack.push(sub);
};

/** if $1 is a function, call it. otherwise factorial of $1 TODO: negative factorial */
$["!"] = function(runner)
{
  var $1 = runner.stack.pop();

  if(typeof $1 == "function")
  {
    $1();
  }
  else
  {
    var acc = 1;

    for(var i = 1; i <= $1; i++)
    {
      acc *= i;
    }

    runner.stack.push(acc);
  }
};

//repeat the function at %2 %1 times
$["&"] = function(runner)
{
  var count = runner.stack.pop();
  var fun = runner.stack.pop();

  for(var i = 0; i < count; i++)
  {
    fun();
  }
};
