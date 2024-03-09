import { useState } from "react"

function PreOrderItem(){
    const [showDetail,setDetail] = useState(0)
    return(
        <div className="order-wrapper">
          <div className="border-title" 
            onClick={()=>showDetail?setDetail(0):setDetail(1)}>
            <div className="bu-name">
              <p>نام مشتری:</p>
              <p>علی صفدری</p>
              <span>(پاسداران)</span>
            </div>
            <div className="border-num">
              <p>شماره سفارش:</p>
              <p>2158</p>
            </div>
            <div className="border-date">
              <p>تاریخ و ساعت ثبت:</p>
              <p>1402/02/11 11:25 AM</p>
            </div>
            <div className="border-num">
              <p>تعداد:</p>
              <p>2</p>
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
                  <th data-cell="کد کالا">
                    <p>کد کالا</p>
                  </th>
                  <th data-cell="کارتن">
                    <p>کارتن</p>
                  </th>
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
                <tr>
                  <td data-cell="ردیف">
                    <p>1</p>
                  </td>
                  <td data-cell="شرح کالا">
                    <div className="product-title">
                      <img src="/img/business/oil1.png" alt="avatar"/>
                      <div className="product-name">
                        <p className="name">روغن موتور ایرانول</p>
                        <p className="email">10W_40 12000</p>
                      </div>
                    </div>
                  </td>
                  <td data-cell="کد کالا">
                    <p>FS7758</p>
                  </td>
                  <td data-cell="کارتن">
                    <p>0</p>
                  </td>
                  <td data-cell="واحد اصلی">
                    <p>2</p>
                  </td>
                  <td data-cell="مبلغ واحد">
                    <p>12.5000</p>
                  </td>
                  <td data-cell="تخفیف">
                    <p></p>
                  </td>
                  <td data-cell="مبلغ کل">
                    <p>25.0000</p>
                  </td>
                  <td>
                    <div className="more-btn">
                      <i className="fa-solid fa-trash" style={{color: "red"}}></i>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>:<></>}
        </div>
    )
}
export default PreOrderItem