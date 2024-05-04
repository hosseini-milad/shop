import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import env from '../../env';

const UserList = (props) => {
  const users = props.users;

  <div className="team-wrapper">
  {users.map(user => (
      
      <UserCard key={user._id} user={user} />
      
      
  ))}
  </div>
};

export default UserList;
