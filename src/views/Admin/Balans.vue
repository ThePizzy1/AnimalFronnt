<template>
  <div class="flex">
    <!-- Navigacija -->
    <div class="w-1/6 text-stone-200 p-4 rounded-l-lg">
      <component :is="role === 'Admin' ? 'AdminNavigation' : 'WorkerNavigation'" />
    </div>

    <!-- Glavni dio -->
    <div class="w-5/6 text-stone-200 p-4 rounded-r-lg mr-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-white/90">Balance Accounts</h1>

        <button
          @click="add = true"
          :disabled="!checkMenager"
          :class="[
            'text-stone-200 bg-emerald-500 hover:bg-emerald-600 focus:ring-2 focus:outline-none font-medium rounded-full text-base px-4 py-2 inline-flex items-center',
            checkMenager ? '' : 'opacity-50 cursor-not-allowed'
          ]"
        >
          <svg
            class="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 5a1 1 0 011 1v5h5a1 1 0 010 2h-5v5a1 1 0 01-2 0v-5H6a1 1 0 010-2h5V6a1 1 0 011-1z"
            />
          </svg>
          Add
        </button>
      </div>

      <!-- Search bar -->
      <div class="mb-5">
        <input
          v-model="generalSearchQuery"
          type="text"
          placeholder="Search by IBAN or Type..."
          class="w-full px-5 py-3 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
      </div>

      <!-- Tablica -->
      <div class="overflow-x-auto custom-scrollbar">
        <table
          class="w-full border-separate border-spacing-y-4 bg-[#0e0e0e] rounded-xl p-4 shadow-md"
        >
          <thead>
            <tr class="text-left text-gray-400 text-xs md:text-sm uppercase tracking-wider">
              <th class="px-6 py-3"></th>
              <th class="px-6 py-3">IBAN</th>
              <th class="px-6 py-3">Type</th>
              <th class="px-6 py-3">Date</th>
              <th class="px-6 py-3">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in paginatedBalances"
              :key="item.id"
              class="bg-[#1a1a1a] hover:bg-[#242424] border border-gray-700/30 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <td class="px-6 py-5 text-center">
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
              <td class="px-6 py-5 font-semibold text-white">{{ item.iban }}</td>
              <td class="px-6 py-5 text-gray-300">{{ item.type }}</td>
              <td class="px-6 py-5 text-gray-300">{{ formatDate(item.lastUpdated) }}</td>
              <td class="px-6 py-5 text-emerald-400 font-bold">{{ item.balance }} €</td>
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
        Showing {{ paginatedBalances.length }} of {{ filteredItems.length }} filtered results
        (Total: {{ items.length }})
      </p>
    </div>
  </div>

  <!-- MODAL DETALJI -->
  <div
    v-if="single"
    class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
  >
    <div class="bg-[#0e0e0e] p-6 rounded-xl shadow-xl border border-gray-700 max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-white">Account Details</h3>
        <button @click="single = false" class="text-gray-400 hover:text-emerald-400">✖</button>
      </div>
      <div class="space-y-3 text-gray-300">
        <p><strong>IBAN:</strong> {{ singleItem.iban }}</p>
        <p><strong>Type:</strong> {{ singleItem.type }}</p>
        <p><strong>Last Updated:</strong> {{ formatDate(singleItem.lastUpdated) }}</p>
        <p><strong>Balance:</strong> {{ singleItem.balance }} €</p>
      </div>
    </div>
  </div>

  <!-- MODAL DODAVANJE -->
  <div v-if="add && role === 'Admin'" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-[#0e0e0e] p-6 rounded-xl shadow-xl border border-gray-700 max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-white">Add New Balance</h3>
        <button @click="add = false" class="text-gray-400 hover:text-emerald-400">✖</button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="ibanAdd" class="block text-sm font-semibold text-gray-300 mb-1">IBAN</label>
          <input
            v-model="ibanAdd"
            id="ibanAdd"
            type="text"
            placeholder="HR1212345678901234567"
            class="w-full px-3 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label for="typeAdd" class="block text-sm font-semibold text-gray-300 mb-1">Type</label>
          <input
            v-model="typeAdd"
            id="typeAdd"
            type="text"
            placeholder="Business"
            class="w-full px-3 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-300 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="••••••••"
            class="w-full px-3 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label for="passwordConfirm" class="block text-sm font-semibold text-gray-300 mb-1"
            >Confirm Password</label
          >
          <input
            v-model="passwordConfirm"
            type="password"
            id="passwordConfirm"
            placeholder="••••••••"
            class="w-full px-3 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg py-2 transition-all duration-300"
        >
          Add
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import AdminNavigation from '../Admin/AdminNavigation.vue';
import WorkerNavigation from '../Worker/WorkerNavigation.vue';
import instance from '@/axiosBase';
import Swal from 'sweetalert2';

export default {
  components: { AdminNavigation, WorkerNavigation },
  data() {
    return {
      role: localStorage.getItem('userRole') || 'Admin',
      add: false,
      ibanAdd: '',
      typeAdd: '',
      balanceAdd: 0.0,
      password: '',
      passwordConfirm: '',
      items: [],
      single: false,
      singleItem: {},
      generalSearchQuery: '',
      currentPage: 1,
      itemsPerPage: 15,
    };
  },
  computed: {
    checkMenager() {
      return this.role === 'Admin';
    },
    filteredItems() {
      const q = this.generalSearchQuery?.toLowerCase().trim() || '';
      return this.items.filter(
        (item) =>
          item.iban?.toLowerCase().includes(q) ||
          item.type?.toLowerCase().includes(q)
      );
    },
    paginatedBalances() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredItems.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await instance.get('animal/balans_db');
        this.items = response.data;
      } catch (error) {
        console.error('Error loading balances:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    openSinglModal(item) {
      this.single = true;
      this.singleItem = item;
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
    async handleSubmit() {
      if (this.password !== this.passwordConfirm) {
        return Swal.fire('Error', 'Passwords do not match!', 'error');
      }
      if (this.password.length < 8) {
        return Swal.fire('Error', 'Password must be at least 8 characters long.', 'error');
      }

      try {
        await instance.post('animal/addBalans', {
          Iban: this.ibanAdd,
          Type: this.typeAdd,
          Password: this.password,
          LastUpdated: new Date().toISOString(),
        });
        Swal.fire('Success', 'Balance added successfully!', 'success');
        this.add = false;
        this.fetchData();
      } catch (error) {
        console.error('Add error:', error);
        Swal.fire('Error', 'Failed to add balance.', 'error');
      }
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
