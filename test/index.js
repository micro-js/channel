/**
 * Imports
 */

var channel = require('..')
var test = require('tape')

var CLOSED = channel.CLOSED

/**
 * Tests
 */

test('put should return true if taken', function (t) {
  t.plan(2)

  var ch = channel()
  ch.take().then(function (val) {
    t.equal(val, 42)
  })
  ch.put(42).then(function (val) {
    t.equal(val, true)
  })
})

test('put should return false if channel is closed', function (t) {
  t.plan(1)

  var ch = channel()
  ch.close()
  ch.put(42).then(function (val) {
    t.equal(val, false)
  })
})

test('parked put should return true if value is then taken', function (t) {
  t.plan(2)

  var ch = channel()
  setTimeout(function () {
    ch.take().then(function (val) {
      t.equal(val, 42)
    })
  })

  ch.put(42).then(function (val) {
    t.equal(val, true)
  })
})

test('parked put should return false if value is then closed', function (t) {
  t.plan(1)

  var ch = channel()
  setTimeout(function () {
    ch.close()
  })

  ch.put(42).then(function (val) {
    t.equal(val, false)
  })
})

test('take should return value that was put', function (t) {
  t.plan(2)

  var ch = channel()
  ch.put(42).then(function (val) {
    t.equal(val, true)
  })
  ch.take().then(function (val) {
    t.equal(val, 42)
  })
})

test('take should return CLOSED if already closed', function (t) {
  t.plan(1)

  var ch = channel()
  ch.close()
  ch.take().then(function (val) {
    t.equal(val, CLOSED)
  })
})

test('parked take should return value that is put', function (t) {
  t.plan(2)

  var ch = channel()
  setTimeout(function () {
    ch.put(42).then(function (val) {
      t.equal(val, true)
    })
  })

  ch.take().then(function (val) {
    t.equal(val, 42)
  })
})

test('parked take should return CLOSED if channel is then closed', function (t) {
  t.plan(1)

  var ch = channel()
  setTimeout(function () {
    ch.close()
  })

  ch.take().then(function (val) {
    t.equal(val, CLOSED)
  })
})


test('buffered should drop old puts', function (t) {
  t.plan(1)
  var ch = channel(1)
  ch.put(42)
  ch.put(43)
  ch.take().then(function (val) {
    t.equal(val, 43)
  })
})
