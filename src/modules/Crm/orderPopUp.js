import { useEffect, useState } from "react"
import TaskMainPart from "./Tasks/TaskMainPart"
import env, { defPay } from "../../env"
import StyleSelect from "../../components/Button/AutoComplete"
import StyleDatePicker from "../../components/Button/DatePicker"
import StyleDatePickerSingle from "../../components/Button/DatePickerSingle"
import TaskUpload from "./Tasks/TaskUpload"
import QuickCartHolder from "../../Order/QuickCart/QuickCartHolder"
import ShowError from "../../components/Modal/ShowError"
import TaskAction from "./Tasks/TaskAction"

function OrderPopUp(props){
    const data =props.data
    const token = props.token
    const [payValue,setPayValue] = useState(defPay)
    const [content,setContent] = useState()
    //console.log(content)
    const [error,setError] = useState({message:'',color:"brown"})
    console.log(error)
    useEffect(()=>{
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({cartNo:data?data.orderNo:''})
          }
      fetch(env.siteApi + "/panel/faktor/cart-find",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            
            setContent(result)
            if(result.cart&&result.cart[0])
                setPayValue(result.cart[0].payValue)
        },
        (error) => {
          console.log(error);
        })
    },[])
    console.log(data)
    const updateTotal =()=>{
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify({...data,crmId:props.crm?props.crm._id:''})
          }
          console.log(postOptions)
      fetch(env.siteApi + "/panel/crm/update-tasks",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){}
            else{
                props.setBoardArray(result.taskData)
            }
        },
        (error) => {
          console.log(error);
        }
      )
    }
    const addToCart =(newData)=>{
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify({cartNo:data.orderNo,data:newData})
          }
      fetch(env.siteApi + "/panel/faktor/edit-addCart",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',
                    color:"brown"}),3000)
            }
            else{
                setContent(result)
                setError({message:result.message,color:"green"})
                setTimeout(()=>setError({message:'',
                    color:"brown"}),3000)
            }
        },
        (error) => {
          console.log(error);
        }
      )
    }
    const removeItem=(rData)=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {cartNo:data.orderNo,
                cartID:rData.cartID})
          }
        fetch(env.siteApi + "/panel/faktor/edit-removeCart",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error){
                    setError({message:result.error,color:"brown"})
                    setTimeout(()=>setError({message:'',
                        color:"brown"}),3000)
                }
                else{
                    setContent(result) 
                    setError({message:result.message,color:"orange"})
                    setTimeout(()=>setError({message:'',
                        color:"brown"}),3000)
                }
            },
            (error) => {
                console.log(error)
            })
    }
    const regSepidar =()=>{
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify({cartNo:data.orderNo})
          }
      fetch(env.siteApi + "/panel/faktor/edit-updateFaktor",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){}
            else{
                setContent(result)
            }
        },
        (error) => {
          console.log(error);
        }
      )
    }
    if(!content){
        return
    } else
    return(
    <section className="delete-modal">
        <div className="modal-backdrop show-modal">
            <div className="task-popup fullPopUp">
                <div className="orderModalTitle">
                    {(props.customer&&props.customer[0])?
                        props.customer[0].username:"-"} 
                    <sub>({(props.creator&&props.creator[0])?
                        props.creator[0].username:"-"})</sub>
                    <span> شماره سفارش: {data.orderNo}</span>
                    <div className="address-status">
                         آدرس:  
                    {(props.customer&&props.customer[0])?
                        props.customer[0].Address:"-"} </div>
                    </div>
                <i className="fa fa-remove closeModal" 
                    onClick={props.close}></i>
                <div className="sharif" style={{padding: "70px 10px 10px"}}>
                    <main className="sharif-order-main">
                        {content?<QuickCartHolder token={token} 
                        user={content.cart&&content.cart.userId}
                        payValue={payValue} setPayValue={setPayValue}
                        cartNo={data?data.orderNo:''} access={props.access}
                        addToCart={(e)=>addToCart(e)}
                        deleteFromCart={(e)=>removeItem(e)}
                        regCart={(e)=>regSepidar(e)}
                        cart={content.cart&&content.cart[0]} 
                        setCart={(e)=>setContent(e)}
                        canEdit={content&&content.canEdit}
                        cartDetail={content.orderData?content.orderData:content.cartDetail} 
                        setError={setError}/>:
                        <div>{env.loader}</div>}
                    </main>
                </div>
            {props.access&&props.access==="edit"?
            <div className="crmAction">
                <TaskAction content={content} token={token}
                data={props.data} setBoard={(e)=>props.setBoardArray(e)}
                close={props.close}/>
            </div>:<></>}
            </div>
            
        </div>
        {error&&error.message?
        <ShowError color={error.color} status={"مدیریت"} 
        text={error.message} />:<></>}
    </section>
    )
}
export default OrderPopUp