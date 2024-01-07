import MetaTags from 'react-meta-tags';
import env,{siteApi, siteApiUrl} from '../env'
import SimpleFetch from "../components/simpleFetch"
import Slider from '../modules/homePage/Slider';
import QuickSearch from "../modules/allPages/SearchPart/quickSearch"
import Categories from '../modules/homePage/Categories';
import LastProducts from '../modules/homePage/LastProducts';
import Posts from '../modules/homePage/Posts';
import HomeSeo from '../modules/homePage/HomeSeo';
import { useEffect, useState } from 'react';
import BrandSlider from '../modules/homePage/BrandSlider';

function Home(){
    const [homeData,setHomeData] = useState() 
    useEffect(() => {
        

        fetch(siteApi+env.mainPageApi)
        .then(res => res.json())
        .then(
        (result) => {
            setHomeData(previousState => {
                return { ...previousState, Sliders: result.slider }
              });
        })
    },[])
    //console.log(homeInfo)
    return (<>{homeData&&
        <>
          {homeData.Sliders&&<Slider slides={homeData.Sliders} /> }
           <div className="homeSideBar"> 
                {/*<h3>پیدا کردن محصولات برای:</h3>*/}
                <QuickSearch quickSearch={homeData.quickSearch}/>
            </div>
            <Categories/>
           <div className="bannerRow">
			    <div className="catalogueText">
                    <h2 style={{margin: "5px 20px"}}>
                    کاتالوگ محصولات و قیمت ها به روز را از ما بخواهید
                    </h2>
                    <div style={{margin: "0 20px 10px"}}><p>
                    به روز ترین اطلاعات مرتبط با روغن و روان کننده ها
                    </p>
                    <a href={"#"}
                      className="catalogDl">
                        <i className="icon-size fas fa-swatch"></i> 
                        دریافت کاتالوگ    
                    </a>
                    </div>
                </div>
                <img src={"https://admin.sharifoilco.com/files/images/1661078515.jpg"} />
                
		   </div>
           {/*<Posts/>
           <WhyUs/>*/}
           {homeData.homeInfo&&<LastProducts catList={homeData.homeInfo.data.categories}/>}
           <Posts/>
           {homeData.homeInfo&&<BrandSlider data={homeData.homeInfo.data} />}
           {homeData.page&&<HomeSeo page={homeData.page} />}
        </>
    }</>
    )
}
export default Home