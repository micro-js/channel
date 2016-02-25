
# channel

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Simple CSP channel implemented with promises.

## Installation

    $ npm install @f/channel

## Usage

```js
import channel from '@f/channel'

let {take, put} = channel()

take().then(val => val) // => 42
put(42).then(val => val) // => true

```

## API

### channel()

**Returns:** bound channel methods

### take()

**Returns:** promise that resolves to a value that is put on channel

### put(value)

- `value` - value to put

**Returns**: promise that resolves to true or false indicating whetehr value is taken

### close()
Close the channel. All pending takes resolve to CLOSED. All pending puts resolve to false.

### open()
Open the channel. Open a closed channel.

### CLOSED
Closed value.

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/channel.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/channel
[git-image]: https://img.shields.io/github/tag/micro-js/channel.svg?style=flat-square
[git-url]: https://github.com/micro-js/channel
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/channel.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/channel
