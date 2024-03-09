import { useState } from "react"
import OrderFilters from "./Components/Filters"
import OrderHeader from "./Components/Header"
import ProductList from "./Components/ProductList"
import QuickCartHolder from "./QuickCart/QuickCartHolder"
import PreOrderHolder from "./PreOrder/PreOrderList"
import env from "../env"
var shopVar = JSON.parse(localStorage.getItem(env.shopExpert));

function OrderHolder(props){
  const [customer,setCustomers] = useState([
    {cName:"علی صفدری"},
    {cName:"صادق حمیدی"}])
  const [grid,setGrid] = useState(shopVar?shopVar.grid:0)
  const [filters,setFilters] = useState()
  console.log(filters)
  return(
        
  <body className="sharif" style={{direction:"rtl"}}>
    <header className="sharif-order-header">
      <OrderHeader lang={props.lang} setGrid={setGrid} grid={grid}
        customer={customer} setFilters={setFilters}/>
      <OrderFilters grid={grid} setFilters={setFilters} filters={filters}/>
    </header>
    <main className="sharif-order-main">
      {(filters&&(filters.brand||filters.category))?
      <ProductList filters={filters}/>:<></>}
      <QuickCartHolder />
      <PreOrderHolder />
    </main>
  </body>
  )
}
export default OrderHolder