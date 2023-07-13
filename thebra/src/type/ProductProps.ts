import { v4 as uuidv4 } from 'uuid'

export interface ProductProps {
  id: ReturnType<typeof uuidv4>,
  title: string;
  price: number;
  productSize:{
    [size:string]:number
  }
  description: string;
  images: string[];
  thumbnail: string;
  category: string
}
