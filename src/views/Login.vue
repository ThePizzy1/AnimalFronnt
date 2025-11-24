<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-customGreen ">
        <img class="rounded-lg h-20 w-auto" src="/luna1.png" alt="logo" /> LUNA
      </a>
      <div class="w-full rounded-lg bg-stone-600/75 shadow-2xl  md:mt-0 sm:max-w-md xl:p-0 ">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-customGreen md:text-2xl ">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <div>
              <label for="username" class="block mb-2 text-base font-medium text-customGreen ">Your username</label>
              <input v-model="username" type="username" name="username" id="username" class="border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="username" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-base font-medium text-customGreen ">Password</label>
              <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 " required>
            </div>
            <button type="submit" class="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center ">Sign in</button>
            <p class="text-base font-light text-customGreen ">
              Don’t have an account yet? 
              <RouterLink to="/signup" class="font-medium text-customGreen hover:underline ">Sign up</RouterLink>
            </p>
          </form>
          <div v-if="loginError" class="text-red-500 text-base mt-2">{{ loginError }}</div>
          <div v-if="accessDenied" class="text-red-500 text-base mt-2">Access Denied</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import instance from '@/axiosBase';
import { jwtDecode } from 'jwt-decode'; // Correct import
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';

const username = ref('');
const password = ref('');
const token = ref(null);
const loginError = ref(null);
const loading = ref(false);
const accessDenied = ref(false);
const router = useRouter();

const login = async () => {
  loading.value = true;
  loginError.value = null;
  accessDenied.value = false;

  try {
    const response = await instance.post('auth/login', {
      username: username.value,
      password: password.value
    });

    const tokenResult = response.data.token.result;

    if (tokenResult && typeof tokenResult === 'string') {
      token.value = tokenResult;
    } else {
      throw new Error('Invalid token format');
    }

    localStorage.setItem('token', token.value);
    console.log("token:"+token.value);
    const decodedToken = jwtDecode(token.value); // Correct usage of jwt_decode

    localStorage.setItem('userId', decodedToken.id_usera);
    localStorage.setItem('userName', decodedToken.sub);
    console.log("userId:"+decodedToken.id_usera);
    console.log("userName:"+decodedToken.sub);

    await fetchUserDetails(decodedToken.id_usera);

    if (accessDenied.value) {
      return;
    }
/*ROLE */
/**--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/**--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/**--------------------------------------------------------------------------------------------------------------------------------------------------------- */
   /**--------------------------------------------------------------------------------------------------------------------------------------------------------- */

if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin') {
     
      console.log("userRole: Admin");
      localStorage.setItem('admin_token', token.value);
      const adminToken = localStorage.getItem('admin_token');
      localStorage.setItem('adminRole','Admin' ); 
      router.push({ path: '/adminHome' });
    }
    if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'User') {
      router.push({ path: '/home' });
     localStorage.setItem('user_token', token.value);
    const userToken = localStorage.getItem('user_token');
      localStorage.setItem('userRole','User' );
    }
    if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Worker'   ) {
     router.push({ path: '/workerHome' });
     localStorage.setItem('worker_token', token.value);
    const userToken = localStorage.getItem('worker_token');
      localStorage.setItem('userRole','Worker' );
    }
    if( decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Menager'){
      router.push({ path: '/workerHome' });
      localStorage.setItem('worker_token', token.value);
      const userToken = localStorage.getItem('worker_token');
      localStorage.setItem('userRole','Menager' );
    }
    if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Vet' || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'HeadVet') {
      router.push({ path: '/vetHome' });
      localStorage.setItem('vet_token', token.value);
      const userToken = localStorage.getItem('vet_token');
      localStorage.setItem('userRole','Vet' );
    }
        if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'HeadVet') {
      router.push({ path: '/vetHome' });
      localStorage.setItem('vet_token', token.value);
      const userToken = localStorage.getItem('vet_token');
      localStorage.setItem('userRole','HeadVet' );
    }
    if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Surenderer' || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'AnimalWelffereOfficer' || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Association') {
      router.push({ path: '/surenderersHome' });
      localStorage.setItem('vet_token', token.value);
      const userToken = localStorage.getItem('vet_token');
      localStorage.setItem('userRole','Surenderer' );
    }
     else {
      console.error('Error fetching role details:', error);
      localStorage.setItem('userRole','' );
    }
 
/**--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/**--------------------------------------------------------------------------------------------------------------------------------------------------------- */
    console.log('Login successful');
  } catch (error) {
 
    if (error.response && error.response.status === 401) {
      loginError.value = 'The entry is not valid';
    } else  {
     
    }
  } finally {
    loading.value = false;
  }
};

const fetchUserDetails = async (userId) => {
  const tokenValue = localStorage.getItem('token');

  try {
    const response = await instance.get(`animal/adopter/${userId}`, {
      headers: {
        Authorization: `Bearer ${tokenValue}`
      }
    });
    const user = response.data;
    localStorage.setItem('adopterId', user.id);

    if (user.adopterFlag === true) {
      accessDenied.value = true;
    }
  } catch (error) {
    console.error('Error fetching adopter details:', error);
  }
};

onMounted(() => {
  // Ako flag ne postoji, znači da je prvo učitavanje
  if (!sessionStorage.getItem('cacheCleared')) {
    // Briše sve što možeš
    localStorage.clear();
    sessionStorage.clear();
    caches.keys().then(names => {
      for (let name of names) caches.delete(name);
    });

    // Postavlja flag da se reload izvrši samo jednom
    sessionStorage.setItem('cacheCleared', 'true');

    // Reload stranice
    window.location.reload();
  } else {
    // Posle reload-a, brišemo flag da se može ponovo koristiti sledeći put
    sessionStorage.removeItem('cacheCleared');
  }
});


</script>
