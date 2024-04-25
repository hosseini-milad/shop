import { useState } from "react"

function CustomerTableRow(props){ 
  const [openOption,setOpenOption] = useState(0)
  const [checkState,setCheckState] = useState(false)
  const activeAcc = props.index===props.detail
  const user=props.user
  console.log(openOption)
    return(
        <tr>
            <td className="checkBoxStyle">
              <input type="checkbox" name="" id="" checked={checkState}
              onChange={(e)=>setCheckState(checkState?false:true)}/></td>
            <td>
              <div className="cu-avatar">
              <img src="/img/avatar/avatar_1.jpg" alt="avatar"/>
                <div className="cu-name">
                  <p className="name">{user.username?user.username:user.cName}</p>
                  <p className="email">کد مشتری: {user.cCode}</p>
                </div>
              </div>
            </td>
            <td>
              <div className="cu-phone">
                <p className="phone-num">{user.phone}</p>
              </div>
            </td>
            <td>
              <div className="cu-company">
                <p>{user.mobile}</p>
              </div>
            </td>
            <td>
              <div className="cu-role">
                <p>{user.access}</p>
              </div>
            </td>
            <td>
              <div className="pen-status order-status">
                Pending
              </div>
            </td>
            <td>
              <div className="more-btn">
                <i className="tableIcon fas fa-edit" onClick={()=>
                  window.location.href="/customers/detail/"+user._id}></i>
                {/* <i className="tableIcon fas fa-ellipsis-v" 
                  onClick={()=>setOpenOption(openOption?0:1)}></i> */}
              </div>
              {openOption?<div className="sub-more-menu">
                <div className="sub-option sub-delete">
                <i className="tableIcon fas fa-remove" style={{color: "#ff0000"}}></i>
                  <p>Delete</p>
                </div>
                <div className="sub-option sub-edit">
                  <i className="tableIcon fas fa-edit"></i>
                  <p>Edit</p>
                </div>
              </div>:<></>}
            </td>
          </tr>
    )
}
export default CustomerTableRow