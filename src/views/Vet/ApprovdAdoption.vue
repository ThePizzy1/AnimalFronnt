<template>
  <div class="flex  min-h-screen text-stone-200">
    <!-- Sidebar -->
    <div class="w-1/6   shadow-lg p-4">
      <VetNavigation />
    </div>

    <!-- Main content -->
       <div class="w-5/6 mt-5 p-6 rounded-lg mr-8 bg-[#0e0e0e] shadow-lg border border-white/10 space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-emerald-400">Animal List</h1>
      </div>

      <!-- Filters -->
      <div class="bg-[#121212] p-6 rounded-xl border border-gray-800 shadow-lg">
        <form @submit.prevent="searchAnimals" class="grid grid-cols-4 gap-6">
          <!-- FAMILY -->
          <div>
            <label for="family" class="block text-sm font-semibold mb-2">Family</label>
            <select
              v-model="filters.family"
              id="family"
              class="w-full py-2 px-3 bg-black border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All</option>
              <option v-for="family in families" :key="family" :value="family">{{ family }}</option>
            </select>
          </div>

          <!-- SPECIES -->
          <div>
            <label for="species" class="block text-sm font-semibold mb-2">Species</label>
            <select
              v-model="filters.species"
              id="species"
              class="w-full py-2 px-3 bg-black border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All</option>
              <option v-for="species in speciesList" :key="species" :value="species">{{ species }}</option>
            </select>
          </div>

          <!-- SUBSPECIES -->
          <div>
            <label for="subspecies" class="block text-sm font-semibold mb-2">Subspecies</label>
            <select
              v-model="filters.subspecies"
              id="subspecies"
              class="w-full py-2 px-3 bg-black border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All</option>
              <option v-for="sub in subspeciesList" :key="sub" :value="sub">{{ sub }}</option>
            </select>
          </div>

          <!-- GENDER -->
          <div>
            <label for="gender" class="block text-sm font-semibold mb-2">Gender</label>
            <select
              v-model="filters.gender"
              id="gender"
              class="w-full py-2 px-3 bg-black border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>

          <!-- CHECKBOXI -->
          <div
            v-for="(label, field) in checkboxLabels"
            :key="field"
            class="flex items-center space-x-3 mt-2"
          >
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="filters[field]" class="sr-only peer" />
              <div
                class="relative w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-emerald-600 rounded-full peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
              ></div>
              <span class="ml-3 text-sm font-medium text-gray-300">{{ label }}</span>
            </label>
          </div>
        </form>
      </div>

      <!-- Search -->
      <div class="relative w-full">
        <input
          v-model="generalSearchQuery"
          type="text"
          placeholder="Search by name, family, or species..."
          class="w-full px-5 py-2 pr-12 text-gray-200 placeholder-gray-400 bg-transparent border-2 border-gray-700 rounded-full shadow-md focus:outline-none focus:border-emerald-400 transition"
        />
        <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg
            class="w-6 h-6 text-emerald-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto border border-gray-800 rounded-xl shadow-2xl">
        <table class="min-w-full border-collapse">
          <thead class="bg-[#1a1a1a]">
            <tr>
              <th class="px-5 py-3 text-center text-sm font-bold text-emerald-400 uppercase"></th>
              <th class="px-5 py-3 text-left text-sm font-bold text-emerald-400 uppercase">Name</th>
              <th class="px-5 py-3 text-left text-sm font-bold text-emerald-400 uppercase">Family</th>
              <th class="px-5 py-3 text-left text-sm font-bold text-emerald-400 uppercase">Species</th>
              <th class="px-5 py-3 text-left text-sm font-bold text-emerald-400 uppercase">Subspecies</th>
              <th class="px-5 py-3 text-center text-sm font-bold text-emerald-400 uppercase">Age</th>
              <th class="px-5 py-3 text-center text-sm font-bold text-emerald-400 uppercase">Gender</th>
              <th class="px-5 py-3 text-center text-sm font-bold text-emerald-400 uppercase">Adoption</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in paginatedItems"
              :key="item.idAnimal"
              class="border-b border-gray-700 hover:bg-gray-800 transition"
            >
              <td class="px-5 py-4 text-center">
                <svg
                  @click="openSinglModal(item)"
                  class="w-5 h-5 text-emerald-400 hover:text-emerald-300 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21
                    12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </td>

              <td class="px-5 py-4 text-sm font-semibold">{{ item.name }}</td>
              <td class="px-5 py-4 text-sm font-semibold">{{ item.family }}</td>
              <td class="px-5 py-4 text-sm font-semibold">{{ item.species }}</td>
              <td class="px-5 py-4 text-sm font-semibold">{{ item.subspecies }}</td>
              <td class="px-5 py-4 text-center text-sm font-semibold">{{ item.age }} y</td>
              <td class="px-5 py-4 text-center text-sm font-semibold">{{ item.gender }}</td>
              <td class="px-5 py-4 text-center">
                <button
                  @click="approveAdoption(item.idAnimal)"
                  :disabled="userRole !== 'HeadVet'"
                  class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-full text-sm font-medium disabled:opacity-50 transition"
                >
                  Approve
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-3 mt-6">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-sm disabled:opacity-40 transition"
        >
          Prev
        </button>

        <span class="text-sm text-gray-400">Page {{ currentPage }} of {{ totalPages }}</span>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-sm disabled:opacity-40 transition"
        >
          Next
        </button>
      </div>
    </div>
  </div>
