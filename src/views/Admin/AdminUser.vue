<template>
  <div class="p-6 bg-[#0e0e0e] min-h-screen text-gray-100">
    <!-- Main Wrapper -->
    <div class="max-w-7xl mx-auto space-y-8">

      <!-- 🔹 Adopter Details Section -->
      <div class="bg-[#151515] rounded-2xl shadow-2xl p-8 border border-gray-800">
        <h2 class="text-3xl font-bold mb-6 flex items-center">
          👤 Adopter Details
        </h2>

        <div v-if="user" class="flex flex-col 2xl:flex-row gap-8">
          <!-- 👤 Personal Info -->
          <div class="bg-[#1d1d1d] rounded-xl shadow-lg p-6 w-full 2xl:w-1/3 border border-gray-700">
            <h3 class="text-xl font-semibold mb-4 text-blue-400">Personal Info</h3>
            <div class="space-y-3 text-base">
              <div class="flex justify-between border-b border-gray-700 pb-2">
                <span class="font-semibold text-gray-300">First name:</span>
                <span>{{ user.firstName }}</span>
              </div>
              <div class="flex justify-between border-b border-gray-700 pb-2">
                <span class="font-semibold text-gray-300">Last name:</span>
                <span>{{ user.lastName }}</span>
              </div>
              <div class="flex justify-between border-b border-gray-700 pb-2">
                <span class="font-semibold text-gray-300">Date of Birth:</span>
                <span>{{ formatBirthDate(user.dateOfBirth) }}</span>
              </div>
              <div class="flex justify-between pb-2">
                <span class="font-semibold text-gray-300">Residence:</span>
                <span>{{ user.residence }}</span>
              </div>
            </div>
          </div>

          <!-- 🐾 Adoption Details -->
          <div class="flex-1">
            <loading v-if="loading" />
            <div v-else>
              <div v-if="adoption.length">
                <div
                  class="bg-[#1b1b1b] rounded-xl shadow-lg border border-gray-700 p-6 transition hover:border-blue-500">
                  <h3 class="text-2xl font-semibold mb-4 text-green-400">{{ currentAnimal.name }}</h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                    <div class="space-y-1">
                      <p><span class="font-semibold text-gray-300">Adoption code:</span> {{ currentAdoption.code }}</p>
                      <p><span class="font-semibold text-gray-300">Family:</span> {{ currentAnimal.family }}</p>
                      <p><span class="font-semibold text-gray-300">Subspecies:</span> {{ currentAnimal.subspecies }}</p>
                      <p><span class="font-semibold text-gray-300">Species:</span> {{ currentAnimal.species }}</p>
                      <p><span class="font-semibold text-gray-300">Age:</span> {{ currentAnimal.age }}</p>
                      <p><span class="font-semibold text-gray-300">Gender:</span> {{ currentAnimal.gender }}</p>
                    </div>
                    <div class="space-y-1">
                      <p><span class="font-semibold text-gray-300">Weight:</span> {{ currentAnimal.weight }} kg</p>
                      <p><span class="font-semibold text-gray-300">Height:</span> {{ currentAnimal.height }} cm</p>
                      <p><span class="font-semibold text-gray-300">Length:</span> {{ currentAnimal.length }} cm</p>
                      <p><span class="font-semibold text-gray-300">Health Issues:</span> {{ currentAnimal.healthIssues }}</p>
                      <p><span class="font-semibold text-gray-300">Personality:</span> {{ currentAnimal.personalityDescription }}</p>
                    </div>
                    <div class="flex flex-col space-y-2">
                      <Toggle label="Neutered" v-model="currentAnimal.neutered" />
                      <Toggle label="Vaccinated" v-model="currentAnimal.vaccinated" />
                      <Toggle label="Microchipped" v-model="currentAnimal.microchipped" />
                      <Toggle label="Trained" v-model="currentAnimal.trained" />
                      <Toggle label="Socialized" v-model="currentAnimal.socialized" />
                    </div>
                  </div>
                </div>

                <!-- Navigation -->
                <div class="flex justify-between mt-6">
                  <button
                    @click="prevAnimal"
                    :disabled="currentIndex === 0"
                    class="px-6 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition disabled:opacity-40">
                    ⬅ Previous
                  </button>
                  <button
                    @click="nextAnimal"
                    :disabled="currentIndex === adoption.length - 1"
                    class="px-6 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition">
                    Next ➡
                  </button>
                </div>
              </div>

              <!-- 🩸 No Adopted -->
              <div v-else>
                <p class="text-center text-xl font-semibold mt-8 text-gray-400">
                  This user has no adopted animals.
                </p>
              </div>

              <!-- 🔁 Returned Animals -->
              <div v-if="returned.length">
                <h3 class="text-2xl font-semibold text-red-400 mt-10 mb-4">Returned Animals</h3>

                <div class="bg-[#1b1b1b] rounded-xl shadow-lg border border-gray-700 p-6">
                  <div class="text-sm space-y-2">
                    <p><span class="font-semibold text-gray-300">Return code:</span> {{ currentReturned.returnCode }}</p>
                    <p><span class="font-semibold text-gray-300">Adoption code:</span> {{ currentReturned.adoptionCode }}</p>
                    <p class="text-red-400 font-semibold">Reason: {{ currentReturned.returnReason }}</p>
                  </div>

                  <h4 class="text-2xl font-semibold text-yellow-400 mt-6">{{ currentReturnedAnimal.name }}</h4>

                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 text-sm">
                    <div class="space-y-1">
                      <p><span class="font-semibold text-gray-300">Family:</span> {{ currentReturnedAnimal.family }}</p>
                      <p><span class="font-semibold text-gray-300">Species:</span> {{ currentReturnedAnimal.species }}</p>
                      <p><span class="font-semibold text-gray-300">Age:</span> {{ currentReturnedAnimal.age }}</p>
                      <p><span class="font-semibold text-gray-300">Gender:</span> {{ currentReturnedAnimal.gender }}</p>
                    </div>
                    <div class="space-y-1">
                      <p><span class="font-semibold text-gray-300">Weight:</span> {{ currentReturnedAnimal.weight }} kg</p>
                      <p><span class="font-semibold text-gray-300">Height:</span> {{ currentReturnedAnimal.height }} cm</p>
                      <p><span class="font-semibold text-gray-300">Health Issues:</span> {{ currentReturnedAnimal.healthIssues }}</p>
                    </div>
                    <div class="flex flex-col space-y-2">
                      <Toggle label="Neutered" v-model="currentReturnedAnimal.neutered" />
                      <Toggle label="Vaccinated" v-model="currentReturnedAnimal.vaccinated" />
                      <Toggle label="Microchipped" v-model="currentReturnedAnimal.microchipped" />
                      <Toggle label="Trained" v-model="currentReturnedAnimal.trained" />
                      <Toggle label="Socialized" v-model="currentReturnedAnimal.socialized" />
                    </div>
                  </div>
                </div>

                <!-- Returned Nav -->
                <div class="flex justify-between mt-6">
                  <button
                    @click="prevReturnedAnimal"
                    :disabled="currentReturnedIndex === 0"
                    class="px-6 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition disabled:opacity-40">
                    ⬅ Previous
                  </button>
                  <button
                    @click="nextReturnedAnimal"
                    :disabled="currentReturnedIndex === returned.length - 1"
                    class="px-6 py-2 rounded-lg bg-red-700 hover:bg-red-600 transition">
                    Next ➡
                  </button>
                </div>
              </div>

              <div v-else>
                <p class="text-center text-xl font-semibold mt-8 text-gray-400">
                  This user has no returned animals.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- No User -->
        <div v-else class="flex items-center justify-center py-20">
          <div class="bg-[#1a1a1a] shadow-xl rounded-xl p-10 max-w-lg text-center border border-gray-800">
            <p class="text-gray-300 text-lg">
              This user has not adopted or returned any animals, or access to their information is restricted.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/axiosBase'
