import { useState } from "react";
import tabletrans from "../../translate/tables"
import DTableRow from "./DTableRow"

function DTable(props){
  const userList = props.offerStock
  const lang=props.lang.lang;
  const [detail,showDetail] = useState(-1)
    return( 
        <table>
          
        <thead>
          <tr>
            <th><input type="checkbox" name="" id=""/></th>
            <th>
              <p>{tabletrans.name[lang]}</p>
              <i></i>
            </th>
            
            
            <th>
              <p>{tabletrans.brand[lang]}</p>
              <i></i>
            </th>
            {props.type?<th>
              <p>{tabletrans.material[lang]}</p>
              <i></i>
            </th>:<></>}
            <th>
              <p>{tabletrans.discount[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.action[lang]}</p>
              <i></i>
            </th>
            
          </tr>
        </thead>
        <tbody>
          {(userList)?userList.map((user,i)=>(
            <DTableRow detail={detail} showDetail={showDetail} 
              user={user} index={i} key={i} lang={lang}
              setSelectedUser={props.setSelectedUser}
              selectedUser={props.selectedUser}
              type={props.type}
              offerid={props.offerid}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default DTable