<template>
  <div class="flex justify-center bg-[#0e0e0e] min-h-screen py-20 text-gray-200">
    <div class="w-full max-w-6xl flex flex-col space-y-10 px-6">
      
      <!-- 🔹 LOGOUT -->
      <div class="flex justify-end">
        <router-link
          to="/"
          @click="logout"
          class="flex items-center px-5 py-2 rounded-lg bg-[#1a1a1a] border border-gray-700/40 hover:bg-[#181818] hover:border-emerald-500/50 text-gray-300 hover:text-emerald-400 transition-all shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 
              0a9 9 0 1 0-11.963 0m11.963 0A8.966 
              8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 
              9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg>
          Log out
        </router-link>
      </div>

      <!-- 🔹 USER INFO EDIT -->
      <div class="bg-[#1a1a1a] rounded-xl p-10 border border-gray-700/40 shadow-lg hover:shadow-emerald-700/20 transition-all duration-300">
        <div class="flex flex-col 2xl:flex-row gap-10">
          <!-- Forma -->
          <div class="flex-1">
            <h2 class="text-2xl font-semibold mb-6 text-white/90 border-b border-gray-700 pb-2">
              Edit Personal Info
            </h2>

            <form @submit.prevent="submitEditForm" class="space-y-5">
              <div>
                <label class="block text-gray-300 font-medium mb-1">Username</label>
                <input
                  v-model="username"
                  type="text"
                  required
                  class="w-full px-4 py-2 rounded-lg bg-[#0e0e0e] border border-gray-700 text-gray-200 focus:ring-2 focus:ring-emerald-500/60 focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-gray-300 font-medium mb-1">Password</label>
                <input
                  v-model="password"
                  type="password"
                  required
                  class="w-full px-4 py-2 rounded-lg bg-[#0e0e0e] border border-gray-700 text-gray-200 focus:ring-2 focus:ring-emerald-500/60 focus:outline-none"
                />
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  class="px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <!-- Slika -->
          <div class="flex-1 flex justify-center items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/animalrescue-fa5f9.appspot.com/o/s6.png?alt=media&token=3dcdc8fb-952a-41da-a13b-cda0ee3f6d34"
              alt="Profile illustration"
              class="rounded-xl border border-gray-700/40 shadow-md max-h-80 object-cover"
            />
          </div>
        </div>
      </div>

      <!-- 🔹 ANIMALS SUBMITTED BY USER -->
      <div class="bg-[#1a1a1a] rounded-xl p-10 border border-gray-700/40 shadow-lg hover:shadow-emerald-700/20 transition-all duration-300">
        <h2 class="text-2xl font-semibold mb-6 text-white/90 border-b border-gray-700 pb-2">
          Animals Submitted by You
        </h2>

        <div v-if="loading" class="text-center text-gray-400 py-10">
          Loading your animals...
        </div>

        <div v-else-if="userAnimals.length === 0" class="text-center text-gray-400 py-10">
          <p>No animals submitted yet.</p>
        </div>

        <!-- 🔹 Lista životinja s paginacijom -->
        <div v-else>
          <div
            v-for="(animal, index) in paginatedAnimals"
            :key="index"
            class="flex flex-col md:flex-row gap-6 mb-6 bg-[#0e0e0e] border border-gray-700/40 p-6 rounded-xl shadow-md hover:shadow-emerald-700/10 transition-all duration-300"
          >
            <!-- Slika -->
            <div class="md:w-1/3 flex justify-center">
              <img
                v-if="animal.picture"
                :src="'data:image/jpeg;base64,' + animal.picture"
                :alt="animal.name"
                class="w-48 h-48 rounded-lg border border-gray-700/40 shadow-sm object-cover"
              />
            </div>

            <!-- Tekst -->
            <div class="md:w-2/3">
              <h3 class="text-xl font-semibold text-white mb-2">{{ animal.name }}</h3>
              <div class="grid grid-cols-2 gap-y-1 text-gray-300 text-sm">
                <p><strong class="text-emerald-400">Family:</strong> {{ animal.family }}</p>
                <p><strong class="text-emerald-400">Species:</strong> {{ animal.species }}</p>
                <p><strong class="text-emerald-400">Subspecies:</strong> {{ animal.subspecies }}</p>
                <p><strong class="text-emerald-400">Age:</strong> {{ animal.age }} years</p>
                <p><strong class="text-emerald-400">Height:</strong> {{ animal.height }} cm</p>
                <p><strong class="text-emerald-400">Length:</strong> {{ animal.length }} cm</p>
                <p><strong class="text-emerald-400">Weight:</strong> {{ animal.weight }} kg</p>
              </div>
            </div>
          </div>

          <!-- 🔸 PAGINATION -->
          <div class="flex justify-center items-center mt-8 space-x-4">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-4 py-2 rounded-lg bg-[#0e0e0e] border border-gray-700 text-gray-300 hover:border-emerald-500/60 hover:text-emerald-400 disabled:opacity-30 transition-all"
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
              class="px-4 py-2 rounded-lg bg-[#0e0e0e] border border-gray-700 text-gray-300 hover:border-emerald-500/60 hover:text-emerald-400 disabled:opacity-30 transition-all"
            >
              Next ›
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import instance from "@/axiosBase";

export default {
  data() {
    return {
      username: "",
      password: "",
      userId: "",
      userAnimals: [],
      loading: true,
      currentPage: 1,
      pageSize: 5,
    };
  },

  async mounted() {
    this.decodeToken();
    await this.fetchUserAnimals();
  },

  computed: {
    totalPages() {
      return Math.ceil(this.userAnimals.length / this.pageSize);
    },
    paginatedAnimals() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.userAnimals.slice(start, start + this.pageSize);
    },
  },

  methods: {
    decodeToken() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const decoded = JSON.parse(atob(token.split(".")[1]));
        this.userId = decoded.id_usera;
        this.username = decoded.sub;
        console.log("🔑 Logged user:", this.username, "ID:", this.userId);
      } catch (err) {
        console.error("❌ Token decode error:", err);
      }
    },

    async fetchUserAnimals() {
      try {
        const foundRes = await instance.get("animal/foundrecord_db");
        const userFoundRecords = foundRes.data.filter(
          (r) => r.registerId === this.userId
        );
        const animalDetails = await Promise.all(
          userFoundRecords.map(async (record) => {
            try {
              const res = await instance.get(`animal/allanimal/${record.animalId}`);
              return res.data;
            } catch (err) {
              console.warn(`⚠️ Animal ${record.animalId} not found.`);
              return null;
            }
          })
        );
        this.userAnimals = animalDetails.filter((a) => a !== null);
      } catch (err) {
        console.error("❌ Error fetching user animals:", err);
      } finally {
        this.loading = false;
      }
    },

    async submitEditForm() {
      try {
        await instance.put(`auth/updateUserById/${this.userId}`, {
          Username: this.username,
          Password: this.password,
        });
        alert("✅ Info updated successfully!");
      } catch (err) {
        console.error("❌ Error updating user:", err);
        alert("⚠️ Update failed.");
      }
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },

    // 🔸 Pagination controls
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
};
</script>

<style scoped>
input::placeholder {
  color: #9ca3af;
}
button:disabled {
  cursor: not-allowed;
}
</style>
