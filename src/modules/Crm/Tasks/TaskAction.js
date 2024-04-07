import env from "../../../env"

function TaskAction(props){
    const token = props.token
    const data = props.data
    const updateTask=(action)=>{
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

                setTimeout(()=>props.close(),3000)
                props.setBoard(result.taskData)
            }
        },
        (error) => {
          console.log(error);
        })
    }
    if(data&&data.result){
        return(
        <div className="taskAction">
            <button type="button" className="btn-crm btn-crm-accept">
                چاپ سپیدار
            </button>
            <button type="button" className="btn-crm btn-crm-info"
                onClick={()=>window.location.href="/orders/print/"+data.orderNo}>
                <p>چاپ سفارش</p></button>
        </div> )
    }
    else
    return(
        <div className="taskAction">
            {data&&data.taskStep==="done"?
                <button type="button" className="btn-crm btn-crm-accept"
                    onClick={()=>updateTask("sepidar")}><p>ثبت سپیدار</p></button>:
                <button type="button" className="btn-crm btn-crm-accept"
                    onClick={()=>updateTask("accept")}>
                    <p>تایید سفارش</p></button>}
    
            <button type="button" className="btn-crm btn-crm-cancel"
                onClick={()=>updateTask("edit")}>
                <p>اصلاح سفارش</p></button>
            <button type="button" className="btn-crm btn-crm-info"
                onClick={()=>window.location.href="/orders/print/"+data.orderNo}>
                <p>چاپ سفارش</p></button>
            {data&&data.taskStep==="prepare"?
                <button type="button" className="btn-crm btn-crm-info"
                onClick={()=>window.location.href="/orders/invoice/"+data.orderNo}>
                <p>حواله خروج</p></button>:<></>}
        </div>
    )
}
export default TaskAction