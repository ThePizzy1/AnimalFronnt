<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-customGreen dark:text-white">
        <img class="rounded-lg h-20 w-auto" src="/luna1.png" alt="logo" />
        LUNA
      </a>
      <div class="w-full rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-customGreen md:text-2xl dark:text-white">
            Create an account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="register">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-customGreen dark:text-white">Username</label>
              <input :value="registerData.username" type="text" name="username" id="username" class="border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" readonly>
              <div v-if="usernameError" class="text-red-500 text-sm mt-2">{{ usernameError }}</div>
            </div>
            <div>
              <label for="dob" class="block mb-2 text-sm font-medium text-customGreen dark:text-white">Date of Birth</label>
              <input v-model="dob" type="text" id="dob" placeholder="YYYY/MM/DD"
                class="border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                @input="formatDateInput">
            </div>
            <div>
              <label for="firstName" class="block mb-2 text-sm font-medium text-customGreen dark:text-white">First Name</label>
              <input v-model="firstName" type="text" name="firstName" id="firstName" class="border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required>
            </div>
            <div>
              <label for="lastName" class="block mb-2 text-sm font-medium text-customGreen dark:text-white">Last Name</label>
              <input v-model="lastName" type="text" name="lastName" id="lastName" class="border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required>
            </div>
            <div>
              <label for="location" class="block mb-2 text-sm font-medium text-customGreen dark:text-white">Place of Residence</label>
              <input v-model="location" type="text" name="location" id="location" class="border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City, Country" required>
            </div>
            <div class="mt-10">
              <button type="submit" class="w-full text-white bg-green-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
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

const formatDateInput = (event) => {
  let input = event.target.value.replace(/\D/g, '');
  if (input.length > 8) {
    input = input.slice(0, 8);
  }

  let year = input.slice(0, 4);
  let month = input.slice(4, 6);
  let day = input.slice(6, 8);

  if (month > 12) {
    month = '12';
  }

  if (day > 31) {
    day = '31';
  }

  const formatted = `${year}-${month}-${day}`;
  dob.value = formatted;
  const formattedDisplay = `${month}/${day}/${year}`;
  console.log(formattedDisplay);
};

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
          dateOfBirth: dob.value,
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
