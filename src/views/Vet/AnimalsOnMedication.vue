<template>
    <div class="container mx-auto px-4">  
      <!-- Navigation and content layout -->
      <div class="flex">
        <div class="w-1/6 text-white p-4 rounded-l-lg">
      <VetNavigation class="w-1/6" />
  
    </div>
  
        
       
        <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Animals On Medication</h1>

      <button   @click="add = true" type="button" class="block   mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
          <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>

              </svg>
        <span class="block text-sm font-bold mx-2  ">Add Medicines</span>
        </button>
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label for="nameOfMedicines" class="block text-sm font-bold mb-2">Name:</label>
          <select v-model="filters.nameOfMedicines" id="nameOfMedicines" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="nameOfMedicine in nameOfMedicines" :key="nameOfMedicine" :value="nameOfMedicine">{{ nameOfMedicine }}</option>
          </select>
        </div>
        <div>
          <label for="vetUsername" class="block text-sm font-bold mb-2">Vet:</label>
          <select v-model="filters.vetUsername" id="vetUsername" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="vetUsername in vetUsername" :key="vetUsername" :value="vetUsername">{{ vetUsername }}</option>
          </select>
        </div>
        <div>
          <label for="usage" class="block text-sm font-bold mb-2">Usage:</label>
          <select v-model="filters.usage" id="usage" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="usage in usage" :key="usage" :value="usage">{{ usage }}</option>
          </select>
        </div>
       
      </div>
      <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
        <table class="min-w-full leading-normal ">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-sm font-bold text-white uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-sm font-bold text-white uppercase tracking-wider">Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-sm font-bold text-white uppercase tracking-wider">Descriptio</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-sm font-bold text-white uppercase tracking-wider">Vet</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-sm font-bold text-white uppercase tracking-wider">Amount Of Medicine</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-sm font-bold text-white uppercase tracking-wider">Medication Intake</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-sm font-bold text-white uppercase tracking-wider">Frequency Of Medication Use</th>
          
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" :class="{  'cursor-not-allowed opacity-50': item.usage==false}"  class="border-b border-customBlack cursor-pointer" >
              <td class="px-5 py-5 text-sm font-bold text-left">
                    <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                </td>
              <td class="px-5 py-5 text-sm font-bold text-center">{{ item.nameOfMedicines }}</td>
              <td class="px-5 py-5 text-sm font-bold text-center">{{ item.description }}</td>
              <td class="px-5 py-5 text-sm font-bold text-center">{{ item.vetUsername }}</td>
              <td class="px-5 py-5 text-sm font-bold text-center" >{{ item.amountOfMedicine +item.mesurmentUnit }}</td>
              <td class="px-5 py-5 text-sm font-bold text-center">{{ item.medicationIntake }} </td>
              <td class="px-5 py-5 text-sm font-bold text-center">{{ item.frequencyOfMedicationUse }}</td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </div>
 <!-- Main modal -->
