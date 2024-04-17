import { useState } from "react"
import tabletrans from "../../translate/tables"
import PolicyTableRow from "./PolicyTableRow";

function PolicyTable(props){
  const policy = props.policy
  const lang=props.lang;
  const [detail,showDetail] = useState(-1)
    return(
        <table>
        <thead>
        <tr>
          <th className="checkBoxStyle">
              <input type="checkbox" name="" id=""/></th>
            <th>
              <p>{tabletrans.policies[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.customer[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.date[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.category[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.brand[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.discount[lang]}</p>
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
          {policy&&policy.filter?policy.filter.map((policy,i)=>(
            <PolicyTableRow detail={detail} showDetail={showDetail} 
            policy={policy} index={i} key={i} lang={lang}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default PolicyTable