<template>
  <div class="flex">
    <div class="w-1/6 text-white p-4 rounded-l-lg">
      <WorkerNavigation />
    </div>
    <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Labs</h1>

      <button type="button" class="mb-4 text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
        <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
        </svg>
        <span class="block text-sm font-bold mx-2">Add Labs</span>
      </button>

      <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" class="border-b border-customBlack cursor-pointer" @click="navigateToDetails(item.id)">
              <td class="px-5 py-5 text-sm font-bold text-left"></td>
              <td class="px-5 py-5 text-sm font-bold text-left"></td>
              <td class="px-5 py-5 text-sm font-bold text-left"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import WorkerNavigation from '../Vet/VetNavigation.vue';
import instance from '@/axiosBase';

export default {
  components: {
    WorkerNavigation,
  },
  data() {
    return {
      items: [],
      filters: {
        name: '',
        description: '',
        dateTime: '',
      },
      isLoading: true, // Početno stanje učitavanja
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return (!this.filters.name || item.name.includes(this.filters.name)) &&
               (!this.filters.description || item.description.includes(this.filters.description)) &&
               (!this.filters.dateTime || new Date(item.dateTime).toISOString().split('T')[0] === this.filters.dateTime);
      });
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await instance.get('animal/labs_db');
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
            (!this.filters.name || item.name.includes(this.filters.name)) &&
            (!this.filters.description || item.description.includes(this.filters.description)) &&
            (!this.filters.dateTime || new Date(item.dateTime).toISOString().split('T')[0] === this.filters.dateTime)
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
  