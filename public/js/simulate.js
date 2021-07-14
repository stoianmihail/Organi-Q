document.addEventListener('DOMContentLoaded', (event) => {
  var config = {
      apiKey: "AIzaSyBKfFDV8_NLF0AiCloo1stQVgCTURZUudQ",
      authDomain: "organi-q.firebaseapp.com",
      databaseURL: "https://organi-q-default-rtdb.firebaseio.com",
			storageBucket: "organi-q.appspot.com"  
  };
  firebase.initializeApp(config);

  const db = firebase.database().ref();
  const auth = firebase.auth();

  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log("inside");
      db.child("users/").once("value", snapshot => {
        if (snapshot.exists()) {
          console.log(snapshot)
          // TODO
        } else {
          console.log("baaa");
        }
      });
    } else {
      console.log("not!");
      window.location = "/login.html"
    }
  });
});
