import { useState } from "react"
import ErrorAction from "../../../components/Modal/ErrorAction"
import ShowError from "../../../components/Modal/ShowError"
import env from "../../../env"

function TaskAction(props){
    const token = props.token
    const data = props.data
    const [showRemove,setShowRemove] = useState(0)
    const [Loader,setLoader] = useState(0)
    const [ShowAlert,setShowAlert] = useState(0)
    
    const updateTask=(action)=>{
        setLoader(1)
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify({_id:data?data._id:'',
            status:action})
          }
      fetch(env.siteApi + "/panel/crm/update-tasks-status",postOptions)
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
    const deleteOrder=(orderNo)=>{
        //console.log("cart-delete",orderNo)
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify({cartID:orderNo})
          }
      fetch(env.siteApi + "/panel/faktor/cart-delete",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){

            }
            else{

                setTimeout(()=>props.close(),3000)
                window.location.reload()
            }
        },
        (error) => {
          console.log(error);
        })
    }
    if(data&&data.result){
        if(data.result.InvoiceID){
        return(
        <div className="taskAction">
            <button type="button" className="btn-crm btn-crm-accept"
            onClick={()=>window.location.href="/print/sepidar/"+data.result.InvoiceID}>
                چاپ سپیدار
            </button>
            <button type="button" className="btn-crm btn-crm-accept btn-crm-official"
            onClick={()=>window.location.href="/print/official/"+data.result.InvoiceID}> چاپ رسمی
            </button>
            <button type="button" className="btn-crm btn-crm-info"
                onClick={()=>window.location.href="/orders/print/"+data.orderNo}>
                <p>چاپ سفارش</p></button>
            <p>کد سپیدار: {data.result.Number}</p>
        </div> )}
        else
        return(
            <div className="taskAction">
                <button type="button" className="btn-crm btn-crm-info"
                onClick={()=>window.location.href="/orders/print/"+data.orderNo}>
                <p>چاپ سفارش</p></button>
                <button type="button" className="btn-crm btn-crm-accept"
                    onClick={()=>updateTask("sepidar")}><p>ثبت مجدد سپیدار</p></button>
                <p>{"Error: "+data.result.Message}</p>
            </div>
            )
                
    }
    else
    return(
        <div className="taskAction">
            {Loader?
            <button
            type="button" 
            className="btn-crm btn-crm-accept"
            onClick={()=>updateTask("accept")}>
            <p>درحال پردازش</p>
            </button>:
                    (data&&data.taskStep==="done"?
                <button type="button" className="btn-crm btn-crm-accept"
                    onClick={()=>updateTask("sepidar")}><p>ثبت سپیدار</p></button>:
                <button type="button" className="btn-crm btn-crm-accept"
                    onClick={()=>updateTask("accept")}>
                    <p>تایید سفارش</p></button>)}
    
            <button type="button" className="btn-crm btn-crm-edit"
                onClick={()=>updateTask("edit")}>
                <p>اصلاح سفارش</p></button>
            <button type="button" className="btn-crm btn-crm-info"
                onClick={()=>window.location.href="/orders/print/"+data.orderNo}>
                <p>چاپ سفارش</p></button>
            {data&&data.taskStep==="done"||data.taskStep==="edit"?<button type="button" className="btn-crm btn-crm-cancel"
                onClick={()=>setShowRemove(data.orderNo)}>
                <p>لغو سفارش</p></button>:<></>}
            {data&&data.taskStep==="prepare"?
                <button type="button" className="btn-crm btn-crm-info"
                onClick={()=>window.location.href="/orders/invoice/"+data.orderNo}>
                <p>حواله خروج</p></button>:<></>}
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
export default TaskAction