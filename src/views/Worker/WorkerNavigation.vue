<template>
    <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div class="h-full px-3 py-4 overflow-y-auto bg-black text-white">
        <div class="flex flex-shrink-0 items-center mb-10">
       <img class="h-16 w-auto" src="/luna1.png" alt="Your Company" />
      <div class="w-full lg:w-8/12 ">
      <h1 class="text-base lg:text-base   text-customGreen ">LUNA</h1>
      <h2 class="text-base lg:text-base text-customGreen">Animal Rescue WORKER</h2>
    
    </div>
    </div>
        <ul class="space-y-2 font-medium">


          <li>
              <router-link to="/workerProfile" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                <svg class="w-6 h-6 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
            </svg>

                <span class="ms-3">Profile Worker</span>
              </router-link>
            </li>



          <li>
             <router-link to="/workerAnimals" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                              <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"></path>

                </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Animals</span>
               </router-link>
             </li>
             <li>
              <router-link to="/userAddAnima" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                <svg class="w-5 h-5 fill-[#fcfcfc]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
                  </svg>
                <span class="ms-3">Add Animals</span>
              </router-link>
            </li>



             <li>
             <router-link to="/foodInventory" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
              <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path d="M346.7 6C337.6 17 320 42.3 320 72c0 40 15.3 55.3 40 80s40 40 80 40c29.7 0 55-17.6 66-26.7c4-3.3 6-8.2 6-13.3s-2-10-6-13.2c-11.4-9.1-38.3-26.8-74-26.8c-32 0-40 8-40 8s8-8 8-40c0-35.7-17.7-62.6-26.8-74C370 2 365.1 0 360 0s-10 2-13.3 6zM244.6 136c-40 0-77.1 18.1-101.7 48.2l60.5 60.5c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-55.3-55.3 0 .1L2.2 477.9C-2 487-.1 497.8 7 505s17.9 9 27.1 4.8l134.7-62.4-52.1-52.1c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L199.7 433l100.2-46.4c46.4-21.5 76.2-68 76.2-119.2C376 194.8 317.2 136 244.6 136z"></path>

              </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Food Inventory</span>
               </router-link>
             </li>
             <li>
             <router-link to="/toyInventory" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
              <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">

                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"></path>

                </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Toy Inventory</span>
               </router-link>
             </li>
         
           
        <li>
             <router-link to="/news" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
              <svg class="w-5 h-5 fill-[#fcfcfc]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M512 416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24V312h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H280V200c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H168c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"></path>
                </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">News</span>
               </router-link>
             </li>
             <li>
             <router-link to="/contactWorker" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
              <svg class="w-5 h-5 text-gray-800 dark:text-white fill-[#ffffff]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
              </svg>

               <span class="flex-1 ms-3 whitespace-nowrap">Contact</span>
               </router-link>
             </li>
            
           <li >
             <router-link to="/balans"  :class="{ 'cursor-allowed opacity-100': checkMenager==true,   'invisible cursor-not-allowed opacity-50': checkMenager==false}" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
              <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
              </svg>

               <span class="flex-1 ms-3 whitespace-nowrap">Balans</span>
               </router-link>
             </li>

      </ul>
        <router-link to="/" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-base text-gray-700']">Sign out</router-link>
    </div>
    </aside>
  </template>
  
  <script>
  localStorage.getItem('userRole');
  export default {
    data() {
      return {
        role: localStorage.getItem('userRole') || 'Menager', 
       
        dropdowns: {
          animals: false,
         
        },
      };
    },
    computed:{
      checkMenager(){
            if(this.role==='Menager'){
              
            return true;
            }
            else{
              return false;
            }
          }
    },
    methods: {
      toggleDropdown(dropdown) {
        this.dropdowns[dropdown] = !this.dropdowns[dropdown];
      },
    
    },

    
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  