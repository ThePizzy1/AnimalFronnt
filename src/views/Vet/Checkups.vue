<template>
  <div class="flex min-h-screen text-stone-200">
    <Loading v-if="loadingError" />

    <!-- Sidebar -->
    <div class="w-1/6 p-4 rounded-l-lg">
      <WorkerNavigation />
    </div>

    <!-- Main Content -->
    <div class="w-5/6 mt-5 p-6 rounded-lg mr-8 bg-[#0e0e0e] shadow-lg border border-white/10 space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-emerald-400">🩺 Checkups</h1>
        <button
          @click="add = true"
          :disabled="userRole !== 'HeadVet'"
          type="button"
          class="flex items-center px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-md transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Checkup
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
          <svg
            class="w-5 h-5 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto bg-[#1a1a1a]/80 rounded-2xl border border-gray-800 shadow-xl">
        <table class="min-w-full divide-y divide-gray-800">
          <thead>
            <tr class="text-gray-400 uppercase text-sm tracking-wide">
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
              <!-- Details icon -->
              <td class="px-4 py-4 text-center">
                <svg
                  @click="openSinglModal(item)"
                  class="w-6 h-6 hover:text-emerald-400 transition"
                  :class="getTodayDate(item.endTime) ? 'text-emerald-400 cursor-pointer' : 'text-gray-600 cursor-not-allowed'"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 11h2v5m-2 0h4m-2.6-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </td>

              <td
                class="px-4 py-4 text-center font-medium"
                :class="getTodayDate(item.endTime) ? 'text-gray-200' : 'text-gray-500 italic'"
              >
                {{ formatDate(item.startTime) }}
              </td>

              <td
                class="px-4 py-4 text-center font-medium"
                :class="getTodayDate(item.endTime) ? 'text-gray-200' : 'text-gray-500 italic'"
              >
                {{ formatDate(item.endTime) }}
              </td>

              <td
                class="px-4 py-4 text-center"
                :class="getTodayDate(item.endTime) ? 'text-gray-200' : 'text-gray-500 italic'"
              >
                {{ item.typeOfVisit }}
              </td>

              <td
                class="px-4 py-4 text-center"
                :class="getTodayDate(item.endTime) ? 'text-gray-200' : 'text-gray-500 italic'"
              >
                {{ item.notes }}
              </td>

              <td class="px-4 py-4 text-center">
                <button
                  type="button"
                  @click="openUpdateModal(item)"
                  :disabled="!getTodayDate(item.endTime)"
                  class="flex items-center justify-center gap-1 px-3 py-1.5 text-sm font-semibold rounded-full transition"
                  :class="getTodayDate(item.endTime)
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-60'"
                >
                  <svg
                    class="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 576 512"
                  >
                    <path
                      d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7z"
                    />
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

<!-- Update Vet Visit Modal -->
<div
  v-if="update"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
>
  <div class="relative w-full max-w-md mx-auto">
    <!-- Modal content -->
    <div class="bg-[#111] border border-gray-800 rounded-2xl shadow-2xl text-stone-200 overflow-hidden">
      
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <h3 class="text-xl font-semibold text-emerald-400 flex items-center gap-2">
          ✏️ Update Vet Visit
        </h3>
        <button
          @click="update = false"
          type="button"
          class="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-2 transition"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 14 14"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <form @submit.prevent="handleUpdate" class="px-6 py-6 space-y-5">
        <!-- Start Time -->
        <div>
          <label for="startTime" class="block text-sm font-medium text-gray-400 mb-2">
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            v-model="startTime"
            required
            class="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>

        <!-- End Time -->
        <div>
          <label for="endTime" class="block text-sm font-medium text-gray-400 mb-2">
            End Time
          </label>
          <input
            type="datetime-local"
            id="endTime"
            v-model="endTime"
            required
            class="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>

        <!-- Notes -->
        <div>
          <label for="notes" class="block text-sm font-medium text-gray-400 mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            v-model="notes"
            rows="4"
            placeholder="Enter notes..."
            class="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
          ></textarea>
        </div>

        <!-- Footer buttons -->
        <div class="flex justify-end gap-3 pt-4 border-t border-gray-800">
          <button
            type="button"
            @click="update = false"
            class="px-5 py-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium inline-flex items-center gap-2 transition"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</div>



