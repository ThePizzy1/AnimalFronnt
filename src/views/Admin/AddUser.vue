<template>
  <div class="flex  min-h-screen text-stone-200">
    <!-- Navigation -->
    <div class="w-1/6 p-4 bg-black border-r border-stone-600 backdrop-blur-md rounded-l-xl shadow-inner">
      <AdminNavigation />
    </div>

    <!-- Form -->
    <div class="w-5/6 p-8 rounded-r-xl">
      <div class="max-w-5xl mx-auto bg-stone-800/90 border border-stone-400/40 rounded-2xl p-8 shadow-inner backdrop-blur-md hover:scale-[1.01] transition-all duration-300">
        <h1 class="text-2xl font-bold mb-6 text-stone-100">Add User</h1>

        <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
          <!-- First Name -->
          <div>
            <label for="firstname" class="block mb-2 text-base font-semibold text-stone-300">First Name</label>
            <input
              v-model="registerData.firstname"
              id="firstname"
              name="firstname"
              placeholder="Pero"
              required
              class="w-full py-2 px-4 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-300 transition-all"
            />
            <div v-if="firstname" class="text-red-400 text-sm mt-2">{{ v }}</div>
          </div>

          <!-- Last Name -->
          <div>
            <label for="lastname" class="block mb-2 text-base font-semibold text-stone-300">Last Name</label>
            <input
              v-model="registerData.lastname"
              id="lastname"
              name="lastname"
              placeholder="Perić"
              required
              class="w-full py-2 px-4 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-300 transition-all"
            />
            <div v-if="lastname" class="text-red-400 text-sm mt-2">{{ lastname }}</div>
          </div>

          <!-- Username -->
          <div class="col-span-2">
            <label for="username" class="block mb-2 text-base font-semibold text-stone-300">Username</label>
            <input
              v-model="registerData.username"
              id="username"
              name="username"
              placeholder="username"
              required
              class="w-full py-2 px-4 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-300"
            />
            <div v-if="usernameError" class="text-red-400 text-sm mt-2">{{ usernameError }}</div>
          </div>

          <!-- Email -->
          <div class="col-span-2">
            <label for="email" class="block mb-2 text-base font-semibold text-stone-300">Email</label>
            <input
              v-model="registerData.email"
              id="email"
              name="email"
              placeholder="perica@gmail.com"
              required
              class="w-full py-2 px-4 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-300"
            />
            <div v-if="email" class="text-red-400 text-sm mt-2">{{ email }}</div>
          </div>

          <!-- Phone Number -->
          <div class="col-span-2">
            <label for="phoneNumber" class="block mb-2 text-base font-semibold text-stone-300">Phone Number</label>
            <input
              v-model="registerData.phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="023 654 4521"
              required
              class="w-full py-2 px-4 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-300"
            />
            <div v-if="phoneNumber" class="text-red-400 text-sm mt-2">{{ phoneNumber }}</div>
          </div>

          <!-- Password -->
          <div class="col-span-2">
            <label for="password" class="block mb-2 text-base font-semibold text-stone-300">Password</label>
            <input
              v-model="registerData.password"
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              class="w-full py-2 px-4 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-300"
            />
            <div v-if="passwordError" class="text-red-400 text-sm mt-2">{{ passwordError }}</div>
            <div v-if="passwordTooShortError" class="text-red-400 text-sm mt-2">{{ passwordTooShortError }}</div>
            <div v-if="passwordRequiresNonAlphanumericError" class="text-red-400 text-sm mt-2">{{ passwordRequiresNonAlphanumericError }}</div>
            <div v-if="passwordRequiresDigitError" class="text-red-400 text-sm mt-2">{{ passwordRequiresDigitError }}</div>
            <div v-if="passwordRequiresUpperError" class="text-red-400 text-sm mt-2">{{ passwordRequiresUpperError }}</div>
            <div v-if="passwordRequiresLowerError" class="text-red-400 text-sm mt-2">{{ passwordRequiresLowerError }}</div>
          </div>

          <!-- Confirm Password -->
          <div class="col-span-2">
            <label for="confirmPassword" class="block mb-2 text-base font-semibold text-stone-300">Confirm Password</label>
            <input
              v-model="registerData.confirmPassword"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              required
              class="w-full py-2 px-4 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-300"
            />
            <div v-if="confirmPasswordError" class="text-red-400 text-sm mt-2">{{ confirmPasswordError }}</div>
          </div>

          <!-- Role -->
          <div class="col-span-2">
            <label for="role" class="block mb-2 text-base font-semibold text-stone-300">Role</label>
            <select
              v-model="registerData.role"
              id="role"
              class="w-full py-2 px-4 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-300"
            >
              <option value="Vet">Veterinarian</option>
              <option value="HeadVet">Head Veterinarian</option>
              <option value="Surrenderer">Surrenderer</option>
              <option value="AnimalWelfareOfficer">Animal Welfare Officer</option>
              <option value="Association">Association</option>
              <option value="Worker">Worker</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <!-- Submit Button -->
          <div class="col-span-2 mt-6">
            <button
              @click="register"
              class="w-full py-3 px-6 rounded-full bg-emerald-700 hover:bg-emerald-600 text-stone-100 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-stone-300 transition-all hover:scale-[1.02]"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import instance from '@/axiosBase';

