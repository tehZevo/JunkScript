class Runner
{
  constructor(instructions, program, stack, debug)
  {
    this.instructions = instructions;
    this.program = program;
    this.pc = 0;
    this.stack = stack || [];
    this.debug = debug;
  }

  run()
  {
    if(this.debug) { console.log("in"); }

    while(this.pc < this.program.length)
    {
      if(this.debug) {console.log(this.pc + ": " + this.program[this.pc]); }

      this.instructions[this.program[this.pc]](this);

      this.pc++;
    }

    if(this.debug) { console.log("out"); }
  }
}

module.exports = Runner;
