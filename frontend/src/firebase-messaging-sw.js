importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCKem-vEPm-VXxJfYd6W8l7L2i6JRrEYfM",
  authDomain: "chat-5d398.firebaseapp.com",
  projectId: "chat-5d398",
  storageBucket: "chat-5d398.appspot.com",
  messagingSenderId: "164932326922",
  appId: "1:164932326922:web:50b4195301c552ed64b1f3",
  measurementId: "G-CGSDBQYNKC"
});

const messaging = firebase.messaging();
