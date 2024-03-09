function QuickActions(){
    return(
    <div className="btn-wrapper">
        <button type="button" className="product-table-btn pay-metod-btn">
            <div className="cash-pay display-on">
            <p>نقدی</p>
            <i className="fa-solid fa-wallet"></i>
            </div>
            <div className="check-pay">
            <p>غیرنقدی</p>
            <i className="fa-solid fa-file-invoice-dollar"></i>
            </div>
        </button>
        <button type="button" className="product-table-btn">
            <p>توضیحات</p><i className="fa-solid fa-comment-medical"></i>
        </button>
        <button type="button" className="product-table-btn">
            <p>تخفیف</p><i className="fa-solid fa-percent"></i>
        </button>
        <button type="button" className="product-table-btn">
            <p>زمان تحویل</p><i className="fa-solid fa-calendar-days"></i>
        </button>
        <button type="button" className="product-table-btn hurry-btn">
            <div className="fast-order">
            <p>فوری</p><i className="fa-solid fa-truck-fast"></i>
            </div>
            <div className="slow-order display-on">
            <p>عادی</p><i className="fa-solid fa-truck"></i>
            </div>
        </button>

    </div>
    )
}
export default QuickActions