<template>
  <div class="flex min-h-screen  text-gray-200">
    <Loading v-if="loadingError" /> 

    <!-- Sidebar -->
    <div class="w-1/6 p-4">
      <WorkerNavigation />
    </div>

    <!-- Main content -->
    <div class="w-5/6 mr-8 mt-6 p-6 rounded-xl border border-gray-800 bg-[#111] shadow-2xl">
      <!-- Header bar -->
      <div class="bg-[#0b0b0b]rounded-t-xl px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.24 14.24a8 8 0 11-8.48-8.48m8.48 8.48L12 12m0 0L8.5 8.5M12 12l3.5-3.5"
            />
          </svg>
          <h1 class="text-2xl font-bold text-white">Quarantine</h1>
        </div>
        <button
          @click="add = true"
          :disabled="userRole !== 'HeadVet'"
          type="button"
          class="flex items-center bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-full px-5 py-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Quarantine
        </button>
      </div>

      <!-- Filters -->
      <div class="p-6 bg-[#0e0e0e] rounded-b-xl space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-emerald-300 mb-2">Start Date:</label>
            <input
              v-model="filters.startTime"
              type="date"
              class="w-full bg-gray-900 border border-gray-700 rounded-full px-4 py-2 text-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="dd.mm.gggg."
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-emerald-300 mb-2">End Date:</label>
            <input
              v-model="filters.endTime"
              type="date"
              class="w-full bg-gray-900 border border-gray-700 rounded-full px-4 py-2 text-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="dd.mm.gggg."
            />
          </div>
        </div>

        <!-- Search -->
        <div class="relative w-full">
          <input
            v-model="generalSearchQuery"
            type="text"
            placeholder="Search..."
            class="w-full bg-gray-900 border border-gray-700 rounded-full px-5 py-2 text-gray-300 placeholder-gray-500 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <div class="absolute right-4 top-2.5 text-emerald-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" d="m21 21-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto rounded-xl border border-gray-800 shadow-inner">
          <table class="min-w-full text-left text-sm text-gray-300">
            <thead class="bg-gray-900 text-emerald-300 uppercase text-xs">
              <tr>
                <th class="px-6 py-3"></th>
                <th class="px-6 py-3">Start Time</th>
                <th class="px-6 py-3">End Time</th>
                <th class="px-6 py-3">Type of Visit</th>
                <th class="px-6 py-3">Notes</th>
                <th class="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
          <tbody>
  <tr
    v-for="item in paginatedItems"
    :key="item.id"
    :class="{
      'bg-gray-900/30 cursor-not-allowed': !getTodayDate(item.endTime),
      'hover:bg-gray-800/30 cursor-pointer transition': getTodayDate(item.endTime)
    }"
    class="border-b border-gray-800 transition"
  >
    <!-- ikona -->
    <td
      class="px-6 py-4 text-center"
      :class="{
        'text-gray-500 opacity-70': !getTodayDate(item.endTime),
        'text-emerald-400': getTodayDate(item.endTime)
      }"
    >
      <svg
        @click="openSinglModal(item)"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        class="w-6 h-6 mx-auto transition"
        :class="getTodayDate(item.endTime) ? 'cursor-pointer hover:text-emerald-300' : 'cursor-not-allowed text-gray-600 opacity-70'"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 11h2v5m-2 0h4m-2.6-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </td>

    <!-- start -->
    <td
      class="px-6 py-4 text-center font-medium"
      :class="{
        'text-gray-500 opacity-70': !getTodayDate(item.endTime),
        'text-gray-200': getTodayDate(item.endTime)
      }"
    >
      {{ formatDate(item.startTime) }}
    </td>

    <!-- end -->
    <td
      class="px-6 py-4 text-center font-medium"
      :class="{
        'text-gray-500 opacity-70': !getTodayDate(item.endTime),
        'text-gray-200': getTodayDate(item.endTime)
      }"
    >
      {{ formatDate(item.endTime) }}
    </td>

    <!-- type -->
    <td
      class="px-6 py-4 text-center"
      :class="{
        'text-gray-500 italic opacity-70': !getTodayDate(item.endTime),
        'text-gray-300': getTodayDate(item.endTime)
      }"
    >
      {{ item.typeOfVisit }}
    </td>

    <!-- notes -->
    <td
      class="px-6 py-4 text-center"
      :class="{
        'text-gray-500 opacity-70 italic': !getTodayDate(item.endTime),
        'text-gray-300': getTodayDate(item.endTime)
      }"
    >
      {{ item.notes }}
    </td>

    <!-- button -->
    <td class="px-6 py-4 text-center">
      <button
        @click="done(item.animalId)"
        :disabled="!getTodayDate(item.endTime)"
        class="flex items-center justify-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium transition"
        :class="getTodayDate(item.endTime)
          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
          : 'bg-gray-700 text-gray-400 opacity-60 cursor-not-allowed'"
      >
        Done
      </button>
    </td>
  </tr>
