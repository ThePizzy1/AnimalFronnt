<template>
  <div class="container mx-auto px-4 mt-6">
    <Loading v-if="loadingError" />

    <div class="flex">
      <!-- 🧭 Navigation -->
      <WorkerNavigation class="w-1/6" />

      <!-- 📄 Main Content -->
      <div class="w-5/6 ml-auto text-gray-200">
        <!-- 🔲 Naslov + Filter blok -->
        <div class="bg-[#0e0e0e] rounded-xl p-6 shadow-lg border border-white/10 mb-6">
          
          <!-- NASLOV + (Opcionalni Add Button) -->
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-white">Contact</h1>

            <!-- Ako treba Add -->
            <button
              v-if="userRole === 'Menager'"
              @click="add = true"
              type="button"
              class="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-md"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 
                     344V280H168c-13.3 0-24-10.7-24-24s10.7-24 
                     24-24h64V168c0-13.3 10.7-24 
                     24-24s24 10.7 24 24v64h64c13.3 
                     0 24 10.7 24 24s-10.7 24-24 
                     24H280v64c0 13.3-10.7 24-24 
                     24s-24-10.7-24-24z"
                />
              </svg>
              Add Fund
            </button>
          </div>

          <!-- FILTERI -->
          <form @submit.prevent>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              <!-- Name -->
              <div>
                <label for="name" class="block text-gray-300 font-medium mb-2">Name</label>
                <select
                  v-model="filters.name"
                  id="name"
                  class="w-full py-2.5 px-3 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="">All</option>
                  <option v-for="name in nameList" :key="name" :value="name">{{ name }}</option>
                </select>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-gray-300 font-medium mb-2">Email</label>
                <select
                  v-model="filters.email"
                  id="email"
                  class="w-full py-2.5 px-3 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="">All</option>
                  <option v-for="n in emailList" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>

              <!-- Read -->
              <div class="flex flex-col justify-end">
                <label class="block text-gray-300 font-medium mb-2">Read</label>
                <label class="inline-flex items-center cursor-pointer select-none">
                  <input type="checkbox" v-model="filters.read" class="sr-only peer" />
                  <div
                    class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/30 rounded-full
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full
                          after:bg-emerald-400 after:border after:border-gray-400 after:transition-all
                          peer-checked:bg-green-600 peer-checked:after:translate-x-full"
                  ></div>
                </label>
              </div>
            </div>

            <!-- SEARCH -->
            <div class="mt-2">
              <label class="block text-gray-300 font-medium mb-2">Search</label>
              <div class="relative w-full">
                <input
                  v-model="generalSearchQuery"
                  type="text"
                  placeholder="Search by name, email, or message..."
                  class="w-full py-3 px-4 text-base rounded-xl bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
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
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 
                      0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- 📊 Ovdje ide tablica ili kartice -->
        <div>
          <!-- TODO: funds table or list -->
        </div>
 

        <!-- TABLICA -->
        <div class="mt-5 overflow-x-auto custom-scrollbar">
          <table class="w-full border-separate border-spacing-y-4 bg-[#0e0e0e] rounded-xl">
            <thead class="bg-gray-900 text-emerald-300 uppercase text-xs">
              <tr class="text-left text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                <th class="px-6 py-3"></th>
                <th class="px-6 py-3">Name</th>
                <th class="px-6 py-3">Email</th>
                <th class="px-6 py-3">Message</th>
                <th class="px-6 py-3">Read</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in paginatedItems"
                :key="item.id"
                :class="{
                  'text-red-100 opacity-100': item.read == false,
                  'opacity-50': item.read == true,
                }"
                class="bg-[#1a1a1a] hover:bg-[#242424] border border-gray-700/30 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <td class="px-6 py-6 text-left">
                  <svg
                    @click="openSinglModal(item)"
                    class="w-6 h-6 text-stone-200 hover:text-emerald-400 transition"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </td>
                <td class="px-6 py-6 text-white font-semibold">{{ item.name }}</td>
                <td class="px-6 py-6 text-gray-300">{{ item.email }}</td>
                <td class="px-6 py-6 text-gray-300">{{ item.description }}</td>
                <td class="px-6 py-6 text-center">
                  <button
                    @click="increment(item.id)"
                    type="button"
                    class="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 py-1.5 font-semibold text-sm shadow-md hover:shadow-emerald-500/40 transition"
                  >
                    ✅ Yes
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
                : 'bg-[#1a1a1a] border-gray-700 text-gray-300 hover:bg-[#242424]',
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

    <!-- SINGLE MODAL -->
    <div
      v-if="single"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-x-auto custom-scrollbar z-50"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-[#0e0e0e] rounded-lg shadow-lg border border-gray-700">
          <div class="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 class="text-lg font-semibold text-white">Animal Details</h3>
            <button
              @click="single = false"
              type="button"
              class="text-gray-400 hover:text-white hover:bg-emerald-600 rounded-lg text-base w-8 h-8 flex justify-center items-center transition"
            >
              <svg
                class="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <form class="p-4">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label class="block mb-2 text-base font-medium text-gray-300">User</label>
                <span
                  class="block w-full p-2.5 rounded-lg border border-emerald-400 bg-[#1a1a1a] text-white"
                >
                  {{ this.sigleUser.firstName }} {{ this.sigleUser.lastName }}
                </span>
              </div>
              <div class="col-span-2">
                <label class="block mb-2 text-base font-medium text-gray-300">Residence</label>
                <span
                  class="block w-full p-2.5 rounded-lg border border-emerald-400 bg-[#1a1a1a] text-white"
                >
                  {{ this.sigleUser.residence }}
                </span>
              </div>
              <div class="col-span-2">
                <label class="block mb-2 text-base font-medium text-gray-300">Email</label>
                <span
                  class="block w-full p-2.5 rounded-lg border border-emerald-400 bg-[#1a1a1a] text-white"
                >
                  {{ this.singleItem.email }}
                </span>
              </div>
              <div class="col-span-2">
                <label class="block mb-2 text-base font-medium text-gray-300">Message</label>
                <span
                  class="block w-full p-2.5 rounded-lg border border-emerald-400 bg-[#1a1a1a] text-white"
                >
                  {{ this.singleItem.description }}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WorkerNavigation from './WorkerNavigation.vue'
