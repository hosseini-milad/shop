import env, { siteApiUrl } from "../../env"
import '../../css/slider.css'
import ImageGallery from 'react-image-gallery';
//import { SLIDER_QUERY } from "../../components/Query";
function Slider(props){
	const sliders = props.slides;
	//console.log(sliders)
	const setting = props.setting
	const linkNow=(e)=>{
		window.open(e.alt, '_blank'); 
	}
	var sliderToShow=[];
	if(sliders)
	for(var indx = 0; indx<sliders.length;indx++)
		if(1||sliders[indx].link === "mainpage")
			sliderToShow.push(sliders[indx]);
	console.log(sliders)
    return(<>
	{setting&&<div className="topBanner">
		<span dangerouslySetInnerHTML={{__html:setting.data.find(record=>record.payload.item==="news").payload.value}}>
		</span>
	</div>}
        <section className="banner">
		  {sliders&&<ImageGallery 
			showFullscreenButton={false} 
			showPlayButton={false} 
			isRTL={true}
			autoPlay={true}
			slideDuration={1500}
			slideInterval={4000}
			showBullets={true}
			showThumbnails={false} 
			onClick={(e)=>linkNow(e.target)}
			items={
				sliderToShow&&sliderToShow.map(slide=>(
					{
						original:  siteApiUrl+slide.imageUrl,
						originalAlt:slide.title
					}
				))	
			}
			/>}
		</section>
		</>
    )
}
export default Slider