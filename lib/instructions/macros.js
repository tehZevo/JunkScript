var Runner = require("../runner.js");

var $ = {};

module.exports = $;

//Math.PI
$["H"] = function(runner)
{
  new Runner(runner.instructions, "'Hello World!;", runner.stack, runner.debug).run();
};
