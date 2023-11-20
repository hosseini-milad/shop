import { useState } from "react"
import tabletrans from "../../translate/tables"
import ServiceTableRow from "./ServiceTableRow";

function ServiceTable(props){
  const service = props.service
  const lang=props.lang;
  const [detail,showDetail] = useState(-1)
    return(
        <table>
        <thead>
        <tr>
          <th className="checkBoxStyle">
              <input type="checkbox" name="" id=""/></th>
            <th>
              <p>{tabletrans.kind[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.title[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.code[lang]}</p>
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
          {service&&service.filter?service.filter.map((service,i)=>(
            <ServiceTableRow detail={detail} showDetail={showDetail} 
            service={service} index={i} key={i} lang={lang}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default ServiceTable