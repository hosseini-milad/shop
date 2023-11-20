import React, { useRef ,useEffect, useState} from 'react';
import Resizer from "react-image-file-resizer";
import env from '../../../env';

function ProductImportButton(props){
    
    const findOldItem=(sku)=>{
      props.setUpdateContent(0)
      const postOptions={
        method:'post',
        headers: {
            "content-type": "application/json"
        },
        body:JSON.stringify({productId:sku})
      }//URL.createObjectURL(image)
      //console.log(postOptions)
      fetch(env.siteApi+"/panel/product/updateProduct",postOptions)
          .then(res => res.json())
          .then(
          (result) => {
            if(result.data)
              setImportData(result)
            props.setUpdateContent(1)
          }
          )
          .catch((error)=>{
          console.log(error)
          })
      }
    const setImportData=async(newData)=>{
      if(!newData) return
      //const newImage = await uploadImage(newData.image_url)
      //const imageUrl = await props.setImage(newImage)
      //console.log(imageUrl)
      const data = newData.data
      const newConvertData ={
        title:  data.title,
        sku: data.sku,
        enTitle:data.ename,
        productUrl:data.product_url,
        description:data.short,
        fullDesc:data.tozihat,

        metaTitle:data.meta_title,
        productMeta:data.meta_disc,

        brandId:data.brand_id,
        catId:data.cat_id,
        
        imageUrl: newData.image,
        thumbUrl: newData.thumb
      }
      props.setContent(newConvertData)
      props.setProductChange(newConvertData)
    }
    return(
        <div className="contentTextEditor">  
          <input type="button" value="Import" 
          onClick={()=>findOldItem(props.sku)}/>
              
        </div>
    )
}
export default ProductImportButton