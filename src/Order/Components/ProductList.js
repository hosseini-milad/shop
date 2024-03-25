import ProductSingle from "./ProductSingle"

function ProductList(props){
    const products = props.products
    return(
        <section className="product-sec">
          {products&&products.map((product,i)=>(
            <ProductSingle data={product} id={i} key={i}/>
          ))}
      </section>
    )
}
export default ProductList