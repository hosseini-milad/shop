import env, { siteApi } from "../../env";
import AccountDetail from "./accountDetail";
import OrderDetail from "./orderDetail";
import AddressDetail from "./addressDetail";

function ProfileMain(props){
  const profilePage = props.page;
  const userInfo = props.userInfo;
  console.log(userInfo)
    return(<div className="profileMain">
        {profilePage===0&&<AccountDetail userInfo = {userInfo}
         token={props.token}/>}
        {profilePage===1&&<OrderDetail token={props.token}/>}
        {profilePage===2&&<AddressDetail token={props.token}/>}
        </div>
    )
}
export default ProfileMain