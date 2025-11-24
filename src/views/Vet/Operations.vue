<template>
  <div class="flex min-h-screen text-stone-200">
    <Loading v-if="loadingError" />

    <!-- Sidebar -->
    <div class="w-1/6 p-4">
      <WorkerNavigation />
    </div>

    <!-- Main content -->
    <div class="w-5/6 mr-8 mt-6 p-6 bg-[#0e0e0e] rounded-xl border border-gray-800 shadow-2xl">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-emerald-400">⚙️ Operations</h1>

        <button
          @click="add = true"
          :disabled="userRole !== 'HeadVet'"
          type="button"
          class="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full px-5 py-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Operation
        </button>
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label class="block text-sm font-semibold text-emerald-300 mb-2">Start Date:</label>
          <input
            v-model="filters.startTime"
            type="date"
            class="w-full bg-[#1a1a1a] border border-gray-700 rounded-full px-4 py-2 text-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-emerald-300 mb-2">End Date:</label>
          <input
            v-model="filters.endTime"
            type="date"
            class="w-full bg-[#1a1a1a] border border-gray-700 rounded-full px-4 py-2 text-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <!-- Search -->
      <div class="relative mb-8">
        <input
          v-model="generalSearchQuery"
          type="text"
          placeholder="Search..."
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
              <th class="px-5 py-3 text-left"></th>
              <th class="px-5 py-3 text-left font-semibold">Start Time</th>
              <th class="px-5 py-3 text-left font-semibold">End Time</th>
              <th class="px-5 py-3 text-left font-semibold">Type of Visit</th>
              <th class="px-5 py-3 text-left font-semibold">Notes</th>
              <th class="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in paginatedItems"
              :key="item.id"
              :class="{
                'bg-gray-900/30 cursor-not-allowed': !getTodayDate(item.endTime),
                'hover:bg-gray-800/30 cursor-pointer': getTodayDate(item.endTime)
              }"
              class="border-b border-gray-800 transition"
            >
              <!-- Icon -->
              <td class="px-6 py-4 text-center">
                <svg
                  @click="openSinglModal(item)"
                  class="w-6 h-6 transition"
                  :class="getTodayDate(item.endTime)
                    ? 'text-emerald-400 hover:text-emerald-300 cursor-pointer'
                    : 'text-gray-500 opacity-70 cursor-not-allowed'"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 11h2v5m-2 0h4m-2.6-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </td>

              <!-- Start -->
              <td
                class="px-6 py-4 font-medium"
                :class="getTodayDate(item.endTime)
                  ? 'text-gray-200'
                  : 'text-gray-500 opacity-70'"
              >
                {{ formatDate(item.startTime) }}
              </td>

              <!-- End -->
              <td
                class="px-6 py-4 font-medium"
                :class="getTodayDate(item.endTime)
                  ? 'text-gray-200'
                  : 'text-gray-500 opacity-70'"
              >
                {{ formatDate(item.endTime) }}
              </td>

              <!-- Type -->
              <td
                class="px-6 py-4"
                :class="getTodayDate(item.endTime)
                  ? 'text-gray-300'
                  : 'text-gray-500 italic opacity-70'"
              >
                {{ item.typeOfVisit }}
              </td>

              <!-- Notes -->
              <td
                class="px-6 py-4"
                :class="getTodayDate(item.endTime)
                  ? 'text-gray-300'
                  : 'text-gray-500 italic opacity-70'"
              >
                {{ item.notes }}
              </td>

              <!-- Button -->
              <td class="px-6 py-4 text-right">
                <button
                  @click="openUpdateModal(item)"
                  :disabled="!getTodayDate(item.endTime)"
                  class="flex items-center justify-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium transition"
                  :class="getTodayDate(item.endTime)
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-60'"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 576 512">
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
      <div class="flex justify-center items-center py-6 space-x-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-emerald-400 hover:border-emerald-400 disabled:opacity-30 transition"
        >
          ‹ Prev
        </button>

        <span class="text-sm text-gray-400">
          Page
          <span class="text-emerald-400 font-semibold">{{ currentPage }}</span>
          of
          <span class="text-emerald-400 font-semibold">{{ totalPages }}</span>
        </span>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-emerald-400 hover:border-emerald-400 disabled:opacity-30 transition"
        >
          Next ›
        </button>
      </div>
    </div>
  </div>
