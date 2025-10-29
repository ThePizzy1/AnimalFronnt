<template>
  <div class="flex justify-center items-start mt-8 py-20  text-gray-200">
    <!-- Lijevi navigacijski panel -->
    <div class="w-1/4">
      <WorkerNavigation />
    </div>

    <!-- Glavni prikaz -->
    <div class="w-3/4 flex flex-col space-y-10">

      <!-- PANEL S DETALJIMA -->
      <div
        v-if="animal"
        class="flex flex-col md:flex-row mx-6 p-10 rounded-xl bg-[#1a1a1a] border border-gray-700/40 shadow-lg hover:shadow-emerald-700/20 transition-all duration-300"
      >
        <!-- 🖼️ Slika životinje -->
        <div class="md:w-1/3">
          <img
            :src="'data:image/jpeg;base64,' + animal.picture"
            :alt="animal.name"
            class="w-full h-auto rounded-lg border border-gray-700/40 shadow-md"
          />
        </div>

        <!-- 📋 Detalji -->
        <div class="md:w-2/3 md:ml-8 mt-6 md:mt-0">
          <h1 class="text-3xl font-semibold mb-6 text-white">
            {{ animal.name }}
          </h1>

          <!-- Osnovni podaci -->
          <div class="grid grid-cols-2 gap-4 text-gray-300">
            <div><strong class="text-emerald-400">Family:</strong> {{ animal.family }}</div>
            <div><strong class="text-emerald-400">Species:</strong> {{ animal.species }}</div>
            <div><strong class="text-emerald-400">Subspecies:</strong> {{ animal.subspecies }}</div>
            <div><strong class="text-emerald-400">Age:</strong> {{ animal.age }} years</div>
            <div><strong class="text-emerald-400">Gender:</strong> {{ animal.gender }}</div>
            <div><strong class="text-emerald-400">Weight:</strong> {{ animal.weight }} kg</div>
            <div><strong class="text-emerald-400">Height:</strong> {{ animal.height }} cm</div>
            <div><strong class="text-emerald-400">Length:</strong> {{ animal.length }} cm</div>
          </div>

          <!-- Checkbox sekcija -->
          <div class="mt-6 grid grid-cols-2 gap-4">
            <div v-for="(label, key) in {
              neutered: 'Neutered',
              vaccinated: 'Vaccinated',
              microchipped: 'Microchipped',
              trained: 'Trained',
              socialized: 'Socialized'
            }" :key="key" class="flex items-center">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="animal[key]" class="sr-only peer" disabled>
                <div
                  class="relative w-11 h-6 bg-gray-600 peer-focus:ring-emerald-500/60 rounded-full peer-checked:bg-emerald-600 transition-all"
                ></div>
                <span class="ml-3 text-base font-medium text-gray-200">{{ label }}</span>
              </label>
            </div>
          </div>

          <!-- Opis -->
          <div class="mt-6 space-y-2 text-gray-300">
            <div><strong class="text-emerald-400">Health Issues:</strong> {{ animal.healthIssues }}</div>
            <div><strong class="text-emerald-400">Personality:</strong> {{ animal.personalityDescription }}</div>
          </div>

          <!-- Dodatni podaci po familiji -->
          <div v-if="animal.family" class="mt-8 border-t border-gray-700/40 pt-6">
            <h2 class="text-xl font-semibold mb-4 text-white/90">Additional Details</h2>

            <div
              v-if="animal.family === 'Mammal'"
              class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300"
            >
              <div v-if="additionalDetails.coatType">
                <strong class="text-emerald-400">Coat Type:</strong> {{ additionalDetails.coatType }}
              </div>
              <div v-if="additionalDetails.groomingProducts">
                <strong class="text-emerald-400">Grooming Products:</strong> {{ additionalDetails.groomingProducts }}
              </div>
            </div>

            <div
              v-else-if="animal.family === 'Bird'"
              class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300"
            >
              <div v-if="additionalDetails.cageSize">
                <strong class="text-emerald-400">Cage Size:</strong> {{ additionalDetails.cageSize }}
              </div>
              <div v-if="additionalDetails.recommendedToys">
                <strong class="text-emerald-400">Recommended Toys:</strong> {{ additionalDetails.recommendedToys }}
              </div>
              <div v-if="additionalDetails.sociability">
                <strong class="text-emerald-400">Sociability:</strong> {{ additionalDetails.sociability }}
              </div>
            </div>

            <div
              v-else-if="animal.family === 'Fish'"
              class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300"
            >
              <div v-if="additionalDetails.tankSize">
                <strong class="text-emerald-400">Tank Size:</strong> {{ additionalDetails.tankSize }}
              </div>
              <div v-if="additionalDetails.compatibleSpecies">
                <strong class="text-emerald-400">Compatible Species:</strong> {{ additionalDetails.compatibleSpecies }}
              </div>
              <div v-if="additionalDetails.recommendedItems">
                <strong class="text-emerald-400">Recommended Items:</strong> {{ additionalDetails.recommendedItems }}
              </div>
            </div>

            <div
              v-else-if="animal.family === 'Reptile'"
              class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300"
            >
              <div v-if="additionalDetails.tankSize">
                <strong class="text-emerald-400">Tank Size:</strong> {{ additionalDetails.tankSize }}
              </div>
              <div v-if="additionalDetails.sociability">
                <strong class="text-emerald-400">Sociability:</strong> {{ additionalDetails.sociability }}
              </div>
              <div v-if="additionalDetails.compatibleSpecies">
                <strong class="text-emerald-400">Compatible Species:</strong> {{ additionalDetails.compatibleSpecies }}
              </div>
            </div>

            <div
              v-else-if="animal.family === 'Amphibian'"
              class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300"
            >
              <div v-if="additionalDetails.humidity">
                <strong class="text-emerald-400">Humidity:</strong> {{ additionalDetails.humidity }} %
              </div>
              <div v-if="additionalDetails.temperature">
                <strong class="text-emerald-400">Temperature:</strong> {{ additionalDetails.temperature }} °C
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ako se ne učita -->
      <div v-else class="text-center text-gray-400 mt-20">
        <p>Loading animal details...</p>
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
