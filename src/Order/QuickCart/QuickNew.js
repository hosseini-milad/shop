import { useState } from "react"
import QuickCounter from "./QuickCounter"
import QuickOff from "./QuickOff"
import QuickSearch from "./QuickSearch"
import env, { payValue } from "../../env"
import DataModal from "../../components/Modal/dataModal"

function QuickNew(props){
    const [selectedItem,setSelectedItem] = useState()
    const [count,setCount] = useState(1)
    const [discount,setDiscount] = useState(0)
    const [showDesc,setShowDesc] = useState(0)
    const [description,setDescription] = useState()
    const token = props.token
    const user=props.user
    //const [error,setError] = useState({message:'',color:"brown"})
    const addItem=()=>{
        if(!selectedItem)return
        props.setReload(0)
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({userId:user?user.Code?user.Code:
                user._id:(token&&token.userId),
                date:Date.now,
                cartItem:{
                    id:selectedItem.ItemID,
                    sku:selectedItem.sku,
                    title:selectedItem.title,
                    count:count?count:1,
                    discount:discount?discount:0,
                    price:selectedItem.priceData,
                    description:description},
                    payValue:props.payValue})
          }
        fetch(env.siteApi + "/panel/faktor/update-cart",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error){
                    setTimeout(()=>props.setReload(1),500)
                    props.setError({message:result.error,color:"brown"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                }
                else{
                    setTimeout(()=>props.setReload(1),500)
                    
                    props.setCart(result)
                    props.setError({message:result.message,color:"green"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                        
                    //setItem('')
                    //setItemPrice('')
                    setCount("1")
                }
            },
            (error) => {
                console.log(error)
            })
    
    }
    const defAction=()=>{
        if(!selectedItem)return
        props.action({
                id:selectedItem.ItemID,
                sku:selectedItem.sku,
                title:selectedItem.title,
                count:count?count:1,
                price:selectedItem.priceData,
                description:"ویرایش شده"})
    }
    return(
        <tr className="input-tr">
            <td data-cell="ردیف"></td>
            
            <td className="search-td" data-cell="کد کالا">
                <QuickSearch data={props.data} setdata={props.setdata} token={token}
                search={props.search} setSearch={props.setSearch}
                setSelectedItem={setSelectedItem}/>
            </td>
            <td data-cell="شرح کالا">
                {selectedItem?selectedItem.title:''}<br/>
                <small>{selectedItem?selectedItem.sku:''}</small>
            </td>
            <td data-cell="تعداد">
            <QuickCounter unit = {(selectedItem&&selectedItem.perBox)?selectedItem.perBox:10} 
                count={count} setCount={setCount}/>
            </td>
            <td data-cell="مبلغ واحد">
                {selectedItem? 
                payValue(selectedItem.priceData,props.payValue,1):''}
            </td>
            <td data-cell="تخفیف">
                <QuickOff change={(e)=>setDiscount(e)
                    } discount={discount?discount:0}/>
            </td>
            <td data-cell="مبلغ کل">
                {selectedItem?
                payValue(selectedItem.priceData,props.payValue,count,0):''}
            </td>
            <td>
            <div className="more-btn">
                <i className="fa-solid fa-comment"
                onClick={()=>setShowDesc(1)}></i>
                <i className="fa-solid fa-plus"
                onClick={props.action?
                defAction:addItem}></i>
            </div>
            {showDesc?<DataModal action={(e)=>setDescription(e)}
            close={()=>setShowDesc(0)} color="darkblue"
            buttonText="ثبت توضیحات" def={description} title={"افزودن توضیحات"}/>:
            <></>}
            </td>
        </tr>
    )
}
export default QuickNew