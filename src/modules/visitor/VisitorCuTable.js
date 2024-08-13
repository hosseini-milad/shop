import { useState } from "react";
import tabletrans from "../../translate/tables"
import VisitorCuTableRow from "./VisitorCuTableRow"

function VisitorTable(props){
  const CuList = props.content.userList
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
        {(CuList)?CuList.map((object,i)=>(
            <VisitorCuTableRow  
              order={object} index={i} key={i} lang={lang}
              
              />
            ))
          : ""}
      </tbody>
    </table>
  );
}
export default VisitorTable;
