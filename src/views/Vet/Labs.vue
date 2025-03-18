<template>
  <div class="flex">
    <div class="w-1/6 text-white p-4 rounded-l-lg">
      <WorkerNavigation />
    </div>
    <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Labs</h1>

      <button type="button" @click="add=true" class="mb-4 text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
        <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
        </svg>
        <span class="block text-sm font-bold mx-2">Add Labs</span>
      </button>

      <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-sm font-bold text-white uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-sm font-bold text-white uppercase tracking-wider">Animal Code</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-sm font-bold text-white uppercase tracking-wider">Date</th>        
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-sm font-bold text-white uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id"   class="border-b border-customBlack cursor-pointer" >
              <td class="px-5 py-5 text-sm font-bold text-center">
              <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
               </svg>
              </td>
              <td class="px-5 py-5 text-sm font-bold text-center">{{ item.animalId}}</td>
              <td class="px-5 py-5 text-sm font-bold text-center">{{formatDate( item.dateTime) }}</td>
              <td class="px-5 py-5 text-sm font-bold text-center">
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






 <!-- Single item modal -->
 <div v-if="single" class="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center overflow-x-auto custom-scrollbar">
    <div class="relative  p-4 w-5xl h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
             Details
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
                  <div class="grid gap-6 mb-4 grid-cols-6  sm:col-span-1 mb-4">
                    

                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                      {{ this.itemAnimal.name }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <label for="animalName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Family</label>
                      <span type="text" id="animalName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ itemAnimal.family }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Species</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.species }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subspecies</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.subspecies }}
                    </span>
                    </div>
                   

                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.gender }}
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.age }} years
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.weight }} kg
                    </span>
                    </div>
                    
                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hight</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.height }} cm
                    </span>
                    </div>
                    
                    <div class="col-span-2 sm:col-span-2">
                      <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lenght</label>
                      <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                        {{ this.itemAnimal.length }} cm
                    </span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="this.itemAnimal.neutered" class="sr-only peer" disabled>
                        <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900  dark:text-white">Neutered</span>
                      </label>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemAnimal.vaccinated" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900  dark:text-white">Vaccinated</span>
                  </label>
                </div>
              
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemAnimal.trained" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900  dark:text-white">Trained</span>
                  </label>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemAnimal.socialized" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900  dark:text-white">Socialized</span>
                  </label>
                </div>  
                <div class="col-span-2 sm:col-span-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="this.itemAnimal.microchipped" class="sr-only peer" disabled>
                    <div class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-700 dark:peer-focus:ring-green-900 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-green-800"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900  dark:text-white">Microchipped</span>
                  </label>
                </div>
                  </div>
                  <div class="relative py-4">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-b border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center">
                      <span class="bg-white px-4 text-sm text-gray-500">Biometrics</span>
                    </div>
                  </div>
                  <div class="overflow-x-auto  sm:rounded-lg mt-4 ">
                   
        <table class="min-w-full leading-normal ">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-gray-500  bg-gray-200 text-center text-sm font-bold text-gray-600 uppercase tracking-wider">Name</th>
              <th class="px-5 py-3 border-b-2 border-gray-500  bg-gray-200  text-center text-sm font-bold text-gray-600 uppercase tracking-wider">Value</th>
              <th class="px-5 py-3 border-b-2 border-gray-500  bg-gray-200 text-center text-sm font-bold text-gray-600 uppercase tracking-wider">Remarks</th>        
            </tr>
          </thead>
          <tbody>
            <tr v-for="itemp in itemsParm" :key="itemp.id"   class="border-b-2 border-gray-400 cursor-pointer" >
              <td class="px-5 py-5 text-sm font-bold text-gray-600 text-center">{{ itemp.parameterName}}</td>
              <td class="px-5 py-5 text-sm font-bold text-gray-600 text-center">{{ itemp.parameterValue + itemp.measurementUnits}}</td>
              <td class="px-5 py-5 text-sm font-bold text-gray-600 text-center">{{itemp.remarks}}</td>
       
            </tr>
          </tbody>
        </table>
      </div>
        </form>
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
                  <h3 class="text-lg font-semibold text-gray-700 dark:text-white">
                      Add Lab Results
                  </h3>
                  <button @click="add = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
              </div>

                  <div>
                                <ol class="flex items-center w-full ml-4 my-2">
                      <li class="flex w-full items-center text-emerald-600  after:content-[''] after:w-full after:h-1 after:border-b after:border-emerald-100 after:border-4 after:inline-block ">
                          <span class="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full lg:h-12 lg:w-12 ">
                              <svg class="w-3.5 h-3.5 text-emerald-600 lg:w-4 lg:h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                              </svg>
                          </span>
                      </li>
                      <li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block ">
                          <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 ">
                            <svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5" fill="currentColor"  viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                          <path d="M416 0c17.7 0 32 14.3 32 32c0 59.8-30.3 107.5-69.4 146.6c-28 28-62.5 53.5-97.3 77.4l-2.5 1.7c-11.9 8.1-23.8 16.1-35.5 23.9l0 0 0 0 0 0-1.6 1c-6 4-11.9 7.9-17.8 11.9c-20.9 14-40.8 27.7-59.3 41.5H283.3c-9.8-7.4-20.1-14.7-30.7-22.1l7-4.7 3-2c15.1-10.1 30.9-20.6 46.7-31.6c25 18.1 48.9 37.3 69.4 57.7C417.7 372.5 448 420.2 448 480c0 17.7-14.3 32-32 32s-32-14.3-32-32H64c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-59.8 30.3-107.5 69.4-146.6c28-28 62.5-53.5 97.3-77.4c-34.8-23.9-69.3-49.3-97.3-77.4C30.3 139.5 0 91.8 0 32C0 14.3 14.3 0 32 0S64 14.3 64 32H384c0-17.7 14.3-32 32-32zM338.6 384H109.4c-10.1 10.6-18.6 21.3-25.5 32H364.1c-6.8-10.7-15.3-21.4-25.5-32zM109.4 128H338.6c10.1-10.7 18.6-21.3 25.5-32H83.9c6.8 10.7 15.3 21.3 25.5 32zm55.4 48c18.4 13.8 38.4 27.5 59.3 41.5c20.9-14 40.8-27.7 59.3-41.5H164.7z"></path>
                          </svg>
                          </span>
                      </li>
                      <li class="flex items-center w-full">
                          <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 ">
                              <svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                              </svg>
                          </span>
                      </li>
                  </ol>
                  </div>


              <!-- Modal body -->
              <form class="p-4 md:p-5">
                  <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2 sm:col-span-1">
                              <label for="code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Animal code:</label>
                              <div class="flex items-center">
                              <input type="text" v-model="addAnimalId" id="code" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                               <div class="ml-2">
                              <svg v-if="this.animalExists && this.animalExists!=null && this.addAnimalId" class="w-5 h-5 fill-[#FFFD00]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                              </svg>
                              <svg v-if="!this.animalExists  && this.animalExists!=null && this.addAnimalId" class="w-5 h-5 fill-[#e00000]" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                              </svg>
                              </div>
                              </div>
                              </div>
                              
                              <div class="col-span-2 sm:col-span-1">
                                <label for="checkAnimal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Check</label>      
                                <svg @click="checkAnimal(this.addAnimalId)" class="w-8 h-8 ml- text-gray-500 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                                </svg>
                              </div>
                      <div class="col-span-2 sm:col-span-2">
                          <label for="dateAdd" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                          <input type="date" v-model="addDate" name="dateAdd" id="dateAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                      </div>
                  </div>
                
                  <button @click="handleSubmit" type="submit" class="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                    Next 
                    <svg class="ml-2 w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                  </svg>
                  </button>
                 
              </form>
          </div>
      </div>
  </div> 


 <!-- Main modal -->
 <div  v-if="addStepTwo" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="relative p-4 w-full max-w-md max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 class="text-lg font-semibold text-gray-700 dark:text-white">
                      Add Lab Biometrics
                  </h3>
                  <button @click="addStepTwo = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
              </div>
                  <div>
                                <ol class="flex items-center w-full ml-4 my-2">
                      <li class="flex w-full items-center text-emerald-600  after:content-[''] after:w-full after:h-1 after:border-b after:border-emerald-100 after:border-4 after:inline-block ">
                          <span class="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full lg:h-12 lg:w-12 ">
                              <svg class="w-3.5 h-3.5 text-emerald-600 lg:w-4 lg:h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                              </svg>
                          </span>
                      </li>
                      <li class="flex w-full items-center text-emerald-600  after:content-[''] after:w-full after:h-1 after:border-b after:border-emerald-100 after:border-4 after:inline-block ">
                          <span class="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full lg:h-12 lg:w-12 ">
                              <svg class="w-3.5 h-3.5 text-emerald-600 lg:w-4 lg:h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                              </svg>
                          </span>
                      </li>
                      <li class="flex items-center w-full">
                          <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 ">
                              <svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                              </svg>
                          </span>
                      </li>
                  </ol>
                  </div>
              <!-- Modal body -->
              <form class="p-4 md:p-5">
                  <div class="grid gap-4 mb-4 grid-cols-2">
                  
                        
                      <div class="col-span-2 sm:col-span-2">
                          <label for="addParametarName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                          <input type="text" v-model="addParametarName" name="addParametarName" id="addParametarName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                          <label for="addParametarValue" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Value</label>
                          <input type="text" v-model="addParametarValue" name="addParametarValue" id="addParametarValue" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                          <label for="addParametarMesurmentUnit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Measurement Units</label>
                          <input type="text" v-model="addParametarMesurmentUnit" name="addParametarMesurmentUnit" id="addParametarMesurmentUnit" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                      </div>
                
                  <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remarks</label>
                        <textarea id="description" v-model="addRemarks" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Write product description here"></textarea>                    
                    </div>
                    <div class="col-span-1 sm:col-span-1">
                    <button @click="handleSubmitParametar" type="submit" class=" mt-5 text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                      <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                  
                      Add 
                   
                  </button>
                    </div>
                    <div class="col-span-1 sm:col-span-1 ml-5">
                  <button @click="handleSubmitParametar" type="submit" class=" mt-5 text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                    Done 
                    <svg class="ml-2 w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                  </svg>
                  </button>
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
      animalExists:null,
      add: null,
      addStepTwo:null,
      done:null,
      addParametarName:"",
      addParametarValue:"",
      addParametarMesurmentUnit:"",
      addRemarks:"",
      addLabId:"",
      addAnimalId:"",
      registerId:"",
      addDate:"",
      update:false,
      single: false,
      singleDate:"",
      animalID:"",
      labid:"",
      itemAnimal:[],
      items: [],
      itemsParm:[],
    };
  },

  mounted() {
    this.fetchData();
  },
  methods: {
  async openSinglModal(item) {
      this.single = true;
      this.singleDate = item.dateTime;
      this.singleDate = item.date; 
      this.animalID=item.animalId;
      this.labid=item.id;
      console.log("Id animal: "+this.animalID);
      const responseparm =await instance.get(`animal/parameter_db/${this.labid}`);
      this.itemsParm=responseparm.data;
      const animalResponse = await instance.get(`animal/animal/${this.animalID}`);
      this.itemAnimal = animalResponse.data;
    },
    async fetchData() {
      try {
        const response = await instance.get('animal/labs_db');
        this.items = response.data;
        
      } catch (error) {
        console.error('There was an error!', error);
      }},
        formatDate(date) {
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          return new Date(date).toLocaleDateString(undefined, options);
        },
    async checkAnimal(id) {
          try{
                const animalResponse = await instance.get(`animal/allanimal/${id}`);
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
      
          this.addStepTwo=true;
          
          try{
              const responsel = await instance.post('animal/addLabs',{
                AnimalId:parseInt(this.registerId),
                DateTime: `${this.addDate}T00:00:00.00` ,
              },
                {
                  headers: {Authorization: `Bearer ${this.token}`,   },
                } );
                this.addLabId=response.data.id;

              }
            catch(error){
              console.log('There was an error!', error);
              alert("greska");
              await  Swal.fire({
                    title: "Ooops!",
                    text: "There was an error!",
                    draggable: true,
                    icon: "error"
                  });
                  
                }

          
        
      },

        
    async handleSubmitParametar(){
       
       
            
              try{
                const response = await instance.post('animal/addParametar',{
                  labId:parseInt(this.addLabId),
                  parameterName:this.addParametarName,
                  parameterValue:this.addParametarValue,
                  measurementUnits:this.addParametarMesurmentUnit,
                  remarks:this.addRemarks
                },
                  {
                    headers: {Authorization: `Bearer ${this.token}`,   },
                  } );
                  alert("ok");
                console.log("Response: "+ response.data );  
              }
              catch(error){
                console.log('There was an error!', error);
                alert("greska");
                await  Swal.fire({
                      title: "Ooops!",
                      text: "There was an error!",
                      draggable: true,
                      icon: "error"
                    });
              
              }},
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
  