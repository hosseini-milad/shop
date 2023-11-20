import { useEffect, useState } from "react"
import StyleSelect from "../../../components/Button/AutoComplete"
import env, { rxFindCountSeprate } from "../../../env"
import tabletrans from "../../../translate/tables"

function OrderUser(props){
    const user = props.user
    const [editMode,setEditMode]= useState(0)
    const [search,setSearch]= useState(0)
    const [newCustomer,setNewCustomer]= useState('')
    const [searchList,setSearchList]= useState([])
    const [error,setError] = useState({errorText:'',errorColor:"brown"})

    useEffect(() => {
      if(search&&search.length>4) {
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({customer:search})
        }
    fetch(env.siteApi + "/report/customers",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        console.log("user list")
          setSearchList(result.customers)
          
      },
      (error) => {
        console.log(error);
      }
    )}
  },[search])
  const updateUser=() => {
    if(newCustomer) {
    var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({userId:newCustomer._id,rxorderNo:props.orderNo})
      }
  fetch(env.siteApi + "/panel/order/editRxOrder",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result)
      if(result.error){
        setError({errorText:result.error,
          errorColor:"brown"})
        setTimeout(()=>setError({errorText:'',
          errorColor:"brown"}),3000)
      }
        else{
          setError({errorText:"مشتری تغییر پیدا کرد",
            errorColor:"green"})
          setTimeout(()=>window.location.reload(),2000)
        }
        
    },
    (error) => {
      console.log(error);
    }
  )}
}
    return(
        <div class="info-box">
            <div class="customer-info">
              <div class="info-header">
                <p>{tabletrans.customerInfo[props.lang]}</p>
                {editMode?<>
                <i class="fa-solid fa-check checkIcon" 
                  onClick={()=>updateUser()}></i>
                  <i class="fa-solid fa-close checkIcon cancelIcon" 
                  onClick={()=>setEditMode(0)}></i>
                  </>:
                <i class="fa-solid fa-pen pen" onClick={()=>setEditMode(1)}></i>}
              </div>
              <div class="cu-info-wrapper">
                <img src="/img/avatar/avatar_1.jpg" alt="avatar"/>
                <div class="cu-info">
                {editMode?
                  <StyleSelect title={"name"} defaultValue={user.cName} options={searchList||[]}
                    action={(e)=>setNewCustomer(e)} direction={props.direction} label={"cName"}
                    textChange={setSearch}/>:
                    <p>{user.cName}</p>}
                  {editMode?<p>{newCustomer&&newCustomer.phone}</p>:
                    <p>{user.phone}</p>}
                  <p>IP Address:<span>192.158.1.38</span></p>
                  <div class="bl-btn">
                    <i class="fa-solid fa-plus fa-xl"></i>
                    <p>Add to Blacklist</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
    )
}
export default OrderUser