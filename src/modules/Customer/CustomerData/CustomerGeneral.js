import { useState, useEffect } from "react";
import StyleInput from "../../../components/Button/Input";
import env from "../../../env";
import formtrans from "../../../translate/forms";
import CustomerAvatar from "../CustomerComponent/CustomerAvatar";
import ErrorShow from "../../../components/Button/ErrorShow";
import ErrorAction from "../../../components/Modal/ErrorAction";
import StyleRadio from "../../../components/Button/Radio";
import StyleSelect from "../../../components/Button/AutoComplete";

function CustomerGeneral(props) {
  const userData = props.userData;
  const token = props.token;
  const [formData, setFormData] = useState({ active: "false" }); // Initialize active as a string
  const [error, setError] = useState({ errorText: "", errorColor: "brown" });
  const [formalShow, setFormal] = useState(0);
  useEffect(() => {
    // Initialize formData.active with userData.active when userData changes
    if (userData && userData.active) {
      setFormData((prevState) => ({
        ...prevState,
        active: userData.active,
      }));
    } else if (userData && userData.false) {
      setFormData((prevState) => ({
        ...prevState,
        active: userData.active,
      }));
    }
  }, [userData]);
  // drop downs
  const [states, setStates] = useState([]);
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([]);
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  useEffect(() => {
    fetchStates();
  }, []);

  // fetches the states to populate dropdown
  const fetchStates = () => {
    fetch(env.siteApi + "/setting/list-state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ search: search }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStates(data.data);
      })
      .catch((error) => console.error("Error fetching states:", error));
  };

  // fetchesh cities to populate dropdown

  const fetchCities = (stateId) => {
    fetch(env.siteApi + "/setting/list-city", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ stateId: stateId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCities(data.data);
      })
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleStateChange = (value) => {
    if (value) {
      setFormData((prevState) => ({
        ...prevState,
        state: value.label,
        stateId: value.value, // Store stateId to use for fetching cities
      }));
      fetchCities(value.value);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        state: "",
        stateId: "",
      }));
      setCities([]); // Clear cities if no state is selected
    }
  };

  const handleCityChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      city: value ? value.label : "",
      cityId: value ? value.value : "",
    }));
  };

  const saveChanges = (navigateBack) => {
    var postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        userId: userData._id,
        ...formData,
      }),
    };
    fetch(env.siteApi + "/panel/user/update-customer", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setError({ errorText: result.success, errorColor: "green" });
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              3000
            );
            if (navigateBack) {
              setTimeout(() => {
                window.history.back();
              }, 2000);
            }
          } else console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const formalCustomer = (e) => {
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userData,
      }),
    };
    //console.log(postOptions)
    fetch(env.siteApi + "/panel/user/formal-customer", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.result) {
            setError({ errorText: result.message, errorColor: "green" });
            setTimeout(() => window.location.reload(), 3000);
          } else console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const activityStatusHandler = () => {
    setFormData((prevState) => ({
      ...prevState,
      active: formData.active === "false" ? "true" : "false", // Toggle between "true" and "false"
    }));
  };
  const realOrJuridical = () => {
    setFormData((prevState) => ({
      ...prevState,
      activity: formData.activity === "false" ? "true" : "false", // Toggle between "true" and "false"
    }));
  };

  if (!userData) return <div className="general-page">{env.loader}</div>;
  else
    return (
      <div className="general-page">
        {/* <CustomerAvatar /> */}
        <div className="info-box">
          <div className="info-wrapper">
             <StyleInput
              title={formtrans.name[props.lang]}
              direction={props.direction}
              defaultValue={userData.cName}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  cName: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.fname[props.lang]}
              direction={props.direction}
              defaultValue={userData.sName}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  sName: e,
                }))
              }
            />

            <StyleInput
              title={formtrans.emailAddress[props.lang]}
              direction={props.direction}
              defaultValue={userData.email}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  email: e,
                }))
              }
            />

            <StyleInput
              title={formtrans.phoneNumber[props.lang]}
              direction={props.direction}
              defaultValue={userData.phone}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  phone: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.mobile[props.lang]}
              direction={props.direction}
              defaultValue={userData.mobile}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  mobile: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.EmergencyContact[props.lang]}
              direction={props.direction}
              defaultValue={userData.urgCall}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  urgCall: e,
                }))
              }
            />

            <StyleInput
              title={formtrans.customercode[props.lang]}
              direction={props.direction}
              defaultValue={userData.cCode}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  cCode: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.postalCode[props.lang]}
              direction={props.direction}
              defaultValue={userData.postalCode}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  postalCode: e,
                }))
              }
            />

            <StyleInput
              title={formtrans.meliCode[props.lang]}
              direction={props.direction}
              defaultValue={userData.meliCode}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  meliCode: e,
                }))
              }
            />
