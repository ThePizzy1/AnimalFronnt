<template>
  <div class="flex">
    <div class="w-1/6 text-white p-4 rounded-l-lg">
      <component :is="role === 'Admin' ? 'AdminNavigation' : 'WorkerNavigation'" />
    </div>
    <!-- Form -->
    <div class="w-4/6 text-white p-4 rounded-r-lg">
      <h1 class="text-xl font-bold mb-4">Add Animal</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Common Animal Fields -->
        <div>
          <label for="name" class="block text-sm font-bold mb-2">Name:</label>
          <input type="text" id="name" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="name" />
        </div>
        <div>
          <label for="family" class="block text-sm font-bold mb-2">Family:</label>
          <select id="family" v-model="selectedFamily" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="Mammal">Mammal</option>
            <option value="Bird">Bird</option>
            <option value="Fish">Fish</option>
            <option value="Reptile">Reptile</option>
            <option value="Amphibian">Amphibian</option>
          </select>
        </div>
        <div>
          <label for="species" class="block text-sm font-bold mb-2">Species:</label>
          <input type="text" id="species" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="species" />
        </div>
        <div>
          <label for="subspecies" class="block text-sm font-bold mb-2">Subspecies:</label>
          <input type="text" id="subspecies" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="subspecies" />
        </div>
        <div>
          <label for="age" class="block text-sm font-bold mb-2">Age:</label>
          <input type="number" id="age" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="age" />
        </div>
        <div>
          <label for="gender" class="block text-sm font-bold mb-2">Gender:</label>
          <select id="gender" v-model="gender" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label for="weight" class="block text-sm font-bold mb-2">Weight:</label>
          <input type="number" id="weight" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="weight" />
        </div>
        <div>
          <label for="height" class="block text-sm font-bold mb-2">Height:</label>
          <input type="number" id="height" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="height" />
        </div>
        <div>
          <label for="length" class="block text-sm font-bold mb-2">Length:</label>
          <input type="number" id="length" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="length" />
        </div>
        
        <div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="neutered" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span class="ms-3 text-sm font-medium">Neutered</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="vaccinated" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span class="ms-3 text-sm font-medium">Vaccinated</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="microchipped" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span class="ms-3 text-sm font-medium">Microchipped</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="trained" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span class="ms-3 text-sm font-medium">Trained</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="socialized" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span class="ms-3 text-sm font-medium">Socialized</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="adopted" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focused:ring-4 peer-focused:ring-green-300 dark:peer-focused:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span class="ms-3 text-sm font-medium">Adopted</span>
          </label>
        </div>
      </div>

      <!-- Additional Fields based on selected family -->
      <template v-if="selectedFamily === 'Mammal'">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label for="coatType" class="block text-sm font-bold mb-2">Coat Type:</label>
            <input type="text" id="coatType" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="coatType" />
          </div>
          <div>
            <label for="groomingProducts" class="block text-sm font-bold mb-2">Grooming Products:</label>
            <input type="text" id="groomingProducts" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="groomingProducts" />
          </div>
        </div>
      </template>
      <template v-else-if="selectedFamily === 'Bird'">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label for="cageSize" class="block text-sm font-bold mb-2">Cage Size:</label>
            <input type="text" id="cageSize" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="cageSize" />
          </div>
          <div>
            <label for="recommendedToys" class="block text-sm font-bold mb-2">Recommended Toys:</label>
            <input type="text" id="recommendedToys" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="recommendedToys" />
          </div>
          <div>
            <label for="sociability" class="block text-sm font-bold mb-2">Sociability:</label>
            <input type="text" id="sociability" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="sociability" />
          </div>
        </div>
      </template>
      <template v-else-if="selectedFamily === 'Fish'">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label for="tankSize" class="block text-sm font-bold mb-2">Tank Size:</label>
            <input type="text" id="tankSize" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="tankSize" />
          </div>
          <div>
            <label for="compatibleSpecies" class="block text-sm font-bold mb-2">Compatible Species:</label>
            <input type="text" id="compatibleSpecies" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="compatibleSpecies" />
          </div>
          <div>
            <label for="recommendedItems" class="block text-sm font-bold mb-2">Recommended Items:</label>
            <input type="text" id="recommendedItems" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="recommendedItems" />
          </div>
        </div>
      </template>

      <template v-else-if="selectedFamily === 'Reptile'">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label for="tankSize" class="block text-sm font-bold mb-2">Tank Size:</label>
            <input type="text" id="tankSize" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="tankSize" />
          </div>
          <div>
            <label for="sociability" class="block text-sm font-bold mb-2">Sociability:</label>
            <input type="text" id="sociability" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="sociability" />
          </div>
          <div>
            <label for="compatibleSpecies" class="block text-sm font-bold mb-2">Compatible Species:</label>
            <input type="text" id="compatibleSpecies" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="compatibleSpecies" />
          </div>
          <div>
            <label for="recommendedItems" class="block text-sm font-bold mb-2">Recommended Items:</label>
            <input type="text" id="recommendedItems" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="recommendedItems" />
          </div>
        </div>
      </template>
      <template v-else-if="selectedFamily === 'Amphibian'">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label for="humidity" class="block text-sm font-bold mb-2">Humidity:</label>
            <input type="text" id="humidity" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="humidity" />
          </div>
          <div>
            <label for="temperature" class="block text-sm font-bold mb-2">Temperature:</label>
            <input type="text" id="temperature" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="temperature" />
          </div>
        </div>
      </template>

      <div class="w-full px-2 mb-4">
        <label for="healthIssues" class="block text-sm font-bold mb-2">Health Issues:</label>
        <textarea id="healthIssues" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="healthIssues"></textarea>
      </div>
      <div class="w-full px-2 mb-4">
        <label for="personalityDescription" class="block text-sm font-bold mb-2">Personality Description:</label>
        <textarea id="personalityDescription" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="personalityDescription"></textarea>
      </div>





















      <!-- Surenderer info -->

    
  
    <!-- Surenderer info -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      <div>
        <label for="username" class="block text-sm font-bold mb-2">Username Surenderer:</label>
        <input type="text" id="username" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="username" />
      </div>
      <div>
        <label for="checkUser" class="block text-sm font-bold mb-2">Chack User</label>
        <svg @click="checkUser" class="w-10 h-10 text-white dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>




















      <div>
        <label for="image" class="block text-sm font-bold mb-2 text-white">Image:</label>
        <div class="flex items-center justify-center w-full">
          <label :key="fileName" for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:scale-105">
            <div v-if="!fileName" class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p class="mb-2 text-sm text-white"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            </div>
            <div v-else class="flex flex-col items-center justify-center pt-5 pb-6">
              <p class="mb-2 text-sm text-white">{{ fileName }}</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" @change="onFileChange" />
          </label>
        </div>
      </div>
      <!-- Submit Button -->
      <div class="mt-4">
        <button @click="handleSubmit" class="text-white bg-green-700 hover:bg-blue-700 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Submit</button>
      </div>
    </div>
  </div>

