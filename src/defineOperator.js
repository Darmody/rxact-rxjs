// @flow
import type { StateStream } from 'rxact'
import { getObservable } from 'rxact'

const operators = []

export const clean = () => {
  const Observable = getObservable()
  operators.forEach(operator => {
    delete Observable.prototype[operator]
  })
}

// https://github.com/ReactiveX/rxjs/blob/master/doc/operator-creation.md
const createOperator = (instance, name, operator, Observable) => {
  Observable.prototype[name] = function customOperator(...params) {
    return Observable.create(subscriber => {
      const source = this

      return source.subscribe(
        value => {
          const finalParams = params.map(param => {
            if (typeof param === 'function') {
              return param(value)
            }

            return param
          })

          const nextValue = operator.call(instance, ...finalParams, value)

          subscriber.next(nextValue === undefined ? value: nextValue)
        },
        err => subscriber.error(err),
        () => subscriber.complete(),
      )
    })
  }
}

const createProxy = (instance, name) => {
  const handler = {
    set: (target, property, value) => {
      target[property] = value

      if (typeof value === 'function') {
        const operatorName = `${name}$${property}`
        operators.push(operatorName)
        createOperator(target, operatorName, value, target.Observable)
      }

      return true
    }
  }
  const proxy = new Proxy(instance, handler)

  return proxy
}

export default (instance: StateStream) => {
  const name = instance.streamName
  return createProxy(instance, name)
}
