<template>
  <div class="flex  min-h-screen text-stone-200">
    <!-- Sidebar -->
    <div class="w-1/6 p-4 rounded-l-lg bg  shadow-lg">
      <WorkerNavigation />
    </div>

    <!-- Main content -->
    <div class="w-5/6 mt-5 p-6 rounded-lg mr-8 bg-[#0e0e0e] shadow-lg border border-white/10 space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-emerald-400">Labs</h1>

        <button
          type="button"
          @click="addLab"
          class="flex items-center gap-2 text-stone-200 bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-400 font-medium rounded-full px-4 py-2 transition"
        >
          <svg
            class="w-6 h-6 fill-white"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24
              s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64
              c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64
              c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
            />
          </svg>
          <span class="text-base font-semibold">Add Lab</span>
        </button>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto rounded-xl border border-gray-800 shadow-2xl">
        <table class="min-w-full border-collapse">
          <thead class="bg-[#1b1b1b]">
            <tr>
              <th class="px-5 py-3 text-center text-sm font-bold text-emerald-400 uppercase border-b border-gray-700 w-12"></th>
              <th class="px-5 py-3 text-center text-sm font-bold text-emerald-400 uppercase border-b border-gray-700">Animal Code</th>
              <th class="px-5 py-3 text-center text-sm font-bold text-emerald-400 uppercase border-b border-gray-700">Date</th>
              <th class="px-5 py-3 text-center text-sm font-bold text-emerald-400 uppercase border-b border-gray-700 w-24"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in paginatedItems"
              :key="item.id"
              class="border-b border-gray-700 hover:bg-gray-800 transition cursor-pointer"
            >
              <td class="px-5 py-4 text-center">
                <svg
                  @click="openSinglModal(item)"
                  class="w-5 h-5 text-emerald-400 hover:text-emerald-300 transition"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18
                    0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </td>
              <td class="px-5 py-4 text-center font-semibold text-gray-200">
                {{ item.animalId }}
              </td>
              <td class="px-5 py-4 text-center font-semibold text-gray-300">
                {{ formatDate(item.dateTime) }}
              </td>
              <td class="px-5 py-4 text-center">
                <button
                  @click="openUpdateModal(item)"
                  type="button"
                  class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full text-sm font-medium transition"
                >
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M17.44 3a1 1 0 0 1 .707.293l2.56 2.56a1
                      1 0 0 1 0 1.414L18.194 9.78 14.22
                      5.806l2.513-2.513A1 1 0 0 1 17.44 3Zm-4.634
                      4.22-9.513 9.513a1 1 0 0 0 0
                      1.414l2.56 2.56a1 1 0 0 0 1.414
                      0l9.513-9.513-3.974-3.974Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center gap-2 mt-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <span class="text-sm font-medium text-gray-400">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>

  <!-- Single item modal -->
  <div
    v-if="single"
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center overflow-y-auto p-4 z-50"
  >
    <div class="relative w-full max-w-4xl mx-auto bg-[#111] border border-gray-800 rounded-2xl shadow-2xl">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <h3 class="text-xl font-semibold text-emerald-400">Animal Details</h3>
        <button
          @click="single = false"
          class="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-2 transition"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 14 14"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div
            v-for="(value, key) in {
              Name: itemAnimal.name,
              Family: itemAnimal.family,
              Species: itemAnimal.species,
              Subspecies: itemAnimal.subspecies,
              Gender: itemAnimal.gender,
              Age: itemAnimal.age + ' years',
              Weight: itemAnimal.weight + ' kg',
              Height: itemAnimal.height + ' cm',
              Length: itemAnimal.length + ' cm'
            }"
            :key="key"
            class="bg-[#1a1a1a] border border-gray-700 rounded-lg p-3"
          >
            <span class="block text-emerald-400 font-medium mb-1">{{ key }}</span>
            <span class="block text-gray-200">{{ value }}</span>
          </div>
        </div>

        <!-- Toggles -->
        <div class="border-t border-gray-800 pt-4">
          <h4 class="text-lg text-emerald-400 font-semibold mb-2">Status</h4>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <label
              v-for="(label, field) in {
                neutered: 'Neutered',
                vaccinated: 'Vaccinated',
                trained: 'Trained',
                socialized: 'Socialized',
                microchipped: 'Microchipped'
              }"
              :key="field"
              class="inline-flex items-center cursor-pointer"
            >
              <input type="checkbox" v-model="itemAnimal[field]" class="sr-only peer" disabled />
              <div
                class="relative w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-emerald-700 transition"
              >
                <div
                  class="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5"
                ></div>
              </div>
              <span class="ml-3 text-sm font-medium text-gray-300">{{ label }}</span>
            </label>
          </div>
        </div>

        <!-- Biometrics Table -->
        <div class="border-t border-gray-800 pt-6">
          <h4 class="text-lg text-emerald-400 font-semibold mb-3">Biometrics</h4>
          <div class="overflow-x-auto border border-gray-800 rounded-lg">
            <table class="min-w-full text-sm">
              <thead class="bg-[#1b1b1b]">
                <tr>
                  <th class="px-5 py-3 text-center text-emerald-400 font-semibold">Name</th>
                  <th class="px-5 py-3 text-center text-emerald-400 font-semibold">Value</th>
                  <th class="px-5 py-3 text-center text-emerald-400 font-semibold">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="itemp in itemsParm"
                  :key="itemp.id"
                  class="border-t border-gray-700 hover:bg-gray-800 transition"
                >
                  <td class="px-5 py-3 text-center">{{ itemp.parameterName }}</td>
                  <td class="px-5 py-3 text-center">
                    {{ itemp.parameterValue + itemp.measurementUnits }}
                  </td>
                  <td class="px-5 py-3 text-center text-gray-400">{{ itemp.remarks }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end px-6 py-4 border-t border-gray-800">
        <button
          @click="single = false"
          class="px-5 py-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import WorkerNavigation from '../Vet/VetNavigation.vue';
import instance from '@/axiosBase';
import Swal from 'sweetalert2';

export default {
  components: {
    WorkerNavigation,
  },

  data() {
    return {
      registerId: "",
      update: false,
      single: false,
      singleDate: "",
      animalID: "",
      labid: "",
      isEditing: true,
      itemAnimal: [],
      items: [],
      itemsParm: [],

      // 🔹 PAGINATION
      currentPage: 1,
      itemsPerPage: 6,
    };
  },

  mounted() {
    this.fetchData();
  },

  computed: {
    // Ukupan broj stranica
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },

    // Prikazani elementi po stranici
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
  },

  methods: {
    addLab() {
      this.$router.push('/addLab');
    },

    async openSinglModal(item) {
      try {
        this.single = true;
        this.singleDate = item.dateTime;
        this.animalID = item.animalId;
        this.labid = item.id;

        console.log("Animal ID:", this.animalID);

        const responseparm = await instance.get(`animal/parameter_db/${this.labid}`);
        this.itemsParm = responseparm.data;

        const animalResponse = await instance.get(`animal/animal/${this.animalID}`);
        this.itemAnimal = animalResponse.data;
      } catch (error) {
        console.error('Error opening modal:', error);
        Swal.fire('Error', 'Failed to load animal details', 'error');
      }
    },

    async fetchData() {
      try {
        const response = await instance.get('animal/labs_db');
        this.items = response.data;
      } catch (error) {
        console.error('There was an error fetching data:', error);
        Swal.fire('Error', 'Failed to fetch lab data', 'error');
      }
    },

    formatDate(date) {
      if (!date) return 'N/A';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },

    // 🔹 PAGINATION METHODS
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
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
.sticky-content {
  float: right;
  margin-left: 20px;
}
</style>
