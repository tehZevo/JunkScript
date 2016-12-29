var Runner = require("./lib/runner.js");
var core = require("./lib/instructions/core.js");

var instructions = {};

Object.assign(instructions, core);

var stack = [];
var program = process.argv[2];

new Runner(instructions, program, stack, true).run();

console.log(stack);
