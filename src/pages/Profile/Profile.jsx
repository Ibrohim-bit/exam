import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaCamera, FaSave, FaEdit } from 'react-icons/fa';
import './Profile.css';

function Profile({ user, updateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        phone: user.phone || '',
        address: user.address || ''
      });
      setProfileImage(user.profileImage || null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
      profileImage
    };
    updateUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setProfileImage(user?.profileImage || null);
    setIsEditing(false);
  };

  if (!user) {
    return <div className="profile">Please log in to view your profile.</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <h1><FaUser /> My Profile</h1>
        {!isEditing ? (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSave}>
              <FaSave /> Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-image-section">
          <div className="profile-image-container">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-image" />
            ) : (
              <div className="default-avatar">
                <FaUser size={80} />
              </div>
            )}
            {isEditing && (
              <button
                className="image-upload-btn"
                onClick={() => fileInputRef.current.click()}
              >
                <FaCamera />
              </button>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          {isEditing && (
            <p className="image-hint">Click the camera icon to change your profile picture</p>
          )}
        </div>

        <div className="profile-details">
          <div className="form-group">
            <label>Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            ) : (
              <p>{user.name || 'Not set'}</p>
            )}
          </div>

          <div className="form-group">
            <label>Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            ) : (
              <p>{user.email}</p>
            )}
          </div>

          <div className="form-group">
            <label>Phone:</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            ) : (
              <p>{user.phone || 'Not set'}</p>
            )}
          </div>

          <div className="form-group">
            <label>Address:</label>
            {isEditing ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                rows="3"
              />
            ) : (
              <p>{user.address || 'Not set'}</p>
            )}
          </div>

          <div className="form-group">
            <label>Bio:</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
                rows="4"
              />
            ) : (
              <p>{user.bio || 'No bio yet'}</p>
            )}
          </div>

          <div className="profile-stats">
            <div className="stat">
              <h3>Member Since</h3>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            <div className="stat">
              <h3>Account Status</h3>
              <p>Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;