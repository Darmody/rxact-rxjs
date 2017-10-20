import { StateStream } from 'rxact'
import { decorator } from '../src/index'
import defineOperatorExample from './shared/defineOperator.example'

describe('decorator', () => {
  const TestStateStream = decorator()(StateStream)
  defineOperatorExample(TestStateStream, [])
})
