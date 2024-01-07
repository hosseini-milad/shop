import simpleAuth from "../../../components/simpleAuth"
import env, {siteApi, normalPrice, siteApiUrl } from "../../../env";

function CartMenu(props){  
    const token = JSON.parse(localStorage.getItem('token-oil'));
    const cart = props.cart;
    const removeFromCart=(product_id)=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json',
            "Authorization": "Bearer "+token.token
         },
              body:  JSON.stringify({'order_list_id':product_id})
          }
       fetch(siteApi+env.cartRemoveApi,postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setTimeout(()=>document.location.reload(),2000);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    //console.log(cart)
    return(
        <div className="minicartData">
            <div className="item-cart-quantity">
            <strong> {cart.orderLists.length} محصول </strong>
            در سبد خرید شماست</div>

    <div className="mini-cart-table">
    {cart.orderLists.map((cartItem,i)=>(
        cartItem.payload.product_title&&
        <div className="productListHover" key={i}>
        <div className="inner-wrap">
        <img alt={cartItem.payload.product_id} 
            title={cartItem.payload.product_title} 
            src={cartItem.payload.product_image_url}  />

            <div className="item-minicart">
                <a href={"/product/"+cartItem.payload.product_sku} className="item-minicart-name">
                {cartItem.payload.product_title}</a>
                <small><span> شناسه: {cartItem.payload.product_sku} </span>
                <sub className="base-price">{cartItem.payload.volume_title} </sub></small>
                <div className="cartPrice"><span className="cartQty">تعداد :
                    {cartItem.payload.count}</span>
                <span>{normalPrice(cartItem.payload.price)}
                    <sub className="base-Toman">تومان</sub></span></div>
            </div>
            <i className="icon-size fas fa-close" onClick={()=>removeFromCart(cartItem.payload.orderListID)}></i>
        </div>
    </div>
    ))}
    
</div>
<div className="cartpopup">
        جمع سبد خرید:<b> {normalPrice(cart.totalPrice)}
                <sub className="base-Toman">تومان</sub></b>
        <a href="/cart" className="modal-sub-btn">
            مشاهده سبد خرید</a>
    </div>



</div>)
}
export default CartMenu