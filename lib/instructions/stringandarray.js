var Runner = require("../runner.js");
var Utils = require("../utils.js");

var $ = {};

module.exports = $;

//take the last $1 elements (other than $1), and store them in an array
//if $1 <= 0, consume the entire stack
$["]"] = function(runner)
{
  var count = runner.stack.pop();
  count = count <= 0 ? runner.stack.length : count;

  var arr = [];

  for(var i = 0; i < count; i++)
  {
    arr.unshift(runner.stack.pop()); //unshift because order
  }

  runner.stack.push(arr);
};

//create an empty array of size $1
$["["] = function(runner)
{
  var count = runner.stack.pop();

  runner.stack.push(new Array(count));
};

/** alt 26: shift $1 (string/array) right $2 times */
$["→"] = function(runner)
{
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  if(Utils.isArray($1))
  {
    for(var i = 0; i < $2; i++)
    {
      $1.unshift($1.pop());
    }
  }
  //better be a string
  else
  {
    for(var i = 0; i < $2; i++)
    {
      $1 = $1[$1.length - 1] + $1.slice(0, $1.length - 1);
    }

    runner.stack.push($1);
  }
};

/** alt 27: shift $1 (string/array) left $2 times */
$["←"] = function(runner)
{
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  if(Utils.isArray($1))
  {
    for(var i = 0; i < $2; i++)
    {
      $1.push($1.shift());
    }
  }
  //better be a string
  else
  {
    for(var i = 0; i < $2; i++)
    {
      $1 = $1.slice(1, $1.length) + $1[0];
    }

    runner.stack.push($1);
  }
};

/** alt 29: reverse $1 (string/array) */
$["↔"] = function(runner)
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


/** alt 24: uppercase $1 */
$["↑"] = function(runner)
{
  var $1 = runner.stack.pop();

  runner.stack.push($1.toUpperCase());
};


/** alt 25: lowercase $1 */
$["↓"] = function(runner)
{
  var $1 = runner.stack.pop();

  runner.stack.push($1.toLowerCase());
};

/** alt 23: flip case of $1 */
$["↨"] = function(runner)
{
  var $1 = runner.stack.pop();

  for(var i = 0; i < $1.length; i++)
  {
    var char = $1[i];

    if(char == char.toUpperCase())
    {
      $1 = Utils.setCharAt($1, i, char.toLowerCase());
    }
    else
    {
      $1 = Utils.setCharAt($1, i, char.toUpperCase());
    }

  }

  runner.stack.push($1);
};

/** substring/subarray of $1 from $2 to $3, if $3 <= 0, run until end of string/array */
$["_"] = function(runner)
{
  var $3 = runner.stack.pop();
  var $2 = runner.stack.pop();
  var $1 = runner.stack.pop();

  $3 = $3 <= 0 ? $1.length : $3;

  var result = null;

  result = $1.slice($2, $3);

  runner.stack.push(result);
};
