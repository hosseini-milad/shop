import React, { useEffect, useState } from 'react';

const UserCard = ({ user }) => {
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
              <td>Team Role: </td>
              <td>{user.access}</td>
            </tr>
            <tr>
              <td>Team Profile: </td>
              <td>{user.group || user.cName}</td>
            </tr>
            <tr>
              <td>Last Accessed on: </td>
              <td>{user.lastAccessed}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="user-btn">
        <i className="fa-solid fa-search fa-sm"></i>
        <i className="fa-solid fa-ellipsis-v fa-sm"></i>
      </div>
    </div>
  );
};

export default UserCard;
