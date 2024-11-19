import { useState,useEffect } from "react"
import env,{ normalPriceCount, normalArrayRound } from "../../../env"
import BankTable from "./BankTable"
import BankNew from "./َBankNew"
function BankSelect(props){
  const token=props.token
  const bankList=props.bankList
  const user = props.user
  const TransData=props.TransData
  const setTransData=props.setTransData
  const [loadBank,setLoadBank]=useState(1)
  
  
  useEffect(()=>{
    if(TransData){
      setLoadBank(0)
      setTimeout(()=>setLoadBank(1),100)
    }
  },[TransData])
  return(<>
    <div>
      {loadBank?<BankNew bankList={bankList} setTransData={setTransData} user={user} loadBank={loadBank} TransData={TransData}
      setLoadBank={setLoadBank} token={token}/>:<></>}
      {TransData?<BankTable TransData={TransData} setTransData={setTransData} user={user} token={token}/>:<></>}
    </div>
    
    </>
    )
}
export default BankSelect