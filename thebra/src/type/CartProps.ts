import { v4 as uuidv4 } from 'uuid'

export type CartProps = {
  map: any
  cartId: ReturnType<typeof uuidv4>,
  productSize: {
    [size: string]: number
  },
  title: string
  price: number
  productId: ReturnType<typeof uuidv4>,
  images:string
}