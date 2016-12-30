var Runner = require("../runner.js");

var $ = {};

module.exports = $;

/** if $1 is true, then push $2 back on the stack, else push $3 back */
$["?"] = function(runner)
{
  var $3 = runner.stack.pop();
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  if($1)
  {
    runner.stack.push($2);
  }
  else
  {
    runner.stack.push($3);
  }
}

/** alt 168: if $1 is true, then push $2 back on the stack */
$["¿"] = function(runner)
{
  var $3 = runner.stack.pop();
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  if($1)
  {
    runner.stack.push($2);
  }
  else
  {
    runner.stack.push($3);
  }
}

/** alt 21: set pc to $1 */
$["§"] = function(runner)
{
  var $1 = runner.stack.pop();

  runner.pc = $1;

  //prevent incrementing
  return true;
}

/** alt 20: put pc on stack */
$["¶"] = function(runner)
{
  runner.stack.push(runner.pc);
}