<!-- Add Operation Modal -->
<div
  v-if="add"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition"
>
  <div class="relative w-full max-w-lg p-6">
    <!-- Modal content -->
    <div class="bg-[#111] border border-gray-800 rounded-2xl shadow-2xl text-stone-200 overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <h3 class="text-xl font-semibold text-emerald-400">➕ Add Animal for Operation</h3>
        <button
          @click="add = false"
          type="button"
          class="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-2 transition"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <form @submit.prevent="handleSubmit" class="px-6 py-5 space-y-5">
        <!-- Animal code -->
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
            <!-- Validation icons -->
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

        <!-- Dates -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label for="dateStartAdd" class="block mb-2 text-sm font-semibold text-emerald-300">Start Date</label>
            <input
              type="date"
              v-model="startTimeAdd"
              id="dateStartAdd"
              required
              class="w-full rounded-full border border-gray-700 bg-[#1a1a1a] text-gray-200 px-4 py-2.5 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label for="dateEndAdd" class="block mb-2 text-sm font-semibold text-emerald-300">End Date</label>
            <input
              type="date"
              v-model="endTimeAdd"
              id="dateEndAdd"
              required
              class="w-full rounded-full border border-gray-700 bg-[#1a1a1a] text-gray-200 px-4 py-2.5 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        <!-- Notes -->
        <div>
          <label for="description" class="block mb-2 text-sm font-semibold text-emerald-300">Notes</label>
          <textarea
            id="description"
            v-model="notesAdd"
            rows="3"
            placeholder="Write notes here..."
            class="w-full rounded-xl border border-gray-700 bg-[#1a1a1a] text-gray-200 px-4 py-2.5 text-sm resize-none focus:ring-emerald-500 focus:border-emerald-500"
          ></textarea>
        </div>

        <!-- Submit -->
        <div class="flex justify-end pt-3">
          <button
            type="submit"
            class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full px-6 py-2 transition"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Operation
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Update Vet Visit Modal -->
<div
  v-if="update"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition"
>
  <div class="relative w-full max-w-lg p-6">
    <!-- Modal Content -->
    <div class="bg-[#111] border border-gray-800 rounded-2xl shadow-2xl text-stone-200 overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <h3 class="text-xl font-semibold text-emerald-400">✏️ Update Vet Visit</h3>
        <button
          @click="update = false"
          type="button"
          class="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-2 transition"
        >
          <svg
            class="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <form @submit.prevent="handleUpdate" class="px-6 py-5 space-y-5">
        <!-- Start Time -->
        <div>
          <label for="startTime" class="block mb-2 text-sm font-semibold text-emerald-300">Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            v-model="startTime"
            required
            class="w-full rounded-full border border-gray-700 bg-[#1a1a1a] text-gray-200 px-4 py-2.5 text-sm focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <!-- End Time -->
        <div>
          <label for="endTime" class="block mb-2 text-sm font-semibold text-emerald-300">End Time</label>
          <input
            type="datetime-local"
            id="endTime"
            v-model="endTime"
            required
            class="w-full rounded-full border border-gray-700 bg-[#1a1a1a] text-gray-200 px-4 py-2.5 text-sm focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <!-- Notes -->
        <div>
          <label for="notes" class="block mb-2 text-sm font-semibold text-emerald-300">Notes</label>
          <textarea
            id="notes"
            v-model="notes"
            rows="3"
            placeholder="Enter notes..."
            class="w-full rounded-xl border border-gray-700 bg-[#1a1a1a] text-gray-200 px-4 py-2.5 text-sm resize-none focus:ring-emerald-500 focus:border-emerald-500"
          ></textarea>
        </div>

        <!-- Submit -->
        <div class="flex justify-end pt-3">
          <button
            type="submit"
            class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full px-6 py-2 transition"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Update Visit
          </button>
        </div>
      </form>
    </div>
  </div>
