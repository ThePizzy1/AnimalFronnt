<template>
  <div class="flex justify-center items-start mt-8 py-20 mx-25 ml-25">
    <!-- Navigation on the left side -->
    <div class="w-1/4">
    <WorkerNavigation/>
    </div>

    <div class="w-3/4 flex flex-col space-y-10 ">
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
          <span class="ms-3 text-base font-medium text-white">Neutered</span>
        </label>
      </div>
      <div class="flex items-center">
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="animal.vaccinated" class="sr-only peer" disabled>
          <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
          <span class="ms-3 text-base font-medium text-white">Vaccinated</span>
        </label>
      </div>
      <div class="flex items-center">
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="animal.microchipped" class="sr-only peer" disabled>
          <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
          <span class="ms-3 text-base font-medium text-white">Microchipped</span>
        </label>
      </div>
      <div class="flex items-center">
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="animal.trained" class="sr-only peer" disabled>
          <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
          <span class="ms-3 text-base font-medium text-white">Trained</span>
        </label>
      </div>
      <div class="flex items-center">
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="animal.socialized" class="sr-only peer" disabled>
          <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
          <span class="ms-3 text-base font-medium text-white">Socialized</span>
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
    </div>
  </div>
  
      
  </template>
<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import WorkerNavigation from '../Worker/WorkerNavigation.vue';
import instance from '@/axiosBase';
import { ref, onMounted } from 'vue';

const token = ref(localStorage.getItem('token'));

export default defineComponent({
  name: 'AnimalDetails',
  components: {
    WorkerNavigation,
  },
  data() {
    return {
      animal: null,
      animalEdit: null,
      additionalDetailsEdit: null,
      additionalDetails: {},
      fileName: '',
      showRemuve: false,
      isEditing: false,  // For storing additional details based on family
    };
  },
  async created() {
    const id = this.$route.params.id;
    this.fetchAnimalDetails(id);
  },
  methods: {
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
  },
});
</script>
