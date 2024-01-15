import { useEffect, useState } from "react";
import env, { normalPrice, siteApi, siteApiUrl } from "../../env"
import ProductSlider from "./ProductSlider";
import CatLandHolder from "../CategoryPage/CatLandHolder";

function MegaMenuLubricant(props){
    const [subCatList,setSubCatList] = useState() 
    const [catProduct,setCatProduct] = useState() 
    useEffect(() => {
        var postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({catName:'lubricants'})
          }
        fetch(siteApi+"/product/subcategory",postOptions)
        .then(res => res.json())
        .then(
        (result) => {
            setCatProduct(result.catProduct);
            setSubCatList(result.subCategory)
        })
    },[])
    return( 
    <div className="menuMegaLable">
        <div className="menuMain">
            <div className="megaItems">
                <CatLandHolder subCatList={subCatList} />
            </div>
            <div className="megaMainSub hideMenu">
                <div className="blueA" >ضمانت اصالت کالا</div>
                <div className="blueA" >قیمت مناسب</div>
                <div className="blueA" >خدمات پس از فروش</div>
            </div>
            
        </div>
        <div className="menuSideBar">
            <strong>جدیدترین محصولات</strong>
            {catProduct&&catProduct.map((product,i)=>(
                <div className="menuSideBarItem" key={i}>
                <img src={siteApiUrl+ product.thumbUrl}/>
                <div className="mySideBarItemText">
                    <a href={"/product/"+product.sku} className="blueA">{product.title}</a>
                    <small>کد محصول: {product.sku}</small>
                    <small>{normalPrice(product.price)}<sub> تومان </sub></small>
                </div>
            </div>
            ))}
            
            <a className="blueA">مشاهده همه روان کننده ها</a>
        </div>
    </div>
        )
}
export default MegaMenuLubricant