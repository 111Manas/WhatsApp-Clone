import React from 'react';
import './signout-dropdown.css';
import {Button} from '@material-ui/core';
import {auth} from '../Firebase/firebase.utils';

const SignoutDropdown = () => {
  return (
    <div className="dropdown">
      <Button onClick ={() => auth.signOut()}>
        Sign Out</Button>
    </div>
  )
}

export default SignoutDropdown;
