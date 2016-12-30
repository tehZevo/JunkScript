var Runner = require("../runner.js");

var input = process.argv.slice(3, process.argv.length);

var $ = {};

module.exports = $;

//input a number onto the stack
$["n"] = function(runner)
{
  runner.stack.push(parseInt(input.pop() || 0));
};

//input a string onto the stack
$["s"] = function(runner)
{
  runner.stack.push(input.pop() || "");
};
