import Vue from 'vue'
import App from './App.vue'
import router from './router'

import IconBase from 'feather-icons-vue'
Vue.use(IconBase)

Vue.config.productionTip = false;

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD7qAuj6uAKRn8zPXrIxXSdFSG4avhOh6E",
    authDomain: "story-28855.firebaseapp.com",
    databaseURL: "https://story-28855-default-rtdb.firebaseio.com",
    projectId: "story-28855",
    storageBucket: "story-28855.appspot.com",
    messagingSenderId: "468630949734",
    appId: "1:468630949734:web:e3909fbb9f41a0c9c8c2a7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Sign in all users anonymously
firebase.auth().signInAnonymously()
.then(() => {
})
.catch((error) => {
    console.log(error);
});

new Vue({
  router,
  render: h => h(App),
  data () {
    return {
      user: null,
      database: firebase.database()
    }
  },
  async created() {
    let user = null;
    try {
        user = await new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    resolve(user);
                } else {
                    reject(new Error("Error initializing database."));
                }
            });
        });
    }
    catch(err) {
        console.log("Error initializing database.");
    }
    this.user = user;
}
}).$mount('#app')
