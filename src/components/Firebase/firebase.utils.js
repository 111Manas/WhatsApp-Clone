import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCgtesFnNl3vYrcIRZBiKX74I1si_W1mZo",
  authDomain: "whatsapp-clone-4ea72.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-4ea72.firebaseio.com",
  projectId: "whatsapp-clone-4ea72",
  storageBucket: "whatsapp-clone-4ea72.appspot.com",
  messagingSenderId: "569354459871",
  appId: "1:569354459871:web:f43855990c6df55768276a",
  measurementId: "G-N91H4LNJS4"
};
// Initialize Firebase
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
 
export default firebase;
