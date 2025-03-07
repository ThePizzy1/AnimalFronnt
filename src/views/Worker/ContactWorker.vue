<template>
    <div class="flex">
      <div class="w-1/6 text-white p-4 rounded-l-lg">
        <WorkerNavigation />
      </div>
      <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
        <h1 class="text-xl font-bold mb-4">Funds Database</h1>
     
          
             
          
        
     
        <div class="grid grid-cols-4 gap-4 mb-4">
          <div>
            <label for="name" class="block text-sm font-bold mb-2">Name:</label>
            <select v-model="filters.name" id="name" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
              <option value="">All</option>
              <option v-for="name in nameList" :key="name" :value="name">{{ name }}</option>
            </select>
          </div>
          <div>
            <label for="email" class="block text-sm font-bold mb-2">Email:</label>
            <select v-model="filters.email" id="email" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
              <option value="">All</option>
              <option v-for="n in emailList" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          
          <div class=" block text-sm font-bold mb-2 ">
                <label class="inline-flex items-center cursor-pointer mb-3"> Read: </label>
                <label>
                  <input   type="checkbox" v-model="filters.read" class="sr-only peer">
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
          </div>
       
        </div>
        <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
          <table class="min-w-full leading-normal ">
            <thead>
              <tr>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Name</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Email</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Message</th>
                <th  class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Read</th>
              
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredItems" :key="item.id"  :class="{'text-red-100 opacity-100': item.read==false, ' opacity-50 ': item.read==true}" class="border-b border-customBlack cursor-pointer" >
                <td class="px-5 py-5 text-sm font-bold text-left">
                  <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
             </td>  
                <td class="px-5 py-5 text-sm font-bold text-left">{{ item.name }}</td>
                <td class="px-5 py-5 text-sm font-bold text-left">{{ item.email }}</td>
                <td class="px-5 py-5 text-sm font-bold text-left">{{ item.description }}</td>
                <button  @click="increment(item.id)"  type="button" class="mb-4  mt-2 text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                    <svg class="w-5 h-5 text-gray-800 dark:text-white fill-[#ffffff]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
                        </svg>

              <span class="block text-sm font-bold mx-2 ">Yes</span>
              </button>
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
              <label for="animalName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <span type="text" id="animalName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.email }}
            </span>
            </div>
            <div class="col-span-2 ">
              <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
              <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.description }} 
            </span>
            </div>
          
          
          </div>
        </form>
      </div>
    </div>
  </div>


  </template>
  
  <script>
  import WorkerNavigation from './WorkerNavigation.vue';
  import instance from '@/axiosBase';
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
        nameList: [],
        emailList: [],

        single: false,
        singleItem:[],
        sigleUser:[],
        userId:'',

        filters: {
            name: '',
            email: '',
            read: '',
            
        
        },
        isLoading: true, // Početno stanje učitavanja
      };
    },
    computed: {
      filteredItems() {
        return this.items.filter(item => {
          return (!this.filters.name || item.name === this.filters.name) &&
                 (!this.filters.email || item.email === this.filters.email) &&
                 (!this.filters.read || item.read === this.filters.read) 
                
        });
      },
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async openSinglModal(item) {
      this.single = true;
      this.singleItem = item;
      this.userId=item.adopterId;
       console.log(this.userId);
      const userResponse = await instance.get(`animal/adopterId/${this.userId}`);
           this.sigleUser = userResponse.data;
        console.log("User:"+userResponse.data); 
    },

        async increment(id){

                try {
                const response = await instance.put("animal/updateContactDomain",{id:id});

                console.log(this.items);
                window.location.reload();
                } catch (error) {
                console.error('There was an error!', error);
                }
                },


        getRead(item){
            return item.read;
        },
        async fetchData() {

                try {
                const response = await instance.get('animal/contact_db');
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
      this.nameList = [...new Set(this.items.map(item => item.name))];
      this.emailList = [...new Set(this.items.map(item => item.email))];
     
    },
    },
    watch: {
      filters: {
        handler() {
          this.filteredItems = this.items.filter(item => {
            return (
              (!this.filters.name || item.name === this.filters.name) &&
              (!this.filters.email || item.email === this.filters.email) &&
              (!this.filters.read || item.read === this.filters.read) 
         
            );
          });
        },
        deep: true,
      },
    },
  };
  </script>
    
