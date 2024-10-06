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
            {Category.data&&Category.data.map((Brand,i)=>(<>
              <h4 className="category">
                {(Category.catData&&Category.catData.title?Category.catData.title:"-")+"-"+(Brand.brandData.title)}
              </h4>
              <table className="hesabfaMainTable" key={i}>
                
              <tbody>
                <tr>
                  <th></th>
                  <th>#</th>
                  <th>کد کالا</th>
                  <th>برند</th>
                  <th>عنوان کالا</th>
                  <th>کارتن</th>
                  <th>تعداد</th>
                  <th>تعداد کل</th>
                  <th>توضیحات</th>
                </tr>
                {Brand.data&&Brand.data.map((Item,i)=>
                  (<tr key={i}>
                    <td></td>
                    <td>{i+1}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>)
                )}
                
              </tbody>
            </table>
            </>
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
