<template>
  <Loading v-if="loadingError" />

  <Navigation />

  <div class="my-6 text-stone-200 items-center justify-center flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
    <div class="w-full flex flex-col space-y-4">
      <div class="flex-5 rounded-lg p-8">
        <div class="my-6 text-stone-200 flex flex-col items-center justify-center space-y-4 2xl:flex-row 2xl:space-y-0 2xl:space-x-4">
          <!-- header/panel container -->
          <div class="w-full p-2 max-w-5xl flex flex-col space-y-4 px-4  ">

          

            <div v-if="user" class="flex  flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-8 justify-center">
              <!-- Panel 1: Personal Info -->
              <div class="p-8 rounded-lg w-full max-w-xl mx-auto 2xl:mx-0 2xl:w-3/6 bg-stone-800/40 border border-stone-500/50">
                <h2 class="text-2xl font-bold mb-6 text-center">Personal Info</h2>

                <div class="text-lg space-y-2">
                  <div class="flex justify-between border-b border-white/20 py-2">
                    <span class="font-semibold">Username:</span>
                    <span>{{ user.username }}</span>
                  </div>
                  <div class="flex justify-between border-b border-white/20 py-2">
                    <span class="font-semibold">First name:</span>
                    <span>{{ user.firstName }}</span>
                  </div>
                  <div class="flex justify-between border-b border-white/20 py-2">
                    <span class="font-semibold">Last name:</span>
                    <span>{{ user.lastName }}</span>
                  </div>
                  <div class="flex justify-between border-b border-white/20 py-2">
                    <span class="font-semibold">Date of Birth:</span>
                    <span>{{ formatDateToISO(user.dateOfBirth) }}</span>
                  </div>
                  <div class="flex justify-between border-b border-white/20 py-2">
                    <span class="font-semibold">Residence:</span>
                    <span>{{ user.residence }}</span>
                  </div>
                </div>

                <div class="flex justify-end mt-6">
                  <button
                    @click="editModal = true"
                    class="bg-stone-300 hover:bg-stone-400 text-stone-900 px-4 py-2 rounded transition focus:outline-none focus:ring-4 focus:ring-stone-300"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- /header/panel container -->
        </div>

        <!-- Panel 4: Adopted Animals -->
        <div class="shadow-2xl p-4 mt-8 rounded-lg 2xl:w-3/3 bg-stone-800/30 border border-stone-500/50">
          <h2 class="text-2xl font-bold mb-4">Adopted Animals</h2>

          <div class="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-2 lg:gap-4 rounded-md">
            <router-link
              v-for="adoption in adoption"
              :key="adoption.code"
              :to="'/singleAnimalUser/' + adoption.code"
              class="hover:scale-110 mt-4 relative flex justify-center flex-col items-center rounded-lg shadow-lg transition-transform duration-200"
            >
              <img
                v-if="adoption.animal.picture"
                class="w-full h-90 rounded-xl object-cover"
                :src="'data:image/jpeg;base64,' + adoption.animal.picture"
                :alt="adoption.animal.name"
              />
              <div class="absolute bottom-0 w-full bg-black bg-opacity-90 text-stone-200 text-xl font-extrabold py-4 text-center rounded-b-xl">
                {{ adoption.animal.name }}
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  </div>

  <!-- Modal: Edit Personal Info -->
  <div v-if="editModal" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="bg-stone-900/90 rounded-lg shadow border border-stone-600">
        <!-- modal header -->
        <div class="flex items-center justify-between p-4 border-b border-stone-600">
          <h3 class="text-lg font-semibold text-stone-200">Edit Personal Info</h3>
          <button
            @click="editModal = false"
            class="text-stone-400 hover:bg-stone-200 hover:text-stone-900 rounded-lg text-base w-8 h-8 inline-flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        <!-- modal form -->
        <form @submit.prevent="submitEditForm" class="p-4 space-y-4">
          <div>
            <label for="firstName" class="block mb-1 text-sm font-medium text-stone-200">First name:</label>
            <input
              v-model="editForm.firstName"
              id="firstName"
              type="text"
              required
              class="w-full text-stone-900 p-2 border border-stone-300 rounded-lg bg-stone-50 focus:ring-2 focus:ring-stone-300 focus:border-stone-300 outline-none"
            />
          </div>

          <div>
            <label for="lastName" class="block mb-1 text-sm font-medium text-stone-200">Last name:</label>
            <input
              v-model="editForm.lastName"
              id="lastName"
              type="text"
              required
              class="w-full text-stone-900 p-2 border border-stone-300 rounded-lg bg-stone-50 focus:ring-2 focus:ring-stone-300 focus:border-stone-300 outline-none"
            />
          </div>

          <div>
            <label for="residence" class="block mb-1 text-sm font-medium text-stone-200">Residence:</label>
            <input
              v-model="editForm.residence"
              id="residence"
              type="text"
              required
              class="w-full text-stone-900 p-2 border border-stone-300 rounded-lg bg-stone-50 focus:ring-2 focus:ring-stone-300 focus:border-stone-300 outline-none"
            />
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-stone-300 hover:bg-stone-400 text-stone-900 font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-stone-300 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
        <!-- /modal form -->
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
import Loading from '../Loading.vue';


export default {
 
  components: {
    Navigation,
    Footer,
    Loading,
  },
  data() {
    return {
      loadingError: false,
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      adopterId: localStorage.getItem('adopterid'),
      user: null,
       modal:null,
       editModal: false,
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
  watch: {
  userId(newId, oldId) {

      this.fetchUserDetails();
      this.fetchAdoptionDetails();
    
  }
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

  // Periodično proveravaj localStorage userId (ako nema globalnog stanja)
  setInterval(() => {
    const storedUserId = localStorage.getItem('userId');
    if(storedUserId !== this.userId) {
      this.userId = storedUserId;
      this.adopterId = localStorage.getItem('adopterid');
      this.token = localStorage.getItem('token');
    }
  }, 1000);
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
      
        setTimeout(() => {
                location.reload();
                }, 100)
        this.editForm.refreshed = true;
      }
    },

    async fetchUserDetails() {
      try {
        this.loadingError = true;
        const response = await instance.get(`animal/adopter/${this.userId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.user = response.data;
        console.log(this.user);
        if(this.user!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                }
        localStorage.setItem('adopterid', this.user.id);
          if(this.adopterId!=this.user.id) {
         localStorage.setItem('adopterid', this.user.id);
         this.fetchAdoptionDetails();
          this.$router.push(`/profile`);
        }
        this.editForm.firstName = this.user.firstName;
        this.editForm.lastName = this.user.lastName;
        this.editForm.residence = this.user.residence;
         console.log(this.user.id);
      } catch (error) {
        setTimeout(() => {
                this.loadingError = true; 
                }, 5000)
                this.$router.push(`/Home`);
        console.error('Error fetching adopter details:', error);
      }
    },

    async fetchAdoptionDetails() {
      try {
    
        this.loadingError = true;
        const response = await instance.get(`animal/adopted/${this.adopterId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        console.log(response.data);
        this.adoption = response.data;
        if(this.adoption!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                
                }
      } catch (error) {
        setTimeout(() => {
                this.loadingError = true; 
                }, 5000)
                this.$router.push(`/Home`);
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
     
      Swal.fire({
          icon: 'success',
          title: 'Profile updated!',
          timer: 2000,
          showConfirmButton: false,
        });
    
        this.fetchUserDetails(); // Refresh user details after update
      } catch (error) {
       
        Swal.fire({
          icon: 'error',
          title: 'Animal not reaturnd!',
          timer: 2000,
          showConfirmButton: false,
        });
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


