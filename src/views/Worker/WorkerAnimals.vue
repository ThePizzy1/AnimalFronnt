<template>
<div class="container mx-auto px-4">
      <div class="flex">
        <WorkerNavigation class="w-1/6" />
        <div class="w-5/6  rounded-lg overflow-hidden text-white ml-auto">
          <h1 class="ml-5 text-2xl font-bold mb-4 text-white">Animal List</h1>
          <div class="mb-4 mx-5">
            <form @submit="searchAnimals">
              <div class="grid grid-cols-4 gap-4 ">
                <div>
                  <label for="family" class="block text-sm font-bold mb-2">Family:</label>
                  <select v-model="filters.family" id="family" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">All</option>
                    <option v-for="family in families" :key="family" :value="family">{{ family }}</option>
                  </select>
                </div>
                <div>
                  <label for="species" class="block text-sm font-bold mb-2">Species:</label>
                  <select v-model="filters.species" id="species" class= "text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">All</option>
                    <option v-for="species in speciesList" :key="species" :value="species">{{ species }}</option>
                  </select>
                </div>
                <div>
                  <label for="subspecies" class="block text-sm font-bold mb-2">Subspecies:</label>
                  <select v-model="filters.subspecies" id="subspecies" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">All</option>
                    <option v-for="subspecies in subspeciesList" :key="subspecies" :value="subspecies">{{ subspecies }}</option>
                  </select>
                </div>
                <div>
                  <label for="gender" class="block text-sm font-bold mb-2">Gender:</label>
                  <select v-model="filters.gender" id="gender" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">All</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
                <div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.neutered" class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span class="ms-3 text-sm font-medium text-white dark:text-gray-300">Neutered</span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.vaccinated" class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span class="ms-3 text-sm font-medium text-white  dark:text-gray-300">Vaccinated</span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.microchipped" class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span class="ms-3 text-sm font-medium text-whitedark:text-gray-300">Microchipped</span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.trained" class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span class="ms-3 text-sm font-medium text-white  d">Trained</span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.socialized" class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span class="ms-3 text-sm font-medium text-white">Socialized</span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.adopted" class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span class="ms-3 text-sm font-medium text-white" >Adopted</span>
                  </label>
                </div>
              </div>
             
            </form>
          </div>
          <Loading :visible="isLoading" />
          <div class="overflow-x-auto custom-scrollbar" v-if="!isLoading">
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
       
          <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Name</th>
          <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Family</th>
          <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Species</th>
          <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Subspecies</th>
          <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Age</th>
          <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Gender</th>
  
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.idAnimal" class="border-b border-customBlack cursor-pointer"@click="navigateToDetails(item.idAnimal)">
        
          <td class="px-5 py-5 text-sm font-bold">{{ item.name }}</td>
          <td class="px-5 py-5 text-sm font-bold">{{ item.family }}</td>
          <td class="px-5 py-5 text-sm font-bold">{{ item.species }}</td>
          <td class="px-5 py-5 text-sm font-bold">{{ item.subspecies }}</td>
          <td class="px-5 py-5 text-sm font-bold">{{ item.age }}<strong> y</strong></td>
          <td class="px-5 py-5 text-sm font-bold">{{ item.gender }}</td>
          
       
        </tr>
      </tbody>
    </table>
  </div>
  
  
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import WorkerNavigation from './WorkerNavigation.vue';
  import instance from '@/axiosBase';

  export default {
    components: {
      WorkerNavigation,

    },
    data() {
      return {
        items: [],
        families: [],
        speciesList: [],
        subspeciesList: [],
        filters: {
          family: '',
          species: '',
          subspecies: '',
          gender: '',
          neutered: false,
          vaccinated: false,
          microchipped: false,
          trained: false,
          socialized: false,
          adopted: false,
         
        isLoading: true, // Početno stanje učitavanja
        data: [] // Podaci koji će se prikazati kada dođu
     
        },
      };
    },
    computed: {
      filteredItems() {
        return this.items.filter(item => {
          return (!this.filters.family || item.family === this.filters.family) &&
                 (!this.filters.species || item.species === this.filters.species) &&
                 (!this.filters.subspecies || item.subspecies === this.filters.subspecies) &&
                 (!this.filters.gender || item.gender === this.filters.gender) &&
                 (!this.filters.neutered || item.neutered === this.filters.neutered) &&
                 (!this.filters.vaccinated || item.vaccinated === this.filters.vaccinated) &&
                 (!this.filters.microchipped || item.microchipped === this.filters.microchipped) &&
                 (!this.filters.trained || item.trained === this.filters.trained) &&
                 (!this.filters.socialized || item.socialized === this.filters.socialized) &&
                 (!this.filters.adopted || item.adopted === this.filters.adopted);
        });
      },
    },
    mounted() {
      setTimeout(() => {
        // Ovde simuliramo stizanje podataka nakon 2 sekunde
        this.data = [
          { id: 1, name: 'Primer podataka 1' },
          { id: 2, name: 'Primer podataka 2' },
          { id: 3, name: 'Primer podataka 3' }
        ];
        this.isLoading = false; 
      }, 2000);
      instance.interceptors.request.use(
        config => {
          const token = localStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );
  
      instance.get('animal/animal_pc')
        .then(response => {
          this.items = response.data;
          this.populateFilters();
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    },
   
  
    methods: {
      navigateToDetails(idAnimal) {
      this.$router.push(`/workerSingleAnimal/${idAnimal}`);
    },
      populateFilters() {
        this.families = [...new Set(this.items.map(item => item.family))];
        this.speciesList = [...new Set(this.items.map(item => item.species))];
        this.subspeciesList = [...new Set(this.items.map(item => item.subspecies))];
      },
      searchAnimals() {
        instance.get('animal/animal_pc', {
          params: this.filters
        })
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
      },
    },
  };
  </script>
    <style scoped>
  
  
  
  
    .container {
      color: white;
      font-family: 'Poppins', sans-serif;
      margin-top: 15px;
    }
    
    .table {
      width: 100%;
    
      border-collapse: collapse;
     }
  
  .td {
    padding: 12px 15px;
    font-size: 1rem;
  }
  
  .shadow-lg {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* Custom scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 12px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    border: 3px solid transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
  
  /* Fix scrollbar on Firefox */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  }
  
  .custom-scrollbar:hover {
    scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
  }
  </style>  