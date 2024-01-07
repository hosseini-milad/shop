import env from "../../env"
function WhyUs(){
    return(
        <section className="whyUs">
			<div className="whyTitle">
				<h2 className="hiTitle">
				راهنمای انتخاب برچسب
				</h2>
				<p>مجموعه گسترده ای از پیکربندی ها و مواد برچسب ما را برای یافتن برچسب مناسب برای نیازهای خود خریداری کنید. برای شروع از بین برخی از محبوب ترین دسته های ما در زیر انتخاب کنید.</p>
			</div>
		  <div className="whyHolder">
			<div className="why" style={{backgroundImage: "radial-gradient(#b3cc9e,#9ab490)"}}>
				<h2>برچسب بر اساس سایز</h2>
				<img src={env.siteUrl+"/images/static/label-shapes-and-sizes.png"} />
			</div>
			<div className="why" style={{backgroundImage: "radial-gradient(#d1aed8,#b699bc)"}}>
				<h2>برچسب بر اساس جنس</h2>
				<img src={env.siteUrl+"/images/static/label-materials.png"} />
			</div>
			<div className="why" style={{backgroundImage: "radial-gradient(#e6cdab,#c4a882)"}}>
				<h2>برچسب بر اساس کاربرد</h2>
				<img src={env.siteUrl+"/images/static/label-uses.png"} />
			</div>
		  </div>
		</section>
    )
}
export default WhyUs