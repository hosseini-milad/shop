import { useState } from "react"
import ErrorAction from "../../components/Modal/ErrorAction"
import env, { normalPriceCount, payValue } from "../../env"
import DataModal from "../../components/Modal/dataModal"
import QuickOff from "./QuickOff"
import QuickCounter from "./QuickCounter"

function QuickRow(props){
    const data = props.data
    const token = props.token
    const user = props.user
    
    const [showDesc,setShowDesc] = useState(0)
    const [editMode,setEditMode] = useState(0)
    const [changes,setChanges]= useState()
    const updateField=(changes)=>{
        if(!changes) return
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({userId:user?user.Code?user.Code:
                user._id:(token&&token.userId),
                cartNo:props.cartNo,
                cartID:data.id,changes})
          }
          console.log(postOptions)
        fetch(env.siteApi + (props.cartNo?"/panel/faktor/update-Item-cart":
            "/panel/faktor/update-Item") ,postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error){
                    props.setError({message:result.error,color:"brown"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                    
                }
                else{
                    props.setCart(result) 
                    props.setError({message:result.message,color:"orange"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                        
                }
            },
            (error) => {
                console.log(error)
            })
    }
    
  const [showRemove,setShowRemove] = useState()
    const removeItem=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({userId:user?user.Code?user.Code:
                user._id:(token&&token.userId),
                cartID:data.id})
          }
          console.log(postOptions)
        fetch(env.siteApi + "/panel/faktor/remove-cart",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error){
                    props.setError({message:result.error,color:"brown"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                }
                else{
                    props.setCart(result) 
                    props.setError({message:result.message,color:"orange"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)

                }
            },
            (error) => {
                console.log(error)
            })
    }
    const defAction=()=>{
        props.action({cartID:data.id})
    }
    const saveChanges=()=>{
        updateField(changes)
        console.log(changes)
        setEditMode(0)
    }
    return(<>
        <tr className="product-tr">
            <td data-cell="ردیف">
            <p>{props.index}</p>
            </td>

            <td data-cell="کد کالا">
            <p>{data.sku}</p>
            </td>
            <td data-cell="شرح کالا">
            <div className="product-title">
            <img src={(data.productData&&data.productData.imageUrl)?(env.siteApiUrl+data.productData.imageUrl):("/img/business/oil1.png")} alt="product"/>
                <div className="product-name">
                <p className="name">{data.title}</p>

                </div>
            </div>
            </td>
            <td data-cell="تعداد">
            {editMode?<div className="input-tr">
                <QuickCounter setCount={(e)=>setChanges(prevState => ({
                    ...prevState,
                    count:e
                    }))} unit = {(data&&data.perBox)?data.perBox:10}
                    count={changes?changes.count:data.count}/></div>:
                <p>{data.count}</p>}
            </td>
            <td data-cell="مبلغ واحد">
            <p>{payValue(data.price,props.payValue,1)}</p>
            </td>
            <td data-cell="تخفیف">
                {editMode?<div className="input-tr">
                    <QuickOff change={(e)=>setChanges(prevState => ({
                    ...prevState,
                    discount:e
                    }))} discount={changes?changes.discount:data.discount}
                    def={data.discount}/></div>:
                <p>{normalPriceCount(data.discount)}
                {parseInt(data.discount)<100?"%":""}</p>}
            </td>
            <td data-cell="مبلغ کل">
            <p>{payValue(data.price,props.payValue,data.count,data.discount)}</p>
            </td>
            <td>
            {editMode?<div className="more-btn">
                <i className="fa-solid fa-save"
                onClick={saveChanges}></i>
                <i className="fa-solid fa-remove"
                onClick={()=>setEditMode(0)}></i>
                </div>:
                <div className="more-btn">
                {props.canEdit?<i className="fa-solid fa-pen"
                onClick={()=>setEditMode(1)}></i>:<></>}
                <i className="fa-solid fa-comment"
                onClick={()=>setShowDesc(1)}></i>
                {data.stock?<i className="fa-solid fa-sign-out storeSelect"
                onClick={()=>updateField({stock:""})}></i>:
                <i className="fa-solid fa-sign-out"
                    onClick={()=>updateField({stock:"9"})}></i>}
                <i className="fa-solid fa-trash" style={{color: "red"}}
                onClick={()=>setShowRemove(1)}></i>
            </div>}
            </td>
        </tr>
        {showRemove?
          <ErrorAction status={"DELETE"} title={"حذف آیتم"} 
            text={"آیتم انتخاب شده حذف خواهد شد. آیا مطمئن هستید؟"} linkText={""} style={{direction:"rtl"}}
            buttonText="حذف" close={()=>setShowRemove()}
            color="red" action={()=>props.action?defAction():removeItem()}/>:
          <></>}
          {showDesc?<DataModal action={
            (e)=>updateField({description:e})}
            close={()=>setShowDesc(0)} color="darkblue"
            buttonText="تغییر توضیحات" def={data.description} 
            title={"تغییر توضیحات"}/>:
            <></>}
        </>
    )
}
export default QuickRow