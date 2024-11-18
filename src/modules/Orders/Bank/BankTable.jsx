import { useState,useEffect } from "react"
import env, { normalPriceCount, normalPriceRound } from "../../../env"
function BankTable(props){
  const TransData=props.TransData
  const setTransData=props.setTransData
  const removeBank=(bankId)=>{

  }

  return(
    <div className="bank-list">
      {TransData.map((bank,i)=>(
        <div className="product-tr bank-tr" key={i}>
          <div className="bank-item">{bank.title}</div>
          <div className="bank-item">{bank.payValue?bank.payValue:"--"}</div>
          <div className="bank-item">{bank.description?bank.description:"--"}</div>
          {/* <div><i className="fa-solid fa-trash" onClick={()=>removeBank(bank._id)}></i></div> */}
        </div>
      ))}
    </div>
  )
}
export default BankTable