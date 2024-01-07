import SimpleFetch from "../components/simpleFetch"
import env, { siteApi } from "../env"

function Kinds(){
    const brands = SimpleFetch(siteApi+env.filterListApi+"motor-oil")
    var kinds = '';
    if(brands)
        kinds = brands.filter.find(kind=>kind.id===223);
    console.log(brands)
    return(
        <main>
            <h1>انواع روغن موتور روانکاران</h1>
            <div className="BrandsPart">
                <div className="BrandList">
                    {kinds&&kinds.get_child.map((kinds,i)=>(
                       <a href={"/category?filter="+kinds.id} className="Brand" key={i}>
                          <img src={"https://www.amsoilcontent.com/ams/images/home-cta-why.jpg"}/>
                          <strong>{kinds.title}</strong>
                        </a> 
                    ))}
                    
                </div>
            </div>
        </main>
    )
}
export default Kinds