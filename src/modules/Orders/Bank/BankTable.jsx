import { useState,useEffect } from "react"
import env, { normalPriceCount, normalPriceRound } from "../../../env"
function BankTable(props){
  const token=props.token
  const TransData=props.TransData
  const setTransData=props.setTransData
  const removeBank=(bankId)=>{
    const body={
      id:bankId,
      totalCartValue:props.Total
    }
    const postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId},
        body:JSON.stringify(body)
      }
  fetch(env.siteApi + "/setting/remove-bank-from-faktor",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      props.setTransData(result.transData)
      props.setAmount(result.transRemain)
    },
    (error) => {
      console.log(error);
      
    })
    
    
  }

  return(
    <div className="bank-list">
      {TransData.map((bank,i)=>(
        <div className="product-tr bank-tr" key={i}>
          <div className="bank-item">{bank.title?bank.title:"--"}</div>
          <div className="bank-item">{bank.payValue?bank.payValue:"--"}</div>
          <div className="bank-item">{bank.description?bank.description:"--"}</div>
          <div><i className="fa-solid fa-trash" onClick={()=>removeBank(bank._id)}></i></div>
        </div>
      ))}
    </div>
  )
}
export default BankTable