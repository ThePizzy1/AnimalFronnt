<template>
  <div class="flex">
    <div class="w-1/6 text-stone-200 p-4 rounded-l-lg">
      <WorkerNavigation />
    </div>
    <div class="w-5/6 text-stone-200 p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Labs</h1>

      <button type="button" @click="addLab" class="mb-4 text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
        <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
        </svg>
        <span class="block text-base font-bold mx-2">Add Labs</span>
      </button>

      <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider">Animal Code</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider">Date</th>        
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id"   class="border-b border-customBlack cursor-pointer" >
              <td class="px-5 py-5 text-base font-bold text-center">
              <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-stone-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
               </svg>
              </td>
              <td class="px-5 py-5 text-base font-bold text-center">{{ item.animalId}}</td>
              <td class="px-5 py-5 text-base font-bold text-center">{{formatDate( item.dateTime) }}</td>
              <td class="px-5 py-5 text-base font-bold text-center">
                 <button @click="openUpdateModal(item)" type="button" class="mb-4 p-2 text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                   <svg class="w-5 h-5 fill-[#ffffff]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M17.44 3a1 1 0 0 1 .707.293l2.56 2.56a1 1 0 0 1 0 1.414L18.194 9.78 14.22 5.806l2.513-2.513A1 1 0 0 1 17.44 3Zm-4.634 4.22-9.513 9.513a1 1 0 0 0 0 1.414l2.56 2.56a1 1 0 0 0 1.414 0l9.513-9.513-3.974-3.974ZM6 6a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 0 1 0-2h1V7a1 1 0 0 1 1-1Zm9 9a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                     <path d="M19 13h-2v2h2v-2ZM13 3h-2v2h2V3Zm-2 2H9v2h2V5ZM9 3H7v2h2V3Zm12 8h-2v2h2v-2Zm0 4h-2v2h2v-2Z"/>
                   </svg>
                   <span class="block text-base font-bold mx-2 ">Update</span>
                   </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>






 <!-- Single item modal -->
 <div v-if="single" class="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center overflow-x-auto custom-scrollbar">
    <div class="relative  p-4 w-5xl h-full">
      <!-- Modal content -->
      <div class="relative bg-black rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-stone-200">
             Details
          </h3>
          <button @click="single = false" type="button" class="text-gray-400 bg-transparent hover:bg-white hover:text-gray-900 rounded-lg text-base w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-stone-200" data-modal-toggle="crud-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
                  <!-- Modal body -->
                  <form class="p-4 md:p-5">
                  <div class="grid gap-6 mb-4 grid-cols-6  sm:col-span-1 mb-4">
                    

                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Name</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{ this.itemAnimal.name }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <label for="animalName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Family</label>
                      <span type="text" id="animalName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ itemAnimal.family }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Species</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.species }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Subspecies</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.subspecies }}
                    </span>
                    </div>
                   

                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Gender</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.gender }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Age</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.age }} years
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Weight</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.weight }} kg
                    </span>
                    </div>
                    
                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Hight</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.height }} cm
                    </span>
                    </div>
                    
                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Lenght</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.length }} cm
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="this.itemAnimal.neutered" class="sr-only peer" disabled>
                        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                        <span class="ms-3 text-base font-medium text-gray-900  dark:text-stone-200">Neutered</span>
                      </label>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemAnimal.vaccinated" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-base font-medium text-gray-900  dark:text-stone-200">Vaccinated</span>
                  </label>
                </div>
              
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemAnimal.trained" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-base font-medium text-gray-900  dark:text-stone-200">Trained</span>
                  </label>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemAnimal.socialized" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-base font-medium text-gray-900  dark:text-stone-200">Socialized</span>
                  </label>
                </div>  
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemAnimal.microchipped" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-base font-medium text-gray-900  dark:text-stone-200">Microchipped</span>
                  </label>
                </div>
                  </div>
                  <div class="relative py-4">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-b border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center">
                      <span class="bg-black px-4 text-base text-gray-500">Biometrics</span>
                    </div>
                  </div>
                  <div class="overflow-x-auto  sm:rounded-lg mt-4 ">
                   
        <table class="min-w-full leading-normal ">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-gray-500  bg-white text-center text-base font-bold text-gray-600 uppercase tracking-wider">Name</th>
              <th class="px-5 py-3 border-b-2 border-gray-500  bg-white  text-center text-base font-bold text-gray-600 uppercase tracking-wider">Value</th>
              <th class="px-5 py-3 border-b-2 border-gray-500  bg-white text-center text-base font-bold text-gray-600 uppercase tracking-wider">Remarks</th>        
            </tr>
          </thead>
          <tbody>
            <tr v-for="itemp in itemsParm" :key="itemp.id"   class="border-b-2 border-gray-400 cursor-pointer" >
              <td class="px-5 py-5 text-base font-bold text-gray-600 text-center">{{ itemp.parameterName}}</td>
              <td class="px-5 py-5 text-base font-bold text-gray-600 text-center">{{ itemp.parameterValue + itemp.measurementUnits}}</td>
              <td class="px-5 py-5 text-base font-bold text-gray-600 text-center">{{itemp.remarks}}</td>
       
            </tr>
          </tbody>
        </table>
      </div>
        </form>
      </div>
    </div>
  </div>









</template>

<script>

import WorkerNavigation from '../Vet/VetNavigation.vue';
import instance from '@/axiosBase';
import {ref, onMounted} from 'vue';
 import Swal from 'sweetalert2'
import AddLab from './AddLab.vue';
export default {
  components: {
    WorkerNavigation,
  },
  data() {
    return {
      registerId:"",
      update:false,
      single: false,
      singleDate:"",
      animalID:"",
      labid:"",
      isEditing: true,
      itemAnimal:[],
      items: [],
      itemsParm:[],
    };
  },


  mounted() {
       this.fetchData();    
},
  methods: {  
  addLab(){
this.$router.push('/addLab');
  },
  async openSinglModal(item) {
      this.single = true;
      this.singleDate = item.dateTime;
      this.singleDate = item.date; 
      this.animalID=item.animalId;
      this.labid=item.id;
      console.log("Id animal: "+this.animalID);
      const responseparm =await instance.get(`animal/parameter_db/${this.labid}`);
      this.itemsParm=responseparm.data;
      const animalResponse = await instance.get(`animal/animal/${this.animalID}`);
      this.itemAnimal = animalResponse.data;
    },
    async fetchData() {
      try {
        const response = await instance.get('animal/labs_db');
        this.items = response.data;
        
      } catch (error) {
        console.error('There was an error!', error);
      }},
        formatDate(date) {
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          return new Date(date).toLocaleDateString(undefined, options);
        },
  },

 
};
</script>


























  <style scoped>

  .container {
    color: white;
    font-family: 'Poppins', sans-serif;
  }
  .sticky-content {
      float: right;
      margin-left: 20px;
  }
  </style>
  