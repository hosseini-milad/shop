import Popup from 'reactjs-popup';
import React ,{ useState } from 'react';
import SimpleAuth from "../../components/simpleAuth";
import env, {siteApi } from "../../env";
import { normalPrice, siteApiUrl } from '../../env';

function AddPop(props){
    const productInfo = props.product;
    const kind = props.vData;
    const cart= SimpleAuth(siteApi+env.cartDetailApi)
    console.log(kind)
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
                    <img src={siteApiUrl+productInfo.image_url}/>
                    <div className='modalText'>
                        <h4 style={{marginBottom:"5px"}}> {productInfo.sku} 
                        {props.error}</h4>
                        <small>{productInfo.title} - 
                                <small className='base-price'>{kind.volume}</small></small>
                        <p></p>
                        <span>قیمت واحد: {normalPrice(kind.price)} تومان</span>
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