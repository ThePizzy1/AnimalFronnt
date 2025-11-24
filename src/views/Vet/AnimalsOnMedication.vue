<template>
  <div class="container mx-auto px-6 py-10 text-gray-100  min-h-screen">
    <Loading v-if="loadingError" />

    <div class="flex">
      <!-- Sidebar -->
      <div class="w-1/6 p-4 ">
        <VetNavigation />
      </div>

      <!-- Main Content -->
      <div class="w-5/6 p-8 space-y-8 bg-[#0e0e0e] rounded-xl p-6 shadow-lg border border-white/10">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-emerald-400">💊 Animals on Medication</h1>
          <button
            @click="add = true"
            :disabled="userRole !== 'HeadVet'"
            type="button"
            class="flex items-center px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-md transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Medicine
          </button>
        </div>

        <!-- Filters -->
        <div class="grid grid-cols-3 gap-6">
          <div>
            <label for="nameOfMedicines" class="block text-sm font-medium text-gray-400 mb-2">Name</label>
            <select
              v-model="filters.nameOfMedicines"
              id="nameOfMedicines"
              class="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="">All</option>
              <option
                v-for="nameOfMedicine in nameOfMedicines"
                :key="nameOfMedicine"
                :value="nameOfMedicine"
              >
                {{ nameOfMedicine }}
              </option>
            </select>
          </div>

          <div>
            <label for="vetUsername" class="block text-sm font-medium text-gray-400 mb-2">Vet</label>
            <select
              v-model="filters.vetUsername"
              id="vetUsername"
              class="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="">All</option>
              <option v-for="vet in vetUsername" :key="vet" :value="vet">
                {{ vet }}
              </option>
            </select>
          </div>

          <div>
            <label for="usage" class="block text-sm font-medium text-gray-400 mb-2">Usage</label>
            <select
              v-model="filters.usage"
              id="usage"
              class="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="">All</option>
              <option v-for="use in usage" :key="use" :value="use">{{ use }}</option>
            </select>
          </div>
        </div>

        <!-- Search -->
        <div class="relative mt-6">
          <input
            v-model="generalSearchQuery"
            type="text"
            placeholder="Search medicines..."
            class="w-full bg-[#1a1a1a] border border-gray-700 rounded-full px-5 py-2 pr-12 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
          />
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </div>
        </div>

        <!-- Table -->
         <div class="overflow-x-auto rounded-xl border border-gray-800 shadow-inner">
          <table class="min-w-full text-left text-sm text-gray-300">
            <thead class="bg-gray-900 text-emerald-300 uppercase text-xs">
             <tr>
                <th class="px-4 py-3 text-center"></th>
                <th class="px-4 py-3 text-center font-semibold">Name</th>
                <th class="px-4 py-3 text-center font-semibold">Vet</th>
                <th class="px-4 py-3 text-center font-semibold">Amount</th>
                <th class="px-4 py-3 text-center font-semibold">Intake</th>
                <th class="px-4 py-3 text-center font-semibold">Frequency</th>
                <th class="px-4 py-3 text-center"></th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in filteredItems"
                :key="item.id"
                :class="{
                  'opacity-50 cursor-not-allowed': item.usage == false,
                  'hover:bg-[#202020] transition': item.usage != false
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
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 11h2v5m-2 0h4m-2.6-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                </td>

                <td class="px-4 py-4 text-center font-medium">{{ item.nameOfMedicines }}</td>
                <td class="px-4 py-4 text-center">{{ item.vetUsername }}</td>
                <td class="px-4 py-4 text-center">{{ item.amountOfMedicine + item.mesurmentUnit }}</td>
                <td class="px-4 py-4 text-center">{{ item.medicationIntake }}</td>
                <td class="px-4 py-4 text-center">{{ item.frequencyOfMedicationUse }}</td>

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
  </div>
