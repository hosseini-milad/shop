import { useState } from "react";
import Comments from "./Comments";
import ProductMain from "./ProductMain"

function ProductDetail(props){
    const product = props.product;
    const[tabSelect,setTab] = useState(0)
    return(
        <section className="productDetailSection">
            <div className="productPromises">
            <div className="productPromise">
                    <div className={tabSelect===0?"productPromiseText productPromiseActive":"productPromiseText"}
                        onClick={()=>setTab(0)}>
                        <strong>جزئیات محصول</strong>
                    </div>
                </div>
                <div className="productPromise">
                    <div className={tabSelect===1?"productPromiseText productPromiseActive":"productPromiseText"}
                        onClick={()=>setTab(1)}>
                        <strong>مشخصات فنی</strong>
                    </div>
                </div>
                {/*<div className="productPromise">
                    <div className={tabSelect===2?"productPromiseText productPromiseActive":"productPromiseText"}
                        onClick={()=>setTab(2)}>
                        <strong>نظرات کاربران</strong>
                    </div>
                </div>
                <div className="productPromise">
                    <div className={tabSelect===3?"productPromiseText productPromiseActive":"productPromiseText"}
                        onClick={()=>setTab(3)}>
                        <strong>نمونه جزئیات </strong>
                    </div>
    </div>*/}
                
            </div>
            <div className="cPanel">
                
            <div style={{display:tabSelect===0?"block":'none'}}>
            <p dangerouslySetInnerHTML={{__html:product.fullDesc}}></p>
                </div>
            <div style={{display:tabSelect===1?"block":'none'}}>
                <h3>مشخصات فنی</h3>
                <p dangerouslySetInnerHTML={{__html:product.description}}></p>
                </div>
                
            <div className="panelHolder" style={{display:tabSelect===2?"block":'none'}}>
                <Comments productId={product.id} />
                </div>
                <div style={{display:tabSelect===3?"block":'none'}}>
                
            مشخصات محصول <h2>{product.title}</h2>
            <img src="https://amsoilcontent.com/ams/images/desc/Claim_K_800x800.jpg"/>
            <p>
            فرمول مصنوعی ممتاز که برای نیازهای منحصر به فرد موتورهای اروپایی طراحی شده است. از سیستم های آلایندگی پیشرفته محافظت می کند.
             هم برای موتورهای بنزینی و هم برای موتورهای دیزلی عالی است. برای تمیزی برتر موتور با لجن مبارزه می کند.
              عملکرد فوق العاده در تمام فصل طراحی شده برای فواصل تخلیه طولانی که توسط خودروسازان اروپایی ایجاد شده است. برای توربوشارژر عالی است. 
            </p>
            <a href="#">برای جزئیات کامل به برگه اطلاعات محصول مراجعه کنید. </a>
            
            <h3>حفاظت پیشرفته موتور</h3>
                <ul>
                <li>100% محافظت از موتور مصنوعی را برای فناوری پیشرفته خودرو ارائه می دهد.</li>
                <li>فرمولاسیون روغن از نظر حرارتی پایدار در برابر تشکیل رسوب مقاومت می کند و توربوشارژرها را خنک می کند.</li>
                <li> فرموله شده برای فواصل تخلیه طولانی که توسط خودروسازان اروپایی توصیه شده است.</li>
                </ul>
            <h3>پوشش کامل</h3>
            <ul>
                <li>مطابق با مشخصات سختگیرانه سازنده اروپایی و اغلب فراتر از آن است.</li>
                <li>روغن های پایه مصنوعی مقاوم در برابر برش و افزودنی های ضد سایش با کیفیت بالا.</li>
                <li>حفاظت عالی در شرایط دمای بالا</li>
                <li>عملکرد قابل اعتماد در فواصل طولانی تخلیه.</li>
            </ul>
            <h3>حفاظت از سیستم انتشار گازهای گلخانه ای</h3>
            <ul>
                <li>فرمولاسیون کاملا متعادل که برای استفاده با دستگاه های مدرن تصفیه اگزوز طراحی شده است.</li>
                <li>از سیستم های آلایندگی حساس با ترکیب بهینه SAPS (خاکستر سولفاته، فسفر، گوگرد) محافظت می کند.</li>
                <li>با دقت در شش نوع ساخته شده است تا از عملکرد صحیح سیستم آلایندگی اطمینان حاصل شود.</li>
            </ul>
            <h3>عالی برای توربوشارژرها</h3>
            <ul>
                <li>ترکیب قوی از موتورها در برابر دماهای بالای تولید شده توسط توربوشارژرها محافظت می کند.</li>
                <li>فرمولاسیون روغن از نظر حرارتی پایدار در برابر تشکیل رسوب مقاومت می کند و توربوشارژرها را خنک می کند.</li>
                <li>نقطه ریزش پایین از توربوشارژرها در برابر گرسنگی روغن در دماهای زیر صفر محافظت می کند. </li>
            </ul>
              
            
            </div>
                
            </div>
        </section>
    )
}
export default ProductDetail