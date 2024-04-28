import { useState } from "react";
import StyleInput from "../../../components/Button/Input";
import env from "../../../env";
import formtrans from "../../../translate/forms";

import ErrorShow from "../../../components/Button/ErrorShow";
import ErrorAction from "../../../components/Modal/ErrorAction";

function CustomerSecurity(props) {
  const token = props.token;
  const userData = props.userData;

  const [formData, setFormData] = useState();
  const [error, setError] = useState({ errorText: "", errorColor: "brown" });

  // call to save changes
  const saveChanges = () => {
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userData._id,
        ...formData,
      }),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/api/auth/change-password", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setError({ errorText: result.success, errorColor: "green" });
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              3000
            );
          } else console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  if (!userData) return <div className="general-page">{env.loader}</div>;
  else
    return (
      <div className="sec-page">

        <div className="password-wrapper">
          {/* New Password */}
          <StyleInput
          title={formtrans.newPassword[props.lang]}
          direction={props.direction}
          defaultValue={props.defaultValue}

          password="true"
          class="formInput"
            action={(e) =>
              setFormData((prevState) => ({ ...prevState, newPass: e }))
            } // Update formData state
          />
          {/* Confirm Password */}
          <StyleInput
          title={formtrans.confirmPassword[props.lang]}
          direction={props.direction}
            
          password="true"
            class="formInput"
            action={(e) =>
              setFormData((prevState) => ({ ...prevState, confPass: e }))
            } // Update formData state
          />
        </div>



        <div className="save-btn" onClick={saveChanges}>
          {formtrans.saveChanges[props.lang]}
        </div>
      </div>
    );
}
export default CustomerSecurity;
