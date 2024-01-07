import {useEffect, useState} from 'react'
import SimpleAuth from '../../components/simpleAuth';

import env,{discountPercent, normalPrice, purePrice, siteApi, sumPrice} from '../../env'
import AccountDetail from '../profilePage/accountDetail';
import AddressDetail from '../profilePage/addressDetail';
import AddressPop from './AddressPop';

function Step2(props){
    const cart = props.cart;
    const userInfo= SimpleAuth(siteApi+env.userInfo)
    const [userAddress,setUserAddress]= useState('')
    
    const [userData,setUserData]= useState(0);
    const [address,setAddress]= useState(0);
    const [transport,setTransport]= useState(0);

    //console.log(cart)
    useEffect(() => {
      var token = JSON.parse(localStorage.getItem('token-oil'));
      const postOptions={
        method:'get',
        headers: { 'Content-Type': 'application/json' ,
        "Authorization": "Bearer "+token.token}
      }
      //console.log(postOptions)
      fetch(siteApi+env.userAddApi,postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setUserAddress(result)
          setAddress(result.data[0]);
        },
        (error) => {
          console.log(error)
          setUserAddress("register");
        })
  },[])
    //console.log(userInfo)
    const [transportPrice,setTransportPrice]= useState({price:0,minPrice:0});
    //console.log(userAddress)
    //const price=cart.total.replace( /^\D+/g, '');
    const token = JSON.parse(localStorage.getItem('token-oil'))
    
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
        {userInfo&&userAddress&&
        <div className="mainCheck">
        <div className="checkTab">
            <h3>شیوه پرداخت</h3>
          <div style={{display:"flex"}}><input type="radio" checked onChange={()=>{}}/><p>پرداخت اینترنتی</p></div>
          {<>   
            <h3>اطلاعات سفارش</h3>
            <div style={{display:"flex",justifyContent: "space-between"}}>
              <div style={{width:"48%"}}>
                <strong>تحویل گیرنده: </strong>
                
                {userInfo&&!userInfo.error?<h4 style={{marginBottom:"10px"}}>{userInfo.data.first_name + " " + userInfo.data.last_name}</h4>:
                  <AccountDetail userInfo={userInfo}/>}
                {userAddress&&userAddress.total?<small>{userAddress.data[0].address}</small>:
                <AddressDetail selectAddress={setAddress}/>}
              </div>
            </div>
        </>} 
      </div>
      <div className="checkTab">
      <h3>خلاصه سفارش
        <div className='order-detail'>
          <small>{cart.orderLists.length} کالا</small>
        <strong>{normalPrice(cart.totalPrice)} تومان </strong>
        </div>
      </h3>
      <ul>
            {cart.orderLists.map((cartItem,i)=>(
               <li key={i}>
                <img src={cartItem.payload.product_image_url} />
                <small>{cartItem.payload.product_title}</small>
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
                  <span>قیمت کالاها<br/>تخفیف کالاها<br/>هزینه ارسال
                  </span>
                  <div style={{textAlign:"left"}}>
                      <strong> {normalPrice(cart.totalPrice)} تومان 
                      </strong>
                      <strong className="off">
                        {cart.total_discount_price?normalPrice(cart.total_discount_price):0} تومان 
                      </strong>
                      <strong>
                        {cart.transportationPrice?(normalPrice(cart.transportationPrice)+" تومان "):"ارسال رایگان"}
                          
                      </strong>
                      {transportPrice.minPrice?<sub>ارسال رایگان برای خرید بالای {normalPrice(transportPrice.minPrice)}</sub>:''}
                  </div>
              </div>
              
              <div className="priceTotal">
                  <strong>
                      جمع سبد خرید
                  </strong>
                  <strong>
                  {sumPrice(cart.totalPrice+"+"+cart.transportationPrice)+" تومان "}
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
      </div>
      </div>
        )
}
export default Step2