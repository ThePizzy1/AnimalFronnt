<template>
  <div class="flex">
    <div class="w-1/6 text-white p-4 rounded-l-lg">
      <WorkerNavigation />
    </div>
    <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">News</h1>

      <button @click="add = true" type="button" class="mb-4 text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
        <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
        </svg>
        <span class="block text-sm font-bold mx-2">Add News</span>
      </button>

      <div class="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label for="name" class="block text-sm font-bold mb-2">Name:</label>
          <input v-model="filters.name" id="name" type="text" class="rounded-full text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white  shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
        </div>
        <div>
          <label for="description" class="block text-sm font-bold mb-2">Description:</label>
          <input v-model="filters.description" id="description" type="text" class="rounded-full text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
        </div>
        <div>
          <label for="dateTime" class="block text-sm font-bold mb-2">Date:</label>
          <input v-model="filters.dateTime" id="dateTime" type="date" class="rounded-full text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white  shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
        </div>
      </div>

      <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Date</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" class="border-b border-customBlack cursor-pointer" >
              <td class="px-5 py-5 text-sm font-bold text-left">
                  <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
             </td>  
              <td class="px-5 py-5 text-sm font-bold text-left"@click="navigateToDetails(item.id)">{{ item.name }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left"@click="navigateToDetails(item.id)">{{ formatDate(item.dateTime) }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">
                <button type="button"   @click="openUpdateModal(item)" class="mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                  <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">

                  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"></path>

                  </svg>
                 <span class="block text-sm font-bold mx-2 ">Update</span>
              </button>
              </td>
              <td class="px-5 py-5 text-sm font-bold text-left">
                <button  @click="remove(key)" type="button" class="mb-4  text-white bg-red-400 hover:bg-red-500 focus:ring-3 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"></path>
                  </svg>
              <span class="block text-sm font-bold mx-2 ">Remove</span>
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
                    Add News
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
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" v-model="nameAdd" id="name" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="News" required="">
                    </div>
                  
              
                    <div class="col-span-2 sm:col-span-2">
                        <label for="intake" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                        <input type="date" v-model="dateAdd" name="intake" id="intake" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0.25" required="">
                    </div>
              
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="description" rows="4" v-model="descriptionAdd" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Write description here"></textarea>                    
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

<!-- Update modal -->
<div v-if="update" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Update News</h3>
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
            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" name="name" v-model="nameUpdate" id="name" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="News" required="">
            </div>
            <div class="col-span-2 sm:col-span-2">
              <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
              <input type="date" v-model="dateUpdate" name="date" id="date" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="">
            </div>
            <div class="col-span-2">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea id="description" rows="4" v-model="descriptionUpdate" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Write description here"></textarea>
            </div>
          </div>
          <button @click="handleUpdate()" type="submit" class="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
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
            <div class="col-span-2 ">
              <label for="singleCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
              {{ this.singleItem.name }}
            </span>
            </div>
            <div class="col-span-2 ">
              <label for="animalName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
              <span type="text" id="animalName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{formatDate(this.singleItem.dateTime) }}
            </span>
            </div>
            <div class="col-span-2">
              <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
              <span type="text" id="singleName"  class="overflow-x-auto custom-scrollbar bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.description }}
            </span>
            </div>
         
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
//dodaj button remuve u tablici
import WorkerNavigation from './WorkerNavigation.vue';
import instance from '@/axiosBase';
  import Swal from 'sweetalert2'
export default {
  components: {
    WorkerNavigation,
  },
  data() {
    return {
      add: false,
      items: [],
      nameAdd: '',
      dateAdd: '',
      descriptionAdd: '',
      update: false,
      idUpdate: '',
      nameUpdate: '',
      dateUpdate: '',
      descriptionUpdate: '',

      single: false,
      singleItem:[],

      filters: {
        name: '',
        description: '',
        dateTime: '',
      },
      isLoading: true, // Početno stanje učitavanja
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return (!this.filters.name || item.name.includes(this.filters.name)) &&
               (!this.filters.description || item.description.includes(this.filters.description)) &&
               (!this.filters.dateTime || new Date(item.dateTime).toISOString().split('T')[0] === this.filters.dateTime);
      });
    },
    
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async remove(id){
    await  Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
        
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
          const newsResponse =  instance.delete(`animal/deleteNews/${id}`);
           console.log(newsResponse);

          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      
    },
    async openSinglModal(item) {
      this.single = true;
      this.singleItem = item;
      
    },

    openUpdateModal(item) {
      this.update = true;
      this.idUpdate = item.id;
      this.nameUpdate = item.name;
      this.dateUpdate = item.dateTime.split('T')[0]; // Extract date part
      this.descriptionUpdate = item.description;
      console.log('id:', this.idUpdate);
      
        console.log('Name:', this.nameUpdate);
        console.log('Date:', this.dateUpdate);
        console.log('Description:', this.descriptionUpdate);
    },
    async handleUpdate() {
      try {
        const id = this.$route.params.id;
        
        const response = await instance.put("animal/updateNewsDomain", {
          Id: idUpdate,
          Name: this.nameUpdate,
          Description: this.descriptionUpdate,
          DateTime: `${this.dateUpdate}T00:00:00.00`
        
        },
    
        {
          headers: {
            Authorization: `Bearer ${this.token}`,  // Authorization header
          },
        });

      await  Swal.fire({
            title: "Item added!",
            draggable: true,
            icon: "success"
          });
        window.location.reload();
      } catch (error) {
        console.log('id:', this.idUpdate);
        
        console.log('Name:', this.nameUpdate);
        console.log('Date:', this.dateUpdate);
        console.log('Description:', this.descriptionUpdate);
        console.error('There was an error!', error);
        alert("Item not updated!");
        await Swal.fire({
            title: "Oops!",
            text: "Failed to add item. Try again.",
            draggable: true,
            icon: "warning"
          });
      }
    },



    async handleSubmit() {
    try {
      const response = await instance.post('animal/addNews', {
        name: this.nameAdd,
        dateTime: `${this.dateAdd}T00:00:00.00`,
        description: this.descriptionAdd
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,  // Authorization header
        },
      });

      Swal.fire({
            title: "Item added!",
            draggable: true,
            icon: "success"
          });
      window.location.reload();
    } catch (error) {
      console.log('Name:', this.nameAdd);
      console.log('Date:', `${this.dateAdd}T00:00:00.00`);
      console.log('Description:', this.descriptionAdd);
      console.error('There was an error!', error);
      Swal.fire({
            title: "Oops!",
            text: "Failed to add item. Try again.",
            draggable: true,
            icon: "error"
          });
    }
  },
    async fetchData() {
      try {
        const response = await instance.get('animal/news_db');
        this.items = response.data;
        console.log(this.items);
        this.isLoading = false;
      } catch (error) {
        console.error('There was an error!', error);
        this.isLoading = false;
      }
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
            (!this.filters.name || item.name.includes(this.filters.name)) &&
            (!this.filters.description || item.description.includes(this.filters.description)) &&
            (!this.filters.dateTime || new Date(item.dateTime).toISOString().split('T')[0] === this.filters.dateTime)
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
  