import { useEffect, useState } from "react"
import OrderFilters from "./Components/Filters"
import OrderHeader from "./Components/Header"
import ProductList from "./Components/ProductList"
import QuickCartHolder from "./QuickCart/QuickCartHolder"
import PreOrderHolder from "./PreOrder/PreOrderList"
import env from "../env"
import Cookies from 'universal-cookie';
import ShowError from "../components/Modal/ShowError"
const cookies = new Cookies();
var shopVar = JSON.parse(localStorage.getItem(env.shopExpert));

function OrderHolder(props){
  const token=cookies.get(env.cookieName)
  const [customer,setCustomers] = useState([
    {cName:"علی صفدری"},
    {cName:"صادق حمیدی"}])
  const [grid,setGrid] = useState(shopVar?shopVar.grid:0)
  const [filters,setFilters] = useState()
  const [user,setUser] = useState()
  const [cart,setCart] = useState()
  const [error,setError] = useState({message:'',color:"brown"})
  
  useEffect(()=>{
    const postOptions={
        method:'post',
        headers: { 'Content-Type': 'application/json' ,
        "x-access-token": token&&token.token,
        "userId":token&&token.userId},
        body:JSON.stringify({userId:user?user.Code?user.Code:
            user._id:(token&&token.userId)})
      }
    fetch(env.siteApi + "/panel/faktor/cart",postOptions)
    .then(res => res.json())
    .then(
        (result) => {
            if(result)
                setCart(result)
            else
                setCart('') 
        },
        (error) => {
            console.log(error)
        })
},[user])
  console.log(cart)
  return(
        
  <div className="sharif" style={{direction:"rtl"}}>
    <header className="sharif-order-header">
      <OrderHeader lang={props.lang} setGrid={setGrid} grid={grid}
        token={props.token} setError={setError}
        user={user} setUser={setUser} 
        setFilters={setFilters}/>
      <OrderFilters grid={grid} setFilters={setFilters} filters={filters}/>
    </header>
    <main className="sharif-order-main">
      {(filters&&(filters.brand||filters.category))?
      <ProductList filters={filters}/>:<></>}
      <QuickCartHolder token={token} user={user}
        cart={cart&&cart.quickCart} setCart={setCart} setError={setError}
        cartDetail={cart&&cart.qCartDetail}/>
      <PreOrderHolder token={token} user={user}
        cart={cart}/>
    </main>
    {error&&error.message?
    <ShowError color={error.color} status={"سفارشات"} 
      text={error.message} />:<></>}
  </div>
  )
}
export default OrderHolder