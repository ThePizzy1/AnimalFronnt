<template>
  <div class="flex justify-center items-start mt-8 py-20 mx-25 ml-25">
    <!-- Navigation on the left side -->
    <div class="w-1/4">
      <VetNavigation />
    </div>

    <div class="w-3/4 flex flex-col space-y-10">
      <!-- Display animal details panel -->
      <div class="flex flex-col md:flex-row mx-4 shadow-2xl px-10 py-10 relative" v-if="animal">
        <!-- Slika sa lijeve strane -->
        <div class="md:w-1/3">
          <img :src="'data:image/jpeg;base64,' + animal.picture" :alt="animal.name" class="w-full h-auto rounded-lg">
        </div>
        <!-- Podaci o životinji sa desne strane -->
        <div class="md:w-2/3 md:ml-4 mt-4 md:mt-0">
          <h1 class="text-2xl font-bold mb-4 text-white">{{ animal.name }}</h1>
          <div class="grid grid-cols-2 gap-4 text-white">
            <div><strong>Family:</strong> {{ animal.family }}</div>
            <div><strong>Species:</strong> {{ animal.species }}</div>
            <div><strong>Subspecies:</strong> {{ animal.subspecies }}</div>
            <div><strong>Age:</strong> {{ animal.age }}<strong> years</strong></div>
            <div><strong>Gender:</strong> {{ animal.gender }}</div>
            <div><strong>Weight:</strong> {{ animal.weight }}<strong> kg</strong></div>
            <div><strong>Height:</strong> {{ animal.height }}<strong> cm</strong></div>
            <div><strong>Length:</strong> {{ animal.length }}<strong> cm</strong></div>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-4">
            <div class="flex items-center">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="animal.neutered" class="sr-only peer" disabled>
                <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                <span class="ms-3 text-sm font-medium text-white">Neutered</span>
              </label>
            </div>
            <div class="flex items-center">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="animal.vaccinated" class="sr-only peer" disabled>
                <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                <span class="ms-3 text-sm font-medium text-white">Vaccinated</span>
              </label>
            </div>
            <div class="flex items-center">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="animal.microchipped" class="sr-only peer" disabled>
                <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                <span class="ms-3 text-sm font-medium text-white">Microchipped</span>
              </label>
            </div>
            <div class="flex items-center">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="animal.trained" class="sr-only peer" disabled>
                <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                <span class="ms-3 text-sm font-medium text-white">Trained</span>
              </label>
            </div>
            <div class="flex items-center">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="animal.socialized" class="sr-only peer" disabled>
                <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                <span class="ms-3 text-sm font-medium text-white">Socialized</span>
              </label>
            </div>
          </div>

          <div class="mt-4 text-white">
            <div><strong>Health Issues:</strong> {{ animal.healthIssues }}</div>
            <div><strong>Personality Description:</strong> {{ animal.personalityDescription }}</div>
          </div>





         









          <!-- Additional Fields based on selected family -->
          <template v-if="animal.family === 'Mammal'">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
              <div v-if="additionalDetails.coatType"><strong>Coat Type:</strong> {{ additionalDetails.coatType }}</div>
              <div v-if="additionalDetails.groomingProducts"><strong>Grooming Products:</strong> {{ additionalDetails.groomingProducts }}</div>
            </div>
          </template>

          <template v-else-if="animal.family === 'Bird'">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
              <div v-if="additionalDetails.cageSize"><strong>Cage Size:</strong> {{ additionalDetails.cageSize }}</div>
              <div v-if="additionalDetails.recommendedToys"><strong>Recommended Toys:</strong> {{ additionalDetails.recommendedToys }}</div>
              <div v-if="additionalDetails.sociability"><strong>Sociability:</strong> {{ additionalDetails.sociability }}</div>
            </div>
          </template>

          <template v-else-if="animal.family === 'Fish'">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
              <div v-if="additionalDetails.tankSize"><strong>Tank Size:</strong> {{ additionalDetails.tankSize }}</div>
              <div v-if="additionalDetails.compatibleSpecies"><strong>Compatible Species:</strong> {{ additionalDetails.compatibleSpecies }}</div>
              <div v-if="additionalDetails.recommendedItems"><strong>Recommended Items:</strong> {{ additionalDetails.recommendedItems }}</div>
            </div>
          </template>

          <template v-else-if="animal.family === 'Reptile'">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
              <div v-if="additionalDetails.tankSize"><strong>Tank Size:</strong> {{ additionalDetails.tankSize }}</div>
              <div v-if="additionalDetails.sociability"><strong>Sociability:</strong> {{ additionalDetails.sociability }}</div>
              <div v-if="additionalDetails.compatibleSpecies"><strong>Compatible Species:</strong> {{ additionalDetails.compatibleSpecies }}</div>
            </div>
          </template>

          <template v-else-if="animal.family === 'Amphibian'">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
              <div v-if="additionalDetails.humidity"><strong>Humidity:</strong> {{ additionalDetails.humidity }}<strong> %</strong></div>
              <div v-if="additionalDetails.temperature"><strong>Temperature:</strong> {{ additionalDetails.temperature }}<strong> C°</strong></div>
            </div>
          </template>
       </div>
        </div>
        <!-- Display medicines details panel  BUTTON-->
       <!-- Display medicines details panel  BUTTON-->
       <button @click="showMedicinesModal = true"  style="width: 200px;" class="block   w-sm mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"type="button">
    <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>

