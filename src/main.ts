import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { mkOrder } from './Order'
import { orderRepo } from './OrderRepo'
import { CreateOrderResponse } from './schemas/CreateOrderResponse'
import { GetOrderResponse } from './schemas/GetOrderResponse'
import { validateGetOrderResponse, validateOrderCreateResponse } from './validations'

const app = new Koa()
const router = new Router()

router.post('/orders', async ctx => {
  const order = mkOrder(ctx.request.body)
  await orderRepo.save(order)
  const res: CreateOrderResponse = order
  // this would not be needed, but for demo purpose
  validateOrderCreateResponse(res)
  ctx.body = res
})

router.get('/orders/:id', async ctx => {
  const res: GetOrderResponse = { order: await orderRepo.findById(ctx.params.id) }
  // this would not be needed, but for demo purpose
  validateGetOrderResponse(res)
  ctx.body = res
})

app
  .use(bodyParser())
  .use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      err.status = err.statusCode || err.status || 500
      ctx.body = { error: err.message }
    }
  })
  .use(router.routes())
  .listen(4000, () => {
    console.log('server is up')
  })
