<template>
    <div class="container mx-auto px-4">  
      <!-- Navigation and content layout -->
      <div class="flex">
        <div class="w-1/6 text-white p-4 rounded-l-lg">
      <VetNavigation class="w-1/6" />
        </div>
        <!-- Warning message -->
        <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
          <h1 class="text-xl font-bold mb-4">Contageus animals</h1>
          <button  @click="add = true"  type="button" class="mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
          <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>

              </svg>
        <span class="block text-base font-bold mx-2 ">Add Animal</span>
        </button>
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label for="desisseName" class="block text-base font-bold mb-2">Desisse Name:</label>
          <select v-model="filters.desisseName" id="desisseName" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="desisseName in desisseName" :key="desisseName" :value="desisseName">{{ desisseName }}</option>
          </select>
        </div>
        <div>
          <label for="startTime" class="block text-base font-bold mb-2">Date:</label>
          <input v-model="filters.startTime" id="startTime" type="date" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"  />
        </div>
       
        <div>
          <label for="contageus" class="block text-base font-bold mb-2">Contageus:</label>
          <select v-model="filters.contageus" id="contageus" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="contageus in contageus" :key="contageus" :value="contageus">{{ contageus }}</option>
          </select>
        </div>
       
      </div>
      <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
        <table class="min-w-full leading-normal ">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Descriptio</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Date</th>
             <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider"></th>
             
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" :class="{  'cursor-not-allowed opacity-50': item.contageus==false}"  class="border-b border-customBlack cursor-pointer" >
              <td class="px-5 py-5 text-base font-bold text-left">
                    <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                </td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.desisseName }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.description }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ formatDate(item.startTime) }}</td>
          <td class="px-5 py-5 text-base font-bold text-left">
                <button type="button"   @click="update(item)" class="mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
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
    </div>
 <!-- Main modal -->
