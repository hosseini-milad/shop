import {useEffect, useState} from 'react'
import SimpleAuth from '../../components/simpleAuth';

import env,{discountPercent, normalPrice, purePrice, siteApi, siteApiUrl, sumPrice} from '../../env'
import AccountDetail from '../profilePage/accountDetail';
import AddressDetail from '../profilePage/addressDetail';
import AddressPop from './AddressPop';
import Transport from './CheckoutModules/Transport';

function Step2(props){
    const cart = props.cart;
    const [userAddress,setUserAddress]= useState('')
    const userInfo = 0
    const [transportDetail,setTransportDetail]= useState();
    const [address,setAddress]= useState(0);
    const [transport,setTransport]= useState(0);

    const [transportPrice,setTransportPrice]= useState({price:0,minPrice:0});
    //console.log(userAddress)
    //const price=cart.total.replace( /^\D+/g, '');
    const token = props.token
    
    const setAddressFunc=(addressId)=>{
      const postOptions={
          method:'POST',
          headers: { 'Content-Type': 'application/json',
          "Authorization": "Bearer "+token.token
       },
        body: JSON.stringify({"address_id":addressId})
      }
     fetch(siteApi+env.cartAddress,postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        transportListNow();
        //console.log(result)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  const transportListNow=()=>{
    const postOptions={
      method:'GET',
      headers: { 'Content-Type': 'application/json',
      "Authorization": "Bearer "+token.token
      },
    }
    fetch(siteApi+env.cartTransport,postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        setTransport(result.data)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  const setTransportNow=(transportId)=>{
    const postOptions={
        method:'POST',
        headers: { 'Content-Type': 'application/json',
        "Authorization": "Bearer "+token.token
     },
      body: JSON.stringify({"transportation_id":transportId})
    }
    //console.log(postOptions)
   fetch(siteApi+env.cartTransPortSelect,postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result)
    },
    (error) => {
      console.log(error);
    }
  );
}
    
//console.log(transportPrice.minPrice,cart.totalPrice,transportPrice.price)
    //console.log(cart.totalPrice>=transportPrice.minPrice?"Free":"15000")
    return(
        <div className="checkMain">
        {1&&
        <div className="mainCheck">
        <div className="checkTab">
            <h3>شیوه پرداخت</h3>
          <div style={{display:"flex"}}><input type="radio" checked onChange={()=>{}}/><p>پرداخت اینترنتی</p></div>
          {<>   
            <h3>نحوه تحویل</h3>
            <Transport setAddress={setAddress} token={token}
            setTransportDetail={setTransportDetail} transportDetail={transportDetail}/>
        </>} 
      </div>
      <div className="checkTab">
      <h3>خلاصه سفارش
        <div className='order-detail'>
          <small>تعداد اقلام: {cart.totalCount}</small>
        <strong>{normalPrice(cart.totalprice)} تومان </strong>
        </div>
      </h3>
      <ul>
            {cart.cart.map((cartItem,i)=>(
               <li key={i}>
                <img src={cartItem.productData[0]?
                  siteApiUrl+cartItem.productData[0].thumbUrl:''} />
                <small>{cartItem.productData[0]?
                  cartItem.productData[0].title:''}</small>
                </li>
            ))}
      </ul>
      </div> 
       <a href="/cart">بازگشت به سبد خرید</a>
      </div>
      }
      <div className="cartSideBar">
          <div className="cartSidePrice">
              <div className="priceCalc">
                  <span>قیمت کالاها<br/>تخفیف کالاها<br/>نحوه ارسال
                  </span>
                  <div style={{textAlign:"left"}}>
                    <strong> {normalPrice(cart.totalprice)} تومان 
                    </strong>
                    <strong className="off">
                    {cart.discountprice?normalPrice(cart.discountprice):0} تومان 
                    </strong>
                    <strong>
                    {/*cart.transportationPrice?(normalPrice(cart.transportationPrice)+" تومان "):"ارسال رایگان"*/}
                    {transportDetail?transportDetail._id?
                      "تحویل در محل":
                      "تحویل حضوری":
                      "انتخاب کنید"}
                   </strong>
                  </div>
              </div>
              
              <div className="priceTotal">
                  <strong>
                      جمع سبد خرید
                  </strong>
                  <strong>
                  {sumPrice(cart.totalprice+"+"+cart.transportationPrice)+" تومان "}
                  </strong>
              </div>
              <form >
                <input name="token" type="hidden" value={"tokenUrl"} />
                {/*userInfo&&userAddress?
                {<a href={siteApi+env.paymentApi+cart.order_no+
                        "/"+purePrice(sumPrice(cart.totalPrice+"+"+cart.transportationPrice))*10+"/68"}
                    className="modal-sub-btn btn100" >پرداخت سفارش</a>:
                    <div className="modal-sub-btn btn100" >
                    </div>*/}
            </form> 
          </div>
          
        <div className="checkTab">
          <h3>کد تخفیف</h3>
          <div className="offHolder"><input type="text" className="offInput" placeholder="افزودن کد تخفیف" />
              <a className="registerCode" href="#" >ثبت</a> 
          </div>
          
        </div>
        {cart.totalprice?transportDetail?
        <a href={siteApi + "/payment/mellat?userid="+token.userId+
          "&transport="+((transportDetail&&transportDetail._id)?
          transportDetail._id:
          transportDetail)} 
          className="modal-sub-btn">پرداخت</a>:
          <a href="#" className="modal-sub-btn disabled">انتخاب نحوه ارسال</a>:
                <a href="#" className="modal-sub-btn disabled">تکمیل سبد خرید</a>
            }
      </div>
      </div>
        )
}
export default Step2