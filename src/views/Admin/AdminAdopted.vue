<template>
  <div class="container mx-auto px-4 mt-6">
    <div class="flex">
      <AdminNavigation class="w-1/6" />

      <div class="w-5/6 ml-auto">
        <h1 class="ml-2 text-2xl font-semibold text-white/90 mb-5">Adopted Animals</h1>

        <!-- 🔍 Filter blok -->
        <div class="bg-[#0e0e0e] rounded-xl p-6 shadow-lg border border-white/10">
          <form @submit.prevent>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <input
                v-model="filter.code"
                type="text"
                placeholder="Search by Code"
                class="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
              <input
                v-model="filter.animalId"
                type="text"
                placeholder="Search by Animal ID"
                class="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
              <input
                v-model="filter.adopterId"
                type="text"
                placeholder="Search by Adopter ID"
                class="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>

            <!-- Global Search -->
            <div class="relative mt-3">
              <input
                v-model="globalSearch"
                type="text"
                placeholder="Search any field (name, username, date, code...)"
                class="w-full px-5 py-3 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>
          </form>
        </div>

        <!-- 🐾 Tablica -->
        <div class="mt-5 overflow-x-auto custom-scrollbar">
          <table class="min-w-full text-left text-sm text-gray-300">
            <thead class="bg-gray-900 text-emerald-300 uppercase text-xs">
              <tr class="text-left text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                <th class="px-6 py-3">Code</th>
                <th class="px-6 py-3">Adopter Name</th>
                <th class="px-6 py-3">Username</th>
                <th class="px-6 py-3">Adoption Date</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="adoption in paginatedAdoptions"
                :key="adoption.code"
                class="bg-[#1a1a1a] hover:bg-[#242424] border border-gray-700/30 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <td class="px-6 py-5 text-gray-300">{{ adoption.animalId }}</td>
                <td class="px-6 py-5 text-gray-200">
                  {{ getAdopterById(adoption.adopterId).firstName }}
                  {{ getAdopterById(adoption.adopterId).lastName }}
                </td>
                <td class="px-6 py-5 text-gray-300">
                  {{ getAdopterById(adoption.adopterId).username }}
                </td>
                <td class="px-6 py-5 text-gray-300">
                  {{ formatDate(adoption.adoptionDate) }}
                </td>
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

        <p class="text-gray-400 text-sm mt-5 text-center">
          Showing {{ paginatedAdoptions.length }} of {{ filteredAdoptions.length }} filtered results
          (Total: {{ adoptions.length }})
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
      adoptions: [],
      filter: {
        code: '',
        animalId: '',
        adopterId: '',
      },
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
    this.fetchAdoptions();
  },
  computed: {
    filteredAdoptions() {
      const search = this.globalSearch.toLowerCase();
      return this.adoptions.filter((adoption) => {
        const adopter = this.getAdopterById(adoption.adopterId);
        const matchesSpecific =
          (!this.filter.code || adoption.code.toString().includes(this.filter.code)) &&
          (!this.filter.animalId || adoption.animalId.toString().includes(this.filter.animalId)) &&
          (!this.filter.adopterId || adoption.adopterId.toString().includes(this.filter.adopterId));
        const matchesGlobal =
          !search ||
          adoption.code.toString().toLowerCase().includes(search) ||
          adoption.animalId.toString().toLowerCase().includes(search) ||
          adopter.firstName?.toLowerCase().includes(search) ||
          adopter.lastName?.toLowerCase().includes(search) ||
          adopter.username?.toLowerCase().includes(search) ||
          this.formatDate(adoption.adoptionDate).includes(search);
        return matchesSpecific && matchesGlobal;
      });
    },
    // 🔹 Paginirani podaci
    paginatedAdoptions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredAdoptions.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredAdoptions.length / this.itemsPerPage);
    },
  },
  watch: {
    filteredAdoptions() {
      // Reset paginacije kad se filter promijeni
      this.currentPage = 1;
    },
  },
  methods: {
    fetchAdoptions() {
      instance
        .get('animal/adopted_db')
        .then((response) => {
          this.adoptions = response.data;
          const adopterIds = [...new Set(this.adoptions.map((a) => a.adopterId))];
          Promise.all(
            adopterIds.map((id) =>
              instance
                .get(`animal/adopterInt/${id}`)
                .then((res) => ({
                  id,
                  firstName: res.data.firstName,
                  lastName: res.data.lastName,
                  username: res.data.username,
                }))
                .catch(() => null)
            )
          ).then((results) => {
            this.adopterDetails = results.filter((a) => a !== null);
          });
        })
        .catch((error) => {
          console.error('Error fetching adoptions:', error);
        });
    },
    formatDate(dateTimeString) {
      if (!dateTimeString) return 'N/A';
      const date = new Date(dateTimeString);
      return date.toISOString().split('T')[0];
    },
    getAdopterById(adopterId) {
      return this.adopterDetails.find((a) => a.id === adopterId) || {};
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
