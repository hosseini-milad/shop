import React ,{ useState } from "react"
import Status from "../Components/Status"
import  env, { normalPriceCount, rxFindCount } from "../../env"
import BrandQuickDetail from "./BrandComponent/BrandQuickDetail"
import tabletrans from "../../translate/tables"
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function BrandTableRow(props){
  
  const [openOption,setOpenOption] = useState(0)
  const [checkState,setCheckState] = useState(false)
  const [error, setError] = useState({ errorText: "", errorColor: "brown" });
  const activeAcc = props.index===props.detail
  const brand=props.brand
  const token=cookies.get(env.cookieName)
  

  const deleteBrand = () => {
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json", 
      "x-access-token":token&&token.token,"userId":token&&token.userId},
      body: JSON.stringify({
        brandId: brand._id,
      }),
    };
    fetch(env.siteApi + "/panel/product/delete-product", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setError({ errorText: result.success, errorColor: "green" });
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              3000
            );
          } else console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const changeStatus = () => {
  
    var current = "true"
    if(brand.active == true){
      current = "false"
    } else {
      current = "true"
    }
    
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json", 
      "x-access-token":token&&token.token,"userId":token&&token.userId},
        body: JSON.stringify({
        brandId: brand._id,
        active: current
      }),
    };
    fetch(env.siteApi + "/panel/product/update-brand", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setError({ errorText: result.success, errorColor: "green" });
            props.setloading(1);

            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              3000
            );
          } else console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };



    return(<React.Fragment>
        <tr 
            className={activeAcc?"activeAccordion":"accordion"}>
            <td className="checkBoxStyle">
              <input type="checkbox" name="" id="" checked={checkState}
              onChange={(e)=>setCheckState(checkState?false:true)}/></td>
            <td>
                <div className="order-id">
                  {brand.brandCode}
                </div>
            </td>
            <td>
              <div className="cu-avatar">
                  <img src={brand?(env.siteApiUrl+brand.brandUrl):''} 
                    alt={brand?brand.title:"default"}/>
                  <div className="cu-name" onClick={()=>
                  window.location.href="/brands/detail/"+brand._id}>
                    <p className="name">{brand.title}</p>
                    <p className="email">{brand.sku}</p>
                  </div>
                  {brand.moreInformation?
                    <i className="fa fa-comment-o" title={brand.moreInformation}></i>:<></>}
                </div>
              </td>
              <td>
                <Status
                  status={brand.active} class={"order-status"} 
                  lang={props.lang}
                  changeStatus={changeStatus} // Passing the changeStatus function
                  text={brand.active == true?tabletrans.activeText[props.lang]:tabletrans.deactiveText[props.lang]}
                  />
              </td>
            <td>
              <div className="more-btn">
              {/* <i className={`tableIcon fas ${activeAcc?"fa-chevron-up":"fa-chevron-down"}`} 
                onClick={()=>props.showDetail(activeAcc?"-1":props.index)} ></i> */}
                <i className="tableIcon fas fa-edit" onClick={()=>
                  window.location.href="/brands/detail/"+brand._id}></i>
                <i className="tableIcon fas fa-ellipsis-v" 
                  onClick={()=>setOpenOption(openOption?0:1)}></i>
              </div>
              {openOption?<div className="sub-more-menu">
                <div className="sub-option sub-delete" onClick={deleteBrand}>
                <i className="tableIcon fas fa-remove" style={{color: "#ff0000"}}></i>
                  <p>{tabletrans.delete[props.lang]}</p>
                </div>
                <div className="sub-option sub-edit" onClick={()=>
                  window.location.href="/brands/detail/"+brand._id}>
                  <i className="tableIcon fas fa-edit"></i>
                  <p>{tabletrans.edit[props.lang]}</p>
                </div>
              </div>:<></>}
            </td>
          </tr>
          {activeAcc?<tr className="sub-order">
        <td colSpan="9"><BrandQuickDetail brand={brand}/></td></tr>
          :<React.Fragment></React.Fragment>}
          </React.Fragment>
    )
}
export default BrandTableRow