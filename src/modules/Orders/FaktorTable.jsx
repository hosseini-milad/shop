import { useState } from "react";
import FaktorTabelRow from "./FaktorTableRow";
import tabletrans from "../../translate/tables";
import OrderMultiReg from "./OrderComponent/OrderMultiReg";
import OrderMultiDone from "./OrderComponent/OrderMultiDone";
import env, { normalPriceCalc, normalPriceCount } from "../../env";
import { normalArrayCount } from "../../env";
import BankModal from "../../components/Modal/BankModal";
function FaktorTabel(props) {
  const data = props.data;
  const orders = props.orders;
  const lang = props.lang;
  const token = props.token;
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [detail, showDetail] = useState(-1);
  const [AllCheck, setAllCheck] = useState(0);
  const [DisableAll, setDisableAll] = useState(1);
  const [BankPop, setBankPop] = useState();
  const [Ttp, setTtp] = useState("");
  console.log(Ttp);
  const totalPrice = normalArrayCount(
    selectedOrder &&
      selectedOrder.map((item) => item.totalCart && item.totalCart.totalPrice)
  );
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  const ClearBank = () => {
    const postOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
    };
    fetch(env.siteApi + "/setting/clear-bank-of-cart", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  if (!orders || !orders.length) return <main>waiting</main>;
  else
    return (
      <>
        <button className="BtnToBot" onClick={scrollToBottom}>
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </button>
        {Ttp ? (
          <div className="total-top">
            <span>جمع سفارشات انتخابی:</span>
            <span>{normalPriceCount(Ttp)}</span>
          </div>
        ) : (
          <></>
        )}
        <table>
          <thead>
            <tr>
              <th>ردیف</th>

              <th>
                <p>{tabletrans.orderNumber[lang]}</p>
                <i></i>
              </th>
              <th>
                <p>{tabletrans.customerInfo[lang]}</p>
                <i></i>
              </th>

              <th>
                <p>{tabletrans.date[lang]}</p>
                <i></i>
              </th>

              <th>
                <p>{tabletrans.price[lang]}</p>
                <i></i>
              </th>
              <th>
                <p>{tabletrans.status[lang]}</p>
                <i></i>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders
              ? orders.map((order, i) => (
                  <FaktorTabelRow
                    tab={props.tab}
                    setDisableAll={setDisableAll}
                    DisableAll={DisableAll}
                    detail={detail}
                    showDetail={showDetail}
                    cart={props.cart}
                    setSelectedOrder={setSelectedOrder}
                    selectedOrder={selectedOrder}
                    data={data}
                    order={order}
                    index={i}
                    key={i}
                    lang={lang}
                    allcheck={AllCheck}
                    token={props.token}
                    ClearBank={ClearBank}
                    setBankPop={setBankPop}
                  />
                ))
              : ""}
          </tbody>
        </table>
        {BankPop ? (
          <BankModal setBankPop={setBankPop} BankPop={BankPop} token={token} />
        ) : (
          <></>
        )}
      </>
    );
}
export default FaktorTabel;
