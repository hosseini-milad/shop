import env from '../env'
function Footer(props){
	const setting = props.setting;
    return(
		<>
		
        <footer>
			
		<div className="footerHolder">
			<div className="col25 mainSocial">
				<div className="logoCol">
					<div className="footerLogo">
						<img  src="https://sharifoilco.com/assets/imgs/header-logo.png" />
					</div>
					<div className='footerSubLogo'>
						{setting&&<div className="footerSocial">
					<a href={setting.data.find(record=>record.payload.item==="instagram_link").payload.value}>
							<i className="fab fa-instagram share"></i></a>
							{/*setting.data.find(record=>record.payload.item==="facebook_link").payload.value&&
							<a href={setting.data.find(record=>record.payload.item==="facebook_link").payload.value}>
	<i className="fab fa-facebook share"></i></a>*/}
						<a href={setting.data.find(record=>record.payload.item==="shop_telegram").payload.value}>
							<i className="fab fa-telegram share"></i></a>
						<a href={setting.data.find(record=>record.payload.item==="whatssapp_link").payload.value}>
							<i className="fab fa-whatsapp share"></i></a>
					</div>}
					<div className="namadHolder">
					<a referrerPolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=257247&Code=Ll8lsgN5sC5ASmkRNXpg"><img referrerPolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=257247&Code=Ll8lsgN5sC5ASmkRNXpg" alt="" style={{cursor:"pointer"}} id="Ll8lsgN5sC5ASmkRNXpg"/></a>
					</div></div>
				</div>
			</div>
			<div className="col25">
				<h4>چرا روانکاران شریف؟</h4>
				<ul>
					<li>موقعیت های شغلی</li>	
					<li><a href="/pages/about_us">درباره ما</a></li>
					<li>چرا روغن سینتتیک</li>
					<li>تست کارایی</li>
				</ul>	
			</div>
			<div className="col25">
				<h4>فروشگاه</h4>
				<ul>
					<li><a href="/category/motor-oil">روغن موتور</a></li>	
					<li><a href="/category/lubricants">روان کننده ها و پروکانت</a></li>
					<li><a href="/category/accessories">محصولات جانبی</a></li>
					<li><a href="/category/air-filter">فیلتر هوا</a></li>
				</ul>
			</div>
			<div className="col25">
				<h4>سرویس های مشتریان</h4>
				<ul>
					<li><a href="/pages/contact_us">تماس با ما</a></li>	
					<li><a href="/pages/policy">قوانین و مقررات</a></li>
					<li><a href="/profile">حساب کاربری</a></li>
					<li><a href="/pages/agent">شعب</a></li>
				</ul>
			</div>
			<div className="col25">
				<h4>ارتباط با ما</h4>
				<ul>
					<li>
						<a href="https://goo.gl/maps/qkSFrkWFttJNLP9UA">کرج جاده قزلحصار رو به روی پمپ بنزین خیابان پارس لانه بتن پلاک 15</a>
					</li>
					<hr/>
					<li>شماره تماس: 
						<a href="tel:9-02634011002">9-02634011002</a>
					</li>
					<hr/>
					<li>واتساپ: 
							<a href="http://Wa.me/+989038013986">09038013986</a>
					</li>
				</ul>
			</div>
		</div>
		<div className="copyHolder">
			<div className="col50">
				تمامی حقوق سایت برای روانکاران شریف محفوظ است
			</div>
			<div className="col50">طراحی و اجرا: 
				<a href="https://reyham.com"> ریحـــام </a>
			</div>
		</div>
	</footer>
	</>
    )
}
export default Footer