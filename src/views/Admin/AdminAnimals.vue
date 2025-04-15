<template>
    <div class="flex justify-center items-start mt-8 py-20 mx-25 ml-25">
      <!-- Navigation on the left side -->
      <Loading v-if="loadingError" />
      <div class="w-1/4">
      <AdminNavigation/>
      </div>
  
      <div class="w-3/4 flex flex-col space-y-10 ">
  <!-- Display animal details panel -->
  <div class="flex flex-col md:flex-row mx-4 shadow-2xl px-10 py-10 relative overflow-hidden" v-if="animal">
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


      <!-- Remove Button -->
      <div class="flex justify-center mt-20">
        <button
        @click="showRemuve = true"
          :disabled="animal.adopted"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
          Remove
         </button>

            <button
              @click="isEditing = !isEditing"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
              Edit
            </button>
           <!-- Modal for remove confirmation -->
    <div v-if="showRemuve" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <!-- Modal Content -->
      <div class="rounded-lg relative flex flex-col justify-between "
           style="background-image: url('/remuve.png'); background-size: cover; background-position: center; width: 500px; height: 700px;">
        <h2 class="text-2xl font-bold mb-4 p-4 mt-2 ml-2 rounded-t-lg" style="color: #220F38;"></h2>
        <div class="p-8 flex flex-col items-center rounded-b-lg w-full">
          <label class="inline-flex items-center mb-4">
            <span class="ml-2 text-green-800">{{ animalEdit.name }}</span>
          </label>
          <div class="flex mb-4 justify-center">
            <button @click="removeAnimal" class="px-6 py-3 rounded bg-green-500 text-white">Agree</button>
          </div>
          <!-- Add cancel button or close modal functionality -->
          <div class="flex mb-4 justify-center">
            <button @click="showRemuve = false" class="px-6 py-3 rounded bg-red-500 text-white">Cancel</button>
          </div>
        </div>
      </div>
    </div>
      
      </div>
      <div class="flex justify-center text-sm text-red-500 ">
      <p>You can only remove deceased animals.</p> <!-- Napravi da se uginule životinje u recordu prikazuju kao mrtve -->
    
    </div>
    </div>
  </div>


  
       <!-- Edit animal details panel -->
       <div v-if="isEditing" class="flex flex-col md:flex-row mx-4 shadow-2xl px-10 py-10 overflow-hidden">
          
        <div class="md:w-2/3 md:ml-4 mt-4 md:mt-0">
          <h1 class="text-2xl font-bold mb-4 text-white">Edit {{ animalEdit.name }}</h1>
  


  <div class="md:w-2/3 md:ml-4 mt-4 md:mt-0">

  <div class="grid grid-cols-2 gap-4 text-white">
    <div class="flex items-center "><strong>Family:</strong> <span class="ml-2 text-wrap" id="family">{{ animalEdit.family }}</span></div>
    <div class="flex items-center"><strong>Species:</strong> <span class="ml-2 text-wrap" id="species">{{ animalEdit.species }}</span></div>
    <div class="flex items-center"><strong>Subspecies:</strong> <span class="ml-2 text-wrap" id="subspecies">{{ animalEdit.subspecies }}</span></div>
    <div class="flex items-center"><strong>Age:</strong> <input v-model="animalEdit.age" id="age" class="form-input text-gray-500 rounded-md p-2 ml-2 text-wrap" /><strong class="ml-2">years</strong></div>
    <div class="flex items-center"><strong>Gender:</strong> <span class="ml-2 text-wrap" id="gender">{{ animalEdit.gender }}</span></div>
    <div class="flex items-center ml-2"><strong>Weight:</strong> <input v-model="animalEdit.weight" id="weight" class="form-input text-gray-500 rounded-md p-2 ml-2 text-wrap" /><strong class="ml-2">kg</strong></div>
    <div class="flex items-center"><strong>Height:</strong> <input v-model="animalEdit.height" id="height" class="form-input text-gray-500 rounded-md p-2 ml-2 text-wrap" /><strong class="ml-2">cm</strong></div>
    <div class="flex items-center"><strong>Length:</strong> <input v-model="animalEdit.length" id="length" class="form-input text-gray-500 rounded-md p-2 ml-2 text-wrap" /><strong class="ml-2">cm</strong></div>
  </div>
  <div class="mt-4 grid grid-cols-2 gap-4">
    <div class="flex items-center">
      <label class="inline-flex items-center cursor-pointer" for="neutered">
        <input type="checkbox" v-model="animalEdit.neutered" id="neutered" class="sr-only peer" :disabled="animalEdit.neutered">
        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
        <span class="ms-3 text-sm font-medium text-white">Neutered</span>
      </label>
    </div>
    <div class="flex items-center">
      <label class="inline-flex items-center cursor-pointer" for="vaccinated">
        <input type="checkbox" v-model="animalEdit.vaccinated" id="vaccinated" class="sr-only peer" :disabled="animalEdit.vaccinated">
        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
        <span class="ms-3 text-sm font-medium text-white">Vaccinated</span>
      </label>
    </div>
    <div class="flex items-center">
      <label class="inline-flex items-center cursor-pointer" for="microchipped">
        <input type="checkbox" v-model="animalEdit.microchipped" id="microchipped" class="sr-only peer" :disabled="animalEdit.microchipped">
        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
        <span class="ms-3 text-sm font-medium text-white">Microchipped</span>
      </label>
    </div>
    <div class="flex items-center">
      <label class="inline-flex items-center cursor-pointer" for="trained">
        <input type="checkbox" v-model="animalEdit.trained" id="trained" class="sr-only peer" :disabled="animalEdit.trained">
        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
        <span class="ms-3 text-sm font-medium text-white">Trained</span>
      </label>
    </div>
    <div class="flex items-center">
      <label class="inline-flex items-center cursor-pointer" for="socialized">
        <input type="checkbox" v-model="animalEdit.socialized" id="socialized" class="sr-only peer" :disabled="animalEdit.socialized">
        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
        <span class="ms-3 text-sm font-medium text-white">Socialized</span>
      </label>
    </div>
  </div>

  <div class="mt-4 text-white">
    <div class="flex items-center"><strong>Health Issues:</strong> <textarea v-model="animalEdit.healthIssues" id="healthIssues" class="form-textarea text-gray-500 w-full rounded-md p-2 ml-2"></textarea></div>
    <div class="flex items-center mt-4"><strong>Personality Description:</strong> <textarea v-model="animalEdit.personalityDescription" id="personalityDescription" class="form-textarea text-gray-500 w-full rounded-md p-2 ml-2"></textarea></div>
  </div>

  <!-- Additional Fields based on selected family -->
  <template v-if="animal.family === 'Mammal'">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
      <div class="flex items-center"><strong>Coat Type:</strong> <input v-model="additionalDetailsEdit.coatType" id="coatType" class="form-input text-gray-500 rounded-md p-2 ml-2" /></div>
      <div class="flex items-center"><strong>Grooming Products:</strong> <input v-model="additionalDetailsEdit.groomingProducts" id="groomingProducts" class="form-input text-gray-500 rounded-md p-2 ml-2" /></div>
    </div>
  </template>
  <template v-else-if="animal.family === 'Bird'">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4 text-white">
      <div class="flex items-center"><strong>Cage Size:</strong> <input v-model="additionalDetailsEdit.cageSize" id="cageSize" class="form-input text-gray-500 rounded-md p-2 ml-2" /></div>
      <div class="flex items-center"><strong>Recommended Toys:</strong> <input v-model="additionalDetailsEdit.recommendedToys" id="recommendedToys" class="form-input text-gray-500 rounded-md p-2 ml-2" /></div>
      <div class="flex items-center"><strong>Sociability:</strong> <input v-model="additionalDetailsEdit.sociability" id="sociability" class="form-input text-gray-500 rounded-md p-2 ml-2" /></div>
    </div>
  </template>
  <template v-else-if="animal.family === 'Fish'">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
      <div class="flex items-center"><strong>Tank Size:</strong> <input v-model="additionalDetailsEdit.tankSize" id="tankSize" class="form-input text-gray-500 rounded-md p-2 ml-2" /></div>
      <div class="flex items-center"><strong>Compatible Species:</strong> <input v-model="additionalDetailsEdit.compatibleSpecies" id="compatibleSpecies" class="form-input text-gray-500 rounded-md p-2 ml-2" /></div>
      <div class="flex items-center"><strong>Recommended Items:</strong> <input v-model="additionalDetailsEdit.recommendedItems" id="recommendedItems" class="form-input text-gray-500 rounded-md p-2 ml-2" /></div>
    </div>
  </template>
  <template v-else-if="animal.family === 'Reptile'">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
      <div class="flex items-center"><strong>Tank Size:</strong> <input v-model="additionalDetailsEdit.tankSize" id="reptileTankSize" class="form-input text-gray-500 rounded-md p-2 ml-2" /></div>
      <div class="flex items-center"><strong>Sociability:</strong> <input v-model="additionalDetailsEdit.sociability" id="reptileSociability" class="form-input text-gray-500 rounded-md p-2 ml-2" /></div>
      <div class="flex items-center"><strong>Compatible Species:</strong> <input v-model="additionalDetailsEdit.compatibleSpecies" id="reptileCompatibleSpecies" class="form-input text-gray-500 rounded-md p-2 ml-2" /></div>
    </div>
  </template>
  <template v-else-if="animal.family === 'Amphibian'">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
      <div class="flex items-center "><strong>Humidity:</strong> <input v-model="additionalDetailsEdit.humidity" id="humidity" class="form-input text-gray-500 rounded-full p-2 ml-2" /><strong class="ml-2">%</strong></div>
      <div class="flex items-center ml-5"><strong>Temperature:</strong> <input v-model="additionalDetailsEdit.temperature" id="temperature" class="form-input text-gray-500 rounded-full p-2 ml-2" /><strong class="ml-2">C°</strong></div>
    </div>
  </template>
  <div class="flex justify-center mt-20">
    <button @click="editAnimal" class="bg-green-500 text-white px-4 py-2 rounded-md">Edit</button>
  </div>
