import React from 'react';
import './profile-detail.css';
import {connect} from 'react-redux';

import {Avatar} from '@material-ui/core';

const ProfileDetail = ({currentUser}) => {
  return (
      <div className='profile'>
          <div className='profileA'>
              <div className='profile-header'>
                <h3>Profile</h3>
              </div>
              <div className='profile-body'>
                <div className='profile-image'>
                  <Avatar 
                      src={currentUser?.photoURL} />
                </div>
                <div className='profile-detail'>
                  <div className='name'>
                    <div className='naming'>
                      <h5>Your Name</h5>
                    </div>
                    <div className='name-detail'>
                    {currentUser?.displayName}
                    </div>
                    <p>This is not your username or pin. This name will be visible to your WhatsApp contacts.</p>
                  </div>
                  <div className='name'>
                    <div className='naming'>
                      <h5>Your Email</h5>
                    </div>
                    <div className='name-detail'>
                    {currentUser?.email}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        <div className="profileB"></div>
      </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser : state.user.currentUser
})

export default connect(mapStateToProps)(ProfileDetail);
