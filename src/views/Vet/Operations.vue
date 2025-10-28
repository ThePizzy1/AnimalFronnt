<template>
  <div class="flex">
     <Loading v-if="loadingError" /> 

    <div class="w-1/6 text-stone-200 p-4 rounded-l-lg">
      <WorkerNavigation />
    </div>
    <div class="w-5/6 text-stone-200 p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Operations</h1>

      <button @click="add = true" :disabled="userRole !== 'HeadVet'"
        type="button"
        class="mb-4 text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
        <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
        </svg>
        <span class="block text-base font-bold mx-2">Add Operation</span>
      </button>
      <div class="grid grid-cols-4 gap-4 mb-5">
      <div>
          <label for="startTime" class="block text-base font-bold mb-2">Start Date:</label>
          <input v-model="filters.startTime" id="startTime" type="date" class="rounded-full border border-gray-300 text-gray-400  w-full py-2 px-3 bg-black  shadow-xl focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"/>
        </div>
        <div>
          <label for="startTime" class="block text-base font-bold mb-2">End Date:</label>
          <input v-model="filters.endTime" id="startTime" type="date" class="rounded-full border border-gray-300 text-gray-400  w-full py-2 px-3 bg-black  shadow-xl focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
        </div>
        </div>
        

              <div class="relative w-full mb-4">
          <input
            v-model="generalSearchQuery"
            type="text"
            placeholder="Search..."
            class="w-full px-5 py-2 pr-12 text-stone-200 placeholder-gray-100 bg-transparent border-2 border-transparent rounded-full shadow-2xl focus:outline-none focus:border-turquoise-400 hover:border-turquoise-400 transition duration-300"
          />
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg class="w-6 h-6 text-turquoise-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
        </div>
      <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Start Time</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">End Time</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Type of Visit</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Notes</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" :class="{'cursor-not-allowed opacity-50': !getTodayDate( item.endTime) , 'cursor-allowed opacity-100': getTodayDate( item.endTime) }" class="border-b border-customBlack cursor-pointer" >
              <td class="px-5 py-5 text-base font-bold text-left">
                    <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-stone-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                </td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ formatDate(item.startTime) }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ formatDate(item.endTime) }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.typeOfVisit }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.notes }}</td>
             <td class="px-5 py-5 text-base font-bold text-left">
                <button type="button"   @click="openUpdateModal(item)" class="mb-4  text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                  <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">

                  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"></path>

                  </svg>
                 <span class="block text-base font-bold mx-2 ">Update</span>
              </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
    <!-- Main modal -->
<div  v-if="add" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-black rounded-lg shadow-sm dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-stone-200">
                    Add Animal for Operations
                </h3>
                <button @click="add = false" type="button" class="text-gray-400 bg-transparent hover:bg-white hover:text-gray-900 rounded-lg text-base w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-stone-200" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form @submit.prevent="handleSubmit" class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                  <div class="col-span-2 sm:col-span-1">
                            <label for="code" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Animal code:</label>
                            <div class="flex items-center">
                            <input type="text" id="code" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" v-model="code"/>
                             <div class="ml-2">
                            <svg v-if="this.animalExists && this.animalExists!=null && this.code" class="w-5 h-5 fill-[#FFFD00]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                            </svg>
                            <svg v-if="!this.animalExists  && this.animalExists!=null && this.code" class="w-5 h-5 fill-[#e00000]" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                            </svg>
                            </div>
                            </div>
                            </div>
                            
                            <div class="col-span-2 sm:col-span-1">
                              <label for="checkAnimal" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Check</label>      
                              <svg @click="checkAnimal" class="w-8 h-8 ml- text-gray-800 dark:text-stone-200 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                              </svg>

                            </div>

                    <div class="col-span-2 sm:col-span-1">
                        <label for="dateStartAdd" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Start Date</label>
                        <input type="date" v-model="startTimeAdd" name="dateStartAdd" id="dateStartAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="dateEndAdd" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">End Date</label>
                        <input type="date" v-model="endTimeAdd" name="dateEndAdd" id="dateEndAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                    </div>
              
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Notes</label>
                        <textarea id="description" v-model="notesAdd" rows="4" class="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Write notes here"></textarea>                    
                    </div>
                </div>
                <button type="submit" class="text-stone-200 inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add 
                </button>
              
            </form>
        </div>
    </div>
</div> 

<!-- Update Vet Visit Modal -->
<div v-if="update" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  <div class="relative p-4 w-full max-w-md max-h-full">
    <div class="relative bg-black rounded-lg shadow-sm">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
        <h3 class="text-lg font-semibold text-gray-900">Update Vet Visit</h3>
        <button @click="update = false" type="button" class="text-gray-400 hover:bg-white rounded-lg w-8 h-8 flex justify-center items-center">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>

      <!-- Body -->
      <form @submit.prevent="handleUpdate" class="p-4">
        <div class="grid gap-4 mb-4 grid-cols-1">
          <div>
            <label for="startTime" class="block mb-2 font-medium text-gray-900">Start Time</label>
            <input type="datetime-local" id="startTime" v-model="startTime" required class="w-full p-2.5 border border-emerald-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
          </div>

          <div>
            <label for="endTime" class="block mb-2 font-medium text-gray-900">End Time</label>
            <input type="datetime-local" id="endTime" v-model="endTime" required class="w-full p-2.5 border border-emerald-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
          </div>

          <div>
            <label for="notes" class="block mb-2 font-medium text-gray-900">Notes</label>
            <textarea id="notes" v-model="notes" rows="4" class="w-full p-2.5 border border-emerald-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="Enter notes..."></textarea>
          </div>
        </div>

        <button type="submit" class="bg-emerald-700 hover:bg-emerald-800 text-stone-200 font-medium rounded-lg px-5 py-2.5 inline-flex items-center">
          <svg class="w-5 h-5 me-1 -ms-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
          </svg>
          Update
        </button>
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
   filteredItems() {
    const generalQuery = this.generalSearchQuery?.toLowerCase().trim() || '';

    return this.items.filter(item => {
      const startTimeMatch = this.formatDate(item.startTime)?.toLowerCase().includes(generalQuery);
      const endTimeMatch = this.formatDate(item.endTime)?.toLowerCase().includes(generalQuery);
      const typeMatch = item.typeOfVisit?.toLowerCase().includes(generalQuery);
      const notesMatch = item.notes?.toLowerCase().includes(generalQuery);
      const idAnimal = item.animalId?.toString().toLowerCase().includes(generalQuery);

      return startTimeMatch || endTimeMatch || typeMatch || notesMatch ||animalId;
    });
  }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
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
  