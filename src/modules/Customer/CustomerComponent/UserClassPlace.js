import env from "../../../env"

function UserClassPlace(props){
    const classes=props.classes
    const userData = props.userData
    const token = props.token
    const addToUser=(className)=>{
      const body={
        class: className,
        userId: userData&&userData._id,
    }
    const postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId},
        body:JSON.stringify(body)
      }
      console.log(postOptions)
  fetch(env.siteApi + "/panel/user/update-customer-class",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      props.setChangeClass(result)
    },
    (error) => {
      console.log(error);
    })
    }
    return(
        <div className="assign-box left-box">
            <h6 className="unchecked-header">{props.header}</h6>
            <div className="checked-header">
              <p>0 Projects selected</p>
              <i className="fa-solid fa-arrow-right transfer-arrow"></i>
            </div>
            <div className="gp-wrapper">
              <div className="gp-header"><p> </p></div>
              {classes?classes.map((classN,i)=>(
                <div className="gp-member" key={i} onClick={()=>addToUser(classN)}>
                  <input type="checkbox" name="" id="member-1"/>
                  <label htmlFor="member-1">{classN.className}</label>
                  <i className="fa-solid fa-arrow-right transfer-arrow"></i>
                </div>
              )):<></>}
              
            </div>
          </div>
    )
}
export default UserClassPlace