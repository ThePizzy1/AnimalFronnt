<template>
  <div class="flex">
    <!-- Navigacija -->
    <div class="w-1/6 text-stone-200 p-4 rounded-l-lg">
      <Loading v-if="loadingError" /> 
      <WorkerNavigation />
    </div>

    <!-- Glavni sadržaj -->
    <div class="w-5/6 text-gray-200 p-6 rounded-r-xl shadow-lg">
      <!-- NASLOV + ADD GUMB -->
     

      <!-- FILTERI -->
      <div class="bg-[#1a1a1a] rounded-xl p-6 shadow-md border border-gray-700/40 ">
         <div class="flex justify-between items-center  mb-3">
        <h1 class="text-2xl font-semibold text-white/90">
          Animal Food Database
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
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 
                 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 
                 24-24h64V168c0-13.3 10.7-24 
                 24-24s24 10.7 24 24v64h64c13.3 
                 0 24 10.7 24 24s-10.7 24-24 
                 24H280v64c0 13.3-10.7 24-24 
                 24s-24-10.7-24-24z"
            />
          </svg>
          Add Food
        </button>
      </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
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

          <!-- Food Type -->
          <div>
            <label class="block text-gray-300 mb-1 font-medium">Food Type</label>
            <select
              v-model="filters.foodType"
              id="foodType"
              class="w-full px-4 py-2 rounded-lg bg-[#0e0e0e] text-gray-200 border border-gray-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            >
              <option value="">All</option>
              <option v-for="type in foodTypes" :key="type" :value="type">{{ type }}</option>
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


<div class="relative mt-1">
          <input
            v-model="generalSearchQuery"
            type="text"
            placeholder="Search food..."
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

  

 





    <div class="overflow-x-auto mt-6 custom-scrollbar">
  <table class="w-full border-separate border-spacing-y-3 bg-[#0e0e0e] rounded-xl shadow-lg">
    <thead>
      <tr class="text-gray-400 text-xs md:text-m uppercase tracking-wider">
        <th class="px-6 py-3"></th>
        <th class="px-6 py-3 text-center">Brand Name</th>
        <th class="px-6 py-3 text-center">Name</th>
        <th class="px-6 py-3 text-center">Food Type</th>
        <th class="px-6 py-3 text-center">Animal Type</th>
        <th class="px-6 py-3 text-center">Age Group</th>
        <th class="px-6 py-3 text-center">Weight</th>
        <th class="px-6 py-3 text-center">Expiration Date</th>
        <th class="px-6 py-3 text-center">Quantity</th>
        <th class="px-6 py-3 text-center">Price</th>
        <th class="px-6 py-3 text-center" colspan="2">Actions</th>
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
        <td class="px-6 py-5 text-gray-300 text-center">{{ item.foodType }}</td>
        <td class="px-6 py-5 text-gray-300 text-center">{{ item.animalType }}</td>
        <td class="px-6 py-5 text-gray-300 text-center">{{ item.ageGroup }} years</td>
        <td class="px-6 py-5 text-gray-300 text-center">{{ item.weight }}{{ item.measurementWeight }}</td>
        <td class="px-6 py-5 text-gray-300 text-center">{{ formatDate(item.exporationDate) }}</td>
        <td class="px-6 py-5 text-gray-300 text-center">{{ item.quantity }}</td>
        <td class="px-6 py-5 text-gray-300 text-center">{{ item.price }} €</td>

        <!-- 🟢 Add i 🔴 Remove -->
        <td class="px-6 py-5 text-center">
          <button
            @click="increment(item.id)"
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition shadow-md"
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
        </td>

        <td class="px-6 py-5 text-center">
          <button
            @click="decrement(item.id)"
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition shadow-md"
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



  <!-- 🟩 ADD FOOD MODAL -->
<div
  v-if="add"
  class="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
