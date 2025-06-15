<template>
<div class="container mx-auto px-4">
      <div class="flex">
         <Loading v-if="loadingError" /> 

        <WorkerNavigation class="w-1/6" />
        <div class="w-5/6  rounded-lg overflow-hidden text-white ml-auto">
          <h1 class="ml-5 text-2xl font-bold mb-4 text-white">Animal List</h1>
          <div class="mb-4 mx-5">
            <form @submit="searchAnimals">
              <div class="grid grid-cols-4 gap-4 ">
                <div>
                  <label for="family" class="block text-base font-bold mb-2">Family:</label>
                  <select v-model="filters.family" id="family" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">All</option>
                    <option v-for="family in families" :key="family" :value="family">{{ family }}</option>
                  </select>
                </div>
                <div>
                  <label for="species" class="block text-base font-bold mb-2">Species:</label>
                  <select v-model="filters.species" id="species" class= "text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">All</option>
                    <option v-for="species in speciesList" :key="species" :value="species">{{ species }}</option>
                  </select>
                </div>
                <div>
                  <label for="subspecies" class="block text-base font-bold mb-2">Subspecies:</label>
                  <select v-model="filters.subspecies" id="subspecies" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">All</option>
                    <option v-for="subspecies in subspeciesList" :key="subspecies" :value="subspecies">{{ subspecies }}</option>
                  </select>
                </div>
                <div>
                  <label for="gender" class="block text-base font-bold mb-2">Gender:</label>
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
                    <span class="ms-3 text-base font-medium text-white dark:text-gray-300">Neutered</span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.vaccinated" class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span class="ms-3 text-base font-medium text-white  dark:text-gray-300">Vaccinated</span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.microchipped" class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span class="ms-3 text-base font-medium text-whitedark:text-gray-300">Microchipped</span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.trained" class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span class="ms-3 text-base font-medium text-white  d">Trained</span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.socialized" class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span class="ms-3 text-base font-medium text-white">Socialized</span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.adopted" class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span class="ms-3 text-base font-medium text-white" >Adopted</span>
                  </label>
                </div>
              </div>
             
            </form>
          
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
         <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Code</th>
          <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Name</th>
          <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Family</th>
          <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Species</th>
          <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Subspecies</th>
          <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Age</th>
          <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Gender</th>
          <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider"></th>
  
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.idAnimal" class="border-b border-customBlack cursor-pointer"@click="navigateToDetails(item.idAnimal)">
         <td class="px-5 py-5 text-base font-bold">{{ item.animalId }}</td>
          <td class="px-5 py-5 text-base font-bold">{{ item.name }}</td>
          <td class="px-5 py-5 text-base font-bold">{{ item.family }}</td>
          <td class="px-5 py-5 text-base font-bold">{{ item.species }}</td>
          <td class="px-5 py-5 text-base font-bold">{{ item.subspecies }}</td>
          <td class="px-5 py-5 text-base font-bold">{{ item.age }}<strong> y</strong></td>
          <td class="px-5 py-5 text-base font-bold">{{ item.gender }}</td>
          <td class="px-5 py-5 text-base font-bold">
          <button @click="done(item.idAnimal)" type="button" class="mb-4 p-2 text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
            <svg class="w-6 h-6 text-white text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M16.8879 7.11205c.1788-.77492-.1192-1.66905-.7153-2.26515-1.0133-1.01335-2.5632-1.01335-3.5765 0-1.0134 1.01336-1.0134 2.5632 0 3.57655L8.42342 12.5961c-1.01336-1.0134-2.5632-1.0134-3.57655 0-1.01336 1.0133-1.01336 2.5632 0 3.5765.59609.5961 1.49023.8942 2.26515.7154-.17883.7749.11921 1.669.71531 2.2651 1.01335 1.0134 2.56317 1.0134 3.57657 0 1.0133-1.0134 1.0133-2.5632 0-3.5765l4.1726-4.1727c1.0134 1.0134 2.5632 1.0134 3.5766 0 1.0133-1.0133 1.0133-2.56318 0-3.57654-.5961-.59609-1.4903-.89414-2.2652-.71531Z"/>
            </svg>
            <span class="block text-base font-bold mx-2 ">Socialized</span>
             </button>
          </td>
       
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
  import Loading from '../Loading.vue';

  export default {
    components: {
      WorkerNavigation,
      Loading,


    },
    data() {
      return {
        loadingError:false,
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
         
        // Početno stanje učitavanja
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
  
      this.loadingError=true;
      instance.get('animal/animal_social')
        .then(response => {
          this.items = response.data;
          if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                }
          this.populateFilters();
        })
        .catch(error => {
          setTimeout(() => {
                this.loadingError = true; 
                }, 5000)
                this.$router.push(`/workerHome`);
          console.error('There was an error!', error);
        });
    },
   
  
    methods: {
      async done(id) {
      var responser=  await instance.put(`animal/updateAnimalRecord/`,  { 
                            animalId:parseInt(id),
                            recordId:parseInt(5)
                           },
     { headers: {Authorization: `Bearer ${this.token}`,   },
    });

          consol.log("response:" +response.data);
            
          },
      navigateToDetails(idAnimal) {
      this.$router.push(`/workerSingleAnimal/${idAnimal}`);
    },
      populateFilters() {
        this.families = [...new Set(this.items.map(item => item.family))];
        this.speciesList = [...new Set(this.items.map(item => item.species))];
        this.subspeciesList = [...new Set(this.items.map(item => item.subspecies))];
      },
      searchAnimals() {
        this.loadingError=true;
        instance.get('animal/animal_pc', {
          params: this.filters
        })
        .then(response => {
          this.items = response.data;
          if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                }
        })
        .catch(error => {
          setTimeout(() => {
                this.loadingError = true; 
                }, 5000)
                this.$router.push(`/workerHome`);
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