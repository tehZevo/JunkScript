var Runner = require("./lib/runner.js");

var instructionSets = ["core", "constants", "stack", "array", "math"];

var instructions = {};

for(var i = 0; i < instructionSets.length; i++)
{
  var is = instructionSets[i];

  Object.assign(instructions, require("./lib/instructions/" + is + ".js"));
}

var stack = [];
var program = process.argv[2];

new Runner(instructions, program, stack, false).run();

console.log(stack);
