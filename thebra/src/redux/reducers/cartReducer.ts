import { CartProps } from '../../type/CartProps'
import {
  ADD_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  SAVE_CART,
  LOCAL_CART_KEY,
  SAVE_CART_FAILURES,
} from '../actions/cart'
import { AnyAction } from 'redux'

const savedCart = localStorage.getItem('cart')

export interface cartState {
  cart: CartProps[]
  error: string | Error
}
const initialState: cartState = {
  cart: savedCart ? JSON.parse(savedCart) : [],
  error: '',
}
export const cartReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_CART: {
      // Try the new immplements
      const newItem = action.payload
      const updatedCart = [...state.cart, newItem]
      return {
        ...state,
        cart: updatedCart,
      }
    }
    case INCREASE_QUANTITY: {
      const { productId, is34, is36 } = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.cartId === productId);

      if (existingItemIndex !== -1) {
        const existingItem = state.cart[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          productSize: {
            ...existingItem.productSize,
            "34": is34 ? existingItem.productSize['34'] + 1 : existingItem.productSize['34'],
            "36": is36 ? existingItem.productSize['36'] + 1 : existingItem.productSize['36'],
          },
        };

        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = updatedItem;
        localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updatedCart))
        console.log("yes i did add for u")
        return {
          ...state,
          cart: updatedCart,
        };
      }

      return state;
    }

    case DECREASE_QUANTITY: {
      const { productId, is34, is36 } = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.cartId === productId);

      if (existingItemIndex !== -1) {
        const existingItem = state.cart[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          productSize: {
            ...existingItem.productSize,
            "34": is34 ? existingItem.productSize['34'] - 1 : existingItem.productSize['34'],
            "36": is36 ? existingItem.productSize['36'] - 1 : existingItem.productSize['36'],
          },
        };

        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = updatedItem;
        localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updatedCart));

        return {
          ...state,
          cart: updatedCart,
        };
      }

      return state;
    }

    case SAVE_CART: {
      const cartItems = action.payload
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cartItems))
      return {
        ...state,
        cart: cartItems,
      }
    }
    case SAVE_CART_FAILURES: {
      return {
        ...state,
        error: action.payload,
      }
    }
    default:
      return state
  }
}