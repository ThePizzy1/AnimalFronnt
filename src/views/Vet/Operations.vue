<template>
  <div class="flex">
    <div class="w-1/6 text-white p-4 rounded-l-lg">
      <WorkerNavigation />
    </div>
    <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Operations</h1>

      <button type="button" class="mb-4 text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
        <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
        </svg>
        <span class="block text-sm font-bold mx-2">Add Operation</span>
      </button>

      <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Animal</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Start Tiime</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">End Time</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Type of Visit</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" class="border-b border-customBlack cursor-pointer" @click="navigateToDetails(item.id)">
              <td class="px-5 py-5 text-sm font-bold text-left">{{item.animalId}}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{formatDate(item.startTime)}}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{formatDate(item.endTime)}}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.typeOfVisit }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import WorkerNavigation from '../Vet/VetNavigation.vue';
import axios from 'axios';

export default {
  components: {
    WorkerNavigation,
  },
  data() {
    return {
      items: [],
      filters: {
        startTime: '',
        endTime: '',
        typeOfVisit: '',
      },
      isLoading: true, // Početno stanje učitavanja
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return (!this.filters.startTime || item.startTime.includes(this.filters.startTime)) &&
               (!this.filters.endTime || item.endTime.includes(this.filters.endTime)) &&
               (!this.filters.typeOfVisit || new Date(item.typeOfVisit).toISOString().split('T')[0] === this.filters.typeOfVisit);
      });
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://localhost:5001/api/animal/vetvisit_db');
        
        this.items = response.data.filter(item => item.typeOfVisit === this.filters.typeOfVisit || !this.filters.typeOfVisit);
        this.items = response.data;
        console.log(this.items);
        this.isLoading = false;
      } catch (error) {
        console.error('There was an error!', error);
        this.isLoading = false;
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    navigateToDetails(id) {
      // Implement navigation to details page
      console.log(`Navigate to details of item with ID: ${id}`);
    },
  },
  watch: {
    filters: {
      handler() {
        this.filteredItems = this.items.filter(item => {
          return (
            (!this.filters.startTime || item.startTime.includes(this.filters.startTime)) &&
            (!this.filters.endTime || item.endTime.includes(this.filters.endTime)) &&
            (!this.filters.typeOfVisit || item.typeOfVisit.includes(this.filters.typeOfVisit))
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
  