import { minWidth, textAlign } from "@mui/system";
import env, { TAX, normalPriceCount, normalPriceRound } from "../../env";
var token = JSON.parse(localStorage.getItem('token-lenz'));

function PrintInvoice(props){
  const orderInfo = props.orderData
  const faktorItems =orderInfo?orderInfo.cartItems:''
  const stockId = orderInfo?orderInfo.stockId:''
  const total = orderInfo?orderInfo.orderData:''
  const userInfo = orderInfo?orderInfo.userData[0]:''
  const manInfo = orderInfo?orderInfo.manData[0]:''
    return(
        <>
          <div className="userInfo">
              <div className="hesabfaSection">
                <p style={{textAlign:"right"}}>
                <br/>عنوان انبار: {stockId=="5"?"انبار مرکزی":stockId=="13"?"انبار فروشگاه جایگاه ":""}
                {/*<br/>کد تحویل گیرنده: {userInfo?userInfo.CustomerId:''}*/}
                <br/>نام مشتری: {userInfo?userInfo.username:''}
                </p>
              </div>
              <div className="hesabfaSection">
                <h1> </h1>
                <h4>فروش - مجوز خروج انبار</h4>
              </div>
              <div className="hesabfaSection" style={{minWidth: "240px"}}>
                <small>شماره سفارش: <b>{props.url}</b></small>
                <small> تاریخ سفارش: <b>{new Date(props.orderData&&props.orderData.orderDate).toLocaleDateString('fa-IR')}</b></small>
                <small>نام بازاریاب: <b>{manInfo?manInfo.username:'-'}</b></small>
              </div>
            </div>
            <p style={{marginRight:"20px"}}>{userInfo?userInfo.Address:''}</p>
            <table className="hesabfaMainTable">
              <tbody>
                <tr>
                  <th>#</th>
                  <th>کد کالا</th>
                  <th>کنترل</th>
                  <th>عنوان کالا</th>
                  <th>کارتن</th>
                  <th>تعداد</th>
                  <th>واحد</th>
                  <th>توضیحات</th>
                </tr>
                {faktorItems&&
                  faktorItems.map((items,i)=>(
                <tr key={i}>
                  <td className="centerCell">{i+1}</td>
                  <td>{items.sku}</td>
                  <td></td>
                  <td>{items.title}</td>
                  <td className="centerCell">{}</td>
                  <td>{items.count}</td>
                  <td>تعداد</td>
                  <td style={{minWidth:"120px"}}>{items.description?items.description:''}</td>
                </tr>))}
                <tr>
                    <td colSpan={4} style={{textAlign:"left"}}>جمع</td>
                    <td> </td>
                    <td>{total?total.totalCount:''}</td>
                    <td colSpan={2}></td>
                </tr>
              </tbody>
            </table>
            
            {/*<button className="printBtn" onClick={()=>printNow()}>چاپ</button>*/}
            <div className="footerHesabfa" style={{margin:"0"}}>
              <span style={{textAlign:"center",display:"block"}}>صادر کننده: </span>
              <span style={{textAlign:"center",display:"block"}}>
                  تحویل گیرنده: 
              </span>
              {/*<button className="btn-fiin" onClick={()=>window.location.href="/cart/fishprint/"+props.url}>فیش پرینت</button>*/}
            </div>
        </>
    )

  }

export default PrintInvoice