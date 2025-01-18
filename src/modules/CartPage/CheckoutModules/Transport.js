import { useState } from "react";
import { normalPrice } from "../../../env";
import AddressDetail from "../../profilePage/addressDetail";

function Transport(props) {
  const cart = props.cart;
  const [transportKind, setKind] = useState(0);
  const [Door, setDoor] = useState("");

  const TransUpdate = (field, text) => {
    props.setTransportDetail((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };
  const ResetPay = (PayMetod, type) => {
    setKind(PayMetod);
    props.setTransportDetail("");
    setDoor("");
    TransUpdate("logCode", type);
  };
  console.log(props.transportDetail);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "48%" }}>
        <div
          style={{ display: "flex" }}
          onClick={() => ResetPay(1, "تحویل حضوری")}
        >
          <input type="radio" checked={transportKind === 1 ? true : false} />
          <p>تحویل حضوری</p>
        </div>
        <div
          style={{ display: "flex" }}
          onClick={() => ResetPay(2, "تحویل در محل")}
        >
          <input type="radio" checked={transportKind === 2 ? true : false} />
          <p>تحویل در محل</p>
        </div>
      </div>
      <div style={{ width: "48%" }}>
        {transportKind === 1 ? (
          <div style={{ display: "grid" }}>
            <div
              style={{ display: "flex" }}
              onClick={() => (
                TransUpdate("logAddress", "درب فروشگاه مرکزی"),
                setDoor(1),
                props.setTransportNow()
              )}
            >
              <input
                type="radio"
                checked={Door === 1 ? true : false}
                onChange={() => {}}
              />
              <p>درب فروشگاه مرکزی</p>
            </div>
            <div
              style={{ display: "flex" }}
              onClick={() => (
                TransUpdate("logAddress", "درب شعبه 1"),
                setDoor(2),
                props.setTransportNow()
              )}
            >
              <input
                type="radio"
                checked={Door === 2 ? true : false}
                onChange={() => {}}
              />
              <p>درب شعبه 1</p>
            </div>
            <div
              style={{ display: "flex" }}
              onClick={() => (
                TransUpdate("logAddress", "درب شعبه 2"),
                setDoor(3),
                props.setTransportNow()
              )}
            >
              <input
                type="radio"
                checked={Door === 3 ? true : false}
                onChange={() => {}}
              />
              <p>درب شعبه 2</p>
            </div>
          </div>
        ) : transportKind === 2 ? (
          <AddressDetail
            selectAddress={TransUpdate}
            token={props.token}
            close={() => {}}
            transportDetail={props.transportDetail}
            setTransportNow={props.setTransportNow}
          />
        ) : (
          <></>
        )}
      </div>
      {/*userInfo&&!userInfo.error?<h4 style={{marginBottom:"10px"}}>
          {userInfo.data.first_name + " " + userInfo.data.last_name}</h4>:
  <AccountDetail userInfo={""}/>
        {userAddress&&userAddress.total?<small>{userAddress.data[0].address}</small>:
        <AddressDetail selectAddress={setAddress} token={token}/> }*/}
    </div>
  );
}
export default Transport;
