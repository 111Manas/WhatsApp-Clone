import React,{useState,useEffect} from 'react';
import './Chat.css';
import {Avatar,IconButton} from '@material-ui/core';
import {SearchOutlined,AttachFile,MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import {useParams} from 'react-router-dom';
import {firestore} from '../../components/Firebase/firebase.utils';
import firebase from 'firebase';
import {connect} from 'react-redux';

const Chat = ({currentUser}) => {
  const [input,setInput] = useState('');
  const [seed,setSeed] = useState('');
  const {roomId}= useParams();
  const [roomName,setRoomName] = useState('');
  const [messages,setMessages] = useState ([]);

  useEffect (()=> {
    if(roomId) {
      firestore.collection('rooms')
      .doc(roomId)
      .onSnapshot((snapshot)=>
      setRoomName
      (snapshot.data().name));
    

      firestore.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp','asc')
      .onSnapshot((snapshot)=>
      setMessages(snapshot.docs.map((doc)=> doc.data())))
      };
  },[roomId]);

  useEffect (()=>{
    setSeed(Math.floor(Math.random()*5000))
  },[roomId]);

  const sendMessage = (event) =>{
    event.preventDefault();
    // console.log("You typed >>>", input);

    firestore.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name:currentUser?.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg?mood[]=happy`}/>

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen {" "}
            {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
              </p>
        </div>
        <div className="chat_headerRight">
          <IconButton >
            <SearchOutlined />
          </IconButton>
          <IconButton >
            <AttachFile/>
          </IconButton>
          <IconButton >
           <MoreVert/>
          </IconButton>
          
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) =>(
          <p className={`chat_message ${true && 'chat_receiver'}`}>
          <span className="chat_name">
            {message.name}
          </span>
          {message.message}
          <span className="chat_timeStamp">
            {new Date(message.timestamp?.toDate()).toUTCString()}
          </span>
        </p>
        ) )}
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input 
            type="text"
            value={input}
            onChange={(e)=> setInput(e.target.value)}
            placeholder='Type a message' 
          />
          <button 
            type='submit' 
            onClick={sendMessage}>
              Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser:state.user.currentUser
})

export default connect(mapStateToProps
  )(Chat);
