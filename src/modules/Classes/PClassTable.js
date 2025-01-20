import { useState } from "react"
import tabletrans from "../../translate/tables"
import PClassTableRow from "./PClassTableRow";

function PClassTable(props){
  const url = window.location.pathname;
  console.log(url)
  const classes = props.classes
  const lang=props.lang;
  const [detail,showDetail] = useState(-1)
    return(
        <table>
        <thead>
        <tr>
        <th className="checkBoxStyle">
        <input type="checkbox" name="" id=""/></th>
            <th>
              <p>{tabletrans.name[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.date[lang]}</p>
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
            </th>
          </tr>
        </thead>
        <tbody>
          {classes&&classes.filter?classes.filter.map((classes,i)=>(
            <PClassTableRow url={url} detail={detail} showDetail={showDetail} 
            classes={classes} index={i} key={i} lang={lang}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default PClassTable