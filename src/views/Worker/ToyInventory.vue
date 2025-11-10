<template>
  <div class="flex">
    <!-- 🧭 Sidebar -->
    <div class="w-1/6 text-gray-200 p-4  rounded-l-lg">
      <Loading v-if="loadingError" />
      <WorkerNavigation />
    </div>

    <!-- 📄 Glavni sadržaj -->
    <div class="w-5/6 text-gray-200 p-6 rounded-r-lg shadow-lg">
      
      <!-- 🎯 Glavni filter blok -->
      <div class="bg-[#1a1a1a] rounded-xl p-6 shadow-lg border border-gray-700/40">
        
        <!-- NASLOV + ADD GUMB -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-semibold text-white/90">
            Animal Toy Database
          </h1>

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
              />
            </svg>
            Add Toy
          </button>
        </div>

        <!-- FILTERI -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <!-- Brand -->
          <div>
            <label class="block text-gray-300 mb-1 font-medium">Brand Name</label>
            <select
              v-model="filters.brandName"
              id="brandName"
              class="w-full px-4 py-2 rounded-lg bg-[#0e0e0e] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            >
              <option value="">All</option>
              <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
          </div>

          <!-- Toy Type -->
          <div>
            <label class="block text-gray-300 mb-1 font-medium">Toy Type</label>
            <select
              v-model="filters.toyType"
              id="toyType"
              class="w-full px-4 py-2 rounded-lg bg-[#0e0e0e] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            >
              <option value="">All</option>
              <option v-for="type in toyTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>

          <!-- Animal Type -->
          <div>
            <label class="block text-gray-300 mb-1 font-medium">Animal Type</label>
            <select
              v-model="filters.animalType"
              id="animalType"
              class="w-full px-4 py-2 rounded-lg bg-[#0e0e0e] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            >
              <option value="">All</option>
              <option v-for="animal in animalTypes" :key="animal" :value="animal">{{ animal }}</option>
            </select>
          </div>

          <!-- Age Group -->
          <div>
            <label class="block text-gray-300 mb-1 font-medium">Age Group</label>
            <select
              v-model="filters.ageGroup"
              id="ageGroup"
              class="w-full px-4 py-2 rounded-lg bg-[#0e0e0e] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            >
              <option value="">All</option>
              <option v-for="age in ageGroups" :key="age" :value="age">{{ age }}</option>
            </select>
          </div>
        </div>

        <!-- SEARCH -->
        <div class="relative mt-3">
          <input
            v-model="generalSearchQuery"
            type="text"
            placeholder="Search toys..."
            class="w-full px-5 py-3 rounded-lg bg-[#0e0e0e] text-gray-200 placeholder-gray-500 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
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

      <!-- ovdje ide tvoja tablica ili lista -->
      <div class="mt-8">
        <!-- TODO: toys table -->
      </div>

   



   

    <div class="overflow-x-auto mt-6 custom-scrollbar">
  <table class="w-full border-separate border-spacing-y-3 bg-[#0e0e0e] rounded-xl shadow-lg">
    <thead>
      <tr class="text-gray-400 text-xs md:text-sm uppercase tracking-wider">
        <th class="px-6 py-3"></th>
        <th class="px-6 py-3 text-center">Brand Name</th>
        <th class="px-6 py-3 text-center">Name</th>
        <th class="px-6 py-3 text-center">Toy Type</th>
        <th class="px-6 py-3 text-center">Animal Type</th>
        <th class="px-6 py-3 text-center">Age Group</th>
        <th class="px-6 py-3 text-center">Quantity</th>
        <th class="px-6 py-3 text-center">Price</th>
        <th class="px-6 py-3 text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in paginatedItems"

        :key="item.id"
        class="bg-[#1a1a1a] hover:bg-[#242424] border border-gray-700/30 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
      >
        <!-- 👁 Info ikona -->
        <td class="px-6 py-5 text-center">
          <svg
            @click="openSinglModal(item)"
            class="w-6 h-6 text-emerald-400 hover:text-emerald-300 cursor-pointer transition"
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

        <!-- 🔤 Podaci -->
        <td class="px-6 py-5 text-white text-center font-semibold">{{ item.brandName }}</td>
        <td class="px-6 py-5 text-white text-center font-semibold">{{ item.name }}</td>
        <td class="px-6 py-5 text-gray-300 text-center">{{ item.toyType }}</td>
        <td class="px-6 py-5 text-gray-300 text-center">{{ item.animalType }}</td>
        <td class="px-6 py-5 text-gray-300 text-center">{{ item.ageGroup }}</td>
        <td class="px-6 py-5 text-gray-300 text-center">{{ item.quantity }}</td>
        <td class="px-6 py-5 text-gray-300 text-center">{{ item.price }} €</td>

        <!-- 🟢 Add i 🔴 Remove -->
        <td class="px-6 py-5 flex justify-center gap-3">
          <button
            @click="increment(item.id)"
            type="button"
            class="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition shadow-md"
          >
            <svg
              class="w-4 h-4"
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
              />
            </svg>
            Add
          </button>

          <button
            @click="decrement(item.id)"
            type="button"
            class="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition shadow-md"
          >
            <svg
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 
                0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 
                0-24-10.7-24-24s10.7-24 24-24z"
              />
            </svg>
            Remove
          </button>
        </td>
      </tr>
    </tbody>
  </table>
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
        <p class="text-gray-700 text-sm mt-5 text-center">
          Showing {{ filteredItems.length }} filtered results
        </p>
