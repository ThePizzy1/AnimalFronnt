<template>
  <div class="flex justify-center items-start py-20 px-10">
    <!-- 🔹 Lijeva navigacija -->
    <div class="w-1/4">
      <VetNavigation />
    </div>

    <!-- 🔹 Glavni sadržaj -->
    <div class="w-3/4 flex flex-col space-y-10 text-stone-200">
      <div
        v-if="animal"
        class="flex flex-col md:flex-row bg-[#0e0e0e]/90 rounded-2xl border border-stone-700/50 shadow-lg backdrop-blur-sm p-10"
      >
        <!-- Slika životinje -->
        <div class="md:w-1/3">
          <img
            :src="'data:image/jpeg;base64,' + animal.picture"
            :alt="animal.name"
            class="w-full h-auto rounded-2xl shadow-md"
          />
        </div>

        <!-- Detalji -->
        <div class="md:w-2/3 md:ml-8 mt-6 md:mt-0">
          <h1 class="text-3xl font-semibold mb-6 text-white/90">
            {{ animal.name }}
          </h1>

          <!-- Gumbi -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button
              @click="fetchMedicinesDetails"
              class="flex items-center bg-emerald-600 hover:bg-emerald-500 transition text-white font-semibold px-4 py-2 rounded-full shadow-md"
            >
              💊 Medicines
            </button>
            <button
              @click="fetchVetVisits"
              class="flex items-center bg-emerald-600 hover:bg-emerald-500 transition text-white font-semibold px-4 py-2 rounded-full shadow-md"
            >
              🩺 Vet Visit
            </button>
            <button
              @click="fetchMedicalHistory"
              class="flex items-center bg-emerald-600 hover:bg-emerald-500 transition text-white font-semibold px-4 py-2 rounded-full shadow-md"
            >
              📜 Medical History
            </button>
          </div>

          <!-- Osnovni podaci -->
          <div class="grid grid-cols-2 gap-4 text-gray-300 text-base">
            <div><strong>Family:</strong> {{ animal.family }}</div>
            <div><strong>Species:</strong> {{ animal.species }}</div>
            <div><strong>Subspecies:</strong> {{ animal.subspecies }}</div>
            <div><strong>Age:</strong> {{ animal.age }} years</div>
            <div><strong>Gender:</strong> {{ animal.gender }}</div>
            <div><strong>Weight:</strong> {{ animal.weight }} kg</div>
            <div><strong>Height:</strong> {{ animal.height }} cm</div>
            <div><strong>Length:</strong> {{ animal.length }} cm</div>
          </div>

          <!-- Checkbox info -->
          <div class="mt-6 grid grid-cols-2 gap-3">
            <div
              v-for="trait in [
                { key: 'neutered', label: 'Neutered' },
                { key: 'vaccinated', label: 'Vaccinated' },
                { key: 'microchipped', label: 'Microchipped' },
                { key: 'trained', label: 'Trained' },
                { key: 'socialized', label: 'Socialized' },
              ]"
              :key="trait.key"
              class="flex items-center"
            >
              <input
                type="checkbox"
                v-model="animal[trait.key]"
                disabled
                class="sr-only peer"
              />
              <div
                class="relative w-11 h-6 bg-stone-700 rounded-full peer peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-stone-300 after:rounded-full after:transition-all peer-checked:after:translate-x-full"
              ></div>
              <span class="ml-3">{{ trait.label }}</span>
            </div>
          </div>

          <!-- Health / Personality -->
          <div class="mt-6 text-gray-300 space-y-2">
            <div>
              <strong>Health Issues:</strong> {{ animal.healthIssues }}
            </div>
            <div>
              <strong>Personality Description:</strong>
              {{ animal.personalityDescription }}
            </div>
          </div>

          <!-- Dodatne informacije -->
          <template v-if="animal.family === 'Mammal'">
            <div class="mt-6 grid grid-cols-2 gap-4">
              <div v-if="additionalDetails.coatType">
                <strong>Coat Type:</strong> {{ additionalDetails.coatType }}
              </div>
              <div v-if="additionalDetails.groomingProducts">
                <strong>Grooming Products:</strong>
                {{ additionalDetails.groomingProducts }}
              </div>
            </div>
          </template>

          <template v-else-if="animal.family === 'Bird'">
            <div class="mt-6 grid grid-cols-2 gap-4">
              <div v-if="additionalDetails.cageSize">
                <strong>Cage Size:</strong> {{ additionalDetails.cageSize }}
              </div>
              <div v-if="additionalDetails.recommendedToys">
                <strong>Recommended Toys:</strong>
                {{ additionalDetails.recommendedToys }}
              </div>
              <div v-if="additionalDetails.sociability">
                <strong>Sociability:</strong> {{ additionalDetails.sociability }}
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- 💊 Modal za lijekove -->
      <div
        v-if="showMedicinesModal"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
      >
        <div
          class="bg-[#0e0e0e]/95 p-8 rounded-2xl border border-emerald-700 shadow-2xl w-[80%] max-w-5xl"
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-semibold text-white">Medicines</h3>
            <button
              @click="showMedicinesModal = false"
              class="text-gray-400 hover:text-emerald-400 text-2xl font-bold"
            >
              ✖
            </button>
          </div>

          <div class="overflow-x-auto custom-scrollbar">
            <table class="min-w-full text-center text-gray-300">
              <thead class="bg-gray-900 text-emerald-300 uppercase text-xs">
                <tr class="border-b border-stone-700 text-emerald-400">
                  <th class="px-5 py-3 font-semibold">Name</th>
                  <th class="px-5 py-3 font-semibold">Description</th>
                  <th class="px-5 py-3 font-semibold">Vet</th>
                  <th class="px-5 py-3 font-semibold">Amount</th>
                  <th class="px-5 py-3 font-semibold">Intake</th>
                  <th class="px-5 py-3 font-semibold">Frequency</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="medicine in filteredItems"
                  :key="medicine.id"
                  class="hover:bg-stone-800/70 transition-all border-b border-stone-800"
                >
                  <td class="px-5 py-3 font-medium">{{ medicine.nameOfMedicines }}</td>
                  <td class="px-5 py-3">{{ medicine.description }}</td>
                  <td class="px-5 py-3">{{ medicine.vetUsername }}</td>
                  <td class="px-5 py-3">
                    {{ medicine.amountOfMedicine + " " + medicine.mesurmentUnit }}
                  </td>
                  <td class="px-5 py-3">{{ medicine.medicationIntake }}</td>
                  <td class="px-5 py-3">{{ medicine.frequencyOfMedicationUse }}</td>
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
        medicines:[null],
        singleId:'',
        animalEdit: null,
        additionalDetailsEdit: null,
        additionalDetails: {},
        fileName: '',
        showRemuve: false,
        isEditing: false, 
        showMedicinesModal: false,  
        filters: {
        idAn: '',
     
      },
      };
    },
    computed: { filteredItems() {
      return this.medicines.filter(medicine => {
        return (!this.filters.idAn || medicine.id === this.filters.idAn) 
      });
    },
 
  }, 
    async created() {
      const idA = this.$route.params.id;
      console.log("id:"+idA);
      this.fetchAnimalDetails(idA);
      
    },
    methods: {


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



   async fetchVetVisits() {
   
   const idA = this.$route.params.id;
   console.log("id:"+idA);
   const response = await instance.get(`pdf/generateVetVisits/${idA}`,{
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
       link.download = `VetVisit-${+new Date()}.pdf`;
       link.click();
       window.URL.revokeObjectURL(link.href);
      },

      

  async fetchMedicalHistory() {
   
   const idA = this.$route.params.id;
   console.log("id:"+idA);
   const response = await instance.get(`pdf/generateMedicalHistory/${idA}`,{
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
       link.download = `MedicalHistory-${+new Date()}.pdf`;
       link.click();
       window.URL.revokeObjectURL(link.href);
   
   
   
      },
      async fetchAnimalDetails(id) {
        try {
          const response = await instance.get(`animal/allanimal/${id}`);
          this.animal = response.data;
          this.animalEdit = response.data;
          console.log(response.data);
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
