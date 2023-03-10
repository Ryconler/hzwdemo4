/* eslint-disable no-extend-native */
// ES6 Array.prototype.fill polyfill:
// ==================================
// From Mozilla: http://mzl.la/1umD1jc
if (!Array.prototype.fill) {
  Array.prototype.fill = function(value) {
    if (this == null) {
      throw new TypeError('this is null or not defined')
    }
    var O = Object(this)
    var len = O.length >>> 0
    var start = arguments[1]
    var relativeStart = start >> 0
    var k = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len)
    var end = arguments[2]
    var relativeEnd = end === undefined ?
      len : end >> 0
    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len)
    while (k < final) {
      O[k] = value
      k++
    }

    return O
  }
}
export default {}
