import { useState } from "react"
import tabletrans from "../../translate/tables"
import SlidersTableRow from "./SlidersTableRow";

function SlidersTable(props){
  const slider = props.slider
  const lang=props.lang;
  const [detail,showDetail] = useState(-1)
    return(
        <table>
        <thead>
        <tr>
          <th className="checkBoxStyle">
              <input type="checkbox" name="" id=""/></th>
            <th>
              <p>{tabletrans.order[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.brandName[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.brandCode[lang]}</p>
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
            <p>{tabletrans.status[lang]}</p>
              <i></i>
            </th>
            <th>
            </th>
          </tr>
        </thead>
        <tbody>
          {slider&&slider.filter?slider.filter.map((slider,i)=>(
            <SlidersTableRow detail={detail} showDetail={showDetail} 
            slider={slider} index={i} key={i} lang={lang}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default SlidersTable