import { CartProps } from "../../type/CartProps"
import { ProductProps } from "../../type/ProductProps"

// export const totalPrice = cart.reduce(
//     (total: number, item: CartProps) => {
//       const product = products.find((p) => p.id === item.cartId)
//       const sizeKeys = Object.keys(item.productSize)
//       const quantity = sizeKeys.reduce(
//         (sum: number, size: string) => sum + item.productSize[size],
//         0
//       )
//       return total + item.price * quantity
//     },
//     0
//   )

// const totalPrice2 = (cart: CartProps[], products: ProductProps[]) => {
//     const totalPrice = cart.reduce((total: Number, item: CartProps) => {
//         const product = products.find(p => p.id === item.cartId)
//         const sizeKeys = Object.keys(item.productSize)
//         const quantity = sizeKeys.reduce(
            
//         )
//     }
//   } 