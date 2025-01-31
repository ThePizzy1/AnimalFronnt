<template>
  <div class="flex">
    <div class="w-1/6 text-white p-4 rounded-l-lg">
      <WorkerNavigation />
    </div>
    <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Animal Food Database</h1>

      <button type="button" class="mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
          <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>

              </svg>
        <span class="block text-sm font-bold mx-2 ">Add food</span>
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
          <label for="foodType" class="block text-sm font-bold mb-2">Food Type:</label>
          <select v-model="filters.foodType" id="foodType" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="type in foodTypes" :key="type" :value="type">{{ type }}</option>
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
        <table class="min-w-full leading-normal ">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Brand Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Food Type</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Animal Type</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Age Group</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Weight</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Calories Per Serving</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Weight Per Serving</th>
      
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Fat Content</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Fiber Content</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Expiration Date</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Quantity</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" class="border-b border-customBlack cursor-pointer" @click="navigateToDetails(item.id)">
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.brandName }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.name }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.foodType }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left" >{{ item.animalType }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.ageGroup }} years</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.weight }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.caloriesPerServing }} kcal/{{item.measurementPerServing}}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.weightPerServing +item.measurementPerServing }}</td>
           
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.fatContent }}%</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.fiberContent }}%</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ formatDate(item.exporationDate) }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.quantity }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

    
  
<script>
import WorkerNavigation from './WorkerNavigation.vue';
import axios from 'axios';
import Loading from '../Loading.vue';

export default {
  components: {
    WorkerNavigation,
    Loading,
  },
  data() {
    return {
      items: [],
      brands: [],
      foodTypes: [],
      animalTypes: [],
      ageGroups: [],
      filters: {
        brandName: '',
        foodType: '',
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
               (!this.filters.foodType || item.foodType === this.filters.foodType) &&
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
        const response = await axios.get('https://localhost:5001/api/animal/food_db');
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
      this.foodTypes = [...new Set(this.items.map(item => item.foodType))];
      this.animalTypes = [...new Set(this.items.map(item => item.animalType))];
      this.ageGroups = [...new Set(this.items.map(item => item.ageGroup))];
    },
    navigateToDetails(id) {
    
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
  watch: {
    filters: {
      handler() {
        this.filteredItems = this.items.filter(item => {
          return (
            (!this.filters.brandName || item.BrandName === this.filters.brandName) &&
            (!this.filters.foodType || item.FoodType === this.filters.foodType) &&
            (!this.filters.animalType || item.AnimalType === this.filters.animalType) &&
            (!this.filters.ageGroup || item.AgeGroup === this.filters.ageGroup)
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
  