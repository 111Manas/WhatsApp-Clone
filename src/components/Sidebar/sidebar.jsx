import React,{useState,useEffect} from 'react';
import './sidebar.css';
import {Avatar, IconButton} from '@material-ui/core';
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {SearchOutlined} from '@material-ui/icons';
import SignoutDropdown from '../SignOut-Dropdown/signout-dropdown';
import SidebarChat from '../Sidebar/Sidebarchat/SidebarChat';
import {firestore} from '../Firebase/firebase.utils';
import {connect} from 'react-redux';
import ProfileDetail from '../Profile-detail/profile-detail';

const Sidebar = ({currentUser}) => {
  const [rooms, setRooms] = useState([]);
  const [signOut,setSignOut] = useState (true);
  const [profile,setProfile] = useState (true);

  useEffect(() => {
   const unsubscribe = firestore.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc => ({
        id:doc.id,
        data:doc.data()
      })))
    ))
    return () => {
      unsubscribe();
    }
  },[]);

  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar 
            src={currentUser?.photoURL} 
            onClick ={()=>setProfile(!profile)}/>
          {profile ? null : 
              <ProfileDetail />}
        <div className='sidebar_headerRight'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton 
            onClick ={()=>setSignOut(!signOut)}>
            <MoreVertIcon />
          </IconButton>
        </div>
        {
          signOut ? null :
        <SignoutDropdown />
        }
      </div>
      <div className='sidebar_search'>
        <div className='sidebar_searchContainer'>
        <SearchOutlined />
        <input placeholder= "Search or Start new chat" type="text" />
        </div>
      </div>
      <div className='sidebar_chats'>
        <SidebarChat addNewChat/>
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id}
          name={room.data.name} />
        ))}
        </div>
    </div>
  ) 
}
const mapStateToProps = (state) => ({
  currentUser:state.user.currentUser
})
export default connect(mapStateToProps)(Sidebar);