<template>
  <!-- Navigation on the left side -->
  <div class="flex-1 rounded-lg p-8 shadow-inner  ">
    <h4>
      <router-link
        to="/home"
        :class="[active ? '' : '', 'text-stone-200 flex items-center p-2 rounded-lg hover:shadow-lg group hover:bg-emerald-700/20']"
        @click="logout"
      >
        <svg
          class="w-6 h-6 fill-emerald-400 mr-4 group-hover:fill-emerald-300 transition"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z"
          />
        </svg>
        Go Back
      </router-link>
    </h4>
  </div>

  <div class="flex justify-center items-start py-20 mx-25 ml-25  text-stone-100">
    <div class="flex flex-col space-y-10 w-full max-w-6xl">
      <!-- Animal details panel -->
      <div
        class="flex flex-col md:flex-row mx-4 bg-neutral-900/80 border border-emerald-600 rounded-xl shadow-2xl px-10 py-10 backdrop-blur-sm"
        v-if="animal"
      >
        <!-- Left: image -->
        <div class="md:w-1/3 flex justify-center items-center">
          <img
            :src="'data:image/jpeg;base64,' + animal.picture"
            :alt="animal.name"
            class="w-full h-auto rounded-lg border-2 border-emerald-700 shadow-md"
          />
        </div>

        <!-- Right: details -->
        <div class="md:w-2/3 md:ml-6 mt-6 md:mt-0">
          <h1 class="text-3xl font-bold mb-4 text-emerald-400">
            {{ animal.name }}
          </h1>

          <!-- Buttons -->
          <div class="flex flex-wrap gap-3">
            <button
              @click="fetchMedicinesDetails()"
              class="flex items-center px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-full text-stone-100 font-medium transition"
            >
              <svg
                class="w-6 h-6 mr-2 text-stone-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Z"
                  clip-rule="evenodd"
                />
              </svg>
              Medicines
            </button>

            <button
              @click="fetchVetVisits()"
              class="flex items-center px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-full text-stone-100 font-medium transition"
            >
              <svg
                class="w-6 h-6 mr-2 text-stone-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22Z"
                  clip-rule="evenodd"
                />
              </svg>
              Vet Visit
            </button>

            <button
              @click="fetchMedicalHistory()"
              class="flex items-center px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-full text-stone-100 font-medium transition"
            >
              <svg
                class="w-6 h-6 mr-2 text-stone-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22Z"
                  clip-rule="evenodd"
                />
              </svg>
              Medical History
            </button>
          </div>

          <!-- Animal data -->
          <div class="mt-6 grid grid-cols-2 gap-4 text-stone-200">
            <div><strong>Family:</strong> {{ animal.species }}</div>
            <div><strong>Species:</strong> {{ animal.family }}</div>
            <div><strong>Subspecies:</strong> {{ animal.subspecies }}</div>
            <div><strong>Age:</strong> {{ animal.age }} years</div>
            <div><strong>Gender:</strong> {{ animal.gender }}</div>
            <div><strong>Weight:</strong> {{ animal.weight }} kg</div>
            <div><strong>Height:</strong> {{ animal.height }} cm</div>
            <div><strong>Length:</strong> {{ animal.length }} cm</div>
          </div>

          <!-- Toggles -->
          <div class="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="(label, key) in toggles"
              :key="key"
              class="flex items-center"
            >
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="animal[key]"
                  class="sr-only peer"
                  disabled
                />
                <div
                  class="relative w-11 h-6 bg-gray-700 rounded-full peer-checked:bg-emerald-700 transition"
                ></div>
                <span class="ms-3 text-base font-medium text-stone-200">
                  {{ label }}
                </span>
              </label>
            </div>
          </div>

          <!-- Text areas -->
          <div class="mt-6 text-stone-200">
            <div><strong>Health Issues:</strong> {{ animal.healthIssues }}</div>
            <div>
              <strong>Personality Description:</strong>
              {{ animal.personalityDescription }}
            </div>
          </div>

          <label class="block text-stone-200 font-semibold text-lg mt-6">
            Reason:
          </label>
          <textarea
            v-model="returnDescription"
            rows="3"
            placeholder="Reason"
            class="mb-4 w-full rounded border border-emerald-700 bg-neutral-800 text-stone-200 shadow-inner p-3 placeholder-stone-400"
          ></textarea>

          <button
            type="button"
            @click="returnAnimal()"
            class="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-full text-stone-100 font-bold mt-2 transition"
          >
            <svg
              class="w-5 h-5 fill-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2..."
              />
            </svg>
            Return
          </button>
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
