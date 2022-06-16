import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChm3Zh5LfOTA3tNp7y7yhPGuhcymNcZo8",
    authDomain: "ecom-96c1c.firebaseapp.com",
    projectId: "ecom-96c1c",
    storageBucket: "ecom-96c1c.appspot.com",
    messagingSenderId: "924637333505",
    appId: "1:924637333505:web:7370e60c8fa49a2f12d800",
    measurementId: "G-7NF076MZYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
