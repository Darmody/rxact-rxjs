<h1 align="center">Rxact Rxjs</h1>

[![npm version](https://img.shields.io/npm/v/rxact-rxjs.svg?style=flat-square)](https://www.npmjs.com/package/rxact-rxjs)
[![CircleCI master](https://img.shields.io/circleci/project/github/Darmody/rxact-rxjs/master.svg?style=flat-square)](https://circleci.com/gh/Darmody/rxact-rxjs/tree/master)
[![Coveralls master](https://img.shields.io/coveralls/github/Darmody/rxact-rxjs/master.svg?style=flat-square)](https://coveralls.io/github/Darmody/rxact-rxjs)

Rxact Rxjs is a Rxact plugin for improving RxJS supporting to Rxact.

**NOTE: Rxact support RxJS natively, this plugin is optional.**

What does this plugin do:
* Make calling state stream's operator just like RxJS operator.


## Installation

```
  yarn add rxact rxact-rxjs
```

## Usage

There are two ways:

#### 1. Install as a plugin

```javascript
  import Rx from 'rxjs'
  import { setup, StateStream } from 'rxact'
  import { plugin as rxactRxjs } from 'rxact-rxjs'

  setup({
    Observable: Rx.Observable,
    plugins: [rxactRxjs()],
  })

  const stream = new StateStream('stream', { name: 'rxact' })

  // define an operator
  stream.operator = () => { console.log('I am an operator.') }

  // you can access operator on Rx.Observable.prototype as 'stream$operator'
  stream.state$
    .map(value => value)
    .stream$operator()
    .subscribe()
```

#### 2. Enhance StateStream

```javascript
  import Rx from 'rxjs'
  import { setup, StateStream } from 'rxact'
  import { decorator as rxactRxjs } from 'rxact-rxjs'

  const EnhancedStateStream = decorator()(StateStream)

  setup({
    Observable: Rx.Observable,
    StateStream: EnhancedStateStream,
  })

  const stream = new EnhancedStateStream('stream', { name: 'rxact' })

  stream.operator = () => { console.log('I am an operator.') }

  stream.state$
    .map(value => value)
    .stream$operator()
    .subscribe()
```

This plugin help you map state stream's opertors to RxJS operators.
The name mapped in the form `[streamName]$[operatorName]`, such as:
`user$login`, `note$add`.

## API

#### plugin()

return a StateStream plugin.

#### decorator()

return a function for wrapping StateStream.

## License

[MIT](https://github.com/Darmody/rxact-rxjs/blob/master/LICENSE)
