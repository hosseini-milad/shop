import QuickCounter from "./QuickCounter"
import QuickOff from "./QuickOff"
import QuickSearch from "./QuickSearch"

function QuickNew(){
    return(
        <tr className="input-tr">
            <td data-cell="ردیف"></td>
            <td data-cell="کد کالا">
                <QuickSearch />
            </td>
            <td data-cell="شرح کالا"></td>
            <td data-cell="تعداد">
            <QuickCounter unit = {12}/>
            </td>
            <td data-cell="مبلغ واحد"></td>
            <td data-cell="تخفیف">
                <QuickOff />
            </td>
            <td data-cell="مبلغ کل"></td>
            <td>
            <div className="more-btn">
                <i className="fa-solid fa-comment-medical"></i>
                <i className="fa-solid fa-circle-plus"></i>
            </div>
            </td>
        </tr>
    )
}
export default QuickNew