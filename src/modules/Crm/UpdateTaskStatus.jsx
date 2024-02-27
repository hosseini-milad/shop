import env from "../../env"

function UpdateTaskStatus(propsElement){
    const props = propsElement.result
    console.log(props)
    const allTasks = props.allTasks
    const leadTask = props.leadTask
    const informationTask = props.informationTask
    const fiinTask = props.fiinTask
    const propertyTask = props.propertyTask
    const segurosTask = props.segurosTask
    const inprogressTask = props.inprogressTask
    const escrituraTask = props.escrituraTask
    const commissionsTask = props.commissionsTask
    const suspendedTask = props.suspendedTask

    const tasks=
        allTasks.map((task,i)=>(
            task.userDetail.length?
            `"${task._id}":{"id":"${task._id}",
            "content":{"user":"${task.userDetail[0].cName} ${task.userDetail[0].sName}",
            "phone":"${task.userDetail[0].phone}",
            "email":"${task.userDetail[0].email}",
            "partnerName":"${task.userDetail[0].partnerName?
                task.userDetail[0].partnerName:''}",
            "partner":"${task.userDetail[0].partner?
                task.userDetail[0].partner:''}",
            "agent":"${task.userDetail[0].agentName?
                task.userDetail[0].agentName:''}",
            "agency":"${task.userDetail[0].agencyName?
                task.userDetail[0].agencyName:''}",
            "date":"${task.userDetail[0].date}",
            "tag":"${task.tag?task.tag:''}",
            "id":"${task.userId}"}}`:
            `"${task._id}":{"id":"${task._id}",
            "content":{"user":"-",
            "phone":"-",
            "email":"-",
            "partner":"-",
            "partnerName":"-",
            "agent":"-",
            "agency":"-",
            "date":"-",
            "tag":"-",
            "id":"-"}}`
        ))
        
    return(
        {
            tasks:JSON.parse(`{${tasks}}`),
            columns:{
                'lead':{
                    id:"lead", title:"Lead",
                    taskIds:leadTask.map(lead=>lead._id)
                },
                'informations':{
                    id:"informations", title:"Informações",
                    taskIds:informationTask.map(lead=>lead._id)
                },
                'fiin':{
                    id:"fiin", title:"FINE's",
                    taskIds:fiinTask.map(lead=>lead._id)
                },
                'property':{
                    id:"property", title:"Avaliação Imóvel",
                    taskIds:propertyTask.map(lead=>lead._id)
                },
                'inprogress':{
                    id:"inprogress", title:"InProgress",
                    taskIds:inprogressTask.map(lead=>lead._id)
                },
                'seguros':{
                    id:"seguros", title:"Seguros",
                    taskIds:segurosTask.map(lead=>lead._id)
                },
                'escritura':{
                    id:"escritura", title:"Escritura",
                    taskIds:escrituraTask.map(lead=>lead._id)
                },
                'commissions':{
                    id:"commissions", title:"Comissões",
                    taskIds:commissionsTask.map(lead=>lead._id)
                },
                'suspended':{
                    id:"suspended", title:"Negócio Suspenso",
                    taskIds:suspendedTask.map(lead=>lead._id)
                }
            },
            columnOrder:propsElement.token.level<10?
                env.columnAgentOrder:env.columnOrder
        }
    )
}
export default UpdateTaskStatus