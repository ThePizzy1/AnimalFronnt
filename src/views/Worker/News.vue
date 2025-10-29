<template>
  <div class="container mx-auto px-4 mt-6">
    <div class="flex">
      <!-- 🧭 Navigation -->
      <WorkerNavigation class="w-1/6" />

      <!-- 📄 Glavni sadržaj -->
      <div class="w-5/6 ml-auto">
        <!-- NASLOV -->
        <h1 class="ml-1 md:ml-2 text-2xl font-semibold text-white/90 mb-5">
          News
        </h1>

        <!-- 🔘 DODAJ NEWS -->
        <div class="flex items-center mb-6">
          <button
            @click="add = true"
            :disabled="userRole !== 'Menager'"
            type="button"
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 
                0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 
                10.7-24 24-24s24 10.7 24 24v64h64c13.3 
                0 24 10.7 24 24s-10.7 24-24 24H280v64c0 
                13.3-10.7 24-24 24s-24-10.7-24-24z"
              ></path>
            </svg>
            Add News
          </button>
        </div>

        <!-- 🔍 FILTERI -->
        <div class="bg-[#0e0e0e] rounded-xl p-6 shadow-lg border border-white/10 mb-5">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label class="block text-gray-300 mb-1 font-medium">Name</label>
              <input
                v-model="filters.name"
                type="text"
                placeholder="Search by name..."
                class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>

            <div>
              <label class="block text-gray-300 mb-1 font-medium">Description</label>
              <input
                v-model="filters.description"
                type="text"
                placeholder="Search by description..."
                class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>

            <div>
              <label class="block text-gray-300 mb-1 font-medium">Date</label>
              <input
                v-model="filters.dateTime"
                type="date"
                class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>
          </div>
        

        <!-- 🔎 OPĆA PRETRAGA -->
        <div class="bg-[#0e0e0e] rounded-xl p-5 shadow-lg border border-white/10 mb-8">
          <div class="relative">
            <input
              v-model="generalSearchQuery"
              type="text"
              placeholder="Search news..."
              class="w-full px-5 py-3 rounded-lg bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
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
</div>
        <!-- 📋 TABLICA -->
        <div class="mt-5 overflow-x-auto custom-scrollbar">
          <table class="w-full border-separate border-spacing-y-4 bg-[#0e0e0e] rounded-xl">
            <thead>
              <tr class="text-left text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                <th class="px-6 py-3"></th>
                <th class="px-6 py-3">Name</th>
                <th class="px-6 py-3">Date</th>
                <th class="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in paginatedItems"
                :key="item.id"
                class="bg-[#1a1a1a] hover:bg-[#242424] border border-gray-700/30 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <td class="px-6 py-5 text-gray-200">
                  <svg
                    @click="openSinglModal(item)"
                    class="w-6 h-6 text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 
                      12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </td>
                <td class="px-6 py-5 text-white font-semibold cursor-pointer">
                  {{ item.name }}
                </td>
                <td class="px-6 py-5 text-gray-300 cursor-pointer">
                  {{ formatDate(item.dateTime) }}
                </td>
                <td class="px-6 py-5 flex gap-3 justify-center">
                  <button
                    type="button"
                    @click="openUpdateModal(item)"
                    class="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition shadow-md"
                  >
                    ✏️ Update
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

        <!-- INFO -->
        <p class="text-gray-400 text-sm mt-5 text-center">
          Showing {{ filteredItems.length }} filtered results
        </p>
      </div>
    </div>

    <!-- 🟢 MODALI -->
    <!-- Add Modal -->
    <div v-if="add" class="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div class="bg-[#0e0e0e] rounded-xl shadow-xl border border-gray-700/50 w-full max-w-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-white">Add News</h3>
          <button @click="add = false" class="text-gray-400 hover:text-emerald-400 transition">✕</button>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-gray-300 mb-1 font-medium">Name</label>
            <input
              v-model="nameAdd"
              type="text"
              placeholder="News title"
              class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            />
          </div>
          <div>
            <label class="block text-gray-300 mb-1 font-medium">Date</label>
            <input
              v-model="dateAdd"
              type="date"
              class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            />
          </div>
          <div>
            <label class="block text-gray-300 mb-1 font-medium">Description</label>
            <textarea
              v-model="descriptionAdd"
              rows="4"
              placeholder="Write description..."
              class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            ></textarea>
          </div>
          <button type="submit" class="w-full py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-md">
            Add
          </button>
        </form>
      </div>
    </div>

    <!-- Update Modal -->
    <div v-if="update" class="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div class="bg-[#0e0e0e] rounded-xl shadow-xl border border-gray-700/50 w-full max-w-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-white">Update News</h3>
          <button @click="update = false" class="text-gray-400 hover:text-emerald-400 transition">✕</button>
        </div>
        <form @submit.prevent="handleUpdate(this.idUpdate)" class="space-y-4">
          <div>
            <label class="block text-gray-300 mb-1 font-medium">Name</label>
            <input
              v-model="nameUpdate"
              type="text"
              class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            />
          </div>
          <div>
            <label class="block text-gray-300 mb-1 font-medium">Date</label>
            <input
              v-model="dateUpdate"
              type="date"
              class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            />
          </div>
          <div>
            <label class="block text-gray-300 mb-1 font-medium">Description</label>
            <textarea
              v-model="descriptionUpdate"
              rows="4"
              class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            ></textarea>
          </div>
          <button type="submit" class="w-full py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-md">
            Update
          </button>
        </form>
      </div>
    </div>

    <!-- Single Modal -->
    <div v-if="single" class="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div class="bg-[#0e0e0e] rounded-xl shadow-xl border border-gray-700/50 w-full max-w-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-white">News Details</h3>
          <button @click="single = false" class="text-gray-400 hover:text-emerald-400 transition">✕</button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="block text-gray-400 text-sm mb-1">Name</label>
            <div class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700/40">
              {{ singleItem.name }}
            </div>
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-1">Date</label>
            <div class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700/40">
              {{ formatDate(singleItem.dateTime) }}
            </div>
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-1">Description</label>
            <div class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700/40 max-h-60 overflow-y-auto custom-scrollbar">
              {{ singleItem.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WorkerNavigation from './WorkerNavigation.vue'
import instance from '@/axiosBase'
import Swal from 'sweetalert2'

export default {
  components: { WorkerNavigation },
  data() {
    return {
      userRole: localStorage.getItem('userRole'),
      generalSearchQuery: '',
      add: false,
      items: [],
      nameAdd: '',
      dateAdd: '',
      descriptionAdd: '',
      update: false,
      idUpdate: '',
      nameUpdate: '',
      dateUpdate: '',
      descriptionUpdate: '',
      single: false,
      singleItem: [],
      filters: { name: '', description: '', dateTime: '' },
      currentPage: 1,
      itemsPerPage: 10,
    }
  },
  computed: {
    filteredItems() {
      const query = this.generalSearchQuery?.toLowerCase().trim() || ''
      return this.items.filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(query)
        const dateMatch = this.formatDate(item.dateTime)?.toLowerCase().includes(query)
        const descriptionMatch = item.description?.toLowerCase().includes(query)
        return nameMatch || dateMatch || descriptionMatch
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
    async remove(id) {
      await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await instance.delete(`animal/deleteNews/${id}`)
          Swal.fire('Deleted!', 'The news has been removed.', 'success')
          window.location.reload()
        }
      })
    },
    async openSinglModal(item) {
      this.single = true
      this.singleItem = item
    },
    openUpdateModal(item) {
      this.update = true
      this.idUpdate = item.id
      this.nameUpdate = item.name
      this.dateUpdate = item.dateTime.split('T')[0]
      this.descriptionUpdate = item.description
    },
    async handleUpdate(id) {
      try {
        await instance.put(
          'animal/updateNewsDomain',
          {
            id: this.idUpdate,
            name: this.nameUpdate,
            description: this.descriptionUpdate,
            dateTime: `${this.dateUpdate}T00:00:00.00`,
          },
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        )
        await Swal.fire({ title: 'Updated!', icon: 'success' })
        window.location.reload()
      } catch (error) {
        await Swal.fire({
          title: 'Oops!',
          text: 'Failed to update item. Try again.',
          icon: 'error',
        })
      }
    },
    async handleSubmit() {
      try {
        await instance.post(
          'animal/addNews',
          {
            name: this.nameAdd,
            dateTime: `${this.dateAdd}T00:00:00.00`,
            description: this.descriptionAdd,
          },
          { headers: { Authorization: `Bearer ${this.token}` } }
        )
        Swal.fire({ title: 'Item added!', icon: 'success' })
        window.location.reload()
      } catch (error) {
        Swal.fire({
          title: 'Oops!',
          text: 'Failed to add item. Try again.',
          icon: 'error',
        })
      }
    },
    async fetchData() {
      try {
        const response = await instance.get('animal/news_db')
        this.items = response.data
      } catch (error) {
        console.error('There was an error!', error)
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    },
  },
}
</script>

<style scoped>
.container {
  color: white;
  font-family: 'Poppins', sans-serif;
}
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
