import { useState } from "react";
import tabletrans from "../../translate/tables";
import PClassUserTableRow from "./PClassUserTableRow";

function PClassUserTable(props) {
  const url = window.location.pathname;
  console.log(url);
  const ProductList = props.ProductList;
  const lang = props.lang.lang;
  const [detail, showDetail] = useState(-1);
  return (
    <table>
      <thead>
        <tr>
          <th className="checkBoxStyle">
            <input type="checkbox" name="" id="" />
          </th>
          <th>
            <p>{tabletrans.productTitle[lang]}</p>
            <i></i>
          </th>
          <th>
            <p>{tabletrans.brand[lang]}</p>
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
        {ProductList ? (
          ProductList.map((classes, i) => (
            <PClassUserTableRow
              url={url}
              detail={detail}
              showDetail={showDetail}
              classes={classes}
              index={i}
              key={i}
              lang={lang}
              deleteProductToClass={props.deleteProductToClass}
            />
          ))
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
}
export default PClassUserTable;
