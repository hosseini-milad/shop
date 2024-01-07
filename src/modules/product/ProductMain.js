import { useState } from "react"
import { siteApiUrl } from "../../env";
import PriceSelectPop from "./PriceSelectPop";
import ProductMainDetail from "./ProductMainDetail";
 
function ProductMain(props){
    const [pop1,setPop1] = useState("none");
    const [pop2,setPop2] = useState("none");
    
    const product = props.product;
    const handleDataField=()=>{
        setPop2("none");
        pop1==="none"?setPop1("block"):setPop1("none")
    }
    const handlePriceField=()=>{
        setPop1("none");
        pop2==="none"?setPop2("block"):setPop2("none")
    }
    console.log(product)
    return(
        <div className="productMainHolder">
            <div className="productSData">
              <div className="productImg">
                <div className="galleryImg">
                    {product.gallery&&product.gallery.map(gallery=>(
                        <img key={gallery.id} src={siteApiUrl+gallery.image_url} />
                    ))}
                </div>
                <div className="mainImg">
                    <img src={(product.data&&product.data.imageUrl)?
                        siteApiUrl+product.data.imageUrl:
                            "/images/motor-oil.jpg"
                    } />
                    
                </div>
               </div> 
            </div>
            <div className="productMainDetail">
                <ProductMainDetail product={product} cart={props.cart}/>
            </div>
        </div>
        )
}
export default ProductMain