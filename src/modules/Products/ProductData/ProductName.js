import React, { useRef ,useEffect, useState} from 'react';
import StyleInput from '../../../components/Button/Input';
import tabletrans from '../../../translate/tables';
import ImageSimple from '../../../components/Button/ImageSimple';
import env from '../../../env';
import RichTextEditor from '../../../components/Button/RichTextEditor';
import ProductImportButton from './ProductImport';

function ProductName(props){
    const content =props.content
    
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
                            folderName:"product"})
      }//URL.createObjectURL(image)
      console.log(postOptions)
      image&&fetch(env.siteApi+"/panel/user/upload",postOptions)
          .then(res => res.json())
          .then(
          (result) => {
            props.setProductChange(prevState => ({
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
                            folderName:"product"})
      }//URL.createObjectURL(image)
      //console.log(postOptions)
      thumb&&fetch(env.siteApi+"/panel/user/upload",postOptions)
          .then(res => res.json())
          .then(
          (result) => {
            props.setProductChange(prevState => ({
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
    
      //console.log(props.productChange)
    return(
        <div className="pd-row">
          <div className="row-title">
            <h4>{tabletrans.details[props.lang]}</h4>
            <p>{tabletrans.titleShort[props.lang]}</p>
            <ProductImportButton setProductChange={props.setProductChange}
                  sku={content.sku} setUpdateContent={props.setUpdateContent}
                  setContent={props.setContent} setImage={setImage} setThumb={setThumb}/>
          </div>
          <div className="row-box">
            <div className="details-wrapper">
                <StyleInput title={tabletrans.productName[props.lang]} direction={props.direction}
                 class={"formInput"} defaultValue={content?content.title:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    title:e
                  }))}/>
                <StyleInput title={tabletrans.productenName[props.lang]} direction={props.direction}
                 class={"formInput"} defaultValue={content?content.enTitle:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    enTitle:e
                  }))}/>
                  <StyleInput title={tabletrans.productUrl[props.lang]} direction={props.direction}
                   class={"formInput"} defaultValue={content?content.productUrl:''} 
                   action={(e)=>props.setProductChange(prevState => ({
                      ...prevState,
                      productUrl:e
                    }))}/>
                    <StyleInput title={tabletrans.metaTitle[props.lang]} direction={props.direction}
                   class={"formInput"} defaultValue={content?content.metaTitle:''} 
                   action={(e)=>props.setProductChange(prevState => ({
                      ...prevState,
                      metaTitle:e
                    }))}/>
                
              <div className="contentTextEditor">
                <textarea placeholder={tabletrans.productMeta[props.lang]} 
                defaultValue={content?content.productMeta:''} 
                action={(e)=>props.setProductChange(prevState => ({
                   ...prevState,
                   productMeta:e
                 }))}/>
              </div>
              <div className="contentTextEditor">
                <label for="name">{tabletrans.description[props.lang]}</label>
                <RichTextEditor content={content} value={"description"}
                  setProductChange={props.setProductChange} 
                  action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    description:e
                    }))} height={200}/>
              </div>
              <div className="contentTextEditor">
                <label for="name">{tabletrans.fullDescription[props.lang]}</label>
                <RichTextEditor content={content} value={"fullDesc"}
                  setProductChange={props.setProductChange} 
                  action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    fullDesc:e
                    }))}/>
              </div>
              <hr/>
              <div className="images">
                <h5>{tabletrans.images[props.lang]}</h5>
                <ImageSimple cardName="Input Image" imageGallery={[]} 
                    setImage={setImage} setImageUrl={setImageUrl} part={1}
                    setThumb={setThumb}/>
                <img src={props.productChange.imageUrl?env.siteApiUrl+props.productChange.imageUrl:
                  (content?(env.siteApiUrl+content.imageUrl):'')} 
                  alt={content?content.title:env.default}/>
              </div>
            </div>
          </div>
        </div>
    )
}
export default ProductName