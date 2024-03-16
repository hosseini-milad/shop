import { useState } from "react"
import { normalPriceCount, normalPriceRound } from "../../env"

function PreOrderItem(props){
    const data = props.data
    const total=props.total&&props.total[props.index]
    const [showDetail,setDetail] = useState(0)
    return(
        <div className="order-wrapper">
          <div className="border-title" 
            onClick={()=>showDetail?setDetail(0):setDetail(1)}>
            <div className="bu-name">
              <p>نام مشتری:</p>
              <p>{data.userData?data.userData.username:'-'}</p>
              <span>(-)</span>
            </div>
            <div className="border-num">
              <p>شماره سفارش:</p>
              <p>{data.cartNo}</p>
              {/*<p>{normalPriceCount(total.totalPrice,1)}</p>*/}
            </div>
            <div className="border-date">
              <p>تاریخ و ساعت ثبت:</p>
              <p>{new Date(data.progressDate)
                  .toLocaleDateString('fa')}</p>
              <span>({new Date(data.progressDate)
                  .toLocaleTimeString('fa')})</span>
            </div>
            <div className="border-num">
              <p>تعداد:</p>
              <p>{total?total.totalCount:1}</p>
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
                    <p>{normalPriceRound(item.price,1.09)}</p>
                  </td>
                  <td data-cell="تخفیف">
                    <p>{item.discount?item.discount.length<3?
                    item.discount+"%":
                    normalPriceRound(item.discount):'-'}</p>
                  </td>
                  <td data-cell="مبلغ کل">
                    <p>{normalPriceRound(item.price,item.count,1.09)}</p>
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
export default PreOrderItem