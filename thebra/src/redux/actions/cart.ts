// CARDS PLS BRING TO ANOTHER FILE
import { v4 as uuidv4 } from 'uuid'
import { CartProps } from "../../type/CartProps"

export const ADD_CART = 'ADD_CART'
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
export const DELETE_ITEM = 'DELETE_ITEM'
export const SAVE_CART = 'SAVE_CART'
export const SAVE_CART_FAILURES = 'SAVE_CART_FAILURES'
// Local storage key
export const LOCAL_CART_KEY = 'cart'
export const LOCAL_CART = 'cart_'
// Add cart

export interface increaseQuantity {
  type: typeof INCREASE_QUANTITY
  payload: {
    productId: number
    quantity: number
  }
}
export const addItemToCart = (cartItem: CartProps) => {
  return {
    type: ADD_CART,
    payload: cartItem,
  }
}
// update quantity
export function increaseQuantity(productId: ReturnType<typeof uuidv4>, is34: boolean, is36: boolean) {
  return {
    type: INCREASE_QUANTITY,
    payload: { productId, is34, is36 }
  }
}

export function decreaseQuantity(productId: ReturnType<typeof uuidv4>, is34: boolean, is36: boolean) {
  return {
    type: DECREASE_QUANTITY,
    payload: { productId, is34, is36 },
  }
}
export function deleteCartItem(productId: ReturnType<typeof uuidv4>, is34: boolean, is36: boolean) {
  return {
    type: DELETE_ITEM,
    payload: { productId, is34, is36 }
  }
}
// save cart for users
export function saveCart(cart: CartProps[]) {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart))
  console.log('saved cart done')
  return {
    type: SAVE_CART,
    payload: cart,
  }
}
// <>><<>>

export function saveCartFailures(error: Error) {
  const errorMessage = error instanceof Error ? error.message : "failed to saved cart, pls try again"
  return {
    type: SAVE_CART_FAILURES,
    payload: errorMessage,
  }
}

