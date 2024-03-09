function QuickRow(){
    return(
        <tr className="product-tr">
            <td data-cell="ردیف">
            <p>1</p>
            </td>

            <td data-cell="کد کالا">
            <p>FS7758</p>
            </td>
            <td data-cell="شرح کالا">
            <div className="product-title">
                <img src="/img/business/oil1.png" alt="avatar"/>
                <div className="product-name">
                <p className="name">روغن موتور ایرانول</p>

                </div>
            </div>
            </td>
            <td data-cell="تعداد">
            <p>2</p>
            </td>
            <td data-cell="مبلغ واحد">
            <p>12.5000</p>
            </td>
            <td data-cell="تخفیف">
            <p>-</p>
            </td>
            <td data-cell="مبلغ کل">
            <p>25.0000</p>
            </td>
            <td>
            <div className="more-btn">
                <i className="fa-solid fa-pen"></i>
                <i className="fa-solid fa-comment-medical"></i>
                <i className="fa-solid fa-trash" style={{color: "red"}}></i>
            </div>
            </td>
        </tr>
    )
}
export default QuickRow