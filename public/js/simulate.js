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
  
  var term = null;
  function buildTerminal() {
    term = new VanillaTerminal({
      welcome: 'Welcome to <a href="">Organi-Q</a> terminal!',
      commands: {
        flavour: (terminal) => {
          terminal.output('There is only one flavour for your favorite🍦and it is <b>vanilla<b>.')
          terminal.setPrompt('@soyjavi <small>❤️</small> <u>vanilla</u> ');
        },

        async: (terminal) => {
          terminal.idle();
          setTimeout(() => terminal.output('Async 300'), 300);
          setTimeout(() => terminal.output('Async 1300'), 1300);
          setTimeout(() => {
            terminal.output('Async 2000');
            terminal.setPrompt();
          }, 2000);
        },
      },

      // welcome: 'Welcome...',
      // prompt: 'soyjavi at <u>Macbook-Pro</u> ',
      separator: '$',
    });

    term.onInput((command, parameters) => {
      console.log('⚡️onInput', command, parameters);
    });
  
    term.setPrompt(`${username}`);
    
    /*
    term.prompt('Your name', (name) => {
      term.output(`Hi ${name}!`);
      term.setPrompt(`${name} `);
    });
    */
  }
  
  // Continous check.
  var state = false;
  var username = null;
  auth.onAuthStateChanged(firebaseUser => {
    console.log(firebaseUser)
    console.log("state: " + state);
    if (firebaseUser) {
      db.child('users/' + firebaseUser.uid).once('value', snapshot => {
        if (snapshot.exists()) {
          username = snapshot.val().username;
          buildTerminal();
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
