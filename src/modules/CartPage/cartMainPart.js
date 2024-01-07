import env, { cartPrice, normalPrice, siteApi, siteApiUrl } from "../../env";
import CartItem from "./cartItem";

function CartMainPart(props){
    const cart= props.cart;
    const token = ''//JSON.parse(localStorage.getItem('token-oil'));
    console.log(cart)
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
                        <CartItem cartItem={cartItem} key={i} />
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