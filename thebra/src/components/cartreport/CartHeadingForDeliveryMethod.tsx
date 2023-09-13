import './style/cartreport.scss'
export const CartHeadingForDeliveryMethod = () => {
    return (
        <div className='heading'>
            {/* <h3>Your Delivery Method</h3> */}
            <h4 className='smallheading'>Free shipping within Finland for orders over 49€.</h4>
            <h4 className='smallheading'>The delivery fee changes due to selected country.</h4>
        </div>
    )
}