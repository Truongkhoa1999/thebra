import { useSelector } from "react-redux"
import AppBar from "../../components/appbar/AppBar"
import { Footer } from "../../components/footer/Footer"
import { } from "../../components/products/RelevantProductsById"
import './style/Products.scss'
import { RootState } from "../../redux/store"
import ProductByCategories from "../../components/products/ProductByCategories"
const Products = () => {
    return (
        <div className="products_container">
            <AppBar />
            <ProductByCategories />
            <Footer />
        </div>
    )
}
export default Products