</div>




         <!-- Single item modal -->
         <div v-if="single" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-x-auto custom-scrollbar">
            <div class="relative p-4 w-full max-w-md max-h-full">
              <!-- Modal content -->
              <div class="relative bg-black rounded-lg shadow-sm dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-stone-200">
                    Animal Details
                  </h3>
                  <button @click="single = false" type="button" class="text-gray-400 bg-transparent hover:bg-white hover:text-gray-900 rounded-lg text-base w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-stone-200" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5">
                  <div class="grid gap-4 mb-4 grid-cols-2  sm:col-span-1">
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Start Time</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{ formatDate(this.singleItem.startTime) }}
                    </span>
                    </div>
                
                
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">End Time</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{formatDate(this.singleItem.endTime) }}
                    </span>
                    </div>
                    <div class="col-span-2 ">
                      <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Vissit Type</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{ this.singleItem.typeOfVisit }}
                    </span>
                    </div>
                    <div class="col-span-2 ">
                      <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Notes</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{ this.singleItem.notes}}
                    </span>
                    </div>
                      <div class="col-span-2 ">
                      <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Code</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{ this.itemsSingle.idAnimal }}
                    </span>
                    </div>
                    <div class="col-span-2 ">
                      <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Animal Name</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{ this.itemsSingle.name }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="animalName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Family</label>
                      <span type="text" id="animalName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ itemsSingle.family }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Species</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.species }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Subspecies</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.subspecies }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Age</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.age }}
                    </span>
                    </div>

                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Gender</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.gender }}
                    </span>
                    </div>

                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Weight</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.weight }}
                    </span>
                    </div>
                    
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Hight</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.height }}
                    </span>
                    </div>
                    
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Lenght</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.length }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="this.itemsSingle.neutered" class="sr-only peer" disabled>
                        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                        <span class="ms-3 text-base font-medium text-gray-900  dark:text-stone-200">Neutered</span>
                      </label>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemsSingle.vaccinated" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-base font-medium text-gray-900  dark:text-stone-200">Vaccinated</span>
                  </label>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemsSingle.microchipped" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-base font-medium text-gray-900  dark:text-stone-200">Microchipped</span>
                  </label>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemsSingle.trained" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-base font-medium text-gray-900  dark:text-stone-200">Trained</span>
                  </label>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemsSingle.socialized" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-base font-medium text-gray-900  dark:text-stone-200">Socialized</span>
                  </label>
                </div>






                  </div>
                </form>
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
      currentPage: 1,    // trenutna stranica
      itemsPerPage: 6,
       userRole: localStorage.getItem('userRole'),  
       generalSearchQuery: '',
      loadingError:false,
      add:false,
      code: '',
      startTimeAdd: '',
      endTimeAdd: '',
      typeOfVisitAdd: 'Operation',
      notesAdd: '',

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
      },
      
      animalExists:null// Početno stanje učitavanja
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

    const filtered = this.items.filter(item => {
      const startTimeMatch = this.formatDate(item.startTime)?.toLowerCase().includes(generalQuery);
      const endTimeMatch = this.formatDate(item.endTime)?.toLowerCase().includes(generalQuery);
      const typeMatch = item.typeOfVisit?.toLowerCase().includes(generalQuery);
      const notesMatch = item.notes?.toLowerCase().includes(generalQuery);
      const idAnimal = item.animalId?.toString().toLowerCase().includes(generalQuery);

      return startTimeMatch || endTimeMatch || typeMatch || notesMatch ||animalId;
    });
      // onda sortiramo po startTime, najnoviji prvi
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
     const response = await instance.post('animal/addVetVisit',{
      animalId: parseInt(this.registerId),
      startTime: `${this.startTimeAdd}T00:00:00.00`,
      endTime:`${this.endTimeAdd}T00:00:00.00` ,
      typeOfVisit: this.typeOfVisitAdd,
      notes: this.notesAdd
     },
     {
         headers: {  Authorization: `Bearer ${this.token}`,  },
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
   catch (error) {this.animalExists=false}     
    },

    async fetchData() {
      try {
        this.loadingError=true;
        const response = await instance.get('animal/vetvisit_db');
        this.items = response.data.filter(item => item.typeOfVisit === 'Operation'); 
        console.log(this.items);
        if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                }
      } catch (error) {
        this.loadingError=true;
        console.error('There was an error!', error);
      }
    },
    getTodayDate(endD) {
      const today = new Date();
      const endDate = new Date(endD);
      console.log(today);
      console.log(endDate);
      if(endDate >= today){
      console.log("t");
      return true;
      }
      else{console.log("f");  return false;}
      },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
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
  