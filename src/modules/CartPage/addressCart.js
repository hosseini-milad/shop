import { useEffect, useState } from 'react';
import ComboBox from 'react-responsive-combo-box'
import env, { siteApi } from '../../env';
const token= JSON.parse(localStorage.getItem('token-oil'));
function AddressCart(props){
    const [data,setData] = useState()
    const [address,setAddress]= useState()
    const [citySelect,SelectCity]= useState('')
    useEffect(()=>{
        const postOptions={
          method:'post',
          headers: { 'Content-Type': 'application/json' ,
          "Authorization": "Bearer "+(token&&token.token)},
          body:props.address&&JSON.stringify({address_id:props.address.id})
        }
        console.log(props.address.id)
        fetch(siteApi+env.cartAddress  ,postOptions) 
        .then(res => res.json())
        .then(
        (result) => {
          console.log("update")
        }
        )
        fetch(siteApi+env.stateListApi,postOptions)
        .then(res => res.json())
        .then(
        (result) => {
            setData(previousState => {
                return { ...previousState, 
                stateList: result.data.map(item=>({name:item.name,id:item.id}))}
            });
        })
        const getOptions={
          method:'GET',
          headers: { 'Content-Type': 'application/json',
          "Authorization": "Bearer "+token.token
          },
        }
        fetch(siteApi+env.cartTransport,getOptions)
        .then(res => res.json())
        .then(
          (result) => {
            props.setTransport(result.data.transportation[0].payload)
          },
          (error) => {
            console.log(error);
          }
        );
        setAddress(props.address)
      },[])
    const onStateChange=(e)=>{
        SelectCity('')
        setData(previousState => {
          return { ...previousState, cityList: [] }
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
    const editAddress=()=>{
        const body={
            "city_id": address.city_id,
            "province_id": address.province_id,
            "name": address.name,
            "mobile":address.mobile,
            "zip_code":address.zip_code,
            "address":address.address
        }
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json',
            "Authorization": "Bearer "+token.token
         },
              body:  JSON.stringify(body)
          }
          console.log(postOptions)
       fetch(siteApi+env.userEditAddress+address.id,postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            alert('آدرس به روز شد.')
          window.location.reload();
        },
        (error) => {
          console.log(error);
        })
      }
    //console.log(transport)
    if(address)
        return(<div className='addressCart'>
        <div className="cityState">
            {data&&<><div className="profileInput">
                <label>استان</label>
                <ComboBox options={data.stateList.map(item=>item.name)||[]}//data.stateList&&data.stateList.map(item=>item.name)||[]} 
                
                defaultValue={address.get_province.name}
                onSelect={(event) => {onStateChange(event);
                    setAddress(previousState => {
                        return { ...previousState, 
                            province_id: data.stateList.find(item=>item.name===event).id
                      }})
                }}
                />    
            </div>
            <div className="profileInput">
                <label>شهرستان</label>
                <ComboBox options={data.cityList&&data.cityList.map(item=>item.name)||[]} 
                
                defaultValue={address.get_city.name}
                onSelect={(event)=>{SelectCity(event);
                    setAddress(previousState => {
                        return { ...previousState, 
                            city_id: data.cityList.find(item=>item.name===event).id
                      }})
                    }}
                />
                
            </div></>}
        </div>
        <div className='addressPart'>
            <div className="profileInput">
                <label>آدرس پستی</label>
                
                <textarea name="Text1" cols="40" rows="3" style={{width:"90%"}}
                    defaultValue={address.address} 
                    onChange={(e)=>setAddress(previousState => {
                        return { ...previousState, 
                            address: e.target.value
                      }})}></textarea>
            </div>
            <div className="profileInput">
                <label>کدپستی</label>
                <input type="text" defaultValue={address.zip_code}
                onChange={(e)=>setAddress(previousState => {
                    return { ...previousState, 
                        zip_code: e.target.value
                  }})}/>
            </div>
            <div className="profileInput">
                <label>تحویل گیرنده</label>
                <input type="text"  defaultValue={address.name}
                onChange={(e)=>setAddress(previousState => {
                    return { ...previousState, 
                        name: e.target.value
                  }})}/>
            </div>
            <div className="profileInput">
                <label>شماره تماس</label>
                <input type="text" defaultValue={address.mobile}
                onChange={(e)=>setAddress(previousState => {
                    return { ...previousState, 
                        mobile: e.target.value
                  }})}/>
            </div>
            <div className="modal-sub-btn" style={{width:"46%",
              margin:"0 0 20px",backgroundColor:"var(--main-color)"}}
            onClick={editAddress}>
                ویرایش
            </div>
        </div>
        </div>
        )
        else
            return(<main>لطفا صبر کنید</main>)
        
}
export default AddressCart