<template>
  <div class="flex min-h-screen  text-stone-200">
    <Loading v-if="loadingError" />

    <!-- Sidebar -->
    <div class="w-1/6 p-4">
      <WorkerNavigation />
    </div>

    <!-- Main Content -->
    <div class="w-5/6 p-6 mr-8 mt-5 bg-[#0e0e0e] rounded-xl shadow-lg border border-white/10 space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-emerald-400">💉 Vaccination</h1>
        <button
          @click="add = true"
          :disabled="userRole !== 'HeadVet'"
          type="button"
          class="flex items-center px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-md transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Vaccination
        </button>
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label for="startTime" class="block text-sm font-medium text-gray-400 mb-2">Start Date:</label>
          <input
            v-model="filters.startTime"
            id="startTime"
            type="date"
            class="w-full bg-[#1a1a1a] border border-gray-700 rounded-full px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label for="endTime" class="block text-sm font-medium text-gray-400 mb-2">End Date:</label>
          <input
            v-model="filters.endTime"
            id="endTime"
            type="date"
            class="w-full bg-[#1a1a1a] border border-gray-700 rounded-full px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      <!-- Search -->
      <div class="relative mt-6">
        <input
          v-model="generalSearchQuery"
          type="text"
          placeholder="Search..."
          class="w-full bg-[#1a1a1a] border border-gray-700 rounded-full px-5 py-2 pr-12 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
        />
        <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto bg-[#1a1a1a]/80 rounded-2xl border border-gray-800 shadow-xl">
        <table class="min-w-full text-left text-sm text-gray-300">
          <thead class="bg-gray-900 text-emerald-300 uppercase text-xs">
           <tr>
              <th class="px-4 py-3 text-center"></th>
              <th class="px-4 py-3 text-center font-semibold">Start Time</th>
              <th class="px-4 py-3 text-center font-semibold">End Time</th>
              <th class="px-4 py-3 text-center font-semibold">Type of Visit</th>
              <th class="px-4 py-3 text-center font-semibold">Notes</th>
              <th class="px-4 py-3 text-center"></th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in paginatedItems"

              :key="item.id"
              :class="{
                'opacity-50 cursor-not-allowed': !getTodayDate(item.endTime),
                'hover:bg-[#202020] transition': getTodayDate(item.endTime)
              }"
              class="border-b border-gray-800"
            >
              <td class="px-4 py-4 text-center">
                <svg
                  @click="openSinglModal(item)"
                  class="w-6 h-6 text-emerald-400 hover:text-emerald-300 cursor-pointer transition"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 11h2v5m-2 0h4m-2.6-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </td>

              <td class="px-4 py-4 text-center font-medium">{{ formatDate(item.startTime) }}</td>
              <td class="px-4 py-4 text-center font-medium">{{ formatDate(item.endTime) }}</td>
              <td class="px-4 py-4 text-center">{{ item.typeOfVisit }}</td>
              <td class="px-4 py-4 text-center">{{ item.notes }}</td>

              <td class="px-4 py-4 text-center">
                <button
                  @click="openUpdateModal(item)"
                  class="flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm transition"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 3.487a2.115 2.115 0 0 1 2.995 0 2.115 2.115 0 0 1 0 2.995L8.414 17.924l-4.242.707.707-4.242L16.862 3.487z" />
                  </svg>
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center mt-8 space-x-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-700 text-gray-300 hover:border-emerald-500/60 hover:text-emerald-400 disabled:opacity-30 transition-all"
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
          class="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-700 text-gray-300 hover:border-emerald-500/60 hover:text-emerald-400 disabled:opacity-30 transition-all"
        >
          Next ›
        </button>
      </div>
    </div>
  </div>

  <!-- ADD MODAL -->
  <div v-if="add" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
    <div class="bg-[#0d0d0d] rounded-2xl shadow-lg border border-emerald-700 w-full max-w-lg p-6 space-y-4">
      <div class="flex items-center justify-between border-b border-gray-700 pb-3">
        <h3 class="text-xl font-semibold text-emerald-400">Add Animal for Vaccination</h3>
        <button @click="add = false" class="text-gray-400 hover:text-red-500 text-xl">✕</button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
          <label for="code" class="block mb-2 text-sm font-semibold text-emerald-300">Animal Code:</label>
          <div class="flex items-center gap-2">
            <input
              id="code"
              v-model="code"
              type="text"
              placeholder="Enter animal ID..."
              class="w-full rounded-full border border-gray-700 bg-[#1a1a1a] text-gray-200 px-4 py-2.5 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            />
             <div class="flex-shrink-0">
              <svg
                v-if="animalExists && code"
                class="w-5 h-5 text-yellow-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>

              <svg
                v-else-if="!animalExists && code"
                class="w-5 h-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
            <svg
              @click="checkAnimal"
              class="w-6 h-6 text-emerald-400 cursor-pointer hover:text-emerald-300 transition"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

          <div class="flex flex-col justify-end">
           
          </div>

          <div>
            <label class="text-sm font-medium text-gray-300">Start Date</label>
            <input
              v-model="startTimeAdd"
              type="date"
              class="w-full bg-[#1a1a1a] border border-emerald-600 rounded-lg px-3 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-300">End Date</label>
            <input
              v-model="endTimeAdd"
              type="date"
              class="w-full bg-[#1a1a1a] border border-emerald-600 rounded-lg px-3 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-300">Notes</label>
          <textarea
            v-model="notesAdd"
            rows="3"
            class="w-full bg-[#1a1a1a] border border-emerald-600 rounded-lg px-3 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="Write notes here..."
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg py-2.5 font-semibold shadow-md transition"
        >
          ➕ Add Vaccination
        </button>
      </form>
    </div>
  </div>

  <!-- UPDATE MODAL -->
  <div v-if="update" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
    <div class="bg-[#0d0d0d] rounded-2xl shadow-lg border border-emerald-700 w-full max-w-lg p-6 space-y-4">
      <div class="flex items-center justify-between border-b border-gray-700 pb-3">
        <h3 class="text-xl font-semibold text-emerald-400">Update Vet Visit</h3>
        <button @click="update = false" class="text-gray-400 hover:text-red-500 text-xl">✕</button>
      </div>

      <form @submit.prevent="handleUpdate" class="space-y-4">
        <div>
          <label class="text-sm font-medium text-gray-300">Start Time</label>
          <input
            type="datetime-local"
            v-model="startTime"
            class="w-full bg-[#1a1a1a] border border-emerald-600 rounded-lg px-3 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-300">End Time</label>
          <input
            type="datetime-local"
            v-model="endTime"
            class="w-full bg-[#1a1a1a] border border-emerald-600 rounded-lg px-3 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-300">Notes</label>
          <textarea
            v-model="notes"
            rows="4"
            class="w-full bg-[#1a1a1a] border border-emerald-600 rounded-lg px-3 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg py-2.5 font-semibold shadow-md transition"
        >
          💾 Update
        </button>
      </form>
    </div>
  </div>

  <!-- SINGLE ITEM MODAL -->
  <div v-if="single" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto">
    <div class="bg-[#0d0d0d] rounded-2xl shadow-lg border border-emerald-700 w-full max-w-2xl p-6 space-y-4">
      <div class="flex items-center justify-between border-b border-gray-700 pb-3">
        <h3 class="text-xl font-semibold text-emerald-400">Animal Details</h3>
        <button @click="single = false" class="text-gray-400 hover:text-red-500 text-xl">✕</button>
      </div>

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div class="col-span-2">
          <label class="font-medium text-gray-300">Start Time</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ formatDate(singleItem.startTime) }}</div>
        </div>

        <div class="col-span-2">
          <label class="font-medium text-gray-300">End Time</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ formatDate(singleItem.endTime) }}</div>
        </div>

        <div class="col-span-2">
          <label class="font-medium text-gray-300">Visit Type</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ singleItem.typeOfVisit }}</div>
        </div>

        <div class="col-span-2">
          <label class="font-medium text-gray-300">Notes</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ singleItem.notes }}</div>
        </div>

        <div class="col-span-2 mt-4 border-t border-gray-700 pt-3">
          <h4 class="text-lg text-emerald-400 font-semibold">Animal Info</h4>
        </div>
          <div class="col-span-2">
          <label class="font-medium text-gray-300">Code</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ itemsSingle.idAnimal }}</div>
        </div>
        <div class="col-span-2">
          <label class="font-medium text-gray-300">Animal Name</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ itemsSingle.name }}</div>
        </div>

        <div>
          <label class="font-medium text-gray-300">Family</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ itemsSingle.family }}</div>
        </div>

        <div>
          <label class="font-medium text-gray-300">Species</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ itemsSingle.species }}</div>
        </div>

        <div>
          <label class="font-medium text-gray-300">Subspecies</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ itemsSingle.subspecies }}</div>
        </div>

        <div>
          <label class="font-medium text-gray-300">Age</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ itemsSingle.age }}</div>
        </div>

        <div>
          <label class="font-medium text-gray-300">Gender</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ itemsSingle.gender }}</div>
        </div>

        <div>
          <label class="font-medium text-gray-300">Weight</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ itemsSingle.weight }}</div>
        </div>

        <div>
          <label class="font-medium text-gray-300">Height</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ itemsSingle.height }}</div>
        </div>

        <div>
          <label class="font-medium text-gray-300">Length</label>
          <div class="p-2 border border-emerald-700 rounded-lg text-gray-300">{{ itemsSingle.length }}</div>
        </div>

        <!-- Checkboxes -->
        <div class="col-span-2 flex flex-wrap gap-4 mt-2">
          <label class="inline-flex items-center space-x-2 text-gray-300">
            <input type="checkbox" v-model="itemsSingle.neutered" disabled class="form-checkbox text-emerald-600" />
            <span>Neutered</span>
          </label>

          <label class="inline-flex items-center space-x-2 text-gray-300">
            <input type="checkbox" v-model="itemsSingle.vaccinated" disabled class="form-checkbox text-emerald-600" />
            <span>Vaccinated</span>
          </label>

          <label class="inline-flex items-center space-x-2 text-gray-300">
            <input type="checkbox" v-model="itemsSingle.microchipped" disabled class="form-checkbox text-emerald-600" />
            <span>Microchipped</span>
          </label>

          <label class="inline-flex items-center space-x-2 text-gray-300">
            <input type="checkbox" v-model="itemsSingle.trained" disabled class="form-checkbox text-emerald-600" />
            <span>Trained</span>
          </label>

          <label class="inline-flex items-center space-x-2 text-gray-300">
            <input type="checkbox" v-model="itemsSingle.socialized" disabled class="form-checkbox text-emerald-600" />
            <span>Socialized</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import WorkerNavigation from '../Vet/VetNavigation.vue';
