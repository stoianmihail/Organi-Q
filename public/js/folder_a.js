let fileTreeAll = function() {
      return {
          levels: [
              {
                  title: 'root_pentacene/',
                  children: [
                      {
                          title: 'qsim_input/',
                          children: [
                              {
                                title: 'run/',
                                children: [
                                  {
                                    title: 'FORMATS.input',
                                  },
                                  {
                                    title: 'QRUN.input',
                                  },
                                ],
                              },
                              {
                                title: 'structure/',
                                children: [
                                  {
                                    title: 'STRUCT.fdf',
                                  }
                                ],
                              },
                              {
                                title: 'hamiltonian/',
                                children: [
                                  {
                                    title: 'H_pentacene.TSHS',
                                  }
                                ],
                              },
                              {
                                title: 'phonons/',
                                children: [
                                  {
                                    title: 'dyn_matrix.dat',
                                  }
                                ],
                              }
                          ],
                      },
                      {
                          title: 'mc_input/',
                          children: [
                              {
                                title: 'run/',
                                children: [
                                  {
                                    title: 'MCRUN.input',
                                  }
                                ],
                              },
                              {
                                title: 'hopping/',
                                children: [
                                  {
                                    title: 'prop_kernel.dat',
                                  }
                                ],
                              }
                          ],
                      },
                      {
                          title: 'mc_output/',
                          children: [
                              {
                                title: 'mobilities.dat',
                              }
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
