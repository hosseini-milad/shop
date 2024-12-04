import { useEffect, useState } from "react";
import env from "../../../env";
import ImageSimple from '../../../components/ImageSimple'
import PicModal from "../../../components/Modal/PicModal";
function TaskUpload(props){
    const [imgPop,setimgPop]=useState("")
    const image =props.image
    const setImage =props.setImage
    const imageUrl =props.imageUrl
    const setImageUrl =props.setImageUrl
    
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
                  // props.action(env.siteApiUrl+"/"+ result.url)
                  setImageUrl([...imageUrl,env.siteApiUrl+"/"+ result.url])
              },
                (error) => {
                  console.log(error);
                }
              )
              .catch((error)=>{
                console.log(error)
              })
  
          },[image])
    console.log(imageUrl)
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
        {imageUrl&&imageUrl.map((img,i)=><div onClick={()=>setimgPop(img)} class="image-box"><img src={img} key={i} className="imageTask"/><p>تصویر ({i+1})</p></div>)}
        {imgPop?<PicModal imgurl={imgPop} close={setimgPop}/>:<></>}
        </>
    )
}
export default TaskUpload