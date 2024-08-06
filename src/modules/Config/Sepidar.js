import { useEffect, useState } from "react";
import env from "../../env"
import errortrans from "../../translate/error"
import ShowError from "../../components/Modal/ShowError";

function Sepidar(props){
    const direction = props.lang?props.lang.dir:errortrans.defaultDir;
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    const [error,setError] = useState({message:'',color:"brown"})
    const [updateTime,setUpdateTime] = useState()
    console.log(error)
    useEffect(()=>{
        fetch(env.siteApi + "/sepidar-update-log")
      .then(res => res.json())
      .then(
        (result) => {
            const logList = result.log
            var lastLog = {
                product:logList.find(item=>item.updateQuery==="sepidar-product"),
                quantity:logList.find(item=>item.updateQuery==="sepidar-quantity"),
                price:logList.find(item=>item.updateQuery==="sepidar-price"),
                customer:logList.find(item=>item.updateQuery==="sepidar-customer")
            }
            console.log(lastLog)
            setUpdateTime(lastLog)
        },
        (error) => {
            console.log(error)
        })
    },[])
    const updateSepidar=(db)=>{
        const postOptions={
            method:'get',
            headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'}
          }
        fetch(env.siteApi + "/sepidar-"+db,postOptions, {mode:'cors'})
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.message,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            else{
                setError({message:result.message,color:"green"})
                setTimeout(()=>window.location.reload(),3000)
            }
        },
        (error) => {
            console.log(error)
        })
    }
    const content=[
        {title:"محصولات",enTitle:"product",description:"بروزرسانی محتوای محصولات"},
        {title:"تعداد محصولات",enTitle:"quantity",description:"بروزرسانی تعداد محصولات"},
        {title:"قیمت محصولات",enTitle:"price",description:"بروزرسانی قیمت محصولات"},
        {title:"مشتریان",enTitle:"customer",description:"بروزرسانی مشتریان"},
    ]
    return(
       
        <div className="profiles" style={{direction:direction}}>
           
        <div className={direction==="ltr"?"profile-table":"profile-table profileRtl"}>
            <table>
            <tbody>
                {content&&content.map((filter,i)=>(
                    <tr key={i}>
                    <td>
                        <div className="profiles-title">
                        <i className="fa-solid fa-certificate fa-sm" style={{color: "#00c6c6"}}></i>
                        <div className="p-wrapper">
                            <p>{filter.title} 
                                <span>({filter.enTitle})</span></p>
                            <p>{filter.description}</p>
                        </div>
                        </div>
                    </td>
                    <td><input type="button" value="بروزرسانی"
                    className="btn bg-gradient-info my-4 mb-2"
                    onClick={()=>updateSepidar(filter.enTitle)}/></td>
                    <td>{updateTime&&updateTime[filter.enTitle]&&
                    new Date(updateTime[filter.enTitle].date).toLocaleDateString('fa')}<br/>
                    <smal>{updateTime&&updateTime[filter.enTitle]&&
                    new Date(updateTime[filter.enTitle].date).toLocaleTimeString('fa')}</smal></td>
                    <td>
                        <div className="profiles-icons">
                        <i className="fa-solid fa-pen-to-square fa-sm" style={{color: "#c0c0c0"}}></i>
                        <i className="fa-solid fa-trash fa-sm" style={{color: "#c0c0c0"}}></i>
                        </div>
                    </td>
                    </tr>
                ))}
                
            </tbody>
            </table>
        </div>
        {error&&error.message?
            <ShowError title="" text={error.message} color={error.color}
            />:<></>}
        </div>
    )
}
export default Sepidar