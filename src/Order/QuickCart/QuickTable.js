import QuickNew from "./QuickNew"
import QuickRow from "./QuickRow"

function QuickTable(){
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
            <QuickNew />
            <QuickRow />
          </tbody>
        </table>
    )
}
export default QuickTable