import { useState } from "react"
import tabletrans from "../../translate/tables"
import ProductTableRow from "./ProductTableRow";

function ProductTable(props){
  const productList = props.product
  const lang=props.lang;
  const [detail,showDetail] = useState(-1)
    return(
        <table>
        <thead>
        <tr>
          <th className="checkBoxStyle">
              <input type="checkbox" name="" id=""/></th>
            <th>
              <p>{tabletrans.productName[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.brand[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.item[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.price[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.countanbar[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.taxPrice[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.status[lang]}</p>
              <i></i>
            </th>
            <th>
            </th>
          </tr>
        </thead>
        <tbody>
          {productList&&productList.filter?
            productList.filter.map((product,i)=>(
            <ProductTableRow detail={detail} showDetail={showDetail} 
            product={product} index={i} key={i} lang={lang} stockId={props.store}
            count={productList.quantity[i]} price={productList.price[i]}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default ProductTable