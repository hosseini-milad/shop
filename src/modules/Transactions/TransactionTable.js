import { useState } from "react"
import tabletrans from "../../translate/tables"
import TransactionTableRow from "./TransactionTableRow";

function TransactionTable(props){
  const content = props.content
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
              <p>{tabletrans.customer[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.date[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.price[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>شماره تراکنش</p>
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
          {content&&content.filter?content.filter.map((content,i)=>(
            <TransactionTableRow detail={detail} showDetail={showDetail} 
            content={content} index={i} key={i} lang={lang} direction={props.direction}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default TransactionTable