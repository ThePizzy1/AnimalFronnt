<template>
  <div class="container mx-auto px-6 py-10 text-gray-100 min-h-screen">
    <div class="flex">
      <!-- Sidebar -->
      <div class="w-1/6 p-4">
        <VetNavigation />
      </div>

      <!-- Main Content -->
      <div class="w-5/6 p-8 space-y-8 bg-[#0e0e0e] rounded-xl shadow-lg border border-white/10">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-emerald-400">☣️ Contageous Animals</h1>
          <button
            @click="add = true"
            :disabled="userRole !== 'HeadVet'"
            type="button"
            class="flex items-center px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-md transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Animal
          </button>
        </div>

        <!-- Filters -->
        <div class="grid grid-cols-3 gap-6">
          <div>
            <label for="desisseName" class="block text-sm font-medium text-gray-400 mb-2">Disease</label>
            <select
              v-model="filters.desisseName"
              id="desisseName"
              class="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="">All</option>
              <option v-for="name in desisseName" :key="name" :value="name">{{ name }}</option>
            </select>
          </div>

          <div>
            <label for="startTime" class="block text-sm font-medium text-gray-400 mb-2">Date</label>
            <input
              v-model="filters.startTime"
              id="startTime"
              type="date"
              class="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label for="contageus" class="block text-sm font-medium text-gray-400 mb-2">Contageous</label>
            <select
              v-model="filters.contageus"
              id="contageus"
              class="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="">All</option>
              <option v-for="c in contageus" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </div>

        <!-- Search -->
        <div class="relative mt-6">
          <input
            v-model="generalSearchQuery"
            type="text"
            placeholder="Search diseases..."
            class="w-full bg-[#1a1a1a] border border-gray-700 rounded-full px-5 py-2 pr-12 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
          />
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto bg-[#1a1a1a]/80 rounded-2xl border border-gray-800 shadow-xl">
          <table class="min-w-full text-left text-sm text-gray-300">
            <thead class="bg-gray-900 text-emerald-300 uppercase text-xs">
             <tr>
                <th class="px-4 py-3 text-center"></th>
                <th class="px-4 py-3 text-center font-semibold">Disease</th>
                <th class="px-4 py-3 text-center font-semibold">Date</th>
                <th class="px-4 py-3 text-center"></th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in paginatedItems"
                :key="item.id"
                :class="{
                  'opacity-50 cursor-not-allowed': item.contageus == false,
                  'hover:bg-[#202020] transition': item.contageus != false
                }"
                class="border-b border-gray-800"
              >
                <td class="px-4 py-4 text-center">
                  <svg
                    @click="openSinglModal(item)"
                    class="w-6 h-6 text-emerald-400 hover:text-emerald-300 cursor-pointer transition"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 11h2v5m-2 0h4m-2.6-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </td>

                <td class="px-4 py-4 text-center font-medium">{{ item.desisseName }}</td>
                <td class="px-4 py-4 text-center">{{ formatDate(item.startTime) }}</td>

                <td class="px-4 py-4 text-center">
                  <button
                    @click="update(item)"
                    class="flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm transition"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 3.487a2.115 2.115 0 0 1 2.995 0 2.115 2.115 0 0 1 0 2.995L8.414 17.924l-4.242.707.707-4.242L16.862 3.487z" />
                    </svg>
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center mt-8 space-x-4">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-700 text-gray-300 hover:border-emerald-500/60 hover:text-emerald-400 disabled:opacity-30 transition-all"
          >
            ‹ Prev
          </button>

          <span class="text-gray-400 text-sm">
            Page <strong class="text-emerald-400">{{ currentPage }}</strong> of
            <strong class="text-emerald-400">{{ totalPages }}</strong>
          </span>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-700 text-gray-300 hover:border-emerald-500/60 hover:text-emerald-400 disabled:opacity-30 transition-all"
          >
            Next ›
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Modal -->
  <div v-if="add" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
    <div class="relative w-full max-w-lg bg-[#121212] border border-gray-800 rounded-2xl shadow-2xl p-6">
      <div class="flex items-center justify-between border-b border-gray-700 pb-3 mb-6">
        <h3 class="text-xl font-semibold text-emerald-400">➕ Add Contageous Animal</h3>
        <button @click="add = false" class="text-gray-400 hover:text-red-500 transition text-xl">✕</button>
      </div>

      <form @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-6">
        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-400 mb-1">Disease Name</label>
          <input type="text" v-model="desisseNameAdd" placeholder="Enter disease name"
            class="w-full bg-[#1a1a1a] border border-emerald-700 rounded-xl px-3 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Date</label>
          <input type="date" v-model="startTimeAdd"
            class="w-full bg-[#1a1a1a] border border-emerald-700 rounded-xl px-3 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500" required />
        </div>

        <div>
          <label for="code" class="block mb-2 text-sm font-semibold text-emerald-300">Animal Code:</label>
          <div class="flex items-center gap-2">
            <input
              id="code"
              v-model="code"
              type="text"
              placeholder="Enter animal ID..."
              class="w-full rounded-full border border-gray-700 bg-[#1a1a1a] text-gray-200 px-4 py-2.5 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            />
             <div class="flex-shrink-0">
              <svg
                v-if="animalExists && code"
                class="w-5 h-5 text-yellow-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>

              <svg
                v-else-if="!animalExists && code"
                class="w-5 h-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
            <svg
              @click="checkAnimal"
              class="w-6 h-6 text-emerald-400 cursor-pointer hover:text-emerald-300 transition"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-400 mb-1">Description</label>
          <textarea v-model="descriptionAdd" rows="3"
            class="w-full bg-[#1a1a1a] border border-emerald-700 rounded-xl px-3 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500"
            placeholder="Write description..."></textarea>
        </div>

        <div class="col-span-2 flex justify-end">
          <button type="submit"
            class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white font-semibold transition shadow">
            Add
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Single Info Modal -->
  <div v-if="single" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-start pt-20 z-50 overflow-y-auto p-4">
    <div class="relative w-full max-w-2xl bg-[#121212] border border-gray-800 rounded-2xl shadow-2xl p-6">
      <div class="flex items-center justify-between border-b border-gray-700 pb-3 mb-6">
        <h3 class="text-2xl font-semibold text-emerald-400">🐾 Animal Details</h3>
        <button @click="single = false" class="text-gray-400 hover:text-red-500 transition text-xl">✕</button>
      </div>

      <div class="grid grid-cols-2 gap-6 text-gray-200">
        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-400 mb-1">Disease</label>
          <div class="border border-emerald-700 rounded-xl px-3 py-2">{{ singleItem.desisseName }}</div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Date</label>
          <div class="border border-emerald-700 rounded-xl px-3 py-2">{{ formatDate(singleItem.startTime) }}</div>
        </div>
