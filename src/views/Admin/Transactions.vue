<template>
  <div class="container mx-auto px-4 mt-6">
    <div class="flex">
      <AdminNavigation class="w-1/6" />

      <div class="w-5/6 ml-auto">
      
        <!-- Search -->
        <div class="bg-[#0e0e0e] rounded-xl p-6 shadow-lg border border-white/10 mb-5"> 
           <!-- Naslov -->
        <h1 class="ml-1 md:ml-2 text-2xl font-semibold text-white/90 mb-5">Transactions</h1>

          <input
            v-model="generalSearchQuery"
            type="text"
            placeholder="Search by IBAN, purpose, or type..."
            class="w-full px-5 py-3 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
          />
        </div>

        <!-- Tablica -->
        <div class="overflow-x-auto custom-scrollbar">
          <table
            class="w-full border-separate border-spacing-y-4 bg-[#0e0e0e] rounded-xl p-4 md:p-6 shadow-md"
          >
            <thead>
              <tr class="text-left text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                <th class="px-6 py-3"></th>
                <th class="px-6 py-3">IBAN</th>
                <th class="px-6 py-3">Shelter IBAN</th>
                <th class="px-6 py-3">Type</th>
                <th class="px-6 py-3">Date</th>
                <th class="px-6 py-3">Cost</th>
                <th class="px-6 py-3">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in paginatedTransactions"
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
                <td class="px-6 py-5 text-white font-semibold">{{ item.iban }}</td>
                <td class="px-6 py-5 text-gray-300">{{ item.ibanAnimalShelter }}</td>
                <td class="px-6 py-5 text-gray-300">{{ item.type }}</td>
                <td class="px-6 py-5 text-gray-300">{{ formatDate(item.date) }}</td>
                <td class="px-6 py-5 text-emerald-400 font-bold">{{ item.cost }} €</td>
                <td class="px-6 py-5 text-gray-300">{{ item.purpose }}</td>
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
          Showing {{ paginatedTransactions.length }} of {{ filteredItems.length }} filtered results
          (Total: {{ items.length }})
        </p>
      </div>
    </div>

    <!-- MODAL -->
    <div
      v-if="single"
      class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
    >
      <div class="bg-[#0e0e0e] p-6 rounded-xl shadow-xl border border-gray-700 max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-white">Transaction Details</h3>
          <button @click="single = false" class="text-gray-400 hover:text-emerald-400">✖</button>
        </div>
        <div class="space-y-3 text-gray-300">
          <p><strong>IBAN:</strong> {{ singleItem.iban }}</p>
          <p><strong>Animal Shelter IBAN:</strong> {{ singleItem.ibanAnimalShelter }}</p>
          <p><strong>Type:</strong> {{ singleItem.type }}</p>
          <p><strong>Purpose:</strong> {{ singleItem.purpose }}</p>
          <p><strong>Cost:</strong> {{ singleItem.cost }} €</p>
          <p><strong>Date:</strong> {{ formatDate(singleItem.date) }}</p>
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
      generalSearchQuery: '',
      single: false,
      singleItem: {},
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    filteredItems() {
      const query = this.generalSearchQuery?.toLowerCase().trim() || '';
      return this.items.filter(
        (item) =>
          item.iban?.toLowerCase().includes(query) ||
          item.purpose?.toLowerCase().includes(query) ||
          item.type?.toLowerCase().includes(query) ||
          item.ibanAnimalShelter?.toLowerCase().includes(query)
      );
    },
    paginatedTransactions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredItems.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await instance.get('animal/transaction_db');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    },
    openSinglModal(item) {
      this.single = true;
      this.singleItem = item;
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
tbody tr {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
tbody tr:hover {
  transform: translateY(-3px);
}
</style>
