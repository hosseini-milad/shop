import { useState } from "react"
import QuickCounter from "./QuickCounter"
import QuickOff from "./QuickOff"
import QuickSearch from "./QuickSearch"
import env, { payValue } from "../../env"

function QuickNew(props){
    const [selectedItem,setSelectedItem] = useState()
    const [count,setCount] = useState(1)
    const token = props.token
    const user=props.user
    const [error,setError] = useState({message:'',color:"brown"})
    const addItem=()=>{
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
                    price:selectedItem.priceData,
                    description:"description"},
                    payValue:props.payValue})
          }
        fetch(env.siteApi + "/panel/faktor/update-cart",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error){
                    setError({message:result.error,color:"brown"})
                    setTimeout(()=>setError({message:'',
                        color:"brown"}),3000)
                }
                else{
                    props.setCart(result)
                    //setItem('')
                    //setItemPrice('')
                    setCount("1")
                }
            },
            (error) => {
                console.log(error)
            })
    
    }
    return(
        <tr className="input-tr">
            <td data-cell="ردیف"></td>
            <td data-cell="کد کالا">
                <QuickSearch data={props.data}
                 search={props.search} setSearch={props.setSearch}
                setSelectedItem={setSelectedItem}/>
            </td>
            <td data-cell="شرح کالا">
                {selectedItem?selectedItem.title:''}<br/>
                <small>{selectedItem?selectedItem.sku:''}</small>
            </td>
            <td data-cell="تعداد">
            <QuickCounter unit = {12} 
                count={count} setCount={setCount}/>
            </td>
            <td data-cell="مبلغ واحد">
                {selectedItem?
                payValue(selectedItem.priceData,props.payValue,1):''}
            </td>
            <td data-cell="تخفیف">
                <QuickOff />
            </td>
            <td data-cell="مبلغ کل">
                {selectedItem?
                payValue(selectedItem.priceData,props.payValue,count,0):''}
            </td>
            <td>
            <div className="more-btn">
                <i className="fa-solid fa-comment"></i>
                <i className="fa-solid fa-plus"
                onClick={addItem}></i>
            </div>
            </td>
        </tr>
    )
}
export default QuickNew