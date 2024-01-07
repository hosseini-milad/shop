import SimpleFetch from "../../components/simpleFetch"
import env, { normalPrice, siteApi, siteApiUrl } from "../../env"
import ProductSlider from "./ProductSlider";

function MegaMenuAccessory(props){
    const setting = props.setting
    const mainProducts = props.category//SimpleFetch(siteApi+env.categoryApi) 
    const mainCats = props.cats;
    //console.log(mainProducts)
    var accessoryCat = ''
    if(mainCats)
        accessoryCat = mainCats.find(cat=>cat.id===222).get_child;
    //console.log(accessoryCat)
    return( 
    <div className="menuMegaLable">
        <div className="menuMain">
            <div className="megaItems">
                {/*accessoryCat&&accessoryCat.map(subCat=>(
                    <a key={subCat.id} className="megaItem" href={"/category/"+subCat.ename}>
                        <div className="megaItemText"><strong>{subCat.name}</strong></div>
                        <img src={siteApiUrl+subCat.img} />
                    </a>
                ))*/}
                {accessoryCat&&<ProductSlider data={accessoryCat} />}
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
            <strong>جدیدترین محصولات</strong>
            {mainProducts&&mainProducts.categories[2].payload.products.map((product,i)=>(
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
            
            <a className="blueA">مشاهده همه محصولات جانبی</a>
        </div>
    </div>
        )
}
export default MegaMenuAccessory