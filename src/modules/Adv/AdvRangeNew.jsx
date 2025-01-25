import { useEffect, useState } from "react";
import StyleSelect from "../../components/Button/AutoComplete";
import ImageSimple from "../../components/Button/ImageSimple";
import StyleInput from "../../components/Button/Input";
import env, { parseDesc } from "../../env";
import tabletrans from "../../translate/tables";
import RangeImage from "./AdvRangeImage";

function AdvRangeNew(props) {
  const content = props.content;
  const [image, setImage] = useState();
  const [thumb, setThumb] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [loading, setLoading] = useState(0);

  const [text, setText] = useState("");
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
    console.log(postOptions);
    image &&
      fetch(env.siteApi + "/panel/product/upload", postOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            setImageUrl(result.url);
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
      fetch(env.siteApi + "/panel/product/upload", postOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            setThumbUrl(result.url);
          },
          (error) => {
            console.log(error);
          }
        )
        .catch((error) => {
          console.log(error);
        });
  }, [thumb]);
  const addArray = () => {
    if (!thumbUrl) return;
    setLoading(1);
    const index = props.rangeArray.length;
    props.setRangeArray((existingItems) => {
      return [
        ...existingItems.slice(0, index),
        { title: text, thumb: thumbUrl, image: imageUrl },
        ...existingItems.slice(index + 1),
      ];
    });
    setThumbUrl("");
    setTimeout(() => setLoading(0), 1000);
  };
  if (loading) {
    <div className="rangeHolder">{env.loader}</div>;
  } else
    return (
      <div className="rangeHolder">
        {thumbUrl ? (
          <div className="rangeImage">
            <img
              src={env.siteApiUrl + thumbUrl}
              onClick={() => setThumbUrl("")}
            />
          </div>
        ) : (
          <div className="rangeUpload">
            <RangeImage
              cardName="Input Image"
              imageGallery={[]}
              setImage={setImage}
              setImageUrl={setImageUrl}
              part={5}
              setThumb={setThumb}
            />
          </div>
        )}
        <div className="rangeText">
          <StyleInput
            title={"title"}
            direction={props.direction}
            class={"formInput"}
            defaultValue={content ? content.itemText : ""}
            action={(e) => setText(e)}
          />
        </div>
        <div className="rangeAdd">
          <i className="fa fa-plus" onClick={addArray}></i>
        </div>
      </div>
    );
}
export default AdvRangeNew;
