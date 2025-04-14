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
           
               

            <div class="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-2 lg:gap-4 rounded-md">
            <div
              v-for="adoption in adoption" :key="adoption.code"
              @click="openModal(adoption)"
              class="hover:scale-110 mt-4 relative  flex justify-center flex-col items-center rounded-lg shadow-lg">
              <img v-if="adoption.animal.picture" class="w-full h-50  rounded-xl" :src="'data:image/jpeg;base64,' + adoption.animal.picture" :alt="adoption.animal.name" />
              <div class="absolute bottom-0 w-full mx-2 bg-black mx-1 bg-opacity-90 text-white text-xl font-extrabold py-4 text-center rounded-b-xl">
                {{ adoption.animal.name  }}
              </div>
            </div>
          </div>
        </div>
      </div>

        <Footer/>
      </div>
    </div>
  
 





  <!-- Single item modal -->
  <div v-if="modal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-x-auto custom-scrollbar">
            <div class="relative p-4 w-full max-w-xl max-h-full">
              <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Return Animal 
                  </h3>
                  <button @click="modal = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5">
                  <div class="grid gap-4 mb-4 grid-cols-2  sm:col-span-1">
                    <div class="col-span-2 ">
                      <label for="singleCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adoption code</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{ this.itemsSingle.code }}
                    </span>
                    </div>
                    <div class="col-span-2 ">
                      <label for="singleCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Animal Name</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{ this.itemsSingle.animal.name }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="animalName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Family</label>
                      <span type="text" id="animalName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ itemsSingle.animal.family }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Species</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.animal.species }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subspecies</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.animal.subspecies }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.animal.age }} years
                    </span>
                    </div>

                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.animal.gender }}
                    </span>
                    </div>

                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.animal.weight }} kg
                    </span>
                    </div>
                    
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hight</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.animal.height }} cm
                    </span>
                    </div>
                    
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lenght</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.animal.length }} cm
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="this.itemsSingle.animal.neutered" class="sr-only peer" disabled>
                        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900  dark:text-white">Neutered</span>
                      </label>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemsSingle.animal.vaccinated" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900  dark:text-white">Vaccinated</span>
                  </label>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemsSingle.animal.microchipped" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900  dark:text-white">Microchipped</span>
                  </label>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemsSingle.animal.trained" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900  dark:text-white">Trained</span>
                  </label>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemsSingle.animal.socialized" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900  dark:text-white">Socialized</span>
                  </label>
                </div>
                <div class="col-span-2 ">
                  <p ><span class="ms-3 text-sm font-medium text-gray-900  dark:text-white">Return Date:</span> {{formatDateToISO(this.formattedDate)  }}</p>
                    <textarea v-model="this.returnDescription" placeholder="Enter return description" class="border p-2 rounded  text-gray-400 w-full mt-2"></textarea>
                </div>
                <div class="col-span-2 ">
                  <button @click="returnAnimal(this.itemsSingle)" class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
                    Return
                  </button>
               </div>
                      





                  </div>
                </form>
              </div>
            </div>
          </div>
</template>

<script>
import instance from '@/axiosBase';
import Navigation from '../User/Navigation.vue';
import Footer from '../User/Footer.vue';
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2'

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
       modal:null,
      itemsSingle:"",
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
   console.log(this.user.id);
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
   
    async submitEditForm() {
      try {
     await  instance.put(`animal/updateAdopter/${this.user.registerId}`, {
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
        alert("Animal reaturnd");
        this.fetchUserDetails(); // Refresh user details after update
      } catch (error) {
        alert("Animal not reaturnd");
        console.error('Error updating adopter details:', error);
      }
    },


    async openModal(item) {
            this.modal = true;
            console.log(item);
            this.itemsSingle = item;
            console.log(this.itemsSingle);
            console.log(item.returnDescription);
         
          },










    async returnAnimal() {
        try {
  
      var response=  await instance.post('animal/addReaturndAnimal', {
        adoptionCode: parseInt(this.itemsSingle.code),//ok
          animalId: parseInt(this.itemsSingle.animal.idAnimal),//ok
          adopterId: parseInt(this.user.id),//ok
          returnReason: this.returnDescription,//ok
         },
         { headers: {Authorization: `Bearer ${this.token}`,   }}); 
        console.log("addReaturndAnimal"+ response.data);
         await instance.put(`animal/adoptionstatusfalse/${1}`);//neće čak iako postavim točan id
         
           //alert("incrementReturned"+this.user.id);
      /*   await instance.put(`animal/incrementReturned/${this.user.id}`, {}, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });*/
          alert("updateAnimalRecord"+this.itemsSingle.animal.idAnimal);
          await instance.put(`animal/updateAnimalRecord/`,  { 
                            animalId:parseInt(this.itemsSingle.animal.idAnimal),
                            recordId:9
                          });
            console.log(" "+response.data);

          await Swal.fire({
                    title: "Animal aded!",
                    draggable: true,
                    icon: "success"
                  });
      


        //window.location.reload();
      } catch (error) {
        console.log(`ACode: ${this.adoptionCode} Animal: ${this.animalId} Adopter: ${this.adopterId} Date:${this.returnDate} Description:${returnReason}`);
        
        console.error('Error handling adoption:', error);
        await Swal.fire({
                    title: "Error!",
                    draggable: true,
                    icon: "error"
                  });
      }
    },
  },
};
</script>


