import { useState ,useEffect } from "react";
import env, {  TAX,  normalPriceCount } from "../../env";
var token = JSON.parse(localStorage.getItem('token-lenz'));

function FishPrintCart(props){
  const orderInfo = props.orderData
  const orderData = props.orderData.orderData
  const userInfo = props.orderData.userData?props.orderData.userData[0]:''
    
    if(!orderInfo)
      return(<main>{"orderError"}</main>)
    else return(
        <div className="printArea fishPrintArea">
          <div className="userInfo hesabSection">
              <div className="hesabfaSection hesabBorder">
                <h4>فاکتور فروش</h4>
                <h4>روانکاران شریف</h4>
              </div>
              <div className="hesabfaSection hesabBorder">
                <small>ش.فاکتور: {orderInfo.Number}</small>
                <small>ش.ارجاع: {orderInfo.InvoiceID}</small>
              </div>
              <div className="hesabfaSection hesabBorder">
                <small> تاریخ: {new Date(orderInfo.orderDate).toLocaleDateString('fa')}</small>
                <small>ساعت: {new Date(orderInfo.orderDate).toLocaleTimeString('fa')}</small>
              </div>
            </div>
            <table className="hesabPrintTable hesabBorder">
              <tbody>
                <tr>
                  <td className="verticalRow hesabfaColor">
                    <small>مشتری</small>
                  </td>
                  <td colSpan={3} className="hesabfaItem">
                    <span>نام: </span>
                    <strong> {userInfo&&userInfo.username}</strong>{/*+" ("+userInfo.Code+")"*/}
                    <br/>
                    <span>شماره تماس: </span>
                    <strong> {userInfo&&userInfo.phone}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="hesabfaMainTable">
              <tbody>
                <tr>
                  <th>#</th>
                  <th width={120}>عنوان</th>
                  <th>تعداد</th>
                  <th className="priceCell">مبلغ</th>
                </tr>
                {orderInfo&&orderInfo.cartItems&&
                  orderInfo.cartItems.map((items,i)=>(
                <tr key={i}>
                  <td className="centerCell">{i+1}</td>
                  <td style={{fontSize:"11px"}}>{items.title}</td>
                  <td className="centerCell">{items.count}</td>
                  <td className="priceCell">{normalPriceCount(items.price)}</td>
                </tr>))}
              </tbody>
            </table>
            <table className="hesabfaMainTable sumTable"> 
              <tbody>
                <tr>
                  <td rowSpan={3}>جمع اقلام: {orderInfo.totalCount}</td>
                  <td>جمع فاکتور </td>
                  <td className="priceCell">{normalPriceCount(orderData.cartPrice)}</td>
                </tr>
                <tr>
                  <td>مالیات </td>
                  <td className="priceCell">{normalPriceCount(orderData.cartPrice,TAX)}</td>
                </tr>
                <tr>
                  <td>قابل پرداخت </td>
                  <td className="priceCell"><b>{normalPriceCount(orderData.cartPrice,1+TAX)}</b></td>
                </tr>
              </tbody>
            </table>
            <div className="hesabfaFooter">
              <div className="footerRows">
                  <div className="hesabfaRight">
                    {/*<span>مانده حساب: {normalPrice(userInfo.Liability-userInfo.Credits)} ریال بدهکار</span>*/}
                  </div>
                  
                </div>
            </div>
            {/*<button className="printBtn" onClick={()=>printNow()}>چاپ</button>*/}
            <div className="footerHesabfa">
              <span style={{textAlign:"center",display:"block"}}>امضا</span>
              <span style={{textAlign:"center",display:"block"}}>
                  تنظیم سند: {token&&token.userId.slice(-3)}
              </span>
            </div>
        </div>
    )

  }

export default FishPrintCart