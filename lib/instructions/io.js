var Runner = require("../runner.js");
var fs = require('fs');

//TODO: consume cli args first, then resort to stdin?
//var input = process.argv.slice(3, process.argv.length);

var inputStr = "";

var bufferSize = 256;
var buffer = new Buffer(bufferSize);
var bytesRead;

var $ = {};

module.exports = $;

//input a number onto the stack
$["n"] = function(runner)
{
  var token = doInput();

  runner.stack.push(parseInt(token));
};

//input a string onto the stack
$["s"] = function(runner)
{
  var token = doInput();

  runner.stack.push(parseInt(token));
};

/** return a single line from stdin or something */
function doInput()
{
  while(true)
  {
    bytes = 0;

    try
    {
      bytes = fs.readSync(process.stdin.fd, buffer, 0, bufferSize);
    }
    catch(e)
    {
      if(e.code == 'EOF')
      {
        break;
      }
    }

    if(bytes == 0)
    {
      break;
    }

    var chunk = buffer.toString(null, 0, bytes);

    inputStr += chunk;

    var lineIndex = inputStr.indexOf("\n");

    if(lineIndex != -1)
    {
      var ret = inputStr.substring(0, lineIndex);
      inputStr = inputStr.substring(lineIndex + 1);

      return ret;
    }
  }
}
