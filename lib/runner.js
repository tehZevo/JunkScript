class Runner
{
  constructor(instructions, program, stack, heap, debug)
  {
    this.instructions = instructions;
    this.program = program;
    this.pc = 0;
    this.stack = stack || [];
    this.heap = heap || {};
    this.debug = debug;
  }

  run()
  {
    if(this.debug) { console.log("in"); }

    //if pc is out of bounds, execution halts
    while(this.pc >= 0 && this.pc < this.program.length)
    {
      if(this.debug) {console.log(this.pc + ": " + this.program[this.pc]); }

      var doIncrement = !this.instructions[this.program[this.pc]](this);

      if(doIncrement)
      {
        this.pc++;
      }
    }

    if(this.debug) { console.log("out"); }
  }
}

module.exports = Runner;
