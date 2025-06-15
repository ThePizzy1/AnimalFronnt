<template>
 
  <div class="container mx-auto px-4">
    <div class="flex">
       <Loading v-if="loadingError" /> 

      <VetNavigation class="w-1/6" />
      <div class="w-5/6  rounded-lg overflow-hidden text-white ml-auto">
        <h1 class="ml-5 text-2xl font-bold mb-4 text-white">Animal List</h1>
        <div class="mb-4 mx-5">
          <form @submit.prevent="searchAnimals">
            <div class="grid grid-cols-4 gap-4 ">
              <div>
                <label for="family" class="block text-base font-bold mb-2">Family:</label>
                <select v-model="filters.family" id="family" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                  <option value="">All</option>
                  <option v-for="family in families" :key="family" :value="family">{{ family }}</option>
                </select>
              </div>
              <div>
                <label for="species" class="block text-base font-bold mb-2">Species:</label>
                <select v-model="filters.species" id="species" class= "text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                  <option value="">All</option>
                  <option v-for="species in speciesList" :key="species" :value="species">{{ species }}</option>
                </select>
              </div>
              <div>
                <label for="subspecies" class="block text-base font-bold mb-2">Subspecies:</label>
                <select v-model="filters.subspecies" id="subspecies" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                  <option value="">All</option>
                  <option v-for="subspecies in subspeciesList" :key="subspecies" :value="subspecies">{{ subspecies }}</option>
                </select>
              </div>
              <div>
                <label for="gender" class="block text-base font-bold mb-2">Gender:</label>
                <select v-model="filters.gender" id="gender" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                  <option value="">All</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="filters.neutered" class="sr-only peer">
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span class="ms-3 text-base font-medium text-white dark:text-gray-300">Neutered</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="filters.vaccinated" class="sr-only peer">
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span class="ms-3 text-base font-medium text-white  dark:text-gray-300">Vaccinated</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="filters.microchipped" class="sr-only peer">
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span class="ms-3 text-base font-medium text-whitedark:text-gray-300">Microchipped</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="filters.trained" class="sr-only peer">
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span class="ms-3 text-base font-medium text-white  d">Trained</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="filters.socialized" class="sr-only peer">
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span class="ms-3 text-base font-medium text-white">Socialized</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="filters.adopted" class="sr-only peer">
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span class="ms-3 text-base font-medium text-white" >Adopted</span>
                </label>
              </div>
            </div>
           
          </form>
        
  <table class="min-w-full leading-normal">
    <thead>
      <tr>
        <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider"></th>
        <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Name</th>
        <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Family</th>
        <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Species</th>
        <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Subspecies</th>
        <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Age</th>
        <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Gender</th>
        <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-white uppercase tracking-wider">Adoption</th>
       
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in filteredItems" :key="item.idAnimal" class="border-b border-customBlack cursor-pointer">
        <td class="px-5 py-5 text-base font-bold text-left">
                    <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                </td>
        <td class="px-5 py-5 text-base font-bold">{{ item.name }}</td>
        <td class="px-5 py-5 text-base font-bold">{{ item.family }}</td>
        <td class="px-5 py-5 text-base font-bold">{{ item.species }}</td>
        <td class="px-5 py-5 text-base font-bold">{{ item.subspecies }}</td>
        <td class="px-5 py-5 text-base font-bold">{{ item.age }}<strong> y</strong></td>
        <td class="px-5 py-5 text-base font-bold">{{ item.gender }}</td>
        <td class="px-5 py-5 text-base font-bold text-left">
                <button @click="approveAdoption(item.idAnimal)" type="button" class="mb-4 p-2 text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                  <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

                          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                          <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"></path>
                          </svg>
                          <span class="block text-base font-bold mx-2 ">Approve</span>
                          </button>
                          </td>
                
                  </tr>
                </tbody>
              </table>
            </div>


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
            <span class="ms-3 text-base font-medium text-gray-900  dark:text-white">Trained</span>
          </label>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="this.itemsSingle.socialized" class="sr-only peer" disabled>
            <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
            <span class="ms-3 text-base font-medium text-gray-900  dark:text-white">Socialized</span>
          </label>
        </div>






          </div>
        </form>
      </div>
    </div>
  </div>




