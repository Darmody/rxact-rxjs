import Rx from 'rxjs'
import { setup, teardown } from 'rxact'
import { clean } from '../../src/index'

export default (StateStream, plugins) => {
  describe('createOperator', () => {
    beforeEach(() => {
      setup({
        Observable: Rx.Observable,
        plugins,
        StateStream,
      })

      window.console.warn = jest.fn()
    })

    afterEach(() => {
      clean()
      teardown()
    })

    it('add operator to Observable prototype', () => {
      const stateStream = new StateStream('stream1', 0)
      const mockSubscriber = jest.fn()

      stateStream.operator = (value) => {
        expect(value).toEqual(0)

        return value
      }
      stateStream.state$.stream1$operator().subscribe(mockSubscriber)

      expect(mockSubscriber.mock.calls).toEqual([[0]])
    })

    it('project params with source', () => {
      const stateStream = new StateStream('stream1', 0)
      const mockSubscriber = jest.fn()

      stateStream.operator = (value) => {
        expect(value).toEqual(1)

        return value
      }
      stateStream.state$.stream1$operator(value => (value + 1)).subscribe(mockSubscriber)

      expect(mockSubscriber.mock.calls).toEqual([[1]])
    })

    it('work fine with multi-params operator', () => {
      const stateStream = new StateStream('stream1', 0)
      const mockSubscriber = jest.fn()

      stateStream.operator = (value1, value2) => {
        return value1 + value2
      }
      stateStream.state$
        .stream1$operator(value => (value + 1), 3)
        .stream1$operator(7)
        .subscribe(mockSubscriber)

      expect(mockSubscriber.mock.calls).toEqual([[11]])
    })

    it('work fine with high-order observable', () => {
      const stateStream = new StateStream('stream1', 0)
      const mockSubscriber = jest.fn()

      stateStream.operator = (value) => {
        return Rx.Observable.of(value)
      }
      stateStream.state$
        .stream1$operator()
        .mergeMap(value => value)
        .subscribe(mockSubscriber)

      expect(mockSubscriber.mock.calls).toEqual([[0]])
    })

    it('return value from source if no value return by operator', () => {
      const stateStream = new StateStream('stream1', 0)
      const mockSubscriber = jest.fn()

      stateStream.operator = (value) => {
        expect(value).toEqual(1)
      }
      stateStream.state$.stream1$operator(value => (value + 1)).subscribe(mockSubscriber)

      expect(mockSubscriber.mock.calls).toEqual([[0]])
    })

    it ('do not define operator on Rx.Observab if prop is not an operator', () => {
      const stateStream = new StateStream('stream1', 0)
      stateStream.prop = 'value'

      expect(Rx.Observable.prototype.stream1$prop).not.toBeDefined()
    })
  })
}
