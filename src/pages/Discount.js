import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import DUserTable from "../modules/Users/DUserTable";
import DTable from "../modules/Discount/DTable";
import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import env from "../env";
import tabletrans from "../translate/tables";
import DUserFilters from "../modules/Users/DUserFilters";
import { TextField } from "@material-ui/core"
import StyleInput from "../components/Button/Input";
import StyleSelect from "../components/Button/AutoComplete";



const cookies = new Cookies();

function Users(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [Dtable, setDtable] = useState(0);
  const [AddDiscount, setAddDiscount] = useState(0);
  const [RxStock, setRxstock] = useState(0);
  const [offerStock,setOfferStock] = useState('')
  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [loading, setLoading] = useState(0);
  const [SaveD, setSaveD] = useState(0);
  const [Brand, setBrand] = useState('');
  const [Material, setMaterial] = useState('');
  const [DiscountPer, setDiscountPer] = useState('');
  const [OfferId, setOfferId] = useState('');
  const [update, setUpdate] = useState(0);
  const [offerParams,setOfferParams]= useState('')
  const [OffType,setOffType]= useState('')
  const [OffNum,setOffNum]= useState('')
  const [OptionBrand,setOptionBrand]= useState('')
  
  //console.log(Dtable)
  const token = cookies.get(env.cookieName);
  useEffect(() => {
    setLoading(1);
    const body = {
      // offset:filters.offset?filters.offset:"0",
      offset: filters.offset || "0",

      // pageSize:filters.pageSize?filters.pageSize:"10",
      pageSize: filters.pageSize || "10",

      customer: filters.customer,
      orderNo: filters.orderNo,
      status: filters.status,
      profile: filters.profile,
      brand: filters.brand,
      dateFrom: filters.date && filters.date.dateFrom,
      dateTo: filters.date && filters.date.dateTo,
      access: filters.access,
    };
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(body),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/panel/user/list-customers", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(0);
          setContent("");
          setTimeout(() => setContent(result), 200);
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  }, [filters]);
  useEffect(() => {
    if (update === 0) return;
    const body = {
      url: update,
    };
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(body),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/panel/user/parse-list", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [update]);
  useEffect(() => {
    
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/panel/product/list-brands", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setTimeout(() => setOptionBrand(result), 200);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [AddDiscount]);
  useEffect(() => {
    
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({category:"62e89544cffae602eb7213a2"}),
    };
    console.log(postOptions);
    fetch(env.siteApi +"/panel/product/list-filter", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setTimeout(() => setOptionBrand(result.filter), 200);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [filters]);
  console.log(Dtable)
  useEffect(()=>{
    setOfferStock('');
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({userId:Dtable}),

      
    };
    fetch(env.siteApi + (RxStock?"/product/list/offersstock":"/product/list/offers"), postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          
          setTimeout(() => setOfferStock(result.offers), 200);
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  },[Dtable,RxStock,SaveD])
  useEffect(()=>{
    if(!filters.discount || filters.discount.length<2) return
    setOfferStock('');
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({type:filters.type,value:filters.discount}),

      
    };
    fetch(env.siteApi + (RxStock?"/panel/user/offerFind":"/panel/user/offerRXFind"), postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          
          setTimeout(() => setContent(result), 200);
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  },[filters])
  // Function to get filters from URL
  function getFiltersFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    const filters = {};
    for (const [key, value] of searchParams.entries()) {
      filters[key] = value;
    }
    return filters;
  }

  function updateUrlWithFilters(newFilters) {
    const searchParams = new URLSearchParams(window.location.search);
    for (const key in newFilters) {
      if (newFilters[key]) {
        searchParams.set(key, newFilters[key]);
      } else {
        searchParams.delete(key); // Remove the parameter if the value is falsy
      }
    }
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }

  // Function to handle filter changes
  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
  }

  const resizeFile = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const updateCustomers = async (event) => {
    const uploadFile = event.target.files[0];
    const tempfile = await resizeFile(uploadFile);
    const token = props.token;
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        base64image: tempfile,
        folderName: "excel",
        imgName: uploadFile.name.split(".")[0],
      }),
    };
    fetch(env.siteApi + "/panel/user/upload", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          //console.log(result)
          if (result.error) {
          } else {
            setUpdate(result.url);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const setOffer=()=>{
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        userId:AddDiscount,
        brandName:Brand,
        discountPercent:DiscountPer+"%"
      }),

      
    };
    console.log(postOptions);
    fetch(env.siteApi + "/product/set/offers", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          
          setTimeout(() => setSaveD(SaveD+1), 200);
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );

  }
  const setOfferS=()=>{
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        userId:AddDiscount,
        brandName:Brand,
        material:Material,
        discountPercent:DiscountPer+"%"
      }),

      
    };
    console.log(postOptions);
    fetch(env.siteApi + "/product/set/stockoffers", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setMaterial('')
          setBrand('')
          setDiscountPer('')
          setTimeout(() => setSaveD(SaveD+1), 200);
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );

  }
  const removeOffer=(OfferId)=>{
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({offerCode:OfferId}),

      
    };
    console.log(postOptions);
    fetch(env.siteApi + (RxStock?"/product/remove/offersstock":"/product/remove/offers"), 
    postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          
          setTimeout(() => setSaveD(SaveD+1), 200);
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );

  }
  const materialOption = OptionBrand.materialList
  return (
    <div className="user discount-page"  style={{ direction: direction }}>
      {AddDiscount?<div className="add-discount">
        <p className="close-discount-btn" onClick={()=>{setAddDiscount(0)}}>&#10006;</p>
        <StyleSelect
          title={tabletrans.brand[lang]}
          class="filterComponent"
          direction={direction}
          action={(e)=>{setBrand(e.enTitle)}}
          options={OptionBrand.filter}
          label="enTitle"
        />
        {RxStock?<StyleSelect
          title={tabletrans.material[lang]}
          class="filterComponent"
          direction={direction}
          action={(e)=>{setMaterial(e)}}
          options={materialOption.optionsP}
          label="value"
        />:<></>}
        <StyleInput
          title={tabletrans.discount[lang]}
          direction={direction}
          action={(e)=>{setDiscountPer(e)}}
        />
        {RxStock?<input className="add-discount-btn"  type="button" value="Stock اعمال تخفیف" onClick={()=>setOfferS()}
            />:
        <input className="add-discount-btn"  type="button" value="RX اعمال تخفیف" onClick={()=>setOffer()}
            />}
      </div>:<></>}

      <div className="od-header">
        <div className="od-header-info">
          <div className="od-header-name">
            <p>{tabletrans.discounts[lang]}</p>
          </div>
          
        </div>
        <div class="search-wrapper">
          <DUserFilters
            lang={props.lang}
            setFilters={handleFilterChange}
            // setFilters={setFilters}
            options={content.access}
            profiles={content.profilesList}
            currentFilters={filters}
            updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop

          />

        </div>
      </div>
      <div class="d-container">
        <div className="list-container discount-user-list">
        
          <div className="user-list">
            <DUserTable
              userList={content}
              lang={props.lang}
              setSelectedUser={() => {}}
              discountUser={setDtable}
              addDiscount={setAddDiscount}
            />
          </div>
          <Paging
            content={content}
            setFilters={setFilters}
            filters={filters}
            lang={props.lang}
            updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
          />
        </div>
        <div className="list-container discount-list">
          {offerStock?<div className="user-list">
            <DTable
              
              lang={props.lang}
              offerStock={offerStock}
              setSelectedUser={() => {}}
              type={RxStock}
              offerid={removeOffer}
            />
          </div>:<>{env.loader}</>}
          <Paging
            content={content}
            setFilters={setFilters}
            filters={filters}
            lang={props.lang}
            updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
          />
        </div>
      </div>
      
    </div>
  );
}
export default Users;