</div>
  </div>
</div>

<!-- 🟢 ADD TOY MODAL -->
<div v-if="add" class="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
  <div class="bg-[#0e0e0e] rounded-xl shadow-xl border border-gray-700/50 w-full max-w-md p-6">
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold text-white">Add Toy</h3>
      <button
        @click="add = false"
        class="text-gray-400 hover:text-emerald-400 transition"
      >
        ✕
      </button>
    </div>

    <!-- FORMA -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- BRAND -->
      <div>
        <label class="block text-gray-300 mb-1 font-medium">Brand Name</label>
        <input
          v-model="brandNameAdd"
          type="text"
          placeholder="Cuwex"
          class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200
                 border border-gray-700/40 focus:outline-none focus:ring-2
                 focus:ring-emerald-500/60"
          required
        />
      </div>

      <!-- NAME -->
      <div>
        <label class="block text-gray-300 mb-1 font-medium">Name</label>
        <input
          v-model="nameAdd"
          type="text"
          placeholder="Bone123"
          class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200
                 border border-gray-700/40 focus:outline-none focus:ring-2
                 focus:ring-emerald-500/60"
          required
        />
      </div>

      <!-- TOY TYPE -->
      <div>
        <label class="block text-gray-300 mb-1 font-medium">Toy Type</label>
        <input
          v-model="toyTypeAdd"
          type="text"
          placeholder="Bone"
          class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200
                 border border-gray-700/40 focus:outline-none focus:ring-2
                 focus:ring-emerald-500/60"
          required
        />
      </div>

      <!-- ANIMAL TYPE -->
      <div>
        <label class="block text-gray-300 mb-1 font-medium">Animal Type</label>
        <input
          v-model="animalTypeAdd"
          type="text"
          placeholder="Dog"
          class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200
                 border border-gray-700/40 focus:outline-none focus:ring-2
                 focus:ring-emerald-500/60"
          required
        />
      </div>

      <!-- AGE GROUP -->
      <div>
        <label class="block text-gray-300 mb-1 font-medium">Age Group</label>
        <input
          v-model="ageGroupAdd"
          type="text"
          placeholder="2-5"
          class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200
                 border border-gray-700/40 focus:outline-none focus:ring-2
                 focus:ring-emerald-500/60"
          required
        />
      </div>

      <!-- DIMENZIJE -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Width (cm)</label>
          <input
            v-model="widthAdd"
            type="number"
            min="0"
            step="0.01"
            placeholder="5.50"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200
                   border border-gray-700/40 focus:outline-none focus:ring-2
                   focus:ring-emerald-500/60"
            required
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Height (cm)</label>
          <input
            v-model="heightAdd"
            type="number"
            min="0"
            step="0.01"
            placeholder="5.50"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200
                   border border-gray-700/40 focus:outline-none focus:ring-2
                   focus:ring-emerald-500/60"
            required
          />
        </div>
      </div>

      <!-- NOTES -->
      <div>
        <label class="block text-gray-300 mb-1 font-medium">Notes</label>
        <textarea
          v-model="notesAdd"
          rows="3"
          placeholder="Write description here..."
          class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200
                 border border-gray-700/40 focus:outline-none focus:ring-2
                 focus:ring-emerald-500/60"
        ></textarea>
      </div>

      <!-- QUANTITY / PRICE -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Quantity</label>
          <input
            v-model="quantityAdd"
            type="number"
            min="0"
            step="1"
            placeholder="10"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200
                   border border-gray-700/40 focus:outline-none focus:ring-2
                   focus:ring-emerald-500/60"
            required
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Price (€)</label>
          <input
            v-model="priceAdd"
            type="number"
            min="0"
            step="0.01"
            placeholder="10.00"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200
                   border border-gray-700/40 focus:outline-none focus:ring-2
                   focus:ring-emerald-500/60"
            required
          />
        </div>
      </div>

      <!-- SUBMIT GUMB -->
      <button
        type="submit"
        class="w-full py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-md"
      >
        Add Toy
      </button>
    </form>
    
  </div>
