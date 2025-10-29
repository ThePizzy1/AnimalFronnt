<template>
  <div class="container mx-auto px-4 mt-6">
    <Loading v-if="loadingError" />

    <div class="flex">
      <AdminNavigation class="w-1/6" />

      <div class="w-5/6 ml-auto">
        <!-- Naslov -->
        <h1 class="ml-1 md:ml-2 text-2xl font-semibold text-white/90 mb-5">
          Animal Surrenderers
        </h1>

        <!-- 🔍 Search -->
        <div class="bg-[#0e0e0e] rounded-xl p-6 shadow-lg border border-white/10 mb-5">
          <form @submit.prevent>
            <div class="relative">
              <input
                v-model="generalSearchQuery"
                type="text"
                placeholder="Search by name, username, email, or phone..."
                class="w-full px-5 py-3 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>
          </form>
        </div>

        <!-- 🐾 Tablica -->
        <div class="overflow-x-auto custom-scrollbar">
          <table
            class="w-full border-separate border-spacing-y-4 bg-[#0e0e0e] rounded-xl p-4 md:p-6 shadow-md"
          >
            <thead>
              <tr class="text-left text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                <th class="px-6 py-3">First Name</th>
                <th class="px-6 py-3">Last Name</th>
                <th class="px-6 py-3">Username</th>
                <th class="px-6 py-3">Email</th>
                <th class="px-6 py-3">Phone Number</th>
                <th class="px-6 py-3">Role</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="person in paginatedSurrenderers"
                :key="person.id"
                class="bg-[#1a1a1a] hover:bg-[#242424] border border-gray-700/30 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <td class="px-6 py-5 text-white font-semibold">{{ person.firstName }}</td>
                <td class="px-6 py-5 text-gray-300">{{ person.lastName }}</td>
                <td class="px-6 py-5 text-gray-300">{{ person.userName }}</td>
                <td class="px-6 py-5 text-gray-300">{{ person.email }}</td>
                <td class="px-6 py-5 text-gray-300">{{ person.phoneNumber }}</td>
                <td
                  class="px-6 py-5 font-semibold"
                  :class="{
                    'text-emerald-400': person.roles.includes('Association'),
                    'text-yellow-400': person.roles.includes('AnimalWelffereOfficer'),
                    'text-blue-400': person.roles.includes('Surenderer')
                  }"
                >
                  {{
                    person.roles.includes('Association')
                      ? 'Association'
                      : person.roles.includes('AnimalWelffereOfficer')
                      ? 'Animal Welfare Officer'
                      : 'Surrenderer'
                  }}
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

        <!-- INFO -->
        <p class="text-gray-400 text-sm mt-5 text-center">
          Showing {{ paginatedSurrenderers.length }} of {{ filteredItems.length }} filtered results
          (Total: {{ items.length }})
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/axiosBase';
import AdminNavigation from './AdminNavigation.vue';
import Loading from '../Loading.vue';

export default {
  components: {
    AdminNavigation,
    Loading,
  },
  data() {
    return {
      loadingError: false,
      generalSearchQuery: '',
      items: [],
      currentPage: 1,
      itemsPerPage: 20,
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    filteredItems() {
      const query = this.generalSearchQuery?.toLowerCase().trim() || '';
      return this.items.filter((item) => {
        return (
          item.firstName?.toLowerCase().includes(query) ||
          item.lastName?.toLowerCase().includes(query) ||
          item.userName?.toLowerCase().includes(query) ||
          item.email?.toLowerCase().includes(query) ||
          item.phoneNumber?.toLowerCase().includes(query)
        );
      });
    },
    paginatedSurrenderers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredItems.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
  },
  watch: {
    filteredItems() {
      this.currentPage = 1;
    },
  },
  methods: {
    async fetchData() {
      try {
        this.loadingError = true;
        const response = await instance.get('auth/getAll');
        this.items = response.data.filter(
          (item) =>
            item.roles.includes('AnimalWelffereOfficer') ||
            item.roles.includes('Association') ||
            item.roles.includes('Surenderer')
        );
        setTimeout(() => (this.loadingError = false), 1000);
      } catch (error) {
        this.loadingError = true;
        console.error('Error fetching surrenderers:', error);
      }
    },
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
