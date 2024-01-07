import SimpleAuth from "../components/simpleAuth"
import env, { siteApi } from "../env"
import Step2 from '../modules/CartPage/step2'
import '../css/cart.css'
import { useState } from "react";
import { useEffect } from "react";
const token= JSON.parse(localStorage.getItem('token-oil'));
function Checkout(){
    const cart = SimpleAuth(siteApi+env.cartDetailApi)
    return(
        <>{/*<div className="mainHeader cartHeader">
            
            <div className="checkoutSteps">
                <a className="steps activeStep" href="/checkout">
                    <strong>اطلاعات ارسال</strong>
                    <div className="circleCheck"></div>
                </a>
                <div className="steps activeStep">
                    <strong>پرداخت</strong>
                    <div className="circleCheck"></div>
                </div>
                <div className="steps">
                    <strong>اتمام خرید و ارسال</strong>
                    <div className="circleCheck"></div>
                </div>
            </div>
            </div>*/}
            {token?cart&&cart.data&&cart.data.totalPrice?<Step2 cart={cart.data}/>:
            <main>لطفا صبر کنید</main>:
            <main>لطفا وارد سایت شوید</main>}
        
          </>
    )
}
export default Checkout