>
  <div
    class="bg-[#0e0e0e] rounded-xl shadow-xl border border-gray-700/50 w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] custom-scrollbar"
  >
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-5 border-b border-gray-700 pb-3">
      <h3 class="text-xl font-semibold text-white">Add Food</h3>
      <button
        @click="add = false"
        class="text-gray-400 hover:text-emerald-400 transition"
      >
        ✕
      </button>
    </div>

    <!-- FORM -->
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- 🔹 RED 1 -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Brand Name</label>
          <input
            v-model="brandNameAdd"
            type="text"
            placeholder="Cuwex"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Name</label>
          <input
            v-model="nameAdd"
            type="text"
            placeholder="Bone123"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
      </div>

      <!-- 🔹 RED 2 -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Food Type</label>
          <input
            v-model="foodTypeAdd"
            type="text"
            placeholder="Dry / Wet / Snacks"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Animal Type</label>
          <input
            v-model="animalTypeAdd"
            type="text"
            placeholder="Dog"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
      </div>

      <!-- 🔹 RED 3 -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Age Group</label>
          <input
            v-model="ageGroupAdd"
            type="text"
            placeholder="2-5"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Expiration Date</label>
          <input
            v-model="exporationDateAdd"
            type="date"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
      </div>

      <!-- 🔹 RED 4 -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Weight</label>
          <input
            v-model="weightAdd"
            type="number"
            min="0"
            step="0.1"
            placeholder="5"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Measurement Units</label>
          <input
            v-model="measurementWeightAdd"
            type="text"
            placeholder="kg"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
      </div>

      <!-- 🔹 RED 5 -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Weight per Serving</label>
          <input
            v-model="weightPerServingAdd"
            type="number"
            min="0"
            step="0.1"
            placeholder="50"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Measurement Units</label>
          <input
            v-model="measurementPerServingAdd"
            type="text"
            placeholder="g"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
      </div>

      <!-- 🔹 RED 6 -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Calories per Serving</label>
          <input
            v-model="caloriesPerServingAdd"
            type="number"
            step="0.01"
            min="0"
            placeholder="2.5"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Fiber Content</label>
          <input
            v-model="fiberContentAdd"
            type="number"
            step="0.01"
            min="0"
            placeholder="2.5"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
      </div>

      <!-- 🔹 RED 7 -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Fat Content</label>
          <input
            v-model="fatContentAdd"
            type="number"
            step="0.01"
            min="0"
            placeholder="2.5"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Quantity</label>
          <input
            v-model="quantityAdd"
            type="number"
            step="1"
            min="0"
            placeholder="10"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
      </div>

      <!-- 🔹 RED 8 -->
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block text-gray-300 mb-1 font-medium">Price (€)</label>
          <input
            v-model="priceAdd"
            type="number"
            step="0.01"
            min="0"
            placeholder="10.00"
            class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            required
          />
        </div>
      </div>

      <!-- 🔹 NOTES -->
      <div>
        <label class="block text-gray-300 mb-1 font-medium">Notes</label>
        <textarea
          v-model="notesAdd"
          rows="3"
          placeholder="Write description here..."
          class="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
        ></textarea>
      </div>

      <!-- 🔘 SUBMIT GUMB -->
      <button
        type="submit"
        class="w-full py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-md"
      >
        Add Food
      </button>
    </form>
  </div>
</div>



      <!-- 🟢 SINGLE FOOD ITEM MODAL -->
<div
  v-if="single"
  class="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
