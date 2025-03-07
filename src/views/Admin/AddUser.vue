<template>
     <div class="flex">
    <!-- Navigation -->
    <div class="w-1/6 text-white p-4 rounded-l-lg">
      <AdminNavigation />
    </div>
    <!-- Form -->
    <div class="w-5/6 text-white p-4 rounded-r-lg">

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="w-1/6 text-white p-4 rounded-l-lg">
  <AdminNavigation />
</div>

<div class="w-5/6 text-white m-6 p-4 rounded-r-lg  p-2 border-2 border-natural-400 rounded-md shadow-sm hover:scale-105">
  <h1 class="text-xl font-bold mb-4">Add User</h1>
  <div class="grid gap-4 mb-4 grid-cols-2">
   
                 <div class="col-span-2 sm:col-span-1">
                  <label  for="firstname" class="block mb-2 text-sm font-medium text-customGreen dark:text-white">First Name</label>
              <input v-model="registerData.firstname" name="firstname" id="firstname" class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pero" required>
              <div v-if="firstname" class="text-red-500 text-sm mt-2">{{ v }}</div>
                 </div>
                 <div class="col-span-2 sm:col-span-1">
              <label  for="lastname" class="block mb-2 text-sm font-medium text-customGreen dark:text-white">Last Name</label>
              <input v-model="registerData.lastname" name="lastname" id="lastname" class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Perić" required>
              <div v-if="lastname" class="text-red-500 text-sm mt-2">{{ lastname }}</div>
                 </div>
    
              <div class="col-span-2">
              <label  for="username" class="block mb-2 text-sm font-medium text-customGreen dark:text-white">Username</label>
              <input v-model="registerData.username" name="username" id="username" class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required>
              <div v-if="usernameError" class="text-red-500 text-sm mt-2">{{ usernameError }}</div>
               </div>
               <div class="col-span-2 ">
              <label  for="email" class="block mb-2 text-sm font-medium text-customGreen dark:text-white">Email</label>
              <input v-model="registerData.email" name="email" id="email" class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="perica@gmail.com" required>
              <div v-if="email" class="text-red-500 text-sm mt-2">{{ email }}</div>
               </div>
               <div class="col-span-2 ">
              <label  for="phoneNumber" class="block mb-2 text-sm font-medium text-customGreen dark:text-white">Phone Number</label>
              <input v-model="registerData.phoneNumber" name="phoneNumber" id="phoneNumber" class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="023 654 4521" required>
              <div v-if="phoneNumber" class="text-red-500 text-sm mt-2">{{ phoneNumber }}</div>
               </div>
               <div class="col-span-2 ">
              <label for="password" class="block mb-2 text-sm font-medium text-customGreen dark:text-white">Password</label>
              <input v-model="registerData.password"  type="password" name="password" id="password" placeholder="••••••••" class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required>
              <div v-if="passwordError" class="text-red-500 text-sm mt-2">{{ passwordError }}</div>
              <div v-if="passwordTooShortError" class="text-red-500 text-sm mt-2">{{ passwordTooShortError }}</div>
              <div v-if="passwordRequiresNonAlphanumericError" class="text-red-500 text-sm mt-2">{{ passwordRequiresNonAlphanumericError }}</div>
              <div v-if="passwordRequiresDigitError" class="text-red-500 text-sm mt-2">{{ passwordRequiresDigitError }}</div>
              <div v-if="passwordRequiresUpperError" class="text-red-500 text-sm mt-2">{{ passwordRequiresUpperError }}</div>
              <div v-if="passwordRequiresLowerError" class="text-red-500 text-sm mt-2">{{ passwordRequiresLowerError }}</div>
          
               </div>
               <div class="col-span-2 ">
              <label for="confirmPassword" class="block mb-2 text-sm font-medium text-customGreen dark:text-white">Confirm Password</label>
              <input v-model="registerData.confirmPassword" type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required>
              <div  v-if="confirmPasswordError" class="text-red-500 text-sm mt-2">{{ confirmPasswordError }}</div>
               </div>
       
               <div class="col-span-2 ">
    <div class="flex flex-col">
      <label for="role">Role</label>
      <select v-model="registerData.role" id="role" class="p-2 rounded-lg text-gray-900">
        <option value="Vet">Veterinarinans</option>
        <option value="HeadVet">Head Veterinarinans</option>
        <option value="Surenderer">Surenderer</option>
        <option value="AnimalWelffereOfficer">Animal Welffere Officer</option>
        <option value="Association">Association</option>
        <option value="Worker">Worker</option>
        <option value="Menager">Menager</option>
      </select>
    </div>
               </div>
    <div class="m-auto col-span-2 ">
        <button @click="register" class="w-full hover:scale-105 mt-5 text-white bg-green-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Add User
        </button>
    </div>
   
    
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
    router.push('/adminHome');
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
    AdminNavigation
  }};
</script>

<style scoped>

</style>