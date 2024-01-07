import { useState } from "react";

function HomeSeo(props){
    const page = props.page;
    const [readMore,setReadMore] = useState(0)
    return(
        <div className="topFooter">
            <div className={readMore?'seoClose':'seoReadmore'} dangerouslySetInnerHTML={{__html:page.data.pages.find(record=>record.payload.url==="seo-footer").payload.content}}></div>
            <a onClick={()=>setReadMore((readMore+1)%2)} className='readMoreBtn'>{readMore?"بستن":"مشاهده بیشتر"}</a>
        </div>
    )
}
export default HomeSeo