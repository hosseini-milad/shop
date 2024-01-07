import env, { siteApi } from "../../env";
import AccountDetail from "./accountDetail";
import OrderDetail from "./orderDetail";
import AddressDetail from "./addressDetail";

function ProfileMain(props){
  const profilePage = props.page;
  const userInfo = props.userInfo;
    return(<div className="profileMain">
        {profilePage===0&&<AccountDetail userInfo = {userInfo}/>}
        {profilePage===1&&<OrderDetail/>}
        {profilePage===2&&<AddressDetail/>}
        </div>
    )
}
export default ProfileMain