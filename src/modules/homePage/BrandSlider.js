import Slider from "react-slick";
import env, { normalPrice, siteApiUrl } from "../../env";

function BrandSlider(props){
    const BrandCat = props.data.brand;
    console.log(BrandCat)
    var settings = {
        arrows: true,
        infinite: true,
        autoplay:true,
        autoplaySpeed:5000,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 3
      };
      return (
        <div className="packageSlider">
        <Slider {...settings}>
          
            {BrandCat&&BrandCat.map((brand,i)=>(
            <div key={i}>
                <a key={brand.payload.id} className="megaItem" href={"/brand/"+brand.payload.title}>
                    <img src={brand.payload.image} style={{width:"100%",maxHeight:"120px",objectFit:"contain"}}/>
                    <div className="megaItemText"><sub>{brand.payload.title}</sub>
                     
                     </div>
                   
                </a>  
          </div>
            ))}
          
        </Slider>
        </div>
      );
}
export default BrandSlider