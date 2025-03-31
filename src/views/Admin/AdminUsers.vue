<template>
  <div class="container mt-5 mx-auto px-4">
    <div class="flex">
      <AdminNavigation class="w-1/6" />
      <div class="w-5/6 shadow-lg rounded-lg overflow-hidden text-white ml-auto">
        <h1 class="ml-5 text-2xl font-bold mb-4 text-white">Adopter List</h1>
        <!-- General Search -->
        <div class="ml-5 mb-4">
          <input type="text" id="generalSearch" placeholder="Search All Columns" class="text-gray-500 w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="generalSearchQuery" />
        </div>

         <!-- Get excel file of funds -->
        
         <button @click="funds()"   class="block mx-5 mt-2 size-fit mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"type="button">
          <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
          </svg>
            <span class="block text-sm font-bold mx-2  ">Download</span>
          </button>
            <p class="text-xs font-normal text-gray-200 mx-5">Download donations in the past month</p>
        <!-- Table -->
        <div class="overflow-x-auto custom-scrollbar">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
               
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">First Name</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Last Name</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Date of Birth</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Residence</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Username</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Flagd </th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"> </th>
              </tr>
            </thead>
            <tbody>
  <tr v-for="adopter in filteredAdopters" :key="adopter.Id"  :class="{  'flagged-row': adopter.flag,  'cursor-not-allowed opacity-50': adopter.numberOfAdoptedAnimals === 0 }" 
    class="border-b border-customBlack"
    @click="adopter.numberOfAdoptedAnimals > 0 ? navigateToDetails(adopter.id) : null">

  <td class="px-5 py-5 text-sm font-bold">{{ adopter.firstName }}</td>
  <td class="px-5 py-5 text-sm font-bold">{{ adopter.lastName }}</td>
  <td class="px-5 py-5 text-sm font-bold">{{ formatDate(adopter.dateOfBirth) }}</td>
  <td class="px-5 py-5 text-sm font-bold">{{ adopter.residence }}</td>
  <td class="px-5 py-5 text-sm font-bold">{{ adopter.username }}</td>
  <td class="px-5 py-5 text-sm font-bold">{{ adopter.flag }}</td>
  <td class="px-5 py-5 text-sm font-bold">
    <button @click="flagAdopter(adopter.id)"   :class="{ 'bg-red-500 hover:bg-red-700': adopter.flag,  'bg-gray-500 hover:bg-gray-700': !adopter.flagged 
     }"class="text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"> Flag</button>
  </td>
  
  
</tr>

</tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import instance from '@/axiosBase';
import AdminNavigation from '../Admin/AdminNavigation.vue';

export default {
  components: {
    AdminNavigation,
  },
  data() {
    return {
      adopters: [],
      generalSearchQuery: '',
    };
  },
  mounted() {
    instance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    instance.get('animal/adopter_db')
      .then(response => {
        this.adopters = response.data.map(adopter => ({
          ...adopter,
          flagged: false, 
        }));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  },
  computed: {
    

    filteredAdopters() {
      // Convert queries to lowercase for case-insensitive matching
      const generalQuery = this.generalSearchQuery.toLowerCase().trim();

      // Filter adopters based on general search query
      return this.adopters.filter(adopter => {
        const firstNameMatch = adopter.firstName.toLowerCase().includes(generalQuery);
        const lastNameMatch = adopter.lastName.toLowerCase().includes(generalQuery);
        const dobMatch = this.formatDate(adopter.dateOfBirth).toLowerCase().includes(generalQuery);
        const residenceMatch = adopter.residence.toLowerCase().includes(generalQuery);
        const usernameMatch = adopter.username.toLowerCase().includes(generalQuery);
        const adoptedAnimalsMatch = adopter.numberOfAdoptedAnimals.toString().includes(generalQuery);
        const returnedAnimalsMatch = adopter.numberOfReturnedAnimals.toString().includes(generalQuery);

        return (
          firstNameMatch || lastNameMatch || dobMatch || residenceMatch || 
          usernameMatch || adoptedAnimalsMatch || returnedAnimalsMatch
        );
      });
    }
  },
  methods:
  {
   async funds(){
  

const response = await instance.get(`excel/generateDva/`,{
  responseType: 'blob',
  headers: {
    Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  data: {

  },
});
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `Funds-${+new Date()}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(link.href);

    },
    
    
    navigateToDetails(idUser) {
    this.$router.push(`/user/${idUser}`);
  },
    formatDate(dateTimeString) {
      // Convert date-time string to Date object
      const date = new Date(dateTimeString);
      // Format date as yyyy-mm-dd
      return date.toISOString().split('T')[0];
    },
    flagAdopter(id) {
    instance.put(`animal/flag/${id}`)
     .then(response => {     
       console.log("Flagd ",id);
       location.reload();
      })
      .catch(error => {
        console.error('There was an error flagging the adopter!', error);
      });
  
}

  }
};
</script>
<style>
  .flagged-row {
    
    color: #f95a5ab5; 
  }
</style>