const router = useRouter();

// Define reactive references for form data and error messages
const registerData = ref({
  username: '',
  password: '',
  firstname: '',
  lastname: '',
  email: '',
  phoneNumber: '',
  confirmPassword: '',
    role: ''
});
console.log('role:',registerData.value.role );
const usernameError = ref('');
const passwordError = ref('');
const passwordTooShortError = ref('');
const passwordRequiresNonAlphanumericError = ref('');
const passwordRequiresDigitError = ref('');
const passwordRequiresUpperError = ref('');
const passwordRequiresLowerError = ref('');
const confirmPasswordError = ref('');

// Function to handle form submission
const register = async () => {
  // Clear previous errors
  clearErrors();

  // Validate password match
  if (registerData.value.password !== registerData.value.confirmPassword) {
    confirmPasswordError.value = 'Passwords do not match';
    return;
  }

  try {
    const response = await instance.post('auth/registerAdmin', {
  username: registerData.value.username,
  password: registerData.value.password,
  email: registerData.value.email,
  firstname: registerData.value.firstname,
  lastname: registerData.value.lastname,
  phoneNumber: registerData.value.phoneNumber,
  role: registerData.value.role
}


);

console.log('Response:', response.data);

// Save password to localStorage
localStorage.setItem('registeredPassword', registerData.value.password);


console.log('Response:', response.data);
if(response.status === 200){
   //router.push('/adminHome');
  }
  } catch (error) {
    console.error('Registration error:', error);

    // Handle specific error responses from API
    if (error.response && error.response.status === 400) {
      const errorData = error.response.data;
      errorData.forEach(err => {
        switch (err.code) {
          case 'DuplicateUserName':
            usernameError.value = err.description;
            break;
          case 'PasswordTooShort':
            passwordTooShortError.value = err.description;
            break;
          case 'PasswordRequiresNonAlphanumeric':
            passwordRequiresNonAlphanumericError.value = err.description;
            break;
          case 'PasswordRequiresDigit':
            passwordRequiresDigitError.value = err.description;
            break;
          case 'PasswordRequiresUpper':
            passwordRequiresUpperError.value = err.description;
            break;
          case 'PasswordRequiresLower':
            passwordRequiresLowerError.value = err.description;
            break;
          default:
            console.log('Registration failed');
        }
      });
    } else {
      console.log('Registration failed');
    }
  }
};

// Function to clear all error messages
const clearErrors = () => {
  usernameError.value = '';
  lastname.value = '';
  email.value = '';
  phoneNumber.value = '';
  firstname.value = '';
  passwordError.value = '';
  passwordTooShortError.value = '';
  passwordRequiresNonAlphanumericError.value = '';
  passwordRequiresDigitError.value = '';
  passwordRequiresUpperError.value = '';
  passwordRequiresLowerError.value = '';
  confirmPasswordError.value = '';
};



</script>
<script >
import AdminNavigation from '../Admin/AdminNavigation.vue';
export default {
  components: {
    AdminNavigation,
  }};
</script>

<style scoped>

</style>