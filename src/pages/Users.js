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
  const [formData, setFormData] = useState({});

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
      });
      setShowCreatePanel(true); // Show the create panel after user data is fetched

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await fetch(`${env.siteApi}/panel/user/list-profiles`, {
        method: "GET",
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

  const handleUserEdit = (userId) => {
    fetchUser(userId);
  };

  const handleFormSubmit = async () => {
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
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${env.siteApi}/panel/user/list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token && token.token,
          },
          body: JSON.stringify(body)
        });
        const data = await response.json();
        setUsers(data.filter);
        setAccess(data.access);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
    fetchProfiles();

    console.log(userData);
    console.log(formData);
  }, []);


  return (
    <div className="team-users" style={{ direction: direction }}>
      {showCreatePanel && userData && (
        <div className="create-team-user">
          <h4>{formtrans.addUser[lang]}</h4>
          <div className="email-input">
            <label htmlFor="email">{formtrans.email[lang]}</label>
            <label htmlFor="email">{userData.email}</label>
            {/* <input
              type="text"
              id="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            /> */}
            <div className="red-line"></div>
          </div>


          <div className="default-line">
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
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  access: e ? e._id : "",
                }))
              }
            />
            <label htmlFor="role">{formtrans.profile[lang]}</label>

            <StyleSelect
            title={formtrans.profile[lang]}
            direction={direction}
            defaultValue={profiles.find((profile) => profile._id === userData.profile)}
            class={"formInput"}
            options={profiles}
            label={"profileName"}
            action={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                profile: e ? e._id : "",
              }))
            }
          />
            <StyleInput
              title={formtrans.newPassword[lang]}
              direction={direction}
              defaultValue={userData.password}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  password: e,
                }))
              }
            />
          <div className="profile-input">
            <label htmlFor="profile">Profile</label>
            <div className="red-line"></div>
            <select
              name=""
              id="profile"
              value={userData.profile}
              onChange={(e) =>
                setUserData({ ...userData, profile: e.target.value })
              }
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* <div className="notify-input">
            <input
              type="checkbox"
              id="notify"
              checked={userData.notify || false}
              onChange={(e) =>
                setUserData({ ...userData, notify: e.target.checked })
              }
            />
            <label htmlFor="notify">Notify via email</label>
          </div> */}
          <div className="create-btn-wrapper">
            <div className="add-btn" onClick={handleFormSubmit}>
              <p>Submit</p>
            </div>
            <div
              className="cancel-btn"
              onClick={() => setShowCreatePanel(false)}
            >
              <p>Cancel</p>
            </div>
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
        <div className="team-create">
          <i className="fa-solid fa-plus" style={{ color: "#ffffff" }}></i>
          <p>{formtrans.addUser[lang]}</p>
        </div>
      </div>

      <div className="team-wrapper">
      {users.map(user => (
                    <UserCard key={user._id} user={user} userData={userData} lang={lang} onEdit={handleUserEdit} />
                ))}
      </div>
    </div>
  );
};

export default Users;
