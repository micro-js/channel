/**
 * Modules
 */

var foreach = require('@f/foreach')
var defer = require('@f/defer-promise')

/**
 * Actions
 */

var OPEN = '@f/channel/OPEN'
var CLOSED = '@f/channel/CLOSED'

/**
 * Expose channel
 */

module.exports = channel

/**
 * Expose types
 */

channel.CLOSED = CLOSED

/**
 * channel
 */

function channel (buffer) {
  var status = OPEN
  var takes = []
  var puts = []
  return {take: take, put: put, open: open, close: close}

  function take () {
    if (isClosed()) {
      return Promise.resolve(CLOSED)
    }
    if (puts.length) {
      var p = puts.shift()
      p[1].resolve(true)
      return p[0]
    } else {
      var d = defer()
      takes.push(d)
      return d.promise
    }
  }

  function put (val) {
    if (isClosed()) {
      return Promise.resolve(false)
    }

    if (takes.length) {
      takes.shift().resolve(val)
      return Promise.resolve(true)
    } else {
      var d = defer()
      puts.push([Promise.resolve(val), d])
      if (buffer) {
        while (puts.length > buffer) {
          puts.shift()
        }
        return Promise.resolve(true)
      } else {
        return d.promise
      }
    }
  }

  function open () {
    status = OPEN
  }

  function close () {
    status = CLOSED
    foreach(function (take) {
      take.resolve(CLOSED)
    }, takes)

    foreach(function (put) {
      put[1].resolve(false)
    }, puts)
  }

  function isClosed () {
    return status === CLOSED
  }
}
