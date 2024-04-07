import { useEffect, useState } from "react"
import env from "../../env"

function ManageListUser(props){
    const token = props.token
    const [myUsers,setMyUsers] = useState('')
    const [search,setSearch] = useState('')
    useEffect(()=>{
        if(search.length>0 && search.length<4) return
        const getOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({search:search})
          }
        fetch(env.siteApi + "/panel/user/my-customer",getOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                props.setError({message:result.error,color:"brown"})
                setTimeout(()=>props.setError({message:'',color:"brown"}),3000)
            }
            else{
                setMyUsers(result.data)
                props.setError({message:result.message,color:"green"})
                //props.setTab(0)
                //setTimeout(()=>window.location.href="#",1000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    },[search])
    return(
        <div className="card shadow-lg p450">
            <div className="card-header pb-0 pt-3">
                <h5 className="mt-3 mb-0">مشتریان من</h5>
                <input type="text" placeholder="جستجو" 
                className="myCustomer" value={search}
                onChange={(e)=>setSearch(e.target.value)} />
                <button className="btn btn-link text-dark p-0 fixed-plugin-close-button"
                onClick={()=>props.close()}>
                <i className="blackIcon fas fa-close"></i>
                </button>
            </div>
            <hr className="horizontal dark my-1"/>
            <main className="sharif-order-main">
            
            <section className="admin-table-sec ">
                <table>
                <thead>
                    <tr>
                    <th>نام مشتری</th>
                    <th>آدرس</th>
                    <th>شماره تماس</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {myUsers?myUsers.map((user,i)=>(
                        <tr key={i}>
                            <td>{user.username}</td>
                            <td>{user.Address}</td>
                            <td>{user.mobile}</td>
                            <td><b className='fa fa-edit'
                            onClick={()=>props.setTab(user._id)}></b></td>
                        </tr>
                    )):<></>}
                    
                </tbody>
                </table>
                
            </section>
            </main>
            <button className="btn bg-gradient-info px-3 mb-2 active add-card-btn"
            onClick={()=>props.setTab(1)}>افزودن کاربر جدید</button>
        </div>
    )
}
export default ManageListUser