<!-- Add Medicine Modal -->
<div v-if="add" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
  <div class="relative w-full max-w-2xl bg-[#121212] border border-gray-800 rounded-2xl shadow-2xl p-6">
    
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-gray-700 pb-3 mb-6">
      <h3 class="text-2xl font-semibold text-emerald-400 flex items-center gap-2">
        <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Create New Product
      </h3>
      <button
        @click="add = false"
        type="button"
        class="text-gray-400 hover:text-red-500 transition text-xl"
      >
        ✕
      </button>
    </div>

    <!-- Body -->
    <form @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-6">
      <!-- Name -->
      <div class="col-span-2">
        <label for="name" class="block text-sm font-medium text-gray-400 mb-2">Name</label>
        <input
          v-model="nameAdd"
          type="text"
          id="name"
          class="w-full bg-transparent border border-emerald-700 text-gray-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="Type product name"
          required
        />
      </div>

      <!-- Vet -->
      <div>
        <label for="username" class="block text-sm font-medium text-gray-400 mb-2">Veterinarian</label>
        <div class="flex items-center gap-2">
          <input
            v-model="username"
            id="username"
            type="text"
            class="w-full bg-transparent border border-emerald-700 text-gray-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <div>
            <svg v-if="this.userExists && this.userExists!=null && this.username" class="w-5 h-5 fill-yellow-400" viewBox="0 0 448 512">
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4z" />
            </svg>
            <svg v-if="!this.userExists && this.userExists!=null && this.username" class="w-5 h-5 fill-red-500" viewBox="0 0 384 512">
              <path     d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
               />
            </svg>
          </div>
        </div>
      </div>

      <!-- Vet check -->
      <div>
        <label class="block text-sm font-medium text-gray-400 mb-2">Check Vet</label>
        <button
          type="button"
          @click="checkUser"
          class="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 rounded-xl transition"
        >
          Check
        </button>
      </div>

      <!-- Animal code -->
      <div>
        <label for="code" class="block text-sm font-medium text-gray-400 mb-2">Animal code</label>
        <div class="flex items-center gap-2">
          <input
            v-model="code"
            id="code"
            type="text"
            class="w-full bg-transparent border border-emerald-700 text-gray-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <div>
          <svg v-if="this.animalExists  && code" class="w-5 h-5 fill-yellow-400" viewBox="0 0 448 512">
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4z" />
            </svg>
            <svg v-if="!this.animalExists  && code" class="w-5 h-5 fill-red-500" viewBox="0 0 384 512">
              <path     d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Animal check -->
      <div>
        <label class="block text-sm font-medium text-gray-400 mb-2">Check Animal</label>
        <button
          type="button"
          @click="checkAnimal"
          class="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 rounded-xl transition"
        >
          Check
        </button>
      </div>

      <!-- Amount -->
      <div>
        <label for="amountOfMedicine" class="block text-sm font-medium text-gray-400 mb-2">Amount of Medicine</label>
        <input
          v-model="amountOfMedicineAdd"
          id="amountOfMedicine"
          type="number"
          step="0.001"
          min="0"
          class="w-full bg-transparent border border-emerald-700 text-gray-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="0.25"
        />
      </div>

      <!-- Measurement -->
      <div>
        <label for="mesurmentUnit" class="block text-sm font-medium text-gray-400 mb-2">Measurement Unit</label>
        <input
          v-model="mesurmentUnitAdd"
          id="mesurmentUnit"
          type="text"
          class="w-full bg-transparent border border-emerald-700 text-gray-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="ml"
          required
        />
      </div>

      <!-- Intake -->
      <div>
        <label for="intake" class="block text-sm font-medium text-gray-400 mb-2">Medication Intake</label>
        <input
          v-model="intakeAdd"
          id="intake"
          type="number"
          step="1.0"
          min="0"
          class="w-full bg-transparent border border-emerald-700 text-gray-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="1"
          required
        />
      </div>

      <!-- Frequency -->
      <div>
        <label for="category" class="block text-sm font-medium text-gray-400 mb-2">Frequency</label>
        <select
          v-model="selected"
          id="category"
          class="w-full bg-neutral-900 border border-emerald-700 text-gray-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          <option disabled value="">Select Frequency</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      <!-- Description -->
      <div class="col-span-2">
        <label for="description" class="block text-sm font-medium text-gray-400 mb-2">Description</label>
        <textarea
          v-model="descriptionAdd"
          id="description"
          rows="3"
          class="w-full bg-transparent border border-emerald-700 text-gray-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="Write product description here..."
        ></textarea>
      </div>

      <!-- Submit -->
      <div class="col-span-2 mt-4">
        <button
          type="submit"
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-emerald-600/30 transition"
        >
          ➕ Add New Product
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Update Modal -->
<div v-if="update" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
  <div class="relative w-full max-w-2xl bg-[#121212] border border-gray-800 rounded-2xl shadow-2xl p-6">
    
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-gray-700 pb-3 mb-6">
      <h3 class="text-2xl font-semibold text-emerald-400 flex items-center gap-2">
        <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Update Medication Record
      </h3>
      <button
        @click="update = false"
        type="button"
        class="text-gray-400 hover:text-red-500 transition text-xl"
      >
        ✕
      </button>
    </div>

    <!-- Body -->
    <form @submit.prevent="handleUpdate(idUpdate)" class="grid grid-cols-2 gap-6">
      
      <!-- Amount of Medicine -->
      <div>
        <label for="amount" class="block text-sm font-medium text-gray-400 mb-2">Amount of Medicine</label>
        <input
          v-model="amountOfMedicineUpdate"
          id="amount"
          type="number"
          step="0.001"
          min="0"
          class="w-full bg-transparent border border-emerald-700 text-gray-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          required
        />
      </div>

      <!-- Measurement Unit -->
      <div>
        <label for="unit" class="block text-sm font-medium text-gray-400 mb-2">Measurement Unit</label>
        <input
          v-model="mesurmentUnitUpdate"
          id="unit"
          type="text"
          class="w-full bg-transparent border border-emerald-700 text-gray-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          required
        />
      </div>

      <!-- Medication Intake -->
      <div>
        <label for="intake" class="block text-sm font-medium text-gray-400 mb-2">Medication Intake</label>
        <input
          v-model="intakeUpdate"
          id="intake"
          type="number"
          step="1.0"
          min="0"
          class="w-full bg-transparent border border-emerald-700 text-gray-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          required
        />
      </div>

      <!-- Frequency -->
      <div>
        <label for="frequency" class="block text-sm font-medium text-gray-400 mb-2">Frequency of Use</label>
        <select
          v-model="selectedUpdate"
          id="frequency"
          class="w-full bg-gray-500 border border-emerald-700 text-gray-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          <option disabled value="">Select Frequency</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      <!-- Submit Button -->
      <div class="col-span-2 mt-4">
        <button
          type="submit"
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-emerald-600/30 transition"
        >
          💾 Update Record
        </button>
      </div>
    </form>
  </div>
