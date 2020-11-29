import React from 'react';
import './Login.css';
import {Button} from '@material-ui/core';
import {signInWithGoogle} from '../Firebase/firebase.utils';

const Login = () => {

  return (
    <div className='login'>
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="img" />
        <div className="login_text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        
        <Button 
        onClick={signInWithGoogle} >
          Sign in With Google
        </Button>
      </div>
      
    </div>
  )
}

export default Login;
