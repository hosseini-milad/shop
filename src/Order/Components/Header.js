import { useState } from "react";
import StyleSelect from "../../components/Button/AutoComplete"
import env from "../../env";

function OrderHeader(props){
  const token = props.token
  const [showDrop,setShowDrop] = useState(0)
  const updateGrid=(value)=>{
    props.setGrid(value);
    var shopVar = JSON.parse(localStorage.getItem(env.shopExpert));
    shopVar?
    localStorage.setItem(env.shopExpert,JSON.stringify(
      {
        ...shopVar,
        grid:value
      })):
      localStorage.setItem(env.shopExpert,JSON.stringify(({
          grid:value
        })))
  }
  const [customers,setCustomers] = useState()
  const findCustomer=(search)=>{
    if(search.length<3){
        //setShowPop(0)
        return}
    //console.log(search)
    const postOptions={
        method:'post',
        headers: { 'Content-Type': 'application/json' ,
        "x-access-token": token&&token.token,
        "userId":token&&token.userId},
        body:JSON.stringify({search:search})
      }
    fetch(env.siteApi + "/panel/faktor/customer-find",postOptions)
    .then(res => res.json())
    .then(
        (result) => {
            if(result.customers)
                console.log("setShowPop(1)")
            if(result.error){
                props.setError({message:result.error,color:"brown"})
                
            }
            else{
              setCustomers(result.customers)
            }
        },
        (error) => {
            console.log(error)
        })
  }
  console.log(customers)
    return(
<div className="nav-bar">
      <p>سفارشات</p>
        {/*<StyleSelect title={"مشتری"} direction={"rtl"} 
              options={props.customer||[]} label="cName"
              class="f-customer" 
              action={(e)=>props.setFilters(prevState => ({
                ...prevState,
                customer:e
              }))}
              icon={<i className="fa-solid fa-plus" style={{margin: "0", color: "#000"}}></i>}
        />*/}
        {props.user?
        <div className="f-customer">
          <div className="user-item">
            <b>{props.user.username}</b>
            <small>{props.user.address?
              props.user.address:props.user.phone}</small>
          </div>
        <i className="fa-solid fa-remove" style={{margin: "0", color: "#000"}}
          onClick={()=>props.setUser('')}></i>
      </div>:
        <div className="f-customer">
          <input type="search" name="" id="f-search" placeholder="مشتری"
            onChange={(e)=>findCustomer(e.target.value)}
            onFocus={()=>setShowDrop(1)}
            onBlur={()=>setTimeout(()=>setShowDrop(0),200)}/>
          <i className="fa-solid fa-plus" style={{margin: "0", color: "#000"}}></i>
        </div>}
      <div className="view-btn-wrapper">
        <label htmlFor="list-view"
        className={props.grid?"list-btn view-active":"list-btn"}
            onClick={()=>updateGrid(1)}>
            <i className="fa-solid fa-list no-font"></i></label>
        <input type="radio" name="view" id="list-view"/>
        <label htmlFor="tile-view" 
            className={props.grid?"tile-btn":"tile-btn view-active"}
            onClick={()=>updateGrid(0)}>
            <i className="fa-solid fa-table no-font"></i></label>
        <input type="radio" name="view" id="tile-view"/>
      </div>
      {showDrop?<div className="f-customer-dropdpwn">
        {customers&&customers.map((customer,i)=>(
          <div className="menu-item" key={i} 
            onClick={()=>props.setUser(customer)}>
            <p className="bu-name">{customer.username}</p>
            <p className="bu-address">{customer.address?
              customer.address:customer.phone}</p>
          </div>
        ))}
        </div>:<></>}
    </div>
    )
}
export default OrderHeader