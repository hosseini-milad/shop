import { useState } from "react";
import SimpleFetch from "../components/simpleFetch"
import env, { siteApi } from "../env"

function OilBrand(){
    const brands = SimpleFetch(siteApi+env.mainPageApi);
    const [oilbrands,setBrands]=useState('')
    if(!oilbrands&&brands){
        var tempBrand = []
        for(var i=0;i<brands.data.brand.length;i++){
            console.log(brands.data.brand[i])
          if(brands.data.brand[i].payload.categorys[0]&&
            brands.data.brand[i].payload.categorys[0].payload.ename==="motor-oil")
            tempBrand.push(brands.data.brand[i])
        }
        setBrands(tempBrand)
    }
    return(
        <main>
            <h1>برندهای روغن روانکاران</h1>
            <div className="BrandsPart">
                <div className="BrandList">
                    {oilbrands&&oilbrands.map((brand,i)=>(
                       <a className="Brand" key={i} href={"/oil-brand/"+brand.payload.title}>
                          <img src={brand.payload.image}/>
                          <strong>{brand.payload.title}</strong>
                        </a>
                    ))}
                    
                </div>
            </div>
        </main>
    )
}
export default OilBrand