import { useState } from "react"
import { PriceDiscountTax, TAX, normalPriceCount, normalPriceRound } from "../../env"

function OpenOrderItem(props){
    const data = props.data
    const total=props.total&&props.total[props.index]
    const [showDetail,setDetail] = useState(0)
    const [active,setActive] = useState(0)
    //console.log(data.userData)
    return(
        <div className="order-wrapper">
          <div className="border-title" >
          <div className={active?"orderCheck activeCheck":"orderCheck"} 
            onClick={()=>setActive(active?0:1)}>
            <i className="fa fa-check"></i>
          </div>

            <div className="bu-name"
            onClick={()=>showDetail?setDetail(0):setDetail(1)}>
              {data.userData?<div className="col">
                <p>{data.userData?data.userData.username:'-'}{data.userData.agent?<></>:<i className="fa-solid fa-check-circle blue-check" aria-hidden="true"></i>}</p>
                <span>{data.userData.meliCode?data.userData.meliCode:"----------"}
                  <i className="fa-solid fa-credit-card no-font" aria-hidden="true"></i>
                </span>
                <span>{data.userData.phone?data.userData.phone:"----------"}
                  <i className="fa-solid fa-phone no-font" aria-hidden="true"></i>
                </span>
                <span>{data.userData.roleId?data.userData.roleId:"----------"}
                  <i className="fa-solid fa-certificate no-font" aria-hidden="true"></i>
                </span>
              </div>:<></>}
              {data.userData?<div className="col">
                <small >{data.userData?data.userData.Address:'-'}</small>
                
                
                <span>{data.userData.PostalCode?data.userData.PostalCode:"----------"}
                  <i className="fa-solid fa-location-arrow no-font" aria-hidden="true"></i>
                </span>
              </div>:<></>}
            </div>
            <div className="newCol">
              <p>شماره سفارش: {data.cartNo}</p>
              <a className="orderNoCol" href={"/orders/print/"+data.cartNo}>
                چاپ سفارش</a>
              {/*<p>{normalPriceCount(total.totalPrice,1)}</p>*/}
            </div>
            <div className="newCol">
              <small>مبلغ کل:  <strong>{total?
                normalPriceRound(total.totalPrice):'-'}</strong></small>
              <div className="col"><p>تعداد: {total?total.totalCount:1}</p></div>
            </div>
            <div className="newCol">
            <small>تاریخ: {new Date(data.progressDate)
                  .toLocaleDateString('fa')}</small>
            <small>ساعت: {new Date(data.progressDate)
                  .toLocaleTimeString('fa')}</small>
            </div>
            <div className="newCol">
              {data.description?<small>توضیحات: </small>:<></>}
              <small>{data.description}</small>
            </div>
            <i className={showDetail?"fa-solid fa-angle-up":
                "fa-solid fa-angle-down"}></i>
          </div>
          {showDetail?
          <div className="product-table-sec display-on height-on">
            <table>
              <thead>
                <tr>
                  <th data-cell="ردیف">
                    <p>ردیف</p>
                  </th>
                  <th data-cell="شرح کالا">
                    <p>شرح کالا</p>
                  </th>
                  {/*<th data-cell="کد کالا">
                    <p>کد کالا</p>
          </th>*/}
                  {/*<th data-cell="کارتن">
                    <p>کارتن</p>
        </th>*/}
                  <th data-cell="واحد اصلی">
                    <p>واحد اصلی</p>
                  </th>
                  <th data-cell="مبلغ واحد">
                    <p>مبلغ واحد</p>
                  </th>
                  <th data-cell="تخفیف">
                    <p>تخفیف</p>
                  </th>
                  <th data-cell="مالیات">
                    <p>مالیات</p>
                  </th>
                  <th data-cell="مبلغ کل">
                    <p>مبلغ کل</p>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.cartItems&&data.cartItems.map((item,i)=>(
                <tr key={i}>
                  <td data-cell="ردیف">
                    <p>{i+1}</p>
                  </td>
                  <td data-cell="شرح کالا">
                    <div className="product-title">
                      <img src="/img/business/oil1.png" alt="avatar"/>
                      <div className="product-name">
                        <p className="name">{item.title}</p>
                        <p className="email">{item.sku}</p>
                      </div>
                    </div>
                  </td>
                  {/*<td data-cell="کد کالا">
                    <p>{item.sku}</p>
                </td>
                  <td data-cell="کارتن">
                    <p>0</p>
                  </td>*/}
                  <td data-cell="واحد اصلی">
                    <p>{item.count}</p>
                  </td>
                  <td data-cell="مبلغ واحد">
                    <p>{normalPriceRound(item.total&&item.total.price)}</p>
                  </td>
                  <td data-cell="تخفیف">
                    <p>{normalPriceRound(item.total&&item.total.discount)}
                    <sub>{item.discount<100?"("+item.discount+"%)":''}</sub></p>
                  </td>
                  <td data-cell="مالیات">
                    <p>{normalPriceRound(item.total&&item.total.tax)}</p>
                  </td>
                  <td data-cell="مبلغ کل">
                    <p>{normalPriceRound(item.total&&item.total.total)}</p>
                  </td>
                  {/*<td>
                    <div className="more-btn">
                      <i className="fa-solid fa-trash" style={{color: "red"}}></i>
                    </div>
                    </td>*/}
                </tr>))}
              </tbody>
            </table>

          </div>:<></>}
        </div>
    )
}
export default OpenOrderItem