</svg>
<span class="block text-sm font-bold mx-2  "> Show Medicines</span>
   
      </button>
       <div class="w-3/4 flex flex-col space-y-10">
        <div v-if="showMedicinesModal" style="height: 500px;" class="flex  flex-col md:flex-row mx-4  px-10 py-10 relative">
        <div class=" p-6 bg-white rounded-lg shadow-lg w-2/4">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200" >
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Medicines
                </h3>
                <button @click="showMedicinesModal = false && fetchMedicinesDetails()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <table class="min-w-full bg-white">
              <thead>
                <tr>
                  <th class="py-2">Name</th>
                  <th class="py-2">Dosage</th>
                  <th class="py-2">Frequency</th>
                  <th class="py-2">Used</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="medicine in filteredItems" :key="medicine.id">
                  <td class="py-2">{{ medicine.nameOfMedicines }}</td>
                  <td class="py-2">{{ medicine.amountOfMedicine + medicine.mesurmentUnit }}</td>
                  <td class="py-2">{{ medicine.medicationIntake + medicine.frequencyOfMedicationUse }}</td>
                  <td class="py-2">{{ medicine.usage }}</td>
                </tr>
              </tbody>
            </table>
    </div>
    </div>
  </div>   

 </div>
      </div>
     

</template>
  <script>
//ovdije  idu podaci o životinji, podaci o ljekovima, di je nađena, koi je njen trenutni record,podaci o nalazia,operacjama, pregledima,
//Pogledaj ideju da se klikom u svakoj tablici zapravo poziva ova stranica ako imaš tu sve pa nema smisla u drugome
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import VetNavigation from '../Vet/VetNavigation.vue';
  import instance from '@/axiosBase';
  import { ref, onMounted } from 'vue';

  const token = ref(localStorage.getItem('token'));

  export default defineComponent({
    name: 'AnimalDetails',
    components: {
        VetNavigation,
    },
    data() {
      return {
        animal: null,
        items: [],
        contageus: [],
        labs: [],
        vetVisit: [],
        animalEdit: null,
        additionalDetailsEdit: null,
        additionalDetails: {},
        fileName: '',
        showRemuve: false,
        isEditing: false, 
        showMedicinesModal: false,  
      };
    },
    computed: {
    filteredItems() {
      return this.items.filter(item => {
        return (!this.filters.id || item.id === this.filters.id);
      });
    },
  },  mounted() {
    this.fetchMedicinesDetails();
  },
    async created() {
      const idA = this.$route.params.id;
      console.log("id"+idA);
      this.fetchAnimalDetails(idA);
      this.fetchMedicinesDetails(idA);
    },
    methods: {
      async fetchMedicinesDetails(id) {
        try{
        const idAnimal = parseInt(this.$route.params.id, 10);
        console.log("id"+idAnimal);
          const response = await instance.get(`animal/medsAnimal/1`);
          this.medicines = response.data;
          console.log("medicines",this.medicines);
        } catch (error) {
          console.error('There was an error!', error);
          this.isLoading = false;
        }
      },

      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.fileName = file.name;
        }
      },
      async removeAnimal() {
        const idAnimal = parseInt(this.$route.params.id, 10);
        console.log(idAnimal);
        try {
          await instance.delete(`animal/${idAnimal}`);
          this.$router.push('/search');
        } catch (error) {
          console.error('Error removing animal:', error);
        }
      },
      async fetchAnimalDetails(id) {
        try {
          const response = await instance.get(`animal/allanimal/${id}`);
          this.animal = response.data;
          this.animalEdit = response.data;

          if (this.animal && this.animal.family) {
            let familyRoute = '';
            switch (this.animal.family) {
              case 'Mammal':
                familyRoute = 'mammel_db';
                break;
              case 'Bird':
                familyRoute = 'bird_db';
                break;
              case 'Fish':
                familyRoute = 'fish_db';
                break;
              case 'Reptile':
                familyRoute = 'reptile_db';
                break;
              case 'Amphibian':
                familyRoute = 'amphibian_db';
                break;
              default:
                console.error('Unknown family:', this.animal.family);
                return;
            }

            console.log("animal", familyRoute);
            const familyResponse = await instance.get(`animal/${familyRoute}/${id}`);
            this.additionalDetails = familyResponse.data;
            this.additionalDetailsEdit = familyResponse.data;
          }
        } catch (error) {
          console.error('Error fetching animal details:', error);
        }
      },

// Fetch medicines details
      
// Fetch contageus details
        async fetchContageusDetails(id) {
      
      const response = await instance.get(`animal/contageusAnimal/${id}`);
      this.contageus = response.data;
        },


// Fetch labs details
        async fetchLabsDetails(id) {
      
      const response = await instance.get(`animal/labsAnimal/${id}`);
      this.labs = response.data;
        },

        async fetchVetVisitDetails(id) {
      
      const response = await instance.get(`animal/vetVisitAnimal/${id}`);
      this.vetVisit = response.data;
        },










    },
  });
</script>