import Loading from '../Loading.vue'
import { ref } from 'vue'

const token = ref(localStorage.getItem('token'))

export default {
  components: {
    Loading,
  },
  data() {
    return {
      user: null,
      adoption: [],
      returned: [],
      currentIndex: 0,
      currentReturnedIndex: 0,
      loading: true,
    }
  },
  computed: {
    currentAnimal() {
      return this.adoption[this.currentIndex]?.animal || {}
    },
    currentAdoption() {
      return this.adoption[this.currentIndex] || {}
    },
    currentReturnedAnimal() {
      return this.returned[this.currentReturnedIndex]?.animal || {}
    },
    currentReturned() {
      return this.returned[this.currentReturnedIndex] || {}
    },
  },
  mounted() {
    this.fetchAdoptionDetails()
    this.fetchReturnedDetails()
  },
  methods: {
    formatBirthDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-US', options)
    },
    fetchAdoptionDetails() {
      const idUser = this.$route.params.id
      instance
        .get(`animal/adopted/${idUser}`, {
          headers: { Authorization: `Bearer ${token.value}` },
        })
        .then((response) => {
          this.adoption = response.data
          if (this.adoption.length > 0) this.user = this.adoption[0].adopter
          this.loading = false
        })
        .catch((error) => {
          console.error('Error fetching adoption details:', error)
          this.loading = false
        })
    },
    fetchReturnedDetails() {
      const idUser = this.$route.params.id
      instance
        .get(`animal/returned/${idUser}`, {
          headers: { Authorization: `Bearer ${token.value}` },
        })
        .then((response) => {
          this.returned = response.data
          this.loading = false
        })
        .catch((error) => {
          console.error('Error fetching returned details:', error)
          this.loading = false
        })
    },
    prevAnimal() {
      if (this.currentIndex > 0) this.currentIndex--
    },
    nextAnimal() {
      if (this.currentIndex < this.adoption.length - 1) this.currentIndex++
    },
    prevReturnedAnimal() {
      if (this.currentReturnedIndex > 0) this.currentReturnedIndex--
    },
    nextReturnedAnimal() {
      if (this.currentReturnedIndex < this.returned.length - 1)
        this.currentReturnedIndex++
    },
  },
}
</script>

<style scoped>
.toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