<div  v-if="add" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Create New Product
                </h3>
                <button @click="add = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input v-model="nameAdd" type="text" name="name" id="name" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
                    </div>



                            <div class="col-span-2 sm:col-span-1">
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vetenerian:</label>
                            <div class="flex items-center">
                            <input type="text" id="username" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" v-model="username"/>
                             <div class="ml-2">
                            <svg v-if="this.userExists && this.userExists!=null && this.username" class="w-5 h-5 fill-[#FFFD00]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                            </svg>
                            <svg v-if="!this.userExists  && this.userExists!=null && this.username" class="w-5 h-5 fill-[#e00000]" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                            </svg>
                            </div>
                            </div>
                            </div>

                            <div class="col-span-2 sm:col-span-1">
                              <label for="checkUser" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Check</label>
                            <svg @click="checkUser" class="w-10 h-10 text-white dark:text-white cursor-pointer fill-[#737373]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24">
                              <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                            </svg>        
                           </div>

                            <div class="col-span-2 sm:col-span-1">
                            <label for="code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Animal code:</label>
                            <div class="flex items-center">
                            <input type="text" id="code" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" v-model="code"/>
                             <div class="ml-2">
                            <svg v-if="this.animalExists && this.animalExists!=null && this.code" class="w-5 h-5 fill-[#FFFD00]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                            </svg>
                            <svg v-if="!this.animalExists  && this.animalExists!=null && this.code" class="w-5 h-5 fill-[#e00000]" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                            </svg>
                            </div>
                            </div>
                            </div>
                            
                            <div class="col-span-2 sm:col-span-1">
                              <label for="checkAnimal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Check</label>      
                              <svg @click="checkAnimal" class="w-8 h-8 ml- text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                              </svg>

                            </div>



                



                    <div class="col-span-2 sm:col-span-1">
                        <label for="amountOfMdicine" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount Of Medicine</label>
                        <input   v-model="amountOfMedicineAdd" step="0.001" type="number" name="amountOfMdicine" id="amountOfMdicine" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0.25" >
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="mesurmentUnit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mesurment Unit</label>
                        <input v-model="mesurmentUnitAdd" type="text" name="mesurmentUnit" id="mesurmentUnit" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0.25" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="intake" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medication Intake</label>
                        <input v-model="intakeAdd" type="number" name="intake" id="intake" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0.25" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frequency</label>
                        <select v-model="selected" id="category" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option disabled  value="">Select Frequency</option>
                            <option value="Daily">Daily</option>
                            <option value="Weakly">Weakly</option>
                            <option value="Montly">Montly</option>
                            <option value="Yearly">Yearly</option>
                        </select>
                    </div>
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                        <textarea v-model="descriptionAdd" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Write product description here"></textarea>                    
                    </div>
                </div>
                <button @click="handleSubmit" type="submit" class="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add new product
                </button>
              
            </form>
        </div>
    </div>
</div> 
  </template>
  
  <script>