<!-- Single item modal -->
<div
  v-if="single"
  class="fixed inset-0 bg-[#0e0e0e]bg-opacity-60 backdrop-blur-sm flex justify-center items-center overflow-y-auto p-6 z-50"
>
  <div
    class="relative bg-[#0e0e0e] rounded-xl shadow-lg border border-gray-700 w-full max-w-lg mx-auto animate-fade-in"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between px-5 py-3 border-b border-gray-700"
    >
      <h3 class="text-lg font-semibold text-emerald-400">Animal Details</h3>
      <button
        @click="single = false"
        class="text-gray-400 hover:text-white transition"
      >
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Body -->
    <div class="p-5">
      <form class="grid grid-cols-2 gap-4">
        <!-- Name -->
        <div class="col-span-2">
          <label class="block mb-1 text-sm font-medium text-gray-300">Animal Name</label>
          <input
            type="text"
            readonly
            v-model="itemsSingle.name"
            class="w-full p-2.5 rounded-md bg-gray-50 text-black text-sm border border-emerald-400 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <!-- Family -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Family</label>
          <input
            type="text"
            readonly
            v-model="itemsSingle.family"
            class="w-full p-2.5 rounded-md bg-gray-50 text-black text-sm border border-emerald-400"
          />
        </div>

        <!-- Species -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Species</label>
          <input
            type="text"
            readonly
            v-model="itemsSingle.species"
            class="w-full p-2.5 rounded-md bg-gray-50 text-black text-sm border border-emerald-400"
          />
        </div>

        <!-- Subspecies -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Subspecies</label>
          <input
            type="text"
            readonly
            v-model="itemsSingle.subspecies"
            class="w-full p-2.5 rounded-md bg-gray-50 text-black text-sm border border-emerald-400"
          />
        </div>

        <!-- Age -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Age</label>
          <input
            type="text"
            readonly
            v-model="itemsSingle.age"
            class="w-full p-2.5 rounded-md bg-gray-50 text-black text-sm border border-emerald-400"
          />
        </div>

        <!-- Gender -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Gender</label>
          <input
            type="text"
            readonly
            v-model="itemsSingle.gender"
            class="w-full p-2.5 rounded-md bg-gray-50 text-black text-sm border border-emerald-400"
          />
        </div>

        <!-- Weight -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Weight</label>
          <input
            type="text"
            readonly
            v-model="itemsSingle.weight"
            class="w-full p-2.5 rounded-md bg-gray-50 text-black text-sm border border-emerald-400"
          />
        </div>

        <!-- Height -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Height</label>
          <input
            type="text"
            readonly
            v-model="itemsSingle.height"
            class="w-full p-2.5 rounded-md bg-gray-50 text-black text-sm border border-emerald-400"
          />
        </div>

        <!-- Length -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Length</label>
          <input
            type="text"
            readonly
            v-model="itemsSingle.length"
            class="w-full p-2.5 rounded-md bg-gray-50 text-black text-sm border border-emerald-400"
          />
        </div>

        <!-- Attributes -->
        <div class="col-span-2 mt-4">
          <div class="grid grid-cols-2 gap-3">
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="itemsSingle.neutered" disabled class="sr-only peer" />
              <div class="relative w-11 h-6 bg-gray-500 peer-checked:bg-emerald-600 rounded-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
              <span class="ml-3 text-sm text-gray-300">Neutered</span>
            </label>

            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="itemsSingle.vaccinated" disabled class="sr-only peer" />
              <div class="relative w-11 h-6 bg-gray-500 peer-checked:bg-emerald-600 rounded-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
              <span class="ml-3 text-sm text-gray-300">Vaccinated</span>
            </label>

            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="itemsSingle.microchipped" disabled class="sr-only peer" />
              <div class="relative w-11 h-6 bg-gray-500 peer-checked:bg-emerald-600 rounded-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
              <span class="ml-3 text-sm text-gray-300">Microchipped</span>
            </label>

            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="itemsSingle.trained" disabled class="sr-only peer" />
              <div class="relative w-11 h-6 bg-gray-500 peer-checked:bg-emerald-600 rounded-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
              <span class="ml-3 text-sm text-gray-300">Trained</span>
            </label>

            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="itemsSingle.socialized" disabled class="sr-only peer" />
              <div class="relative w-11 h-6 bg-gray-500 peer-checked:bg-emerald-600 rounded-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
              <span class="ml-3 text-sm text-gray-300">Socialized</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

