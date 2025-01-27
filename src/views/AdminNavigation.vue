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

<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
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
              <router-link to="" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                <span class="ms-3">Veterinarinans</span>
              </router-link>
            </li>
            <li>
              <router-link to="/adminAdopted" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                <span class="ms-3">Workers</span>
              </router-link>
            </li>
            <li>
              <router-link to="/adminRaturnd" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
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
