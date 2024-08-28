import { useState } from "react";
import tabletrans from "../../translate/tables";
import OrderTableRow from "./OrderTableRow";
import { sortArray } from "../../env";

function OrderTable(props) {
  const orderList = props.content.data;
  const lang = props.lang.lang;
  var sort = "";
  const [detail, showDetail] = useState(-1);
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>
            <p>{tabletrans.productCode[lang]}</p>
          </th>
          <th>
            <p>{tabletrans.productName[lang]}</p>
          </th>
          <th>
            <p>{tabletrans.brand[lang]}</p>
          </th>
          <th>
            <p>{tabletrans.quantity[lang]}</p>
            <p></p>
          </th>
          <th>
            <p>{tabletrans.pricing[lang]}</p>
            <p></p>
          </th>
        </tr>
      </thead>
      <tbody>
        {orderList
          ? sortArray(orderList).map((object, i) => (
              <OrderTableRow order={object} index={i} key={i} lang={lang} />
            ))
          : ""}
      </tbody>
    </table>
  );
}
export default OrderTable;
