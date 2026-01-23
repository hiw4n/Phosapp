import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { initializeFirestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCZ4kOSAmeE1gJTPTroFsG4VexCu9qWLK0",
  authDomain: "phosapp-3ae57.firebaseapp.com",
  projectId: "phosapp-3ae57",
  storageBucket: "phosapp-3ae57.firebasestorage.app",
  messagingSenderId: "459949474518",
  appId: "1:459949474518:web:caa7e7a92494a622c53f77",
  measurementId: "G-VEF5H8GX2J"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (error) {
  auth = getAuth(app);
}

let db;
try {
  db = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
    useFetchStreams: false,
  });
} catch (error) {
  db = getFirestore(app);
}

const storage = getStorage(app);

export { auth, db, storage };