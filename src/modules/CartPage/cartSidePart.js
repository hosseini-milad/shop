import { useEffect, useState } from "react";
import env, { comparePrice, normalPrice, siteApi, sumPrice } from "../../env";
import AddressCart from "./addressCart";
const token= JSON.parse(localStorage.getItem('token-oil'));

function CartSidePart(props){
    const cart = props.cart;
    const [transport,setTransport] = useState('')
    console.log(cart)
    useEffect(()=>{
        if(!transport)return;
        const postOptions={
            method:'POST',
            headers: { 'Content-Type': 'application/json',
            "Authorization": "Bearer "+token.token
         },
          body: JSON.stringify({"transportation_id":transport.id})
        }
        //console.log(postOptions)
       fetch(siteApi+env.cartTransPortSelect,postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result)
        },
        (error) => {
          console.log(error);
        }
      );
    },[transport])
    return(
        <div className="cartSideHandler">
            <div className="pt-3 float-md-left col-md-12 pl-0 pr-0">
   			 <h5 className="order-summary">نتیجه سفارش</h5>

        	<hr className="mb-3 d-md-none d-lg-block mt-0" />
            {props.address&&<AddressCart address={props.address} setTransport={setTransport}/>}
            
        	<hr className="d-md-none d-lg-block" />
        	</div>
            <div className="cartTotals">
            <small>
                <p className="total-wrap">
                    جمع ارقام:<span>{cart&&normalPrice(cart.totalprice)}
                        <sub className="base-Toman">تومان</sub></span>
                </p>
                <p className="total-wrap">
                هزینه ارسال:<span>{transport&&(comparePrice(cart.totalPrice,transport.min_amount_free))?
                    <>{normalPrice(transport.price)}<sub className="base-Toman">تومان</sub></>:
                    "ارسال رایگان"}
                        </span>
                </p>
            </small>

            <h5 className="total-wrap totalPrice">
                جمع کل<span> {cart&&normalPrice(cart.totalprice)}
                    <sub className="base-Toman">تومان</sub></span>
            </h5>
            {cart.totalprice?<a href="/checkout" className="modal-sub-btn">نهایی کردن سفارش</a>:
                <a href="#" className="modal-sub-btn disabled">تکمیل سبد خرید</a>
            }


		 </div>
        </div>
    )
}
export default CartSidePart