import instance from '@/axiosBase'
import Loading from '../Loading.vue'

export default {
  components: { WorkerNavigation, Loading },
  data() {
    return {
      generalSearchQuery: '',
      loadingError: false,
      adopters: [],
      items: [],
      nameList: [],
      emailList: [],
      single: false,
      singleItem: [],
      sigleUser: [],
      userId: '',
      filters: {
        name: '',
        email: '',
        read: '',
      },
      currentPage: 1,
      itemsPerPage: 10,
    }
  },
  computed: {
    filteredItems() {
      const generalQuery = this.generalSearchQuery?.toLowerCase().trim() || ''
      return this.items.filter((item) => {
        const nameMatch = this.filters.name ? item.name.toLowerCase().includes(this.filters.name.toLowerCase()) : false
        const emailMatch = this.filters.email ? item.email.toLowerCase().includes(this.filters.email.toLowerCase()) : false
        const readMatch = this.filters.read !== undefined ? item.read === this.filters.read : false
        const descriptionMatch = item.description?.toLowerCase().includes(generalQuery)
        if (!this.filters.name && !this.filters.email && this.filters.read === undefined && !generalQuery) return true
        return nameMatch || emailMatch || readMatch || descriptionMatch
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
    this.fetchData()
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    goToPage(page) {
      this.currentPage = page
    },
    async openSinglModal(item) {
      this.single = true
      this.singleItem = item
      this.userId = item.adopterId
      const userResponse = await instance.get(`animal/adopterId/${this.userId}`)
      this.sigleUser = userResponse.data
    },
    async increment(id) {
      try {
        await instance.put('animal/updateContactDomain', { id })
        window.location.reload()
      } catch (error) {
        console.error('There was an error!', error)
      }
    },
    async fetchData() {
      try {
        this.loadingError = true
        const response = await instance.get('animal/contact_db')
        this.items = response.data
        if (this.items != null) {
          setTimeout(() => {
            this.loadingError = false
          }, 1000)
        }
        this.populateFilters()
      } catch (error) {
        setTimeout(() => {
          this.loadingError = true
        }, 5000)
        this.$router.push(`/workerHome`)
        console.error('There was an error!', error)
      }
    },
    populateFilters() {
      this.nameList = [...new Set(this.items.map((item) => item.name))]
      this.emailList = [...new Set(this.items.map((item) => item.email))]
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
