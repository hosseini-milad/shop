import { useState } from "react"
import QuickNew from "./QuickNew"
import QuickRow from "./QuickRow"

function QuickTable(props){
  const qCart= props.cart&&props.cart.quickCart
  //console.log(qCart)
    return(
    <table>
          <thead>
            <tr>
              <th data-cell="ردیف">
                <p>ردیف</p>
              </th>
              <th data-cell="کد کالا">
                <p>کد کالا</p>
              </th>
              <th data-cell="شرح کالا">
                <p>شرح کالا</p>
              </th>
              <th data-cell="تعداد">
                <p>تعداد</p>
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
            <QuickNew data={props.data} token={props.token}
              payValue="4" setCart={props.setCart}
              user={props.user}
              search={props.search} setSearch={props.setSearch}/>
            {qCart&&qCart.cartItems&&qCart.cartItems.map((item,i)=>(
              <QuickRow data={item} key={i} index={i+1} payValue="4"
              token={props.token} user={props.user} setCart={props.setCart}/>
            ))}
          </tbody>
        </table>
    )
}
export default QuickTable