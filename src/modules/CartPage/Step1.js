import {useState} from 'react'
import env,{normalPrice} from '../../env'
import {
    useMutation,
    gql
  } from "@apollo/client";
import AddAddress from './addAddress';

function Step1(props){
    const cart = props.cart;
    const user = props.mobile;
    const price=normalPrice(cart.cart.total);
    const [userInfo,setUserInfo] = useState('');
    const userUrl = "https://sharifoilco.com/backend/wp-json/wc/v1/customers"
    const userList=()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' 
            },
          }
          fetch(userUrl+"?search="+user, requestOptions)
            .then(response => response.json())
            .then(data => (setUserInfo(data),localStorage.setItem("userInfo",JSON.stringify(data[0].billing))))
    }
    if(userInfo=== '')userList();
    return(
        <div className="checkMain">
          
        <div className="mainCheck">
          <div className="checkTab">
      <h3 className="addressTitle">آدرس تحویل سفارش 
      {userInfo&&<AddAddress url={userUrl} mobile={user} data={userInfo} setState={setUserInfo}/>}</h3>
      {userInfo&&<div className="addressData">
          <p dangerouslySetInnerHTML={{__html:userInfo[0].billing.state+"، "+userInfo[0].billing.city+"<br/>"+
          userInfo[0].billing.address_1+"، کدپستی: "+userInfo[0].billing.postcode}}>
          </p>
          <p dangerouslySetInnerHTML={{__html:"اطلاعات تحویل گیرنده: <br/>"+
          userInfo[0].billing.first_name+"، "+userInfo[0].billing.phone}}>
          </p></div>}
          
      </div>
      <div className="checkTab">
      <h3>لیست سبد خرید</h3><ul>
          {cart.cart&&cart.cart.contents.nodes.map(
              (cartItem,i)=>(
                  <li key={i}><img src={cartItem.product.node.image.sourceUrl} />
                  <small>{cartItem.product.node.name}</small></li>
              )
          )}
      </ul>
      </div>
      
      </div>
      <div className="cartSideBar">
          <div className="cartSidePrice">
              <div className="priceCalc">
                  <span>قیمت کالاها<br/>تخفیف کالاها
                  </span>
                  <div style={{textAlign:"left"}}>
                      <strong> {price +" ریال "}
                      </strong>
                      <strong className="off" >
                      (12%) 936.000 ریال
                      </strong>
                  </div>
              </div>
              <div className="priceCalc" style={{margin: "10px 5%"}}>
                  <span>هزینه ارسال
                  </span> 
                  <div style={{textAlign:"left"}}>
                    {userInfo&&userInfo[0].billing.city === "تهران"&&<strong>{price.replace( /,/g, '')>250000?"رایگان":"پسکرایه"} 
                      </strong>}
                      {userInfo&&userInfo[0].billing.city !== "تهران"&&<strong>{price.replace( /,/g, '')>400000?"رایگان":"پسکرایه"} 
                      </strong>}
                  </div>
              </div>
              <div className="priceTotal">
                  <strong>
                      جمع سبد خرید
                  </strong>
                  <strong>
                  {price +" ریال "}
                  </strong>
              </div>
              {userInfo&&userInfo[0].billing.address_1!==""&&<a href="/payment" className="modal-sub-btn">ادامه فرآیند خرید</a>}
              {userInfo&&userInfo[0].billing.address_1===""&&
              <><span style={{color:"rgb(225, 28, 36)"}}>
                  برای ادامه لطفا آدرس خود را وارد کنید</span>
                  <AddAddress url={userUrl} mobile={user} data={userInfo} setState={setUserInfo}/></>}
          </div>
          
      </div>
      </div>
        )
}
export default Step1


//const FIND_USER=(userName)=>{
    const userQuery = gql`
    query MyQuery {
        users(first: 10, where: {role: CUSTOMER}) {
          nodes {
            name
          }
        }
      }
    `
//    return(userQuery)
//}