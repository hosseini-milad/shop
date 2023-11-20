import tabletrans from "../../../translate/tables";

function UserTabs(props){
    const color = props.lang.color
    const index = props.tabIndex
    const activeTab = {
      color: color,
      borderBottom: "2px solid "+color,
      fontWeight:"bold"
    };
    return(
        <div className="navigation-bar">
        <label className="label-page-1" htmlFor="page-1">
          <div className="nav-btn" style={index===0?activeTab:{}}
            onClick={()=>props.setTabIndex(0)}>
            <i className="tabIcon fas fa-id-card-o"></i>
            <p>{tabletrans.general[props.lang]}</p>
          </div>
        </label>
        <label className="label-page-2" htmlFor="page-2">
          <div className="nav-btn"  style={index===1?activeTab:{}}
            onClick={()=>props.setTabIndex(1)}>
            <i className="tabIcon fas fa-credit-card"></i>
            <p>{tabletrans.billing[props.lang]}</p>
          </div>
        </label>
        <label className="label-page-3" htmlFor="page-3">
          <div className="nav-btn"  style={index===2?activeTab:{}}
            onClick={()=>props.setTabIndex(2)}>
            <i className="tabIcon fas fa-bell"></i>
            <p>{tabletrans.notification[props.lang]}</p>
          </div>
        </label>
        <label className="label-page-4" htmlFor="page-4">
          <div className="nav-btn"  style={index===3?activeTab:{}}
            onClick={()=>props.setTabIndex(3)}>
            <i className="tabIcon fas fa-share-square"></i>
            <p>{tabletrans.socialLink[props.lang]}</p>
          </div>
        </label>
        <label className="label-page-5" htmlFor="page-5">
          <div className="nav-btn"  style={index===4?activeTab:{}}
            onClick={()=>props.setTabIndex(4)}>
            <i className="tabIcon fas fa-lock"></i>
            <p>{tabletrans.security[props.lang]}</p>
          </div>
        </label>

      </div>
    )
}
export default UserTabs