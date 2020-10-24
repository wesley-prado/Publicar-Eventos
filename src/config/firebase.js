import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBDRNlFLILMEt43u7uTvjvDTWBvu6pMOvw',
  authDomain: 'eventos-29ff9.firebaseapp.com',
  databaseURL: 'https://eventos-29ff9.firebaseio.com',
  projectId: 'eventos-29ff9',
  storageBucket: 'eventos-29ff9.appspot.com',
  messagingSenderId: '961333226702',
  appId: '1:961333226702:web:6628947ae83f67c6a2b49f'
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
