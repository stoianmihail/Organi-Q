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
  
  function exportData() {
    document.getElementById("text").innerHTML = `Done!`;
    document.getElementById("bubbles").classList.add("hide");
  }
  
  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    id = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      ms = parseInt(timer % 100, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      
      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(id);
        return exportData();
        timer = duration;
      }
    }, 1000);
  }
  
  simulator.onclick = function(e) {
    document.getElementById("countdown").classList.remove("hide");
    document.getElementById("text").innerHTML = `Simulating..`;
    var fiveMinutes = 10;//60 * 2 + 23;
    var display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
  }
});


let fileTree = function() {
      return {
          levels: [
              {
                  title: 'Organi-Q',
                  children: [
                      {
                          title: 'README.md',
                      },
                      {
                          title: 'OLEDs/',
                          children: [
                              {
                                  title: 'results.json',
                              },
                              {
                                  title: 'paper-oled.pdf',
                              },
                          ],
                      },
                      {
                          title: 'Company/',
                          children: [
                              {
                                  title: 'TODO.md',
                              },
                              {
                                  title: 'task.pdf',
                              },
                              {
                                  title: 'improvements.json',
                              },
                          ],
                      },
                  ],
              },
          ],
          renderLevel: function(obj,i){
              let ref = 'l'+Math.random().toString(36).substring(7);
              let html = `<a href="#" class="block px-5 py-1 hover:text-gray-900" :class="{'has-children':level.children}" x-html="(level.children?'<i class=\\'mdi mdi-folder-outline text-orange-500\\'></i>':'<i class=\\'mdi mdi-file-outline text-gray-600\\'></i>')+' '+level.title" ${obj.children?`@click.prevent="toggleLevel($refs.${ref})"`:''}></a>`;

              if(obj.children) {
                  html += `<ul style="display:none;" x-ref="${ref}" class="pl-5 pb-1 transition-all duration-1000 opacity-0">
                          <template x-for='(level,i) in level.children'>
                              <li x-html="renderLevel(level,i)"></li>
                          </template>
                      </ul>`;
              }

              return html;
          },
          showLevel: function(el) {
              if (el.style.length === 1 && el.style.display === 'none') {
                  el.removeAttribute('style')
              } else {
                  el.style.removeProperty('display')
              }
              setTimeout(()=>{
                  el.previousElementSibling.querySelector('i.mdi').classList.add("mdi-folder-open-outline");
                  el.previousElementSibling.querySelector('i.mdi').classList.remove("mdi-folder-outline");
                  el.classList.add("opacity-100");
              },10)
          },
          hideLevel: function(el) {
              el.style.display = 'none';
              el.classList.remove("opacity-100");
              el.previousElementSibling.querySelector('i.mdi').classList.remove("mdi-folder-open-outline");
              el.previousElementSibling.querySelector('i.mdi').classList.add("mdi-folder-outline");

              let refs = el.querySelectorAll('ul[x-ref]');
              for (var i = 0; i < refs.length; i++) {
                  this.hideLevel(refs[i]);
              }
          },
          toggleLevel: function(el) {
              if( el.style.length && el.style.display === 'none' ) {
                  this.showLevel(el);
              } else {
                  this.hideLevel(el);
              }
          }
      }
  }
