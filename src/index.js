// @flow
import type { StateStream } from 'rxact'
import defineOperator, { clean } from './defineOperator'

const plugin = () => defineOperator

const decorator = () => {

  return (StateStream: StateStream) => {
    return class DebuggableStream extends StateStream {
      constructor(...params: Array<any>) {
        const instance = super(...params)

        return defineOperator(instance)
      }
    }
  }
}

export {
  plugin,
  decorator,
  clean,
}
