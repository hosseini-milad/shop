import env, {normalPrice, siteApi, siteApiUrl} from '../../env'
import SimpleFetch from "../../components/simpleFetch"

function MegaMenuOil(props){
    const setting = props.setting
    const mainProducts = props.category; 
   //console.log(mainProducts)
    return(
    <div className="menuMegaLable">
        <div className="menuMain">
            <div className="megaItems" style={{display: "flex"}}>
                <a className="megaItem" href="/quick-search">
                    {/*<div className="megaItemText"><strong>نوع وسیله نقلیه</strong></div>*/}
                    <img src="https://sharifoilco.com/images/vehicle-kind.png" />
                </a>
                <a className="megaItem" href="/kinds">
                    <img src="https://sharifoilco.com/images/oil-kind.png" />
                </a>
                <a className="megaItem" href="/oil-brands">
                    <img src="https://sharifoilco.com/images/brands.png" />
                </a>
                
            </div>
            <div className="megaMainSub hideMenu">
                <div className="blueA" >ضمانت اصالت کالا</div>
                <div className="blueA" >قیمت مناسب</div>
                <div className="blueA" >خدمات پس از فروش</div>
            </div>
            {setting&&<div className="megaMenuBanner hideMenu" 
            onClick={()=>document.location=
                setting.data.find(record=>record.payload.item==="mega_menu_link").payload.value}
            style={{backgroundImage:`url('${siteApiUrl+'/'+setting.data.find(record=>record.payload.item==="mega_menu_picture").payload.value}')`}}>
                <h3>{setting.data.find(record=>record.payload.item==="mega_menu_title").payload.value}
                </h3>
    
                <a className="blueA">اکنون خرید کنید <span className="u-font-size--small">►</span></a>

            </div>}
        </div>
        <div className="menuSideBar">
            <strong>پرفروش ترین روغن ها</strong>
            {mainProducts&&mainProducts.categories[0].payload.products.map((product,i)=>(
                i>2?'':
                <div className="menuSideBarItem" key={i}>
                <img src={siteApiUrl+ product.payload.image_url}/>
                <div className="mySideBarItemText">
                    <a href={"/product/"+product.payload.sku} className="blueA">{product.payload.title}</a>
                    <small>کد محصول: {product.payload.sku}</small>
                    <small>{normalPrice(product.payload.price)}<sub> تومان </sub></small>
                </div>
            </div>
            ))}
            
            <a href="/category/motor-oil" className="blueA">مشاهده همه روغن موتورها</a>
        </div>
    </div>
        )
}
export default MegaMenuOil