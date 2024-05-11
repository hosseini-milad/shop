import env, { TAX, normalPriceCount, normalPriceRound } from "../../env";
var token = JSON.parse(localStorage.getItem('token-lenz'));

function PrintCart(props){
  const orderInfo = props.orderData
  const faktorItems =orderInfo?orderInfo.cartItems:''
  const total = orderInfo?orderInfo.orderData:''
  const userInfo = orderInfo?orderInfo.userData[0]:''
  const manInfo = orderInfo?orderInfo.manData[0]:''
    return(
        <div className="printArea">
          <div className="userInfo">
              <div className="hesabfaSection">
              </div>
              <div className="hesabfaSection">
                <h1> </h1>
                <h4>فاکتور فروش</h4>
              </div>
              <div className="hesabfaSection" style={{minWidth: "240px"}}>
                <small>شماره فاکتور: <b>{props.url}</b></small>
                <small> تاریخ سفارش: <b>{new Date(props.orderData&&props.orderData.orderDate).toLocaleDateString('fa-IR')}</b></small>
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
                
                  <i className="fa fa-share-alt"
                  onClick={()=>navigator.share()}></i>
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

export default PrintCart