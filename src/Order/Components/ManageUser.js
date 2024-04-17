import { useState } from 'react';
import Cookies from 'universal-cookie';
import env from '../../env';

import errortrans from "../../translate/error";
import ManageListUser from './ManageListUser';
import ManageAddUser from './ManageAddUser';
import ManageEditUser from './ManageEditUser';

const ManageUser = (props)=>{
    const cookies = new Cookies();
    const [tab,setTab] = useState(0)
    const token=cookies.get(env.cookieName)||1;
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    const [error,setError] = useState({message:'',color:"brown"})

    return(
      <div className={props.show?"fixed-plugin ps reyhamCard show":"fixed-plugin ps"}
      style={{direction:"rtl"}}>
        
      {tab===0?
      <ManageListUser close={()=>props.close()}
      setTab={setTab} token={token} setError={setError}/>:
      tab===1?
      <ManageAddUser close={()=>props.close()}
      setTab={setTab} token={token} setError={setError}/>:
      <ManageEditUser close={()=>props.close()} tab={tab}
      setTab={setTab} token={token} setError={setError}/>}
    </div>
    )
}
export default ManageUser