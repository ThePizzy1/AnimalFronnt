<template>
  <div class="flex">
    <div class="w-1/6 text-white p-4 rounded-l-lg">
      <AdminNavigation />
    </div>
    <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Funds Database</h1>
     <!-- Get excel file of funds -->
        
           <button @click="funds()"   class="block mx-5 mt-2 size-fit mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"type="button">
          <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
          </svg>
            <span class="block text-sm font-bold mx-2  ">Download</span>
          </button>
            <p class="text-xs font-normal text-gray-200 mx-5">Download donations in the past month</p>
   
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
          <div>
          <label for="dateTime" class="block text-sm font-bold mb-2">Date:</label>
          <input v-model="filters.dateTime" id="dateTime" type="date" class="rounded-full text-gray-500 w-full py-2 px-3 bg-white  shadow-xl focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"  />
        </div>
        </div>
     
      </div>
      <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
        <table class="min-w-full leading-normal ">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Amount</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Purpose</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" class="border-b border-customBlack cursor-pointer" @click="navigateToDetails(item.id)">
              <td class="px-5 py-5 text-sm font-bold text-left">
                  <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
             </td>  
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.amount }}€</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ item.purpose }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">{{ formatDate(item.dateTime) }}</td>
            
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>






            
   
 <!-- Single item modal -->
 <div v-if="single" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-x-auto custom-scrollbar">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Animal Details
          </h3>
          <button @click="single = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
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
              <label for="singleCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User</label>
              <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
              {{ this.sigleUser.firstName }} {{ this.sigleUser.lastName }}
            </span>
            </div>
            <div class="col-span-2 ">
              <label for="singleCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Residence</label>
              <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
              {{ this.sigleUser.residence }}
            </span>
            </div>
            <div class="col-span-2 ">
              <label for="animalName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Purpose</label>
              <span type="text" id="animalName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.purpose }}
            </span>
            </div>
            <div class="col-span-2 ">
              <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
              <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.amount }} €
            </span>
            </div>
            <div class="col-span-2 ">
              <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
              <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ formatDate(this.singleItem.dateTime)}}
            </span>
            </div>
          
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import AdminNavigation from './AdminNavigation.vue';
import instance from '@/axiosBase';
import Loading from '../Loading.vue';


export default {
  components: {
    AdminNavigation,
    Loading,
  },
  data() {
    return {
      adopters: [],
      items: [],
      amount: [],
      purpose: [],
      dateTime: [],

      single: false,
      singleItem:[],
      sigleUser:[],
      userId:'',

      filters: {
        amount: '',
        purpose: '',
        dateTime: '',
        ageGroup: '',
      },
      // Početno stanje učitavanja
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
    async funds(){
  

  const response = await instance.get(`excel/generateDva/`,{
    responseType: 'blob',
    headers: {
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    data: {
  
    },
  });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `Funds-${+new Date()}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(link.href);
  
      },
      
    async openSinglModal(item) {
      this.single = true;
      this.singleItem = item;
      this.userId=item.adopterId;
   console.log(this.userId);
      const userResponse = await instance.get(`animal/adopterId/${this.userId}`);
           this.sigleUser = userResponse.data;
        console.log("User:"+userResponse.data); 
    },


    async fetchData() {
      try {
        const response = await instance.get('animal/funds_db');
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
    populateFilters() {
      this.amounts = [...new Set(this.items.map(item => item.amount))];
      this.purposes = [...new Set(this.items.map(item => item.purpose))];
      

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
 
  </style>
  