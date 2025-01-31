<template>
  <div class="flex">
    <div class="w-1/6 text-white p-4 rounded-l-lg">
      <WorkerNavigation />
    </div>
    <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Funds Database</h1>

   
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label for="amount" class="block text-sm font-bold mb-2">Amount:</label>
          <select v-model="filters.amount" id="amount" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="amount in amounts" :key="amount" :value="amount">{{ amount }}</option>
          </select>
        </div>
        <div>
          <label for="purpose" class="block text-sm font-bold mb-2">Purpose:</label>
          <select v-model="filters.purpose" id="purpose" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="purpose in purposes" :key="purpose" :value="purpose">{{ purpose }}</option>
          </select>
        </div>
        <div>
          <label for="dateTime" class="block text-sm font-bold mb-2">Date:</label>
          <select v-model="filters.dateTime" id="dateTime" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="dateTime in dateTimes" :key="dateTime" :value="dateTime">{{ dateTime }}</option>
          </select>
        </div>
     
      </div>
      <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
        <table class="min-w-full leading-normal ">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Amount</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Purpose</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Date</th>
              <th  class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Name</th>
              <th  class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Adress</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" class="border-b border-customBlack cursor-pointer" @click="navigateToDetails(item.id)">
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.amount }}€</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.purpose }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ formatDate(item.dateTime) }}</td>
              <td  class="px-5 py-5 text-sm font-bold text-left">{{  getAdopterName(item.adopterId) }}</td>
              <td  class="px-5 py-5 text-sm font-bold text-left">{{  getAdopterAdress(item.adopterId) }}</td>
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
      adopters: [],
      items: [],
      amount: [],
      purpose: [],
      dateTime: [],
  

      filters: {
        amount: '',
        purpose: '',
        dateTime: '',
        ageGroup: '',
      },
      isLoading: true, // Početno stanje učitavanja
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return (!this.filters.amount || item.amount === this.filters.amount) &&
               (!this.filters.purpose || item.purpose === this.filters.purpose) &&
               (!this.filters.dateTime || item.dateTime === this.filters.dateTime) 
              
      });
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://localhost:5001/api/animal/funds_db');
        this.items = response.data;
        console.log(this.items);
        this.populateFilters();
        this.isLoading = false;
      } catch (error) {
        console.error('There was an error!', error);
        this.isLoading = false;
      }
    },
    async fetchDataUser() {
      axios.get('https://localhost:5001/api/animal/adopter_db')
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
    populateFilters() {
      this.amount = [...new Set(this.items.map(item => item.amount))];
      this.purpose = [...new Set(this.items.map(item => item.purpose))];
      this.animalTypes = [...new Set(this.items.map(item => item.dateTime))];

    },
    getAdopterName(adopterId) {
      const adopter = this.adopters.find(adopter => adopter.id === adopterId);
      return adopter ? `${adopter.firstName} ${adopter.lastName}` : 'Unknown';
    },
   
    getAdopterAdress(adopterId) {
      const adopter = this.adopters.find(adopter => adopter.id === adopterId);
      return adopter ? `${adopter.residence} $` : 'Unknown';
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    navigateToDetails(id) {
    
    },
  },
  watch: {
    filters: {
      handler() {
        this.filteredItems = this.items.filter(item => {
          return (
            (!this.filters.amount || item.amount === this.filters.amount) &&
            (!this.filters.purpose || item.purpose === this.filters.purpose) &&
            (!this.filters.dateTime || item.dateTime === this.filters.dateTime) 
       
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
  