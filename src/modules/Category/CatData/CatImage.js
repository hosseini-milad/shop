import { useEffect, useState } from "react";
import env from "../../../env";
import tabletrans from "../../../translate/tables"
import ImageSimple from "../../../components/Button/ImageSimple";

function CatImage(props){
    const content = props.content
    const [icon,setIcon]= useState();
    const [image,setImage]= useState();
    const [thumb,setThumb]= useState();
    const [imageUrl,setImageUrl] = useState('')
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify({base64image:image&&image.base64,
                                imgName:image&&image.fileName,
                              folderName:"category"})
        }//URL.createObjectURL(image)
        //console.log(postOptions)
        image&&fetch(env.siteApi+"/panel/user/upload",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
              console.log(result)
              props.setCatChange(prevState => ({
                ...prevState,
                imageUrl:result.url
              }))
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
            body:JSON.stringify({base64image:thumb&&thumb.base64,
                                imgName:thumb&&thumb.fileName,
                                folderName:"category"})
        }//URL.createObjectURL(image)
        //console.log(postOptions)
        thumb&&fetch(env.siteApi+"/panel/user/upload",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                props.setCatChange(prevState => ({
                ...prevState,
                thumbUrl:result.url
                }))
            },
            (error) => {
                console.log(error);
            }
            )
            .catch((error)=>{
            console.log(error)
            })
    
        },[thumb])
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify({base64image:icon&&icon.base64,
                                imgName:icon&&icon.fileName,
                                folderName:"category"})
        }//URL.createObjectURL(image)
        //console.log(postOptions)
        icon&&fetch(env.siteApi+"/panel/user/upload",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                console.log(result)
                props.setCatChange(prevState => ({
                ...prevState,
                iconUrl:result.url
                }))
            },
            (error) => {
                console.log(error);
            }
            )
            .catch((error)=>{
            console.log(error)
            })
    
        },[icon])
    return( <div className="imageHandler">
        <div className="images">
            <ImageSimple cardName="Input Image" imageGallery={[]} 
                    setImage={setImage} setImageUrl={setImageUrl} 
                    setThumb={setThumb} part={props.part} resize={true}/>
            <img src={props.catChange[props.value]?
              env.siteApiUrl+props.catChange[props.value]:
                (content?(env.siteApiUrl+content[props.value]):'')} 
                alt={content?content.title:env.default}/>
        </div>
        <div className="images">
            <ImageSimple cardName="Icon Image" imageGallery={[]} 
                    setImage={setIcon} setImageUrl={setImageUrl} 
                    part={"5"} resize={false}/>
            
        </div>
        </div>
    )
}
export default CatImage