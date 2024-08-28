import { normalPriceCount } from "../../../env";

function CustomerTableRow(props) {
  const singleUser = props.info;
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{singleUser.sName}</td>
      <td>{singleUser.username}</td>
      <td>{singleUser.mobile ? singleUser.mobile : "-"}</td>
      <td>{singleUser.Address}</td>
    </tr>
  );
}
export default CustomerTableRow;
