<template>
  <div class="container mt-5 mx-auto px-4">
    <div class="flex">
      <AdminNavigation class="w-1/6" />
      <div class="w-5/6 shadow-lg rounded-lg overflow-hidden text-white ml-auto">
        <h1 class="ml-5 text-2xl font-bold mb-4 text-white">Returned Animals</h1>
        <div class="overflow-x-auto custom-scrollbar">
          <div class="flex mb-4 px-5">
            <input
              v-model="searchCode"
              type="text"
              placeholder="Search Code"
              class="search-input"
            />
            <input
              v-model="searchAnimalId"
              type="text"
              placeholder="Search Animal "
              class="search-input"
            />
            <input
              v-model="searchAdopterId"
              type="text"
              placeholder="Search Adopter "
              class="search-input"
            />
          </div>
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">
                  Code
                </th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">
                  Animal Code
                </th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">
                  Adopter Code
                </th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">
                  Adoption Date
                </th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">
                  Return Date
                </th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">
                  Return Reason
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="returnData in filteredReturnedAnimals"
                :key="returnData.returnCode"
                class="border-b border-customBlack"
              >
                <td class="px-5 py-5 text-sm font-bold">
                  {{ returnData.returnCode }}
                </td>
                <td class="px-5 py-5 text-sm font-bold">
                  {{ returnData.animalId }}
                </td>
                <td class="px-5 py-5 text-sm font-bold">
                  {{ returnData.adopterId }}
                </td>
                <td class="px-5 py-5 text-sm font-bold">
                  {{ formatDate(getAdoptionDate(returnData.adoptionCode)) }}
                </td>
                <td class="px-5 py-5 text-sm font-bold">
                  {{ formatDate(returnData.returnDate) }}
                </td>
                <td class="px-5 py-5 text-sm font-bold">
                  {{ returnData.returnReason }}
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
      returnedAnimals: [],
      adoptions: [],
      searchCode: '',
      searchAnimalId: '',
      searchAdopterId: '',
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

    instance.get('animal/reaturned_db')
      .then(response => {
        this.returnedAnimals = response.data;
        this.loadAdoptions();
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  },
  methods: {
    loadAdoptions() {
      instance.get('animal/adopted_db')
        .then(response => {
          this.adoptions = response.data;
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    },
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      return date.toISOString().split('T')[0];
    },
    getAdoptionDate(adoptionCode) {
      const adoption = this.adoptions.find(adoption => adoption.code === adoptionCode);
      return adoption ? adoption.adoptionDate : 'N/A';
    },
  },
  computed: {
    filteredReturnedAnimals() {
      return this.returnedAnimals.filter(returnData => {
        return (
          returnData.returnCode.toString().includes(this.searchCode) &&
          returnData.animalId.toString().includes(this.searchAnimalId) &&
          returnData.adopterId.toString().includes(this.searchAdopterId)
        );
      });
    },
  },
};
</script>

<style scoped>
.container {
  color: white;
  font-family: 'Poppins', sans-serif;
  margin-top: 25px;
}

.search-input {
  margin-right: 1rem;
  padding: 0.5rem;
  background-color: white;
  color: gray;
  border: 1px solid #ccc;
  border-radius: 4px;
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

  