
function ProfileSideBar(props){
    const userInfo = props.userInfo;
    const logOut=()=>{
        localStorage.removeItem('token-oil');
        setTimeout(()=>document.location="/",1000);
      }
    //console.log(userInfo)
    return(<div className="profileSideBar">
        <div className="profileHeader">
            <i className="icon-size circleIcon fas fa-user"></i>
            <strong>سلام {userInfo&&userInfo.first_name}</strong>
        </div>
        <ul className="profileMenu"> 
            <li onClick={()=>props.pageSet(0)} 
                className={props.page ===0?"profileMenuActive":""}>مدیریت حساب</li>
            <li onClick={()=>props.pageSet(1)} 
                className={props.page ===1?"profileMenuActive":""}>لیست سفارشات</li>
            <li onClick={()=>props.pageSet(2)} 
                className={props.page ===2?"profileMenuActive":""}>آدرس های من</li>
            <li>علاقه مندی ها</li>
            <button className="profileOut" onClick={()=>logOut()}>خروج</button>
        </ul>
    </div>)
}
export default ProfileSideBar