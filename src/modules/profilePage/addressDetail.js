import { useEffect, useState } from "react"
import ComboBox from 'react-responsive-combo-box'
import env, { siteApi } from "../../env"
import AddAddress from "./addNewAddress";
const token = JSON.parse(localStorage.getItem('token-oil'));

function AddressDetail(props){
    const selectAddress = props.selectAddress;
    const token = props.token
    const [newAddress,setNewAddress] = useState(0);
    const [addressTab,setAddressTab] = useState(-1)
    const [data,setData] = useState();
    const [address,setAddress] = useState();
    const [selectedCity,SelectCity]= useState('')
    useEffect(()=>{
      const postOptions={
        method:'post',
        headers: { 'Content-Type': 'application/json' ,
        "x-access-token":token.token,"userId":token.userId}
      }
      fetch(siteApi+"/auth/list-address",postOptions)
        .then(res => res.json())
        .then(
        (result) => {
          if(result.data&&result.data.length)
            setAddress(result.data);
        },
        (error) => {
          console.log(error);
        })
        
    },[])
    //const userAddress= SimpleAuth(siteApi+env.userAddApi);
    //const stateList = SimpleAuth(siteApi+env.stateListApi,"post")
    //console.log(data)
    //const [stateData,setStateData] = useState({"state":'',"stateId":''})
    const handleSubmit= event =>{
        event.preventDefault();
        console.log(event);
        var body={
            "province": event.target[1].value,
            "city": event.target[2].value,
            "name": event.target[3].value,
            "mobile":event.target[4].value,
            "zip_code":event.target[5].value,
            "address" : event.target[6].value,
        }
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json',
            "Authorization": "Bearer "+token.token
         },
              body:  JSON.stringify(body)
          }
          console.log(postOptions)
       body&&fetch(siteApi+env.userEditAddress+event.target[0].value,postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            alert('آدرس به روز شد.')
          //window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
      
    }
    const onChange=()=>{}
    const onStateChange=(e)=>{
      SelectCity('')
      setData(previousState => {
        return { ...previousState, cityList: '' }
      });
      const body={"province_id": data.stateList.find(record=>record.name===e).id}
      const postOptions={
        method:'post',
        headers: { 'Content-Type': 'application/json',
        "Authorization": "Bearer "+token.token
        },
        body:  JSON.stringify(body)
      }
      
      fetch(siteApi+env.cityListApi,postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setData(previousState => {
            return { ...previousState, cityList: result.data }
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
    
    const removeAddress=(address_id)=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json',
            "Authorization": "Bearer "+token.token
         },
              body:  JSON.stringify({address_id:address_id})
          }
       fetch(siteApi+env.userRemoveAddress,postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            alert('آدرس حذف شد.')
          setTimeout(()=>document.location.reload(),500)
        },
        (error) => {
          console.log(error);
        }
      );
    }
    return(<>
        
        {address&&address.map((address,i)=>(
        <div key={i} >
            <div className="profileTitle">
                <strong > - {address.name}<a className="addressDetail" 
                  onClick={()=>setAddressTab(i)}>مشاهده جزئیات</a></strong>
                {selectAddress?<input type="button" value={"انتخاب"} className="offerButton addButton"
                onClick={()=>{selectAddress(address);props.close()}}/>:''}
            </div>
          <form className="profileForm" style={{display:addressTab===i?"flex":"none"}} onSubmit={handleSubmit}>
            <input type="hidden" value={address.id}/>
            <div className="profileInput">
              <label>استان</label>
                <input type="input" onChange={onChange}
                   defaultValue={address.province}/>
            </div>
            <div className="profileInput">
              <label>شهرستان</label>
                <input type="input" onChange={onChange}
                   defaultValue={address.city}/>
                
            </div>
            <div className="profileInput profileLeft">
                <label>نام تحویل گیرنده</label>
                <input type="input" onChange={onChange}
                   defaultValue={address.name}/>
            </div>
            <div className="profileInput profileLeft">
                <label>شماره تماس</label>
                <input type="input" onChange={onChange}
                   defaultValue={address.mobile}/>
            </div>
            <div className="profileInput profileLeft">
                <label>کدپستی</label>
                <input type="input" onChange={onChange}
                   defaultValue={address.zip_code}/>
            </div>
            <div className="profileInput profileLeft">
                <label>آدرس پستی</label>
                <input type="input" onChange={onChange}
                   defaultValue={address.address}/>
            </div>
            <input type="submit" className="offerButton" value="ویرایش"/>
            <input type="button" className="offerButton removeButton" value="حذف"
            onClick={()=>removeAddress(address.id)}/>
        </form></div>))}
        <hr/>
        
        {!address?<input type="button" value="+افزودن آدرس" style={{marginBottom: "20px"}} 
            onClick={()=>setNewAddress('flex')}/> :<></>}
        {newAddress?<AddAddress token={token}/>:''}
    </>)

}
export default AddressDetail