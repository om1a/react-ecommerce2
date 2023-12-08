import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = "Tariq__" + localStorage.getItem('userToken');
      if (!token) {
        console.log("No token found");
        return;
      }

      const url = 'https://ecommerce-node4.vercel.app/user/profile';
      const config = {
        headers: { 'Authorization': token }
      };

      try {
        const response = await axios.get(url, config);
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="container">
      <h2>User Profile</h2>
      {userData ? (
        <div className="profile-card">
          <img src={userData.image.secure_url} alt={userData.userName} className="profile-image" />
          <div className="user-info">
            <h3>{userData.userName}</h3>
            <p>{userData.email}</p>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
