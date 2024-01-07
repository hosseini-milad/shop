import { useState } from "react";
import SimpleAuth from "../../components/simpleAuth"
import env, { siteApi } from "../../env"

function AccountDetail(props){
    const userInfo = props.userInfo;
    const[value,setValue] = useState(!userInfo.error&&{
        name:userInfo.data.first_name,
        family:userInfo.data.last_name,
        meli:userInfo.data.national_number,
        phone:userInfo.data.mobile_phone,
        email:userInfo.data.email
    })
    //console.log(userInfo);
    const token = JSON.parse(localStorage.getItem('token-oil'));
    
    const handleSubmit = event => {
        event.preventDefault();
        //console.log(event.target[0].value);

        const body={
            "first_name": event.target[0].value,
            "last_name" : event.target[1].value,
            "national_identity_number": event.target[2].value,
            "mobile_phone":event.target[3].value,
            "email":event.target[4].value,
        }
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json',
            "Authorization": "Bearer "+token.token
         },
              body:  JSON.stringify(body)
          }
       fetch(siteApi+env.userAddInfoApi,postOptions)
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