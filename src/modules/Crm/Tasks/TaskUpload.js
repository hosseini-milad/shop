import { useEffect, useState } from "react";
import env from "../../../env";
import ImageSimple from '../../../components/ImageSimple'

function TaskUpload(props){
    const [image,setImage]= useState();
    const [imageUrl,setImageUrl]= useState(props.defaultValue);
    useEffect(() => {
        //console.log("part1")
          const postOptions={
              method:'post',
              headers: {
                  "content-type": "application/json"
                },
              body:JSON.stringify({base64image:image&&image.base64,
                                   imgName:image&&image.fileName,folderName:"task"})
            }//URL.createObjectURL(image)
            //console.log(postOptions)
            image&&fetch(env.siteApi+"/panel/crm/upload",postOptions)
              .then(res => res.json())
              .then(
                (result) => {
                  //console.log(result)
                  props.action(env.siteApiUrl+"/"+ result.url)
                  setImageUrl(env.siteApiUrl+"/"+ result.url)
              },
                (error) => {
                  console.log(error);
                }
              )
              .catch((error)=>{
                console.log(error)
              })
  
          },[image])
    return(<>
    <div className="prob-wrapper image-wrapper">
    <i className="fa-solid fa-upload" style={{color: "#c0c0c0"}}></i>
            
        <div className="file-input">
            <ImageSimple  cardName="Input Image" 
                upTitle={"افزودن فایل"}
                icon={"fa-paperclip"}
                htmlFor="file"
                setImage={setImage} 
                setImageUrl={setImageUrl} part={2}/>
            <input type="file" name="" id="file"/>

        </div></div>
        {imageUrl?<img src={imageUrl} className="imageTask"/>:<></>}
        </>
    )
}
export default TaskUpload