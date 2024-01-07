import { useEffect, useState } from "react";
import SimpleFetch from "../components/simpleFetch"
import env, { siteApi } from "../env"
import BreadCrumb from "../modules/allPages/BreadCrumb";

function Pages(){
    const [data,setData] = useState() 
    useEffect(() => {
        fetch(siteApi+env.pageApi)
        .then(res => res.json())
        .then(
        (result) => {
            setData(previousState => {
                return { ...previousState, pages: result }
              });
        })
    },[])
    const url = document.location.pathname.split('/')[2];
    
    var pageDetail = '';
    if(data&&data.pages)
        try{pageDetail = data.pages.data.pages.find(record=>record.payload.url===url).payload;}
        catch{}
    return(<>{data&&data.pages&&<main>
        <BreadCrumb pName={" صفحات /  "+pageDetail.title}/>
        <div className="categoryHolder">
            <div className="categorySide">
                <h4>صفحات</h4>
                {data.pages.data.pages.map((page,i)=>(
                    i<4&&
                    <div key={i} className={page.payload.url===url?"filterCat filterActive":"filterCat"}>
                        <a href={"/pages/"+page.payload.url}>{page.payload.title}</a>
                    </div>
                ))}
                    
            </div>
            <div className={url==="agent"?"categoryMain agentPage":"categoryMain"}>
                <h1>{pageDetail.title}</h1>
                <p dangerouslySetInnerHTML={{__html:data.pages&&pageDetail.content}}></p>
            </div>
        </div>
        </main>}</>
    )
}
export default Pages