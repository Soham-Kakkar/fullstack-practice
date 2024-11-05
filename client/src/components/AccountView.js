import React, { useState } from 'react';
import './AccountView.css'

const AccountView = ({ username, email }) => {
  const [showPopup, setShowPopup] = useState(false);

  const getInitials = (username) => {
    const names = username.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[1][0];
    }
    return names[0][0];
  };

  const handleLogout = () => {
    // Implement logout logic here
  };

  return (
    <div>
      <div
        className="account-circle"
        onClick={() => setShowPopup(!showPopup)}
      >
        {getInitials(username)}
      </div>
      {showPopup && (
        <div className="account-popup">
          <p>Username: {username}</p>
          <p>Email: {email}</p>
          <button onClick={handleLogout}>Logout</button>
          <button>Delete Account</button>
        </div>
      )}
    </div>
  );
};

export default AccountView;