<div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Code</label>
          <div class="border border-emerald-700 rounded-xl px-3 py-2">{{ itemsSingle.idAnimal }}</div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Animal Name</label>
          <div class="border border-emerald-700 rounded-xl px-3 py-2">{{ itemsSingle.name }}</div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Family</label>
          <div class="border border-emerald-700 rounded-xl px-3 py-2">{{ itemsSingle.family }}</div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Species</label>
          <div class="border border-emerald-700 rounded-xl px-3 py-2">{{ itemsSingle.species }}</div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Subspecies</label>
          <div class="border border-emerald-700 rounded-xl px-3 py-2">{{ itemsSingle.subspecies }}</div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Age</label>
          <div class="border border-emerald-700 rounded-xl px-3 py-2">{{ itemsSingle.age }}</div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Gender</label>
          <div class="border border-emerald-700 rounded-xl px-3 py-2">{{ itemsSingle.gender }}</div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Weight</label>
          <div class="border border-emerald-700 rounded-xl px-3 py-2">{{ itemsSingle.weight }}</div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Height</label>
          <div class="border border-emerald-700 rounded-xl px-3 py-2">{{ itemsSingle.height }}</div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Length</label>
          <div class="border border-emerald-700 rounded-xl px-3 py-2">{{ itemsSingle.length }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VetNavigation from '../Vet/VetNavigation.vue';
import instance from '@/axiosBase';
import Swal from 'sweetalert2';

export default {
  components: {
    VetNavigation,
  },

  data() {
    return {
      userRole: localStorage.getItem('userRole'),
      token: localStorage.getItem('token'),
      generalSearchQuery: '',

      // main data
      items: [],
      desisseName: [],
      startTime: [],
      contageus: [],

      // modals
      single: false,
      add: false,

      // single modal data
      singleItem: {},
      itemsSingle: {},
      animalIdSingle: '',

      // add modal data
      desisseNameAdd: '',
      descriptionAdd: '',
      startTimeAdd: '',
      code: '',
      registerId: null,
      animalExists: null,

      // filters
      filters: {
        desisseName: '',
        startTime: '',
        contageus: '',
      },

      // pagination
      currentPage: 1,
      itemsPerPage: 5,
    };
  },

  computed: {
    filteredItems() {
      const generalQuery = this.generalSearchQuery?.toLowerCase().trim() || '';

      return this.items.filter(item => {
        const nameMatch = (item.desisseName || '').toLowerCase().includes(generalQuery);
        const dateMatch = this.formatDate(item.startTime)?.toLowerCase().includes(generalQuery);
        const descMatch = (item.description || '').toLowerCase().includes(generalQuery);

        const filterMatch =
          (!this.filters.desisseName || item.desisseName === this.filters.desisseName) &&
          (!this.filters.startTime || item.startTime === this.filters.startTime) &&
          (!this.filters.contageus || item.contageus === this.filters.contageus);

        return (nameMatch || dateMatch || descMatch) && filterMatch;
      });
    },

    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage) || 1;
    },

    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredItems.slice(start, start + this.itemsPerPage);
    },
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    // -----------------------------
    // FETCH & FILTER
    // -----------------------------
    async fetchData() {
      try {
        const response = await instance.get('animal/contageusanimals_db');
        this.items = response.data;
        this.populateFilters();
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    },

    populateFilters() {
      this.desisseName = [...new Set(this.items.map(i => i.desisseName))];
      this.startTime = [...new Set(this.items.map(i => i.startTime))];
      this.contageus = [...new Set(this.items.map(i => i.contageus))];
    },

    formatDate(date) {
      if (!date) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },

    // -----------------------------
    // PAGINATION
    // -----------------------------
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    // -----------------------------
    // UPDATE CONTAGEOUS
    // -----------------------------
    async update(item) {
      try {
        const response = await instance.put(
          'animal/updateContageusAnimalsDomain',
          { id: item.id },
          { headers: { Authorization: `Bearer ${this.token}` } }
        );

        if (response.status === 200) {
          await Swal.fire({ title: 'Updated!', icon: 'success' });
          window.location.reload();
        }
      } catch (error) {
        console.error('Update failed:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'Update failed.',
          icon: 'error',
        });
      }
    },

    // -----------------------------
    // SINGLE MODAL
    // -----------------------------
    async openSinglModal(item) {
      try {
        this.single = true;
        this.singleItem = item;
        this.animalIdSingle = item.animalId;

        const animalResponse = await instance.get(`animal/animal/${this.animalIdSingle}`);
        this.itemsSingle = animalResponse.data;
      } catch (error) {
        console.error('Error fetching animal info:', error);
      }
    },

    // -----------------------------
    // ADD MODAL
    // -----------------------------
    async checkAnimal() {
      try {
        const response = await instance.get(`animal/animal/${this.code}`);
        const animalData = response.data;
        this.registerId = animalData.idAnimal;

        this.animalExists = !!this.registerId;
      } catch (error) {
        this.animalExists = false;
      }
    },

    async handleSubmit() {
      try {
        const response = await instance.post(
          'animal/addContageus',
          {
            animalId: this.registerId,
            desisseName: this.desisseNameAdd,
            startTime: `${this.startTimeAdd}T00:00:00.00`,
            description: this.descriptionAdd,
            contageus: true,
          },
          { headers: { Authorization: `Bearer ${this.token}` } }
        );

        if (response.status === 200) {
          await Swal.fire({ title: 'Item added!', icon: 'success' });
          window.location.reload();
        }
      } catch (error) {
        console.error('Error adding animal:', error);
        await Swal.fire({
          title: 'Ooops!',
          text: 'There was an error!',
          icon: 'error',
        });
      }
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
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #1f1f1f;
}
</style>
