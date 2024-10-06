import React ,{ useState,useRef,useEffect } from "react"
import ErrorAction from "../Components/PopUps/ErrorAction"
import env from "../../env"
import UserClassInTable from "./UserComponent/UserClassInTable"
import tabletrans from "../../translate/tables"
import Status from "../Components/Status"

function NUserTableRow(props){ 
  const [openOption,setOpenOption] = useState(0)
  const [checkState,setCheckState] = useState(false)
  const [Alert,setAlert]=useState(false)
  let menuRef = useRef();
  console.log(menuRef)
  const activeAcc = props.index===props.detail
  const user=props.user
  const selectUser=()=>{
    
    if(!checkState){
      //console.log(checkState)
      props.setSelectedUser(existingItems => {
        return [
          ...existingItems.slice(0, props.selectedUser.length),
          user._id,
          ...existingItems.slice(props.selectedUser.length + 1),
        ]
      })
    }
    else{
      var newArray = props.selectedUser
      if(newArray){
      var index = newArray.indexOf(user._id);
      if (index > -1) {
        newArray.splice(index, 1);
      }
      props.setSelectedUser(newArray)
    }
    }
    
    setCheckState(checkState?false:true)
    /*props.setSelectedUser(prevState => ({
                ...prevState,
                user:e
              }))*/
  }
  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpenOption(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  const deleteNews=()=>{
    //if(newCustomer) {
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({userId:user._id})
        }
       //console.log(postOptions)
    fetch(env.siteApi + "/panel/user/delete-customer",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.error){
          console.log(result.error)
        }
          else{
            console.log(result)
            setTimeout(()=>window.location.href="/news",5000)
          }
          
      },
      (error) => {
        console.log(error);
      }
    )
  }

  console.log(props.selectedUser)
    return(<>
        <tr>
            <td className="checkBoxStyle">
              <input type="checkbox" name="" id="" checked={checkState}
              onChange={(e)=>selectUser()}/></td>
            <td>
              <div className="cu-avatar">
              <img src="/img/avatar/avatar_1.jpg" alt="avatar"/>
                <div className="cu-name">
                  <p className="name">{user.cName} {user.sName}<span>(کد مشتری: {user.cCode})</span></p>
                  <p className="email">{user.Address}</p>
                </div>
              </div>
            </td>
            <td>
              {user.class?<UserClassInTable classes={user.class}/>:
              <></>}
            </td>
            <td>
              <div className="cu-company">
                <p className="phone-num">{user.phone}</p>
              </div>
            </td>
            
            <td>
              <div className="pen-status order-status">
                <Status text={user.lock!=="3"?"فعال":"قفل شده"} />
              </div>
            </td>
            <td className="p-r">
              <div className="more-btn">
                {/* <i className="tableIcon fas fa-edit" onClick={()=>
                  window.location.href="/customers/detail/"+user._id}></i> */}
                <i className="tableIcon fas fa-ellipsis-v" 
                  onClick={()=>setOpenOption(openOption?0:1)}></i>
              </div>
              <div className={openOption==true?"sub-more-menu sub-active":"sub-more-menu"} ref={menuRef}>
                <div className="sub-option sub-delete" onClick={()=>setAlert(true)}>
                <i className="tableIcon fas fa-remove" style={{color: "#ff0000"}}></i>
                  <p>Delete</p>
                </div>
                <div className="sub-option sub-edit" onClick={()=>
                  window.location.href="/customers/detail/"+user._id}>
                  <i className="tableIcon fas fa-edit"></i>
                  <p>Edit</p>
                </div>
              </div>
            </td>
          </tr>
          {Alert?
            <ErrorAction 
            status={"DELETE"} 
            title={"حذف آیتم"} 
            text={"آیتم انتخاب شده حذف خواهد شد. آیا مطمئن هستید؟"} 
            linkText={""} 
            style={{direction:"rtl"}}
            buttonText="حذف" 
            close={()=>setAlert()}
            action={deleteNews}
            />:
            <></>}
            </>
    )
}
export default NUserTableRow