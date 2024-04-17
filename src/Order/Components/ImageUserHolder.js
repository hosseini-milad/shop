import { useEffect, useState } from "react";
import ImageNewUser from "./ImageNewUser"
import env from "../../env";
function ImageUserHolder(props){
  //console.log(props.imageUrl)
  const [image,setImage]= useState();
  const [image2,setImage2]= useState();
  const [kasb,setKasb]= useState();

  useEffect(() => {
      const postOptions={
          method:'post',
          headers: {
              "content-type": "application/json"
            },
          body:JSON.stringify({base64image:image&&image.base64,
                               imgName:image&&image.fileName,
                               folderName:"users"})
        }//URL.createObjectURL(image)
        //console.log(postOptions)
        image&&fetch(env.siteApi+"/panel/crm/upload",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
              //console.log(result)
              props.setImageUrl(env.siteApiUrl+ result.url)
          },
            (error) => {
              console.log(error);
            }
          )
          .catch((error)=>{
            console.log(error)
          })

  },[image])
  useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
              },
            body:JSON.stringify({base64image:image2&&image2.base64,
                                 imgName:image2&&image2.fileName,
                                 folderName:"users"})
          }//URL.createObjectURL(image)
          //console.log(postOptions)
          image2&&fetch(env.siteApi+"/panel/crm/upload",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                //console.log(result)
                props.setImageUrl2(env.siteApiUrl+result.url)
            },
              (error) => {
                console.log(error);
              }
            )
            .catch((error)=>{
              console.log(error)
            })
  
  },[image2])
  useEffect(() => {
    const postOptions={
        method:'post',
        headers: {
            "content-type": "application/json"
          },
        body:JSON.stringify({base64image:kasb&&kasb.base64,
                             imgName:kasb&&kasb.fileName,
                             folderName:"users"})
      }//URL.createObjectURL(image)
      //console.log(postOptions)
      kasb&&fetch(env.siteApi+"/panel/crm/upload",postOptions)
        .then(res => res.json())
        .then(
          (result) => {
            //console.log(result)
            props.setKasbUrl(env.siteApiUrl+result.url)
        },
          (error) => {
            console.log(error);
          }
        )
        .catch((error)=>{
          console.log(error)
        })

    },[kasb])
    return(<>
      <div className="imageUserField">
        <div className="form-field-image">
          <div className="media-input">
              <p className="uppic">{props.titles[2]}</p>
              {props.kasbUrl?<img className='TarashImage' src={props.kasbUrl} />:
                  kasb?env.loader:<img className='TarashImage' src={"/img/avatar/defaultProduct.png"}/>}
                  <ImageNewUser cardName="Input Image" 
                      setImage={setKasb} setImageUrl={props.setKasbUrl} part={0+props.init}/>
                  
            </div>
        </div>
        <div className="form-field-image">
          <div className="media-input">
              <p className="uppic">{props.titles[0]}</p>
              {props.imageUrl?<img className='TarashImage' src={props.imageUrl} />:
                  image?env.loader:<img className='TarashImage' src={"/img/avatar/defaultProduct.png"}/>}
                  <ImageNewUser cardName="Input Image" 
                      setImage={setImage} setImageUrl={props.setImageUrl} part={1+props.init}/>
                  
            </div>
        </div>
        <div className="form-field-image">
          <div className="media-input">
              <p className="uppic">{props.titles[1]}</p>
              {props.imageUrl2?<img className='TarashImage' src={props.imageUrl2} />:
                  image2?env.loader:<img className='TarashImage' src={"/img/avatar/defaultProduct.png"}/>}
                  <ImageNewUser cardName="Input Image" 
                      setImage={setImage2} setImageUrl={props.setImageUrl2} part={2+props.init}/>
                  
            </div>
        </div>
        </div>
      </>
    )
}
export default ImageUserHolder