</div>
</div>
      </div>

        </div>
    </div>
        
    </template>
  <script>
  //ako ne radi brisanje to je zato što pola životinja nema rekord unjeli su se podaci za životinju i niš drugo
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import AdminNavigation from '../Admin/AdminNavigation.vue';
  import Loading  from '../Loading.vue';
  import instance from '@/axiosBase';
  import { ref, onMounted } from 'vue';

  const token = ref(localStorage.getItem('token'));

  export default defineComponent({
    name: 'AnimalDetails',
    components: {
      AdminNavigation,
      Loading,
    },
    data() {
      return {
        loadingError:false,
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
        console.log("animal id:"+this.animal.idAnimal)
        try {
          this.loadingError = true;
          const responseDelate =  await instance.put(`animal/updateAnimalRecord/`,  { 
                  animalId:this.animal.idAnimal,
                  recordId:8
                }
              ,{
                headers: { Authorization: `Bearer ${token.value}`,   }, });
                if(responseDelate.status==200) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                } 
          this.$router.push('/search');
        } catch (error) {
          this.loadingError = true;
          console.error('Error removing animal:', error);
        }
      },
      async fetchAnimalDetails(id) {
        try {
          this.loadingError = true;
          const response = await instance.get(`animal/allanimal/${id}`);
          this.animal = response.data;
          this.animalEdit = response.data;
          if(this.animal != null && this.animal.idAnimal != null) {
            setTimeout(() => {
            this.loadingError = false; 
          }, 1000)
          } 
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
          this.loadingError = true;

          console.error('Error fetching animal details:', error);
        }
      },
      async editAnimal() {
        try {
          const id = this.$route.params.id;
          await instance.put(
            `animal/updateAnimal/${id}`, // Correct endpoint with ID
            {
              Animal: {
                IdAnimal: parseInt(id),
                Age: this.animalEdit.age,
                Weight: this.animalEdit.weight,
                Height: parseFloat(this.animalEdit.height),
                Length: parseFloat(this.animalEdit.length),
                Neutered: this.animalEdit.neutered,
                Vaccinated: this.animalEdit.vaccinated,
                Microchipped: this.animalEdit.microchipped,
                Trained: this.animalEdit.trained,
                Socialized: this.animalEdit.socialized,
                HealthIssues: this.animalEdit.healthIssues,
                PersonalityDescription: this.animalEdit.personalityDescription,
              }
            },
            {
              headers: {
                Authorization: `Bearer ${token.value}`,
              },
            }
          );
          console.log('Animal details updated successfully');
          console.log(this.additionalDetailsEdit.animalId);
          if (this.additionalDetailsEdit !=null && this.animal.family!=null) {
            const familyData = {};
            familyData.idAnimal= parseInt(id);
           //radi
           switch (this.animal.family) {
              case 'Mammal':
               var responseM= await instance.put('animal/updateMammal', 
                { 
                  animalId:this.additionalDetailsEdit.animalId,
                  coatType:this.additionalDetailsEdit.coatType,
                  groomingProducts:this.additionalDetailsEdit.groomingProducts,
                }
              ,{
                headers: { Authorization: `Bearer ${token.value}`,   }, });
                console.log("Mammel"+ responseM.data);
                break;

              case 'Bird':
                var responseM= await instance.put('animal/updateBird', 
                { 
                  animalId:this.additionalDetailsEdit.animalId,
                  cageSize:this.additionalDetailsEdit.cageSize,
                  recommendedToys:this.additionalDetailsEdit.recommendedToys,
                  sociability:this.additionalDetailsEdit.sociability

                }
              ,{
                headers: { Authorization: `Bearer ${token.value}`,   }, });
                console.log("Bird");
                break;

              case 'Fish':
              var responseM= await instance.put('animal/updateFish', 
                { 
                  animalId:this.additionalDetailsEdit.animalId,
                  tankSize:this.additionalDetailsEdit.tankSize,
                  compatibleSpecies:this.additionalDetailsEdit.compatibleSpecies,
                  recommendedItems:this.additionalDetailsEdit.recommendedItems

                }
              ,{
                headers: { Authorization: `Bearer ${token.value}`,   }, });
                console.log("Fish");
                break;

              case 'Reptile':              
                 var responseM= await instance.put('animal/updateReptile', 
                { 
                  animalId:this.additionalDetailsEdit.animalId,
                  tankSize:this.additionalDetailsEdit.tankSize,
                  sociability:this.additionalDetailsEdit.sociability,
                  compatibleSpecies:this.additionalDetailsEdit.compatibleSpecies,
                  recommendedItems: this.additionalDetailsEdit.recommendedItems

                }
              ,{
                headers: { Authorization: `Bearer ${token.value}`,   }, });
                console.log("Reptile");
                break;
              case 'Amphibian':
                var responseM= await instance.put('animal/updateAmphibian', 
                { 
                  animalId:this.additionalDetailsEdit.animalId,
                  humidity:parseFloat( this.additionalDetailsEdit.humidity),
                  temperature:parseFloat(this.additionalDetailsEdit.temperature)

                }
              ,{
                headers: { Authorization: `Bearer ${token.value}`,   }, });
                console.log("Amphibian");
                break;
              default:
                console.error('Unknown family:', this.responseFamily);
                return;
            }
            
          }
        } catch (error) {
          console.error('Error editing animal details:', error);
        }
      }
    }
  });
</script>
