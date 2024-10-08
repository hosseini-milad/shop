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
      <div className="customer-container">
        <h4>نام مشتریان</h4>
        <p>{List.customersName}</p>
      </div>
      <div className="tables-container">
        {List&&List.data.map((Category,i)=>(
          
            <>
            <h4 className="category">
                {(Category.catData&&Category.catData.title?Category.catData.title:"---")}
              </h4>
            {Category.data&&Category.data.map((Brand,i)=>(<>
              
              <table className="hesabfaMainTable" key={i}>
                
              <tbody>
                <tr>
                  <th className="x-small-td"></th>
                  <th className="x-small-td">#</th>
                  <th className="meduim-td">کد کالا</th>
                  <th className="small-td">برند</th>
                  <th className="larg-td">عنوان کالا</th>
                  <th className="count-td">کارتن</th>
                  <th className="count-td">تعداد</th>
                  <th className="count-td">تعداد کل</th>
                  <th>توضیحات</th>
                </tr>
                {Brand.data&&Brand.data.map((Item,i)=>
                  (<tr key={i}>
                    <td className="x-small-td"></td>
                    <td className="x-small-td">{i+1}</td>
                    <td className="meduim-td">{Item.sku}</td>
                    <td className="small-td">{Brand.brandData&&Brand.brandData.title?Brand.brandData.title:"_"}</td>
                    <td className="larg-td">{Item.title}</td>
                    <td className="count-td">{Item.box}</td>
                    <td className="count-td">{Item.single}</td>
                    <td className="count-td">{Item.count}</td>
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
