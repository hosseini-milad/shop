import {useEffect,useState} from 'react'
import Cookies from 'universal-cookie';
import StatusBar from '../modules/Components/StatusBar';
import Paging from '../modules/Components/Paging';
import errortrans from "../translate/error";

import env from '../env'
import CustomerFilters from '../modules/Customer/CustomerComponent/CustomerFilters';
import CustomerTable from '../modules/Customer/CustomerTable';
const cookies = new Cookies();

function Customers(props){
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    const [content,setContent] = useState("")
    const [filters,setFilters] = useState("")
    const [loading,setLoading] = useState(0)
    const token=cookies.get(env.cookieName)
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
  console.log(content)
    return(
      <div className="user" style={{direction:direction}}>
      <h4>List</h4>
      <div className="list-container">
        <StatusBar />
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