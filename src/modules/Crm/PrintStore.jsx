import React ,{useEffect,useState}from 'react'
import env from "../../env"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const PrintStore = (props) => {
  const token=cookies.get(env.cookieName)
  const [List , setList] = useState("")
  useEffect(()=>{
    const postOptions={
        method:'post',
        headers: { 'Content-Type': 'application/json' ,
        "x-access-token": token&&token.token,
        "userId":token&&token.userId},
        body:JSON.stringify({status:"prepare"})
      }
    fetch(env.siteApi + "/panel/crm/find-bulk",postOptions)
    .then(res => res.json())
    .then(
        (result) => {
          setList(result)
        },
        (error) => {
            console.log(error)
        })
},[])
  console.log(List)
  return (
    <div className="Print-store">
      <div className="tables-container">
        {List&&List.data.map((Category,i)=>(
          <>
            <h4 className="category">{Category.catData&&Category.catData.title?Category.catData.title:"-"}</h4>
            {Category.data&&Category.data.map((Brand,i)=>(
              <div className="table-wrapper" key={i}>
                <div className="header">
                  <div className="header-item">
                    <p>{Brand.brandData.title}</p>
                    <p>نام محصول</p>
                    <p>تعداد</p>
                  </div>
                  <div className="header-item">
                    <p>{Brand.brandData.title}</p>
                    <p>نام محصول</p>
                    <p>تعداد</p>
                  </div>
                </div>
              <div className="main">
                  {Brand.data&&Brand.data.map((Item,i)=>
                    (<div className="main-item" key={i}>
                      <p>{i+1}</p>
                      <p>{Item.title}</p>
                      <p>{Item.count}</p>
                    </div>)
                  )}
                
              </div>
            </div>
            ))
              }
          </>
        ))
        }
      </div>
    </div>
  )
}

export default PrintStore
