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

//reverse the string/array at $1
$["r"] = function(runner)
{
  var $1 = runner.stack.pop();

  var result = null;

  if(Utils.isArray($1))
  {
    result = $1.slice().reverse();
  }
  else
  {
    result = Utils.reverse($1);
  }

  runner.stack.push(result);
};

//lookahead on the program and push the function onto the stack (ending with })
//provide running context
$["{"] = function(runner)
{
  //var end = runner.program.indexOf("}", runner.pc);
  var {start, end} = Utils.findMatching(runner.program, runner.pc, -1, "{", "}", "{", "}");

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
    new Runner(runner.instructions, sub, runner.stack, runner.debug).run();
  }

  runner.stack.push(fun);
};

//number literal until the next ;
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

//pop and execute the last object on the stack (function)
$["!"] = function(runner)
{
  runner.stack.pop()();
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
