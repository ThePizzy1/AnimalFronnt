<template>  
  <Loading v-if="loadingError" /> 

 <div class="flex-1 rounded-lg p-8">
                  
                  <h4> <router-link to="/animals" :class="[active ? '' : '', 'text-white flex items-center p-2 rounded-lg hover:shadow-lg group']" @click="logout">   
                    <svg class="w-6 h-6 fill-white mr-4" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                   <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z"></path>
                    </svg>
                     Go Back </router-link></h4>
                   <div class="flex flex-col 2xl:flex-row">
                   </div>
    </div>
   

  <div class="flex justify-center items-center  py-20 mx-25">
 
    <div class="w-full md:w-3/4 lg:w-1/2 flex flex-col md:flex-row mx-4 shadow-2xl px-10 py-10" v-if="animal">
      <!-- Slika sa lijeve strane -->
      <div class="md:w-1/3">
        <img :src="'data:image/jpeg;base64,' + animal.picture" :alt="animal.name" class="w-full h-auto rounded-lg">
      </div>
      <!-- Podaci o životinji sa desne strane -->
      <div class="md:w-2/3 md:ml-4  md:mt-0">
          <button @click="fetchMedicalHistory()"   class="block  mt-2 size-fit mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"type="button">
            <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" clip-rule="evenodd"/>
          </svg>
            <span class="block text-base font-bold mx-2  ">Medical History</span>
          </button>
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
  <button @click="showAdoptForm = true" class="block px-3 mt-2 size-fit mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"type="button">Adopt</button>
  <!-- Modal Background -->
  <div v-if="showAdoptForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <!-- Modal Background -->
  <div v-if="showAdoptForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <!-- Modal Content -->
    <form 
    
      @submit.prevent="handleAdopt"
      class="rounded-lg relative flex flex-col justify-between" 
      style="
        background-image: url('/agree.png'); 
        background-size: cover; 
        background-position: center;
        width: 500px;
        height: 700px;
      "
    >
 <!-- Flex kontejner za naslov i dugme -->
<div class="flex items-center justify-between p-4 mt-2 ml-2 rounded-t-lg">
  <h2 class="text-2xl font-bold" style="color: #220F38;">Adoption Agreement</h2>
  <button @click="showAdoptForm = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
    <span class="sr-only">Close</span>
  </button>
</div>

   
      
      <div class="p-8 flex flex-col items-center rounded-b-lg w-full">
        <!-- Checkbox -->
        <label class="inline-flex items-center mb-4">
          <input type="checkbox" v-model="agreed" class="form-checkbox h-5 w-5 text-green-500">
          <span class="ml-2 text-green-800">I agree to adopt {{ animal.name }}</span>
        </label>

        <!-- Submit Button -->
        <div class="flex mb-4 justify-center">
          <button 
            type="submit" 
            :disabled="!agreed" 
            class="block px-3 mt-2 size-fit mb-4 text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            Agree
          </button>
        </div>
      </div>
    </form>
  </div>
  </div>
</div>


      </div>
    </div>
  </div>
</template>
<script>
//ovdije ide ispis životinje, sa podacima di je nađena koji je njen record trenutne bolesti,
//Ovak ne radi adopt nekak mutavo to spremi, ako adoptaš jednu životinju više puta onda ti ju svai put prikaže opet
//ako ju posvojiš tri puta imat ćeš tri njene kopije
//to popravi tako što ćeš vidjet kad je životinja vraćena zadnje i samo prikazat one podatke posvajanja koji su nakon toga. ili nekako samo zadnje.
// dodaj rekord 7 adopted, moraš dodat token za to
//ako posvojiš nekako ne možeš uć više solo životinju
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import instance from '@/axiosBase';
import Swal from 'sweetalert2'
import Loading from '../Loading.vue';

export default defineComponent({
  name: 'AnimalDetails',
  components: {
    RouterLink,
    Loading,

  },
  data() {
    return {
      loadingError:false,
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
        this.loadingError = true;
        const response = await instance.get(`animal/animal/${id}`);
        this.animal = response.data;
        if(this.animal!=null) {
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

          const familyResponse = await instance.get(`animal/${familyRoute}/${id}`);
          this.additionalDetails = familyResponse.data;
        }
      } catch (error) {
        setTimeout(() => {
                this.loadingError = true; 
                }, 1000)
                this.$router.push(`/Home`);

        console.error('Error fetching animal details:', error);
      }
    },
  async handleAdopt() {
  if (!this.agreed) return;

  const id = parseInt(this.$route.params.id);
  const userId = parseInt(localStorage.getItem('adopterid'));

  try {
    // 1. Update record
    const recordResponse = await instance.put(`animal/updateAnimalRecord`, {
      animalId: id,
      recordId: 7
    });
    console.log("Record updated:", recordResponse.data);

    // 2. Save adoption data
    const adoptionData = {
      animalId: id,
      adopterId: userId,
      adoptionDate: new Date().toISOString().split('T')[0]
    };

    const adoptResponse = await instance.post('animal/addAdoptedAnimal', adoptionData);
    console.log("Adoption saved:", adoptResponse.data);

    // 3. Update animal status
    await instance.put(`animal/adoptionstatus/${id}`);
    console.log("Status updated");

    // 4. Increment adopter's adoption count
    await instance.put(`animal/incrementAdopted/${userId}`);
    console.log("Adoption count incremented");

    // 5. Success alert
    await Swal.fire({
      title: "Animal adopted!",
      icon: "success"
    });

    // Redirect
    this.$router.push('/animals');

  } catch (error) {
    console.error('Error during adoption:', error);
    await Swal.fire({
      title: "Something went wrong!",
      icon: "error",
      text: error.response?.data || "Unknown error"
    });
    this.$router.push('/animals');
  }
}
  }
});
</script>
