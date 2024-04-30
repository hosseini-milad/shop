import { useState } from "react"
import tabletrans from "../../translate/tables"
import BrandTableRow from "./BrandTableRow";

function BrandTable(props){
  const brand = props.brand
  const lang=props.lang;
  const [detail,showDetail] = useState(-1)
  
    return(
        <table>
        <thead>
        <tr>
          <th className="checkBoxStyle">
              <input type="checkbox" name="" id=""/></th>
            <th>
              <p>{tabletrans.brand[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.brandName[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.status[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.action[lang]}</p>
              <i></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {brand&&brand.filter?brand.filter.map((brand,i)=>(
            <BrandTableRow setLoading={props.setLoading} detail={detail} showDetail={showDetail} 
            brand={brand} index={i} key={i} lang={lang}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default BrandTable