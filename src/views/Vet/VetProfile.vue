<template>
  <div class="flex p-6">
    <div class="w-1/6 text-stone-200 p-4 rounded-l-lg">
     <VetNavigation />
    </div>
    <!-- READ-ONLY user data -->
     <div class="w-3/6 text-stone-200 p-4 rounded-r-lg  mx-auto">

    <div class="bg-black/10 rounded-lg p-6 text-stone-200 mb-6">
      <h2 class="text-2xl font-bold mb-4">User Info</h2>
      <div class="space-y-2 text-xl ">
        <div><strong>ID:</strong> {{ user?.id }}</div>
        <div><strong>Username:</strong> {{ user?.username }}</div>
        <div><strong>First Name:</strong> {{ user.name }}</div>
        <div><strong>Last Name:</strong> {{ user.surname }}</div>
        <div><strong>Phone:</strong> {{ user.phone }}</div>
        <div><strong>Role:</strong> {{ userRole }}</div>
      </div>

      <button @click="openUpdateModal"
        class="mt-6 bg-emerald-600 hover:bg-emerald-700 text-stone-200 px-4 py-2 rounded transition">
        Edit Profile
      </button>
    </div>

    <!-- UPDATE MODAL -->
    <div v-if="updateModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="bg-black rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-center justify-between p-4 border-b dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-stone-200">Update Profile</h3>
            <button @click="updateModal = false"
              class="text-gray-400 hover:bg-white hover:text-gray-900 rounded-lg text-base w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-stone-200">
              ✕
            </button>
          </div>

          <!-- Modal Body (Form) -->
          <form @submit.prevent="updateUser" class="p-4 space-y-4">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-900">Username</label>
              <input v-model="editForm.username" class="w-full text-gray-900  p-2 border border-emerald-300 rounded-lg" />
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-900 ">First Name</label>
              <input v-model="editForm.firstName" class="w-full text-gray-900  p-2 border border-emerald-300 rounded-lg" />
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-900 ">Last Name</label>
              <input v-model="editForm.lastName" class="w-full text-gray-900  p-2 border border-emerald-300 rounded-lg" />
            </div>
            
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-900">Phone</label>
              <input v-model="editForm.phoneNumber" class="w-full text-gray-900  p-2 border border-emerald-300 rounded-lg" />
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-900">New Password (optional)</label>
              <input v-model="editForm.password" type="password"
                class="w-full text-gray-900  p-2 border border-emerald-300 rounded-lg" />
            </div>

            <button type="submit"
              class="text-stone-200 inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
              Update
            </button>

            <p v-if="loadingError" class="text-red-600 mt-2">Error occurred. Please try again.</p>
          </form>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import instance from '@/axiosBase';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
  import VetNavigation from '../Vet/VetNavigation.vue';
export default {
     components: {
    VetNavigation,
  },
  data() {
    return {
      token: localStorage.getItem('vet_token'),
      userId: null,
      userRole: null,
      user: null,
      updateModal: false,
      loadingError: false,
      editForm: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
      },
    };
  },
  created() {
    this.fetchUserDetails();
  },
  methods: {
    async fetchUserDetails() {
      try {
        const decoded = jwtDecode(this.token);
        this.userId = decoded.id_usera;
        this.userRole =
          decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        const response = await instance.get(`auth/getUserById/${this.userId}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        this.user = response.data;
        console.log("User data fetched:", this.user);
        this.loadingError = false;
      } catch (error) {
        console.error("Error fetching user:", error);
        this.loadingError = true;
      }
    },
        openUpdateModal() {
        if (this.user) {
            this.editForm.username = this.user.username ;
            this.editForm.firstName = this.user.name ;      
            this.editForm.lastName = this.user.surname ;    
            this.editForm.phoneNumber = this.user.phone ;   
            this.editForm.password = '';                        
            this.updateModal = true;
        }
        }
        ,
    async updateUser() {
      try {
        const payload = { ...this.editForm };
        if (!payload.password) delete payload.password;

        await instance.put(`auth/updateUserById/${this.userId}`, payload, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        Swal.fire({
          icon: 'success',
          title: 'Profile updated!',
          timer: 2000,
          showConfirmButton: false,
        });

        this.updateModal = false;
        this.fetchUserDetails();
      } catch (error) {
        console.error("Error updating user:", error);
        this.loadingError = true;
        Swal.fire({
          icon: 'error',
          title: 'Update failed',
          text: 'Something went wrong.',
        });
      }
    },
  },
};
</script>
