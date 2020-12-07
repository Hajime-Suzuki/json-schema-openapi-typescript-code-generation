import { mkOrder } from './Order'
import { Order } from './schemas/Order'

const mkOrderRepo = () => {
  const preGenerated = mkOrder({ price: 55.89, userId: '999' })
  preGenerated.id = '1234'
  preGenerated.status = 'COMPLETED'

  const orders: Record<string, Order> = {
    '1234': preGenerated,
  }

  return {
    save: async (order: Order) => {
      orders[order.id] = order
      return
    },
    findById: async (id: Order['id']) => orders[id],
  }
}

export const orderRepo = mkOrderRepo()
