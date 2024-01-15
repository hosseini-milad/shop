import { useState ,useContext} from "react";
import CounterInput from "react-counter-input";

import env, {discountPercent, toEnglishNumber, normalPrice, siteApi } from "../../env";
import LoginMenu from "../allPages/header/loginMenu";
import AddPop from "./AddPop";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
  
function ProductMainDetail(props){
    const token=cookies.get(env.cookieName)

    const product = props.product.data;
    const cart = props.cart;
    const [pop,setPop] = useState(0);
    const [count,setCount] = useState(1);
    const [error,setError] = useState('');
    
    const addToCart=()=>{
        console.log(count,product.sku)
        const postOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body: JSON.stringify({sku:product.sku,count:count,ItemID:product.ItemID}),
          }
          fetch(siteApi + "/cart/addToCart", postOptions)
            .then((res) => res.json())
            .then((result) => {
                setError(result.message)
                setPop(1)
                //setTimeout(()=>setError(''),3000)
            })
        
    }
    var orderFound = '';
    //console.log(cartAdd)
    return(
        <div className="modal-content">
        <div className="modal-product">
            <div style={{display:"grid"}}>
                {/*productInfo.image&&<img className="modal-img" src={productInfo.image.sourceUrl} />*/}
                <h1>{product.title}</h1>
                <small >{"کد محصول: "+product.sku}</small>
                <i className="enLang">{product.ename}</i>
                
                <p className="modal-product-content" 
                dangerouslySetInnerHTML={{__html:product.description}}></p>
            </div>
                
        </div>
        <div className="pop-xtra-content">
        <div className="selectPart">
                {1?<div className="offerText">
                    <div className="offerTitle">
                        <div className="mainPrice">
                            {0?
                                <div className="offPriceHolder">
                                    <small>{normalPrice(2)}</small>
                                    <b>{discountPercent(3,2)+'%'}</b>
                                </div>:''}
                            {product.price?<strong >
                                {normalPrice(product.price)} <sub>تومان</sub></strong>:
                                <strong >
                                {normalPrice(3)} <sub>تومان</sub></strong>}
                        </div>
                    </div>
                </div>:<p>برای مشاهده قیمت، ابتدا حجم را انتخاب کنید</p>}
                
                <div className="mobileFlex">
                    <label>تعداد محصول:</label>
                    <CounterInput
                        min={1}
                        max={10}
                        count={1}
                        onCountChange={count => setCount(count)}
                    />
                </div>
                {!token?<LoginMenu />:
                product.count?<a className="modal-sub-btn" onClick={addToCart}>
                        افزودن به سبد خرید</a>:
                        <a className="modal-sub-btn disableBtn">
                        عدم موجودی</a>}
                
                <small className="errorHandle">{error}</small>
                {pop?<AddPop product={product} setPop={setPop} error={error}
                token={token}/>:''}
            </div>
            
        </div>
    </div>
    )
}
export default ProductMainDetail