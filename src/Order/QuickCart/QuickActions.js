import { useEffect, useState } from "react"
import DataModal from "../../components/Modal/dataModal"
import env from "../../env"

function QuickActions(props){
    const token = props.token
    const cart = props.cart
    //console.log(cart.discount)
    const [showDesc,setShowDesc] = useState(0)
    const [description,setDescription] = useState(cart&&cart.description)
    const [showDisc,setShowDisc] = useState(0)
    const [discount,setDiscount] = useState()
    const [disText,setDisText] = useState(cart&&cart.discount)
    
    
    useEffect(()=>{    
        //if(!description&&!discount)return
        if(!cart) return
        if(cart.discount ==disText&&
            cart.description == description) return
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({description:description,
            discount:discount,userId:props.user?props.user._id:'',
            cartNo:props.cartNo})
          }
        console.log(postOptions)
        fetch(env.siteApi + "/panel/faktor/update-desc",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error){
                    props.setError({message:result.error,color:"brown"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                }
                else{
                    //if(!props.action)
                        props.setCart(result)
                    props.setError({message:result.message,color:"green"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                }
            },
            (error) => {
                console.log(error)
            })
    
    },[description,discount])
    useEffect(()=>{
        if(!cart)return
        if(cart.payValue == props.payValue) return
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({userId:props.user?props.user._id:''
                ,payValue:props.payValue,
            cartNo:props.cartNo})
          }
        //console.log(postOptions)
        fetch(env.siteApi + "/panel/faktor/edit-payValue",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error){
                    props.setError({message:result.error,color:"brown"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                }
                else{
                    //if(!props.action)
                        props.setCart(result)
                    props.setError({message:result.message,color:"green"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                }
            },
            (error) => {
                console.log(error)
            })
    
    },[props.payValue])
    return(
    <div className="btn-wrapper">
        <button type="button" className="product-table-btn pay-metod-btn">
            <div className={props.payValue==3?"cash-pay display-on":"cash-pay"}
                onClick={()=>props.setPayValue(4)}>
            <p>نقدی</p>
            <i className="fa-solid fa-money"></i>
            </div>
            <div className={props.payValue==4?"check-pay display-on":"check-pay"}
                onClick={()=>props.setPayValue(3)}>
            <p>غیرنقدی</p>
            <i className="fa-solid fa-credit-card"></i>
            </div>
        </button>
        <button type="button" className="product-table-btn"
        onClick={()=>setShowDesc(1)}>
            <p>توضیحات</p><i className="fa-solid fa-comment"></i>
        </button>
        {showDisc?<button type="button" className="product-table-btn">
            <input type="input" placeholder="تخفیف" value={disText}
                onChange={(e)=>setDisText(e.target.value)}/>
            <i className="fa fa-check" onClick={()=>(setDiscount(disText),setShowDisc(0))}></i>
            <i className="fa fa-remove" onClick={()=>setShowDisc(0)}></i>
        </button>:
        <button type="button" className="product-table-btn"
        onClick={()=>setShowDisc(1)}>
            <p>تخفیف</p>
            <i className="fa-solid fa-percent"></i>
        </button>}
        {/*<button type="button" className="product-table-btn">
            <p>زمان تحویل</p><i className="fa-solid fa-calendar-days"></i>
    </button>
        <button type="button" className="product-table-btn hurry-btn">
            <div className="fast-order">
            <p>فوری</p><i className="fa-solid fa-truck-fast"></i>
            </div>
            <div className="slow-order display-on">
            <p>عادی</p><i className="fa-solid fa-truck"></i>
            </div>
        </button>*/}
        {showDesc?<DataModal action={(e)=>setDescription(e)}
            close={()=>setShowDesc(0)} color="darkblue"
            buttonText="ثبت توضیحات" def={description} title={"افزودن توضیحات"}/>:
            <></>}
    </div>
    )
}
export default QuickActions