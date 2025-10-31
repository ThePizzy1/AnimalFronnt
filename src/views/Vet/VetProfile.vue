<template>
  <div class="flex min-h-screen bg-[#0e0e0e] text-gray-100">
    <!-- Sidebar -->
    <div class="w-1/6 p-4 border-r border-gray-800">
      <VetNavigation />
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex justify-center items-start p-10">
      <div class="w-full max-w-3xl bg-[#151515]/90 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-10 space-y-6">
        <h2 class="text-3xl font-bold text-emerald-400 mb-6">🩺 Vet Profile</h2>

        <!-- 🧾 User Info -->
        <div v-if="user" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <p><span class="text-gray-400 font-semibold">ID:</span> {{ user?.id }}</p>
            <p><span class="text-gray-400 font-semibold">Username:</span> {{ user?.username }}</p>
            <p><span class="text-gray-400 font-semibold">Role:</span> {{ userRole }}</p>
          </div>
          <div class="space-y-3">
            <p><span class="text-gray-400 font-semibold">First Name:</span> {{ user.name }}</p>
            <p><span class="text-gray-400 font-semibold">Last Name:</span> {{ user.surname }}</p>
            <p><span class="text-gray-400 font-semibold">Phone:</span> {{ user.phone }}</p>
          </div>
        </div>

        <div class="flex justify-center mt-8">
          <button
            @click="openUpdateModal"
            class="bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-emerald-500/40">
            ✏️ Edit Profile
          </button>
        </div>

        <!-- ⚙️ Update Modal -->
        <div
          v-if="updateModal"
          class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-start z-50 transition pt-32">
          <div
            class="bg-[#151515] border border-gray-800 rounded-2xl shadow-2xl w-[90%] max-w-md p-6 relative animate-fade-in">
            <div class="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
              <h3 class="text-xl font-semibold text-emerald-400">Update Profile</h3>
              <button
                @click="updateModal = false"
                class="text-gray-400 hover:text-red-500 transition text-lg">✕</button>
            </div>

            <form @submit.prevent="updateUser" class="space-y-5">
              <div class="flex flex-col">
                <label class="text-gray-400 mb-1">Username</label>
                <input
                  v-model="editForm.username"
                  class="bg-transparent border border-emerald-700 text-gray-100 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none transition" />
              </div>

              <div class="flex flex-col">
                <label class="text-gray-400 mb-1">First Name</label>
                <input
                  v-model="editForm.firstName"
                  class="bg-transparent border border-emerald-700 text-gray-100 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none transition" />
              </div>

              <div class="flex flex-col">
                <label class="text-gray-400 mb-1">Last Name</label>
                <input
                  v-model="editForm.lastName"
                  class="bg-transparent border border-emerald-700 text-gray-100 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none transition" />
              </div>

              <div class="flex flex-col">
                <label class="text-gray-400 mb-1">Phone</label>
                <input
                  v-model="editForm.phoneNumber"
                  class="bg-transparent border border-emerald-700 text-gray-100 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none transition" />
              </div>

              <div class="flex flex-col">
                <label class="text-gray-400 mb-1">New Password (optional)</label>
                <input
                  type="password"
                  v-model="editForm.password"
                  class="bg-transparent border border-emerald-700 text-gray-100 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none transition" />
              </div>

              <button
                type="submit"
                class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg mt-3 transition shadow-md hover:shadow-emerald-500/40">
                💾 Save Changes
              </button>

              <p v-if="loadingError" class="text-red-500 text-center pt-2">❌ Error occurred. Try again.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VetNavigation from "../Vet/VetNavigation.vue";
import instance from "@/axiosBase";

export default {
  name: "VetProfile",
  components: { VetNavigation },
  data() {
    return {
      user: null,
      userRole: "",
      updateModal: false,
      loadingError: false,
      editForm: {
        username: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
      },
    };
  },

  async mounted() {
    this.decodeToken();
    await this.fetchUser();
  },

  methods: {
    decodeToken() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const decoded = JSON.parse(atob(token.split(".")[1]));
        this.userId = decoded.id_usera;
        this.username = decoded.sub;
        console.log("👨‍⚕️ Vet logged in:", this.username, "ID:", this.userId);
      } catch (err) {
        console.error("❌ Token decode error:", err);
      }
    },

    async fetchUser() {
      try {
        const response = await instance.get(`auth/getUserById/${this.userId}`);
        this.user = response.data;
        this.userRole = "Vet";
        this.editForm.username = this.user.username;
        this.editForm.firstName = this.user.name;
        this.editForm.lastName = this.user.surname;
        this.editForm.phoneNumber = this.user.phone;
      } catch (error) {
        console.error("❌ Error fetching vet data:", error);
      }
    },

    openUpdateModal() {
      this.updateModal = true;
    },

    async updateUser() {
      try {
        const payload = {
          Username: this.editForm.username,
          FirstName: this.editForm.firstName,
          LastName: this.editForm.lastName,
          PhoneNumber: this.editForm.phoneNumber,
          Password: this.editForm.password || null,
        };

        const response = await instance.put(
          `auth/updateUserById/${this.userId}`,
          payload
        );

        if (response.status === 200) {
          this.updateModal = false;
          alert("✅ Profile updated successfully!");
          await this.fetchUser();
        }
      } catch (error) {
        console.error("❌ Error updating vet profile:", error);
        this.loadingError = true;
      }
    },
  },
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
