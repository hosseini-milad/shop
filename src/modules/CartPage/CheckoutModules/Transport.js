import { useState } from "react"
import { normalPrice } from "../../../env"
import AddressDetail from "../../profilePage/addressDetail"

function Transport(props){
    const cart = props.cart
    const [transportKind,setKind] = useState(0)
    const [selectedTransport,setTransport] = useState(0)
    const updateTransport =(item,text)=>{
        props.setTransportDetail(text)
        setTransport(item)
    }
    return(
        <div style={{display:"flex",justifyContent: "space-between"}}>
            <div style={{width:"48%"}}>
                <div style={{display:"flex"}} onClick={()=>setKind(1)}>
                    <input type="radio" checked={transportKind===1?true:false}
                        onChange={()=>{}}/>
                        <p>تحویل حضوری</p>
                </div>
                <div style={{display:"flex"}} onClick={()=>setKind(2)}>
                    <input type="radio" checked={transportKind===2?true:false}
                        onChange={()=>{}}/>
                        <p>تحویل در محل</p>
                </div>
            </div>
            <div style={{width:"48%"}}>
                {transportKind===1?<div style={{display:"grid"}}>
                    <div style={{display:"flex"}} onClick={()=>updateTransport(1,"درب فروشگاه مرکزی")}>
                        <input type="radio" checked={selectedTransport===1?true:false}
                        onChange={()=>{}}/>
                        <p>درب فروشگاه مرکزی</p>
                    </div>
                    <div style={{display:"flex"}} onClick={()=>updateTransport(2,"درب شعبه 1")}>
                        <input type="radio" checked={selectedTransport===2?true:false}
                        onChange={()=>{}}/>
                            <p>درب شعبه 1</p>
                    </div>
                    <div style={{display:"flex"}} onClick={()=>updateTransport(3,"درب شعبه 2")}>
                        <input type="radio" checked={selectedTransport===3?true:false}
                        onChange={()=>{}}/>
                            <p>درب شعبه 2</p>
                    </div>

                </div>:transportKind===2?
                <AddressDetail selectAddress={props.setTransportDetail} token={props.token}
                close={()=>{}}/>:<></>
                } 
            </div>
        {/*userInfo&&!userInfo.error?<h4 style={{marginBottom:"10px"}}>
          {userInfo.data.first_name + " " + userInfo.data.last_name}</h4>:
  <AccountDetail userInfo={""}/>
        {userAddress&&userAddress.total?<small>{userAddress.data[0].address}</small>:
        <AddressDetail selectAddress={setAddress} token={token}/> }*/}
      </div>    
    )
}
export default Transport