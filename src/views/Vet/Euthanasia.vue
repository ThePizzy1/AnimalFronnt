<template>
    <div class="flex">
      <div class="w-1/6 text-white p-4 rounded-l-lg">
        <WorkerNavigation />
      </div>
      <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
        <h1 class="text-xl font-bold mb-4">Euthanasia</h1>
  
        <button @click="add = true" type="button" class="mb-4 text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
          <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
          </svg>
          <span class="block text-sm font-bold mx-2">Add Euthanasia</span>
        </button>
  
        <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Animal Code</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Name Of Desissse</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Date</th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
                <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
              </tr>
            </thead>
                  <tbody>
                          <tr v-for="item in filteredItems" :key="item.id" :class="{'cursor-not-allowed opacity-50': getTodayDate( item.complited) , 'cursor-allowed opacity-100': getTodayDate( item.endTime) }" class="border-b border-customBlack cursor-pointer" >
                                <td class="px-5 py-5 text-sm font-bold text-left">
                                    <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                </td>
                                <td class="px-5 py-5 text-sm font-bold text-left">{{item.animalId }}</td>
                                <td class="px-5 py-5 text-sm font-bold text-left">{{ item.nameOfDesissse }}</td>
                                <td class="px-5 py-5 text-sm font-bold text-left">{{ formatDate(item.date) }}</td>
                            <td class="px-5 py-5 text-sm font-bold text-left">
                                  <button type="button" class="mb-4 p-2 text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                                            <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"></path>
                                            </svg>
                                        <span class="block text-sm font-bold mx-2 ">Done</span>
                                  </button>
                            </td>
                              <td class="px-5 py-5 text-sm font-bold text-left">
                              <button @click="openUpdateModal(item)" type="button" class="mb-4 p-2 text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                                  <svg class="w-5 h-5 fill-[#ffffff]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M17.44 3a1 1 0 0 1 .707.293l2.56 2.56a1 1 0 0 1 0 1.414L18.194 9.78 14.22 5.806l2.513-2.513A1 1 0 0 1 17.44 3Zm-4.634 4.22-9.513 9.513a1 1 0 0 0 0 1.414l2.56 2.56a1 1 0 0 0 1.414 0l9.513-9.513-3.974-3.974ZM6 6a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 0 1 0-2h1V7a1 1 0 0 1 1-1Zm9 9a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                                    <path d="M19 13h-2v2h2v-2ZM13 3h-2v2h2V3Zm-2 2H9v2h2V5ZM9 3H7v2h2V3Zm12 8h-2v2h2v-2Zm0 4h-2v2h2v-2Z"/>
                                  </svg>

                                <span class="block text-sm font-bold mx-2 ">Update</span>
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
          <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      Add Animal for Euthanasia
                  </h3>
                  <button @click="add = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
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
                              <label for="code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Animal code:</label>
                              <div class="flex items-center">
                              <input type="text" v-model="code" id="code" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
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
                                <label for="checkAnimal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Check</label>      
                                <svg @click="checkAnimal(this.code)" class="w-8 h-8 ml- text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                                </svg>
  
                              </div>
  
                      <div class="col-span-2 sm:col-span-1">
                          <label for="nameOfDesissseAdd" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name Of Desissse</label>
                          <input type="text" v-model="nameOfDesissseAdd" name="nameOfDesissseAdd" id="nameOfDesissseAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                          <label for="dateAdd" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                          <input type="date" v-model="dateAdd" name="dateAdd" id="dateAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                      </div>
                
                    
                  </div>
                  <button @click="handleSubmit" type="submit" class="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
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
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Animal Details
          </h3>
          <button @click="single = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
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
              <label for="singleCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Animal Code</label>
              <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
              {{ this.singleCode }}
            </span>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="animalName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Animal Name</label>
              <span type="text" id="animalName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleAnimalName }}
            </span>
            </div>
            <div class="col-span-2">
              <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name Of Disease</label>
              <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleName }}
            </span>
            </div>
            <div class="col-span-2">
              <label for="singleDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
              <span type="date" id="singleDate"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleDate }}
            </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

<!--update item modal-->




     <!-- Main modal -->
     <div  v-if="update" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="relative p-4 w-full max-w-md max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                   Update Animal
                  </h3>
                  <button @click="update = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
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
  import Swal from 'sweetalert2'
  export default {
    components: {
      WorkerNavigation,
    },
    data() {
      return {
        add:false,
        single: false,
        update: false,
        singleCode: '',
        singleDate: '',
        singleName: '',
        singleAnimalName: '',
        updateCode: '',
        updateDate: '',
        updateName: '',
   
        code: '',
        animalExists: null,
        dateAdd: '',
       nameOfDesissseAdd: '',
       complitedAdd:false,


        items: [],
        filters: {
          date: '',
          name: '',
        },
        isLoading: true,
      };
    },
    computed: {
      filteredItems() {
        return this.items.filter(item => {
          return (!this.filters.date || item.data.includes(this.filters.date)) &&
                 (!this.filters.nameOfDesissse || item.nameOfDesissse===this.filters.nameOfDesissse) &&
                 (!this.filters.animalId || item.animalId === this.filters.animalId);
        });
      },
    },
    mounted() {
      this.fetchData();
    },
    methods: {
        openUpdateModal(item) {
      this.update = true;
  
      this.updateCode = item.animalId;
      this.updateName = item.nameOfDesissse;
      this.updateDate = item.date.split('T')[0]; // Extract date part
      console.log('id:', this.idUpdate);
      
        console.log('Name:', this.nameUpdate);
        console.log('Date:', this.dateUpdate);
        console.log('Description:', this.descriptionUpdate);
    },
    async openSinglModal(item) {
      this.single = true;
      this.singleCode = item.animalId;
      this.singleName = item.nameOfDesissse;
      this.singleDate = item.date.split('T')[0]; // Extract date part
      const animalResponse = await instance.get(`animal/allanimal/${this.singleCode}`);
          const animalData = animalResponse.data;
        this.singleAnimalName=animalData.name;
        console.log("Id animal:"+this.singleAnimalName); 
    },




  /**"animalId": 2,
    "date": "2026-05-20T00:00:00",
    "nameOfDesissse": "Operation text",
    "complited": false */
      async handleSubmit(){
     try{
       const response = await instance.post('animal/addEuthanasia',{
        animalId: this.registerId,
        date: `${this.dateAdd}T00:00:00.00` ,
        nameOfDesissse: this.nameOfDesissseAdd,
        complited: this.complitedAdd
                   
  
       },
       {
           headers: {
             Authorization: `Bearer ${this.token}`,  
     
           },
         }
     
     );

     Swal.fire({
             title: "Item added!",
             draggable: true,
             icon: "success"
           });
     window.location.reload();
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
          const response = await instance.get('animal/euthanasia_db');
          this.items = response.data; 
          console.log(this.items);
          this.isLoading = false;
        } catch (error) {
          console.error('There was an error!', error);
          this.isLoading = false;
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
    