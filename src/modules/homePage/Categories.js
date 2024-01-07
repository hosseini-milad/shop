function Categories(props){
    return(
        <section className="products">
		  <div className="productHolder">
			  <div className="productList">
				<div className="product3">
					<a href="/category/motor-oil">
						<img src="/images/wallet.jpg" alt="Shop by Size" />
					</a>
					<div className="product3Text"><h3><a href="/category/motor-oil">خرید انواع روغن موتور</a></h3>
					<p>مناسب ترین قیمت ها در فروشگاه آنلاین ما</p>
					<a href="/category/motor-oil" className="catalogDl product3Dl">
                        <i className="icon-size fas fa-eye"></i> مشاهده </a>
					</div>
				</div>
				<div className="product3 product3M">
					<a href="/category-landing/accessories">
						<img src="/images/cart.jpg" alt="Shop by Size" />
					</a>
					<div className="product3Text"><h3><a href="/category-landing/accessories">خرید انواع فیلتر</a></h3>
					<p>توضیحات تخصصی و فروش آنلاین انواع روغن موتور، روان کننده و انواع فیلترها</p>
					<a href="/category-landing/accessories" className="catalogDl product3Dl">
                        <i className="icon-size fas fa-eye"></i> مشاهده </a>
						</div>
				</div>
				<div className="product3">
					<a href="/category-landing/lubricants">
						<img src="/images/motor-oil.jpg" alt="Shop by Size" />
					</a>
					<div className="product3Text"><h3><a href="/category-landing/lubricants">خرید انواع روان کننده</a></h3>
					<p>مرجع کامل از اطلاعات روغن موتور در بلاگ شریف اویل</p>
					<a href="/category-landing/lubricants" className="catalogDl product3Dl">
                        <i className="icon-size fas fa-eye"></i> مشاهده </a>
						</div>
				</div>
			  </div>
		  </div>
		</section>
    )
}
export default Categories