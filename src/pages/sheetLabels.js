import SimpleFetch from "../components/simpleFetch"
import env, { siteApi } from "../env"
import LandignPage from "../modules/etc/landingPage"
import Adv from "../modules/etc/adv"
import LoadMore from "../modules/etc/loadmore"
import Popular from "../modules/etc/popular"
import LastProducts from "../modules/homePage/LastProducts"
import WhyUs from "../modules/homePage/WhyUs"

function SheetLabel(){ 
  const sliders = SimpleFetch(siteApi+env.sliderApi)
  const products = SimpleFetch(siteApi+env.mainPageApi)
  console.log(sliders)
    const url = document.location.pathname.split('/')[2];
    return(<> 
    {sliders&&<LandignPage url={url} sliders={sliders}/>}
    <WhyUs url={url}/>
    <Adv />
        <section className="whyUs">
            <div className="whyTitle">
              <h2>
              بررسی محبوب ترین روغن موتور ها
              </h2>
              <a> مشاهده همه </a>
            </div>
            <Popular/> 
            <div className="whyTitle">
              <h2>
              بررسی محبوب ترین روغن موتورها
              </h2>
              <a> مشاهده همه </a>
            </div>
            {products&&<LastProducts catList={products.data.categories} url={url}/>}
            <LoadMore page={url}/>
		</section>

    </>)
}
export default SheetLabel