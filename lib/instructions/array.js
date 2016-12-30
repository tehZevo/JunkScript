var Runner = require("../runner.js");

var $ = {};

module.exports = $;

//take the last $1 elements (other than $1), and store them in an array
$["]"] = function(runner)
{
  var count = runner.stack.pop();

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
