import { useState } from "react";
import tabletrans from "../../translate/tables"
import NUserTableRow from "./NUserTableRow"

function NUserTable(props){
  const userList = props.userList
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
              <p>{tabletrans.classes[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.phoneNumber[lang]}</p>
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
          {(userList&&userList)?userList.map((user,i)=>(
            <NUserTableRow detail={detail} showDetail={showDetail} 
              user={user} index={i} key={i} lang={lang}
              setSelectedUser={props.setSelectedUser}
              selectedUser={props.selectedUser}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default NUserTable