</tbody>

          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center py-6 space-x-4">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-1 rounded-lg border border-gray-700 text-gray-400 hover:text-emerald-400 hover:border-emerald-400 disabled:opacity-30 transition"
          >
            ‹ Prev
          </button>

          <span class="text-sm text-gray-400">
            Page <span class="text-emerald-400 font-semibold">{{ currentPage }}</span> of
            <span class="text-emerald-400 font-semibold">{{ totalPages }}</span>
          </span>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-1 rounded-lg border border-gray-700 text-gray-400 hover:text-emerald-400 hover:border-emerald-400 disabled:opacity-30 transition"
          >
            Next ›
          </button>
        </div>
      </div>
    </div>
  </div>



<!-- Add Animal Modal -->
<div
  v-if="add"
  class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300"
>
  <div class="relative w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-gray-700 pb-3 mb-5">
      <h3 class="text-xl font-semibold text-emerald-400">Add Animal to Quarantine</h3>
      <button
        @click="add = false"
        type="button"
        class="text-gray-400 hover:text-red-500 transition"
      >
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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

    <!-- Body -->
    <form @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-4">
      <!-- Animal Code -->
      <div class="col-span-2 sm:col-span-1">
        <label for="code" class="block mb-1 text-sm font-semibold text-emerald-300">Animal Code</label>
        <div class="flex items-center">
          <input
            type="text"
            id="code"
            v-model="code"
            class="w-full bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-gray-500"
          />
          <div class="ml-2">
            <!-- Green Check -->
            <svg
              v-if="this.animalExists && this.animalExists!=null && this.code"
              class="w-5 h-5 fill-yellow-400"
              viewBox="0 0 448 512"
            >
              <path
                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 
                45.3l-256 256c-12.5 12.5-32.8 
                12.5-45.3 0l-128-128c-12.5-12.5-
                12.5-32.8 0-45.3s32.8-12.5 
                45.3 0L160 338.7 393.4 
                105.4c12.5-12.5 32.8-12.5 45.3 0z"
              />
            </svg>
            <!-- Red X -->
            <svg
              v-if="!this.animalExists && this.animalExists!=null && this.code"
              class="w-5 h-5 fill-red-600"
              viewBox="0 0 384 512"
            >
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 
                0-45.3s-32.8-12.5-45.3 0L192 
                210.7 86.6 105.4c-12.5-12.5-
                32.8-12.5-45.3 0s-12.5 32.8 
                0 45.3L146.7 256 41.4 
                361.4c-12.5 12.5-12.5 32.8 
                0 45.3s32.8 12.5 45.3 0L192 
                301.3 297.4 406.6c12.5 12.5 
                32.8 12.5 45.3 0s12.5-32.8 
                0-45.3L237.3 256 342.6 
                150.6z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Check Button -->
      <div class="col-span-2 sm:col-span-1 flex flex-col justify-end">
        <label class="block mb-1 text-sm font-semibold text-emerald-300">Check</label>
        <svg
          @click="checkAnimal"
          class="w-7 h-7 text-emerald-400 hover:text-emerald-500 cursor-pointer transition"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 
          0 7 7 0 0 1 14 0Z" />
        </svg>
      </div>

      <!-- Start Date -->
      <div class="col-span-2 sm:col-span-1">
        <label for="dateStartAdd" class="block mb-1 text-sm font-semibold text-emerald-300">Start Date</label>
        <input
          type="date"
          v-model="startTimeAdd"
          id="dateStartAdd"
          class="w-full bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          required
        />
      </div>

      <!-- End Date -->
      <div class="col-span-2 sm:col-span-1">
        <label for="dateEndAdd" class="block mb-1 text-sm font-semibold text-emerald-300">End Date</label>
        <input
          type="date"
          v-model="endTimeAdd"
          id="dateEndAdd"
          class="w-full bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          required
        />
      </div>

      <!-- Notes -->
      <div class="col-span-2">
        <label for="description" class="block mb-1 text-sm font-semibold text-emerald-300">Notes</label>
        <textarea
          id="description"
          v-model="notesAdd"
          rows="3"
          placeholder="Write notes here..."
          class="w-full bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div class="col-span-2 flex justify-center mt-2">
        <button
          type="submit"
          class="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg px-5 py-2 shadow-lg transition"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 
              110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 
              0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Add
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Single Item Modal -->
<div
  v-if="single"
  class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300"