</template>



<script>
import AdminNavigation from '../Admin/AdminNavigation.vue';
import WorkerNavigation from '../Worker/WorkerNavigation.vue';

import axios from 'axios';
//import jwtDecode from 'jwt-decode';

localStorage.getItem('userRole');
console.log(localStorage.getItem('userRole'));
export default {
  components: {
    AdminNavigation,
    WorkerNavigation
  },
  data() {
    return {
      role: localStorage.getItem('userRole') || 'Worker', 
      name: '',
      selectedFamily: '',
      species: '',
      subspecies: '',
      age: '',
      gender: '',
      weight: '',
      height: '',
      length: '',
      neutered: false,
      vaccinated: false,
      microchipped: false,
      trained: false,
      socialized: false,
      adopted: false,
      coatType: '',
      groomingProducts: '',
      cageSize: '',
      tankSize: '',
      humidity: '',
      temperature: '',
      compatibleSpecies: '',
      recommendedItems: '',
      healthIssues: '',
      personalityDescription: '',
      image: null,
      selectedFiles: [],
      fileName: '',
      token: 'your-token-here',
      username: '',
      idUser:''
  
    };
  },
  methods: {
    async checkUser() {
   
        const userResponse = await axios.get(`https://localhost:5001/api/auth/getUserByUsername/${this.username}`);
        const userData = userResponse.data;
        console.log(userData.id);

        if (this.accessDenied) {
          return;
        }
      
    },








    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFiles = [file];
        this.fileName = file.name;
      }
    },
    async convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
      });
    },
    async handleSubmit() {
      console.log("Submitting form data...");

      try {
        // Prepare form data
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('family', this.selectedFamily);
        formData.append('species', this.species);
        formData.append('subspecies', this.subspecies);
        formData.append('age', this.age);
        formData.append('gender', this.gender);
        formData.append('weight', this.weight);
        formData.append('height', this.height);
        formData.append('length', this.length);
        formData.append('neutered', this.neutered);
        formData.append('vaccinated', this.vaccinated);
        formData.append('microchipped', this.microchipped);
        formData.append('trained', this.trained);
        formData.append('socialized', this.socialized);
        formData.append('healthIssues', this.healthIssues);
        formData.append('personalityDescription', this.personalityDescription);
        formData.append('adopted', this.adopted);

        if (this.selectedFiles.length > 0) {
          const file = this.selectedFiles[0];
          formData.append('image', file);  // Dodajemo stvarnu datoteku umjesto Base64
          console.log("File added to FormData:", file);
        }

        // Ispis svih podataka koji se šalju
        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }

        // Axios post request
        console.log("Sending data to API...");
        const response = await axios.post('https://localhost:5001/api/animal/addAnimal', formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,  // Authorization header
            // 'Content-Type' is not needed for FormData, Axios will set it automatically
          },
        });

        console.log("Response data:", response.data);
        alert("Animal successfully added!");

      } catch (error) {
        console.error("Error submitting form:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Status:", error.response.status);
          console.error("Headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request error:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        console.error("Config:", error.config);
      }
    },
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
