/* eslint-disable @typescript-eslint/no-var-requires */
import Ajv from 'ajv'
import * as AddressSchema from '../schemas/common/Address.json'
import * as CreateOrderPayloadSchema from '../schemas/orders/CreateOrderPayload.json'
import * as OrderSchema from '../schemas/orders/Order.json'
import * as GetOrderResponseSchema from '../schemas/orders/GetOrderResponse.json'
import * as CreateOrderResponseSchema from '../schemas/orders/CreateOrderResponse.json'
import * as OrderStatusSchema from '../schemas/orders/OrderStatus.json'
import { CreateOrderPayload } from './schemas/CreateOrderPayload'
import { GetOrderResponse } from './schemas/GetOrderResponse'
import { Order } from './schemas/Order'

const ajv = new Ajv({ allErrors: true })
const schemas = [OrderSchema, AddressSchema, OrderStatusSchema, CreateOrderPayloadSchema]
ajv.addSchema(schemas)

const validatorFactory = <T>(validator: Ajv.ValidateFunction) => (data: unknown) => {
  const res = validator(data)
  if (res) {
    return data as T
  }
  console.log(validator.errors)
  throw new Error(validator.errors?.map(v => v.message).join('. ') || 'unknown error')
}

export const validateCreateOrderPayload = validatorFactory<CreateOrderPayload>(
  ajv.compile(CreateOrderPayloadSchema),
)

export const validateOrderCreateResponse = validatorFactory<Order>(
  ajv.compile(CreateOrderResponseSchema),
)

export const validateGetOrderResponse = validatorFactory<GetOrderResponse>(
  ajv.compile(GetOrderResponseSchema),
)
