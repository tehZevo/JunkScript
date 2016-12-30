var Utils = {};
module.exports = Utils;

Utils.isArray = function(a)
{
  return Object.prototype.toString.call(a) === '[object Array]';
}

Utils.reverse = function(s)
{
  return s.split("").reverse().join("");
}

Utils.setCharAt = function(str, i, char)
{
    if(i > str.length - 1)
    {
      return str;
    }

    return str.substr(0, i) + char + str.substr(i + 1);
}

/** "}", "{", "}" */
Utils.findMatching = function(str, startPos, endPos, startChar, endChar, ignoreStart, ignoreEnd)
{
  var pushPop = 0;

  var foundStart = -1;
  var foundEnd = -1;

  endPos = endPos == -1 ? str.length : endPos;

  for(var i = startPos; i < endPos; i++)
  {
    //attempt to find start character
    if(foundStart == -1 && pushPop == 0 && str[i] == startChar)
    {
      foundStart = i;
    }
    //push on ignored start character
    else if(str[i] == ignoreStart)
    {
      pushPop++;
    }
    //attempt to find end character
    if(foundEnd == -1 && pushPop == 0 && str[i] == endChar)
    {
      foundEnd = i;
    }
    //pop on ignored end character
    else if(str[i] == ignoreEnd)
    {
      pushPop--;
    }

    if(foundStart >= 0 && foundEnd >= 0)
    {
      break;
    }



  }

  return {start: foundStart, end:foundEnd };
}
