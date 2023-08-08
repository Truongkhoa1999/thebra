import { Link, useNavigate } from 'react-router-dom'
import './style/cartreport.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ProductProps } from '../../type/ProductProps'
import { cartTotal, findListOfSize34, findListOfSize36, handleDecreaseQuantityFor34, handleDecreaseQuantityFor36, handleIncreaseQuantityFor34, handleIncreaseQuantityFor36 } from '../../util/cart/computeCart'
import { CartProps } from '../../type/CartProps'
// import { truncateCartTitleLength } from '../../util/cart/cartTitle'
import { handleCartCheckout } from '../../util/cart/handleCartCheckout'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { deliveryFee } from '../../data/deliveryCost'
import { handleSwitchDeliveryType } from '../../util/cart/hanldeSwitchDeliveryType'
import { fetchItemImagesFor34, fetchItemImagesFor36 } from '../../util/getImageByProductId/getImageByProductId'

export const CartReport = () => {
  const { cart } = useSelector((state: RootState) => state.cart)
  console.log(cart)
  const { products }: { products: ProductProps[] } = useSelector((state: RootState) => state.products)
  const dispatch = useDispatch<AppDispatch>()
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(0)
  const navigate = useNavigate()
  const deliveryPrice = deliveryFee[selectedDeliveryType];
  const listOfSize34 = findListOfSize34(cart)
  const listOfSize36 = findListOfSize36(cart)
  const totalPrice = useMemo(() => cartTotal(cart, deliveryPrice), [deliveryPrice])
  const [itemImagesFor34, setItemImagesFor34] = useState<Record<string, string>>({})
  const [itemImagesFor36, setItemImagesFor36] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchItemImagesFor34(listOfSize34, setItemImagesFor34)
    fetchItemImagesFor36(listOfSize36, setItemImagesFor36)
  }, []);

  const [shippingInfoForExistUsers, setShippingInfoForExistUsers] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfoForExistUsers((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  return (
    <div className="cartreport_container">
      <div className='heading'>
        <h1>Your Cart</h1>
        <h3>The price tag included TAX</h3>
      </div>
      {/* main table */}
      <div className="table_container">
        <table>
          {/* <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>price</th>
            </tr>
          </thead> */}
          <tbody>
            {listOfSize34.map((item: CartProps, index: number) => (
              <tr className='body_tr' key={index}>
                <td className='cart_itemInformation'>
                  <div className='item_title'>
                    {itemImagesFor34[item.productId] && <img src={itemImagesFor34[item.productId]} alt="" />}
                    <div className='cart_itemInformation_text'>
                      <h5>
                        {item.title}
                      </h5>
                      <h6>
                        Size
                        {item.productSize[34] > 0 && <span>34</span>}
                      </h6>
                    </div>
                  </div>
                </td>
                <div className='stock_container'>
                  <td className='quantity_box'>
                    <button onClick={() => handleDecreaseQuantityFor34(item, dispatch)}>-</button>
                    <span>{item.productSize['34']}</span>
                    <button onClick={() => handleIncreaseQuantityFor34(products, item, dispatch)}>+</button>
                  </td>
                </div>
                <div className='price_container'>
                  <td>{item.price * item.productSize['34']} €</td>
                </div>
              </tr>
            ))}
            {/* {listOfSize36.map((item: CartProps, index: number) => (
              <tr className='body_tr' key={index}>
                <td className='cart_itemInformation'>
                  <div >
                    {itemImagesFor36[item.productId] && <img src={itemImagesFor36[item.productId]} alt="" />}
                    <div className='cart_itemInformation_text'>
                      <h5>
                        {item.title}
                      </h5>
                      <h6>
                        Size
                        {item.productSize[36] > 0 && <span>36</span>}
                      </h6>
                    </div>
                  </div>
                </td>
                <td className='quantity_box'>
                  <button onClick={() => handleDecreaseQuantityFor36(item, dispatch)}>-</button>
                  <span>{item.productSize['36']}</span>
                  <button onClick={() => handleIncreaseQuantityFor36(products, item, dispatch)}>+</button>
                </td>
                <td>{item.price * item.productSize['36']} €</td>
              </tr>
            ))} */}
          </tbody>
          <tfoot>
            <tr>
              {/* <td className='subtotal' colSpan={3}>Subtotal Price:</td>
              <td>{cartTotal(cart)} €</td> */}
            </tr>
          </tfoot>
        </table>
      </div>
      <div className='checkout_container'>
        <form onSubmit={(e) => {
          e.preventDefault()
          handleCartCheckout(navigate, cart, deliveryPrice, shippingInfoForExistUsers)
        }}>

          <label>
            Address:
            <input
              type="text"
              name="address"
              value={shippingInfoForExistUsers.address}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            City:
            <input
              type="text"
              name="city"
              value={shippingInfoForExistUsers.city}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Postal Code:
            <input
              type="text"
              name="postalCode"
              value={shippingInfoForExistUsers.postalCode}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={shippingInfoForExistUsers.country}
              onChange={handleChange}
              required
            />
          </label>
          <div className='delivery_method'>
            <fieldset>
              <legend>Select a delivery method:</legend>
              <div>
                <input type="radio" id="standard" name="drone" value={0}
                  checked onChange={(e) => handleSwitchDeliveryType(e, setSelectedDeliveryType)} />
                <label htmlFor="standard">Standard Delivery To Posti Outlet (5-7 Days) 5.95 €.</label>
              </div>

              <div>
                <input type="radio" id="express" name="drone" value={1} onChange={(e) => handleSwitchDeliveryType(e, setSelectedDeliveryType)} />
                <label htmlFor="express">Express Delivery To Posti Outlet (1-3 Business Days) 12.95 €.</label>
              </div>

              <div>
                <input type="radio" id="home" name="drone" value={2} onChange={(e) => handleSwitchDeliveryType(e, setSelectedDeliveryType)} />
                <label htmlFor="home">Standard Delivery To Posti Outlet (4-7 Days) 10.95 €.</label>
              </div>
            </fieldset>

          </div>
          <br />
          <h2>Subtotal: {totalPrice} €</h2>

          <button type="submit">Check out</button>
        </form>
      </div>
    </div>
  )
}

