<template>
    <div class="flex">
        <div class="w-1/6 text-white p-4 rounded-l-lg">
            <WorkerNavigation />
        </div>
        <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
            <h1 class="text-xl font-bold mb-4">Toy</h1>
                
                    <div class="w-4/5 flex flex-col space-y-10 ">
            <!-- Display animal details panel -->
            <div class="flex flex-col md:flex-row mx-4 shadow-2xl px-10 py-10 relative" v-if="item">
            <div class="md:w-4/4 md:ml-4 mt-4 md:mt-0 ">
                <h1 class="text-2xl font-bold mb-4 text-white">{{ item.name }}</h1>
            
                <!-- Podaci o životinji sa desne strane -->
                <div class="grid grid-cols-2 mr-2 ml-2 pr-2 pl-2 mt-2 gap-4 text-white">
                    <div><strong>Brand:</strong> {{ item.brandName }}</div>
                     
                        <div><strong>Hight:</strong> {{ item.hight }}<strong> {{ item.measurementWeight }}</strong></div>
                <div><strong>Age Group:</strong> {{ item.ageGroup}}</div>
                    <div><strong>Width:</strong> {{ item.width }}<strong> {{ item.measurementWeight }}</strong></div>
                <div><strong>Animal Type:</strong> {{ item.animalType}}</div>
        
                        <div><strong>Quantity:</strong> {{ item.quantity }}<strong> </strong></div>

              
            
            </div> <div class="md:w-4/4 md: mt-5 md:mt-5 ">
                <div><strong>Notes:</strong> {{ item.notes }}<strong> </strong></div></div>

                </div>
            </div>
        </div>

  <!--Dodaj graf npr nutricija na 10-100-200 itd grama -->





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
          const response = await axios.get(`https://localhost:5001/api/animal/toy/${id}`);
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
    
  
  
  
  
  