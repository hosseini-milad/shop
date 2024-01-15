import SimpleAuth from "../components/simpleAuth"
import env, { siteApi } from "../env"
import Step2 from '../modules/CartPage/step2'
import '../css/cart.css'
import { useState } from "react";
import { useEffect } from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Checkout(){
    const token=cookies.get(env.cookieName)
    const [cart,setCart] = useState()
    useEffect(() => {
        if (!token) return
        const postOptions = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId
          },
        }
        fetch(siteApi + "/cart/cart-detail", postOptions)
          .then((res) => res.json())
          .then(
            (result) => {
              console.log(result)
              setCart(result)
            },
            (error) => {
              console.log(error)
            }
          )
      }, [])
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
            {token?cart&&cart.totalprice?
                <Step2 cart={cart} token={token}/>:
            <main>لطفا صبر کنید</main>:
            <main>لطفا وارد سایت شوید</main>}
        
          </>
    )
}
export default Checkout