import { useState } from "react"
import env from "../../env"

function ProductSingle(props){
  const [starStatus,setStarStatus] = useState(0)
  const data = props.data
  //console.log(starStatus)
    return(
        <div className="product-wrapper">
        <div className="product-tile">
            <div className="product-side-btn-wrapper">
              <i className={starStatus?"fa-regular fa-star active-star":"fa-regular fa-star"}
                onClick={()=>setStarStatus(starStatus?0:1)}></i>
              <i className="fa-solid fa-search"></i>
            </div>
            <div className="product-img">
              <img src={env.siteApiUrl+ data.thumbUrl} alt="oil"/></div>
            <div className="product-title">
              <p>{data.title}</p>
            </div>
            <form className="product-option-num">
              <div className="inputGroup">
                <input id={"radio"+props.id} name="radio" type="radio" 
                  style={{display: "none"}}  />
                <label htmlFor={"radio"+props.id}>
                  <p>کارتن</p>
                  <span>max:20X5</span>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-plus"></i>
                    <input className="product-num-input" type="number" value="2"
                    onChange={()=>{}}/>
                    <i className="fa-solid fa-minus"></i>
                  </div>
                </label>

              </div>
              <div className="inputGroup">
                <input id={"radios"+props.id} name="radio" type="radio" style={{display: "none"}} />
                <label htmlFor={"radios"+props.id}>
                  <p>تکی</p>
                  <span>max:112</span>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-plus"></i>
                    <input className="product-num-input" type="number" value="3"
                    onChange={()=>{}}/>
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