import { useState } from 'react';
import Popup from 'reactjs-popup';
    
function AddAddress(props){
    const userUrl=props.url;
    const phone = props.mobile;
    const userInfo=props.data[0];
    const billing = userInfo.billing
    const [addName,setAddName]= useState(billing.first_name);
    const [addPhone,setAddPhone]= useState(billing.phone);
    const [addState,setAddState]= useState(billing.state);
    const [addCity,setAddCity]= useState(billing.city);
    const [addAddress,setAddAddress]= useState(billing.address_1);
    const [addCode,setAddCode]= useState(billing.postcode);

    const regAddress=(close)=>{
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body:JSON.stringify({
                    billing:{
                        "first_name":addName,
                        "city":addCity,
                        "address_1":addAddress,
                        "postcode":addCode,
                        "state":addState,
                        "phone":addPhone
                    }
                })
              }
              fetch(userUrl+"/"+userInfo.id, requestOptions)
                .then(response => response.json())
                .then(data => props.setState(''))
        close()
    }
    return(
    <Popup trigger={<button className="button"> ویرایش مشخصات و آدرس </button>}
    modal nested> 
    {close => (<div>
    <div className="addressHeader">
        <img src="https://yadaktimche.com/img/cam.png"/>
    </div>
        <div className="addressInputs">
            <div className="addInputs">
                <div className="Inputs">
                    <span>نام و نام خانوادگی</span>
                    <input type="text" value={addName} onChange={(e)=>setAddName(e.target.value)}/>
                </div>
                <div className="Inputs">
                    <span>شماره تماس</span>
                    <input type="text" value={addPhone} onChange={(e)=>setAddPhone(e.target.value)}/>
                </div>
            </div>
            <div className="addInputs">
                <div className="Inputs">
                    <span>استان</span>
                    <input type="text"  value={addState} onChange={(e)=>setAddState(e.target.value)}/>
                </div>
                <div className="Inputs">
                    <span>شهر</span>
                    <input type="text"  value={addCity} onChange={(e)=>setAddCity(e.target.value)}/>
                </div>
            </div>
            <div className="addInputs">
                <div className="Inputs">
                    <span>آدرس</span>
                    <input type="text"  value={addAddress} onChange={(e)=>setAddAddress(e.target.value)}/>
                </div>
                <div className="Inputs">
                    <span>کدپستی</span>
                    <input type="text"  value={addCode} onChange={(e)=>setAddCode(e.target.value)}/>
                </div>
            </div>
            <a onClick={()=>regAddress(close)} className="modal-sub-btn">ثبت آدرس</a>
        </div></div>)}
    </Popup>)
}
export default AddAddress