<template>
  <div class="flex min-h-screen text-stone-200">
    <!-- Sidebar -->
    <div class="w-1/6 p-4">
      <WorkerNavigation />
    </div>

    <!-- Main content -->
    <div class="w-5/6 mr-8 mt-6 p-6 bg-[#0e0e0e] rounded-xl border border-gray-800 shadow-2xl">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-emerald-400">🧪 Labs</h1>

        <button
          @click="addModal = true"
          type="button"
          class="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full px-5 py-2 transition"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Lab
        </button>
      </div>

      <!-- Search -->
      <div class="relative mb-8">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by Animal ID..."
          class="w-full bg-[#1a1a1a] border border-gray-700 rounded-full px-5 py-2 text-gray-300 placeholder-gray-500 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <div class="absolute right-4 top-2.5 text-emerald-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" d="m21 21-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto bg-[#1a1a1a]/80 rounded-2xl border border-gray-800 shadow-xl">
        <table class="min-w-full text-left text-sm text-gray-300">
          <thead class="bg-gray-900 text-emerald-300 uppercase text-sm">
            <tr>
              <th class="px-5 py-3 text-left font-semibold">Animal ID</th>
              <th class="px-5 py-3 text-left font-semibold">Lab ID</th>
              <th class="px-5 py-3 text-left font-semibold">Date</th>
              <th class="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in filteredLabs"
              :key="item.id"
              class="border-b border-gray-800 hover:bg-gray-800/30 transition"
            >
              <td class="px-6 py-4 font-medium text-gray-200">{{ item.animalId }}</td>
              <td class="px-6 py-4 text-gray-300">{{ item.id }}</td>
              <td class="px-6 py-4 text-gray-300">{{ formatDate(item.dateTime) }}</td>
              <td class="px-6 py-4 text-right space-x-2">
                <button
                  @click="openInfoModal(item)"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm font-medium transition"
                >
                  Info
                </button>
                <button
                  @click="openUpdateModal(item)"
                  class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full text-sm font-medium transition"
                >
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- 🧩 MODAL: ADD LAB -->
  <div
    v-if="addModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition"
  >
    <div class="relative w-full max-w-lg p-6">
      <div class="bg-[#111] border border-gray-800 rounded-2xl shadow-2xl text-stone-200 overflow-hidden">
        <!-- Header -->
        <div class="flex justify-between items-center px-6 py-4 border-b border-gray-800">
          <h3 class="text-xl font-semibold text-emerald-400">➕ Add Lab</h3>
          <button
            @click="addModal = false"
            type="button"
            class="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-2 transition"
          >
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="px-6 py-5 space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block mb-2 text-sm font-semibold text-emerald-300">Animal ID:</label>
              <input
                v-model="newLab.animalId"
                type="number"
                placeholder="Enter animal ID..."
                class="w-full rounded-full border border-gray-700 bg-[#1a1a1a] text-gray-200 px-4 py-2.5 text-sm focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-semibold text-emerald-300">Date:</label>
              <input
                v-model="newLab.dateTime"
                type="date"
                class="w-full rounded-full border border-gray-700 bg-[#1a1a1a] text-gray-200 px-4 py-2.5 text-sm focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <div class="flex justify-end">
           <button
          @click="createLab"
          :disabled="labCreated"
          class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full px-6 py-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + ADD
        </button>


          </div>

          <div v-if="labCreated" class="mt-4 text-center text-emerald-400 font-medium">
            ✅ Lab created (ID: {{ createdLab.id }})
          </div>

          <!-- Parameters section -->
          <div v-if="labCreated" class="mt-6 space-y-4 border-t border-gray-700 pt-4">
            <h4 class="text-lg font-semibold text-emerald-400">Add Parameters</h4>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                v-model="newParam.parameterName"
                type="text"
                placeholder="Parameter Name"
                class="p-2 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-emerald-400 outline-none"
              />
              <input
                v-model="newParam.parameterValue"
                type="number"
                step="0.0001"
                placeholder="Parameter Value"
                class="p-2 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-emerald-400 outline-none"
              />
              <input
                v-model="newParam.remarks"
                type="text"
                placeholder="Remarks"
                class="p-2 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-emerald-400 outline-none"
              />
              <input
                v-model="newParam.measurementUnits"
                type="text"
                placeholder="Measurement Units"
                class="p-2 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>

            <div class="text-right">
              <button
                @click="addParameter"
                class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-full transition"
              >
                + ADD PARAMETER
              </button>
            </div>

            <!-- Parameters table -->
            <div v-if="addedParams.length" class="mt-4">
              <table class="min-w-full border border-gray-700 text-sm rounded-lg overflow-hidden">
                <thead class="bg-[#222] text-emerald-400">
                  <tr>
                    <th class="px-4 py-2 text-left">Name</th>
                    <th class="px-4 py-2 text-left">Value</th>
                    <th class="px-4 py-2 text-left">Remarks</th>
                    <th class="px-4 py-2 text-left">Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(p, i) in addedParams"
                    :key="i"
                    class="border-t border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td class="px-4 py-2">{{ p.parameterName }}</td>
                    <td class="px-4 py-2">{{ p.parameterValue }}</td>
                    <td class="px-4 py-2">{{ p.remarks }}</td>
                    <td class="px-4 py-2">{{ p.measurementUnits }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex justify-center mt-4">
              <button
                @click="doneAdding"
                class="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full px-6 py-2 transition"
              >
                ✔ DONE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- ✏️ UPDATE PARAMETERS MODAL -->
<div
  v-if="updateModal"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition"
>
  <div class="relative w-full max-w-3xl p-6">
    <div class="bg-[#111] border border-gray-800 rounded-2xl shadow-2xl text-stone-200 overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <h3 class="text-xl font-semibold text-emerald-400">
          ✏️ Update Lab Parameters (Lab ID: {{ updateLab.id }})
        </h3>
        <button
          @click="updateModal = false"
          type="button"
          class="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-2 transition"
        >
          ✕
        </button>
      </div>

      <!-- + ADD PARAMETER button -->
      <div class="flex justify-end px-6 py-2 border-b border-gray-800 bg-[#0e0e0e]">
        <button
          @click="addParamModal = true"
          class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full px-4 py-2 transition"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Parameter
        </button>
      </div>

      <!-- Parameters Table -->
      <div class="px-6 py-5 space-y-4">
        <table class="min-w-full border border-gray-700 text-sm rounded-lg overflow-hidden">
          <thead class="bg-[#222] text-emerald-400">
            <tr>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Value</th>
              <th class="px-4 py-2 text-left">Remarks</th>
              <th class="px-4 py-2 text-left">Units</th>
              <th class="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="param in updateParams"
              :key="param.id"
              class="border-t border-gray-700 hover:bg-gray-800 transition"
            >
              <td class="px-4 py-2">{{ param.parameterName }}</td>
              <td class="px-4 py-2">{{ param.parameterValue }}</td>
              <td class="px-4 py-2">{{ param.remarks }}</td>
              <td class="px-4 py-2">{{ param.measurementUnits }}</td>
              <td class="px-4 py-2 text-right space-x-2">
                <button
                  @click="openEditParam(param)"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-medium transition"
                >
                  Change
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- 🧩 MINI MODAL: EDIT SINGLE PARAM -->
<div
  v-if="editParamModal"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition"
>
  <div class="relative w-full max-w-md p-6">
    <div class="bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-2xl text-stone-200">
      <div class="flex justify-between items-center px-4 py-3 border-b border-gray-800">
        <h4 class="text-lg font-semibold text-emerald-400">Edit Parameter</h4>
        <button
          @click="editParamModal = false"
          class="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-1"
        >
          ✕
        </button>
      </div>

      <div class="px-4 py-4 space-y-4">
        <div>
          <label class="block text-sm text-emerald-300 mb-1">Parameter Name</label>
          <input
            v-model="editParam.parameterName"
            type="text"
            class="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label class="block text-sm text-emerald-300 mb-1">Value</label>
          <input
            v-model="editParam.parameterValue"
            type="number"
            step="0.0001"
            class="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label class="block text-sm text-emerald-300 mb-1">Remarks</label>
          <input
            v-model="editParam.remarks"
            type="text"
            class="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label class="block text-sm text-emerald-300 mb-1">Measurement Units</label>
          <input
            v-model="editParam.measurementUnits"
            type="text"
            class="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div class="flex justify-end px-4 py-3 border-t border-gray-800">
        <button
          @click="updateParameter"
          class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full px-6 py-2 transition"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</div>

<!-- 🟢 MINI MODAL: ADD PARAMETER -->
<div
  v-if="addParamModal"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition"
>
  <div class="relative w-full max-w-md p-6">
    <div class="bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-2xl text-stone-200">
      <div class="flex justify-between items-center px-4 py-3 border-b border-gray-800">
        <h4 class="text-lg font-semibold text-emerald-400">Add New Parameter</h4>
        <button
          @click="addParamModal = false"
          class="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-1"
        >
          ✕
        </button>
      </div>

      <div class="px-4 py-4 space-y-4">
        <div>
          <label class="block text-sm text-emerald-300 mb-1">Parameter Name</label>
          <input
            v-model="newUpdateParam.parameterName"
            type="text"
            class="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label class="block text-sm text-emerald-300 mb-1">Value</label>
          <input
            v-model="newUpdateParam.parameterValue"
            type="number"
            step="0.0001"
            class="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label class="block text-sm text-emerald-300 mb-1">Remarks</label>
          <input
            v-model="newUpdateParam.remarks"
            type="text"
            class="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label class="block text-sm text-emerald-300 mb-1">Measurement Units</label>
          <input
            v-model="newUpdateParam.measurementUnits"
            type="text"
            class="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div class="flex justify-end px-4 py-3 border-t border-gray-800">
        <button
          @click="addParameterInUpdate"
          class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full px-6 py-2 transition"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</div>


  <!-- ℹ️ INFO MODAL -->
  <div
    v-if="infoModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition"
  >
    <div class="relative w-full max-w-3xl p-6">
      <div class="bg-[#111] border border-gray-800 rounded-2xl shadow-2xl text-stone-200 overflow-hidden">
        <div class="flex justify-between items-center px-6 py-4 border-b border-gray-800">
          <h3 class="text-xl font-semibold text-emerald-400">🔍 Lab Info</h3>
          <button
            @click="infoModal = false"
            type="button"
            class="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-2 transition"
          >
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="px-6 py-5 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span class="block text-emerald-400 font-medium">Animal ID</span>
              <span class="block text-gray-300">{{ infoLab.animalId }}</span>
            </div>
            <div>
              <span class="block text-emerald-400 font-medium">Lab ID</span>
              <span class="block text-gray-300">{{ infoLab.id }}</span>
            </div>
            <div>
              <span class="block text-emerald-400 font-medium">Date</span>
              <span class="block text-gray-300">{{ formatDate(infoLab.dateTime) }}</span>
            </div>
          </div>

          <div class="border-t border-gray-700 pt-4">
            <h4 class="text-lg text-emerald-400 font-semibold mb-3">Parameters</h4>
            <table class="min-w-full border border-gray-700 text-sm rounded-lg overflow-hidden">
              <thead class="bg-[#222] text-emerald-400">
                <tr>
                  <th class="px-4 py-2 text-left">Name</th>
                  <th class="px-4 py-2 text-left">Value</th>
                  <th class="px-4 py-2 text-left">Remarks</th>
                  <th class="px-4 py-2 text-left">Units</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(p, i) in infoParams"
                  :key="i"
                  class="border-t border-gray-700 hover:bg-gray-800 transition"
                >
                  <td class="px-4 py-2">{{ p.parameterName }}</td>
                  <td class="px-4 py-2">{{ p.parameterValue }}</td>
                  <td class="px-4 py-2">{{ p.remarks }}</td>
                  <td class="px-4 py-2">{{ p.measurementUnits }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WorkerNavigation from '../Vet/VetNavigation.vue';
import instance from '@/axiosBase';
import Swal from 'sweetalert2';

export default {
  components: { WorkerNavigation },
  data() {
    return {
      updateModal: false,
      editParamModal: false,
      updateLab: {},
      updateParams: [],
      editParam: {},
      addParamModal: false,
      newUpdateParam: { 
        parameterName: '', 
        parameterValue: '', 
        remarks: '', 
        measurementUnits: '' 
      },


      items: [],
      searchQuery: '',
      addModal: false,
      infoModal: false,
      labCreated: false,
      createdLab: {},
      infoLab: {},
      infoParams: [],
      newLab: { animalId: '', dateTime: '' },
      newParam: { parameterName: '', parameterValue: '', remarks: '', measurementUnits: '' },
      addedParams: [],
    };
  },
  mounted() {
    this.fetchLabs();
  },
  computed: {
    filteredLabs() {
      if (!this.searchQuery) return this.items;
      return this.items.filter((lab) =>
        lab.animalId.toString().includes(this.searchQuery.trim())
      );
    },
  },
  methods: {
    async addParameterInUpdate() {
  try {
    const param = {
      ...this.newUpdateParam,
      labId: this.updateLab.id
    };

    await instance.post('animal/addParametar', param);

    Swal.fire('Added!', 'New parameter successfully added!', 'success');
    this.addParamModal = false;

    // Reset forme
    this.newUpdateParam = { 
      parameterName: '', 
      parameterValue: '', 
      remarks: '', 
      measurementUnits: '' 
    };

    // Osvježi tablicu parametara
    const res = await instance.get(`animal/parameter_db/${this.updateLab.id}`);
    this.updateParams = res.data;
  } catch (error) {
    Swal.fire('Error', 'Failed to add new parameter', 'error');
    console.error(error);
  }
},

    async openUpdateModal(lab) {
  this.updateModal = true;
  this.updateLab = lab;
  try {
    const res = await instance.get(`animal/parameter_db/${lab.id}`);
    this.updateParams = res.data;
  } catch {
    Swal.fire('Error', 'Failed to load parameters for update', 'error');
  }
},

openEditParam(param) {
  this.editParamModal = true;
  this.editParam = { ...param }; // kopija da ne diramo original dok ne spremimo
},

async updateParameter() {
  try {
    await instance.put('animal/updateParametar', this.editParam);
    Swal.fire('Updated!', 'Parameter updated successfully!', 'success');
    this.editParamModal = false;
    // Osvježi parametre
    const res = await instance.get(`animal/parameter_db/${this.updateLab.id}`);
    this.updateParams = res.data;
  } catch (error) {
    Swal.fire('Error', 'Failed to update parameter', 'error');
    console.error(error);
  }
},

    async fetchLabs() {
      try {
        const res = await instance.get('animal/labs_db');
        this.items = res.data;
      } catch (e) {
        console.error('Error fetching labs:', e);
      }
    },
    async createLab() {
      try {
        const res = await instance.post('animal/addLabs', this.newLab);
        this.createdLab = res.data;
        this.labCreated = true;
        Swal.fire('Success', 'Lab created successfully!', 'success');
      } catch {
        Swal.fire('Error', 'Failed to create lab!', 'error');
      }
    },
    async addParameter() {
      try {
        const param = { ...this.newParam, labId: this.createdLab.id };
        await instance.post('animal/addParametar', param);
        this.addedParams.push({ ...this.newParam });
        this.newParam = { parameterName: '', parameterValue: '', remarks: '', measurementUnits: '' };
      } catch {
        Swal.fire('Error', 'Failed to add parameter!', 'error');
      }
    },
doneAdding() {
  Swal.fire('Done', 'Lab and parameters saved!', 'success');

  // resetiraj sve inpute
  this.newLab = { animalId: '', dateTime: '' };
  this.newParam = { parameterName: '', parameterValue: '', remarks: '', measurementUnits: '' };
  this.addedParams = [];
  this.createdLab = {};
  this.labCreated = false;

  // zatvori modal
  this.addModal = false;

  // refreshaj listu labova
  this.fetchLabs();

  // opcionalno: lagani reload ako želiš da se cijela komponenta osvježi
  // window.location.reload(); // koristi ovo ako želiš hard refresh
},

    async openInfoModal(lab) {
      this.infoModal = true;
      this.infoLab = lab;
      try {
        const res = await instance.get(`animal/parameter_db/${lab.id}`);
        this.infoParams = res.data;
      } catch {
        Swal.fire('Error', 'Failed to load parameters!', 'error');
      }
    },
  
    formatDate(date) {
      if (!date) return 'N/A';
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.container {
  color: white;
  font-family: 'Poppins', sans-serif;
}
</style>
