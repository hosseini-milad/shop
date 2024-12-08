import { useState,useEffect } from "react"
import env, { normalPriceCount, normalPriceRound } from "../../../env"
import StyleSelect from "../../../components/Button/AutoComplete"
import FormattedInputs from "../../../components/Button/FormattedInputs"
function BankNew(props){
  const token=props.token
  const bankList=props.bankList
  const setTransData=props.setTransData
  const TransData=props.TransData
  const [SendBank,setSendBank]=useState("")
  const addBank=()=>{
    const body={
      title:SendBank.title,
      bankCode:SendBank.bankCode,
      payValue:SendBank.payValue,
      orderNo:props.OrderNumList,
      description:SendBank.description,
      totalCartValue:parseInt(props.totalPrice.toString().replace(/\D/g,''))
    }
    const postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId},
        body:JSON.stringify(body)
      }
      console.log(postOptions)
  fetch(env.siteApi + "/setting/add-bank-to-cart",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      props.setTransData(result.transData)
      props.setAmount(result.transRemain)
      
    },
    (error) => {
      console.log(error);
      
    })
    
    
    setSendBank("")
   }
   console.log(SendBank)
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
            title:e.DlTitle,bankCode:e.BankAccountID
          }))}
        />
      
      
        {/* <input
          type="number"
          placeholder="مبلغ"
          
          className="pay-input"
          onChange={(e)=>setSendBank(prevState => ({
            ...prevState,
            payValue:e.target.value
          }))}
          
        /> */}
        <FormattedInputs setSendBank={setSendBank} SendBank={SendBank}/>
      
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