</div>



      
    <!-- 🟩 INFO (SINGLE ITEM) MODAL -->
<div v-if="single" class="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
  <div class="bg-[#0e0e0e] rounded-xl shadow-xl border border-gray-700/50 w-full max-w-md p-6">
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold text-white">Toy Details</h3>
      <button
        @click="single = false"
        class="text-gray-400 hover:text-emerald-400 transition"
      >
        ✕
      </button>
    </div>

    <!-- BODY -->
    <div class="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
      <!-- NAME -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Name</label>
        <div class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700/40">
          {{ singleItem.name }}
        </div>
      </div>

      <!-- BRAND -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Brand Name</label>
        <div class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700/40">
          {{ singleItem.brandName }}
        </div>
      </div>

      <!-- TOY TYPE -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Toy Type</label>
        <div class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700/40">
          {{ singleItem.toyType }}
        </div>
      </div>

      <!-- ANIMAL TYPE -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Animal Type</label>
        <div class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700/40">
          {{ singleItem.animalType }}
        </div>
      </div>

      <!-- AGE GROUP -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Age Group</label>
        <div class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700/40">
          {{ singleItem.ageGroup }}
        </div>
      </div>

      <!-- DIMENSIONS -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-gray-400 text-sm mb-1">Width</label>
          <div class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700/40">
            {{ singleItem.width }} cm
          </div>
        </div>
        <div>
          <label class="block text-gray-400 text-sm mb-1">Height</label>
          <div class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700/40">
            {{ singleItem.hight }} cm
          </div>
        </div>
      </div>

      <!-- QUANTITY -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Quantity</label>
        <div class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700/40">
          {{ singleItem.quantity }}
        </div>
      </div>

      <!-- PRICE -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Price</label>
        <div class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700/40">
          {{ singleItem.price }} €
        </div>
      </div>

      <!-- NOTES -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Notes</label>
        <div class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700/40 min-h-[80px] max-h-[150px] overflow-y-auto">
          {{ singleItem.notes || '—' }}
        </div>
      </div>
    </div>
  </div>
</div>



</template>

<script>
import Swal from 'sweetalert2'
import WorkerNavigation from './WorkerNavigation.vue';
import instance from '@/axiosBase';
import Loading from '../Loading.vue';

