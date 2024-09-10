// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// @ts-ignore
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import { initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkP88eZtDBJt0zQlKRWPoRLGlsq4QGqMA",
  authDomain: "tp3-expo.firebaseapp.com",
  projectId: "tp3-expo",
  storageBucket: "tp3-expo.appspot.com",
  messagingSenderId: "806719384005",
  appId: "1:806719384005:web:7cd281ca3795facfef83ac",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
