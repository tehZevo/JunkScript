var f =
{
  //push the number 0 onto the stack
  "0": function(runner)
  {
    runner.stack.push(0);
  },

  //push the number 1 onto the stack
  "1": function(runner)
  {
    runner.stack.push(1);
  },

  //push the number 9 onto the stack
  "9": function(runner)
  {
    runner.stack.push(9);
  },

  //pop two objects off the stack, add them, push result on the stack
  "+": function(runner)
  {
    runner.stack.push(runner.stack.pop() + runner.stack.pop());
  },

  //copy the last object on the stack
  ":": function(runner)
  {
    runner.stack.push(stack[runner.stack.length - 1]);
  },

  //copy the last two objects on the stack
  ";": function(runner)
  {
    runner.stack.push(stack[runner.stack.length - 2]);
    runner.stack.push(stack[runner.stack.length - 2]);
  },

  //swap the last two objects on the stack
  "~": function(runner)
  {
    var a = runner.stack.pop();
    var b = runner.stack.pop();

    runner.stack.push(b);
    runner.stack.push(a);
  },

  //lookahead on the program and push the function onto the stack (ending with })
  //provide running context
  "{": function(runner)
  {
    var end = program.indexOf("}");
    var sub = program.substring(runner.pc + 1, end);

    runner.pc = end;

    function fun()
    {
      new Runner(sub, runner.stack).run();
    }

    runner.stack.push(fun);
  },

  //pop and execute the last object on the stack (function)
  "!": function(runner)
  {
    runner.stack.pop()();
  },

  //cycle the stack left once
  "<": function(runner)
  {
    runner.stack.push(runner.stack.shift());
  },

  //cycle the stack right once
  ">": function(runner)
  {
    runner.stack.unshift(runner.stack.pop());
  },

  //repeat the function at %2 %1 times
  "&": function(runner)
  {
    var count = runner.stack.pop();
    var fun = runner.stack.pop();

    for(var i = 0; i < count; i++)
    {
      fun();
    }
  },

  //take the last %1 elements (other than %1), and store them in an array
  "[": function(runner)
  {
    runner.stack.unshift(runner.stack.pop());
  },
}

var stack = [];
var program = process.argv[2];

class Runner
{
  constructor(program, stack)
  {
    this.program = program;
    this.pc = 0;
    this.stack = stack || [];
  }

  run()
  {
    console.log("in");
    while(this.pc < this.program.length)
    {
      console.log(this.pc + ": " + this.program[this.pc]);
      f[this.program[this.pc]](this);

      this.pc++;
    }
    console.log("out");
  }
}

new Runner(program, stack).run();

console.log(stack);
