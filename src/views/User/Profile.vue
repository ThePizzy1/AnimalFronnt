<template>
  <Navigation/>
  <div class="my-6 text-white items-center justify-center flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
    <!-- Adopter Details Panels -->
    <div class="w-full flex flex-col 2xl:w-5/6 space-y-4">
      <div class="flex-1 rounded-lg p-8">
        <h4 class="text-xl font-bold">Adopter Details</h4>
        <div v-if="user" class="flex flex-col 2xl:flex-row">
          <!-- Panel 1 -->
          <div class="shadow-2xl p-10 shadow-xl rounded-lg w-full 2xl:w-3/6 mr-4">
            <h2 class="text-2xl font-bold mb-4">Personal info</h2>
            <div class="">
              <div class="flex border-b py-2">
                <span class="font-bold w-24">Username:</span>
                <span>{{ user.username }}</span>
              </div>
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
                <span>{{ formatDateToISO(user.dateOfBirth) }}</span>
              </div>
              <div class="flex border-b py-2">
                <span class="font-bold w-24">Residence:</span>
                <span>{{ user.residence }}</span>
              </div>
              
            </div>
          </div>
          <!-- Panel 2 -->
          <div class="shadow-2xl p-10 shadow-xl rounded-lg w-full 2xl:w-3/6 mr-4 mt-8">
            <h2 class="text-2xl font-bold mb-4">Edit Personal Info</h2>
            <form @submit.prevent="submitEditForm" id="editForm">
              <!-- Input fields for editing -->
              <div class="flex border-b py-2">
                <label for="firstName" class="font-bold w-24">First name:</label>
                <input v-model="editForm.firstName" class="rounded-lg p-2 text-gray-400" type="text" id="firstName" name="firstName" required>
              </div>
              <div class="flex border-b py-2">
                <label for="lastName" class="font-bold w-24">Last name:</label>
                <input v-model="editForm.lastName" class="rounded-lg p-2 text-gray-400" type="text" id="lastName" name="lastName" required>
              </div>
              <div class="flex border-b py-2">
                <label for="residence" class="font-bold w-24">Residence:</label>
                <input v-model="editForm.residence" class="rounded-lg p-2 text-gray-400" type="text" id="residence" name="residence" required>
              </div>
              <!-- Save Changes button -->
              <div class="flex justify-end mt-4">
                <button type="submit" class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded whitespace-normal">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        
         
        </div>
          <!-- Panel 4 -->
          <div class="shadow-2xl p-10 shadow-xl rounded-lg 2xl:w-3/3">
            <h2 class="text-2xl font-bold mb-4">Animals</h2>
            <div v-for="adoption in adoption" :key="adoption.code" class="flex shadow-2xl p-6 mb-4 rounded-lg ">
              <div class="ml-10 grid grid-cols-4 gap-6">
                <!-- Prvi stupac -->
                <div class="col-span-1/4">
                  <h3 class="text-xl font-bold mb-2">{{ adoption.animal.name }}</h3>
                  <img v-if="adoption.animal.picture" class="w-40 h-40 rounded-xl" :src="'data:image/jpeg;base64,'+adoption.animal.picture" :alt="adoption.animal.name" />
                </div>
                <!-- Drugi stupac -->
                <div class="col-span-1/4 mt-6">
                  <div>
                    <p class="hidden"><span class="font-bold">Adopton code:</span> {{ adoption.code }}</p>
                    <p class="hidden"><span class="font-bold">Id:</span> {{ adoption.animal.idAnimal }}</p>
                    <p><span class="font-bold">Family:</span> {{ adoption.animal.family }}</p>
                    <p><span class="font-bold">Subspecies:</span> {{ adoption.animal.subspecies }}</p>
                    <p><span class="font-bold">Species:</span> {{ adoption.animal.species }}</p>
                    <p><span class="font-bold">Age:</span> {{ adoption.animal.age }}</p>
                    <p><span class="font-bold">Gender:</span> {{ adoption.animal.gender }}</p>
                  </div>
                </div>
                <!-- Treći stupac -->
                <div class="col-span-1/4 mt-6">
                  <div>
                    <p><span class="font-bold">Weight:</span> {{ adoption.animal.weight }} kg</p>
                    <p><span class="font-bold">Height:</span> {{ adoption.animal.height }} cm</p>
                    <p><span class="font-bold">Length:</span> {{ adoption.animal.length }} cm</p>
                    <p><span class="font-bold">Health Issues:</span> {{ adoption.animal.healthIssues }}</p>
                    <p><span class="font-bold">Personality:</span> {{ adoption.animal.personalityDescription }}</p>
                  </div>
                </div>
                <!-- Četvrti stupac za checkbox-ove -->
                <div class="col-span-1 mt-6">
                  <div class="flex flex-col space-y-2 mt-2">
                    <!-- Checkbox za neutered -->
                    <div class="flex items-center">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="adoption.animal.neutered" class="sr-only peer" :disabled="adoption.animal.neutered">
                        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                        <span class="ms-3 text-sm font-medium text-white">Neutered</span>
                      </label>
                    </div>
                    <!-- Checkbox za vaccinated -->
                    <div class="flex items-center">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="adoption.animal.vaccinated" class="sr-only peer" :disabled="adoption.animal.vaccinated">
                        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                        <span class="ms-3 text-sm font-medium text-white">Vaccinated</span>
                      </label>
                    </div>
                    <!-- Checkbox za microchipped -->
                    <div class="flex items-center">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="adoption.animal.microchipped" class="sr-only peer" :disabled="adoption.animal.microchipped">
                        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                        <span class="ms-3 text-sm font-medium text-white">Microchipped</span>
                      </label>
                    </div>
                    <!-- Checkbox za trained -->
                    <div class="flex items-center">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="adoption.animal.trained" class="sr-only peer" :disabled="adoption.animal.trained">
                        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                        <span class="ms-3 text-sm font-medium text-white">Trained</span>
                      </label>
                    </div>
                    <!-- Checkbox za socialized -->
                    <div class="flex items-center">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="adoption.animal.socialized" class="sr-only peer" :disabled="adoption.animal.socialized">
                        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                        <span class="ms-3 text-sm font-medium text-white">Socialized</span>
                      </label>
                    </div>
                  </div>
                </div> </div>
                 <!-- Peti stupac za "Return" button -->
      <div class="col-span-1 mt-10">
        <p ><span class="font-bold">Return Date:</span> {{this.formattedDate  }}</p>
          <textarea v-model="adoption.returnDescription" placeholder="Enter return description" class="border p-2 rounded  text-gray-400 w-full mt-2"></textarea>
          
        <button @click="returnAnimal(adoption)" class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
          Return
        </button>
     
              </div>
            </div>
         
        </div>
    
        <Footer/>
      </div>
    </div>
  
  </div>
