<template>
    <div class="flex">
      <div class="w-1/6 text-stone-200 p-4 rounded-l-lg">
        <AdminNavigation />
      </div>
      <div class="w-5/6 text-stone-200 p-4 rounded-r-lg mr-8">
        <h1 class="text-xl font-bold mb-4">Transactions</h1>
  
        <div class="grid grid-cols-4 gap-4 mb-4">
        
        
       
        </div>
        <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
          <table class="min-w-full leading-normal ">
            <thead>
              <tr>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider"></th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Iban</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Iban Animal Shelter</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Type</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Date</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Cost</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Purpose</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id" class="border-b border-customBlack cursor-pointer" @click="navigateToDetails(item.id)">
                <td class="px-5 py-5 text-base font-bold text-left">
                    <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-stone-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
               </td>  
                <td class="px-5 py-5 text-base font-bold text-left">{{ item.iban }}€</td>
                <td class="px-5 py-5 text-base font-bold text-left">{{ item.ibanAnimalShelter }}</td>
                <td class="px-5 py-5 text-base font-bold text-left">{{ item.type }}</td>
                <td class="px-5 py-5 text-base font-bold text-left">{{ formatDate(item.date) }}</td>
                <td class="px-5 py-5 text-base font-bold text-left">{{ item.cost+" €" }}</td>
                <td class="px-5 py-5 text-base font-bold text-left">{{ item.purpose }}</td>
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
        <div class="relative bg-black rounded-lg shadow-sm dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-stone-200">
              Animal Details
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
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">User</label>
                <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.sigleUser.firstName }} {{ this.sigleUser.lastName }}
              </span>
              </div>
              <div class="col-span-2 ">
                <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Residence</label>
                <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.sigleUser.residence }}
              </span>
              </div>
              <div class="col-span-2 ">
                <label for="animalName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Purpose</label>
                <span type="text" id="animalName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                  {{ this.singleItem.purpose }}
              </span>
              </div>
              <div class="col-span-2 ">
                <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Amount</label>
                <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                  {{ this.singleItem.amount }} €
              </span>
              </div>
              <div class="col-span-2 ">
                <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Date</label>
                <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
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
          const response = await instance.get('animal/transaction_db');
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
   
  };
  </script>
    
  
  
  
  
  
  
  
  
  
    <style scoped>
   
    </style>
    