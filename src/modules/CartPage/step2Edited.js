import {useEffect, useState} from 'react'
import SimpleAuth from '../../components/simpleAuth';

import env,{discountPercent, normalPrice, siteApi} from '../../env'
import AccountDetail from '../profilePage/accountDetail';
import AddressDetail from '../profilePage/addressDetail';
import AddressPop from './AddressPop';
var token = JSON.parse(localStorage.getItem('token-oil'));

function Step2(props){
    const cart= SimpleAuth(siteApi+env.cartDetailApi).data
    const [userInfo,setUserInfo]=useState('');
    const [userAddress,setUserAddress]= useState('')
    
    const [userData,setUserData]= useState(0);
    const [address,setAddress]= useState(0);
    const [transport,setTransport]= useState(0);

    console.log(cart)
    useEffect(() => {
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
          transportListNow()//result.data[0].id)
        },
        (error) => {
          console.log(error)
          setUserAddress("register");
        })

        fetch(siteApi+env.userInfo,postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setUserInfo(result)
        },
        (error) => {
          console.log(error)
        })

       
  },[])
    //console.log(userInfo)
    const [transportPrice,setTransportPrice]= useState({price:0,minPrice:0});
    //console.log(userAddress)
    //const price=cart.total.replace( /^\D+/g, '');
    //const token = JSON.parse(localStorage.getItem('token-oil'))
    
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
        setTimeout(() => transportListNow(result), 1000);
        console.log(result)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  const transportListNow=()=>{
    console.log("run once")
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
        console.log(result)
        //setTransport(result.data)
        setTransportNow(result.data.transportation[0].payload.id)
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
  const setTransportNow=(transportId)=>{
    console.log("multi run")
    const postOptions={
        method:'POST',
        headers: { 'Content-Type': 'application/json',
        "Authorization": "Bearer "+token.token
     },
      body: JSON.stringify({"transportation_id":transportId})
    }
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
  if(cart)  return(
        <div className="checkMain">
        {userInfo&&userAddress&&
        <div className="mainCheck">
        <div className="checkTab">
            <h3>شیوه پرداخت</h3>
          <div style={{display:"flex"}}><input type="radio" checked/><p>پرداخت اینترنتی</p></div>
          {<>   
            <h3>اطلاعات سفارش</h3>
            <div style={{display:"flex",justifyContent: "space-between"}}>
              <p style={{width:"48%"}}>
                <strong>تحویل گیرنده: </strong>
                <input type="button" value="مشخصات گیرنده" onClick={()=>setUserData(1)} className="orderReciept"/>
                <input type="button" value="آدرس گیرنده" onClick={()=>setUserData(2)} className="orderReciept"/>
                {userData===1?<div className='popUp'>
                  <div className='popUpContent'>
                    <div className='popClose' onClick={()=>setUserData(0)}>×</div>
                    <AccountDetail userInfo={userInfo}/>
                  </div></div>:''}
                {userData===2?<div className='popUp'>
                <div className='popUpContent'>
                <div className='popClose' onClick={()=>setUserData(0)}>×</div>
                  <AddressDetail selectAddress={setAddress}/></div></div>:''}
                {/*address&&!transport&&setAddressFunc(address.id)*/}
                {userInfo&&!userInfo.error?<h4 style={{marginBottom:"10px"}}>{userInfo.data.first_name + " " + userInfo.data.last_name}</h4>:
                  <AccountDetail userInfo={userInfo}/>}
                {userAddress&&userAddress.total?<small>{userAddress.data[0].address}</small>:
                <AddressDetail selectAddress={setAddress}/>}
              </p>
              <div style={{width:"48%",visibility:"hidden"}}>
              
            </div>
            </div>
        </>}     
          {/*userInfo.data&&<>
          <h3>اطلاعات سفارش</h3>
          <div style={{float:"left"}}>
            <AddressPop userInfo={userInfo} userAddress={userAddress} setAddress={setAddress}/></div>
            {address&&!transport&&setAddressFunc(address.id)}
          <p>
            <strong>تحویل گیرنده: </strong>
            {!address&&userAddress.data[0]?userAddress.data[0].name+
            "، شماره تماس: "+userAddress.data[0].mobile:
            address.name+
            "، شماره تماس: "+address.mobile}
            </p></>}
            {userAddress.data&&userAddress.data[0]&&
            <p>
            <strong>آدرس:</strong>{!address?
          " استان "+userAddress.data[0].get_province.name+
          "، شهر "+userAddress.data[0].get_city.name:
          " استان "+address.get_province.name+
          "، شهر "+address.get_city.name}<br/>
          {!address?userAddress.data[0].address+
          "، کدپستی: "+userAddress.data[0].zip_code:
          address.address+
          "، کدپستی: "+address.zip_code
          }</p>*/}
      </div>
      <div className="checkTab">
      <h3>خلاصه سفارش
        <div className='order-detail'>
          <small>{cart&&cart.orderLists&&cart.orderLists.length} کالا</small>
        <strong>{normalPrice(cart.totalPrice)} تومان </strong>
        </div>
      </h3>
      <ul>
            {cart&&cart.orderLists&&cart.orderLists.map(cartItem=>(
               <li key={cartItem.payload.product_id}>
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
                        {cart.transportationPrice?cart.transportationPrice:"ارسال رایگان"}
                      </strong>
                      {transportPrice.minPrice?<sub>ارسال رایگان برای خرید بالای {normalPrice(transportPrice.minPrice)}</sub>:''}
                  </div>
              </div>
              
              <div className="priceTotal">
                  <strong>
                      جمع سبد خرید
                  </strong>
                  <strong>
                  {normalPrice(cart.totalPrice+(cart.totalPrice>=transportPrice.minPrice?0:transportPrice.price))+" تومان "}
                  </strong>
              </div>
              <form >
                <input name="token" type="hidden" value={"tokenUrl"} />
                {userInfo&&userAddress&&userInfo.data&&userAddress.data&&userAddress.data[0]?//&&transport?
                <a href={siteApi+env.paymentApi+cart.order_no+
                        "/"+(cart.totalPrice>=transportPrice.minPrice?cart.totalPrice:(cart.totalPrice+transportPrice.price))+"/68"}
                    className="modal-sub-btn btn100" >پرداخت سفارش</a>:
                    <div className="modal-sub-btn btn100" >
                    <AddressPop userInfo={userInfo} userAddress={userAddress}/>  
                    </div>}
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
      else{
        return(<main>لطفا صبر کنید</main>)
      }
}
export default Step2