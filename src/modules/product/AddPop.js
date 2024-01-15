import Popup from 'reactjs-popup';
import React ,{ useEffect, useState } from 'react';
import env, {siteApi } from "../../env";
import { normalPrice, siteApiUrl } from '../../env';

function AddPop(props){
    const token = props.token
    const [cart,setCart] = useState()
    const productInfo = props.product;
    useEffect(() => {
        if (!token) return
        const postOptions = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId
          },
        }
        0&&fetch(siteApi + "/cart/cart-detail", postOptions)
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
    const closeNow=()=>{
        console.log(props)
        props.setPop(0)
    }
    return(
        <div className="modalHolder">
            <div className="modal">
                <div className='closeBtn' onClick={()=>{closeNow();window.reload()}}>
                    ×
                </div>
                <div className="modal-top">
                    <img src={siteApiUrl+productInfo.thumbUrl}/>
                    <div className='modalText'>
                        <small style={{marginBottom:"5px"}}> 
                        {props.error}</small>
                        <b>{productInfo.title} </b>
                        <small className='base-price' style={{width:"fit-content"}}>{productInfo.sku} </small>
                        <p></p>
                        <span>قیمت واحد: {normalPrice(productInfo.price)} تومان</span>
                        {/*cart&&cart.data&&<div className='modalTotal'>
                            <span>تعداد در سبد: {cart.data.orderLists.length} </span>
                            <span>مجموع: {normalPrice(cart.data.totalPrice)} تومان </span>
                </div>*/}
                    </div>
                </div>
                <div className='popBtn'>
                    <button className="productBtn modalBtn">
                        <a href="/checkout"><i className="fas fa-shopping-cart"></i> تسویه حساب</a></button>
                    <a href="/cart"><i className="fas fa-shopping-cart"></i> مشاهده سبد خرید</a>
                    <button className="productBtn" onClick={()=>document.location.reload()}>ادامه خرید</button>
                </div>
            </div>
        </div>
        )
}
export default AddPop;