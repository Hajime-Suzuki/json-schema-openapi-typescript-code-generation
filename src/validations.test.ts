import { validateCreateOrderPayload } from './validations'
import fc from 'fast-check'
import { CreateOrderPayload } from './schemas/CreateOrderPayload'

describe('validation', () => {
  test('works', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0.01, max: 9999999 }),
        fc.string({ minLength: 4 }),
        (price, userId) => {
          const data: CreateOrderPayload = { price, userId }
          const res = validateCreateOrderPayload(data)
          expect(res).toEqual(data)
        },
      ),
    )
  })

  test('throws when price is not correct', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -999, max: 0 }),
        fc.string({ minLength: 1 }),
        (price, userId) => {
          const data: CreateOrderPayload = { price, userId }
          const res = () => validateCreateOrderPayload(data)
          expect(res).toThrowError()
        },
      ),
    )
  })

  test('throws when user is not correct', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        fc.oneof(fc.integer(), fc.boolean()),
        (price, userId) => {
          const data = { price, userId }
          const res = () => validateCreateOrderPayload(data)
          expect(res).toThrowError()
        },
      ),
    )
  })
})
