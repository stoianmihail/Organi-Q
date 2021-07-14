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
  
  var signout_button = document.getElementById("signout-button");
  var simulator = document.getElementById("simulator");
  
  // Continous check.
  var state = false;
  auth.onAuthStateChanged(firebaseUser => {
    console.log(firebaseUser + " state: " + state);
    if (firebaseUser) {
      db.child('users/' + firebaseUser.uid).once('value', snapshot => {
        if (snapshot.exists()) {
          console.log(snapshot)
        } else {
          console.log('No username in the database!');
        }
      });
    } else if (state === false) {
      window.location = '/login.html';
    } else {
      window.location = '/index.html';
    }
  });
  
  signout_button.onclick = function(e) {
    e.preventDefault();
    state = true;
    auth.signOut();
  }
  
  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      ms = parseInt(timer % 100, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      
      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  
  simulator.onclick = function(e) {
    var fiveMinutes = 60 * 2 + 23, display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
  }
});
