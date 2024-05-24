import React, { useState } from 'react';
import formtrans from '../../translate/forms';
import env from '../../env';
import Cookies from "universal-cookie";

const cookies = new Cookies();

const UserCard = ({ user, lang, onEdit }) => {
  const handleUserBtnClick = () => {
      onEdit(user._id);
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
        <i onClick={handleUserBtnClick} className="fa-solid fa-edit fa-sm"></i>
      </div>

      
    </div>
  );
};

export default UserCard;