<!-- Add Animal for Checkups Modal -->
<div
  v-if="add"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
>
  <div class="relative w-full max-w-md mx-auto">
    <!-- Modal Content -->
    <div class="bg-[#111] border border-gray-800 rounded-2xl shadow-2xl text-stone-200 overflow-hidden">
      
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <h3 class="text-xl font-semibold text-emerald-400 flex items-center gap-2">
          🐾 Add Animal for Checkups
        </h3>
        <button
          @click="add = false"
          type="button"
          class="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-2 transition"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 14 14"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <form @submit.prevent="handleSubmit" class="px-6 py-6 space-y-6">
        
        <!-- Animal Code & Check -->
        <div class="grid grid-cols-3 gap-3 items-center">
          <div class="col-span-2">
            <label for="code" class="block text-sm font-medium text-gray-400 mb-2">
              Animal Code
            </label>
            <div class="flex items-center">
              <input
                type="text"
                id="code"
                v-model="code"
                placeholder="Enter animal code"
                class="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              />
              <div class="ml-2">
                <!-- Success icon -->
                <svg
                  v-if="animalExists && animalExists != null && code"
                  class="w-5 h-5 text-yellow-400 animate-pulse"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                  />
                </svg>

                <!-- Error icon -->
                <svg
                  v-if="!animalExists && animalExists != null && code"
                  class="w-5 h-5 text-red-500 animate-pulse"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 384 512"
                >
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Check Button -->
          <div class="col-span-1 flex items-end justify-center">
            <button
              type="button"
              @click="checkAnimal"
              class="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition"
              title="Check Animal"
            >
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Dates -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="dateStartAdd" class="block text-sm font-medium text-gray-400 mb-2">
              Start Date
            </label>
            <input
              type="date"
              v-model="startTimeAdd"
              id="dateStartAdd"
              required
              class="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            />
          </div>

          <div>
            <label for="dateEndAdd" class="block text-sm font-medium text-gray-400 mb-2">
              End Date
            </label>
            <input
              type="date"
              v-model="endTimeAdd"
              id="dateEndAdd"
              required
              class="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            />
          </div>
        </div>

        <!-- Notes -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-400 mb-2">
            Notes
          </label>
          <textarea
            id="description"
            v-model="notesAdd"
            rows="4"
            placeholder="Write notes here..."
            class="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
          ></textarea>
        </div>

        <!-- Footer Buttons -->
        <div class="flex justify-end gap-3 pt-4 border-t border-gray-800">
          <button
            type="button"
            @click="add = false"
            class="px-5 py-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium inline-flex items-center gap-2 transition"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</div>



<!-- Single Animal Details Modal -->
<div
  v-if="single"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
