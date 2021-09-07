import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCoYgH50t2_5_QeRRT8cOVUHV4RskPk6ww",
    authDomain: "api-rest-curriculum-oscar.firebaseapp.com",
    databaseURL: "https://api-rest-curriculum-oscar-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "api-rest-curriculum-oscar",
    storageBucket: "api-rest-curriculum-oscar.appspot.com",
    messagingSenderId: "16012710356",
    appId: "1:16012710356:web:e0ffbaaf071200919e0641"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  

  export default firebase;