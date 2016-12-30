var Runner = require("../runner.js");

var $ = {};

module.exports = $;

//Hello World
$["H"] = function(runner)
{
  new Runner(runner.instructions, "'Hello World!;", runner.stack, runner.debug).run();
};

//Fibonacci sequence
$["F"] = function(runner)
{
  var count = runner.stack.pop() - 2;
  console.log(count);
  new Runner(runner.instructions, "01{;+}." + count + ";&", runner.stack, runner.debug).run();
};
