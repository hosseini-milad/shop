import { useState } from "react";
import tabletrans from "../../translate/tables";
import Status from "../Components/Status";

function VisitorTable(props) {
  const visitor = props.order;
  const visitorId = props.visitorid;
  return (
    <tr onClick={() => visitorId(visitor.id)}>
      <td>
        <div className="cu-avatar" style={{ cursor: "pointer" }}>
          <img src="/img/avatar/avatar_1.jpg" alt="avatar" />
          <div className="cu-name">
            <p className="name">{visitor.username}</p>
          </div>
        </div>
      </td>
      <td></td>
    </tr>
  );
}
export default VisitorTable;
