<template>
  <div class="flex">
     <Loading v-if="loadingError" /> 
    <div class="w-1/6 text-stone-200 p-4 rounded-l-lg">
      <AdminNavigation />
    </div>
    <div class="w-5/6 text-stone-200 p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Veterinarinans</h1>
         <!-- General Search -->
        <div class="ml-5 mb-4">
          <input type="text" id="generalSearch"placeholder="Search..."
            class="w-full px-5 py-2 pr-12 text-stone-200 placeholder-gray-100 bg-transparent border-2 border-transparent rounded-full shadow-2xl focus:outline-none focus:border-turquoise-400 hover:border-turquoise-400 transition duration-300"
          />
        </div>
      <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>

              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Last Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Username</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Email</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Phone NUMBER</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id"  class="border-b border-customBlack cursor-pointer">

              <td class="px-5 py-5 text-base font-bold text-left">{{ item.firstName}}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.lastName}}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.userName }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.email }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.phoneNumber }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>

import instance from '@/axiosBase';
import AdminNavigation from './AdminNavigation.vue';
import Loading  from '../Loading.vue';


export default {
  components: {
    AdminNavigation,
    Loading,
  },
  data() {
    return {
      generalSearchQuery: '',
      loadingError:false,
      items: [],
      filters: {
        username: '',
  password: '',
  firstname: '',
  lastname: '',
  email: '',
  phoneNumber: '',
        role: 'Vet', 
        roelH:'HeadVet'// Set default filter to "Operation"
      },
      // Početno stanje učitavanja
    };
  },
  computed: {
   filteredItems() {
    const generalQuery = this.generalSearchQuery?.toLowerCase().trim() || '';

    return this.items.filter(item => {
      const matchesGeneralQuery =
        item.firstName?.toLowerCase().includes(generalQuery) ||
        item.lastName?.toLowerCase().includes(generalQuery) ||
        item.userName?.toLowerCase().includes(generalQuery) ||
        item.email?.toLowerCase().includes(generalQuery) ||
        item.phoneNumber?.toLowerCase().includes(generalQuery);

      return matchesGeneralQuery;
    });
  },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.loadingError = true;
        const response = await instance.get('auth/getAll');
        console.error('There was an error!', response);
        this.items = response.data.filter(item => item.roles.includes('Vet') ||item.roles.includes('HeadVet')); 
        console.log(this.items);
        if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                } 
     
      } catch (error) {
        this.loadingError = true;
        console.error('There was an error!', error);
      
      }
    },

  },
  watch: {
    filters: {
      handler() {
        this.filteredItems = this.items.filter(item => {
          return (
            (!this.filters.firstname || item.firstname.includes(this.filters.firstname)) &&
            (!this.filters.lastname || item.lastname.includes(this.filters.lastname)) &&
            (!this.filters.username || item.username === this.filters.username)
          );
        });
      },
      deep: true,
    },
  },
};
</script>









  <style scoped>
  .container {
    color: white;
    font-family: 'Poppins', sans-serif;
  }
  .sticky-content {
      float: right;
      margin-left: 20px;
  }
  </style>
  