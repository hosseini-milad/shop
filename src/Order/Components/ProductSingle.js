function ProductSingle(){
    return(
        <div className="product-wrapper">
        <div className="product-tile">
            <div className="product-side-btn-wrapper">
              <i className="fa-regular fa-star"></i>
              <i className="fa-solid fa-search"></i>
            </div>
            <div className="product-img">
              <img src="/img/business/oil1.png" alt="oil"/></div>
            <div className="product-title">
              <p>روغن موتور ایرانول 12000 10W_40</p>
            </div>
            <form className="product-option-num">
              <div className="inputGroup">
                <input id="radio1" name="radio" type="radio" style={{display: "none"}} checked />
                <label for="radio1">
                  <p>کارتن</p>
                  <span>max:20X5</span>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-plus"></i>
                    <input className="product-num-input" type="number" value="2"/>
                    <i className="fa-solid fa-minus"></i>
                  </div>
                </label>

              </div>
              <div className="inputGroup">
                <input id="radio2" name="radio" type="radio" style={{display: "none"}} />
                <label for="radio2">
                  <p>تکی</p>
                  <span>max:112</span>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-plus"></i>
                    <input className="product-num-input" type="number" value="3"/>
                    <i className="fa-solid fa-minus"></i>
                  </div>
                </label>

              </div>
            </form>
            <div className="product-btn-wrapper">
              <div className="product-price">215,600</div>
              <button className="buy-btn">ثبت سفارش</button>
            </div>
          </div>
        </div>
    )
}
export default ProductSingle