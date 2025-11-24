<template>
  <div class="container mx-auto px-4 mt-6">
    <Loading v-if="loadingError" />

    <div class="flex">
      <WorkerNavigation class="w-1/6" />

      <div class="w-5/6 ml-auto">
        <!-- FILTERI -->
        <div class="bg-[#0e0e0e] rounded-xl p-6 shadow-lg border border-white/10">
          <form @submit.prevent>
            <!-- Dropdowns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label class="block text-gray-300 font-bold mb-2">Family:</label>
                <select
                  v-model="filters.family"
                  class="w-full py-2.5 px-3 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="">All</option>
                  <option v-for="family in families" :key="family" :value="family">{{ family }}</option>
                </select>
              </div>

              <div>
                <label class="block text-gray-300 font-bold mb-2">Species:</label>
                <select
                  v-model="filters.species"
                  class="w-full py-2.5 px-3 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="">All</option>
                  <option v-for="species in speciesList" :key="species" :value="species">{{ species }}</option>
                </select>
              </div>

              <div>
                <label class="block text-gray-300 font-bold mb-2">Subspecies:</label>
                <select
                  v-model="filters.subspecies"
                  class="w-full py-2.5 px-3 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="">All</option>
                  <option v-for="sub in subspeciesList" :key="sub" :value="sub">{{ sub }}</option>
                </select>
              </div>

              <div>
                <label class="block text-gray-300 font-bold mb-2">Gender:</label>
                <select
                  v-model="filters.gender"
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
              <label class="block text-gray-300 font-bold mb-2">Search (any field):</label>
              <input
                type="text"
                v-model="filters.search"
                placeholder="Type to filter by name, family, species, subspecies, age, gender..."
                class="w-full py-3 px-4 text-base rounded-xl bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>
          </form>
        </div>

        <!-- TABLICA -->
        <div class="mt-5 overflow-x-auto custom-scrollbar">
          <table class="w-full border-separate border-spacing-y-4 bg-[#0e0e0e] rounded-xl">
            <thead class="bg-gray-900 text-emerald-300 uppercase text-xs">
              <tr class="text-left text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                <th class="px-6 py-3">Code</th>
                <th class="px-6 py-3">Name</th>
                <th class="px-6 py-3">Family</th>
                <th class="px-6 py-3">Species</th>
                <th class="px-6 py-3">Subspecies</th>
                <th class="px-6 py-3">Age</th>
                <th class="px-6 py-3">Gender</th>
                <th class="px-6 py-3">Adopted</th>
                <th class="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in paginatedItems"
                :key="item.idAnimal"
                class="bg-[#1a1a1a] hover:bg-[#242424] border border-gray-700/30 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                @click="navigateToDetails(item.idAnimal)"
              >
              <td class="px-6 py-6 text-white font-semibold">{{ item.idAnimal }}</td>
                <td class="px-6 py-6 text-white font-semibold">{{ item.name }}</td>
                <td class="px-6 py-6 text-gray-300">{{ item.family }}</td>
                <td class="px-6 py-6 text-gray-300">{{ item.species }}</td>
                <td class="px-6 py-6 text-gray-300">{{ item.subspecies }}</td>
                <td class="px-6 py-6 text-gray-300">{{ item.age }}<strong> y</strong></td>
                <td class="px-6 py-6 text-gray-300">{{ item.gender }}</td>
                <td class="px-6 py-6 text-gray-300">{{ item.adopted ? 'Yes' : 'No' }}</td>
                <td class="px-6 py-6 text-center">
                  <button
                    @click.stop="done(item.idAnimal)"
                    class="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 py-1.5 font-semibold text-sm shadow-md hover:shadow-emerald-500/40 transition"
                  >
                    ✅ Socialized
                  </button>
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
      </div>
    </div>
  </div>
</template>

<script>
import WorkerNavigation from './WorkerNavigation.vue'
import instance from '@/axiosBase'
import Loading from '../Loading.vue'
import Swal from 'sweetalert2'

export default {
  components: { WorkerNavigation, Loading },
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
      currentPage: 1,
      itemsPerPage: 20,
    }
  },
  computed: {
    filteredItems() {
      const search = this.filters.search.toLowerCase()
      return this.items.filter((item) => {
        const matchesSearch = !search || Object.values(item).join(' ').toLowerCase().includes(search)
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
        )
      })
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredItems.slice(start, start + this.itemsPerPage)
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage)
    },
  },
  mounted() {
    this.fetchAnimals()
  },
  methods: {
    navigateToDetails(idAnimal) {
      this.$router.push(`/workerSingleAnimal/${idAnimal}`)
    },
    async fetchAnimals() {
      this.loadingError = true
      try {
        const response = await instance.get('animal/animal_social')
        this.items = response.data
        if (this.items) {
          this.populateFilters()
          setTimeout(() => (this.loadingError = false), 800)
        }
      } catch (error) {
        console.error('Error fetching animals:', error)
        this.loadingError = true
      }
    },
    async done(id) {
      try {
        const response = await instance.put(`animal/updateAnimalRecord/`, {
          animalId: parseInt(id),
          recordId: 5,
        })
        if (response.status === 200) {
          await Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Animal has been successfully socialized.',
            timer: 2000,
            showConfirmButton: false,
          })
          this.fetchAnimals()
        }
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Something went wrong. Please try again later.',
        })
      }
    },
    populateFilters() {
      this.families = [...new Set(this.items.map((item) => item.family))]
      this.speciesList = [...new Set(this.items.map((item) => item.species))]
      this.subspeciesList = [...new Set(this.items.map((item) => item.subspecies))]
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    goToPage(page) {
      this.currentPage = page
    },
  },
}
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
