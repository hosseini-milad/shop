import { useState } from "react";
import OrderTableRow from "./OrderTableRow";
import tabletrans from "../../translate/tables";
import OrderMultiReg from "./OrderComponent/OrderMultiReg";
import OrderMultiDone from "./OrderComponent/OrderMultiDone";
import env, { normalPriceCalc, normalPriceCount } from "../../env";
import { normalArrayCount } from "../../env";
function OrderTable(props) {
  const data = props.data;
  const orders = props.orders;
  const lang = props.lang;
  const token = props.token;
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [detail, showDetail] = useState(-1);
  const [AllCheck, setAllCheck] = useState(0);
  const [DisableAll, setDisableAll] = useState(1);
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
  const CheckHandel = (e) => {
    setAllCheck(e.target.checked ? 1 : 0);
    if (props.tab == 0) {
      var OrderList = props.orders.filter((item) => item.status == "done");
      return setSelectedOrder(OrderList);
    }
    var OrderList = props.orders.filter(
      (item) => item.status == "undone" && !item.isOfficial
    );
    if (e.target.checked) {
      setSelectedOrder(OrderList);
    } else {
      setSelectedOrder([]);
      setDisableAll(1);
      ClearBank();
      console.log("here");
    }
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
  console.log(selectedOrder);
  if (!orders || !orders.length) return <main>waiting</main>;
  else
    return (
      <>
        <button className="BtnToBot" onClick={scrollToBottom}>
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </button>
        {selectedOrder ? (
          <div className="total-top">
            <span>جمع سفارشات انتخابی:</span>
            <span>{normalPriceCount(totalPrice)}</span>
          </div>
        ) : (
          <></>
        )}
        <table>
          <thead>
            <tr>
              <th>ردیف</th>
              <th className="checkBoxStyle">
                <input
                  type="checkbox"
                  checked={AllCheck}
                  onChange={(e) => {}}
                  onClick={(e) => CheckHandel(e)}
                />
              </th>
              <th>
                <p>{tabletrans.orderNumber[lang]}</p>
                <i></i>
              </th>
              <th>
                <p>{tabletrans.customerInfo[lang]}</p>
                <i></i>
              </th>
              <th>
                <p>{tabletrans.phoneNumber[lang]}</p>
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
            </tr>
          </thead>
          <tbody>
            {orders
              ? orders.map((order, i) => (
                  <OrderTableRow
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
                  />
                ))
              : ""}
          </tbody>
        </table>
        {props.isSale ? (
          <OrderMultiReg
            TransRemain={props.TransRemain}
            setTransRemain={props.setTransRemain}
            data={data}
            TransData={props.TransData}
            setTransData={props.setTransData}
            bankList={props.bankList}
            orders={selectedOrder}
            token={props.token}
            setErrorPop={props.setErrorPop}
            errorPop={props.errorPop}
            setTtp={setTtp}
            Ttp={Ttp}
          />
        ) : (
          <OrderMultiDone orders={selectedOrder} token={props.token} />
        )}
      </>
    );
}
export default OrderTable;
