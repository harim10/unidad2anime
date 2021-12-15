//import de la libreria
import firebase from "firebase/app";
import 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHDfZjTLIcPa7TdlmPiJBFWJzKH8jDeuQ",
  authDomain: "unidad2-c7d43.firebaseapp.com",
  projectId: "unidad2-c7d43",
  storageBucket: "unidad2-c7d43.appspot.com",
  messagingSenderId: "693282886926",
  appId: "1:693282886926:web:1e489391a56f2d2c6b735f"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export{firebase}