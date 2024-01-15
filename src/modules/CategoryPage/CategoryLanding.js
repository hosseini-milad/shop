import { useEffect, useState } from "react";
import SimpleFetch from "../../components/simpleFetch"
import env, { siteApi,siteApiUrl } from "../../env"
import LoadMore from "../etc/loadmore";
import CatLandHolder from "./CatLandHolder";

function CategoryLanding(props){
    const url = document.location.pathname.split('/')[2];
    const [catData,setCatData] = useState() 
    const [subCatList,setSubCatList] = useState() 
    useEffect(() => {
        var postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({catName:url})
          }
        fetch(siteApi+"/product/subcategory",postOptions)
        .then(res => res.json())
        .then(
        (result) => {
            setCatData(result.catData);
            setSubCatList(result.subCategory)
        })
    },[])
    
    //console.log(catDesc)
    return(<main>
        {catData?<>
            <h1>{catData.title}</h1>
            <div className="BrandsPart">
                <CatLandHolder subCatList={subCatList} />
            </div>
        </>:<h2>در حال جستجو</h2>}
        <LoadMore catDetail={catData}/>
    </main>)
}
export default CategoryLanding