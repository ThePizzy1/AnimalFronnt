<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <!-- LOGO -->
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-customGreen">
        <img class="rounded-lg h-20 w-auto" src="/luna1.png" alt="logo" />
        LUNA
      </a>

      <!-- FORM BOX -->
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
                :value="registerData.username"
                type="text"
                name="username"
                id="username"
                class="border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 bg-gray-50"
                placeholder="username"
                readonly
              />
              <div v-if="usernameError" class="text-red-500 text-base mt-2">{{ usernameError }}</div>
            </div>

            <!-- DATE OF BIRTH -->
            <div>
              <label for="dateStartAdd" class="block mb-2 text-base font-medium text-customGreen">
                Date of Birth
              </label>
              <input
                type="date"
                v-model="dob"
                name="dateStartAdd"
                id="dateStartAdd"
                class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                required
              />
            </div>

            <!-- FIRST NAME -->
            <div>
              <label for="firstName" class="block mb-2 text-base font-medium text-customGreen">
                First Name
              </label>
              <input
                v-model="firstName"
                type="text"
                name="firstName"
                id="firstName"
                class="border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 bg-gray-50"
                placeholder="First Name"
                required
              />
            </div>

            <!-- LAST NAME -->
            <div>
              <label for="lastName" class="block mb-2 text-base font-medium text-customGreen">
                Last Name
              </label>
              <input
                v-model="lastName"
                type="text"
                name="lastName"
                id="lastName"
                class="border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 bg-gray-50"
                placeholder="Last Name"
                required
              />
            </div>

            <!-- LOCATION -->
            <div>
              <label for="location" class="block mb-2 text-base font-medium text-customGreen">
                Place of Residence
              </label>
              <input
                v-model="location"
                type="text"
                name="location"
                id="location"
                class="border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 bg-gray-50"
                placeholder="City, Country"
                required
              />
            </div>

            <!-- SUBMIT BUTTON -->
            <div class="mt-10">
              <button
                type="submit"
                class="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5 text-center transition"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { useRouter } from 'vue-router';
import instance from '@/axiosBase';
import { ref, onMounted } from 'vue';

const router = useRouter(); // Router instanca sada unutar setup funkcije

const dob = ref('');
const firstName = ref('');
const lastName = ref('');
const location = ref('');
const usernameError = ref(null); 
const registerData = ref({
  username: router.currentRoute.value.params.username || '',
  password: ''
});

// Funkcija za učitavanje passworda iz localStorage-a
const loadPasswordFromLocalStorage = () => {
  const storedPassword = localStorage.getItem('registeredPassword');
  if (storedPassword) {
  
    registerData.value.password = storedPassword;
  } else {
    console.warn('Password not found in localStorage');
  }
};

// Pozivamo funkciju za učitavanje passworda prilikom montiranja komponente
onMounted(() => {
  loadPasswordFromLocalStorage();
});



const register = async () => {
  try {
    // Fetch user data
    const userResponse = await instance.get(`auth/getUserByUsername/${registerData.value.username}`);
    const userData = userResponse.data;
    console.log(userData.id);

    // Prepare adopter data with user details
    try {
      const addAdopterResponse = await instance.post('animal/addAdopter', {
        Adopter: {
          firstName: firstName.value,
          lastName: lastName.value,
          dateOfBirth:`${dob.value}T00:00:00.00`,
          residence: location.value,
          username: userData.username,
          password: registerData.value.password,
          registerId: userData.id
        }
      });
      console.log('Adopter created:', addAdopterResponse.data);

      // Redirect after successful registration
      router.push('/'); // preusmeravanje na početnu stranicu

    } catch (error) {
      console.error('Error adding adopter:', error);
    }
  } catch (error) {
    console.error('Error creating adopter:', error);
    // Handle error messages or display to user
    usernameError.value = 'There was a problem retrieving the user data.';
  }
};
</script>