</div>


<!-- Single Item Modal -->
<div
  v-if="single"
  class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-start z-50 overflow-y-auto p-4"
>
  <div
    class="relative w-full max-w-2xl bg-[#121212] border border-gray-800 rounded-2xl shadow-2xl p-6 mt-[10vh]
           animate-modalViv transition-all duration-300 ease-out hover:border-emerald-600"
  >

    <!-- Header -->
    <div class="flex items-center justify-between border-b border-gray-700 pb-3 mb-6">
      <h3 class="text-2xl font-semibold text-emerald-400 flex items-center gap-2">
        <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Animal Details
      </h3>
      <button
        @click="single = false"
        type="button"
        class="text-gray-400 hover:text-red-500 transition text-xl"
      >
        ✕
      </button>
    </div>

    <!-- Body -->
    <div class="grid grid-cols-2 gap-6 text-gray-200">
      <!-- Medicine Info -->
      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-400 mb-1">Medicine Name</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ singleItem.nameOfMedicines }}
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Vet</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ singleItem.vetUsername }}
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Frequency of Medication Use</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ singleItem.frequencyOfMedicationUse }}
        </div>
      </div>

      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-400 mb-1">Description</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ singleItem.description }}
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Amount of Medicine</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ singleItem.amountOfMedicine }}{{ singleItem.mesurmentUnit }}
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Medication Intake</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ singleItem.medicationIntake }}
        </div>
      </div>

      <!-- Animal Info -->
      <div class="col-span-2 mt-2">
        <h4 class="text-lg font-semibold text-emerald-400 border-b border-gray-700 pb-1 mb-3">Animal Info</h4>
      </div>
   <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-400 mb-1">Code</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ itemsSingle.idAnimal }}
        </div>
      </div>
      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-400 mb-1">Animal Name</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ itemsSingle.name }}
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Family</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ itemsSingle.family }}
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Species</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ itemsSingle.species }}
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Subspecies</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ itemsSingle.subspecies }}
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Age</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ itemsSingle.age }}
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Gender</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ itemsSingle.gender }}
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Weight</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ itemsSingle.weight }}
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Height</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ itemsSingle.height }}
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Length</label>
        <div class="w-full bg-transparent border border-emerald-700 rounded-xl px-3 py-2">
          {{ itemsSingle.length }}
        </div>
      </div>

      <!-- Boolean flags -->
      <div class="col-span-2 grid grid-cols-2 gap-4 mt-4">
        <div
          v-for="(label, key) in { neutered:'Neutered', vaccinated:'Vaccinated', microchipped:'Microchipped', trained:'Trained', socialized:'Socialized' }"
          :key="key"
          class="flex items-center"
        >
          <input type="checkbox" :checked="itemsSingle[key]" disabled class="sr-only peer" />
          <div
            class="relative w-11 h-6 bg-gray-600 peer-checked:bg-emerald-600 rounded-full
                   after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                   after:w-5 after:h-5 after:bg-gray-300 after:rounded-full after:transition-all
                   peer-checked:after:translate-x-full"
          ></div>
          <span class="ml-3 text-sm font-medium text-gray-300">{{ label }}</span>
        </div>
      </div>
    </div>
  </div>
