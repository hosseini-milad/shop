import { useState } from "react";
import StyleInput from "../../../components/Button/Input";
import env from "../../../env";
import formtrans from "../../../translate/forms";
import CustomerAvatar from "../CustomerComponent/CustomerAvatar";
import ErrorShow from "../../../components/Button/ErrorShow";
import ErrorAction from "../../../components/Modal/ErrorAction";
import ImageSimple from "../../../components/Button/ImageSimple";
import CustomerImages from "./CustomerImages";
import StyleDatePicker from "../../../components/Button/DatePicker";
import StyleDatePickerSingle from "../../../components/Button/DatePickerSingle";

function CustomerGeneral(props) {
  const token = props.token;
  const [def, setDef] = useState();
  const [data, setData] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [kasbUrl, setKasbUrl] = useState("");

  const [shopUrl1, setShopUrl1] = useState("");
  const [shopUrl2, setShopUrl2] = useState("");
  const [shopUrl3, setShopUrl3] = useState("");

  const userData = props.userData;
  const [formData, setFormData] = useState();
  const [error, setError] = useState({ errorText: "", errorColor: "brown" });
  const [formalShow, setFormal] = useState(0);
  const saveChanges = (navigateBack) => {
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userData._id,
        shopUrl1: shopUrl1,
        shopUrl2: shopUrl2,
        shopUrl3: shopUrl3,
        imageUrl1: imageUrl,
        imageUrl2: imageUrl2,
        kasbUrl: kasbUrl,
        ...formData,
      }),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/panel/user/update-customer", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setError({ errorText: result.success, errorColor: "green" });
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              3000
            );
            if (navigateBack) {
              setTimeout(() => {
                window.history.back();
              }, 2000);
            }
          } else console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const formalCustomer = (e) => {
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userData,
      }),
    };
    //console.log(postOptions)
    fetch(env.siteApi + "/panel/user/formal-customer", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.result) {
            setError({ errorText: result.message, errorColor: "green" });
            setTimeout(() => window.location.reload(), 3000);
          } else console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  if (!userData) return <div className="general-page">{env.loader}</div>;
  else
    return (
      <div className="general-page">
        {/* <CustomerAvatar /> */}
        <div className="info-box">
          <div className="info-wrapper">
            <StyleInput
              title={formtrans.clothSize[props.lang]}
              direction={props.direction}
              defaultValue={userData.clothSize}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  clothSize: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.workTime[props.lang]}
              direction={props.direction}
              defaultValue={userData.workTime}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  workTime: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.senfiCode[props.lang]}
              direction={props.direction}
              defaultValue={userData.senfiCode}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  senfiCode: e,
                }))
              }
            />

            <StyleInput
              title={formtrans.birthDay[props.lang]}
              direction={props.direction}
              defaultValue={userData.birthDay}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  birthDay: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.roleId[props.lang]}
              direction={props.direction}
              defaultValue={userData.roleId}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  roleId: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.zone[props.lang]}
              direction={props.direction}
              defaultValue={userData.zone}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zone: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.nif[props.lang]}
              direction={props.direction}
              defaultValue={userData.nif}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  nif: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.userRelatedContacts[props.lang]}
              direction={props.direction}
              defaultValue={userData.contractCall}
              class={"formInput"}
              fullWidth
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  contractCall: e,
                }))
              }
            />

            {/* <StyleInput title={formtrans.StockId[props.lang]} direction={props.direction} 
                defaultValue={userData.StockId} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  StockId:e
                }))}/> */}

            {/* <div className="images">
                <h5>{tabletrans.images[props.lang]}</h5>
                <ImageSimple cardName="Input Image" imageGallery={[]} 
                    setImage={setImage} setImageUrl={setImageUrl} part={1}
                    setThumb={setThumb}/>
                <img src={props.productChange.imageUrl?env.siteApiUrl+props.productChange.imageUrl:
                  (content?(env.siteApiUrl+content.imageUrl):'')} 
                  alt={content?content.title:env.default}/>
              </div> */}

            <section className="admin-table-sec ">
              {userData ? (
                <CustomerImages
                  setFormData={setFormData}
                  def={userData}
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  imageUrl2={imageUrl2}
                  setImageUrl2={setImageUrl2}
                  kasbUrl={kasbUrl}
                  setKasbUrl={setKasbUrl}
                  shopUrl1={shopUrl1}
                  setShopUrl1={setShopUrl1}
                  shopUrl2={shopUrl2}
                  setShopUrl2={setShopUrl2}
                  shopUrl3={shopUrl3}
                  setShopUrl3={setShopUrl3}
                />
              ) : (
                <></>
              )}
            </section>
          </div>
          {userData.agent ? (
            <div
              className="delete-user-btn formal-btn"
              onClick={() => setFormal(1)}
            >
              رسمی کردن مشتری
            </div>
          ) : (
            <div
              className="delete-user-btn formal-btn"
              onClick={() => setFormal(1)}
            >
              غیر رسمی کردن
            </div>
            )}
          <ErrorShow message={error.errorText} color={error.errorColor} />
          {formalShow ? (
            <ErrorAction
              title="رسمی کردن مشتری"
              color="darkslateblue"
              text="مشتری بعد از ثبت در سپیدار، به عنوان مشتری رسمی در خواهد آمد."
              close={() => setFormal(0)}
              buttonText="تایید"
              action={(e) => formalCustomer(e)}
            />
          ) : (
            <></>
          )}
          <div className="create-btn-wrapper">
            <div className="save-btn" onClick={() => saveChanges(false)}>
              {formtrans.saveChanges[props.lang]}
            </div>
            <div
              className="save-btn"
              style={{ marginLeft: 10 + "em" }}
              onClick={() => saveChanges(true)}
            >
              {formtrans.saveAndClose[props.lang]}
            </div>
          </div>
        </div>
      </div>
    );
}
export default CustomerGeneral;
