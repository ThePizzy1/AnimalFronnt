<template>
    <div class="flex">
        <div class="w-1/4 text-white p-4 rounded-l-lg">
            <VetNavigation />
        </div>
        <div class="w-3/4 text-white p-4 rounded-r-lg mr-8">

                
       <div class="w-3/3 flex  flex-col space-y-10 ">
                        
          <div class="flex flex-col md:flex-row mx-4 shadow-2xl px-10 py-10 relative"v-if="itemA" >
            
                      
                                <div class="md:w-1/3">
      <img :src="'data:image/jpeg;base64,' + itemA.picture" :alt="itemA.name" class="w-full h-auto rounded-lg">
    </div>    <div  v-if="item">         
                       
            <div class="md:w-3/3 md:ml-4 mt-4 md:mt-0">
       <h1 class="text-2xl font-bold mb-4 text-white">{{ itemA.name }}</h1>
                <div class="grid grid-cols-2 gap-4 text-white">
                    <div><strong>Name:</strong> {{ item.nameOfMedicines }}</div>
                    <div><strong>Family:</strong> {{ itemA.family }}</div>

                    <div><strong>Description:</strong> {{ item.description }}</div>
                    <div><strong>Hight:</strong> {{ itemA.height }}<strong>cm</strong></div>

                    <div><strong>Vet Username:</strong> {{ item.vetUsername }}</div>
                    <div><strong>Length:</strong> {{ itemA.length }}<strong>cm</strong></div>

                    <div><strong>Amount Of Medicine:</strong> {{ item.amountOfMedicine }}{{ item.mesurmentUnit }}</div>
                    <div><strong>Weight:</strong> {{ itemA.weight }}<strong>kg</strong></div>

                    <div><strong>Medication Intake:</strong> {{ item.medicationIntake }} {{ item.frequencyOfMedicationUse }}</div>
                    <div><strong>Aage:</strong> {{ itemA.age }}<strong>years</strong></div>
                </div>
                </div>
                
            </div>
      
            </div>

           
      
          



                    </div>
        </div>







        </div>

  </template>
  
      
    
  <script>
  import VetNavigation from '../Vet/VetNavigation.vue';
  import axios from 'axios';
  import Loading from '../Loading.vue';
  
  export default {
    components: {
        VetNavigation,
      Loading,
    },
    data() {
      return {
        item: [],
        itemA: [],
       
        isLoading: true, // Početno stanje učitavanja
      };
    },
    computed: {
      
    },
    mounted() {
      this.fetchData();
      this.fetchDataAnimal();
    },
    methods: {
      async fetchData() {
        try {
            const id = this.$route.params.id;
          const response = await axios.get(`https://localhost:5001/api/animal/meds/${id}`);
          this.item= response.data;
    console.log(this.item);
    const responseA = await axios.get(`https://localhost:5001/api/animal/animal/${this.item.animalId}`);
          this.itemA= responseA.data;
          console.log(this.itemA);
       
        } catch (error) {
          console.error('There was an error!', error);
          this.isLoading = false;
        }
      },
      async fetchDataAnimal() {
     
      },
 
  
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },
    },
 
  };
  </script>
    
  
  
  
  
  