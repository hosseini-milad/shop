import { useState } from "react"
import QuickNew from "./QuickNew"
import QuickRow from "./QuickRow"

function QuickTable(props){
  const qCart= props.cart
  const [reload,setReload] = useState(1)
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
            {reload?<QuickNew data={props.data} token={props.token}
              payValue={props.payValue?props.payValue:"4"} setCart={props.setCart}
              user={props.user} action={props.action} setError={props.setError}
              search={props.search} setSearch={props.setSearch}
              setReload={setReload}/>:
              <tr className="input-tr">
              <td colSpan={5}><p>در حال ثبت</p></td>
            </tr>}
            {qCart&&qCart.cartItems&&qCart.cartItems.map((item,i)=>(
              <QuickRow data={item} key={i} index={i+1} payValue={props.payValue?props.payValue:"4"}
              action={props.delete} setError={props.setError}
              token={props.token} user={props.user} setCart={props.setCart}
              cartNo={props.cartNo}/>
            ))}
          </tbody>
        </table>
    )
}
export default QuickTable