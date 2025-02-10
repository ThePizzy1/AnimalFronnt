<template>
    <div class="container mx-auto px-4">  
      <!-- Navigation and content layout -->
      <div class="flex">
        <div class="w-1/6 text-white p-4 rounded-l-lg">
      <VetNavigation class="w-1/6" />
  
    </div>
  
        
       
        <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Animals On Medication</h1>

      <button   @click="add = true" type="button" class="block  mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
          <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>

              </svg>
        <span class="block text-sm font-bold mx-2 ">Add Medicines</span>
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
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Descriptio</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Vet</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Amount Of Medicine</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Medication Intake</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Frequency Of Medication Use</th>
          
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" :class="{  'cursor-not-allowed opacity-50': item.usage==false}"  class="border-b border-customBlack cursor-pointer" @click="navigateToDetails(item.id)">
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.nameOfMedicines }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.descriptio }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.vetUsername }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left" >{{ item.amountOfMedicine +item.mesurmentUnit }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.medicationIntake }} </td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.frequencyOfMedicationUse }}</td>

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
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                        <label for="intake" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount Of Medicine</label>
                        <input type="number" name="intake" id="intake" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0.25" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="intake" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medication Intake</label>
                        <input type="number" name="intake" id="intake" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0.25" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frequency</label>
                        <select id="category" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">Select Frequency</option>
                            <option value="TV">Daily</option>
                            <option value="PC">Weakly</option>
                            <option value="GA">Montly</option>
                            <option value="PH">Yearly</option>
                        </select>
                    </div>
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                        <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Write product description here"></textarea>                    
                    </div>
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
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
      isLoading: true, // Početno stanje učitavanja
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
  methods: {
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
  