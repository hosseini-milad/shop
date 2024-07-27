import { useState } from "react";
import tabletrans from "../../translate/tables"
import DUserTableRow from "./DUserTableRow"

function DUserTable(props){
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
          {(userList&&userList.filter)?userList.filter.map((user,i)=>(
            <DUserTableRow detail={detail} showDetail={showDetail} 
              user={user} index={i} key={i} lang={lang}
              setSelectedUser={props.setSelectedUser}
              selectedUser={props.selectedUser}
              discountUser={props.discountUser}
              addDiscount={props.addDiscount}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default DUserTable