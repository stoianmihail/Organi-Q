document.addEventListener('DOMContentLoaded', (event) => {
  var config = {
      apiKey: "AIzaSyDZ61I9wPnYLgK9RxaKWwnzHEyPp57vy2Y",
      authDomain: "meet-organi-q.firebaseapp.com",
      databaseURL: "https://meet-organi-q-default-rtdb.firebaseio.com",
			storageBucket: "meet-organi-q.appspot.com"  
  };
  firebase.initializeApp(config);

  const db = firebase.database().ref();
  const auth = firebase.auth();
  
  let menuIcon = document.querySelector('.menuIcon');
  let nav = document.querySelector('.overlay-menu');

  menuIcon.addEventListener('click', () => {
      if (nav.style.transform != 'translateX(0%)') {
          nav.style.transform = 'translateX(0%)';
          nav.style.transition = 'transform 0.2s ease-out';
      } else { 
          nav.style.transform = 'translateX(-100%)';
          nav.style.transition = 'transform 0.2s ease-out';
      }
  });

  // Toggle Menu Icon ========================================
  let toggleIcon = document.querySelector('.menuIcon');

  toggleIcon.addEventListener('click', () => {
      if (toggleIcon.className != 'menuIcon toggle') {
          toggleIcon.className += ' toggle';
      } else {
          toggleIcon.className = 'menuIcon';
      }
  });
 
  // Choose the redirection.
  let simulate = document.getElementById("simulate");
  simulate.addEventListener('click', e => {
    e.preventDefault();
    var user = firebase.auth().currentUser;
    if (user) {
      window.location = '/simulate.html';
    } else {
      window.location = '/login.html';
    }
  });
  
  var mainSignin = document.getElementById("main-signin-button");
  var mainSignout = document.getElementById("main-signout-button");
  
  mainSignin.onclick = function(e) {
    e.preventDefault();
    window.location = '/login.html';
  }
  
  mainSignout.onclick = function(e) {
    auth.signOut();
    window.location = '/index.html';
  }
  
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      mainSignin.classList.add('hide');
      mainSignout.classList.remove('hide');
    } else {
      mainSignin.classList.remove('hide');
      mainSignout.classList.add('hide');
    }
  });
});
