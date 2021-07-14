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
  
  var signin = document.getElementById("signin");
  var signup = document.getElementById("signup");
  var signin_login_button = document.getElementById("signin-login-button");
  var signin_register_button = document.getElementById("signin-register-button");
  var signup_register_button = document.getElementById("signup-register-button");

  var username = null;
  function getAttributes(type) {
    var dict = {}
    dict["email"] = document.getElementById(type + "-email").value;
    if (type !== "reset") {
      dict["password"] = document.getElementById(type + "-password").value
    }
    if (type === "signup") {
			dict["username"] = document.getElementById(type + "-username").value;
    }
    return dict;
  }

  function handleForm(type) {
    let attr = getAttributes(type);
    if (type === "signin") {
      console.log(attr);
      const promise = auth.signInWithEmailAndPassword(attr["email"], attr["password"]);
      promise.catch(e => console.log(e.message));
    } else if (type == "signup") {
      username = attr["username"]
      const promise = auth.createUserWithEmailAndPassword(attr["email"], attr["password"]);
      promise.catch(e => console.log(e.message));
    } else {
      console.log("Not supported!")
    }
  }
  
  function register(uid) {
    db.child("users/" + uid).once("value", snapshot => {
      if (snapshot.exists()) {
        window.location = "simulate.html"
      } else {
				// Sign up? Check for username
        if (username === null) {
          console.log("No username found!");
        } else {
          db.child("users/" + uid).set({
            username: username,
					}).then(ret => {
            window.location = "simulate.html";
          }).catch(err => {
            console.error(err);
          });
        }
      }
    });
  }
  
  signin_login_button.onclick = function(e) {
    e.preventDefault();
    handleForm("signin");
  }
  
  signin_register_button.onclick = function(e) {
    e.preventDefault();
    signin.classList.add('hide');
    signup.classList.remove('hide');
  }
  
  signup_register_button.onclick = function(e) {
    e.preventDefault();
    handleForm("signup");
  }
  
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log("inside");
      register(firebaseUser.uid);
    } else {
      console.log("not!");
    }
  });
});
