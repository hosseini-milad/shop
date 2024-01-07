import { useEffect, useState } from "react"
import ComboBox from 'react-responsive-combo-box'
import env, { siteApi } from "../../env"
import AddAddress from "./addNewAddress";
const token = JSON.parse(localStorage.getItem('token-oil'));

function AddressDetail(props){
    const selectAddress = props.selectAddress;
    const [newAddress,setNewAddress] = useState(0);
    const [addressTab,setAddressTab] = useState(-1)
    const [data,setData] = useState();
    const [selectedCity,SelectCity]= useState('')
    useEffect(()=>{
      const postOptions={
        method:'post',
        headers: { 'Content-Type': 'application/json' ,
        "Authorization": "Bearer "+(token&&token.token)}
      }
      const getOptions={
        method:'get',
        headers: { 'Content-Type': 'application/json' ,
        "Authorization": "Bearer "+(token&&token.token)}
      }
      fetch(siteApi+env.userAddApi,getOptions)
        .then(res => res.json())
        .then(
        (result) => {
            setData(previousState => {
                return { ...previousState, userAddress: result }
              });
        },
        (error) => {
          console.log(error);
        })
        
        fetch(siteApi+env.stateListApi,postOptions)
        .then(res => res.json())
        .then(
        (result) => {
            setData(previousState => {
                return { ...previousState, 
                  stateList: result.data.map(item=>({name:item.name,id:item.id}))}
              });
        })
        //console.log(data)
    },[])
    //console.log(selectedCity)
    //const userAddress= SimpleAuth(siteApi+env.userAddApi);
    //const stateList = SimpleAuth(siteApi+env.stateListApi,"post")
    //console.log(data)
    //const [stateData,setStateData] = useState({"state":'',"stateId":''})
    const handleSubmit= event =>{
        event.preventDefault();
        console.log(event);
        var body='';var cityTemp=''
        try{ 
          cityTemp = data.cityList&&
          {"city_id": data.cityList.find(record=>record.name===event.target[2].value).id}
          body={
            "province_id": data.stateList.find(record=>record.name===event.target[1].value).id,
            "name": event.target[3].value,
            "mobile":event.target[4].value,
            "zip_code":event.target[5].value,
            "address" : event.target[6].value,
        }
      }catch{alert('اطلاعات ورودی اشتباه است');}
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json',
            "Authorization": "Bearer "+token.token
         },
              body:  JSON.stringify({...body,...cityTemp})
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
    return(<><h2>آدرس های من</h2>
        
        {data&&data.userAddress&&data.userAddress.data.map((address,i)=>(
        <div key={i} >
            <div className="profileTitle">
                <strong > - {address.address}<a className="addressDetail" 
                  onClick={()=>setAddressTab(i)}>مشاهده جزئیات</a></strong>
                {selectAddress?<input type="button" value={"انتخاب"} className="offerButton addButton"
                onClick={()=>{selectAddress(address);props.close()}}/>:''}
            </div>
          <form className="profileForm" style={{display:addressTab===i?"flex":"none"}} onSubmit={handleSubmit}>
            <input type="hidden" value={address.id}/>
            <div className="profileInput">
                <label>استان</label>
                <ComboBox options={data.stateList&&data.stateList.map(item=>item.name)||[]} 
                
                defaultValue={address.get_province.name}
                onSelect={(event) => onStateChange(event)}/>
                
            </div>
            <div className="profileInput">
                <label>شهرستان</label>
                <ComboBox options={data.cityList&&data.cityList.map(item=>item.name)||[]} 
                
                defaultValue={address.get_city.name}
                onSelect={(e)=>{SelectCity(e)}}/>
                
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
        
        <input type="button" value="+افزودن آدرس" style={{marginBottom: "20px"}} 
            onClick={()=>setNewAddress('flex')} />
        {newAddress?<AddAddress token={token} stateList={data.stateList}/>:''}
    </>)

}
export default AddressDetail