<template>
  <div class="container mt-5 mx-auto px-4">
    <div class="flex">
      <AdminNavigation class="w-1/6" />
      <div class="w-5/6 shadow-lg rounded-lg overflow-hidden text-white ml-auto">
        <h1 class="ml-5 text-2xl font-bold mb-4 text-white">Adopted Animals</h1>
        <!-- Filter Inputs in a Row -->
        <div class="flex ml-5 mb-4 space-x-4">
         
          <!-- Filter for Code -->
          <div>
           
            <input
              type="text"
              id="codeSearch"
                placeholder="Search by Code"
              class="text-gray-500 w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              v-model="filter.code"
            />
          </div>
          <!-- Filter for Animal ID -->
          <div>
            
            <input
              type="text"
              id="animalIdSearch"
              placeholder="Search by Animal"
              class="text-gray-500 w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              v-model="filter.animalId"
            />
          </div>
            <!-- Filter for Adopter ID -->
            <div>
           
            <input
              type="text"
              id="adopterIdSearch"
                placeholder="Search by Adopter "
              class="text-gray-500 w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              v-model="filter.adopterId"
            />
          </div>
        </div>
        <!-- Table -->
        <div class="overflow-x-auto custom-scrollbar">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Code</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Animal Code</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Adopter Code</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Adoption Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="adoption in filteredAdoptions" :key="adoption.code" class="border-b border-customBlack">
                <td class="px-5 py-5 text-sm font-bold">{{ adoption.code }}</td>
                <td class="px-5 py-5 text-sm font-bold">{{ adoption.animalId }}</td>
                <td class="px-5 py-5 text-sm font-bold">{{ adoption.adopterId }}</td>
                <td class="px-5 py-5 text-sm font-bold">{{ formatDate(adoption.adoptionDate) }}</td>
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
      adoptions: [],
      filter: {
        adoption: '', // for filtering by adoption date
        animalId: '', // for filtering by animal ID
        code: '',     // for filtering by code
      }
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

    instance.get('animal/adopted_db')
      .then(response => {
        this.adoptions = response.data;
        console.log(`Response: ${response.data}`);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  },
  computed: {
    filteredAdoptions() {
      return this.adoptions.filter(adoption => {
        // Convert adoption date to date-only string format (yyyy-mm-dd)
        const adoptionDate = new Date(adoption.adoptionDate).toISOString().split('T')[0];
        const filterDate = this.filter.adoption;

        return  (!this.filter.adopterId || adoption.adopterId.toString().includes(this.filter.adopterId))&&
               (!this.filter.animalId || adoption.animalId.toString().includes(this.filter.animalId)) &&
               (!this.filter.code || adoption.code.toString().includes(this.filter.code));
      });
    }
  },
  methods: {
    formatDate(dateTimeString) {
      // Convert date-time string to Date object
      const date = new Date(dateTimeString);
      // Format date as yyyy-mm-dd
      return date.toISOString().split('T')[0];
    }
  }
};
</script>

<style scoped>
.container {
  color: white;
  font-family: 'Poppins', sans-serif;
  margin-top: 25px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.td {
  padding: 12px 15px;
  font-size: 1rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 12px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  border: 3px solid transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

/* Fix scrollbar on Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.custom-scrollbar:hover {
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
}
</style>