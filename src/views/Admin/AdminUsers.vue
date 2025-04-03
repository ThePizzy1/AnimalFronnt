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
