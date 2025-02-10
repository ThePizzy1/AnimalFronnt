<template>
    <div class="flex">
        <div class="w-1/6 text-white p-4 rounded-l-lg">
            <WorkerNavigation />
        </div>
        <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
            <h1 class="text-xl font-bold mb-4">Animal Food</h1>
                
                    <div class="w-4/5 flex flex-col space-y-10 ">
            <!-- Display animal details panel -->
            <div class="flex flex-col md:flex-row mx-4 shadow-2xl px-10 py-10 relative" v-if="item">
            <div class="md:w-4/4 md:ml-4 mt-4 md:mt-0 ">
                <div class="grid grid-cols-2 mr-2 ml-2 pr-2 pl-2 mt-2 gap-4 text-white">
              <span> <h1 class="text-3xl font-bold  text-white">{{ item.name }}</h1>  <h3 class="text-m  ml-1 text-white">{{ formatDate(item.dateTime) }}</h3></span>  
            </div>
    
            <div class="md:w-4/4 md:ml-5  ml-1 mt-4 md:mt-2 text-xl ">
                <div><strong></strong> {{ item.description }}</div></div>

                </div>
            </div></div> 
        </div>

  <!--Dodaj graf npr nutricija na 10-100-200 itd grama -->





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
        item: [],
       
       
        isLoading: true, // Početno stanje učitavanja
      };
    },
    computed: {
      
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
            const id = this.$route.params.id;
          const response = await axios.get(`https://localhost:5001/api/animal/news/${id}`);
          this.item= response.data;
    
       
        } catch (error) {
          console.error('There was an error!', error);
          this.isLoading = false;
        }
      },
 
  
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },
    },
 
  };
  </script>
    
  
  
  
  
  