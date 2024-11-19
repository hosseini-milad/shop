import ProductSingleSale from "./ProductSingleSale";

function ProductListSale(props) {
  const products = props.products;
  return (
    <section className="product-sec">
      {products &&
        products.map((product, i) => (
          <ProductSingleSale
            data={product}
            id={i}
            key={i}
            setCart={props.setCart}
            setError={props.setError}
            payValue={props.payValue}
            token={props.token}
            user={props.user}
          />
        ))}
    </section>
  );
}
export default ProductListSale;
