import Slider from "react-slick";
import { siteApiUrl } from "../../env";

function ProductSlider(props){
    const accessoryCat = props.data;
    var settings = {
        arrows: true,
        rtl:true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2
      };
      return (
        <Slider {...settings}>
          
            {accessoryCat&&accessoryCat.map((subCat,i)=>(
            <div key={i}>
                <a key={subCat.id} className="megaItem" href={"/category/"+subCat.ename}>
                    {/*<div className="megaItemText"><strong>{subCat.name}</strong></div>*/}
                    <img src={siteApiUrl+subCat.img} />
                </a>  
          </div>
            ))}
          
        </Slider>
      );
}
export default ProductSlider