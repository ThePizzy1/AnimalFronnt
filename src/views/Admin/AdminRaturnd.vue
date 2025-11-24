<template>
  <div class="container mx-auto px-4 mt-6">
    <div class="flex">
      <AdminNavigation class="w-1/6" />

      <div class="w-5/6 ml-auto">
        <h1 class="ml-1 md:ml-2 text-2xl font-semibold text-white/90 mb-4">Returned Animals</h1>

        <!-- Filter + Search blok -->
        <div class="bg-[#0e0e0e] rounded-xl p-6 shadow-lg border border-white/10">
          <form @submit.prevent>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              <input
                v-model="searchCode"
                type="text"
                placeholder="Search Code"
                class="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
              <input
                v-model="searchAnimalId"
                type="text"
                placeholder="Search Animal ID"
                class="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
              <input
                v-model="searchAdopterId"
                type="text"
                placeholder="Search Adopter ID"
                class="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>

            <!-- Global search -->
            <div class="relative mt-3">
              <input
                v-model="globalSearch"
                type="text"
                placeholder="Search any field (code, animal, adopter, date, reason...)"
                class="w-full px-5 py-3 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>
          </form>
        </div>

        <!-- Tablica -->
        <div class="mt-4 overflow-x-auto custom-scrollbar">
          <table class="min-w-full text-left text-sm text-gray-300">
            <thead class="bg-gray-900 text-emerald-300 uppercase text-xs">
              <tr class="text-left text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                <th class="px-6 py-3">Code</th>
                <th class="px-6 py-3">Adopter Name</th>
                <th class="px-6 py-3">Username</th>
                <th class="px-6 py-3">Return Date</th>
                <th class="px-6 py-3">Return Reason</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="returnData in paginatedReturnedAnimals"
                :key="returnData.returnCode"
                @click="navigateToDetails(returnData.animalId)"
                class="bg-[#1a1a1a] hover:bg-[#242424] border border-gray-700/30 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <td class="px-6 py-5 text-gray-300 w-[160px]">{{ returnData.animalId }}</td>
                <td class="px-6 py-5 text-gray-200">{{ getAdopterFullName(returnData.adopterId) }}</td>
                <td class="px-6 py-5 text-gray-300">{{ getAdopterUsername(returnData.adopterId) }}</td>
                <td class="px-6 py-5 text-gray-300 w-[180px]">{{ getReturnDate(returnData.returnDate) }}</td>
                <td class="px-6 py-5 text-gray-300">{{ returnData.returnReason }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PAGINACIJA -->
        <div class="flex justify-center items-center mt-10 space-x-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 hover:bg-emerald-600 transition disabled:opacity-50"
          >
            Prev
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-1 rounded-lg border text-sm font-medium',
              page === currentPage
                ? 'bg-emerald-500 border-emerald-400 text-white'
                : 'bg-[#1a1a1a] border-gray-700 text-gray-300 hover:bg-[#242424]'
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 hover:bg-emerald-600 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <!-- Info o rezultatima -->
        <p class="text-gray-400 text-sm mt-5 text-center">
          Showing {{ paginatedReturnedAnimals.length }} of {{ filteredReturnedAnimals.length }} filtered results
          (Total: {{ returnedAnimals.length }})
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/axiosBase';
import AdminNavigation from '../Admin/AdminNavigation.vue';

export default {
  components: { AdminNavigation },
  data() {
    return {
      adopterDetails: [],
      returnedAnimals: [],
      adoptions: [],
      searchCode: '',
      searchAnimalId: '',
      searchAdopterId: '',
      globalSearch: '',
      // 🔹 PAGINATION
      currentPage: 1,
      itemsPerPage: 20,
    };
  },
  mounted() {
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.fetchReturnedAnimals();
    this.loadAdoptions();
  },
  computed: {
    filteredReturnedAnimals() {
      const query = this.globalSearch.toLowerCase();
      return this.returnedAnimals.filter((returnData) => {
        const adopter = this.adopterDetails.find((a) => a.id === returnData.adopterId);
        const matchesFieldSearch =
          (!this.searchCode || returnData.returnCode.toString().includes(this.searchCode)) &&
          (!this.searchAnimalId || returnData.animalId.toString().includes(this.searchAnimalId)) &&
          (!this.searchAdopterId || returnData.adopterId.toString().includes(this.searchAdopterId));

        const matchesGlobal =
          !query ||
          returnData.returnCode.toString().toLowerCase().includes(query) ||
          returnData.animalId.toString().toLowerCase().includes(query) ||
          returnData.returnReason?.toLowerCase().includes(query) ||
          this.getReturnDate(returnData.returnDate).toLowerCase().includes(query) ||
          adopter?.firstName?.toLowerCase().includes(query) ||
          adopter?.lastName?.toLowerCase().includes(query) ||
          adopter?.username?.toLowerCase().includes(query);

        return matchesFieldSearch && matchesGlobal;
      });
    },
    // 🔹 PAGINIRANI PODACI
    paginatedReturnedAnimals() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredReturnedAnimals.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredReturnedAnimals.length / this.itemsPerPage);
    },
  },
  watch: {
    filteredReturnedAnimals() {
      // Reset paginacije kad se promijeni filter ili pretraga
      this.currentPage = 1;
    },
  },
  methods: {
    fetchReturnedAnimals() {
      instance
        .get('animal/reaturned_db')
        .then((response) => {
          this.returnedAnimals = response.data;
          const adopterIds = [...new Set(this.returnedAnimals.map((a) => a.adopterId))];
          Promise.all(
            adopterIds.map((id) =>
              instance.get(`animal/adopterInt/${id}`).then((res) => res.data).catch(() => null)
            )
          ).then((results) => {
            this.adopterDetails = results.filter((a) => a !== null);
          });
        })
        .catch((error) => {
          console.error('Error loading returned animals!', error);
        });
    },
    loadAdoptions() {
      instance
        .get('animal/adopted_db')
        .then((response) => (this.adoptions = response.data))
        .catch((error) => console.error('Error loading adoptions!', error));
    },
    getReturnDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    },
    getAdopterFullName(adopterId) {
      const adopter = this.adopterDetails.find((a) => a.id === adopterId);
      return adopter ? `${adopter.firstName} ${adopter.lastName}` : 'Unknown';
    },
    getAdopterUsername(adopterId) {
      const adopter = this.adopterDetails.find((a) => a.id === adopterId);
      return adopter ? adopter.username : 'unknown';
    },
    navigateToDetails(id) {
      this.$router.push(`/adminAnimals/${id}`);
    },
    // 🔹 PAGINATION METODE
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    goToPage(page) {
      this.currentPage = page;
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
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
tbody tr {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
tbody tr:hover {
  transform: translateY(-3px);
}
</style>