>
  <div class="relative w-full max-w-lg mx-auto">
    <!-- Modal content -->
    <div class="bg-[#111] border border-gray-800 rounded-2xl shadow-2xl text-stone-200 overflow-hidden">
      
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <h3 class="text-xl font-semibold text-emerald-400 flex items-center gap-2">
          🐾 Animal Details
        </h3>
        <button
          @click="single = false"
          type="button"
          class="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-2 transition"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 14 14"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-6 space-y-5 overflow-y-auto max-h-[80vh] custom-scrollbar">
        <div class="grid grid-cols-2 gap-4">
          
          <!-- Visit Info -->
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Start Time</label>
            <div class="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2">
              {{ formatDate(singleItem.startTime) }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">End Time</label>
            <div class="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2">
              {{ formatDate(singleItem.endTime) }}
            </div>
          </div>

          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-400 mb-2">Visit Type</label>
            <div class="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2">
              {{ singleItem.typeOfVisit }}
            </div>
          </div>

          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-400 mb-2">Notes</label>
            <div class="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 min-h-[60px]">
              {{ singleItem.notes || 'No notes available' }}
            </div>
          </div>

          <!-- Animal Info -->
          <div class="col-span-2 border-t border-gray-800 pt-4">
            <h4 class="text-emerald-400 font-semibold text-lg mb-2">Animal Info</h4>
          </div>

          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-400 mb-2">Name</label>
            <div class="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2">
              {{ itemsSingle.name }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Family</label>
            <div class="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2">
              {{ itemsSingle.family }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Species</label>
            <div class="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2">
              {{ itemsSingle.species }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Subspecies</label>
            <div class="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2">
              {{ itemsSingle.subspecies }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Age</label>
            <div class="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2">
              {{ itemsSingle.age }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Gender</label>
            <div class="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 capitalize">
              {{ itemsSingle.gender }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Weight</label>
            <div class="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2">
              {{ itemsSingle.weight }} kg
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Height</label>
            <div class="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2">
              {{ itemsSingle.height }} cm
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Length</label>
            <div class="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2">
              {{ itemsSingle.length }} cm
            </div>
          </div>

          <!-- Toggles -->
          <div class="col-span-2 border-t border-gray-800 pt-4">
            <h4 class="text-emerald-400 font-semibold text-lg mb-2">Status</h4>
          </div>

          <div
            v-for="(label, field) in {
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
              class="relative w-11 h-6 bg-gray-600 rounded-full"
              :class="itemsSingle[field] ? 'bg-emerald-700' : 'bg-gray-700'"
            >
              <div
                class="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-all"
                :class="itemsSingle[field] ? 'translate-x-5' : ''"
              ></div>
            </div>
            <span class="text-sm font-medium text-gray-300">{{ label }}</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end px-6 py-4 border-t border-gray-800">
        <button
          @click="single = false"
          class="px-5 py-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import WorkerNavigation from '../Vet/VetNavigation.vue';
import instance from '@/axiosBase';
import Loading from '../Loading.vue';
import Swal from 'sweetalert2';
export default {
  components: {
    WorkerNavigation,
    Loading,

  },
  data() {
    return {
      currentPage: 1,
itemsPerPage: 15,

       userRole: localStorage.getItem('userRole'),  
       generalSearchQuery: '',
      loadingError:false,
      add:false,
      code: '',
      startTimeAdd: '',
      endTimeAdd: '',
      typeOfVisitAdd: 'Checkups',
      notesAdd: '',
      animalExists: null,
            update: false,
            idUpdate: null,
            startTime: '',
            endTime: '',
            notes: '',
      items: [],
          animalIdSingle: '',
          single: false,
          singleItem:[],
          itemsSingle: [],
      filters: {
        startTime: '',
        endTime: '',
        typeOfVisit: 'Checkups', 
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

    return this.items.filter(item => {
      const startTimeMatch = this.formatDate(item.startTime)?.toLowerCase().includes(generalQuery);
      const endTimeMatch = this.formatDate(item.endTime)?.toLowerCase().includes(generalQuery);
      const typeMatch = item.typeOfVisit?.toLowerCase().includes(generalQuery);
      const notesMatch = item.notes?.toLowerCase().includes(generalQuery);
      const idAnimal = item.animalId?.toString().toLowerCase().includes(generalQuery);

      return startTimeMatch || endTimeMatch || typeMatch || notesMatch || idAnimal;
    });
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
     var responser=  await instance.put(`animal/updateAnimalRecord/`,  { 
                            animalId:parseInt(this.code),
                            recordId:parseInt(2)
                              },
     {
         headers: {
           Authorization: `Bearer ${this.token}`,  
   
         },
       });
          console.log("response:" +responser.data);
            
      
                
     const response = await instance.post('animal/addVetVisit',{
      animalId: parseInt(this.registerId),
      startTime: `${this.startTimeAdd}T00:00:00.00`,
      endTime:`${this.endTimeAdd}T00:00:00.00` ,
      typeOfVisit: this.typeOfVisitAdd,
      notes: this.notesAdd
     },
     { headers: {Authorization: `Bearer ${this.token}`,   },
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


     console.error('There was an error!', error);
     Swal.fire({
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
        this.loadingError=true;
        const response = await instance.get('animal/vetvisit_db');
        this.items = response.data.filter(item => item.typeOfVisit === 'Checkups'); 
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
   generalSearchQuery() {
  this.currentPage = 1;
},
filters: {
  deep: true,
  handler() {
    this.currentPage = 1;
  },
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
  