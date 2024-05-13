import { useState } from "react"
import { PriceDiscountTax, TAX, normalPriceCount, normalPriceRound } from "../../env"

function PreQuickItem(props){
    const data = props.data
    //console.log(data.userData)
    const userDetail = (data.userInfo&&data.userInfo.length)?
      data.userInfo[0]:''
    return(
       <span style={{minWidth: "100px"}}>{userDetail?userDetail.username:''}</span>
                
                
    )
}
export default PreQuickItem