<template>
  <div class="my-6 text-white items-center justify-center flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
    <!-- Adopter Details Panels -->
    <div class="w-full flex flex-col 2xl:w-5/6 space-y-4">
      <div class="flex-1 rounded-lg p-8">
        <h4 class="text-xl font-bold">Adopter Details</h4>
        <div v-if="user" class="flex flex-col 2xl:flex-row">
          <!-- Personal Info Panel -->
          <div class="shadow-2xl p-10 shadow-xl rounded-lg w-full 2xl:w-2/6 mr-4">
            <h2 class="text-2xl font-bold mb-4">Personal info</h2>
            <div>
             
              <div class="flex border-b py-2">
                <span class="font-bold w-24">First name:</span>
                <span>{{ user.firstName }}</span>
              </div>
              <div class="flex border-b py-2">
                <span class="font-bold w-24">Last name:</span>
                <span>{{ user.lastName }}</span>
              </div>
              <div class="flex border-b py-2">
                <span class="font-bold w-24">Date of Birth:</span>
                <span>{{ formatBirthDate(user.dateOfBirth) }}</span>
              </div>
              <div class="flex border-b py-2">
                <span class="font-bold w-24">Residence:</span>
                <span>{{ user.residence }}</span>
              </div>
             
            </div>
          </div>
  
          <!-- Adoption Details Panel -->
          <div class="w-full 2xl:w-4/6">
            <loading v-if="loading" />
            <div v-else>
              <div v-if="adoption.length">
                <div class="shadow-2xl p-6 mb-4 rounded-lg flex flex-col">
                  <h2 class="text-2xl font-bold mb-4">{{ currentAnimal.name }}</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Animal Info -->
                    <div>
                      <p><span class="font-bold">Adoption code:</span> {{ currentAdoption.code }}</p>
                      <p><span class="font-bold">Family:</span> {{ currentAnimal.family }}</p>
                      <p><span class="font-bold">Subspecies:</span> {{ currentAnimal.subspecies }}</p>
                      <p><span class="font-bold">Species:</span> {{ currentAnimal.species }}</p>
                      <p><span class="font-bold">Age:</span> {{ currentAnimal.age }}</p>
                      <p><span class="font-bold">Gender:</span> {{ currentAnimal.gender }}</p>
                    </div>
                    <div>
                      <p><span class="font-bold">Weight:</span> {{ currentAnimal.weight }} kg</p>
                      <p><span class="font-bold">Height:</span> {{ currentAnimal.height }} cm</p>
                      <p><span class="font-bold">Length:</span> {{ currentAnimal.length }} cm</p>
                      <p><span class="font-bold">Health Issues:</span> {{ currentAnimal.healthIssues }}</p>
                      <p><span class="font-bold">Personality:</span> {{ currentAnimal.personalityDescription }}</p>
                    </div>
                    <div>
                      <div class="flex flex-col space-y-2 mt-2">
                        <div class="flex items-center">
                          <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="currentAnimal.neutered" class="sr-only peer" :disabled="true">
                            <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 rounded-full peer dark:bg-gray-900 peer-checked:bg-green-800"></div>
                            <span class="ms-3 text-base font-medium text-white">Neutered</span>
                          </label>
                        </div>
                        <div class="flex items-center">
                          <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="currentAnimal.vaccinated" class="sr-only peer" :disabled="true">
                            <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 rounded-full peer dark:bg-gray-900 peer-checked:bg-green-800"></div>
                            <span class="ms-3 text-base font-medium text-white">Vaccinated</span>
                          </label>
                        </div>
                        <div class="flex items-center">
                          <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="currentAnimal.microchipped" class="sr-only peer" :disabled="true">
                            <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 rounded-full peer dark:bg-gray-900 peer-checked:bg-green-800"></div>
                            <span class="ms-3 text-base font-medium text-white">Microchipped</span>
                          </label>
                        </div>
                        <div class="flex items-center">
                          <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="currentAnimal.trained" class="sr-only peer" :disabled="true">
                            <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 rounded-full peer dark:bg-gray-900 peer-checked:bg-green-800"></div>
                            <span class="ms-3 text-base font-medium text-white">Trained</span>
                          </label>
                        </div>
                        <div class="flex items-center">
                          <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="currentAnimal.socialized" class="sr-only peer" :disabled="true">
                            <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 rounded-full peer dark:bg-gray-900 peer-checked:bg-green-800"></div>
                            <span class="ms-3 text-base font-medium text-white">Socialized</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between mt-4">
                  <button @click="prevAnimal" :disabled="currentIndex === 0" class="px-4 shadow-2xl py-2  text-white rounded-lg">Previous</button>
                  <button @click="nextAnimal" :disabled="currentIndex === adoption.length - 1" class="px-4 py-2 shadow-2xl text-white rounded-lg">Next</button>
                </div>
              </div>
              <div v-else>
                <p class="text-center text-xl font-semibold mt-8">This user has no adopted animals.</p>
              </div>

              <!-- Returned Animals Section -->
              <div v-if="returned.length">
                <h2 class="text-2xl font-bold mt-8 mb-4">Returned Animals</h2>
                <div class="shadow-2xl p-6 mb-4 rounded-lg flex flex-col"> 
                   <!-- Teturn Info -->
                       <div>
                      <p><span class="font-bold">Return code:</span> {{ currentReturned.returnCode }}</p>
                      <p><span class="font-bold">Adoption code:</span> {{ currentReturned.adoptionCode }}</p>
                      <p class=" text-red-500"><span class="font-bold ">Return reason:</span  > {{ currentReturned.returnReason }}</p>
                     
                    </div>
                  <h2 class="text-2xl  mt-2 font-bold mb-4">{{ currentReturnedAnimal.name }}</h2>
                  <div class="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     
                    <!-- Animal Info -->
                    <div>
                      <p><span class="font-bold">Return code:</span> {{ currentReturned.returnCode }}</p>
                      <p><span class="font-bold">Return code:</span> {{ currentReturned.returnCode }}</p>
                      <p><span class="font-bold">Family:</span> {{ currentReturnedAnimal.family }}</p>
                      <p><span class="font-bold">Subspecies:</span> {{ currentReturnedAnimal.subspecies }}</p>
                      <p><span class="font-bold">Species:</span> {{ currentReturnedAnimal.species }}</p>
                      <p><span class="font-bold">Age:</span> {{ currentReturnedAnimal.age }}</p>
                      <p><span class="font-bold">Gender:</span> {{ currentReturnedAnimal.gender }}</p>
                    </div>
                    <div>
                      <p><span class="font-bold">Weight:</span> {{ currentReturnedAnimal.weight }} kg</p>
                      <p><span class="font-bold">Height:</span> {{ currentReturnedAnimal.height }} cm</p>
                      <p><span class="font-bold">Length:</span> {{ currentReturnedAnimal.length }} cm</p>
                      <p><span class="font-bold">Health Issues:</span> {{ currentReturnedAnimal.healthIssues }}</p>
                      <p><span class="font-bold">Personality:</span> {{ currentReturnedAnimal.personalityDescription }}</p>
                    </div>
                    <div>
                      <div class="flex flex-col space-y-2 mt-2">
                        <div class="flex items-center">
                          <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="currentReturnedAnimal.neutered" class="sr-only peer" :disabled="true">
                            <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 rounded-full peer dark:bg-gray-900 peer-checked:bg-green-800"></div>
                            <span class="ms-3 text-base font-medium text-white">Neutered</span>
                          </label>
                        </div>
                        <div class="flex items-center">
                          <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="currentReturnedAnimal.vaccinated" class="sr-only peer" :disabled="true">
                            <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 rounded-full peer dark:bg-gray-900 peer-checked:bg-green-800"></div>
                            <span class="ms-3 text-base font-medium text-white">Vaccinated</span>
                          </label>
                        </div>
                        <div class="flex items-center">
                          <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="currentReturnedAnimal.microchipped" class="sr-only peer" :disabled="true">
                            <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 rounded-full peer dark:bg-gray-900 peer-checked:bg-green-800"></div>
                            <span class="ms-3 text-base font-medium text-white">Microchipped</span>
                          </label>
                        </div>
                        <div class="flex items-center">
                          <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="currentReturnedAnimal.trained" class="sr-only peer" :disabled="true">
                            <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 rounded-full peer dark:bg-gray-900 peer-checked:bg-green-800"></div>
                            <span class="ms-3 text-base font-medium text-white">Trained</span>
                          </label>
                        </div>
                        <div class="flex items-center">
                          <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="currentReturnedAnimal.socialized" class="sr-only peer" :disabled="true">
                            <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 rounded-full peer dark:bg-gray-900 peer-checked:bg-green-800"></div>
                            <span class="ms-3 text-base font-medium text-white">Socialized</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between mt-4">
                  <button @click="prevReturnedAnimal" :disabled="currentReturnedIndex === 0" class="px-4 shadow-2xl py-2 text-white rounded-lg">Previous</button>
                  <button @click="nextReturnedAnimal" :disabled="currentReturnedIndex === returned.length - 1" class="px-4 py-2 shadow-2xl text-white rounded-lg">Next</button>
                </div>
              </div>
              <div v-else>
                <p class="text-center text-xl font-semibold mt-8">This user has no returned animals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/axiosBase';
