import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/sidebar';
import Chat from './components/Chat/Chat';
import {Switch,Route} from 'react-router-dom';
import Login from './components/LogIn/Login';
import {auth} from './components/Firebase/firebase.utils';
import {connect} from "react-redux";
import {setUser} from './components/Redux/user/user.action';
import ProfileDetail from './components/Profile-detail/profile-detail';


class App extends React.Component {
  
  
  componentDidMount(){
    const {setUser} = this.props;
    auth.onAuthStateChanged(user =>{
    setUser(user);
      console.log(user);
    })
  };

 render() {
  const {currentUser} = this.props;

  return (
    <div className='app'>
      {!currentUser ? (
        <Login />
      ) : ( 
      <div className='app_body'>
      <Sidebar />
        <Switch>
          <Route path='/login'>
              <Login />
          </Route>
          <Route 
            path='/rooms/:roomId'>
              <Chat />
          </Route>
          <Route exactpath='/'>
              <Chat />
          </Route>
          <Route path='/profile-detail'>
            <ProfileDetail />
          </Route>
        </Switch>
     </div> )
      }  
   </div>       
  )}
}

const mapStateToProps = (state) => ({
  currentUser:state.user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setUser:user =>dispatch(setUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);