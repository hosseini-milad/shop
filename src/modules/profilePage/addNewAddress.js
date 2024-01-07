import { useState } from "react";
import env, { siteApi } from "../../env";
import ComboBox from 'react-responsive-combo-box'
import 'react-responsive-combo-box/dist/index.css'

function AddAddress({token,stateList}){
    //var states = [];
    //if(!states.length)
    //    for(var i=0;i<stateList.length;i++)
    //        states.push(stateList.data[i].name)
    //var cityList=[];
    const [city,setCity] = useState();
    const [stateData,setStateData] = useState({"state":'',"stateId":''})
    const [cityData,setCityData] = useState({"city":'',"cityId":''})
    console.log(city)
    const setCityNow=(state_id)=>{
        const body={
            "province_id": state_id
        }
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
            setCity(result.data);
            /*var cityList=[]
            for(var i=0;i<result.data.length;i++)
                cityList.push(result.data[i].name)
            setCity(cityList);
            setCityData({city:result.data[0].name,cityId:result.data[0].id})*/
        },
        (error) => {
          console.log(error);
        }
      );
    }
    //console.log(cityList)
    const addNewAddress= event=>{
        event.preventDefault();
        const body={
            "province_id": stateData.stateId,
            "city_id": cityData.cityId,
            "name": event.target[2].value,
            "mobile":event.target[3].value,
            "address" : event.target[4].value,
            "zip_code":event.target[5].value,
            "mobile_phone":token.mobile
        }
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json',
            "Authorization": "Bearer "+token.token
         },
              body:  JSON.stringify(body)
          }
          console.log(postOptions)
       fetch(siteApi+env.userAddAddress,postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            alert('آدرس اضافه شد.')
          setTimeout(()=>document.location.reload(),500)
        },
        (error) => {
          console.log(error);
        }
    );
    }
    const onChange=()=>{

    }

    return(
    <form style={{flexWrap:"wrap",display:"flex"}}
            onSubmit={addNewAddress}>
            <div className="profileInput">
                <label>استان</label>
                <ComboBox options={stateList.map(item=>item.name)} 
                onSelect={(option)=>{setStateData({state:option,
                stateId:stateList.find(record=>record.name===option).id});
                
                setCityNow(stateList.find(record=>record.name===option).id)}}/>
                
            </div>
            <div className="profileInput">
                <label>شهرستان</label>
                <ComboBox options={city&&city.map(item=>item.name)||[]} enableAutocomplete defaultValue={0||''}
                onSelect={(option)=>{setCityData({city:option,
                    cityId:city&&city.find(record=>record.name===option).id});}}/>
                
            </div>
            <div className="profileInput profileLeft">
                <label>نام تحویل گیرنده</label>
                <input type="input" onChange={onChange}/>
            </div>
            <div className="profileInput profileLeft">
                <label>شماره تماس</label>
                <input type="input" onChange={onChange}/>
            </div>
            <div className="profileInput profileLeft">
                <label>آدرس پستی</label>
                <input type="input" onChange={onChange}/>
            </div>  
            <div className="profileInput profileLeft">
                <label>کدپستی</label>
                <input type="input" onChange={onChange}/>
            </div>  
            <input type="submit" className="buttonHandler offerButton" value="افزودن"/>
          
        </form>
    )
}
export default AddAddress