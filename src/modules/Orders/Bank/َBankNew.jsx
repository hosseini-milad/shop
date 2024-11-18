import { useState,useEffect } from "react"
import env, { normalPriceCount, normalPriceRound } from "../../../env"
import StyleSelect from "../../../components/Button/AutoComplete"
function BankNew(props){
  const bankList=props.bankList
  const setTransData=props.setTransData
  const TransData=props.TransData
  const [SendBank,setSendBank]=useState("")
  
  const addBank=()=>{
    setTransData([...TransData,SendBank])
    setSendBank("")
   }

  return(
    <div className="add-bank">
    
      
        <StyleSelect
          class={"select-input"}
          title="انتخاب بانک"
          // direction={props.lang.dir}
          
          options={bankList}
          label="DlTitle"
          action={(e)=>setSendBank(prevState => ({
            ...prevState,
            title:e.DlTitle
          }))}
        />
      
      
        <input
          type="number"
          placeholder="مبلغ"
          className="pay-input"
          onChange={(e)=>setSendBank(prevState => ({
            ...prevState,
            payValue:e.target.value
          }))}
        />
    
      
        <input
          type="text"
          placeholder="شماره حواله"
          className="desc-input"
          onChange={(e)=>setSendBank(prevState => ({
            ...prevState,
            description:e.target.value
          }))}
        />
      
      <div className="btn-td"><i className="fa-solid fa-plus" type="submit" onClick={addBank}></i></div>
    
  </div>
)
}
export default BankNew