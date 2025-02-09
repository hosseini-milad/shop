import { useState } from "react";
import tabletrans from "../../translate/tables";
import PClassTableRow from "./PClassTableRow";

function PClassTable(props) {
  const type = props.type;
  const url = window.location.pathname;
  const classes = props.classes;
  const lang = props.lang;
  const [detail, showDetail] = useState(-1);
  const variable = url.substring(url.lastIndexOf("/") + 1); // Extract the last word in url after /

  return (
    <table>
      <thead>
        <tr>
          <th className="checkBoxStyle">
            <input type="checkbox" name="" id="" />
          </th>
          <th>
            <p>{tabletrans[variable][lang]}</p>
            <i></i>
          </th>
          
          <th></th>
        </tr>
      </thead>
      <tbody>
        {classes &&
          classes.map((classes, i) => (
            <PClassTableRow
              url={url}
              detail={detail}
              showDetail={showDetail}
              classes={classes}
              index={i}
              key={i}
              lang={lang}
              deleteClass={props.deleteClass}
            />
          ))}
      </tbody>
    </table>
  );
}
export default PClassTable;
