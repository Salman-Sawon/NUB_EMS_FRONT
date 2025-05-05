import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBuS91QcSWtGCec2W8GeQZd04CqExv-Q80",
  authDomain: "emsnotification-6272b.firebaseapp.com",
  projectId: "emsnotification-6272b",
  storageBucket: "emsnotification-6272b.firebasestorage.app",
  messagingSenderId: "978466438556",
  appId: "1:978466438556:web:2e8fa3ab442afd190adc59",
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

// Foreground notification listener
onMessage(messaging, (payload: any) => {
  console.log("🔥 Foreground Message Received:", payload);
});
