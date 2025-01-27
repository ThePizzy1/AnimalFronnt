<template>
    <div class="my-6 text-white items-center justify-center flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
      <!-- Adopter Details Panels -->
      <div class="w-full flex flex-col 2xl:w-5/6 space-y-4">
        <div class="flex-1 rounded-lg p-8">
                  
         <h4> <router-link to="/" :class="[active ? '' : '', 'flex items-center p-2 rounded-lg hover:shadow-lg group']" @click="logout">   
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            Log out </router-link></h4>
          <div class="flex flex-col 2xl:flex-row">
          <!-- Panel 1 -->
          <div class="shadow-2xl p-10 shadow-xl rounded-lg w-full 2xl:w-3/6 mr-4">
            <h2 class="text-2xl font-bold mb-4">Personal info</h2>
            <div class="">
              <div class="flex border-b py-2">
                <span class="font-bold w-24">Username:</span>
                <span>{{  }}</span>
              </div>
              <div class="flex border-b py-2">
                <span class="font-bold w-24">Password:</span>
                <span>{{  }}</span>
              </div>
              <div class="flex border-b py-2">
                <span class="font-bold w-24">Role:</span>
                <span>{{  }}</span>
              </div>
              
            </div>
          </div>
            <div class="shadow-2xl p-10 shadow-xl rounded-lg w-full 2xl:w-3/6 mr-4 mt-8">
            <h2 class="text-2xl font-bold mb-4">Edit Personal Info</h2>
            <form @submit.prevent="submitEditForm" id="editForm">
              <!-- Input fields for editing -->
              <div class="flex border-b py-2">
                <label for="firstName" class="font-bold w-24">Username:</label>
                <input  class="rounded-lg p-2 text-gray-400" type="text" id="username" name="username" required>
              </div>
              <div class="flex border-b py-2">
                <label for="lastName" class="font-bold w-24">Password:</label>
                <input class="rounded-lg p-2 text-gray-400" type="text" id="password" name="password" required>
              </div>
              <!-- Save Changes button -->
              <div class="flex justify-end mt-4">
                <button type="submit" class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded whitespace-normal">
                  Save Changes
                </button>
              </div>
            </form>
          </div>




        </div>




 <!-- Panel 4 -->
 <div class="shadow-2xl p-10 shadow-xl rounded-lg 2xl:w-3/3">
            <h2 class="text-2xl font-bold mb-4">Animals</h2>
            <div v-for="adoption in adoption" :key="adoption.code" class="flex shadow-2xl p-6 mb-4 rounded-lg ">
              <div class="ml-10 grid grid-cols-4 gap-6">
                <!-- Prvi stupac -->
                <div class="col-span-1/4">
                  <h3 class="text-xl font-bold mb-2">{{ adoption.animal.name }}</h3>
                  <img v-if="adoption.animal.picture" class="w-40 h-40 rounded-xl" :src="'data:image/jpeg;base64,'+adoption.animal.picture" :alt="adoption.animal.name" />
                </div>
                <!-- Drugi stupac -->
                <div class="col-span-1/4 mt-6">
                  <div>
                    <p class="hidden"><span class="font-bold">Adopton code:</span> {{  }}</p>
                    <p class="hidden"><span class="font-bold">Id:</span> {{ }}</p>
                    <p><span class="font-bold">Family:</span> {{  }}</p>
                    <p><span class="font-bold">Subspecies:</span> {{  }}</p>
                    <p><span class="font-bold">Species:</span> {{  }}</p>
                    <p><span class="font-bold">Age:</span> {{ }}</p>
                    <p><span class="font-bold">Gender:</span> {{ }}</p>
                  </div>
                </div>
              
               
                    
                 </div>

            </div>
        </div>





















    </div>
</div>
 
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  import Loading from './Loading.vue'; // Import the Loading component
  import { ref } from 'vue';
  
  const token = ref(localStorage.getItem('token'));
  

  </script>
  
  <style scoped>
  /* Add styling as needed */
  </style>