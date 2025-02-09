import StyleSelect from "../../../components/Button/AutoComplete";
import env from "../../../env";
import StyleInput from "../../../components/Button/Input";
import { parseDesc } from "../../../env";
import tabletrans from "../../../translate/tables";
import { useEffect, useState } from "react";
function ProductGroupeSelect(props) {
  const content = props.content;
  const def = content ? content.filter : "";
  const brand = content && content.brandList;
  const category = content && content.categoryList;
  const filterList = content && content.filterList;
  const [Groups, setGroups] = useState("");
  const [Classes, setClasses] = useState("");
  const fetchGroupes = () => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/panel/user/sale-policy-groups", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);

          setGroups(result.salePolicyGroups);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const fetchClasses = () => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/panel/product/sale-commission-groups", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);

          setClasses(result.saleCommissionGroups);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  useEffect(() => {
    fetchGroupes();
    fetchClasses();
  }, []);

  return (
    <div className="pd-row">
      <div className="row-title">
        <h4>{tabletrans.groupes[props.lang]}</h4>
        <p>{tabletrans.groupeDetail[props.lang]}</p>
      </div>
      <div className="row-box">
        <div className="probs-wrapper">
          <div className="input-wrapper">
            <StyleSelect
              title={tabletrans.productgroupe[props.lang]}
              direction={props.direction}
              class={"formInput halfWidth"}
              defaultValue={content && content.salePolicyGroupId}
              options={Groups ? Groups : []}
              label={"name"}
              action={(e) =>
                props.setProductChange((prevState) => ({
                  ...prevState,
                  salePolicyGroupId: e ? e._id : "",
                }))
              }
            />
            <StyleSelect
              title={tabletrans.productclass[props.lang]}
              direction={props.direction}
              class={"formInput halfWidth"}
              defaultValue={content && content.saleCommissionGroupId}
              options={Classes ? Classes : []}
              label={"name"}
              action={(e) =>
                props.setProductChange((prevState) => ({
                  ...prevState,
                  saleCommissionGroupId: e ? e._id : "",
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductGroupeSelect;