</template>

<script>
import instance from '@/axiosBase';
import Navigation from '../User/Navigation.vue';
import Footer from '../User/Footer.vue';
import { ref, onMounted } from 'vue';

export default {
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      adopterId: localStorage.getItem('adopterid'),
      user: null,
      adoption: [],
      editForm: {
        firstName: '',
        lastName: '',
        residence: '',
        refreshed: false,
        animalId: null,
      },
      currentDate: new Date().toLocaleDateString(),
      selectedAnimal: null,
      selectedAnimalCode: '',
      selectedAnimalId: '',
      returnDate: '',
      returnDescription: '',
    };
  },
  computed: {
    formattedDate() {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(today.getDate()).padStart(2, '0');
      const year = today.getFullYear();
      return `${month}-${day}-${year}`;
    },
  },
  mounted() {
    this.fetchUserDetails();
    this.fetchAdoptionDetails();
  },
  watch: {
    selectedAnimal: 'updateAdoptionCode',
  },
  methods: {
    formatDateToISO(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    refreshPageOnce() {
      if (!this.editForm.refreshed) {
        location.reload();
        this.editForm.refreshed = true;
      }
    },

    async fetchUserDetails() {
      try {
        const response = await instance.get(`animal/adopter/${this.userId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.user = response.data;
        localStorage.setItem('adopterid', this.user.id);
        this.editForm.firstName = this.user.firstName;
        this.editForm.lastName = this.user.lastName;
        this.editForm.residence = this.user.residence;
      } catch (error) {
        console.error('Error fetching adopter details:', error);
      }
    },

    async fetchAdoptionDetails() {
      try {
        const response = await instance.get(`animal/adopted/${this.adopterId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.adoption = response.data;
      } catch (error) {
        console.error('Error fetching adoption details:', error);
      }
    },
    fetchReturnedDetails() {
      const idUser = this.$route.params.id;
      instance.get(`animal/returned/${this.adopterId}}`, {
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
    async submitEditForm() {
      try {
        await instance.put(`animal/updateAdopter/${this.user.registerId}`, {
          Adopter: {
            firstName: this.editForm.firstName,
            lastName: this.editForm.lastName,
            residence: this.editForm.residence,
            username: this.user.username,
            password: this.user.password,
            registerId: this.user.registerId,
          }
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        console.log('Adopter details updated successfully');
        this.fetchUserDetails(); // Refresh user details after update
      } catch (error) {
        console.error('Error updating adopter details:', error);
      }
    },

    async returnAnimal(adoption) {
   
        const returnedAnimal = {
          adoptionCode: parseInt(adoption.code),
          animalId: parseInt(adoption.animal.idAnimal),
          adopterId: parseInt(localStorage.getItem('adopterid')),
          returnDate: new Date().toISOString().split('T')[0],
          returnReason: adoption.returnDescription,
        };

        console.log('Returned Animal Object:', returnedAnimal);
        try {
  // Prva operacija: brisanje
  console.log('code'+returnedAnimal.adoptionCode);
  //await instance.put(`animal/code/${returnedAnimal.adoptionCode}`);
  console.log('Successfully deleted the animal object.');

  // Druga operacija: slanje objekta
  await instance.post('animal/addReaturndAnimal', returnedAnimal, {
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  });
  console.log('Successfully posted the returned animal object.');

  // Treća operacija: ažuriranje statusa životinje
  await instance.put(`animal/adoptionstatusfalse/${returnedAnimal.animalId}`, {}, {
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  });
  console.log('Successfully updated the adoption status of the animal.');

  // Četvrta operacija: inkrementiranje vraćenih životinja
  const userId = localStorage.getItem('adopterid');
  await instance.put(`animal/incrementReturned/${userId}`, {}, {
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  });
  console.log('Successfully incremented the returned animal count.');
  window.location.reload();
      } catch (error) {
        console.error('Error handling adoption:', error);
      }
    },
  },

};
</script>


<style scoped>
/* Additional styles can be added here */
</style>
