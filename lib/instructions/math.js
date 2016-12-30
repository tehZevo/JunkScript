var Runner = require("../runner.js");

var $ = {};

module.exports = $;

/** alt 227: product of array */
$["π"] = function(runner)
{
  var $1 = runner.stack.pop();

  var result = 1;

  for(var i = 0; i < $1.length; i++)
  {
    result *= $1[i];
  }

  runner.stack.push(result);
};

/** alt 253: square the number at $1 */
$["²"] = function(runner)
{
  var $1 = runner.stack.pop();

  var result = $1 * $1;

  runner.stack.push(result);
};


/** alt 228: sum of array */
$["Σ"] = function(runner)
{
  var $1 = runner.stack.pop();

  var result = 0;

  for(var i = 0; i < $1.length; i++)
  {
    result += $1[i];
  }

  runner.stack.push(result);
};

/** $1 = $2 */
$["="] = function(runner)
{
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  runner.stack.push($1 == $2);
};

/** $1 > $2 */
$[">"] = function(runner)
{
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  runner.stack.push($1 > $2);
};

/** $1 < $2 */
$["<"] = function(runner)
{
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  runner.stack.push($1 < $2);
};

/** alt 242: $1 ≥ $2 */
$["≥"] = function(runner)
{
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  runner.stack.push($1 >= $2);
};

/** alt 243: $1 ≥ $2 */
$["≤"] = function(runner)
{
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  runner.stack.push($1 <= $2);
};

/** alt 171: $1 / 2 TODO: map to array? */
$["½"] = function(runner)
{
  var $1 = runner.stack.pop();

  runner.stack.push($1 / 2);
};

/** alt 252: $1 ^ $2 TODO: map to array? */
$["ⁿ"] = function(runner)
{
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  runner.stack.push(Math.pow($1, $2));
};

/** alt 241: -$1 make this flip arrays/strings? idk */
$["±"] = function(runner)
{
  var $1 = runner.stack.pop();

  runner.stack.push(-$1);
};

/** alt 251: sqrt($1) */
$["√"] = function(runner)
{
  var $1 = runner.stack.pop();

  runner.stack.push(Math.sqrt(-$1));
};
