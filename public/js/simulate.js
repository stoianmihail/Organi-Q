document.addEventListener('DOMContentLoaded', (event) => {
  var config = {
      apiKey: "AIzaSyDZ61I9wPnYLgK9RxaKWwnzHEyPp57vy2Y",
      authDomain: "meet-organi-q.firebaseapp.com",
      databaseURL: "https://meet-organi-q-default-rtdb.firebaseio.com/",
			storageBucket: "meet-organi-q.appspot.com"  
  };
  firebase.initializeApp(config);

  const db = firebase.database().ref();
  const auth = firebase.auth();
  
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log("inside");
      db.child("users/" + firebaseUser.uid).once("value", snapshot => {
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
