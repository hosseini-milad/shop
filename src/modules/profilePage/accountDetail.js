import { useState } from "react";
import SimpleAuth from "../../components/simpleAuth"
import env, { siteApi } from "../../env"

function AccountDetail(props){
    const userInfo = props.userInfo;
    const[value,setValue] = useState(!userInfo.error&&{
        name:userInfo.data.cName,
        family:userInfo.data.sName,
        meli:userInfo.data.meliCode,
        phone:userInfo.data.mobile,
        email:userInfo.data.email
    })
    //console.log(userInfo);
    const token = props.token
    
    const handleSubmit = event => {
        event.preventDefault();
        //console.log(event.target[0].value);

        const body={
            "cName": event.target[0].value,
            "sName" : event.target[1].value,
            "meliCode": event.target[2].value,
            "mobile":event.target[3].value,
            "email":event.target[4].value,
        }
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json',
            "x-access-token":token.token,"userId":token.userId
         },
              body:  JSON.stringify(body)
          }
          console.log(postOptions)
       fetch(siteApi+"/auth/change-user",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            alert('اطلاعات کاربری بروز شد.')
            setTimeout(document.location.reload(),1000)
          console.log(result)
        },
        (error) => {
          console.log(error);
        }
      );
      }
      const onChange=()=>{

      }
    return(<>
        <h2>اطلاعات حساب کاربری</h2>
        {userInfo&&<form className="profileForm" onSubmit={handleSubmit}>
            <div className="profileInput">
                <label>نام</label>
                <input type="input" value={value.name} 
                    onChange={(e)=>setValue(p => {return { ...p, 
                        name: e.target.value }
                      })}
                    defaultValue={!userInfo.error?userInfo.data.first_name:''}/>
            </div>
            <div className="profileInput">
                <label>نام خانوادگی</label>
                <input type="input" value={value.family} 
                    onChange={(e)=>setValue(p => {return { ...p, 
                        family: e.target.value }
                      })}
                   defaultValue={!userInfo.error?userInfo.data.last_name:''}/>
            </div>
            <div className="profileInput profileLeft">
                <label>کدملی</label>
                <input type="number" value={value.meli} 
                    onChange={(e)=>setValue(p => {return { ...p, 
                        meli: e.target.value.replace(/\D/g, '') }
                      })}
                   defaultValue={!userInfo.error?userInfo.data.national_number:''}/>
            </div>
            <div className="profileInput profileLeft">
                <label>شماره تماس</label>
                <input type="input" value={value.phone} 
                    onChange={(e)=>setValue(p => {return { ...p, 
                        phone: e.target.value.replace(/\D/g, '')  }
                      })}
                   defaultValue={!userInfo.error?userInfo.data.mobile_phone:''}/>
            </div>
            <div className="profileInput profileLeft">
                <label>آدرس ایمیل</label>
                <input type="input" value={value.email} 
                    onChange={(e)=>setValue(p => {return { ...p, 
                        email: e.target.value }
                      })}
                   defaultValue={!userInfo.error?userInfo.data.email:''}/>
            </div>
            <input type="submit" className="buttonHandler offerButton" value="ویرایش"/>
        </form>}
        
    </>
    )

}
export default AccountDetail