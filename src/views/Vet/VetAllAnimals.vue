<template>
  <div class="container mx-auto px-4 mt-6">
    <Loading v-if="loadingError" />

    <div class="flex">
      <VetNavigation class="w-1/6" />

      <div class="w-5/6 ml-auto">
        <!-- FILTERI -->
        <div class="bg-[#0e0e0e] rounded-xl p-6 shadow-lg border border-white/10">
          <form @submit.prevent>
            <!-- Dropdowns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label for="family" class="block text-gray-300 font-bold mb-2">Family:</label>
                <select
                  v-model="filters.family"
                  id="family"
                  class="w-full py-2.5 px-3 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="">All</option>
                  <option v-for="family in families" :key="family" :value="family">{{ family }}</option>
                </select>
              </div>

              <div>
                <label for="species" class="block text-gray-300 font-bold mb-2">Species:</label>
                <select
                  v-model="filters.species"
                  id="species"
                  class="w-full py-2.5 px-3 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="">All</option>
                  <option v-for="species in speciesList" :key="species" :value="species">{{ species }}</option>
                </select>
              </div>

              <div>
                <label for="subspecies" class="block text-gray-300 font-bold mb-2">Subspecies:</label>
                <select
                  v-model="filters.subspecies"
                  id="subspecies"
                  class="w-full py-2.5 px-3 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="">All</option>
                  <option v-for="subspecies in subspeciesList" :key="subspecies" :value="subspecies">{{ subspecies }}</option>
                </select>
              </div>

              <div>
                <label for="gender" class="block text-gray-300 font-bold mb-2">Gender:</label>
                <select
                  v-model="filters.gender"
                  id="gender"
                  class="w-full py-2.5 px-3 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="">All</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>

            <!-- Toggles -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mt-6">
              <label
                v-for="(label, key) in toggleLabels"
                :key="key"
                class="inline-flex items-center cursor-pointer select-none"
              >
                <input type="checkbox" v-model="filters[key]" class="sr-only peer" />
                <div
                  class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/30 rounded-full
                         after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full
                         after:bg-emerald-400 after:border after:border-gray-400 after:transition-all
                         peer-checked:bg-green-600 peer-checked:after:translate-x-full"
                ></div>
                <span class="ms-3 text-sm font-medium text-gray-300">{{ label }}</span>
              </label>
            </div>

            <!-- Search -->
            <div class="mt-6">
              <label for="search" class="block text-gray-300 font-bold mb-2">Search (any field):</label>
              <input
                id="search"
                type="text"
                v-model="filters.search"
                placeholder="Type to filter by name, family, species, subspecies, age, gender, etc."
                class="w-full py-3 px-4 text-base rounded-xl bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>
          </form>
        </div>

        <!-- TABLICA -->
        <div class="mt-5 overflow-x-auto custom-scrollbar">
          <table class="w-full border-separate border-spacing-y-4 bg-[#0e0e0e] rounded-xl p-4 md:p-6">
            <thead>
              <tr class="text-left text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                <th class="px-6 py-3">Name</th>
                <th class="px-6 py-3">Family</th>
                <th class="px-6 py-3">Species</th>
                <th class="px-6 py-3">Subspecies</th>
                <th class="px-6 py-3">Age</th>
                <th class="px-6 py-3">Gender</th>
                <th class="px-6 py-3">Neutered</th>
                <th class="px-6 py-3">Adopted</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in paginatedItems"
                :key="item.idAnimal"
                @click="navigateToDetails(item.idAnimal)"
                class="bg-[#1a1a1a] hover:bg-[#242424] border border-gray-700/30 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <td class="px-6 py-6 text-white font-semibold">{{ item.name }}</td>
                <td class="px-6 py-6 text-gray-300">{{ item.family }}</td>
                <td class="px-6 py-6 text-gray-300">{{ item.species }}</td>
                <td class="px-6 py-6 text-gray-300">{{ item.subspecies }}</td>
                <td class="px-6 py-6 text-gray-300">{{ item.age }}<strong> y</strong></td>
                <td class="px-6 py-6 text-gray-300">{{ item.gender }}</td>
                <td class="px-6 py-6 text-gray-300">{{ item.neutered ? 'Yes' : 'No' }}</td>
                <td class="px-6 py-6 text-gray-300">{{ item.adopted ? 'Yes' : 'No' }}</td>
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
      </div>
    </div>
  </div>
</template><script>
import instance from '@/axiosBase';
import VetNavigation from '../Vet/VetNavigation.vue';
import Loading from '../Loading.vue';

export default {
  components: {
    VetNavigation,
    Loading,
  },
  data() {
    return {
      loadingError: true,
      items: [],
      families: [],
      speciesList: [],
      subspeciesList: [],
      filters: {
        family: '',
        species: '',
        subspecies: '',
        gender: '',
        neutered: false,
        vaccinated: false,
        microchipped: false,
        trained: false,
        socialized: false,
        adopted: false,
        search: '',
      },
      toggleLabels: {
        neutered: 'Neutered',
        vaccinated: 'Vaccinated',
        microchipped: 'Microchipped',
        trained: 'Trained',
        socialized: 'Socialized',
        adopted: 'Adopted',
      },
      // 🔹 PAGINACIJA
      currentPage: 1,
      itemsPerPage: 20,
    };
  },

  computed: {
    filteredItems() {
      const search = this.filters.search.toLowerCase();
      return this.items.filter((item) => {
        const matchesSearch =
          !search ||
          Object.values(item).join(' ').toLowerCase().includes(search);

        return (
          matchesSearch &&
          (!this.filters.family || item.family === this.filters.family) &&
          (!this.filters.species || item.species === this.filters.species) &&
          (!this.filters.subspecies || item.subspecies === this.filters.subspecies) &&
          (!this.filters.gender || item.gender === this.filters.gender) &&
          (!this.filters.neutered || item.neutered) &&
          (!this.filters.vaccinated || item.vaccinated) &&
          (!this.filters.microchipped || item.microchipped) &&
          (!this.filters.trained || item.trained) &&
          (!this.filters.socialized || item.socialized) &&
          (!this.filters.adopted || item.adopted)
        );
      });
    },

    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredItems.slice(start, start + this.itemsPerPage);
    },

    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
  },

  watch: {
    filteredItems() {
      // Reset na prvu stranicu kad se filter promijeni
      this.currentPage = 1;
    },
  },

  mounted() {
    this.fetchAnimals();
  },

  methods: {
    navigateToDetails(idAnimal) {
      this.$router.push(`/vetSingleAnimal/${idAnimal}`);
    },

    fetchAnimals() {
      this.loadingError = true;
      instance
        .get('animal/animal_pc')
        .then((response) => {
          this.items = response.data;
          if (this.items) {
            this.populateFilters();
            setTimeout(() => (this.loadingError = false), 1000);
          }
        })
        .catch((error) => {
          console.error('❌ Error fetching animals:', error);
          this.loadingError = true;
        });
    },

    populateFilters() {
      this.families = [...new Set(this.items.map((item) => item.family))];
      this.speciesList = [...new Set(this.items.map((item) => item.species))];
      this.subspeciesList = [...new Set(this.items.map((item) => item.subspecies))];
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
