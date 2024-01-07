import SimpleFetch from "../components/simpleFetch"
import env, { siteApi } from "../env"

function Brand(){
    const brands = SimpleFetch(siteApi+env.mainPageApi)
    console.log(brands)
    return(
        <main>
            <h1>برندهای روانکاران</h1>
            <div className="BrandsPart">
                <div className="BrandList">
                    {brands&&brands.data.brand.map((brand,i)=>(
                       <a className="Brand" key={i} href={"/brand/"+brand.payload.title}>
                          <img src={brand.payload.image}/>
                          <strong>{brand.payload.title}</strong>
                        </a> 
                    ))}
                    
                </div>
            </div>
        </main>
    )
}
export default Brand