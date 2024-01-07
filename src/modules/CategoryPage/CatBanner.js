import { siteApiUrl } from "../../env";

function CatBanner(props){
    const sliderBanner = props.sliderBanner
    //console.log(sliderBanner)
    return(<>
        {sliderBanner?<div className="landingCat" >
            <img src={siteApiUrl+sliderBanner} style={{width:"100%"}}/>
        </div>:''}</>
    )
}
export default CatBanner