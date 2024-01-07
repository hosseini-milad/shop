import { useEffect, useState } from "react";
import env,{ siteApi,siteApiUrl } from "../env";
import CartMenu from "../modules/allPages/header/CartMenu";
import LoginMenu from '../modules/allPages/header/loginMenu'
import MegaMenuAccessory from "../modules/allPages/MegaMenuAccessory";
import MegaMenuLubricant from "../modules/allPages/MegaMenuLubrican";
import MegaMenuOil from '../modules/allPages/MegaMenuOil'
import QuickSearch from "../modules/allPages/SearchPart/quickSearch";
import SearchArea from '../modules/allPages/SearchPart/SearchArea'
import SimpleAuth from "./simpleAuth";
var token = JSON.parse(localStorage.getItem('token-oil'));

function Header(props){
	const setting = props.setting;
	//console.log(cart)
	var url = '';
	try{ url = document.location.pathname.split('/')[1]}
	catch{}
	const cart = ''//SimpleAuth(siteApi+env.cartDetailApi)
	/*const [cart,setCart] = useState('');
	useEffect(() => {
		if(!token) return;
		const postOptions={
		  method:'get',
		  headers: { 'Content-Type': 'application/json' ,
		  "Authorization": "Bearer "+token&&token.token}
		}
		fetch(siteApi+env.cartDetailApi,postOptions)
		.then(res => res.json())
		.then(
		  (result) => {
			setCart(result)
		  },
		  (error) => {
			console.log(error)
		  })
	},[])*/
	//console.log(cart)
	const [oilMenu,setOilMenu] = useState("none");
	const [lubMenu,setLubMenu] = useState("none");
	const [accMenu,setAccMenu] = useState("none");
	const [searchMenu,setSearch] = useState("hidden");
	const [cartMenu,setCartMenu] = useState("hidden");
	const [loginMenu,setLoginMenu] = useState("hidden");
	const [searchPhrase,setSearchPhrase] = useState('');
	const [currentHover,setHover]= useState(0)
	
	const handleOilMenuHover=()=>{setOilMenu("block")}
	const handleOilMenuOut=()=>{setOilMenu("none")}
	const handleLubMenuHover=()=>{setLubMenu("block")}
	const handleLubMenuOut=()=>{setLubMenu("none")}
	const handleAccMenuHover=()=>{setAccMenu("block")}
	const handleAccMenuOut=()=>{setAccMenu("none")}
	
	const handleSearchHover=()=>{setSearch("visible");setHover(1)}
	const handleSearchOut=()=>{setSearch("hidden");setHover(0)}
	
	const handleLoginHover=()=>{setLoginMenu("visible");setHover(3)}
	const handleLoginOut=()=>{setLoginMenu("hidden");setHover(0)}

	const handleCartHover=()=>{setCartMenu("visible");setHover(4)}
	const handleCartOut=()=>{setCartMenu("hidden");setHover(0)}
	

    return(
        <header>
			<div className="topTop">
				<>
				<span>اگر همکار هستید و دنبال بهترین قیمت و ضمانت کالای اصل میگردید
				<a href="tel:9-02634011002"> با ما تماس بگیرید </a></span>
				
				<div className="topSocial"> 
				<small className="topContact">
				برای اطلاع از تخفیف‌ها شبکه های اجتماعی ما را دنبال کنید
				</small>
				<a href="https://www.instagram.com/oilcosharif">
					<i className="fab fa-instagram share"></i>
				</a>
				<a href="http://wa.me/+989038013986">
					<i className="fab fa-whatsapp share"></i>
				</a>
				<a href="https://t.me/+989901818918">
					<i className="fab fa-telegram share"></i>
				</a>
				</div></>
			</div>
		<div className="topHeader">
			<a className="logo" href="/">
				<img src="https://sharifoilco.com/assets/imgs/header-logo.png" alt="Sharifi Oil Logo" width="192px" height="54px"/>
			</a>
			<div className="search">
				<div className="searchPlace">
					<input type="text" placeholder="جستجو" className="v-auto-search__input"
				 onChange={(e)=>setSearchPhrase(e.target.value)}
				 onKeyDown={(e)=>{if (e.key === 'Enter') 
					window.location = "/category?search="+searchPhrase;
				  }}/> 
				<a href={"/category?search="+searchPhrase} className="v-auto-search__search-icon">
					<i className="fas fa-search"></i></a>
				</div>
			</div>
			<div className="icons">
			<div className="account">
				<div className="mainHolder" onMouseOver={handleSearchHover}
						onMouseOut={handleSearchOut}>
					<i className="icon-size circleIcon fas fa-car" style={{backgroundColor:currentHover===1?"var(--second-color)":""}}></i>
					<div className="account-heading">جستجوی سریع</div>
					<i className="fas fa-angle-down"></i>
					<div className="megaMenuHeader" style={{visibility:searchMenu}}>
						<div className="megaSideBar">
							<h3>جستجوی خودرو</h3>
							<p>سریع ترین و ساده ترین راه برای تعیین اینکه به کدام محصولات نیاز دارید. مشاهده همه راهنماها ›</p>
						</div>
						<QuickSearch quickSearch={props.quickSearch}/> 
					</div>
				</div>
			</div>
			<div className="cart hideMenu" onMouseOver={()=>setHover(2)} onMouseOut={()=>setHover(0)}>
				<a className="mainHolder" 
					href={setting&&siteApiUrl+'/'+setting.data.find(record=>record.payload.item==="catalogue_file").payload.value}>
					<i className="icon-size circleIcon fas fa-book" style={{backgroundColor:currentHover===2?"var(--second-color)":""}}></i>
					<span className="cart-heading">کاتالوگ</span>
				</a>
			</div>
			<div className="cart showMobile">
				<div className="mainHolder">
					<i className="icon-size circleIcon fas fa-address"></i>
				</div>
			</div>
			<div className="account">
				<div className="mainHolder" onMouseOver={handleLoginHover}
						onMouseOut={handleLoginOut}>
					<i className="icon-size circleIcon fas fa-user"  style={{backgroundColor:currentHover===3?"var(--second-color)":""}}></i>
					<div className="account-heading">حساب کاربری</div>
					<i className="fas fa-angle-down"></i>
					<div className="megaMenuHeader megaMenuSingle" style={{visibility:loginMenu}}>
						<LoginMenu userInfo={props.userInfo}/>
					</div>
				</div>
			</div>
			<div className="cart">
				<div className="mainHolder" onMouseOver={handleCartHover}
						onMouseOut={handleCartOut}>
							{cart&&cart.data&&cart.data.orderLists.length?<b className="cartNum">{cart.data.orderLists.length}</b>:''}
					<i className="icon-size circleIcon fas fa-shopping-cart"  style={{backgroundColor:currentHover===4?"var(--second-color)":""}}></i>
					<span className="cart-heading">سبد خرید</span>
					<div className="megaMenuHeader megaMenuSingle" style={{visibility:cartMenu}}>
						{cart&&!cart.error&&cart!=="register"?<CartMenu cart={cart.data}/>:''}
						<span style={{color:"gray"}}>{cart==="register"&&"لطفا ثبت نام کنید."}</span>
					</div>
					<small>{cart&&!cart.error&&cart!=="register"?cart.data.orderLists.totalPrice:''}</small>
					
				</div>
			</div>
			</div>
		</div>
		<div className="menu">
			<div className="menuNavBar">
			<ul>
					<li className="menuItem" onMouseOver={handleOilMenuHover}
						onMouseOut={handleOilMenuOut}><a href="/category/motor-oil"> روغن موتور</a>
						<i className="fas fa-chevron-down"></i>
						<div className="MegaMenuLable" style={{display:oilMenu}}>
							<MegaMenuOil setting={setting} category={props.category&&props.category.data}/>
						</div>
					</li>
					<li className="menuItem" onMouseOver={handleLubMenuHover}
						onMouseOut={handleLubMenuOut}>
							<a href="/category-landing/lubricants">روان کننده موتور</a>
							<i className="fas fa-chevron-down"></i>
							<div className="MegaMenuLable" style={{display:lubMenu}}>
							  <MegaMenuLubricant  setting={setting} category={props.category&&props.category.data} cats={props.cats}/>
						</div>
					</li>
					<li className="menuItem" onMouseOver={handleAccMenuHover}
						onMouseOut={handleAccMenuOut}>
							<a href="/category-landing/accessories">محصولات جانبی</a>
							<i className="fas fa-chevron-down"></i>
							<div className="MegaMenuLable" style={{display:accMenu}}>
							  <MegaMenuAccessory  setting={setting} category={props.category&&props.category.data} cats={props.cats}/>
						</div>
						</li>
					<li className="menuItem"><a href="/blog">بلاگ</a></li>
				</ul>
			</div>
			<div className="contact">
				{!url?<h1>فروشگاه اینترنتی روغن موتور</h1>:<h2>فروشگاه اینترنتی روغن موتور</h2>}
				{/*<a href="https://www.google.com/maps/place/فروشگاه+روغن+شریفی‭/@35.8476641,50.9075944,14z/data=!4m6!3m5!1s0x3f8dbfff7afc7d83:0x57f83a01a957b7ff!8m2!3d35.8384117!4d50.9398898!15sChnZgdix2YjYtNqv2KfZhyDYtNix24zZgduMkgEFc3RvcmU">
					<i className="icon-size fas fa-address"></i>
				<span>نزدیک ترین فروشگاه شریفی</span></a>*/}
			</div>
		</div>
	</header>
    )
}
export default Header