import Loading from '../Loading.vue'; // Import the Loading component
import { ref } from 'vue';

const token = ref(localStorage.getItem('token'));

export default {
  components: {
    Navigation,
    Footer,
    Loading, // Register the Loading component
  },
  data() {
    return {
      user: null,
      adoption: [],
      returned: [],
      currentIndex: 0,
      currentReturnedIndex: 0,
      loading: true, // Add loading state
    };
  },
  computed: {
    currentAnimal() {
      return this.adoption[this.currentIndex]?.animal || {};
    },
    currentAdoption() {
      return this.adoption[this.currentIndex] || {};
    },
    currentReturnedAnimal() {
      return this.returned[this.currentReturnedIndex]?.animal || {};
    },
    currentReturned() {
      return this.returned[this.currentReturnedIndex] || {};
    },
  },
  mounted() {
 
    this.fetchAdoptionDetails();
    this.fetchReturnedDetails();
  },
  methods: {
    formatBirthDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    
    fetchAdoptionDetails() {
      const idUser = this.$route.params.id;
      instance.get(`animal/adopted/${idUser}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then(response => {
        this.adoption = response.data;
        console.log(this.adoption);
        if (this.adoption.length > 0) {
          this.user = this.adoption[0].adopter;
        }
        console.log(this.user );
        this.loading = false; 
        // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching adoption details:', error);
        this.loading = false; // Set loading to false even if there is an error
      });
    },
    fetchReturnedDetails() {
      const idUser = this.$route.params.id;
      instance.get(`animal/returned/${idUser}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then(response => {
        this.returned = response.data;
        this.loading = false; 
        // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching returned details:', error);
        this.loading = false; // Set loading to false even if there is an error
      });
    },
    prevAnimal() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextAnimal() {
      if (this.currentIndex < this.adoption.length - 1) {
        this.currentIndex++;
      }
    },
    prevReturnedAnimal() {
      if (this.currentReturnedIndex > 0) {
        this.currentReturnedIndex--;
      }
    },
    nextReturnedAnimal() {
      if (this.currentReturnedIndex < this.returned.length - 1) {
        this.currentReturnedIndex++;
      }
    },
  },
};
</script>

<style scoped>
/* Add styling as needed */
</style>