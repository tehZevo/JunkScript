var Utils = {};
module.exports = Utils;

Utils.isArray = function(a)
{
  return Object.prototype.toString.call(a) === '[object Array]';
}
