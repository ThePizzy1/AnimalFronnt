<template>
  <div class="container mx-auto px-4 mt-6">
    <Loading v-if="loadingError" />

    <div class="flex">
      <AdminNavigation class="w-1/6" />

      <div class="w-5/6 ml-auto">
        <!-- Title -->
        <h1 class="ml-1 md:ml-2 text-2xl font-semibold text-white/90 mb-5">Adopter List</h1>

        <!-- 🔍 Search -->
        <div class="bg-[#0e0e0e] rounded-xl p-6 shadow-lg border border-white/10 mb-5">
          <form @submit.prevent>
            <div class="relative">
              <input
                v-model="generalSearchQuery"
                type="text"
                placeholder="Search by name, username, residence, date..."
                class="w-full px-5 py-3 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>
          </form>
        </div>

        <!-- 🧍‍♂️ Table -->
        <div class="overflow-x-auto custom-scrollbar">
          <table class="w-full border-separate border-spacing-y-4 bg-[#0e0e0e] rounded-xl p-4 md:p-6">
            <thead>
              <tr class="text-left text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                <th class="px-6 py-3">First Name</th>
                <th class="px-6 py-3">Last Name</th>
                <th class="px-6 py-3">Date of Birth</th>
                <th class="px-6 py-3">Residence</th>
                <th class="px-6 py-3">Username</th>
                <th class="px-6 py-3">Flag</th>
                <th class="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="adopter in paginatedAdopters"
                :key="adopter.id"
                :class="{ 'bg-[#241313]/50': adopter.flag }"
                class="bg-[#1a1a1a] hover:bg-[#242424] border border-gray-700/30 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <td class="px-6 py-5 text-white font-semibold" @click="navigateToDetails(adopter.id)">
                  {{ adopter.firstName }}
                </td>
                <td class="px-6 py-5 text-gray-300" @click="navigateToDetails(adopter.id)">
                  {{ adopter.lastName }}
                </td>
                <td class="px-6 py-5 text-gray-300" @click="navigateToDetails(adopter.id)">
                  {{ formatDate(adopter.dateOfBirth) }}
                </td>
                <td class="px-6 py-5 text-gray-300" @click="navigateToDetails(adopter.id)">
                  {{ adopter.residence }}
                </td>
                <td class="px-6 py-5 text-gray-300">{{ adopter.username }}</td>
                <td class="px-6 py-5 text-gray-300">{{ adopter.flag ? 'Yes' : 'No' }}</td>
                <td class="px-6 py-5 text-center">
                  <button
                    @click.stop="flagAdopter(adopter.id)"
                    :class="[
                      'px-4 py-2 rounded-lg font-bold transition duration-300',
                      adopter.flag
                        ? 'bg-red-500 hover:bg-red-700'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    ]"
                  >
                    {{ adopter.flag ? 'Unflag' : 'Flag' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PAGINATION -->
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
          Showing {{ paginatedAdopters.length }} of {{ filteredAdopters.length }} filtered results
          (Total: {{ adopters.length }})
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/axiosBase';
import AdminNavigation from '../Admin/AdminNavigation.vue';
import Loading from '../Loading.vue';

export default {
  components: {
    AdminNavigation,
    Loading,
  },
  data() {
    return {
      loadingError: false,
      adopters: [],
      generalSearchQuery: '',
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

    this.loadingError = true;
    instance
      .get('animal/adopter_db')
      .then((response) => {
        this.adopters = response.data.map((adopter) => ({
          ...adopter,
          flag: adopter.flag || false,
        }));
        setTimeout(() => (this.loadingError = false), 1000);
      })
      .catch((error) => {
        this.loadingError = true;
        console.error('There was an error!', error);
      });
  },
  computed: {
    filteredAdopters() {
      const query = this.generalSearchQuery.toLowerCase().trim();
      return this.adopters.filter((adopter) => {
        return (
          adopter.firstName?.toLowerCase().includes(query) ||
          adopter.lastName?.toLowerCase().includes(query) ||
          adopter.username?.toLowerCase().includes(query) ||
          adopter.residence?.toLowerCase().includes(query) ||
          this.formatDate(adopter.dateOfBirth).includes(query)
        );
      });
    },
    paginatedAdopters() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredAdopters.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredAdopters.length / this.itemsPerPage);
    },
  },
  watch: {
    filteredAdopters() {
      this.currentPage = 1;
    },
  },
  methods: {
    navigateToDetails(idUser) {
      this.$router.push(`/user/${idUser}`);
    },
    formatDate(dateTimeString) {
      if (!dateTimeString) return 'N/A';
      const date = new Date(dateTimeString);
      return date.toISOString().split('T')[0];
    },
    flagAdopter(id) {
      instance
        .put(`animal/flag/${id}`)
        .then(() => {
          const adopter = this.adopters.find((a) => a.id === id);
          if (adopter) adopter.flag = !adopter.flag;
        })
        .catch((error) => {
          console.error('There was an error flagging the adopter!', error);
        });
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
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
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
