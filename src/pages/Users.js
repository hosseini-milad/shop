import React, { useEffect, useState } from "react";
import env from "../env";
import Cookies from "universal-cookie";
import tabletrans from "../translate/tables";
import errortrans from "../translate/error";
import UserList from "../modules/Users/UserList";
import UserCard from "../modules/Users/UserCard";
import formtrans from "../translate/forms";
import StyleSelect from "../components/Button/AutoComplete";
import StyleInput from "../components/Button/Input";

const cookies = new Cookies();

const Users = (props) => {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;

  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [accessList, setAccess] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    profile: "",
    access: "",
    password: "",
    email: "",
    username: "",
  });
  const token = cookies.get(env.cookieName);
  const userId = token.userId; // userId
  const body = {
    offset: filters.offset || "0",
    pageSize: filters.pageSize || "10",
    cName: filters.cName,
    sName: filters.sName,
    access: filters.access,
    search: filters.search,
  }; // Add any additional body parameters if required

  // Fetch the list of users

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${env.siteApi}/panel/user/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token && token.token,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setUsers(data.filter);
      setAccess(data.access);
      setStoreList(data.storeList)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //selected user

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`${env.siteApi}/panel/user/fetch-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token && token.token,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setUserData(data.data);
      setFormData({
        _id: data.data._id,
        profile: data.data.profile,
        access: data.data.access,
        password: data.data.password,
        email: data.data.email,
        username: data.data.username,
      });
      setShowCreatePanel(true); // Show the create panel after user data is fetched
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await fetch(`${env.siteApi}/panel/user/list-profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token && token.token,
        },
      });
      const data = await response.json();
      setProfiles(data.profiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };
  // must be activated after the list-access api is added to back-end
  // const fetchAccessList = async () => {
  //   try {
  //     const response = await fetch(`${env.siteApi}/panel/user/list-access`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-access-token": token && token.token,
  //       },
  //     });
  //     const data = await response.json();
  //     setAccess(data.access);
  //   } catch (error) {
  //     console.error("Error fetching access list:", error);
  //   }
  // };

  const handleUserEdit = (userId) => {
    fetchUser(userId);
  };

  const handleFormSubmit = async () => {
    console.log("Form Data:", formData);
    try {
      //   const token = cookies.get(env.cookieName);
      await fetch(`${env.siteApi}/panel/user/update-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token && token.token,
        },
        body: JSON.stringify(formData),
      });
      setShowCreatePanel(false);
      // Refresh the list of users
      fetchUsers();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProfiles();
  }, []);

  // useEffect(() => {
  //   console.log("Access List:", accessList);
  // }, [accessList]);

  return (
    <div className="team-users" style={{ direction: direction }}>
      {showCreatePanel && (
        <div className="create-team-user">
          <h4>{formtrans.addUser[lang]}</h4>
          <div className="email-input">
            <label htmlFor="email">{formtrans.email[lang]}</label>
            {/* <label htmlFor="email">{userData.email}</label> */}
            <StyleInput
              title={formtrans.emailAddress[props.lang]}
              direction={props.direction}
              defaultValue={userData.email || ""}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  email: e,
                }))
              }
            />
          </div>

          {/* <div className="role-input">
            <label htmlFor="role">User Role</label>
            <div className="red-line"></div>
            <select
              name=""
              id="role"
              value={userData.access}
              onChange={(e) =>
                setUserData({ ...userData, access: e.target.value })
              }
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}
          <label htmlFor="role">{formtrans.access[lang]}</label>

          <StyleSelect
            title={formtrans.access[lang]}
            direction={direction}
            defaultValue={userData.access ? userData.access : ""}
            class={"formInput"}
            options={accessList || []}
            label={"profileName"}
            action={(e) => {
              console.log("Selected Access:", e);
              setFormData((prevState) => ({
                ...prevState,
                access: e ? e : "",
              }));
            }}
          />
          <StyleSelect
            title={formtrans.profile[lang]}
            direction={direction}
            defaultValue={profiles.find(
              (profile) => profile._id === userData.profile
            )}
            class={"formInput"}
            options={profiles}
            label={"profileName"}
            action={(e) => {
              console.log("Selected Profile:", e);
              setFormData((prevState) => ({
                ...prevState,
                profile: e ? e._id : "",
              }));
            }}
          />
          <StyleSelect
            title={formtrans.store[lang]}
            direction={direction}
            class={"formInput"}
            defaultValue={storeList.find(
              (store) => store.StockID == userData.StockId
            )}
            options={storeList}
            label={"Title"}
            action={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                StockId: e ? e.StockID : "",
              }));
            }}
          />
          <StyleInput
            title={formtrans.customercode[lang]}
            direction={direction}
            class={"formInput"}
            defaultValue={userData.CustomerID}
            action={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                CustomerID: e,
              }));
            }}
          />
          <StyleInput
            title={formtrans.username[lang]}
            direction={direction}
            defaultValue={userData.username || ""}
            class={"formInput"}
            action={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                username: e,
              }))
            }
          />
          <StyleInput
            title={formtrans.newPassword[lang]}
            direction={direction}
            defaultValue={userData.password || ""}
            class={"formInput"}
            action={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                password: e,
              }))
            }
          />
          <div className="create-btn-wrapper">
            <button
              type="button"
              className="add-btn"
              onClick={handleFormSubmit}
            >
              {formtrans.saveChanges[lang]}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowCreatePanel(false)}
            >
              {formtrans.cancel[lang]}
            </button>
          </div>
        </div>
      )}

      <div className="team-header">
        <h4>{formtrans.users[lang]}</h4>
        <div className="team-search">
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ color: "#c0c0c0" }}
          ></i>
          <input type="search" placeholder={formtrans.searchUser[lang]} />
        </div>
        <div
          className="team-create"
          onClick={() => {
            setShowCreatePanel(true);
            setFormData({
              _id: "",
              profile: "",
              access: "",
              password: "",
              email: "",
              username: "",
            });
            setUserData({
              _id: "",
              profile: "",
              access: "",
              password: "",
              email: "",
              username: "",
            });
          }}
        >
          <i className="fa-solid fa-plus" style={{ color: "#ffffff" }}></i>
          <p>{formtrans.addUser[lang]}</p>
        </div>
      </div>

      <div className="team-wrapper">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            userData={userData}
            lang={lang}
            onEdit={handleUserEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
