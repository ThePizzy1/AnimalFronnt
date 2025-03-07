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
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Name</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Email</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Message</th>
                <th  class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Read</th>
              
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredItems" :key="item.id"  :class="{'text-red-100 opacity-100': item.read==false, ' opacity-50 ': item.read==true}" class="border-b border-customBlack cursor-pointer" >
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
    