>
  <div
    class="relative w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-gray-700 pb-3 mb-5">
      <h3 class="text-xl font-semibold text-emerald-400">Animal Details</h3>
      <button
        @click="single = false"
        type="button"
        class="text-gray-400 hover:text-red-500 transition"
      >
        <svg
          class="w-5 h-5"
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

    <!-- Body -->
    <div class="grid grid-cols-2 gap-4 text-gray-300">
      <!-- Basic info -->
      <div>
        <label class="block mb-1 text-sm font-semibold text-emerald-300">Start Time</label>
        <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          {{ formatDate(singleItem.startTime) }}
        </div>
      </div>

      <div>
        <label class="block mb-1 text-sm font-semibold text-emerald-300">End Time</label>
        <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          {{ formatDate(singleItem.endTime) }}
        </div>
      </div>

      <div class="col-span-2">
        <label class="block mb-1 text-sm font-semibold text-emerald-300">Visit Type</label>
        <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          {{ singleItem.typeOfVisit }}
        </div>
      </div>

      <div class="col-span-2">
        <label class="block mb-1 text-sm font-semibold text-emerald-300">Notes</label>
        <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          {{ singleItem.notes }}
        </div>
      </div>

      <!-- Animal info -->
      <div class="col-span-2">
        <label class="block mb-1 text-sm font-semibold text-emerald-300">Animal Name</label>
        <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          {{ itemsSingle.name }}
        </div>
      </div>

      <div>
        <label class="block mb-1 text-sm font-semibold text-emerald-300">Family</label>
        <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          {{ itemsSingle.family }}
        </div>
      </div>

      <div>
        <label class="block mb-1 text-sm font-semibold text-emerald-300">Species</label>
        <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          {{ itemsSingle.species }}
        </div>
      </div>

      <div>
        <label class="block mb-1 text-sm font-semibold text-emerald-300">Subspecies</label>
        <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          {{ itemsSingle.subspecies }}
        </div>
      </div>

      <div>
        <label class="block mb-1 text-sm font-semibold text-emerald-300">Age</label>
        <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          {{ itemsSingle.age }}
        </div>
      </div>

      <div>
        <label class="block mb-1 text-sm font-semibold text-emerald-300">Gender</label>
        <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          {{ itemsSingle.gender }}
        </div>
      </div>

      <div>
        <label class="block mb-1 text-sm font-semibold text-emerald-300">Weight</label>
        <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          {{ itemsSingle.weight }}
        </div>
      </div>

      <div>
        <label class="block mb-1 text-sm font-semibold text-emerald-300">Height</label>
        <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          {{ itemsSingle.height }}
        </div>
      </div>

      <div>
        <label class="block mb-1 text-sm font-semibold text-emerald-300">Length</label>
        <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          {{ itemsSingle.length }}
        </div>
      </div>

      <!-- Boolean fields -->
      <div v-for="(label, field) in {
          neutered: 'Neutered',
          vaccinated: 'Vaccinated',
          microchipped: 'Microchipped',
          trained: 'Trained',
          socialized: 'Socialized'
        }"
        :key="field"
        class="flex items-center space-x-3"
      >
        <div
          class="relative w-11 h-6 bg-gray-700 rounded-full border border-gray-600"
          :class="{ 'bg-green-700': itemsSingle[field] }"
        >
          <div
            class="absolute top-[2px] left-[2px] w-5 h-5 bg-gray-400 rounded-full transition-all"
            :class="{ 'translate-x-5 bg-white': itemsSingle[field] }"
          ></div>
        </div>
        <span class="text-sm font-medium text-gray-300">{{ label }}</span>
      </div>
    </div>
  </div>
</div>

</template>

<script>
//ispis životinja kojima je record Quarantine
import WorkerNavigation from '../Vet/VetNavigation.vue';
import instance from '@/axiosBase';
import Swal from 'sweetalert2';
import Loading from '../Loading.vue';

