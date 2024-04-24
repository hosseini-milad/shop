import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import env from '../../env';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const token = 'your-token'; // Replace 'your-token' with the actual token
  const userId = 'your-userId'; // Replace 'your-userId' with the actual userId
  const body = {}; // Add any additional body parameters if required

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const postOptions = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            userId: userId
          },
          body: JSON.stringify(body)
        };

        const response = await fetch(env.siteApi+'/panel/user/list', postOptions);
        const data = await response.json();
        
        // Assuming "filter" contains the user data
        setUsers(data.filter);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Ensure this effect runs only once on mount

  return (
    <div class="team-users" style={{direction:"rtl"}}>
      <div class="create-team-user" style={{display:'none'}}>
        <h4>Add User</h4>
        <div class="email-input">
          <label for="email">User Email</label>
          <input type="text" id="email"/>
          <div class="red-line"></div>
        </div>
        <div class="note-input">
          <p><span>Note:</span>To add multiple users, press enter.</p>
        </div>
        <div class="assign-wrapper">
          <div class="assign-box left-box">
            <h6 class="unchecked-header">Available Projects</h6>
            <div class="checked-header">
              <p>0 Projects selected</p>
              <i class="fa-solid fa-arrow-right transfer-arrow"></i>
            </div>
            <div class="gp-wrapper">
              <div class="gp-header"><p>Ungrouped Projects</p></div>
              <div class="gp-member">
                <input type="checkbox" name="" id="member-1"/>
                <label for="member-1">Sample Project</label>
                <i class="fa-solid fa-arrow-right transfer-arrow"></i>
              </div>
            </div>
          </div>
          <div class="assign-box right-box">
            <h6 class="unchecked-header">Assigned Projects</h6>
            <div class="checked-header">
              <p>0 Projects selected</p>
              <i class="fa-solid fa-arrow-left transfer-arrow"></i>
            </div>
            <div class="gp-wrapper">
              <div class="gp-header"><p>Ungrouped Projects</p></div>
              <div class="gp-member">
                <input type="checkbox" name="" id="member-1"/>
                <label for="member-1">Sample Project</label>
                <i class="fa-solid fa-arrow-left transfer-arrow"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="default-line"><p>Default Section</p></div>
        <div class="role-input">
          <label for="role">User Role</label>
          <div class="red-line"></div>
          <select name="" id="role">
            <option value="">Member</option>
            <option value="">Manager</option>
            <option value="">Admin</option>
          </select>
        </div>
        <div class="profile-input">
          <label for="profile">Profile</label>
          <div class="red-line"></div>
          <select name="" id="profile">
            <option value="">Member</option>
            <option value="">Manager</option>
            <option value="">Admin</option>
          </select>
        </div>
        <div class="notify-input">
          <input type="checkbox" id="notify"/>
          <label for="notify">Notify via email</label>
        </div>
        <div class="create-btn-wrapper">
          <div class="add-btn"><p>Add</p></div>
          <div class="cancel-btn"><p>Cancel</p></div>
        </div>
      </div>

      <div class="team-header">
        <h4>Team Users</h4>
        <div class="team-search">
          <i class="fa-solid fa-magnifying-glass" style={{color: '#c0c0c0'}}></i>
          <input type="search" placeholder="Search users.."/>
        </div>
        <div class="team-create">
          <i class="fa-solid fa-plus" style={{color: '#ffffff'}}></i>
          <p>User</p>
        </div>
      </div>
      <div class="team-wrapper">
      {users.map(user => (

<UserCard key={user._id} user={user} />


      ))}
      </div>
  </div>
  );
};

export default UserList;
