import ProductSingle from "./ProductSingle"

function ProductList(){
    return(
        <section className="product-sec">
        <ProductSingle />
          <ProductSingle />
          <ProductSingle />
          <ProductSingle />
      </section>
    )
}
export default ProductList