<template>
  <div class="container mx-auto px-4 mt-6">
    <div class="flex">
      <AdminNavigation class="w-1/6" />

      <div class="w-5/6 ml-auto">
        <h1 class="ml-1 md:ml-2 text-2xl font-semibold text-white/90 mb-5">Funds Database</h1>

        <!-- 🧾 DOWNLOAD GUMB -->
        <button
          @click="funds"
          class="block mx-5 mt-2 mb-4 text-stone-200 bg-stone-700 hover:bg-emerald-600 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center"
          type="button"
        >
          <svg
            class="w-6 h-6 text-stone-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
            />
          </svg>
          <span class="block text-base font-bold mx-2">Download</span>
        </button>
        <p class="text-xs font-normal text-gray-300 mx-5 mb-4">
          Download donations in the past month
        </p>

        <!-- FILTERI -->
        <div
          class="bg-[#0e0e0e] rounded-xl p-6 shadow-lg border border-white/10 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          <div>
            <label for="amount" class="block text-sm font-semibold mb-2 text-gray-300">Amount:</label>
            <select
              v-model="filters.amount"
              id="amount"
              class="w-full py-2.5 px-3 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All</option>
              <option v-for="amount in amounts" :key="amount" :value="amount">{{ amount }}</option>
            </select>
          </div>

          <div>
            <label for="purpose" class="block text-sm font-semibold mb-2 text-gray-300">Purpose:</label>
            <select
              v-model="filters.purpose"
              id="purpose"
              class="w-full py-2.5 px-3 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All</option>
              <option v-for="purpose in purposes" :key="purpose" :value="purpose">{{ purpose }}</option>
            </select>
          </div>

          <div>
            <label for="dateTime" class="block text-sm font-semibold mb-2 text-gray-300">Date:</label>
            <input
              v-model="filters.dateTime"
              id="dateTime"
              type="date"
              class="w-full py-2.5 px-3 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <!-- TABLICA -->
        <div class="overflow-x-auto custom-scrollbar">
          <table
            class="w-full border-separate border-spacing-y-4 bg-[#0e0e0e] rounded-xl p-4 md:p-6 shadow-md"
          >
            <thead>
              <tr class="text-left text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                <th class="px-6 py-3"></th>
                <th class="px-6 py-3">Amount</th>
                <th class="px-6 py-3">Purpose</th>
                <th class="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in paginatedFunds"
                :key="item.id"
                class="bg-[#1a1a1a] hover:bg-[#242424] border border-gray-700/30 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <td class="px-6 py-5 text-base text-center">
                  <svg
                    @click="openSinglModal(item)"
                    class="w-6 h-6 text-emerald-400 hover:text-emerald-300 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </td>
                <td class="px-6 py-5 text-white font-semibold">{{ item.amount }}€</td>
                <td class="px-6 py-5 text-gray-300">{{ item.purpose }}</td>
                <td class="px-6 py-5 text-gray-300">{{ formatDate(item.dateTime) }}</td>
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

        <p class="text-gray-700 text-sm mt-5 text-center">
          Showing {{ paginatedFunds.length }} of {{ filteredItems.length }} filtered results
          (Total: {{ items.length }})
        </p>
      </div>
    </div>

    <!-- 🟢 MODAL -->
    <div
      v-if="single"
      class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
    >
      <div class="bg-[#0e0e0e] p-6 rounded-xl shadow-xl border border-gray-700 max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-white">Fund Details</h3>
          <button @click="single = false" class="text-gray-400 hover:text-emerald-400">✖</button>
        </div>
        <div class="space-y-3 text-gray-300">
          <p><strong>User:</strong> {{ sigleUser.firstName }} {{ sigleUser.lastName }}</p>
          <p><strong>Residence:</strong> {{ sigleUser.residence }}</p>
          <p><strong>Purpose:</strong> {{ singleItem.purpose }}</p>
          <p><strong>Amount:</strong> {{ singleItem.amount }} €</p>
          <p><strong>Date:</strong> {{ formatDate(singleItem.dateTime) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavigation from './AdminNavigation.vue';
import instance from '@/axiosBase';

export default {
  components: { AdminNavigation },
  data() {
    return {
      items: [],
      amounts: [],
      purposes: [],
      filters: { amount: '', purpose: '', dateTime: '' },
      currentPage: 1,
      itemsPerPage: 20,
      single: false,
      singleItem: {},
      sigleUser: {},
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    filteredItems() {
      return this.items.filter(
        (item) =>
          (!this.filters.amount || item.amount === this.filters.amount) &&
          (!this.filters.purpose || item.purpose === this.filters.purpose) &&
          (!this.filters.dateTime || item.dateTime.startsWith(this.filters.dateTime))
      );
    },
    paginatedFunds() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredItems.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
  },
  methods: {
    async funds() {
      const response = await instance.get(`excel/generateDva/`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `Funds-${+new Date()}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(link.href);
    },
    async openSinglModal(item) {
      this.single = true;
      this.singleItem = item;
      const userResponse = await instance.get(`animal/adopterId/${item.adopterId}`);
      this.sigleUser = userResponse.data;
    },
    async fetchData() {
      try {
        const response = await instance.get('animal/funds_db');
        this.items = response.data;
        this.amounts = [...new Set(this.items.map((i) => i.amount))];
        this.purposes = [...new Set(this.items.map((i) => i.purpose))];
      } catch (error) {
        console.error('Error fetching funds:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
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
