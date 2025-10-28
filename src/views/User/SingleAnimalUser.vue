<template>

    <!-- Navigation on the left side -->
      <div class="flex-1 rounded-lg p-8">
                  
                  <h4> <router-link to="/home" :class="[active ? '' : '', 'text-stone-200 flex items-center p-2 rounded-lg hover:shadow-lg group']" @click="logout">   
                    <svg class="w-6 h-6 fill-white mr-4" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                   <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z"></path>
                    </svg>
                     Go Back </router-link></h4>
                   <div class="flex flex-col 2xl:flex-row">
                   </div>
    </div>
     <div class="flex justify-center items-start  py-20 mx-25 ml-25">
    <div class="">
  
    </div>

    <div class=" flex flex-col space-y-10">
      <!-- Display animal details panel -->
      <div class="flex flex-col md:flex-row mx-4 shadow-2xl px-10 py-10 relative" v-if="animal">
        <!-- Slika sa lijeve strane -->
        <div class="md:w-1/3">
          <img :src="'data:image/jpeg;base64,' + animal.picture" :alt="animal.name" class="w-full h-auto rounded-lg">
        </div>
        <!-- Podaci o životinji sa desne strane -->
        <div class="md:w-2/3 md:ml-4 mt-4 md:mt-0">
          <h1 class="text-2xl font-bold mb-4 text-stone-200">{{ animal.name }}</h1>
          <button @click="fetchMedicinesDetails()"   class="block  mt-2 size-fit mb-4  text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"type="button">
            <svg class="w-6 h-6 text-stone-200 dark:text-stone-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" clip-rule="evenodd"/>
          </svg>
            <span class="block text-base font-bold mx-2  ">Medicines</span>
          </button>

          <button @click="fetchVetVisits()"   class="block  mt-2 size-fit mb-4  text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"type="button">
            <svg class="w-6 h-6 text-stone-200 dark:text-stone-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" clip-rule="evenodd"/>
          </svg>
            <span class="block text-base font-bold mx-2  ">Vet Visit</span>
          </button>
          <button @click="fetchMedicalHistory()"   class="block  mt-2 size-fit mb-4  text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"type="button">
            <svg class="w-6 h-6 text-stone-200 dark:text-stone-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" clip-rule="evenodd"/>
          </svg>
            <span class="block text-base font-bold mx-2  ">Medical History</span>
          </button>

          <div class="grid grid-cols-2 gap-4 text-stone-200">
            <div><strong>Family:</strong> {{ animal.species }}</div>
            <div><strong>Species:</strong> {{ animal.family }}</div>
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
                <span class="ms-3 text-base font-medium text-stone-200">Neutered</span>
              </label>
            </div>
            <div class="flex items-center">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="animal.vaccinated" class="sr-only peer" disabled>
                <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                <span class="ms-3 text-base font-medium text-stone-200">Vaccinated</span>
              </label>
            </div>
            <div class="flex items-center">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="animal.microchipped" class="sr-only peer" disabled>
                <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                <span class="ms-3 text-base font-medium text-stone-200">Microchipped</span>
              </label>
            </div>
            <div class="flex items-center">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="animal.trained" class="sr-only peer" disabled>
                <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                <span class="ms-3 text-base font-medium text-stone-200">Trained</span>
              </label>
            </div>
            <div class="flex items-center">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="animal.socialized" class="sr-only peer" disabled>
                <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                <span class="ms-3 text-base font-medium text-stone-200">Socialized</span>
              </label>
            </div>
          </div>

          <div class="mt-4 text-stone-200">
            <div><strong>Health Issues:</strong> {{ animal.healthIssues }}</div>
            <div><strong>Personality Description:</strong> {{ animal.personalityDescription }}</div>
          </div>
         




         









          <!-- Additional Fields based on selected family -->
          <template v-if="animal.family === 'Mammal'">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-stone-200">
              <div v-if="additionalDetails.coatType"><strong>Coat Type:</strong> {{ additionalDetails.coatType }}</div>
              <div v-if="additionalDetails.groomingProducts"><strong>Grooming Products:</strong> {{ additionalDetails.groomingProducts }}</div>
            </div>
          </template>

          <template v-else-if="animal.family === 'Bird'">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-stone-200">
              <div v-if="additionalDetails.cageSize"><strong>Cage Size:</strong> {{ additionalDetails.cageSize }}</div>
              <div v-if="additionalDetails.recommendedToys"><strong>Recommended Toys:</strong> {{ additionalDetails.recommendedToys }}</div>
              <div v-if="additionalDetails.sociability"><strong>Sociability:</strong> {{ additionalDetails.sociability }}</div>
            </div>
          </template>

          <template v-else-if="animal.family === 'Fish'">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-stone-200">
              <div v-if="additionalDetails.tankSize"><strong>Tank Size:</strong> {{ additionalDetails.tankSize }}</div>
              <div v-if="additionalDetails.compatibleSpecies"><strong>Compatible Species:</strong> {{ additionalDetails.compatibleSpecies }}</div>
              <div v-if="additionalDetails.recommendedItems"><strong>Recommended Items:</strong> {{ additionalDetails.recommendedItems }}</div>
            </div>
          </template>

          <template v-else-if="animal.family === 'Reptile'">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-stone-200">
              <div v-if="additionalDetails.tankSize"><strong>Tank Size:</strong> {{ additionalDetails.tankSize }}</div>
              <div v-if="additionalDetails.sociability"><strong>Sociability:</strong> {{ additionalDetails.sociability }}</div>
              <div v-if="additionalDetails.compatibleSpecies"><strong>Compatible Species:</strong> {{ additionalDetails.compatibleSpecies }}</div>
            </div>
          </template>

          <template v-else-if="animal.family === 'Amphibian'">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-stone-200">
              <div v-if="additionalDetails.humidity"><strong>Humidity:</strong> {{ additionalDetails.humidity }}<strong> %</strong></div>
              <div v-if="additionalDetails.temperature"><strong>Temperature:</strong> {{ additionalDetails.temperature }}<strong> C°</strong></div>
            </div>
          </template>



     
        <label class="block text-stone-200 font-semibold text-lg mb-1">Reason:</label>
        <textarea v-model="returnDescription" rows="3" placeholder="Reason"
                class="mb-4 w-full rounded border border-white/5 bg-transparent text-stone-200 shadow-2xl backdrop-blur-sm p-3 placeholder-white"></textarea>

          <div class="mt-4 text-stone-200">
            
             <button type="button"   @click="returnAnimal()" class="mb-4  text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
             <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM160.9 286.2c4.8 1.2 9.9 1.8 15.1 1.8c35.3 0 64-28.7 64-64V160h44.2c12.1 0 23.2 6.8 28.6 17.7L320 192h64c8.8 0 16 7.2 16 16v32c0 44.2-35.8 80-80 80H272v50.7c0 7.3-5.9 13.3-13.3 13.3c-1.8 0-3.6-.4-5.2-1.1l-98.7-42.3c-6.6-2.8-10.8-9.3-10.8-16.4c0-2.8 .6-5.5 1.9-8l15-30zM160 160h40 8v32 32c0 17.7-14.3 32-32 32s-32-14.3-32-32V176c0-8.8 7.2-16 16-16zm128 48a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z"></path>

                        </svg>
                 <span class="block text-base font-bold mx-2 ">Reaturn</span>
              </button>
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
  import instance from '@/axiosBase';
  import { ref, onMounted } from 'vue';
  import Swal from 'sweetalert2'
