<template>
  <div class="flex">
    <div class="w-1/6 text-white p-4 rounded-l-lg">
      <WorkerNavigation />
    </div>
    <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Animal Toy Database</h1>
      <button @click="add = true" type="button" class="mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
          <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>

              </svg>
        <span class="block text-sm font-bold mx-2 ">Add toys</span>
        </button>
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label for="brandName" class="block text-sm font-bold mb-2">Brand Name:</label>
          <select v-model="filters.brandName" id="brandName" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
          </select>
        </div>
        <div>
          <label for="toyType" class="block text-sm font-bold mb-2">Toy Type:</label>
          <select v-model="filters.toyType" id="toyType" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="type in toyTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <div>
          <label for="animalType" class="block text-sm font-bold mb-2">Animal Type:</label>
          <select v-model="filters.animalType" id="animalType" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="animal in animalTypes" :key="animal" :value="animal">{{ animal }}</option>
          </select>
        </div>
        <div>
          <label for="ageGroup" class="block text-sm font-bold mb-2">Age Group:</label>
          <select v-model="filters.ageGroup" id="ageGroup" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="age in ageGroups" :key="age" :value="age">{{ age }}</option>
          </select>
        </div>
      </div>
      <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-right text-sm font-bold text-white uppercase tracking-wider">Brand Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-right text-sm font-bold text-white uppercase tracking-wider">Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-right text-sm font-bold text-white uppercase tracking-wider">Toy Type</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-right text-sm font-bold text-white uppercase tracking-wider">Animal Type</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-right text-sm font-bold text-white uppercase tracking-wider">Age Group</th>
   
              <th class="px-5 py-3 border-b-2 border-customBlack text-right text-sm font-bold text-white uppercase tracking-wider">Quantity</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-right text-sm font-bold text-white uppercase tracking-wider">Notes</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-right text-sm font-bold text-white uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-right text-sm font-bold text-white uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" class="border-b border-customBlack cursor-pointer" @click="navigateToDetails(item.id)">
              <td class="px-5 py-5 text-sm font-bold text-right">{{ item.brandName }}</td>
              <td class="px-5 py-5 text-sm font-bold text-right">{{ item.name }}</td>
              <td class="px-5 py-5 text-sm font-bold text-right">{{ item.toyType }}</td>
              <td class="px-5 py-5 text-sm font-bold text-right">{{ item.animalType }}</td>
              <td class="px-5 py-5 text-sm font-bold text-right">{{ item.ageGroup }} years</td>
         
              <td class="px-5 py-5 text-sm font-bold text-right">{{ item.quantity }}</td>
              <td class="px-5 py-5 text-sm font-bold text-right">{{ item.notes }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">
                <button type="button" class="mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
               <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
              </svg>
              <span class="block text-sm font-bold mx-2 ">Add</span>
              </button>
              </td>
              <td class="px-5 py-5 text-sm font-bold text-left">
                <button type="button" class="mb-4  text-white bg-red-400 hover:bg-red-500 focus:ring-3 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"></path>
                  </svg>
              <span class="block text-sm font-bold mx-2 ">Remove</span>
              </button>
              </td>
            </tr>
          </tbody>
        </table>
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
                    Add Toys
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
                  <div class="col-span-2 sm:col-span-1">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand Name</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Cuwex" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bone123" required="">
                    </div>
                  
              
                    <div class="col-span-2 sm:col-span-2">
                        <label for="intake" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Toy Type</label>
                        <input type="text" name="intake" id="intake" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bone" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                        <label for="intake" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Animal Type</label>
                        <input type="text" name="intake" id="intake" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Dog" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                        <label for="intake" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age Group</label>
                        <input type="text" name="intake" id="intake" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2-5" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="intake" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Width</label>
                        <input type="number" name="intake" id="intake" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="5" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="intake" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Heigh</label>
                        <input type="number" name="intake" id="intake" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="5" required="">
                    </div>
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                        <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Write description here"></textarea>                    
                    </div>
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add 
                </button>
              
            </form>
        </div>
    </div>
</div> 
</template>

<script>
import WorkerNavigation from './WorkerNavigation.vue';
import axios from 'axios';

export default {
  components: {
    WorkerNavigation,
  },
  data() {
   
    return { 
      add: false,
      items: [],
      brands: [],
      toyTypes: [],
      animalTypes: [],
      ageGroups: [],
      filters: {
        brandName: '',
        toyType: '',
        animalType: '',
        ageGroup: '',
      },
      isLoading: true, // Početno stanje učitavanja
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return (!this.filters.brandName || item.brandName === this.filters.brandName) &&
               (!this.filters.toyType || item.toyType === this.filters.toyType) &&
               (!this.filters.animalType || item.animalType === this.filters.animalType) &&
               (!this.filters.ageGroup || item.ageGroup === this.filters.ageGroup);
      });
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://localhost:5001/api/animal/toys_db');
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
      this.brands = [...new Set(this.items.map(item => item.brandName))];
      this.toyTypes = [...new Set(this.items.map(item => item.toyType))];
      this.animalTypes = [...new Set(this.items.map(item => item.animalType))];
      this.ageGroups = [...new Set(this.items.map(item => item.ageGroup))];
    },
    navigateToDetails(id) {
      this.$router.push(`/singleToy/${id}`);
      console.log(`Navigate to details of item with ID: ${id}`);
    },
  },
  watch: {
    filters: {
      handler() {
        this.filteredItems = this.items.filter(item => {
          return (
            (!this.filters.brandName || item.brandName === this.filters.brandName) &&
            (!this.filters.toyType || item.toyType === this.filters.toyType) &&
            (!this.filters.animalType || item.animalType === this.filters.animalType) &&
            (!this.filters.ageGroup || item.ageGroup === this.filters.ageGroup)
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
  