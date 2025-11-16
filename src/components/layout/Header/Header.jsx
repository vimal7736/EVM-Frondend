import { useState } from 'react';
import { useGetProfilesQuery, useCreateProfileMutation } from '../../../features/profiles/profilesApiSlice';
import './Header.css';
import { ChevronsUpDown, User } from 'lucide-react';

const Header = ({ currentProfile, onProfileChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProfileName, setNewProfileName] = useState('');
  
  const { data: profiles = [] } = useGetProfilesQuery();
  const [createProfile, { isLoading }] = useCreateProfileMutation();

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProfile = async () => {
    if (newProfileName.trim()) {
      try {
        const result = await createProfile({ 
          name: newProfileName.trim(),
          timezone: 'America/New_York' 
        }).unwrap();
        setNewProfileName('');
        onProfileChange(result);
        setIsOpen(false);
      } catch (error) {
        alert('Failed to create profile');
      }
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">Event Management</h1>
          <p className="header-subtitle">Create and manage events across multiple timezones</p>
        </div>
        
        <div className="header-right">
          <div className="profile-selector-wrapper">
            <button 
              className="profile-selector-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <User className="profile-selector-icon" strokeWidth={1.8} />
              <span className="profile-selector-button-text">
                {currentProfile ? currentProfile.name : 'Select current profile...'}
              </span>
              <ChevronsUpDown strokeWidth={1.4} height={15}/>
            </button>

            {isOpen && (
              <>
                <div className="profile-selector-overlay" onClick={() => setIsOpen(false)} />
                <div className="profile-selector-dropdown">
                  <div className="profile-search">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M14 14L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="Search current profile..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="profile-list-dropdown">
                    {filteredProfiles.length > 0 ? (
                      filteredProfiles.map(profile => (
                        <div
                          key={profile._id}
                          className={`profile-item ${currentProfile?._id === profile._id ? 'active' : ''}`}
                          onClick={() => {
                            onProfileChange(profile);
                            setIsOpen(false);
                            setSearchTerm('');
                          }}
                        >
                          {profile.name}
                        </div>
                      ))
                    ) : (
                      <div className="no-profiles">No profile found.</div>
                    )}
                  </div>

                  <div className="add-profile-section">
                    <input
                      type="text"
                      placeholder="Profile name"
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddProfile()}
                    />
                    <button 
                      onClick={handleAddProfile}
                      disabled={isLoading || !newProfileName.trim()}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;