<template>
  <div class="flex justify-center items-center mt-8 py-20 mx-25">
    <div class="flex flex-col items-center">
      <RouterLink to="/animals">
        <svg class="h-12 w-12 text-neutral-100" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>  
          <line x1="4" y1="12" x2="14" y2="12" />  
          <line x1="4" y1="12" x2="8" y2="16" />  
          <line x1="4" y1="12" x2="8" y2="8" />  
          <line x1="20" y1="4" x2="20" y2="20" />
        </svg>
      </RouterLink>
    </div>
    <div class="w-full md:w-3/4 lg:w-1/2 flex flex-col md:flex-row mx-4 shadow-2xl px-10 py-10" v-if="animal">
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
          <div><strong>Age:</strong> {{ animal.age }}<strong class="ml-2">y</strong></div>
          <div><strong>Gender:</strong> {{ animal.gender }}</div>
          <div><strong>Weight:</strong> {{ animal.weight }}<strong class="ml-2">kg</strong></div>
          <div><strong>Height:</strong> {{ animal.height }}<strong class="ml-2">cm</strong></div>
          <div><strong>Length:</strong> {{ animal.length }}<strong class="ml-2">cm</strong></div>
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
            <div><strong>Coat Type:</strong> {{ additionalDetails.coatType }}</div>
            <div><strong>Grooming Products:</strong> {{ additionalDetails.groomingProducts }}</div>
          </div>
        </template>
        <template v-else-if="animal.family === 'Bird'">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
            <div><strong>Cage Size:</strong> {{ additionalDetails.cageSize }}</div>
            <div><strong>Recommended Toys:</strong> {{ additionalDetails.recommendedToys }}</div>
            <div><strong>Sociability:</strong> {{ additionalDetails.sociability }}</div>
          </div>
        </template>
        <template v-else-if="animal.family === 'Fish'">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
            <div><strong>Tank Size:</strong> {{ additionalDetails.tankSize }}</div>
            <div><strong>Compatible Species:</strong> {{ additionalDetails.compatibleSpecies }}</div>
            <div><strong>Recommended Items:</strong> {{ additionalDetails.recommendedItems }}</div>
          </div>
        </template>
        <template v-else-if="animal.family === 'Reptile'">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
            <div><strong>Enclosure Size:</strong> {{ additionalDetails.enclosureSize }}</div>
            <div><strong>Enclosure Type:</strong> {{ additionalDetails.enclosureType }}</div>
          </div>
        </template>
        <template v-else-if="animal.family === 'Amphibian'">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
            <div><strong>Habitat Description:</strong> {{ additionalDetails.habitatDescription }}</div>
            <div><strong>Habitat Products:</strong> {{ additionalDetails.habitatProducts }}</div>
          </div>
        </template>
        
       <!-- Usvoji dugme -->
<div class="mt-8">
  <button @click="showAdoptForm = true" class="px-6 py-3 rounded bg-green-500 text-white">Adopt</button>
  <!-- Modal Background -->
  <div v-if="showAdoptForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <!-- Modal Content -->
    <div 
      class="rounded-lg relative flex flex-col justify-between" 
      style="
        background-image: url('/agree.png'); 
        background-size: cover; 
        background-position: center;
        width: 500px; /* Set to your image width */
        height: 700px; /* Set to your image height */
      ">
      <h2 class="text-2xl font-bold mb-4 p-4 mt-2 ml-2  rounded-t-lg "style="color: #220F38;">Adoption Agreement</h2>
      <div class="p-8 flex flex-col items-center rounded-b-lg w-full">
        <!-- Checkbox -->
        <label class="inline-flex items-center mb-4">
          <input type="checkbox" v-model="agreed" class="form-checkbox h-5 w-5 text-green-500">
          <span class="ml-2 text-green-800">I agree to adopt {{ animal.name }}</span>
        </label>
        <!-- Agree Button -->
        <div class="flex mb-4 justify-center">
          <button @click="handleAdopt" :disabled="!agreed" class="px-6 py-3 rounded bg-green-500 text-white">Agree</button>
        </div>
      </div>
    </div>
  </div>
</div>


      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'AnimalDetails',
  components: {
    RouterLink
  },
  data() {
    return {
      animal: null,
      additionalDetails: {},
      showAdoptForm: false,
      agreed: false
    };
  },
  async created() {
    const id = this.$route.params.id;
    await this.fetchAnimalDetails(id);
  },
  methods: {
    async fetchAnimalDetails(id) {
      try {
        const response = await axios.get(`https://localhost:5001/api/animal/animal/${id}`);
        this.animal = response.data;

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

          const familyResponse = await axios.get(`https://localhost:5001/api/animal/${familyRoute}/${id}`);
          this.additionalDetails = familyResponse.data;
        }
      } catch (error) {
        console.error('Error fetching animal details:', error);
      }
    },
    async handleAdopt() {
      if (this.agreed) {
        try {
          const id = this.$route.params.id;
          const adoptionData = {
            animalId: parseInt(id),
            adopterId: parseInt(localStorage.getItem('adopterid')),
            adoptionDate: new Date().toISOString().split('T')[0]
          };

          // Save adoption data
          await axios.post('https://localhost:5001/api/animal/addAdoptedAnimal', adoptionData);
          
          // Update animal status
          await axios.put(`https://localhost:5001/api/animal/adoptionstatus/${id}`);
          const userId=localStorage.getItem('adopterid');
          await axios.put(`https://localhost:5001/api/animal/incrementAdopted/${userId}`);//INKREMENT NE RADI
          // Redirect after successful adoption and status update
          this.$router.push('/animals');
        } catch (error) {
          console.error('Error handling adoption:', error);
          this.$router.push('/animals');
        }
      }
    }
  }
});
</script>
