import { useState } from "react";
import ImageSimple from "../../../components/Button/ImageSimple"
import env from "../../../env";
import tabletrans from "../../../translate/tables"
import { useEffect } from "react";

function BrandImage(props){
    const content = props.content
    const [image,setImage]= useState();
    const [imageUrl,setImageUrl] = useState('')
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify({base64image:image&&image.base64,
                                imgName:image&&image.fileName,
                              folderName:"brand"})
        }//URL.createObjectURL(image)
        //console.log(postOptions)
        image&&fetch(env.siteApi+"/panel/user/upload",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
              console.log(result)
              props.action(result.url)
            },
            (error) => {
                console.log(error);
            }
            )
            .catch((error)=>{
            console.log(error)
            })
  
        },[image])
    
    return( 
        <div className="images">
            <ImageSimple cardName="Input Image" imageGallery={[]} 
                    setImage={setImage} setImageUrl={setImageUrl} part={props.part}/>
            <img src={props.brandChange[props.value]?
              env.siteApiUrl+props.brandChange[props.value]:
                (content?(env.siteApiUrl+content[props.value]):'')} 
                alt={content?content.title:env.default}/>
        </div>
    )
}
export default BrandImage