>
  <div
    class="bg-[#0e0e0e] rounded-xl shadow-xl border border-gray-700/50 w-full max-w-lg p-6 overflow-y-auto max-h-[85vh] custom-scrollbar"
  >
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-5 border-b border-gray-700 pb-3">
      <h3 class="text-xl font-semibold text-white">Food Details</h3>
      <button
        @click="single = false"
        class="text-gray-400 hover:text-emerald-400 transition"
      >
        ✕
      </button>
    </div>

    <!-- BODY -->
    <div class="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
      <!-- 🔹 NAME -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Name</label>
        <div
          class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700"
        >
          {{ singleItem.name }}
        </div>
      </div>

      <!-- 🔹 BRAND -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Brand Name</label>
        <div
          class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700"
        >
          {{ singleItem.brandName }}
        </div>
      </div>

      <!-- 🔹 FOOD TYPE -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Food Type</label>
        <div
          class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700"
        >
          {{ singleItem.foodType }}
        </div>
      </div>

      <!-- 🔹 AGE GROUP -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Age Group</label>
        <div
          class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700"
        >
          {{ singleItem.ageGroup }}
        </div>
      </div>

      <!-- 🔹 WEIGHT -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-400 text-sm mb-1">Weight</label>
          <div
            class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700"
          >
            {{ singleItem.weight }}{{ singleItem.measurementWeight }}
          </div>
        </div>

        <div>
          <label class="block text-gray-400 text-sm mb-1">Calories per Serving</label>
          <div
            class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700"
          >
            {{ singleItem.caloriesPerServing }}{{ singleItem.measurementPerServing }}
          </div>
        </div>
      </div>

      <!-- 🔹 FAT / FIBER -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-400 text-sm mb-1">Fat Content</label>
          <div
            class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700"
          >
            {{ singleItem.fatContent }}
          </div>
        </div>
        <div>
          <label class="block text-gray-400 text-sm mb-1">Fiber Content</label>
          <div
            class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700"
          >
            {{ singleItem.fiberContent }}
          </div>
        </div>
      </div>

      <!-- 🔹 EXPIRATION -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Expiration Date</label>
        <div
          class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700"
        >
          {{ formatDate(singleItem.exporationDate) }}
        </div>
      </div>

      <!-- 🔹 QUANTITY -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Quantity</label>
        <div
          class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700"
        >
          {{ singleItem.quantity }}
        </div>
      </div>

      <!-- 🔹 PRICE -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Price</label>
        <div
          class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-200 border border-gray-700"
        >
          {{ singleItem.price }} €
        </div>
      </div>

      <!-- 🔹 NOTES -->
      <div>
        <label class="block text-gray-400 text-sm mb-1">Notes</label>
        <div
          class="bg-[#1a1a1a] px-4 py-2 rounded-lg text-gray-300 border border-gray-700 min-h-[80px] max-h-[150px] overflow-y-auto"
        >
          {{ singleItem.notes || '—' }}
        </div>
      </div>
    </div>
  </div>
</div>


</template>

    
  <script>
import Swal from "sweetalert2";
import WorkerNavigation from "./WorkerNavigation.vue";
import instance from "@/axiosBase";
import Loading from "../Loading.vue";

