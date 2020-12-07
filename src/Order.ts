import shortid from 'shortid'
import { CreateOrderPayload } from './schemas/CreateOrderPayload'
import { Order } from './schemas/Order'
import { validateCreateOrderPayload } from './validations'

export const mkOrder = (_data: CreateOrderPayload): Order => {
  const data = validateCreateOrderPayload(_data)

  const now = new Date()
  const expiredAt = new Date(now.setMinutes(now.getMinutes() + 15)).toISOString()

  return {
    id: shortid(),
    expiredAt,
    price: data.price,
    userId: data.userId,
    status: 'PENDING',
    address: { address: '1234', country: 'nl', postalCode: '1234' },
  }
}
