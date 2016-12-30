var Runner = require("./lib/runner.js");
var Utils = require("./lib/utils.js");

var instructionSets = ["core", "constants", "stack", "stringandarray", "math", "io", "macros", "control"];

var instructions = {};

for(var i = 0; i < instructionSets.length; i++)
{
  var is = instructionSets[i];

  Object.assign(instructions, require("./lib/instructions/" + is + ".js"));
}

var stack = [];
var heap = {};
var program = process.argv[2];

new Runner(instructions, program, stack, heap, false).run();

//do not change stack reference
console.log(stack);

//print out list of characters used (may not render all correctly)
//console.log(Object.keys(instructions).sort().join(""));

//console.log(Utils.findMatching("{}}}}", "{", "}", "{", "}"));
