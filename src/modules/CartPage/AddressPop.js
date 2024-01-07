import { useState } from 'react';
import Popup from 'reactjs-popup';
import SimpleAuth from '../../components/simpleAuth';
import env, { siteApi } from '../../env';
import AccountDetail from '../profilePage/accountDetail';
import AddressDetail from '../profilePage/addressDetail';
    
function AddressPop(props){ 
    const userInfo= props.userInfo;
    const userAddress= props.userAddress;
    const [tab,setTab]= useState(0);
    
   
    //console.log(address)
    
    return(
    <Popup trigger={<div className="addBtn"> ویرایش مشخصات و آدرس </div>}
    modal nested>  
    {close => (<div>
    <div className="addressHeader">
        <img src="https://yadaktimche.com/img/cam.png"/>
    </div>
    
    <div className="addressInputs">
        <div className="productPromises">
            <div className="productPromise">
                <div onClick={()=>setTab(0)} className={tab===0?"productPromiseText productPromiseActive":"productPromiseText"}>
                    <span>اطلاعات کاربری</span>
                </div>
                <div onClick={()=>setTab(1)} className={tab===1?"productPromiseText productPromiseActive":"productPromiseText"}>
                    <span>آدرس پستی</span>
                </div>
            </div>
        </div>
        {tab===0?<AccountDetail userInfo={userInfo}/>:''}
        {tab===1?<AddressDetail selectAddress={props.setAddress} close={()=>close()}/>:''}
        
    </div></div>)}
    </Popup>)
}
export default AddressPop