</div>

  </template>
  
  <script>
//kod dodavanja se učita stranica ali ne i podaci -_-
//greška količina koju životinja uzima zapisuje se nula i tu i u postmanu 
//Ne radi intake zapisuje 0
  import VetNavigation from '../Vet/VetNavigation.vue';
  import instance from '@/axiosBase';
  import Loading from '../Loading.vue';

  import Swal from 'sweetalert2'
  export default {
    components: {
      VetNavigation,
      Loading,

    },
    data() {
    return {
        currentPage: 1,
        itemsPerPage: 6,
       userRole: localStorage.getItem('userRole'),  
       generalSearchQuery: '',
      loadingError:false,
      add: false,
      single: false,
        singleName: '',
        singleDescriptio: '',
        singleVetUsername: '',
        singleAmountOfMedicine: '',
        singleMesurmentUnit: '',
        singleMedicationIntake: '',
        singleFrequencyOfMedicationUse: '',
        singleUsage: '',
        singleCode: '',

          nameAdd: '',
          amountOfMedicineAdd: '',
          mesurmentUnitAdd: '',
          intakeAdd: '',
          descriptionAdd: '',
          animalIdSingle: '',
          single: false,
          singleItem:[],
          itemsSingle: [],

          update: false,
            idUpdate: '',
            amountOfMedicineUpdate: '',
            mesurmentUnitUpdate: '',
            intakeUpdate: '',
            selectedUpdate: '', // frequency

      selected: '',
      code: '',
      items: [],
      nameOfMedicines: [],
      descriptio: [],
      vetUsername: [],
      amountOfMedicine: [],
      mesurmentUnit: [],
      medicationIntake: [],
      frequencyOfMedicationUse: [],
      usage:[],
      filters: {
        nameOfMedicines: '',
    
        vetUsername: '',
        usage: '',
      },
      userExists: null,
      animalExists: null,
      username: '',
    };
  },
computed: {
  filteredItems() {
    const generalQuery = this.generalSearchQuery?.toLowerCase().trim() || '';

    return this.items.filter(item => {
      const medicineNameMatch = (item.nameOfMedicines || '').toLowerCase().includes(generalQuery);
      const vetUsernameMatch = (item.vetUsername || '').toLowerCase().includes(generalQuery);
      const amountWithUnit = ((item.amountOfMedicine?.toString() || '') + (item.mesurmentUnit || '')).toLowerCase();
      const amountMatch = amountWithUnit.includes(generalQuery);
      const intakeMatch = (item.medicationIntake || '').toString().includes(generalQuery);
      const frequencyMatch = (item.frequencyOfMedicationUse || '').toLowerCase().includes(generalQuery);

      return medicineNameMatch || vetUsernameMatch || amountMatch || intakeMatch || frequencyMatch;
    });
  },

  // ➤ Broj stranica
  totalPages() {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  },

  // ➤ Samo stavke koje trebaju biti prikazane na trenutnoj stranici
  paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredItems.slice(start, end);
  }


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
openUpdateModal(item) {
  this.update = true;
  this.idUpdate = item.id;

  this.amountOfMedicineUpdate = item.amountOfMedicine ;
  this.mesurmentUnitUpdate = item.mesurmentUnit ;
  this.intakeUpdate = item.medicationIntake ;
  this.selectedUpdate = item.frequencyOfMedicationUse ;

  // Reset validacije (ako koristiš ikone)
  this.userExists = null;
  this.animalExists = null;

  console.log('Update modal opened:', {
    id: this.idUpdate,
    amount: this.amountOfMedicineUpdate,
    unit: this.mesurmentUnitUpdate,
    intake: this.intakeUpdate,
    frequency: this.selectedUpdate,
  });
},
async handleUpdate(id) {
  try {

 const response = await instance.put('animal/updateMedicinesDomain',{
              id: this.idUpdate,
              amountOfMedicine: this.amountOfMedicineUpdate,
              mesurmentUnit: this.mesurmentUnitUpdate,
              medicationIntake: this.intakeUpdate,
              frequencyOfMedicationUse: this.selectedUpdate
          },
          {
              headers: { Authorization: `Bearer ${this.token}`,  },
            });
             
    await Swal.fire({
      title: "Item updated!",
      icon: "success"
    });

    window.location.reload();
  } catch (error) {
    console.error("Update error:", error);
    await Swal.fire({
      title: "Oops!",
      text: "Failed to update item. Try again.",
      icon: "warning"
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
        
      
           this.loadingError=false;
           console.log("Intake"+this.intakeAdd);
        const response = await instance.post('animal/addMedicines',{
          animalId:this.registerId,
          nameOfMedicines:this.nameAdd,
          description:this.descriptionAdd,
          vetUsername:this.username,
          amountOfMedicine:this.amountOfMedicineAdd,
          mesurmentUnit:this.mesurmentUnitAdd,
          medicationIntake:this.intakeAdd,
          frequencyOfMedicationUse:this.selected,
          usage:true              
          },
          {
              headers: { Authorization: `Bearer ${this.token}`,  },
            });
             
       
       
                 this.loadingError=false;
              await Swal.fire({
                                title: "Item added!",
                                draggable: true,
                                icon: "success"
                              });
              this.loadingError=false;
             if(response.status==200){
           window.location.reload();
         }
              
        
          }
      catch(error){
        this.loadingError=true;


        console.error('There was an error!', error);
        await  Swal.fire({
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
   catch (error) {
    this.animalExists=false}
      
    },






    async checkUser() {
   try{
        const userResponse = await instance.get(`auth/getUserByUsername/${this.username}`);
        const userData = userResponse.data;
       
      this.registerId=userData.id;
      console.log(this.registerId);
       
        if(this.registerId!=null){
          this.userExists=true;
        }
   }
   catch (error) {
    this.userExists=false}
      
    },

     formatDateTime() {
      if (this.date && this.time) {
        this.formattedDateTime = `${this.date}T${this.time}:00.0000000`;
        console.log(formattedDateTime);
      }
    },
    async fetchData() {
      try {
        this.loadingError = true;
        const response = await instance.get('animal/medicines_db');
        this.items = response.data;
        if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                } 
        console.log(this.items);
        this.populateFilters();
      
      } catch (error) {
        this.loadingError=true;
        console.error('There was an error!', error);
       
      }
    },
    populateFilters() {
      this.nameOfMedicines = [...new Set(this.items.map(item => item.nameOfMedicines))];
      this.vetUsername = [...new Set(this.items.map(item => item.vetUsername))];
      this.usage = [...new Set(this.items.map(item => item.usage))];
   
    },
    navigateToDetails(id) {
      this.$router.push(`/singleAnimalOnMedication/${id}`);
    },
   
  },
  watch: {
    filters: {
      handler() {
        this.filteredItems = this.items.filter(item => {
          return (
            (!this.filters.nameOfMedicines || item.NameOfMedicines === this.filters.nameOfMedicines) &&
            (!this.filters.vetUsername || item.VetUsername === this.filters.vetUsername) &&
   
            (!this.filters.usage || item.Usage === this.filters.usage)
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
  