import { useEffect, useState } from "react";
import SimpleFetch from "../../components/simpleFetch"
import env, { siteApi,siteApiUrl } from "../../env"
import LoadMore from "../etc/loadmore";

function CategoryLanding(props){
    const [catData,setCatData] = useState() 
    useEffect(() => {
        fetch(siteApi+env.categoryApi)
        .then(res => res.json())
        .then(
        (result) => {
            setCatData(previousState => {
                return { ...previousState, cats: result }
              });
        })

        fetch(siteApi+env.pageApi)
        .then(res => res.json())
        .then(
        (result) => {
            setCatData(previousState => {
                return { ...previousState, page: result }
              });
        })
    },[])
    const page= catData&&catData.page;
    const cats=catData&&catData.cats;
    //console.log(props)
    const pathName = document.location.pathname;
    var catEName = ''
    //if(categories)
        catEName = pathName.split('/')[2]?pathName.split('/')[2]:""
    
    const url = document.location.pathname.split('/')[2];
    var catDesc = '';
    if(cats)
        catDesc = cats.find(item=>item.ename === url);
    //console.log(catDesc)
    return(<main>
        {catDesc?<>
            <h1>{catDesc.name}</h1>
            <div className="BrandsPart">
                <div className="BrandList">
                    {catDesc.get_child.map((brand,i)=>(
                       <a className="Brand" key={i} href={"/category/"+brand.ename}>
                          <img src={siteApiUrl+brand.img}/>
                          <strong>{brand.name}</strong>
                        </a> 
                    ))}
                    
                </div>
            </div>
        </>:<h2>در حال جستجو</h2>}
        <LoadMore catDetail={page&&page.data.pages.find(record=>record.payload.url===catEName)}/>
    </main>)
}
export default CategoryLanding