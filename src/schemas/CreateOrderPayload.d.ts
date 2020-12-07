/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * unique user id
 */
export type UserId = string;
/**
 * total price of this order
 */
export type TotalPrice = number;

/**
 * create order payload
 */
export interface CreateOrderPayload {
  userId: UserId;
  price: TotalPrice;
}
