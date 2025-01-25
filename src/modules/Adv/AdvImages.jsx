import React, { useRef, useEffect, useState } from "react";
import StyleInput from "../../components/Button/Input";
import tabletrans from "../../translate/tables";
import ImageSimple from "../../components/Button/ImageSimple";
import env from "../../env";
import RichTextEditor from "../../components/Button/RichTextEditor";
import AdvRange from "./AdvRange";
function AdvImages(props) {
  const content = props.content ? props.content.filter : "";
  const rangeArray = props.rangeArray;
  const setRangeArray = props.setRangeArray;
  const [image, setImage] = useState();
  const [thumb, setThumb] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [EmptyImg, setEmptyImg] = useState(0);
  useEffect(() => {
    const postOptions = {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        base64image: image && image.base64,
        imgName: image && image.fileName,
        folderName: "product",
      }),
    }; //URL.createObjectURL(image)
    //console.log(postOptions)
    image &&
      fetch(env.siteApi + "/panel/user/upload", postOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            props.setProductChange((prevState) => ({
              ...prevState,
              imageUrl: result.url,
            }));
          },
          (error) => {
            console.log(error);
          }
        )
        .catch((error) => {
          console.log(error);
        });
  }, [image]);
  useEffect(() => {
    const postOptions = {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        base64image: thumb && thumb.base64,
        imgName: thumb && thumb.fileName,
        folderName: "product",
      }),
    }; //URL.createObjectURL(image)
    //console.log(postOptions)
    thumb &&
      fetch(env.siteApi + "/panel/user/upload", postOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            props.setProductChange((prevState) => ({
              ...prevState,
              thumbUrl: result.url,
            }));
          },
          (error) => {
            console.log(error);
          }
        )
        .catch((error) => {
          console.log(error);
        });
  }, [thumb]);

  //console.log(props.productChange)
  return (
    <div className="pd-row">
      <div className="row-title">
        <h4>{tabletrans.Advdetails[props.lang]}</h4>
        <p>{tabletrans.titleShort[props.lang]}</p>
      </div>
      <div className="row-box">
        <div className="details-wrapper">
          <AdvRange
            direction={props.direction}
            lang={props.lang}
            rangeArray={rangeArray}
            setRangeArray={setRangeArray}
          />{" "}
        </div>
      </div>
    </div>
  );
}
export default AdvImages;
