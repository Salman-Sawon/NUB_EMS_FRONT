importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");


firebase.initializeApp({
    apiKey: "AIzaSyBuS91QcSWtGCec2W8GeQZd04CqExv-Q80",
    authDomain: "emsnotification-6272b.firebaseapp.com",
    projectId: "emsnotification-6272b",
    storageBucket: "emsnotification-6272b.firebasestorage.app",
    messagingSenderId: "978466438556",
    appId: "1:978466438556:web:2e8fa3ab442afd190adc59",
});

const messaging = firebase.messaging();

// Foreground message handler
messaging.onMessage((payload) => {
    console.log("📩 Foreground message received: ", payload);
    console.log("payload.data: ", payload.data);

    if (payload.data) {
        const notificationTitle = payload.data.title || "New Notification";
        const notificationOptions = {
            body: payload.data.body || "You have a new message.",
            icon: "/assets/icons/icon-192x192.png"
        };

        // This shows a notification in the browser when the app is in the foreground
        if (Notification.permission === "granted") {
            new Notification(notificationTitle, notificationOptions);
        }
        console.log('notificationOptions',notificationOptions);
        
        self.registration.showNotification(notificationTitle, notificationOptions);
    }
});

// Background message handler
messaging.onBackgroundMessage((payload) => {
    console.log("📩 Background message received: ", payload);
    console.log("payload.data: ", payload.data);

    if (payload.data) {
        const notificationTitle = payload.data.title || "New Notification";
        const notificationOptions = {
            body: payload.data.body || "You have a new message.",
            icon: "/assets/icons/icon-192x192.png"
        };

        // Show notification in background
        self.registration.showNotification(notificationTitle, notificationOptions);
    }
});
