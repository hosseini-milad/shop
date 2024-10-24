import { useState } from "react"
import ErrorAction from "../../../components/Modal/ErrorAction"
import ShowError from "../../../components/Modal/ShowError"
import env from "../../../env"

function QuoteTaskAction(props){
    const token = props.token
    const data = props.data
    const [showRemove,setShowRemove] = useState(0)
    const [Loader,setLoader] = useState(0)
    const [ShowAlert,setShowAlert] = useState(0)
    console.log(data)
    const updateTask=()=>{
        setLoader(1)
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify({"orderNo":data.orderNo
            })
          }
      fetch(env.siteApi + "/panel/faktor/quote-to-initial",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){

            }
            else{

                setTimeout(()=>props.close(),2000)
                props.setBoard(result.taskData)
                setShowAlert(result.message)
                setTimeout(()=>setShowAlert(0),2000)
                setLoader(0)
            }
        },
        (error) => {
          console.log(error);
        })
    }
    // const deleteOrder=(orderNo)=>{
    //     //console.log("cart-delete",orderNo)
    //     const postOptions={
    //         method:'post',
    //         headers: {'Content-Type': 'application/json',
    //         "x-access-token":token&&token.token,"userId":token&&token.userId},
    //         body:JSON.stringify({cartID:orderNo})
    //       }
    //   fetch(env.siteApi + "/panel/faktor/cart-delete",postOptions)
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //         if(result.error){

    //         }
    //         else{

    //             setTimeout(()=>props.close(),3000)
    //             window.location.reload()
    //         }
    //     },
    //     (error) => {
    //       console.log(error);
    //     })
    // }
    return(
        <div className="taskAction">
            {Loader?
            <button
            type="button" 
            className="btn-crm btn-crm-accept"
            >
            <p>درحال پردازش</p>
            </button>:
            <button 
            type="button" 
            className="btn-crm btn-crm-accept"
            onClick={()=>updateTask("accept")}>
            <p>تایید سفارش</p>
            </button>
            
            }
            <button type="button" className="btn-crm btn-crm-info"
                onClick={()=>window.location.href="/orders/print/"+data.orderNo}>
                <p>چاپ سفارش</p></button>
                <button type="button" className="btn-crm btn-crm-cancel"
                onClick={()=>setShowRemove(data.orderNo)}>
                <p>لغو سفارش</p></button>
            {showRemove?
                <ErrorAction status={"DELETE"} title={"لغو سفارش"} 
                text={"سفارش لغو خواهد شد. آیا مطمئن هستید؟"} linkText={""} style={{direction:"rtl"}}
                buttonText="حذف" close={()=>setShowRemove(0)}
                color="red" action={()=>deleteOrder(showRemove)}/>:
            <></>}
            {ShowAlert?<ShowError status={"SECCESS"} title={"Message"} 
        text={ShowAlert} icon={"check-circle-o"} style={{direction:"rtl"}}
        color="green"/>:<></>}
        </div>
    )
}
export default QuoteTaskAction