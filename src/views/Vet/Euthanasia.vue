<template>
    <div class="flex">
       <Loading v-if="loadingError" /> 

      <div class="w-1/6 text-stone-200 p-4 rounded-l-lg">
        <WorkerNavigation />
      </div>
      <div class="w-5/6 text-stone-200 p-4 rounded-r-lg mr-8">
        <h1 class="text-xl font-bold mb-4">Euthanasia</h1>
  
        <button @click="add = true" :disabled="userRole !== 'HeadVet'"
        type="button"
        class="mb-4 text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
          <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
          </svg>
          <span class="block text-base font-bold mx-2">Add Euthanasia</span>
        </button>
  

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
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Animal Code</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Name Of Desissse</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Date</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider"></th>
               <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider"></th>
            
              </tr>
            </thead>
                  <tbody>
                          <tr v-for="item in filteredItems" :key="item.id":class="[ 'border-b border-customBlack cursor-pointer',item.complited ? 'text-gray-400' : 'text-stone-200']" class="border-b border-customBlack cursor-pointer" >
                                <td class="px-5 py-5 text-base font-bold text-left">
                                    <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-stone-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                </td>
                                <td class="px-5 py-5 text-base font-bold text-left">{{item.animalId }}</td>
                                <td class="px-5 py-5 text-base font-bold text-left">{{ item.nameOfDesissse }}</td>
                                <td class="px-5 py-5 text-base font-bold text-left">{{ formatDate(item.date) }}</td>
                          
                              <td class="px-5 py-5 text-base font-bold text-left">
                              <button @click="openUpdateModal(item)" type="button" class="mb-4 p-2 text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                                  <svg class="w-5 h-5 fill-[#ffffff]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M17.44 3a1 1 0 0 1 .707.293l2.56 2.56a1 1 0 0 1 0 1.414L18.194 9.78 14.22 5.806l2.513-2.513A1 1 0 0 1 17.44 3Zm-4.634 4.22-9.513 9.513a1 1 0 0 0 0 1.414l2.56 2.56a1 1 0 0 0 1.414 0l9.513-9.513-3.974-3.974ZM6 6a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 0 1 0-2h1V7a1 1 0 0 1 1-1Zm9 9a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                                    <path d="M19 13h-2v2h2v-2ZM13 3h-2v2h2V3Zm-2 2H9v2h2V5ZM9 3H7v2h2V3Zm12 8h-2v2h2v-2Zm0 4h-2v2h2v-2Z"/>
                                  </svg>

                                <span class="block text-base font-bold mx-2 ">Update</span>
                                </button>
                              </td>
                               <td class="px-5 py-5 text-base font-bold text-left">
                              <button @click="openRemoveModal(item)" :disabled="userRole !== 'HeadVet'"
                                  type="button"
                                  class="mb-4 text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                  <svg class="w-5 h-5 fill-[#ffffff]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M17.44 3a1 1 0 0 1 .707.293l2.56 2.56a1 1 0 0 1 0 1.414L18.194 9.78 14.22 5.806l2.513-2.513A1 1 0 0 1 17.44 3Zm-4.634 4.22-9.513 9.513a1 1 0 0 0 0 1.414l2.56 2.56a1 1 0 0 0 1.414 0l9.513-9.513-3.974-3.974ZM6 6a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 0 1 0-2h1V7a1 1 0 0 1 1-1Zm9 9a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                                    <path d="M19 13h-2v2h2v-2ZM13 3h-2v2h2V3Zm-2 2H9v2h2V5ZM9 3H7v2h2V3Zm12 8h-2v2h2v-2Zm0 4h-2v2h2v-2Z"/>
                                  </svg>

                                <span class="block text-base font-bold mx-2 ">Done</span>
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
                      Add Animal for Euthanasia
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
                              <input type="text" v-model="code" id="code" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
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
                                <svg @click="checkAnimal(this.code)" class="w-8 h-8 ml- text-gray-800 dark:text-stone-200 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                                </svg>
  
                              </div>
  
                      <div class="col-span-2 sm:col-span-1">
                          <label for="nameOfDesissseAdd" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Name Of Desissse</label>
                          <input type="text" v-model="nameOfDesissseAdd" name="nameOfDesissseAdd" id="nameOfDesissseAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                          <label for="dateAdd" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Date</label>
                          <input type="date" v-model="dateAdd" name="dateAdd" id="dateAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                      </div>
                
                    
                  </div>
                  <button   type="submit" class="text-stone-200 inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                      <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                      Add 
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
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2 sm:col-span-1">
              <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Animal Code</label>
              <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
              {{ this.singleCode }}
            </span>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="animalName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Animal Name</label>
              <span type="text" id="animalName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleAnimalName }}
            </span>
            </div>
            <div class="col-span-2">
              <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Name Of Disease</label>
              <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleName }}
            </span>
            </div>
            <div class="col-span-2">
              <label for="singleDate" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Date</label>
              <span type="date" id="singleDate"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleDate }}
            </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

