var Runner = require("../runner.js");

var $ = {};

module.exports = $;

//number literals from 0 to 9 (only 0 and 1 are likely to stay)

for(var i = 0; i < 10; i++)
{
  $["" + i] = function(i)
  {
    return function(runner)
    {
      runner.stack.push(i);
    }
  }(i);
}

//Math.PI
$["p"] = function(runner)
{
  runner.stack.push(Math.PI);
};

//Math.E
$["e"] = function(runner)
{
  runner.stack.push(Math.E);
};
