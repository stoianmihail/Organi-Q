window.onload = (event) => {

        console.log(window.innerWidth, window.innerHeight);



        //create
        for (var i = 0; i < (10 - Math.floor(Math.random() * 6)); i++) {
            var btn = document.createElement("div");
            btn.className = `circle`
            //width
            btn.style.width = `${Math.abs(Math.floor(Math.random() * window.innerWidth-innerHeight))}px`;
            btn.style.width = `${Math.abs(Math.floor(Math.random() * window.innerWidth-innerHeight))}px`;
            //position
            btn.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
            btn.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
            //color
            btn.style.background = ` rgba( ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 170)}, ${Math.floor(Math.random() * 180)}, 0.8) `;
            btn.style.zIndex = `-2`;
            //opacity
            //btn.style.opacity = `0.${100 - Math.floor(Math.random() * 100)}`;
            //animations
            btn.animate([
                // keyframes
                { left: `${Math.floor(Math.random() * window.innerWidth)}px`,
                   top: `${Math.floor(Math.random() * window.innerHeight)}px`,
                   transform: `scale(1.${Math.floor(Math.random() * 100)})`
              
                 },
                 { left: `${Math.floor(Math.random() * window.innerWidth)}px`,
                   top: `${Math.floor(Math.random() * window.innerHeight)}px`,
                   transform: `scale(0.${100 - Math.floor(Math.random() * 100)})`
                   
                 },
                 { left: `${Math.floor(Math.random() * window.innerWidth)}px`,
                   top: `${Math.floor(Math.random() * window.innerHeight)}px`,
                   transform: `scale(1.${Math.floor(Math.random() * 100)})`
                 },
                { left: `${Math.floor(Math.random() * window.innerWidth)}px`,
                   top: `${Math.floor(Math.random() * window.innerHeight)}px`,
                   transform: `scale(1.${Math.floor(Math.random() * 100)})`
              
                 },
               
            ], {
                // timing options
                duration: 30000,
                iterations: Infinity
            });
            document.body.appendChild(btn);

        }


    };