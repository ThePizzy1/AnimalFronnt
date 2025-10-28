<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <!-- LOGO -->
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-customGreen">
        <img class="rounded-lg h-20 w-auto" src="/luna1.png" alt="logo" />
        LUNA
      </a>

      <!-- REGISTER BOX -->
      <div class="w-full rounded-lg bg-stone-600/75 shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-customGreen md:text-2xl">
            Create an account
          </h1>

          <!-- FORM -->
          <form class="space-y-4 md:space-y-6" @submit.prevent="register">
            <!-- USERNAME -->
            <div>
              <label for="username" class="block mb-2 text-base font-medium text-customGreen">
                Username
              </label>
              <input
                v-model="registerData.username"
                type="text"
                name="username"
                id="username"
                class="border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                placeholder="username"
                required
              />
              <div v-if="usernameError" class="text-red-500 text-base mt-2">{{ usernameError }}</div>
            </div>

            <!-- PASSWORD -->
            <div>
              <label for="password" class="block mb-2 text-base font-medium text-customGreen">
                Password
              </label>
              <input
                v-model="registerData.password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                required
              />
              <div v-if="passwordError" class="text-red-500 text-base mt-2">{{ passwordError }}</div>
              <div v-if="passwordTooShortError" class="text-red-500 text-base mt-2">{{ passwordTooShortError }}</div>
              <div v-if="passwordRequiresNonAlphanumericError" class="text-red-500 text-base mt-2">{{ passwordRequiresNonAlphanumericError }}</div>
              <div v-if="passwordRequiresDigitError" class="text-red-500 text-base mt-2">{{ passwordRequiresDigitError }}</div>
              <div v-if="passwordRequiresUpperError" class="text-red-500 text-base mt-2">{{ passwordRequiresUpperError }}</div>
              <div v-if="passwordRequiresLowerError" class="text-red-500 text-base mt-2">{{ passwordRequiresLowerError }}</div>
            </div>

            <!-- CONFIRM PASSWORD -->
            <div>
              <label for="confirmPassword" class="block mb-2 text-base font-medium text-customGreen">
                Confirm Password
              </label>
              <input
                v-model="registerData.confirmPassword"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                class="border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                required
              />
              <div v-if="confirmPasswordError" class="text-red-500 text-base mt-2">{{ confirmPasswordError }}</div>
            </div>

            <!-- BUTTON -->
            <div class="mt-10">
              <button
                @click="register"
                class="w-full mt-5 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5 text-center transition"
              >
                Next
              </button>
            </div>
          </form>

          <!-- LOGIN LINK -->
          <p class="text-base font-light text-customGreen">
            Already have an account?
            <RouterLink to="/" class="font-medium text-customGreen hover:underline">Login</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import instance from '@/axiosBase';

const router = useRouter();

// Define reactive references for form data and error messages
const registerData = ref({
  username: '',
  password: '',
  confirmPassword: ''
});

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
    const response = await instance.post('auth/register', {
  username: registerData.value.username,
  password: registerData.value.password
});
console.log('Response:', response.status);
if(response.ok || response.status === 200 ){
  console.log('Response:', response.data);
  console.log("Došlo je do funkcije za rutiranje");
  localStorage.setItem('registeredPassword', registerData.value.password);

  router.push(`/register/${registerData.value.username}`);
}
else{
  throw new Error('Registration failed');
  console.log("Došlo je do greške sa ok response");

}
console.log("Preskočlo je else i if za rutiranje");


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
  passwordError.value = '';
  passwordTooShortError.value = '';
  passwordRequiresNonAlphanumericError.value = '';
  passwordRequiresDigitError.value = '';
  passwordRequiresUpperError.value = '';
  passwordRequiresLowerError.value = '';
  confirmPasswordError.value = '';
};
</script>