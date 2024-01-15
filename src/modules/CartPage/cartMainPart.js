import env, { cartPrice, normalPrice, siteApi, siteApiUrl } from "../../env";
import CartItem from "./cartItem";

function CartMainPart(props){
    const cart= props.cart;
    const token = props.token //JSON.parse(localStorage.getItem('token-oil'));
    console.log(cart)
    const removeFromCart=(sku)=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
              body:  JSON.stringify({'sku':sku})
          }
       fetch(siteApi+"/cart/removeItem",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setTimeout(()=>document.location.reload(),500);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    //cartRemoveApi
    return(<>
        <div className="cartTable">
            <table>
            <tbody>
                <tr className="cartTableHeader">
                    <th className="cartMainTH">جزئیات محصول</th>
                    <th className="cartAltTH mobileHide">قیمت</th>
                    <th className="cartAltTH mobileHide">تعداد</th>
                    <th className="cartAltTH mobileHide">مجموع</th>
                    <th className="cartAltTH"> </th>
                </tr>
                {cart&&cart.map((cartItem,i)=>(
                        <CartItem cartItem={cartItem} key={i} removeFromCart={removeFromCart}/>
                    ))}
                </tbody>
                </table>
        </div>
        <div className="shopCartBtn">
            {/*<a className="btn-secondary" href="/c/products/1">
                ادامه خرید</a>
            <a href="/cart/removeAll" className="link_amsoil-large">
                خالی کردن سبد خرید</a>*/}
            {cart&&cart.totalPrice&&<a href="/checkout" className="modal-sub-btn cartCheckOut">نهایی کردن سفارش</a>}
       </div>
        </>
    )
}
export default CartMainPart