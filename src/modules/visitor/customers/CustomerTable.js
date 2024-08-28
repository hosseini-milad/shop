import { useState } from "react";
import tabletrans from "../../../translate/tables";
import CustomerTableRow from "./CustomerTableRow";
import { sortArray } from "../../../env";

function CustomerTable(props) {
  const users = props.userList;
  const lang = props.lang.lang;
  var sort = "";
  const [detail, showDetail] = useState(-1);
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>
            <p>نام مشتری</p>
          </th>
          <th>
            <p>نام کاربری</p>
          </th>
          <th>
            <p>شماره موبایل</p>
          </th>
          <th>
            <p>آدرس</p>
            <p></p>
          </th>
        </tr>
      </thead>
      <tbody>
        {users?.map((object, i) => (
          <CustomerTableRow info={object} index={i} key={i} lang={lang} />
        ))}
      </tbody>
    </table>
  );
}
export default CustomerTable;