export default {
  components: {
    WorkerNavigation,
    Loading,

  },
  data() {
    return {
      currentPage: 1,     // trenutna stranica
    itemsPerPage: 15,   
       userRole: localStorage.getItem('userRole'),  
       generalSearchQuery: '',   
      loadingError:false,
      add: false,
      code: '',
      startTimeAdd: '',
      endTimeAdd: '',
      typeOfVisitAdd: 'Quarantine',
      notesAdd: '',
      animalExists: null,
      items: [],
          animalIdSingle: '',
          single: false,
          singleItem:[],
          itemsSingle: [],
      filters: {
        startTime: '',
        endTime: '',
        typeOfVisit: 'Quarantine', 
      },
    };
  },
  computed: {
     filteredItems() {
    const generalQuery = this.generalSearchQuery?.toLowerCase().trim() || '';

    return this.items.filter(item => {
      const startTimeMatch = this.formatDate(item.startTime)?.toLowerCase().includes(generalQuery);
      const endTimeMatch = this.formatDate(item.endTime)?.toLowerCase().includes(generalQuery);
      const typeMatch = item.typeOfVisit?.toLowerCase().includes(generalQuery);
      const notesMatch = item.notes?.toLowerCase().includes(generalQuery);
      const idAnimal = item.animalId?.toString().toLowerCase().includes(generalQuery);
      return startTimeMatch || endTimeMatch || typeMatch || notesMatch || idAnimal;
    });
  },

  // 🔽 DODAJ OVO
  totalPages() {
    return Math.max(1, Math.ceil(this.filteredItems.length / this.itemsPerPage));
  },

  paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(start, start + this.itemsPerPage);
  },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
      nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  },
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
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
    async done(id) {
      console.log("Id:" + id);
      var responser=  await instance.put(`animal/updateAnimalRecord/`,  { 
                            animalId:parseInt(id),
                            recordId:parseInt(4)
                              },
     {
         headers: {
           Authorization: `Bearer ${this.token}`,  
   
         },
       });
          console.log("response:" +responser.data);
            
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
                 else{
                  setTimeout(() => {
                this.loadingError = true; 
                }, 5000)
                this.$router.push(`/vetHome`);
                }
                console.log(this.itemsSingle);
          },
    async handleSubmit(){
   try{
    console.log("Animal code:"+this.code);
    var responser=  await instance.put(`animal/updateAnimalRecord/`,  { 
                            animalId:parseInt(this.code),
                            recordId:parseInt(3)
                        },
     {
         headers: {
           Authorization: `Bearer ${this.token}`,  
   
         },
       });

         
     const response = await instance.post('animal/addVetVisit',{
      animalId:parseInt( this.code),
      startTime: `${this.startTimeAdd}T00:00:00.00`,
      endTime:`${this.endTimeAdd}T00:00:00.00` ,
      typeOfVisit: this.typeOfVisitAdd,
      notes: this.notesAdd              
     },
     {
         headers: {
           Authorization: `Bearer ${this.token}`,  
   
         },
       });
  
      await Swal.fire({
              title: "Item added!",
              draggable: true,
              icon: "success"
            });
       if(response.status === 200) {
          window.location.reload();
         }
   }
   catch(error){
          console.log("Animal:"+this.registerId);
          console.log("Start:"+this.startTimeAdd);
          console.log("End:"+this.endTimeAdd);
          console.log("Type:"+this.typeOfVisitAdd);
          console.log("Notes:"+this.notesAdd);
      
        console.error('There was an error!', error);
      await  Swal.fire({
              title: "Ooops!",
              text: "There was an error!",
              draggable: true,
              icon: "error"
            });

   }
   
   },
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
        this.loadingError = true; 
        const response = await instance.get('animal/vetvisit_db');
        this.items = response.data.filter(item => item.typeOfVisit === 'Quarantine'); 
        console.log(this.items);
        if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                }
      } catch (error) {
        console.error('There was an error!', error);
        this.loadingError = true; 
      }
    },
    getTodayDate(endD) {

const today = new Date();
const endDate = new Date(endD);

if(endDate >= today){

return true;
}
else{console.log("f");  return false;}

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
      handler() {
        this.filteredItems = this.items.filter(item => {
          return (
            (!this.filters.startTime || item.startTime.includes(this.filters.startTime)) &&
            (!this.filters.endTime || item.endTime.includes(this.filters.endTime)) &&
            (!this.filters.typeOfVisit || item.typeOfVisit === this.filters.typeOfVisit)
          );
        });
      },
      deep: true,
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
  