<template>
    <div class="my-6 text-stone-200 items-center justify-center flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
      <!-- Adopter Details Panels -->
      <div class="w-full flex flex-col 2xl:w-5/6 space-y-4">
        <div class="flex-1 rounded-lg p-8">
                  
         <h4> <router-link to="/" :class="[active ? '' : '', 'flex items-center p-2 rounded-lg hover:shadow-lg group']" @click="logout">   
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            Log out </router-link></h4>
         
            <div class="shadow-2xl p-10 rounded-lg ">
            <div class=" p-10  rounded-lg w-full 2xl:w-3/6 mr-4 mt-8">
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
                <button type="submit" class="bg-green-700 hover:bg-green-900 text-stone-200 font-bold py-2 px-4 rounded whitespace-normal">
                  Save Changes
                </button>
              </div>
           
            </form>
           </div>
           <div class=" p-10  rounded-lg w-full 2xl:w-2/6 ">

           <img src="https://firebasestorage.googleapis.com/v0/b/animalrescue-fa5f9.appspot.com/o/s6.png?alt=media&token=3dcdc8fb-952a-41da-a13b-cda0ee3f6d34" alt="ContactUs tailwind section" class="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-gray-700"/>
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
//dekodiraj token u token ti piše sub to je ime korisnika, usrname, to povuci pošalji da dohvati podatke i tada
//dohvati token dekodiiraj ga i povuci podatke
//povuc pdatke o životinjama koe je predao
//o tokenu ti pišu stvari na loginu
  import instance from '@/axiosBase';
  export default {
    
    data() {
      return {
   
        items: [],
        animals: []       

      };
    },
    
    mounted() {
      this.fetchData();
    },
    methods: {
    
  
      async fetchData() {
        try {
          const userResponse = await instance.get(`auth/getUserByUsername`);
          this.items = response.data;
          console.log(this.items);
          this.populateFilters();
          
        } catch (error) {
          console.error('There was an error!', error);
          
        }
      },
      async fetchDataUser() {
        instance.get('animal/adopter_db')
        .then(response => {
          this.adopters = response.data.map(adopter => ({
            ...adopter,
            flagged: false, // Assume initially not flagged
          }));
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
      },
    
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },
    
    },

  };
  </script>
  
  <style scoped>
  /* Add styling as needed */
  </style>