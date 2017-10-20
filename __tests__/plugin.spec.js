import { StateStream } from 'rxact'
import { plugin } from '../src/index'
import defineOperatorExample from './shared/defineOperator.example' 

describe('plugin', () => {
  defineOperatorExample(StateStream, [plugin()])
})
