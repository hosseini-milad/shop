import { useState } from "react"
import UserForm from "./UserForm"
import env from "../../env"

function ManageAddUser(props){
    const token = props.token
    const [data,setData] = useState()
    const [imageUrl,setImageUrl] = useState('')
    const [imageUrl2,setImageUrl2] = useState('')
    const [kasbUrl,setKasbUrl] = useState('')
    
    const [shopUrl1,setShopUrl1] = useState('')
    const [shopUrl2,setShopUrl2] = useState('')
    const [shopUrl3,setShopUrl3] = useState('')

    const regCustomer=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {access:"customer",...data,
                imageUrl1:imageUrl,imageUrl2:imageUrl2,kasbUrl:kasbUrl,
                username:data.cName+ " "+ data.sName})
          }
        fetch(env.siteApi + "/panel/user/create-customer",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                props.setError({message:result.error,color:"brown"})
                setTimeout(()=>props.setError({message:'',color:"brown"}),3000)
            }
            else{
                props.setError({message:result.message,color:"green"})
                props.setTab(0)
                //setTimeout(()=>window.location.href="#",1000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    }
    return(
        <div className="card shadow-lg p450">
            <div className="card-header pb-0 pt-3">
                <h5 className="mt-3 mb-0">مشتری جدید</h5>
                <button className="btn btn-link text-dark p-0 fixed-plugin-close-button"
                onClick={()=>props.close()}>
                <i className="blackIcon fas fa-close"></i>
                </button>
            </div>
            <hr className="horizontal dark my-1"/>
            <main className="sharif-order-main">
                <section className="admin-table-sec ">
                    <UserForm setData={setData}
                    imageUrl={imageUrl} setImageUrl={setImageUrl}
                    imageUrl2={imageUrl2} setImageUrl2={setImageUrl2}
                    kasbUrl={kasbUrl} setKasbUrl={setKasbUrl}
                    shopUrl1={shopUrl1} setShopUrl1={setShopUrl1}
                    shopUrl2={shopUrl2} setShopUrl2={setShopUrl2}
                    shopUrl3={shopUrl3} setShopUrl3={setShopUrl3}/>
                </section>
            </main>
            <div className="card-btn-holder">
                <button className="btn bg-gradient-info px-3 mb-2 active add-card-btn"
                onClick={regCustomer}
                >ثبت کاربر</button>
                <button className="btn bg-gradient-warning px-3 mb-2 cancel-card-btn"
                onClick={()=>props.setTab(0)}
                >انصراف</button>
            </div>
        </div>
    )
}
export default ManageAddUser