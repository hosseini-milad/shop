import Slider from "react-slick";
import env, { normalPrice, siteApiUrl } from "../../env";

function PackageSlider(props){
    const accessoryCat = props.data;
    //console.log(accessoryCat)
    var settings = {
        arrows: true,
        infinite: true,
        autoplay:true,
        autoplaySpeed:5000,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 2
      };
      return (
        <div className="packageSlider">
        <Slider {...settings}>
          
            {accessoryCat&&accessoryCat.map((subCat,i)=>(
            <div key={i}>
                <a key={subCat.id} className="megaItem" href={"/product/"+subCat.sku}>
                    <img src={siteApiUrl+subCat.image_url} />
                    <div className="megaItemText"><sub>{subCat.title}</sub>
                     {subCat.get_product_warranty[0]?<>
                     <small>{subCat.get_product_warranty[0].price1}</small>
                     <span>{normalPrice(subCat.get_product_warranty[0].price2)} تومان </span></>
                     :<><small></small><span>تماس بگیرید</span></>}
                     </div>
                   
                </a>  
          </div>
            ))}
          
        </Slider>
        </div>
      );
}
export default PackageSlider