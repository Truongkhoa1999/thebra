import AppBar from "../../components/appbar/AppBar"
import { Footer } from "../../components/footer/Footer"
import { RelevantProductsByCategory } from "../../components/products/RelevantProductsByCategory"
import './style/Products.scss'
import { useParams } from "react-router-dom"
const Products = () => {
    const { category } = useParams()
    return (
        <div className="products_container">
            <AppBar />
            {category && <RelevantProductsByCategory category={category} />
            }
            <Footer />
        </div>
    )
}
export default Products