<div  v-if="add" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Contageus Animal
                </h3>
                <button @click="add = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form @submit.prevent="handleSubmit" class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Desisse Name</label>
                        <input type="text" v-model="desisseNameAdd" name="name" id="name" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type desisse name" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                        <label for="intake" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Date</label>
                        <input type="date" v-model="startTimeAdd" name="intake" id="intake" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0.25" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                            <label for="code" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Animal code:</label>
                            <div class="flex items-center">
                            <input type="text" id="code" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" v-model="code"/>
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
                              <label for="checkAnimal" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Check</label>      
                              <svg @click="checkAnimal" class="w-8 h-8 ml- text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                              </svg>

                            </div>


                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="description" v-model="descriptionAdd" rows="4" class="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Write product description here"></textarea>                    
                    </div>
                </div>
                <button   type="submit" class="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
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
                  <button @click="single = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
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
                      <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Name</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{ this.singleItem.desisseName }}
                    </span>
                    </div>
                
                
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Date</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{formatDate(this.singleItem.startTime) }}
                    </span>
                    </div>
                    <div class="col-span-2 ">
                      <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Descriptio</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{ this.singleItem.description }}
                    </span>
                    </div>
                   
                    <div class="col-span-2 ">
                      <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Animal Name</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{ this.itemsSingle.name }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="animalName" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Family</label>
                      <span type="text" id="animalName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ itemsSingle.family }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Species</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.species }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Subspecies</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.subspecies }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Age</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.age }}
                    </span>
                    </div>

                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Gender</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.gender }}
                    </span>
                    </div>

                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Weight</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.weight }}
                    </span>
                    </div>
                    
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Hight</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.height }}
                    </span>
                    </div>
                    
                    <div class="col-span-2 sm:col-span-1">
                      <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Lenght</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemsSingle.length }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="this.itemsSingle.neutered" class="sr-only peer" disabled>
                        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                        <span class="ms-3 text-base font-medium text-gray-900  dark:text-white">Neutered</span>
                      </label>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemsSingle.vaccinated" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-base font-medium text-gray-900  dark:text-white">Vaccinated</span>
                  </label>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemsSingle.microchipped" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-base font-medium text-gray-900  dark:text-white">Microchipped</span>
                  </label>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemsSingle.trained" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-base font-medium text-gray-900 dark:text-white ">Trained</span>
                  </label>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemsSingle.socialized" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-base font-medium text-gray-900  dark:text-white ">Socialized</span>
                  </label>
                </div>






                  </div>
                </form>
              </div>
            </div>
          </div>
  </template>
  
  <script>
  import { TimeScale } from 'chart.js';
  import VetNavigation from '../Vet/VetNavigation.vue';
  import instance from '@/axiosBase';
  import Swal from 'sweetalert2'
  export default {
    components: {
      VetNavigation,
    },
    data() {
    return {
      items: [],
      desisseName: [],
      description: [],
      startTime: [],
      contageus: [],

          animalIdSingle: '',
          single: false,
          singleItem:[],
          itemsSingle: [],

        add:false,
        desisseNameAdd:'',
        descriptionAdd:'',
        startTimeAdd:'',
        contageusAdd:'',
        code:'',
        usage:[],

      filters: {
        desisseName: '',
        startTime: '',
        contageus: '',
      },
     
      animalExists:null // Početno stanje učitavanja
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return (!this.filters.desisseName || item.desisseName === this.filters.desisseName) &&
               (!this.filters.startTime || item.startTime === this.filters.startTime) &&
               (!this.filters.contageus || item.contageus === this.filters.contageus);
      });
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
     async update(item) {
    try {
     
const response = await instance.put('animal/updateContageusAnimalsDomain',{
              id: item.id, },
          {
              headers: { Authorization: `Bearer ${this.token}`,  },
            });
  
console.log(response.data);
      await Swal.fire({
        title: "Updated!",
        icon: "success"
      });
      if(response.status==200){
              window.location.reload();
            }
          

    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: "Update failed.",
        icon: "error"
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
          
            const animalResponse = await instance.get(`animal/allanimal/${this.animalIdSingle}`);
                this.itemsSingle = animalResponse.data;
                console.log(this.itemsSingle);
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
    async handleSubmit(){
   try{
     const response = await instance.post('animal/addContageus',{
      animalId:this.registerId,
      desisseName:this.desisseNameAdd,
      startTime:`${this.startTimeAdd}T00:00:00.00` ,
      description:this.descriptionAdd,
      contageus:true
     },
     {
         headers: { Authorization: `Bearer ${this.token}`,   },
      } );
      
  await Swal.fire({
           title: "Item added!",
           draggable: true,
           icon: "success"
         });
         if(response.status==200){
           window.location.reload();
         }
        
     
 }
   catch(error){
    
   console.error('There was an error!', error);
   await Swal.fire({
           title: "Ooops!",
           text: "There was an error!",
           draggable: true,
           icon: "error"
         });
   } },


    async fetchData() {
      try {
        const response = await instance.get('animal/contageusanimals_db');
        this.items = response.data;
        console.log(this.items);
        this.populateFilters();
        
      } catch (error) {
        console.error('There was an error!', error);
        
      }
    },

    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    populateFilters() {
      this.desisseName = [...new Set(this.items.map(item => item.desisseName))];
      this.startTime = [...new Set(this.items.map(item => item.startTime))];
      this.contageus = [...new Set(this.items.map(item => item.contageus))];
    },
    navigateToDetails(id) {
      this.$router.push(`/singleContageusAnimal/${id}`);
    },
   
  },
  watch: {
    filters: {
      handler() {
        this.filteredItems = this.items.filter(item => {
          return (
            (!this.filters.desisseName || item.DesisseName === this.filters.desisseName) &&
            (!this.filters.startTime || item.StartTime === this.filters.startTime) &&
            (!this.filters.contageus || item.Contageus === this.filters.contageus)
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
  