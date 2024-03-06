import { useState } from "react";
import tabletrans from "../../translate/tables"
import CustomerTableRow from "./CustomerTableRow";

function CustomerTable(props){
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
              <p>{tabletrans.company[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.role[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.status[lang]}</p>
              <i></i>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(userList&&userList.filter)?userList.filter.map((user,i)=>(
            <CustomerTableRow detail={detail} showDetail={showDetail} 
              user={user} index={i} key={i} lang={lang}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default CustomerTable