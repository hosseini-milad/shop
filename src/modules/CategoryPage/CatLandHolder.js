
import { siteApiUrl } from "../../env"

function CatLandHolder(props){
    const subCatList = props.subCatList
    return(
        <div className="BrandList">
            {subCatList&&subCatList.map((category,i)=>(
                <a className="Brand" key={i} href={"/category/"+category.link}>
                    <img src={siteApiUrl+category.iconUrl}/>
                    <strong>{category.title}</strong>
                </a> 
            ))}
            
        </div>
    )
}
export default CatLandHolder