export default {
  components: {
    WorkerNavigation,
    Loading,
  },
  data() {
    return {
      userRole: localStorage.getItem("userRole"),
      generalSearchQuery: "",
      loadingError: false,
      add: false,
      items: [],
      brands: [],
      foodTypes: [],
      animalTypes: [],
      ageGroups: [],

      // ➕ ADD MODAL polja
      brandNameAdd: "",
      nameAdd: "",
      foodTypeAdd: "",
      animalTypeAdd: "",
      ageGroupAdd: "",
      weightAdd: "",
      caloriesPerServingAdd: "",
      weightPerServingAdd: "",
      measurementPerServingAdd: "",
      fatContentAdd: "",
      fiberContentAdd: "",
      exporationDateAdd: "",
      quantityAdd: "",
      notesAdd: "",
      measurementWeightAdd: "",
      priceAdd: "",

      // 🟢 SINGLE modal
      single: false,
      singleItem: [],

      // 🔍 Filteri
      filters: {
        brandName: "",
        foodType: "",
        animalType: "",
        ageGroup: "",
      },

      // 📄 Paginacija
      pagination: {
        currentPage: 1,
        itemsPerPage: 15,
      },
    };
  },

  computed: {
    // 🔍 Filtriranje i pretraga
    filteredItems() {
      const query = this.generalSearchQuery?.toLowerCase().trim() || "";

      return this.items.filter((item) => {
        // match pretrage
        const brandMatch = item.brandName?.toLowerCase().includes(query);
        const nameMatch = item.name?.toLowerCase().includes(query);
        const typeMatch = item.foodType?.toLowerCase().includes(query);
        const animalMatch = item.animalType?.toLowerCase().includes(query);
        const ageGroupMatch = item.ageGroup?.toLowerCase().includes(query);
        const weightMatch = item.weight?.toString().includes(query);
        const measurementMatch = item.measurementWeight
          ?.toLowerCase()
          .includes(query);
        const quantityMatch = item.quantity?.toString().includes(query);
        const priceMatch = item.price?.toString().includes(query);
        const expDateMatch = this.formatDate(item.exporationDate)
          ?.toLowerCase()
          .includes(query);

        // match filtera
        const filtersMatch =
          (!this.filters.brandName ||
            item.brandName === this.filters.brandName) &&
          (!this.filters.foodType ||
            item.foodType === this.filters.foodType) &&
          (!this.filters.animalType ||
            item.animalType === this.filters.animalType) &&
          (!this.filters.ageGroup || item.ageGroup === this.filters.ageGroup);

        return (
          filtersMatch &&
          (brandMatch ||
            nameMatch ||
            typeMatch ||
            animalMatch ||
            ageGroupMatch ||
            weightMatch ||
            measurementMatch ||
            quantityMatch ||
            priceMatch ||
            expDateMatch)
        );
      });
    },

    // 📄 Stranice — automatski se re-rendera
    paginatedItems() {
      const start =
        (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
      const end = start + this.pagination.itemsPerPage;
      return this.filteredItems.slice(start, end);
    },

    totalPages() {
      return (
        Math.ceil(this.filteredItems.length / this.pagination.itemsPerPage) || 1
      );
    },
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    // 🟢 MODALI
    async openSinglModal(item) {
      this.single = true;
      this.singleItem = item;
    },

// ➕/➖ QUANTITY
async increment(id) {
  try {
    // 1️⃣ Pronađi hranu
    const food = this.items.find(item => item.id === id);
    if (!food) {
      Swal.fire({
        title: "Error!",
        text: "Food item not found.",
        icon: "error",
      });
      return;
    }

    const foodPrice = parseFloat(food.price);

    // 2️⃣ Dohvati trenutni balans i IBAN
    const balanceResponse = await instance.get("animal/balans/1");
    let { balance, iban } = balanceResponse.data;

    let currentBalance = parseFloat(balance);
    console.log(`Current balance: ${currentBalance}, Food price: ${foodPrice}`);
    if (isNaN(currentBalance)) currentBalance = 0;

    // 3️⃣ Zaokruži na 4 decimale
    currentBalance = parseFloat(currentBalance.toFixed(4));

    // 4️⃣ Provjeri ima li dovoljno sredstava
    if (currentBalance < foodPrice) {
      Swal.fire({
        title: "Not enough funds!",
        text: `You need ${foodPrice.toFixed(2)} €, but only have ${currentBalance.toFixed(2)} € available.`,
        icon: "error",
      });
      return;
    }

    // 5️⃣ Izračunaj novi balans (zaokružen na 4 decimale)
    const newBalance = parseFloat((currentBalance - foodPrice).toFixed(4));

    // 6️⃣ Ažuriraj balans u bazi
    await instance.put("animal/updateBalansDomain", {
      id: 1,
      balance: newBalance,
    });

    console.log(`Updated balance: ${currentBalance} → ${newBalance}`);

    // 7️⃣ Dodaj transakciju
    await instance.post("animal/addTransactions", {
      iban: null, // vanjski račun
      ibanAnimalShelter: iban ? iban.toString() : null, // shelter račun
      type: "Food Purchase",
      cost: foodPrice,
      purpose: `Purchased 1 food item (${food.name})`,
    });

    // 8️⃣ Ažuriraj količinu hrane u bazi
    await instance.put("animal/updateFoodDomainIncrement", { id });

    // 9️⃣ Potvrda
    Swal.fire({
      title: "Food Added!",
      text: `1 food item added and ${foodPrice.toFixed(2)} € deducted from balance.`,
      icon: "success",
    });

    // 🔁 Osvježi tablicu
    await this.fetchData();

  } catch (error) {
    console.error("Error in increment:", error);

    Swal.fire({
      title: "Error!",
      text: "Something went wrong while updating balance or adding food.",
      icon: "error",
    });
  }
},
    async decrement(id) {
      try {
        const target = this.items.find((item) => item.id === id);
        if (target.quantity <= 0) {
          Swal.fire({
            title: "Ooops!",
            text: "You can't take more items, there are none left!",
            icon: "warning",
          });
          return;
        }
        await instance.put("animal/updateFoodDomainDecrement", { id });
        window.location.reload();
      } catch (error) {
        console.error("There was an error!", error);
      }
    },

    // 🟩 DODAVANJE FOODA
   async handleSubmit() {
  try {
    const quantity = parseInt(this.quantityAdd);
    const price = parseFloat(this.priceAdd);
    const totalCost = parseFloat((quantity * price).toFixed(4));

    // 1️⃣ Dohvati trenutni balans (ID = 1)
    const balanceResponse = await instance.get("animal/balans/1");
    let currentBalance = parseFloat(balanceResponse.data.balance);

    if (isNaN(currentBalance)) currentBalance = 0;
    currentBalance = parseFloat(currentBalance.toFixed(4));

    // 2️⃣ Provjeri ima li dovoljno novca
    if (currentBalance < totalCost) {
      Swal.fire({
        title: "Not enough funds!",
        text: `You need ${totalCost.toFixed(2)} €, but only have ${currentBalance.toFixed(2)} € available.`,
        icon: "error",
      });
      return;
    }

    // 3️⃣ Izračunaj i zaokruži novi balans
    const newBalance = parseFloat((currentBalance - totalCost).toFixed(4));

    console.log(`Current balance: ${currentBalance}, totalCost: ${totalCost}`);
    console.log(`Updated balance: ${currentBalance} -> ${newBalance}`);

    // 4️⃣ Ažuriraj balans u bazi
    await instance.put("animal/updateBalansDomain", {
      id: 1,
      balance: newBalance,
    });

    // 5️⃣ Dodaj transakciju
    await instance.post("animal/addTransactions", {
      iban: null, // vanjski IBAN (nema)
      ibanAnimalShelter: balanceResponse.data.iban ? balanceResponse.data.iban.toString() : null,
      type: "Food Purchase",
      cost: totalCost,
      purpose: `Purchased ${quantity} food items (${this.nameAdd})`,
    });

    // 6️⃣ Dodaj novu hranu u bazu
    await instance.post("animal/addFood", {
      Name: this.nameAdd,
      AgeGroup: this.ageGroupAdd,
      AnimalType: this.animalTypeAdd,
      BrandName: this.brandNameAdd,
      CaloriesPerServing: this.caloriesPerServingAdd,
      ExporationDate: `${this.exporationDateAdd}T00:00:00.00`,
      FatContent: this.fatContentAdd,
      FiberContent: this.fiberContentAdd,
      FoodType: this.foodTypeAdd,
      MeasurementPerServing: this.measurementPerServingAdd,
      MeasurementWeight: this.measurementWeightAdd,
      Notes: this.notesAdd,
      Quantity: quantity,
      Weight: parseFloat(this.weightAdd),
      WeightPerServing: parseFloat(this.weightPerServingAdd),
      Price: price,
    }, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    // 7️⃣ Uspjeh
    Swal.fire({
      title: "Food added!",
      text: `Added successfully and ${totalCost.toFixed(2)} € deducted from balance.`,
      icon: "success",
    });

    // 8️⃣ Zatvori modal i osvježi tablicu
    this.add = false;
    await this.fetchData();

  } catch (error) {
    console.error("Error adding food:", error);
    Swal.fire({
      title: "Error!",
      text: "Something went wrong while adding the food or updating the balance.",
      icon: "error",
    });
  }
},


    // 📦 DOHVAT PODATAKA
    async fetchData() {
      try {
        this.loadingError = true;
        const response = await instance.get("animal/food_db");
        this.items = response.data;

        if (this.items?.length) {
          setTimeout(() => {
            this.loadingError = false;
          }, 1000);
        }

        this.populateFilters();
      } catch (error) {
        console.error("There was an error!", error);
        setTimeout(() => {
          this.loadingError = true;
        }, 5000);
        this.$router.push(`/workerHome`);
      }
    },

    populateFilters() {
      this.brands = [...new Set(this.items.map((item) => item.brandName))];
      this.foodTypes = [...new Set(this.items.map((item) => item.foodType))];
      this.animalTypes = [...new Set(this.items.map((item) => item.animalType))];
      this.ageGroups = [...new Set(this.items.map((item) => item.ageGroup))];
    },

    // 📅 FORMAT DATUMA
    formatDate(date) {
      if (!date) return "";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },

    // 📄 PAGINACIJA GUMBI
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
  },

  watch: {
    filters: {
      handler() {
        this.pagination.currentPage = 1;
      },
      deep: true,
    },
    generalSearchQuery() {
      this.pagination.currentPage = 1;
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
  