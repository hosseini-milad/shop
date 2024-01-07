import SimpleFetch from "../../components/simpleFetch";
import env, { siteApi, siteApiUrl } from "../../env"

function LandignPage(props){
     
    const curSlider=props.sliders.find(record=>record.title===props.url)
    console.log(curSlider)
    return(<>{curSlider&&
        <div className="landingCat" style={{backgroundImage:
        "url("+siteApiUrl+curSlider.image_url+")"}}>
        <div className="landingText">
            <h1>{curSlider.url}</h1>
            <a href="#reviews" aria-label="View customer reviews">
                <div className="p-review-stars">
                    <span className="p-review-stars__star-icon">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                    </span>
                    {/*<span>
                    4.9 نمره <span className="show-for-medium">بر اساس</span> <span className="hide-for-medium">(</span>1,135 نظرات<span className="hide-for-medium">)</span>
        </span>*/}

                </div>
            </a>
            <small dangerouslySetInnerHTML={{__html:curSlider.content}}></small>
           
        </div> </div>}</>
    )
}
export default LandignPage