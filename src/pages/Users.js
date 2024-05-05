import React, { useEffect, useState } from 'react';
import env from '../env';
import Cookies from "universal-cookie";
import tabletrans from "../translate/tables";
import errortrans from "../translate/error";
import UserList from '../modules/Users/UserList';
import UserCard from '../modules/Users/UserCard';
import formtrans from '../translate/forms';

const cookies = new Cookies();

const Users = (props) => {
    
    const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
    const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
    
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const token = cookies.get(env.cookieName);
    const userId = token.userId; // userId
    const body = {
        
        offset:filters.offset?filters.offset:"0",
        pageSize:filters.pageSize?filters.pageSize:"10",
        cName: filters.cName,
        sName: filters.sName,
        access: filters.access,
        search: filters.search,
        
        
    }; // Add any additional body parameters if required
    
    const [formData, setFormData] = useState("");
    

    //selected user
    
    const fetchUser = async (userId) => {
        try {
            const token = cookies.get(env.cookieName);
            const response = await fetch(`${env.siteApi}/panel/user/fetch-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token && token.token,
                },
                body: JSON.stringify({ userId }),
            });
            const data = await response.json();
            setSelectedUser(data.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleUserEdit = (userId) => {
        fetchUser(userId);
        // Show create-team-user panel
    };

    const handleFormSubmit = async () => {
        try {
            // Submit updated user data
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };
    

    
    useEffect(() => {
        const fetchUsers = async () => {
            
            try {
                const postOptions = {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        "x-access-token": token && token.token,
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
        <div className="team-users" style={{direction: direction }}>
        <div className="create-team-user" >
        <h4>{formtrans.addUser[props.lang]}</h4>
        <div className="email-input">
        <label for="email">User Email</label>
        <input type="text" id="email"/>
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
        <div className="add-btn"><p>Add</p></div>
        <div className="cancel-btn"><p>Cancel</p></div>
        </div>
        </div>
        
        <div className="team-header">
        <h4>{formtrans.users[lang]}</h4>
        <div className="team-search">
        <i className="fa-solid fa-magnifying-glass" style={{color: '#c0c0c0'}}></i>
        <input type="search" placeholder="Search users.."/>
        </div>
        <div className="team-create">
        <i className="fa-solid fa-plus" style={{color: '#ffffff'}}></i>
        <p>{formtrans.addUser[lang]}</p>
        </div>
        </div>
        
        <div className="team-wrapper">
        {users.map(user => (
            <UserCard key={user._id} user={user} lang={lang} onEdit={handleUserEdit}/>
        ))}
        </div>
            {/* Create Team User Panel */}
            {selectedUser && (
                <div className="create-team-user">
                    {/* Populate fields with selectedUser data */}
                    <input type="text" value={selectedUser.username} />
                    <input type="text" value={selectedUser.email} />
                    {/* Add other fields as needed */}
                    <button onClick={handleFormSubmit}>Submit</button>
                </div>
            )}        
        
        </div>
    );
};

export default Users;
