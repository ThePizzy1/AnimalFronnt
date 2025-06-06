<template>
  <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-black text-white">
      <div class="flex flex-shrink-0 items-center mb-10">
     <img class="h-16 w-auto" src="/luna1.png" alt="Your Company" />
    <div class="w-full lg:w-8/12 ">
    <h1 class="text-base lg:text-base   text-customGreen ">LUNA</h1>
    <h2 class="text-sm lg:text-sm text-customGreen">Animal Rescue</h2>
  
  </div>
  </div>
      <ul class="space-y-2 font-medium">
        <li>
          <router-link to="/adminHome" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
            <svg class="w-5 h-5 transition duration-75 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21" aria-hidden="true">
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
            </svg>
            
            <span class="ms-3">Home</span>
          </router-link>
        </li>
        <li>
          <div class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 group" @click="toggleDropdown('animals')">
            <div class="flex items-center">
              <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"></path>
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Animals</span>
            </div>
            <svg class="w-4 h-4 transition-transform transform" :class="{ 'rotate-180': dropdowns.animals }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
          <ul v-show="dropdowns.animals" class="pl-4 space-y-2">
            <li>
              <router-link to="/search" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                <span class="ms-3">Search</span>
              </router-link>
            </li>
            <li>
              <router-link to="/adminAdd" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                <span class="ms-3">Add</span>
              </router-link>
            </li>
            <li>
              <router-link to="/adminAdopted" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                <span class="ms-3">Adopted</span>
              </router-link>
            </li>
            <li>
              <router-link to="/adminRaturnd" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                <span class="ms-3">Returned</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li>
          <div class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 group" @click="toggleDropdown('users')">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>

              <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
            </div>
            <svg class="w-4 h-4 transition-transform transform" :class="{ 'rotate-180': dropdowns.animals }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
          <ul v-show="dropdowns.users" class="pl-4 space-y-2">
            <li>
              <router-link to="/adminUsers" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                <span class="ms-3">Adopters</span>
              </router-link>
            </li>
            <li>
              <router-link to="/adminVete" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                <span class="ms-3">Veterinarinans</span>
              </router-link>
            </li>
            <li>
              <router-link to="/adminWorkers" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                <span class="ms-3">Workers</span>
              </router-link>
            </li>
            <li>
              <router-link to="/adminSurenderers" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                <span class="ms-3">Surenderers</span>
              </router-link>
            </li>
          </ul>
        </li>
              <li>
            <router-link to="/addUsers" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Add User</span>
            </router-link>
          </li>

        <li >
             <router-link to="/balans"  :class="{ 'cursor-allowed opacity-100': checkMenager==true,   'cursor-not-allowed opacity-50': checkMenager==false}" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
              <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
              </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Balans</span>
               </router-link>
           </li>
           <li>
             <router-link to="/funds"  :class="{ 'cursor-allowed opacity-100': checkMenager==true,   'invisible cursor-not-allowed opacity-50': checkMenager==false}" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
              <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M326.7 403.7c-22.1 8-45.9 12.3-70.7 12.3s-48.7-4.4-70.7-12.3c-.3-.1-.5-.2-.8-.3c-30-11-56.8-28.7-78.6-51.4C70 314.6 48 263.9 48 208C48 93.1 141.1 0 256 0S464 93.1 464 208c0 55.9-22 106.6-57.9 144c-1 1-2 2.1-3 3.1c-21.4 21.4-47.4 38.1-76.3 48.6zM256 91.9c-11.1 0-20.1 9-20.1 20.1v6c-5.6 1.2-10.9 2.9-15.9 5.1c-15 6.8-27.9 19.4-31.1 37.7c-1.8 10.2-.8 20 3.4 29c4.2 8.8 10.7 15 17.3 19.5c11.6 7.9 26.9 12.5 38.6 16l2.2 .7c13.9 4.2 23.4 7.4 29.3 11.7c2.5 1.8 3.4 3.2 3.7 4c.3 .8 .9 2.6 .2 6.7c-.6 3.5-2.5 6.4-8 8.8c-6.1 2.6-16 3.9-28.8 1.9c-6-1-16.7-4.6-26.2-7.9l0 0 0 0 0 0c-2.2-.7-4.3-1.5-6.4-2.1c-10.5-3.5-21.8 2.2-25.3 12.7s2.2 21.8 12.7 25.3c1.2 .4 2.7 .9 4.4 1.5c7.9 2.7 20.3 6.9 29.8 9.1V304c0 11.1 9 20.1 20.1 20.1s20.1-9 20.1-20.1v-5.5c5.3-1 10.5-2.5 15.4-4.6c15.7-6.7 28.4-19.7 31.6-38.7c1.8-10.4 1-20.3-3-29.4c-3.9-9-10.2-15.6-16.9-20.5c-12.2-8.8-28.3-13.7-40.4-17.4l-.8-.2c-14.2-4.3-23.8-7.3-29.9-11.4c-2.6-1.8-3.4-3-3.6-3.5c-.2-.3-.7-1.6-.1-5c.3-1.9 1.9-5.2 8.2-8.1c6.4-2.9 16.4-4.5 28.6-2.6c4.3 .7 17.9 3.3 21.7 4.3c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-4.4-1.2-14.4-3.2-21-4.4V112c0-11.1-9-20.1-20.1-20.1zM48 352H64c19.5 25.9 44 47.7 72.2 64H64v32H256 448V416H375.8c28.2-16.3 52.8-38.1 72.2-64h16c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V400c0-26.5 21.5-48 48-48z"></path>
                </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Funds</span>
               </router-link>
             </li>
           <li >
             <router-link to="/transactions"  :class="{ 'cursor-allowed opacity-100': checkMenager==true,   'cursor-not-allowed opacity-50': checkMenager==false}" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
              <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M2 7c0-1.10457.89543-2 2-2h16c1.1046 0 2 .89543 2 2v4c0 .5523-.4477 1-1 1s-1-.4477-1-1v-1H4v7h10c.5523 0 1 .4477 1 1s-.4477 1-1 1H4c-1.10457 0-2-.8954-2-2V7Z"/>
                  <path fill="currentColor" d="M5 14c0-.5523.44772-1 1-1h2c.55228 0 1 .4477 1 1s-.44772 1-1 1H6c-.55228 0-1-.4477-1-1Zm5 0c0-.5523.4477-1 1-1h4c.5523 0 1 .4477 1 1s-.4477 1-1 1h-4c-.5523 0-1-.4477-1-1Zm9-1c.5523 0 1 .4477 1 1v1h1c.5523 0 1 .4477 1 1s-.4477 1-1 1h-1v1c0 .5523-.4477 1-1 1s-1-.4477-1-1v-1h-1c-.5523 0-1-.4477-1-1s.4477-1 1-1h1v-1c0-.5523.4477-1 1-1Z"/>
                </svg>

               <span class="flex-1 ms-3 whitespace-nowrap">Transactions</span>
               </router-link>
           </li>
        <li>
            <router-link to="/statistic" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
              <svg class="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 17h3v4H3v-4zm5-6h3v10H8V11zm5-4h3v14h-3V7zm5-4h3v18h-3V3z"/>
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Statistics</span>
            </router-link>
          </li>
      </ul>
      <router-link to="/" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</router-link>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      dropdowns: {
        animals: false,
      },
    };
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
