var Runner = require("./lib/runner.js");
var Utils = require("./lib/utils.js");

var instructionSets = ["core", "constants", "stack", "array", "math", "io", "macros"];

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

//console.log(Object.keys(instructions).sort().join(""));

//console.log(Utils.findMatching("{}}}}", "{", "}", "{", "}"));
