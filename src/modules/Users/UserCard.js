import React, { useEffect, useState } from 'react';
import formtrans from '../../translate/forms';
import env from '../../env';
import Cookies from "universal-cookie";


const cookies = new Cookies();

const UserCard = ({ user, lang, onEdit }) => {
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleUserBtnClick = async () => {
    try {
      const token = cookies.get(env.cookieName);
      const response = await fetch(env.siteApi + '/panel/user/fetch-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": token && token.token,
        },
        body: JSON.stringify({ userId: user._id })
      });
      const data = await response.json();
      setUserData(data.data);
      setShowCreatePanel(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  
  const handleFormSubmit = async () => {
    try {
      // Make a POST request to update the user data
      const token = cookies.get(env.cookieName);
      await fetch(env.siteApi + '/panel/user/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": token && token.token,
        },
        body: JSON.stringify(userData)
      });
      // Optionally, handle success or show a notification
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="user-card">
      <div className="user-profile">
        <img src={process.env.PUBLIC_URL + '/img/user.png'} alt="" />
        <div className="owner"><p>{user.access}</p></div>
      </div>
      <div className="user-info">
        <div className="user-id">
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
        <div className="user-state">
          <table>
            <tr>
              <td>{formtrans.role[lang]}:</td>
              <td>{user.access}</td>
            </tr>
            <tr>
            <td>{formtrans.group[lang]}:</td>
              <td>{user.group || user.cName}</td>
            </tr>
            <tr>
              <td>{formtrans.lastAccess[lang]}: </td>
              <td>{user.lastAccessed}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="user-btn">
        <i onClick={() => onEdit(user._id)} className="fa-solid fa-edit fa-sm"></i>
      </div>

      {/* Create Team User Panel */}
      {showCreatePanel && userData && (
        <div className="create-team-user">
          {/* Populate fields with userData */}
          <input type="text" value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })} />
          <input type="text" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
          {/* Add other fields as needed */}
          <button onClick={handleFormSubmit}>Submit</button>
        </div>
      )}

    </div>
  );
};

export default UserCard;