</template>
<script>
import instance from '@/axiosBase';
import VetNavigation from '../Vet/VetNavigation.vue';
import Loading from '../Loading.vue';
import Swal from 'sweetalert2'
export default {
  components: {
      VetNavigation,
      Loading,

   
  },
  data() {
    return {
      loadingError:false,
      items: [],
      families: [],
      speciesList: [],
      subspeciesList: [],
      itemsSingle: [],
      single: false,
      filters: {
        family: '',
        species: '',
        subspecies: '',
        gender: '',
        neutered: false,
        vaccinated: false,
        microchipped: false,
        trained: false,
        socialized: false,
        adopted: false,
       
      data: [] // Podaci koji će se prikazati kada dođu
   
      },
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return (!this.filters.family || item.family === this.filters.family) &&
               (!this.filters.species || item.species === this.filters.species) &&
               (!this.filters.subspecies || item.subspecies === this.filters.subspecies) &&
               (!this.filters.gender || item.gender === this.filters.gender) &&
               (!this.filters.neutered || item.neutered === this.filters.neutered) &&
               (!this.filters.vaccinated || item.vaccinated === this.filters.vaccinated) &&
               (!this.filters.microchipped || item.microchipped === this.filters.microchipped) &&
               (!this.filters.trained || item.trained === this.filters.trained) &&
               (!this.filters.socialized || item.socialized === this.filters.socialized) &&
               (!this.filters.adopted || item.adopted === this.filters.adopted);
      });
    },
  },
  mounted() {

   
   
    instance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    this.loadingError=true;
    instance.get('animal/animalAVet_db')
      .then(response => {
        this.items = response.data;
        if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                }
        this.populateFilters();

      })
      .catch(error => {
        this.loadingError=true;
        console.error('There was an error!', error);
      });
  },
 

  methods: {
    async approveAdoption(id){
    var response=  await instance.put(`animal/updateAnimalRecord/`,  { 
                            animalId:parseInt(id),
                            recordId:parseInt(6)
                          },
     { headers: {Authorization: `Bearer ${this.token}`,   },
    });

            console.log(" "+response.data);
            if(response.status==200){
              
          await Swal.fire({
                    title: "Animal approved!",
                    draggable: true,
                    icon: "success"
                  });
            }
            else{
              
          await Swal.fire({
                    title: "Opps!",
                    draggable: true,
                    icon: "alert"
                  });
            }
  },
    async openSinglModal(item) {
      this.single = true;
      this.itemsSingle=item;

    },

    navigateToDetails(idAnimal) {

    this.$router.push(`/vetSingleAnimal/${idAnimal}`);
  },
    populateFilters() {
      this.families = [...new Set(this.items.map(item => item.family))];
      this.speciesList = [...new Set(this.items.map(item => item.species))];
      this.subspeciesList = [...new Set(this.items.map(item => item.subspecies))];
    },
    searchAnimals() {
      this.loadingError=true;
      instance.get('animal/animal_pc', {
        params: this.filters
      })
      .then(response => {
        this.items = response.data;
        if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                }
      })
      .catch(error => {
        thias.loadingError=true;
        console.error('There was an error!', error);
      });
    },
  },
};
</script>
  <style scoped>




  .container {
    color: white;
    font-family: 'Poppins', sans-serif;
    margin-top: 15px;
  }
  
  .table {
    width: 100%;
  
    border-collapse: collapse;
   }

.td {
  padding: 12px 15px;
  font-size: 1rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 12px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  border: 3px solid transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

/* Fix scrollbar on Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.custom-scrollbar:hover {
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
}
</style>  