import instance from '@/axiosBase';
import Loading from '../Loading.vue';
  import Swal from 'sweetalert2'
export default {
  components: {
    WorkerNavigation,
    Loading,

  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 6,
      userRole: localStorage.getItem('userRole'),  
      loadingError:false,
      generalSearchQuery: '',
      add:false,
      code: '',
      startTimeAdd: '',
      endTimeAdd: '',
      typeOfVisitAdd: 'Vaccination',
      notesAdd: '',
            update: false,
            idUpdate: null,
            startTime: '',
            endTime: '',
            notes: '',
        
      animalExists: null,
      items: [],
          animalIdSingle: '',
          single: false,
          singleItem:[],
          itemsSingle: [],
      filters: {
        startTime: '',
        endTime: '',
        typeOfVisit: 'Vaccination', 
        today: this.getTodayDate(),
      },
      // Početno stanje učitavanja
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
    const generalQuery = this.generalSearchQuery?.toLowerCase().trim() || '';

     const filtered =  this.items.filter(item => {
      const startTimeMatch = this.formatDate(item.startTime)?.toLowerCase().includes(generalQuery);
      const endTimeMatch = this.formatDate(item.endTime)?.toLowerCase().includes(generalQuery);
      const typeMatch = item.typeOfVisit?.toLowerCase().includes(generalQuery);
      const notesMatch = item.notes?.toLowerCase().includes(generalQuery);
const idAnimal = item.animalId?.toString().toLowerCase().includes(generalQuery);
      return startTimeMatch || endTimeMatch || typeMatch || notesMatch || idAnimal;
    });
     filtered.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  // i tek sada vraćamo rezultat
  return filtered;
  }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    nextPage() {
  if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleString('hr-HR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },
     openUpdateModal(item) {
      this.update = true;
      this.idUpdate = item.id;
      // Pretvori date string u format 'YYYY-MM-DDTHH:mm' za datetime-local input
      this.startTime = item.startTime ? item.startTime.slice(0, 16) : '';
      this.endTime = item.endTime ? item.endTime.slice(0, 16) : '';
      this.notes = item.notes || '';
    },
    async handleUpdate() {
      try {
        await instance.put("animal/updateVetVisitsDomain", {
          id: this.idUpdate,
          startTime: this.startTime,
          endTime: this.endTime,
          notes: this.notes
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });

        await Swal.fire({
          title: "Vet visit updated!",
          icon: "success",
          draggable: true,
        });

        this.update = false;
        window.location.reload();
      } catch (error) {
        await Swal.fire({
          title: "Oops!",
          text: "Failed to update vet visit. Try again.",
          icon: "warning",
          draggable: true,
        });
      }
    },
  
          async openSinglModal(item) {
            this.single = true;
            console.log(item);
            this.singleItem = item;
            console.log(this.singleItem);
            this.animalIdSingle = item.animalId;
            console.log(this.animalIdSingle);
          this.loadingError=true;
            const animalResponse = await instance.get(`animal/allanimal/${this.animalIdSingle}`);
                this.itemsSingle = animalResponse.data;
                if(this.itemsSingle!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                } 
                else {
                  this.loadingError = true;
                }
                console.log(this.itemsSingle);
          },


           async handleSubmit(){
              try{
                this.loadingError=true;
                const response = await instance.post('animal/addVetVisit',{
                  animalId: parseInt(this.registerId),
                  startTime: `${this.startTimeAdd}T00:00:00.00`,
                  endTime:`${this.endTimeAdd}T00:00:00.00` ,
                  typeOfVisit: this.typeOfVisitAdd,
                  notes: this.notesAdd
                },
                {
                    headers: {
                      Authorization: `Bearer ${this.token}`,  
                    },
                  } );
                        if(response.status==200) {
                          await  Swal.fire({
                                  title: "Item added!",
                                  draggable: true,
                                  icon: "success"
                                });
                        window.location.reload();
                      }
                               
                             //window.location.reload();
                }
                  catch(error){
                           
                  
                                       await Swal.fire({
                                        title: "Ooops!",
                                        text: "There was an error!",
                                        draggable: true,
                                        icon: "error"
                                      });
                } },
    async checkAnimal() {
      try{
            const animalResponse = await instance.get(`animal/allanimal/${this.code}`);
            const animalData = animalResponse.data;
            
          this.registerId=animalData.idAnimal;
          console.log("Id animal:"+this.registerId);
          
            if(this.registerId!=null){
              this.animalExists=true;
            }
            else{
              this.animalExists=false;
            }
      }
      catch (error) {this.animalExists=false}
          
        },

    async fetchData() {
      try {
        this.loadingError=true;
        const response = await instance.get('animal/vetvisit_db');
        this.items = response.data.filter(item => item.typeOfVisit === 'Vaccination'); 
        console.log(this.items);
        if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                } 
      } catch (error) {
        this.loadingError = true;
        console.error('There was an error!', error);
      }
    },
    getTodayDate(endD) {
      const today = new Date();
      const endDate = new Date(endD);

      if(endDate >= today){
   
      return true;
      }
      else{  return false;}

    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    navigateToDetails(id) {
      // Implement navigation to details page
      console.log(`Navigate to details of item with ID: ${id}`);
    },
  },
 watch: {
  filters: {
    deep: true,
    handler() {
      this.currentPage = 1;
    },
  },
  generalSearchQuery() {
    this.currentPage = 1;
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
  