<StyleSelect
              title={formtrans.state[props.lang]}
              direction={props.direction}
              defaultValue={userData.state || ""}
              // defaultValue={userData.state}
              class={"formInput"}
              options={states.map((state) => ({
                label: state.stateName,
                value: state.stateId,
              }))}
              label="label"
              action={handleStateChange}
            />

            <StyleSelect
              title={formtrans.city[props.lang]}
              direction={props.direction}
              defaultValue={userData.city || ""}
              class="formInput"
              options={cities.map((city) => ({
                label: city.cityName,
                value: city.cityId,
              }))}
              label="label"
              action={handleCityChange}
              disabled={!formData.stateId} // Disable if no state is selected
            />
            <span style={{ whiteSpace: "pre-wrap" }}></span>

            <div className="dense-btn">
              <label htmlFor="view">
                {/* Text indicating the radio button */}
                {formtrans.status[props.lang]}
              </label>
              <input
                className="switch-input"
                type="checkbox"
                id="view"
                defaultChecked={userData.active === true ? true : false}
                onClick={activityStatusHandler}
              />
              <label
                htmlFor="view"
                className={true ? "switch-label" : "switch-label disable-label"}
              ></label>
            </div>
            <span style={{ whiteSpace: "pre-wrap" }}></span>

            <StyleSelect
              title={"حقوقی/حقیقی"}
              direction={props.direction}
              defaultValue={userData.activity}
              class={"formInput"}
              options={["حقیقی", "حقوقی"]}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  activity: e,
                }))
              }
            />

            <div className="info-input">
              <label htmlFor="address">{formtrans.address[props.lang]}</label>
              <textarea
                name="address"
                id="address"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    Address: e.target.value,
                  }))
                }
              >
                {userData.Address}
              </textarea>
            </div>

            <div className="info-input">
              <label htmlFor="about">{formtrans.about[props.lang]}</label>
              <textarea
                name="about"
                id="about"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    about: e.target.value,
                  }))
                }
              >
                {userData.about}
              </textarea>
            </div>
          </div>
          {userData.agent ? (
            <div
              className="delete-user-btn formal-btn"
              onClick={() => setFormal(1)}
            >
              رسمی کردن مشتری
            </div>
          ) : (
            <div
              className="delete-user-btn formal-btn"
              onClick={() => setFormal(1)}
            >
              غیر رسمی کردن
            </div>
          )}

          <ErrorShow message={error.errorText} color={error.errorColor} />
          {formalShow ? (
            <ErrorAction
              title="رسمی کردن مشتری"
              color="darkslateblue"
              text="مشتری بعد از ثبت در سپیدار، به عنوان مشتری رسمی در خواهد آمد."
              close={() => setFormal(0)}
              buttonText="تایید"
              action={(e) => formalCustomer(e)}
            />
          ) : (
            <></>
          )}
          <div className="create-btn-wrapper">
            <div className="save-btn" onClick={() => saveChanges(false)}>
              {formtrans.saveChanges[props.lang]}
            </div>
            <div
              className="save-btn"
              style={{ marginLeft: 10 + "em" }}
              onClick={() => saveChanges(true)}
            >
              {formtrans.saveAndClose[props.lang]}
            </div>
          </div>
        </div>
      </div>
    );
}
export default CustomerGeneral;
