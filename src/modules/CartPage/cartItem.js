import env, { cartPrice, normalPrice, normalPriceCount, siteApi, siteApiUrl } from "../../env";

function CartItem(props){
    const cartItem= props.cartItem;
    console.log(cartItem)
    const productData = cartItem&&cartItem.productData[0]

    const removeFromCart=()=>{
        console.log("Remove")
    }
    if(!cartItem)
        return("Waiting")
    else
    return(
        <tr>
            <td>
            <div className="inner-wrap">
                <img alt={cartItem.sku} title={cartItem.sku} 
                    src={siteApiUrl+productData.thumbUrl} />
                <div className="item-minicart">
                    <a href={"/product/"+cartItem.sku} 
                    className="item-minicart-name">{productData.title}</a>
                    
                    <div className="cartPrice">
                    <small>شناسه: {cartItem.sku}</small>
                    {/*<span className="cartQty">تعداد :{cartItem.payload.count}</span>*/}
                        <small className="base-price">
                            {cartItem.volume_title}</small>
                    </div>
                </div>
            </div>
        </td>
        <td className="mobileHide">{normalPriceCount(cartItem.price)}
            <sub className="base-Toman">تومان</sub></td>
        <td className="mobileHide">{cartItem.count}</td>
        <td className="mobileHide">{normalPriceCount(cartItem.price,
            cartItem.count)}
            <sub className="base-Toman">تومان</sub></td>
        <td><i onClick={()=>removeFromCart(cartItem.orderListID)} className="icon-size fas fa-close"></i></td>
    </tr>
                    
    )
}
export default CartItem