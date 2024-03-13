import Cookies from 'universal-cookie';
import StatusBar from '../modules/Components/StatusBar';
import Paging from '../modules/Components/Paging';
import errortrans from "../translate/error";
import OrderTable from '../modules/Orders/OrderTable';
import OrderFilters from '../modules/Orders/OrderComponent/OrderFilters';
import { useEffect } from 'react';
import { useState } from 'react';
import env from '../env';
import ProductTable from '../modules/Products/ProductTable';
import tabletrans from '../translate/tables';
import ClassTable from '../modules/Classes/ClassTable';
const cookies = new Cookies();

function Classes(props){
    const direction = props.lang?props.lang.dir:errortrans.defaultDir;
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    const [content,setContent] = useState("")
    const [filters,setFilters] = useState("")
    const [loading,setLoading] = useState(0)
    const token=cookies.get(env.cookieName)
    useEffect(() => {
      setLoading(1)
      const body={
      }
      const postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
          "x-access-token":token&&token.token,"userId":token&&token.userId},
          body:JSON.stringify(body)
        }
        console.log(postOptions)
    fetch(env.siteApi + "/panel/user/list-classes",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        setLoading(0)
          setContent('')
          setTimeout(()=> setContent(result),200)
      },
      (error) => {
        setLoading(0)
        console.log(error);
      }
      
  )},[filters])
  //window.scrollTo(0, 270);},[pageNumber,filters,perPage,refreshTable])
   return(
      <div className="user" style={{direction:direction}}>
      <div className="od-header">
        <div className="od-header-info">
          
          <div className="od-header-name">
            <p>{tabletrans.classes[lang]}</p>
          </div>
          
        </div>
        <div className="od-header-btn">
          <div className="edit-btn add-btn" 
            onClick={()=>window.location.href="/class/detail/new"}>
            <i className="fa-solid fa-plus"></i>
            <p>{tabletrans.addNew[lang]}</p>
          </div>
          <div className="edit-btn">
            <i className="fa-solid fa-pen"></i>
            <p>{tabletrans.edit[lang]}</p>
          </div>
        </div>
      </div>
      <div className="list-container">
        <StatusBar lang={lang} token={token} filters={filters}
         status={content.rxStatus} setFilters={setFilters}/>
        <OrderFilters lang={props.lang} setFilters={setFilters}
          options={content.brand} filters={filters}/>
        <div className="user-list"> 
          {loading?env.loader:<ClassTable classes={content} lang={lang}/>}
        </div>
        <Paging content={content} setFilters={setFilters} filters={filters} 
          lang={props.lang}/>
      </div>
    </div>
    )
}
export default Classes