<!--update item modal-->



<!-- Euthanasia Update Modal -->
<div v-if="update" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  <div class="relative p-4 w-full max-w-md max-h-full">
    <div class="relative bg-black rounded-lg shadow-sm">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
        <h3 class="text-lg font-semibold text-gray-900">Update Euthanasia Record</h3>
        <button @click="update = false" type="button" class="text-gray-400 hover:bg-white rounded-lg w-8 h-8 flex justify-center items-center">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"></path>
          </svg>
        </button>
      </div>

      <!-- Body -->
      <form @submit.prevent="handleUpdate" class="p-4">
        <div class="grid gap-4 mb-4 grid-cols-1">
          <!-- Date -->
          <div>
            <label for="date" class="block mb-2 font-medium text-gray-900">Euthanasia Date</label>
            <input type="date" id="date" v-model="date" required class="w-full p-2.5 border border-emerald-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
          </div>

       
        </div>

        <button type="submit" class="bg-emerald-700 hover:bg-emerald-800 text-stone-200 font-medium rounded-lg px-5 py-2.5 inline-flex items-center">
          <svg class="w-5 h-5 me-1 -ms-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
          </svg>
          Update
        </button>
      </form>
    </div>
  </div>
</div>




<!-- MODAL ZA EUTANAZIJU -->
<div v-if="showRemuve" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <!-- Modal Content -->
  <div class="rounded-lg relative flex flex-col justify-between shadow-lg"
       style="background-image: url('/remuve.png'); background-size: cover; background-position: center; width: 500px; height: 700px;">

 <!-- Naslov modala -->
<h2 class="text-2xl font-bold mb-4 p-4 mt-2 rounded-t-lg text-center mx-auto">
  Euthanasia