import VetNavigation from '../Vet/VetNavigation.vue';
  import axios from 'axios';
  
  export default {
    components: {
      VetNavigation,
    },
    data() {
    return {
      add: false,
      single: false,
        singleName: '',
        singleDescriptio: '',
        singleVetUsername: '',
        singleAmountOfMedicine: '',
        singleMesurmentUnit: '',
        singleMedicationIntake: '',
        singleFrequencyOfMedicationUse: '',
        singleUsage: '',
        singleCode: '',

          nameAdd: '',
          amountOfMedicineAdd: '',
          mesurmentUnitAdd: '',
          intakeAdd: '',
          descriptionAdd: '',
      selected: '',
      code: '',
      items: [],
      nameOfMedicines: [],
      descriptio: [],
      vetUsername: [],
      amountOfMedicine: [],
      mesurmentUnit: [],
      medicationIntake: [],
      frequencyOfMedicationUse: [],
      usage:[],
      filters: {
        nameOfMedicines: '',
    
        vetUsername: '',
        usage: '',
      },
      isLoading: true, 
      userExists: null,
      animalExists: null,
      username: '',
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return (!this.filters.nameOfMedicines || item.nameOfMedicines === this.filters.nameOfMedicines) &&

               (!this.filters.vetUsername || item.vetUsername === this.filters.vetUsername) &&
               (!this.filters.usage || item.usage === this.filters.usage);
      });
    },
  },
  mounted() {
    this.fetchData();
  },
  /**{ 
 
    "animalId": 2,
    "nameOfMedicines": "Medicines",
    "description": "First Vet Visit",
    "VetUsername": "tamara",
    "AmountOfMedicine": 0.25,
    "MesurmentUnit": "mg",
    "MedicationIntake": 1,
    "FrequencyOfMedicationUse": "Daly",
    "Usage": true

 }
 */
  methods: {


    async openSinglModal(item) {
      this.single = true;
      this.singleCode = item.animalId;
      this.singleName = item.nameOfDesissse;
      this.singleDate = item.date.split('T')[0]; // Extract date part
      const animalResponse = await axios.get(`https://localhost:5001/api/animal/allanimal/${this.singleCode}`);
          const animalData = animalResponse.data;
        this.singleAnimalName=animalData.name;
        console.log("Id animal:"+this.singleAnimalName); 
    },

    async handleSubmit(){
   try{
     const response = await axios.post('https://localhost:5001/api/animal/addMedicines',{
      animalId:this.registerId,
      nameOfMedicines:this.nameAdd,
      description:this.descriptionAdd,
      vetUsername:this.username,
      amountOfMedicine:this.amountOfMedicineAdd,
      mesurmentUnit:this.mesurmentUnitAdd,
      medicationIntake:this.intakeAdd,
      frequencyOfMedicationUse:this.selected,
      usage:true
                 

     },
     {
         headers: {
           Authorization: `Bearer ${this.token}`,  
   
         },
       }
   
   );
   alert("Item added!");
   Swal.fire({
           title: "Item added!",
           draggable: true,
           icon: "success"
         });
   window.location.reload();
 }
   catch(error){
    console.log("Name:"+this.nameAdd);
    console.log("Description:"+this.descriptionAdd);
    console.log("Vet:"+this.username);
    console.log("Amount:"+this.amountOfMedicineAdd);
    console.log("Mesurment:"+this.mesurmentUnitAdd);
    console.log("Intake:"+this.intakeAdd);
    console.log("Frequency:"+this.selected);
    console.log("Usage:"+true);

alert("There was an error!");
     console.error('There was an error!', error);
     Swal.fire({
           title: "Ooops!",
           text: "There was an error!",
           draggable: true,
           icon: "error"
         });

   }
   
   },




   async checkAnimal() {
   try{
        const animalResponse = await axios.get(`https://localhost:5001/api/animal/allanimal/${this.code}`);
        const animalData = animalResponse.data;
        
      this.registerId=animalData.idAnimal;
      console.log("Id animal:"+this.registerId);
       
        if(this.registerId!=null){
          this.animalExists=true;
        }
        else{
          this.animalExists=false;
        }
   }
   catch (error) {this.animalExists=false}
      
    },






    async checkUser() {
   try{
        const userResponse = await axios.get(`https://localhost:5001/api/auth/getUserByUsername/${this.username}`);
        const userData = userResponse.data;
        
      this.registerId=userData.id;
      console.log(this.registerId);
       
        if(this.registerId!=null){
          this.userExists=true;
        }
   }
   catch (error) {this.userExists=false}
      
    },

     formatDateTime() {
      if (this.date && this.time) {
        this.formattedDateTime = `${this.date}T${this.time}:00.0000000`;
        console.log(formattedDateTime);
      }
    },
    async fetchData() {
      try {
        const response = await axios.get('https://localhost:5001/api/animal/medicines_db');
        this.items = response.data;
        console.log(this.items);
        this.populateFilters();
        this.isLoading = false;
      } catch (error) {
        console.error('There was an error!', error);
        this.isLoading = false;
      }
    },
    populateFilters() {
      this.nameOfMedicines = [...new Set(this.items.map(item => item.nameOfMedicines))];
      this.vetUsername = [...new Set(this.items.map(item => item.vetUsername))];
      this.usage = [...new Set(this.items.map(item => item.usage))];
   
    },
    navigateToDetails(id) {
      this.$router.push(`/singleAnimalOnMedication/${id}`);
    },
   
  },
  watch: {
    filters: {
      handler() {
        this.filteredItems = this.items.filter(item => {
          return (
            (!this.filters.nameOfMedicines || item.NameOfMedicines === this.filters.nameOfMedicines) &&
            (!this.filters.vetUsername || item.VetUsername === this.filters.vetUsername) &&
   
            (!this.filters.usage || item.Usage === this.filters.usage)
          );
        });
      },
      deep: true,
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
  