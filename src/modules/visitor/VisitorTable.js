import { useState } from "react";
import tabletrans from "../../translate/tables"
import VisitorTableRow from "./VisitorTableRow"

function VisitorTable(props){
  const visitorList = props.content.marketList
  const lang=props.lang.lang;
    return( 
        <table>
        <thead>
          <tr>
            <th>
              <p>{tabletrans.name[lang]}</p>
            </th>
            <th>
              <p>{tabletrans.profile[lang]}</p>
            </th>
          </tr>
        </thead>
        <tbody>
        {(visitorList)?visitorList.map((object,i)=>(
            <VisitorTableRow  
              order={object} index={i} key={i} lang={lang}
              visitorid={props.visitorid}
              
              />
          )):''}
          
        </tbody>
      </table>

    )
}
export default VisitorTable