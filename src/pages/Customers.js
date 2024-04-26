import {useEffect,useState} from 'react'
import Cookies from 'universal-cookie';
import StatusBar from '../modules/Components/StatusBar';
import Paging from '../modules/Components/Paging';
import errortrans from "../translate/error";

import env from '../env'
import CustomerFilters from '../modules/Customer/CustomerComponent/CustomerFilters';
import CustomerTable from '../modules/Customer/CustomerTable';
import tabletrans from '../translate/tables';
const cookies = new Cookies();

function Customers(props){
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    const [content,setContent] = useState("")
    const [filters,setFilters] = useState("")
    const [showSms,setShowSMS] = useState(0)
    const [loading,setLoading] = useState(0)
    const [update,setUpdate] = useState(0)
    const token=cookies.get(env.cookieName)
    const [errorHandling,setErrorHandling] = useState(0)
    useEffect(() => {
      setLoading(1)
      const body={
          offset:filters.offset?filters.offset:"0",
          pageSize:filters.pageSize?filters.pageSize:"10",
          customer:filters.customer,
          orderNo:filters.orderNo,
          status:filters.status,
          brand:filters.brand,
          dateFrom:filters.date&&filters.date.dateFrom,
          dateTo:filters.date&&filters.date.dateTo,
          access:filters.access
      }
      const postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
          "x-access-token":token&&token.token,"userId":token&&token.userId},
          body:JSON.stringify(body)
        }
        console.log(postOptions)
    fetch(env.siteApi + "/panel/user/list-customers",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        setLoading(0)
          setContent('')
          setTimeout(()=> setContent(result),200)
      },
      (error) => {
        setLoading(0)
        console.log(error);
      }
      
  )},[filters])
  useEffect(() => {
    if(update===0)return
    const body={
        url:update
    }
    const postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId},
        body:JSON.stringify(body)
      }
  fetch(env.siteApi + "/panel/user/parse-list",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      setErrorHandling(result.matchError)
    },
    (error) => {
      console.log(error);
    }
    
)},[update])
  const resizeFile = (file) =>
    new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
  const updateCustomers=async(event)=>{
    const uploadFile = event.target.files[0]
    const tempfile = await resizeFile(uploadFile);
      const token=props.token
      const postOptions={
          method:'post',
          headers: { 'Content-Type': 'application/json',
          "x-access-token": token&&token.token,
          "userId":token&&token.userId
      },
          body:JSON.stringify({base64image:tempfile,folderName:"excel",
              imgName:uploadFile.name.split('.')[0]})
        }
      fetch(env.siteApi + "/panel/user/upload",postOptions)
      .then(res => res.json())
      .then(
          (result) => {
              //console.log(result)
              if(result.error){

              }
              else{
                  setUpdate(result.url)
              }
          },
          (error) => {
              console.log(error)
          })
}
    return(
      <div className="user" style={{direction:direction}}>
      <div className="od-header">
        <div className="od-header-info">
          
          <div className="od-header-name">
            <p>{tabletrans.customers[lang]}</p>
          </div>
          
        </div>
      <div className="od-header-btn">
          <label className="edit-btn" onClick={()=>setShowSMS(1)}>
            <i className="fa-solid fa-envelope-o"></i>
            {tabletrans.sendSms[lang]}
          </label>
          <label className="edit-btn" onClick={()=>window.location.href="/class"}>
            <i className="fa-solid fa-plus"></i>
            {tabletrans.classes[lang]}
          </label>
          
        </div>
      </div>
      <div className="list-container">
        
        <CustomerFilters lang={props.lang} setFilters={setFilters} 
          options={content.access}/>
        <div className="user-list">
          <CustomerTable userList={content} lang={props.lang} />
        </div>
        <Paging content={content} setFilters={setFilters} filters={filters}
          lang={props.lang}/>
      </div>
    </div>
    )
}
export default Customers