import { RouterLink } from 'vue-router';
const router = useRouter();

  const token = ref(localStorage.getItem('token'));

  export default defineComponent({
    name: 'AnimalDetails',
 components: {
    RouterLink,


  },
    data() {
      return {
        user_id: localStorage.getItem('userId'),
        animal: null,
        adoption: null,
        items: [],
        contageus: [],
        labs: [],
        vetVisit: [],
        medicines:[null],
        singleId:'',
        animalEdit: null,
        adopterData: null,
        additionalDetailsEdit: null,
        additionalDetails: {},
        fileName: '',
        showRemuve: false,
        isEditing: false, 
        showMedicinesModal: false,  
        filters: {
        adoptionCode: '',
         showReturnModal: false,
      selectedAnimal: null,
      returnDescription: '',
     
      },
      };
    },
    
    computed: 
            {
                    
                    filteredItems() {
                return this.medicines.filter(medicine => {
                    return (!this.filters.idAn || medicine.id === this.filters.idAn) 
                });
                },
            
            }, 
                async created() {
                const adoptionCode = this.$route.params.id;
                console.log("code:"+adoptionCode);
                this.fetchAnimalDetails(adoptionCode);
                
                },
 methods: {


    async returnAnimal() {
  try {
    if (!this.returnDescription) {
     
         await Swal.fire({
      title: "Please fill in reason!",
      icon: "warning",
      draggable: true,
    });
      return;
    }
        const adoptionCode = this.$route.params.id;
    // Pretpostavljam da ovdje trebaš dohvatiti adoption info prije slanja povratka
    console.log("Adoption Code:", adoptionCode);
    const responsea = await instance.get(`animal/adopted/${adoptionCode}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    console.log(responsea.data);
    this.adoption = responsea.data;
        console.log("Adoption data:", this.adopterData.id);
        console.log("Payload:", {
        adoptionCode: parseInt(adoptionCode),
        animalId: this.animal.idAnimal,
        adopterId: parseInt(this.adopterData.id),
        returnReason: this.returnDescription,
        });

  const addResponse=   await instance.post('animal/addReaturndAnimal', {
      adoptionCode: parseInt(adoptionCode),
      animalId: this.animal.idAnimal,
      adopterId: parseInt(this.adopterData.id),
      returnReason: this.returnDescription,

    }, {
      headers: { Authorization: `Bearer ${this.token}` }
    });



   const falseResponse= await instance.put(`animal/adoptionstatusfalse/${this.animal.idAnimal}`, {}, {
      headers: { Authorization: `Bearer ${this.token}` }
    });

   const updateResponse= await instance.put(`animal/updateAnimalRecord/`, {
      animalId: this.animal.idAnimal,
      recordId: 9
    }, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
console.log("updateAnimalRecord", updateResponse.status);
console.log("falseResponse", falseResponse.status);
console.log("addResponse", addResponse.status);
    await Swal.fire({
      title: "Animal returned successfully!",
      icon: "success",
      draggable: true,
    });
  
       this.$router.push('/home');
  } catch (error) {
    console.error("Error handling return:", error);
    await Swal.fire({
      title: "Error!",
      icon: "error",
      draggable: true,
    });
  }
},



                        async fetchAnimalDetails(adoptionCode) {
                            try {
                            const response = await instance.get(`animal/adoptedCode/${adoptionCode}`, {
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                                });

                                this.adoption = response.data;
                                this.animal = response.data.animal;       // podaci o životinji
                                this.animalEdit = response.data.animal;   // za edit
                                this.additionalDetails = response.data;   // ili dodatne ako ih imaš
                                this.additionalDetailsEdit = response.data;
                                    this.adopterData = response.data.adopter; // podaci o udomitelju
                                console.log("Adoption data:", this.adoption);
                                 console.log("Adoption data:", response.data.animal);
                                    console.log("Adopter data:", response.data.adopter);
                            if (this.animal && this.animal.species) {
                                let familyRoute = '';
                                switch (this.animal.species) {
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
                                    console.error('Unknown family:', this.animal.species);
                                    return;
                                }
                                    console.log("response", response.data);
                                console.log("animal", familyRoute);
                                const familyResponse = await instance.get(`animal/${familyRoute}/${this.animal.idAnimal}`);
                                this.additionalDetails = familyResponse.data;
                                this.additionalDetailsEdit = familyResponse.data;

                            }
                            } catch (error) {
                            console.error('Error fetching animal details:', error);
                            }
                        },

                    // Fetch medicines details
                        
                    // Fetch contageus details

                    async fetchMedicinesDetails() {
                    
                    const idA = this.$route.params.id;
                    console.log("id:"+idA);
                    const response = await instance.get(`pdf/generateMedicines/${idA}`,{
                    responseType: 'blob',
                    headers: {
                        Accept: 'application/pdf',
                    },
                    data: {

                    },
                    });
                        const blob = new Blob([response.data], { type: 'application/pdf' });
                        const link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = `Medicines-${+new Date()}.pdf`;
                        link.click();
                        window.URL.revokeObjectURL(link.href);

                    },

//------------------------------------
//VET STUF
//--------------------


  async fetchVetVisits() {
    const id = this.animal.idAnimal;
    console.log("Animal ID:", id);
    const response = await instance.get(`pdf/generateVetVisits/${id}`, {
        responseType: 'blob',
        headers: { Accept: 'application/pdf' },
    });
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `VetVisit-${+new Date()}.pdf`;
    link.click();
    window.URL.revokeObjectURL(link.href);
},


                        
async fetchMedicalHistory() {
    const id = this.animal.idAnimal;
    console.log("Animal ID:", id);
    const response = await instance.get(`pdf/generateMedicalHistory/${id}`, {
        responseType: 'blob',
        headers: { Accept: 'application/pdf' },
    });
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `MedicalHistory-${+new Date()}.pdf`;
    link.click();
    window.URL.revokeObjectURL(link.href);
},


async fetchContageusDetails() {
  const id = this.animal.idAnimal;
  const response = await instance.get(`animal/contageusAnimal/${id}`);
  this.contageus = response.data;
},



// Fetch labs details
async fetchLabsDetails() {
  const id = this.animal.idAnimal;
  const response = await instance.get(`animal/labsAnimal/${id}`);
  this.labs = response.data;
},

async fetchVetVisitDetails() {
  const id = this.animal.idAnimal;
  const response = await instance.get(`animal/vetVisitAnimal/${id}`);
  this.vetVisit = response.data;
},



},
      watch: {
         filters: {
             handler() {
                 this.filteredItems = this.medicines.filter(medicine => {
                 return (
                        (!this.filters.id || medicine.id === this.filters.id)
                  );
                });
            },
         deep: true,
         },
        },
     });
</script>
