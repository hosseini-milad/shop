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
        <h4>{formtrans.addUser[lang]}</h4>
        <div className="email-input">
        <label for="email">User Email</label>
        <input type="text" id="email"  value={userData.email} onChange={e => setUserData({ ...userData, username: e.target.value })}/>
        <div className="red-line"></div>
        </div>
        <div className="note-input">
        <p><span>Note:</span>To add multiple users, press enter.</p>
        </div>
        <div className="assign-wrapper">
        <div className="assign-box left-box">
        <h6 className="unchecked-header">Available Projects</h6>
        <div className="checked-header">
        <p>0 Projects selected</p>
        <i className="fa-solid fa-arrow-right transfer-arrow"></i>
        </div>
        <div className="gp-wrapper">
        <div className="gp-header"><p>Ungrouped Projects</p></div>
        <div className="gp-member">
        <input type="checkbox" name="" id="member-1"/>
        <label for="member-1">Sample Project</label>
        <i className="fa-solid fa-arrow-right transfer-arrow"></i>
        </div>
        </div>
        </div>
        <div className="assign-box right-box">
        <h6 className="unchecked-header">Assigned Projects</h6>
        <div className="checked-header">
        <p>0 Projects selected</p>
        <i className="fa-solid fa-arrow-left transfer-arrow"></i>
        </div>
        <div className="gp-wrapper">
        <div className="gp-header"><p>Ungrouped Projects</p></div>
        <div className="gp-member">
        <input type="checkbox" name="" id="member-1"/>
        <label for="member-1">Sample Project</label>
        <i className="fa-solid fa-arrow-left transfer-arrow"></i>
        </div>
        </div>
        </div>
        </div>
        <div className="default-line"><p>Default Section</p></div>
        <div className="role-input">
        <label for="role">User Role</label>
        <div className="red-line"></div>
        <select name="" id="role">
        <option value="">Member</option>
        <option value="">Admin</option>
        </select>
        </div>
        <div className="profile-input">
        <label for="profile">Profile</label>
        <div className="red-line"></div>
        <select name="" id="profile">
        <option value="">Member</option>
        <option value="">Admin</option>
        </select>
        </div>
        <div className="notify-input">
        <input type="checkbox" id="notify"/>
        <label for="notify">Notify via email</label>
        </div>
        <div className="create-btn-wrapper">
        <div className="add-btn" onClick={handleFormSubmit}><p>Submit</p></div>
        <div className="cancel-btn"><p>Cancel</p></div>
        </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