</template><script>
import instance from '@/axiosBase';
import VetNavigation from '../Vet/VetNavigation.vue';
import Loading from '../Loading.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    VetNavigation,
    Loading,
  },

  data() {
    return {
      // PAGINACIJA
      currentPage: 1,
      itemsPerPage: 8,

      // KORISNIK
      userRole: localStorage.getItem('userRole'),

      // STANJE APLIKACIJE
      generalSearchQuery: '',
      loadingError: false,
      items: [],
      families: [],
      speciesList: [],
      subspeciesList: [],
      itemsSingle: {},
      single: false,

      // FILTERI
      filters: {
        family: '',
        species: '',
        subspecies: '',
        gender: '',
        adopted: false,
      },
    };
  },

  computed: {
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredItems.length / this.itemsPerPage));
    },

    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredItems.slice(start, start + this.itemsPerPage);
    },

    filteredItems() {
      const query = this.generalSearchQuery?.toLowerCase().trim() || '';

      return this.items.filter((item) => {
        // ✅ Pretraga
        const matchesGeneralQuery =
          item.name?.toLowerCase().includes(query) ||
          item.family?.toLowerCase().includes(query) ||
          item.species?.toLowerCase().includes(query) ||
          item.subspecies?.toLowerCase().includes(query) ||
          item.gender?.toLowerCase().includes(query) ||
          item.age?.toString().includes(query) ||
          item.weight?.toString().includes(query) ||
          item.height?.toString().includes(query);

        // ✅ Aktivni filteri (samo ako su odabrani)
        const matchesFilters =
          (!this.filters.family || item.family === this.filters.family) &&
          (!this.filters.species || item.species === this.filters.species) &&
          (!this.filters.subspecies || item.subspecies === this.filters.subspecies) &&
          (!this.filters.gender || item.gender === this.filters.gender);

        return matchesGeneralQuery && matchesFilters;
      });
    },
  },

  mounted() {
    // 🔒 Postavljanje tokena
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 🔄 Dohvati životinje
    this.loadingError = true;
    instance
      .get('animal/animalAVet_db')
      .then((response) => {
        console.log('Fetched items:', response.data);

        this.items = response.data || [];
        if (this.items.length > 0) {
          setTimeout(() => {
            this.loadingError = false;
          }, 1000);
        }

        this.populateFilters();
      })
      .catch((error) => {
        this.loadingError = true;
        console.error('There was an error fetching animals:', error);
      });
  },

  methods: {
    // 📜 PAGINACIJA
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    // ✅ Odobravanje udomljavanja
    async approveAdoption(id) {
      try {
        const response = await instance.put(
          `animal/updateAnimalRecord/`,
          {
            animalId: parseInt(id),
            recordId: 6,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        console.log('Response:', response.data);

        if (response.status === 200) {
          await Swal.fire({
            title: 'Animal approved!',
            icon: 'success',
            confirmButtonColor: '#10b981',
          });
          window.location.reload();
        } else {
          await Swal.fire({
            title: 'Oops!',
            text: 'Something went wrong while approving.',
            icon: 'error',
          });
        }
      } catch (error) {
        console.error('Error approving adoption:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'Server error, please try again later.',
          icon: 'error',
        });
      }
    },

    // 🔍 Otvaranje modala s detaljima
    async openSinglModal(item) {
      this.single = true;
      this.itemsSingle = item;
    },

    // 🔗 Navigacija
    navigateToDetails(idAnimal) {
      this.$router.push(`/vetSingleAnimal/${idAnimal}`);
    },

    // 📊 Popunjavanje filter opcija
    populateFilters() {
      this.families = [...new Set(this.items.map((item) => item.family))];
      this.speciesList = [...new Set(this.items.map((item) => item.species))];
      this.subspeciesList = [...new Set(this.items.map((item) => item.subspecies))];
    },

    // 🔎 Traženje životinja (poseban API poziv)
    searchAnimals() {
      this.loadingError = true;
      instance
        .get('animal/animal_pc', { params: this.filters })
        .then((response) => {
          console.log('Search response:', response.data);
          this.items = response.data || [];

          if (this.items.length > 0) {
            setTimeout(() => {
              this.loadingError = false;
            }, 1000);
          }
        })
        .catch((error) => {
          this.loadingError = true;
          console.error('There was an error searching animals:', error);
        });
    },
  },
};
</script>

  <style scoped>




  .container {
    color: white;
    font-family: 'Poppins', sans-serif;
    margin-top: 15px;
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