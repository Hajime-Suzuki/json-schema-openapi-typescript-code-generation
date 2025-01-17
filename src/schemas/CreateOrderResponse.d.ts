/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * unique order id
 */
export type Id = string;
/**
 * unique user id
 */
export type UserId = string;
/**
 * total price of this order
 */
export type TotalPrice = number;
/**
 * order status. default is pending
 */
export type OrderStatus = "PENDING" | "PAID" | "COMPLETED" | "CANCELLED";

/**
 * get order response
 */
export interface CreateOrderResponse {
  id: Id;
  userId: UserId;
  price: TotalPrice;
  status: OrderStatus;
  expiredAt: string;
  address: Address;
}
/**
 * address item
 */
export interface Address {
  country: string;
  address: string;
  postalCode: string;
}
