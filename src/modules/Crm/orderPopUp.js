import { useEffect, useState } from "react"
import TaskMainPart from "./Tasks/TaskMainPart"
import env from "../../env"
import StyleSelect from "../../components/Button/AutoComplete"
import StyleDatePicker from "../../components/Button/DatePicker"
import StyleDatePickerSingle from "../../components/Button/DatePickerSingle"
import TaskUpload from "./Tasks/TaskUpload"
import QuickCartHolder from "../../Order/QuickCart/QuickCartHolder"
import ShowError from "../../components/Modal/ShowError"

function OrderPopUp(props){
    const [data,setData] = useState(props.data)
    const token = props.token
    const [content,setContent] = useState()
    const [error,setError] = useState({message:'',color:"brown"})
    useEffect(()=>{
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({cartNo:data?data.orderNo:''})
          }
      fetch(env.siteApi + "/panel/faktor/cartData",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setContent(result)
        },
        (error) => {
          console.log(error);
        })
    },[])
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
    console.log(content)
    return(
    <section className="delete-modal">
        <div className="modal-backdrop show-modal">
            <div className="task-popup fullPopUp">
                <i className="fa fa-remove closeModal" 
                    onClick={props.close}></i>
                <div className="sharif" style={{padding: "48px 10px"}}>
                    <main className="sharif-order-main">
                        {content?<QuickCartHolder token={token} 
                        user={content.cart&&content.cart.userId}
                        cartNo={data?data.orderNo:''}
                        addToCart={(e)=>addToCart(e)}
                        deleteFromCart={(e)=>removeItem(e)}
                        regCart={(e)=>regSepidar(e)}
                        cart={content.cart} setCart={(e)=>setContent(e)}
                        cartDetail={content.cartDetail} 
                        setError={setError}/>:
                        <div>{env.loader}</div>}
                    </main>
                </div>
            </div>
        </div>
        {error&&error.message?
        <ShowError color={error.color} status={"مدیریت"} 
        text={error.message} />:<></>}
    </section>
    )
}
export default OrderPopUp