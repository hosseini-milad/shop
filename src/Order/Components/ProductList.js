import ProductSingle from "./ProductSingle"

function ProductList(){
    return(
        <section className="product-sec">
        <ProductSingle id={5}/>
          <ProductSingle id={7}/>
          <ProductSingle id={8}/>
          <ProductSingle id={9}/>
      </section>
    )
}
export default ProductList