// From actions
import {
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    ProductActionTypes,
  } from '../actions/getProducts'
  // PLS BRING CART OUT OF MY SHIT!!!
  const savedCart = localStorage.getItem('cart')
  
  // >?>?>
  
  // init state value: PLS FUTURE REMOVE CARD FROM THIS
  
  export interface ProductState {
    products: any[]
    loading: boolean
    error: string | null
  }
  const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
  }
  
  //  Reducer
  export function getProductsReducer(state = initialState, action: ProductActionTypes): ProductState {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST: {
        return {
          ...state,
          loading: true,
        }
      }
      case FETCH_PRODUCTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          products: [...action.payload],
        }
      }
      case FETCH_PRODUCTS_FAILURE: {
        return {
          ...state,
          loading: false,
          error: action.error,
        }
      }
      default:
        return state
    }
  }