</h2>


    <!-- Telo modala -->
    <div class="p-8 flex flex-col items-center rounded-b-lg w-full ">

      
    
      <!-- Info tekst -->
      <p class="mb-6 text-center text-gray-700">
       Confirm animal euthanasia?
      </p>

      <!-- Form dugmad -->
      <div class="flex gap-4 justify-center">
        <!-- Agree dugme -->
        <button
          @click="approveEuthanasia(this.remuveitem)"
          class="px-6 py-3 rounded bg-green-600 hover:bg-green-700 text-stone-200 font-bold transition duration-200">
          Agree
        </button>

        <!-- Cancel dugme -->
        <button
          @click="showRemuve = false"
          class="px-6 py-3 rounded bg-red-600 hover:bg-red-700 text-stone-200 font-bold transition duration-200">
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>



  </template>
  
  <script>
  //nema dobar alert i napravi da je info širi
  //napravi ako nešto ne može se učitat da je push to home nakon npr 5000
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
        remuveitem: null,
        showRemuve: false,
        loadingError:false,
        add:false,
        single: false,
        update: false,
        singleCode: '',
        singleDate: '',
        singleName: '',
        singleAnimalName: '',
        code: '',
        animalExists: null,
        dateAdd: '',
       nameOfDesissseAdd: '',
       complitedAdd:false,
          update: false,
          idUpdate: null,
          date: '',
          complited: '',
        items: [],
        filters: {
          date: '',
          name: '',
        },
      };
    },
    computed: {
     filteredItems() {
    const query = this.generalSearchQuery?.toLowerCase().trim() || '';

    return this.items.filter(item => {
      const animalIdMatch = item.animalId?.toString().toLowerCase().includes(query);
      const diseaseMatch = item.nameOfDesissse?.toLowerCase().includes(query);
      const dateMatch = this.formatDate(item.date)?.toLowerCase().includes(query);

      return animalIdMatch || diseaseMatch || dateMatch;
    });
  }
    },
    mounted() {
      this.fetchData();
    },
    methods: {
       openRemoveModal(item) {
    this.remuveitem = item;
    console.log("Remove item:", this.remuveitem);
    this.showRemuve = true;
  },
      async approveEuthanasia(animalR) {
  try {
    console.log("Euthanasia id:"+animalR.id);
    
    const response = await instance.put(`animal/updateAnimalRecord/`, {
      animalId: parseInt(animalR.animalId),
      recordId: 8, // eutanazija
    }, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    console.log("Response from updateAnimalRecord:", response.data);
  await instance.put("animal/updateEuthanasiaDomainDone", {
          id: parseInt(animalR.id),
          complited: true
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
    if (response.status === 200) {
      await Swal.fire({
        title: "Animal euthanized!",
        icon: "success",
        draggable: true
      });
      window.location.reload();
    } else {
      await Swal.fire({
        title: "Oops!",
        icon: "error",
        draggable: true
      });
    }
  } catch (error) {
    console.error(error);
    await Swal.fire({
      title: "Error occurred!",
      icon: "error"
    });
  }
},
   openUpdateModal(item) {
      this.update = true;
      this.idUpdate = item.id;
      this.date = item.date; // Format za <input type="date">
      this.complited = item.complited;
    },
    async handleUpdate() {
      try {
        console.log("Update id:"+this.idUpdate);
        console.log("Update date:"+this.date);
        console.log("Update complited:"+this.complited);
        await instance.put("animal/updateEuthanasiaDomain", {
          id: this.idUpdate,
          date:`${this.date}T00:00:00.00`,
         
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });

        await Swal.fire({
          title: "Euthanasia updated",
          icon: "success"
        });

        this.update = false;
        window.location.reload();

      } catch (error) {
        await Swal.fire({
          title: "Update failed",
          text: "There was a problem while updating euthanasia record.",
          icon: "error"
        });
      }
    },

  
      async openSinglModal(item) {
          this.single = true;
          this.singleCode = item.animalId;
          this.singleName = item.nameOfDesissse;
          this.singleDate = item.date.split('T')[0]; // Extract date part
          this.loadingError=true;
          const animalResponse = await instance.get(`animal/allanimal/${this.singleCode}`);
              const animalData = animalResponse.data;
               this.singleAnimalName=animalData.name;
             if(this.singleAnimalName!=null) {
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
           
            console.log("Id animal:"+this.singleAnimalName); 
        },
      async handleSubmit(){
        try{
          console.log("Register id:"+this.registerId);
          const response = await instance.post('animal/addEuthanasia',{
            animalId:this.registerId,
            date: `${this.dateAdd}T00:00:00.00` ,
            nameOfDesissse: this.nameOfDesissseAdd,
            complited: this.complitedAdd
          },
            {
              headers: {Authorization: `Bearer ${this.token}`,   },
            } );
            await  Swal.fire({
                    title: "Item added!",
                    draggable: true,
                    icon: "success"
                  });
                  if(response.status==200){
                    window.location.reload();
                  }
               
        }
        catch(error){
          console.log('There was an error!', error);
          await  Swal.fire({
                title: "Ooops!",
                text: "There was an error!",
                draggable: true,
                icon: "error"
              });
        }},

      async checkAnimal(id) {
        try{
              const animalResponse = await instance.get(`animal/allanimal/${id}`);
              const animalData = animalResponse.data;       
              this.registerId=animalData.idAnimal;
              this.singleAnimalName=animalData.name;
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
              const response = await instance.get('animal/euthanasia_db');
              console.log("Euthanasia data:", response.data);
              this.items = response.data;
              if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                } 
              console.log(this.items);
            } catch (error) {
              setTimeout(() => {
                this.loadingError = true; 
                }, 5000)
                this.$router.push(`/vetHome`);

              console.error('There was an error!', error);
            }
          },
        getTodayDate(endD) {
            const today = new Date();
            const endDate = new Date(endD);
         
       
          },
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
          }
        },
    watch: {
      filters: {
        handler() {
          this.filteredItems = this.items.filter(item => {
            return (
              (!this.filters.date || item.date.includes(this.filters.date)) &&
              (!this.filters.nameOfDesissse || item.nameOfDesissse=== this.filters.nameOfDesissse) &&
              (!this.filters.animalId || item.animalId === this.filters.animalId)
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
    