export default {
  components: {
    WorkerNavigation,
    Loading,

  },
  data() {
   
    return { 
      userRole: localStorage.getItem('userRole'),
       generalSearchQuery: '',
      loadingError:false,
      add: false,
      items: [],
      brands: [],
      toyTypes: [],
      animalTypes: [],
      ageGroups: [],
      brandNameAdd: '',
      nameAdd: '',
      toyTypeAdd: '',
      animalTypeAdd: '',
      ageGroupAdd: '',
      widthAdd: '',
      heightAdd: '',
      notesAdd: '',
      quantityAdd: '',
      priceAdd: '',

      single: false,
      singleItem:[],

      filters: {
        brandName: '',
        toyType: '',
        animalType: '',
        ageGroup: '',
      },
      pagination: {
  currentPage: 1,
  itemsPerPage: 15, 
},
      // Početno stanje učitavanja
    };
  },
  computed: {
    
  filteredItems() {
    const query = this.generalSearchQuery?.toLowerCase().trim() || '';

    return this.items.filter(item => {
      const brandMatch = item.brandName?.toLowerCase().includes(query);
      const nameMatch = item.name?.toLowerCase().includes(query);
      const typeMatch = item.toyType?.toLowerCase().includes(query);
      const animalMatch = item.animalType?.toLowerCase().includes(query);
      const ageGroupMatch = item.ageGroup?.toLowerCase().includes(query);
      const quantityMatch = item.quantity?.toString().toLowerCase().includes(query);
      const priceMatch = item.price?.toString().toLowerCase().includes(query);

      return (
        brandMatch ||
        nameMatch ||
        typeMatch ||
        animalMatch ||
        ageGroupMatch ||
        quantityMatch ||
        priceMatch
      );
    });
  
},
paginatedItems() {
  const start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
  const end = start + this.pagination.itemsPerPage;
  return this.filteredItems.slice(start, end);
},

totalPages() {
  return Math.ceil(this.filteredItems.length / this.pagination.itemsPerPage) || 1;
},


  },
  mounted() {
    this.fetchData();
  },
  methods: { 
    nextPage() {
  if (this.pagination.currentPage < this.totalPages) {
    this.pagination.currentPage++;
  }
},
prevPage() {
  if (this.pagination.currentPage > 1) {
    this.pagination.currentPage--;
  }
},
goToPage(page) {
  this.pagination.currentPage = page;
},

    async openSinglModal(item) {
      this.single = true;
      this.singleItem = item;
    
    },
   async handleSubmit() {
  try {
    // 1️⃣ Izračun troška
    const quantity = parseInt(this.quantityAdd);
    const price = parseFloat(this.priceAdd);
    const totalCost = parseFloat((quantity * price).toFixed(4));

    // 2️⃣ Dohvati trenutni balans (ID = 2)
    const balanceResponse = await instance.get("balans/2");
    let currentBalance = parseFloat(balanceResponse.data.balance);

    if (isNaN(currentBalance)) currentBalance = 0;
    currentBalance = parseFloat(currentBalance.toFixed(4));

    // 3️⃣ Provjera ima li dovoljno novca
    if (currentBalance < totalCost) {
      Swal.fire({
        title: "Not enough funds!",
        text: `You need ${totalCost.toFixed(2)} €, but only have ${currentBalance.toFixed(2)} € available.`,
        icon: "error",
      });
      return;
    }

    // 4️⃣ Izračun novog balansa
    const newBalance = parseFloat((currentBalance - totalCost).toFixed(4));

    console.log(`Current balance: ${currentBalance}, total cost: ${totalCost}`);
    console.log(`Updated balance: ${currentBalance} -> ${newBalance}`);

    // 5️⃣ Ažuriraj balans u bazi
    await instance.put("updateBalansDomain", {
      id: 2,
      balance: newBalance,
    });

    // 6️⃣ Dodaj transakciju
    await instance.post("addTransactions", {
      iban: null, // vanjski račun — nema IBAN-a za ovu transakciju
      ibanAnimalShelter: balanceResponse.data.iban ? balanceResponse.data.iban.toString() : null,
      type: "Toy Purchase",
      cost: totalCost,
      purpose: `Purchased ${quantity} toy(s) at ${price.toFixed(2)} € each`,
    });

    // 7️⃣ Dodaj igračku u bazu
    await instance.post(
      "animal/addToy",
      {
        brandName: this.brandNameAdd,
        name: this.nameAdd,
        animalType: this.animalTypeAdd,
        toyType: this.toyTypeAdd,
        ageGroup: this.ageGroupAdd,
        hight: parseFloat(this.heightAdd),
        width: parseFloat(this.widthAdd),
        quantity: quantity,
        notes: this.notesAdd,
        price: price,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    // 8️⃣ Potvrda uspjeha
    Swal.fire({
      title: "Toy Added!",
      text: `Added successfully and ${totalCost.toFixed(2)} € deducted from balance.`,
      icon: "success",
    });

    // 9️⃣ Zatvori modal i osvježi tablicu
    this.add = false;
    await this.fetchData();

  } catch (error) {
    console.error("Error adding toy:", error);

    Swal.fire({
      title: "Error!",
      text: "Something went wrong while adding the toy or updating the balance.",
      icon: "error",
    });
  }
},

    
    
    
    
    
  async increment(id) {
  try {
    // 1️⃣ Nađi igračku koja se povećava
    const toy = this.items.find(item => item.id === id);
    if (!toy) {
      Swal.fire({
        title: "Error!",
        text: "Toy not found.",
        icon: "error",
      });
      return;
    }

    const toyPrice = parseFloat(toy.price);

    // 2️⃣ Dohvati balans (ID = 2)
    const balanceResponse = await instance.get("balans/2");
    let currentBalance = parseFloat(balanceResponse.data.balance);

    if (isNaN(currentBalance)) currentBalance = 0;
    currentBalance = parseFloat(currentBalance.toFixed(4));

    // 3️⃣ Provjeri ima li dovoljno novca
    if (currentBalance < toyPrice) {
      Swal.fire({
        title: "Not enough funds!",
        text: `You need ${toyPrice.toFixed(2)} €, but only have ${currentBalance.toFixed(2)} € available.`,
        icon: "error",
      });
      return;
    }

    // 4️⃣ Izračunaj novi balans (zaokružen na 4 decimale)
    const newBalance = parseFloat((currentBalance - toyPrice).toFixed(4));

    console.log(`Current balance: ${currentBalance}, Toy price: ${toyPrice}`);
    console.log(`Updated balance: ${currentBalance} -> ${newBalance}`);

    // 5️⃣ Ažuriraj balans u bazi
    await instance.put("updateBalansDomain", {
      id: 2,
      balance: newBalance,
    });

    // 6️⃣ Dodaj transakciju
    await instance.post("addTransactions", {
      iban: null, // vanjski IBAN — nema
      ibanAnimalShelter: balanceResponse.data.iban ? balanceResponse.data.iban.toString() : null,
      type: "Toy Purchase",
      cost: toyPrice,
      purpose: `Purchased 1 toy (${toy.name})`,
    });

    // 7️⃣ Povećaj količinu igračke u bazi
    await instance.put("animal/updateToyDomainIncrement", { id });

    // 8️⃣ Poruka uspjeha
    Swal.fire({
      title: "Toy Added!",
      text: `1 toy added and ${toyPrice.toFixed(2)} € deducted from balance.`,
      icon: "success",
    });

    // 9️⃣ Osvježi tablicu
    await this.fetchData();

  } catch (error) {
    console.error("Error in increment:", error);

    Swal.fire({
      title: "Error!",
      text: "Something went wrong while updating balance or adding toy.",
      icon: "error",
    });
  }
},




},
    async fetchData() {
      try {
        this.loadingError = true;
        const response = await instance.get('animal/toys_db');
        this.items = response.data;
        if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                }
        console.log(this.items);
        this.populateFilters();
        
      } catch (error) {
        setTimeout(() => {
                this.loadingError = true; 
                }, 5000)
                this.$router.push(`/workerHome`);
        console.error('There was an error!', error);
        
      }
    },
    populateFilters() {
      this.brands = [...new Set(this.items.map(item => item.brandName))];
      this.toyTypes = [...new Set(this.items.map(item => item.toyType))];
      this.animalTypes = [...new Set(this.items.map(item => item.animalType))];
      this.ageGroups = [...new Set(this.items.map(item => item.ageGroup))];
    },
    navigateToDetails(id) {
      this.$router.push(`/singleToy/${id}`);
      console.log(`Navigate to details of item with ID: ${id}`);
    },
  

  watch: {
    filters: {
      handler() {
        this.filteredItems = this.items.filter(item => {
          return (
            (!this.filters.brandName || item.brandName === this.filters.brandName) &&
            (!this.filters.toyType || item.toyType === this.filters.toyType) &&
            (!this.filters.animalType || item.animalType === this.filters.animalType) &&
            (!this.filters.ageGroup || item.ageGroup === this.filters.ageGroup)
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
  