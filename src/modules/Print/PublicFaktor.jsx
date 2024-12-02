import env, { TAX, normalPriceCount, normalPriceRound } from "../../env";
import { useEffect, useState } from "react";
var token = JSON.parse(localStorage.getItem('token-lenz'));


function PublicFaktor(props){
  const [orderInfo,setOrderInfo]=useState('')
  
  const url = document.location.pathname.split('/')[2]
  console.log(url)
  useEffect(()=>{   
    const postOptions={
        method:'post',
        headers: { 'Content-Type': 'application/json' ,
        "x-access-token": token&&token.token,
        "userId":token&&token.userId},
        body:JSON.stringify({cartNo:url})
      }
    fetch(env.siteApi + "/panel/faktor/public-cart-find",postOptions)
    .then(res => res.json())
    .then(
        (result) => {
          setOrderInfo(result)
                
        },
        (error) => {
            console.log(error)
        })
    },[])
  console.log(orderInfo)
  const userInfo = orderInfo?(orderInfo.cart[0].userData&&orderInfo.cart[0].userData[0]):''
  const faktorItems =orderInfo?orderInfo.cart[0].cartItems:''
  const total = orderInfo?orderInfo.orderData:''
  const manInfo = orderInfo?(orderInfo.cart[0].managerData&&orderInfo.cart[0].managerData[0]):''
    return(
      <div className="printArea">
      <div className="userInfo">
          <div className="hesabfaSection">
          </div>
          <div className="hesabfaSection">
            <h1> </h1>
            {orderInfo.cart&&orderInfo.cart[0].isQuote?<h4>پیش فاکتور </h4>:<h4>فاکتور فروش</h4>}
          </div>
          <div className="hesabfaSection" style={{minWidth: "240px"}}>
            <small>شماره فاکتور: <b>{url}</b></small>
            <small> تاریخ سفارش: <b>{new Date(orderInfo&&orderInfo.cart[0].progressDate).toLocaleDateString('fa-IR')}</b></small>
          </div>
        </div>
        <table className="hesabfaTable">
          <tbody>
            <tr>
              <td className="verticalRow hesabfaColor">
                <h3>خریدار</h3>
              </td>
              <td>
                {userInfo?<table className="hesabfaRow">
                  <tbody>
                    <tr>
                      <td colSpan={3} className="hesabfaItem">
                        <span>خریدار: </span>
                        <strong> {userInfo?userInfo.username:''}</strong>
                      </td>
                      <td colSpan={2} className="hesabfaItem">
                        <span>شماره تماس: </span>
                        <strong>{userInfo?userInfo.phone?userInfo.phone:userInfo.mobile:''}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="hesabfaItem">
                        <span>استان: </span>
                        <strong>{userInfo&&userInfo.State}</strong>
                      </td>
                      <td className="hesabfaItem">
                        <span>شهر: </span>
                        <strong>{userInfo&&userInfo.City}</strong>
                      </td>
                      <td className="hesabfaItem">
                        <span>کدپستی: </span>
                        <strong>{userInfo&&userInfo.PostalCode}</strong>
                      </td>
                      <td colSpan={2} className="hesabfaItem">
                        <span>آدرس: </span>
                        <strong>{userInfo&&userInfo.Address?userInfo.Address:userInfo.address}</strong>
                      </td>
                      
                    </tr>
                  </tbody>
                </table>:<></>}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="hesabfaMainTable">
          <tbody>
            <tr>
              <th>#</th>
              <th>شرح</th>
              <th>شناسه</th>
              <th>تعداد</th>
              <th>مبلغ واحد<br/>(ریال)</th>
              <th>تخفیف<br/>(ریال)</th>
              <th>مالیات<br/>(ریال)</th>
              <th>مبلغ کل<br/>(ریال)</th>
            </tr>
            {faktorItems&&
              faktorItems.map((items,i)=>(
            <tr key={i}>
              <td className="centerCell">{i+1}</td>
              <td>{items.title}</td>
              <td>{items.sku}</td>
              <td className="centerCell">{items.count}</td>
              <td>{normalPriceCount(items.total&&items.total.price)}</td>
              <td>{normalPriceRound(items.total&&items.total.discount)}</td>
              <td>{normalPriceRound(items.total&&items.total.tax)}</td>
              <td>{normalPriceRound(items.total&&items.total.total)}</td>
            </tr>))}
          </tbody>
        </table>
        <div className="hesabfaFooter">
          <div className="footerRows">
              <div className="hesabfaPrice">
                <div className="priceSeprate">
                  <span>مجموع:</span>
                  <span>{normalPriceRound(total.totalFee) } ریال</span>
                </div>
                <div className="priceSeprate">
                  <span>تخفیف:</span>
                  <span>{normalPriceRound(total.totalDiscount) } ریال</span>
                </div>
                <div className="priceSeprate">
                <span>مالیات: </span>
                <span>{normalPriceRound(total.totalTax)+" ریال "}</span>
                </div>
                <hr/>
                <h3>مبلغ کل: {normalPriceRound(total.totalPrice)} ریال</h3>
                <strong> </strong>
              </div>
              <div className="hesabfaPrice">
                <div className="priceSeprate">
                  <span>توضیحات:</span>
                  <span>{orderInfo.description}</span>
                </div>
            <div className="sharePart">
            <button type="button" className="print-btn-crm"
              onClick={()=>window.print()}>
              چاپ</button>
            
              
              </div>    
              </div>
            </div>
        </div>
        {/*<button className="printBtn" onClick={()=>printNow()}>چاپ</button>*/}
        <div className="footerHesabfa">
          <span style={{textAlign:"center",display:"block"}}>امضا</span>
          <span style={{textAlign:"center",display:"block"}}>
              نام کاربر: {manInfo?manInfo.username:'-'}<br/> ساعت: 
              {new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()}
          </span>
          {/*<button className="btn-fiin" onClick={()=>window.location.href="/cart/fishprint/"+props.url}>فیش پرینت</button>*/}
        </div>
    </div>

    )

  }

export default PublicFaktor