<template>
  <div class="flex">
    <div class="w-1/6 text-stone-200 p-4 rounded-l-lg">
       <Loading v-if="loadingError" /> 

      <WorkerNavigation />
    </div>
    <div class="w-5/6 text-stone-200 p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Animal Food Database</h1>

        <button
        @click="add = true"
        :disabled="userRole !== 'Menager'"
        type="button"
        class="mb-4 text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
        </svg>
        <span class="block text-base font-bold mx-2">Add food</span>
      </button>

      <div class="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label for="brandName" class="block text-base font-bold mb-2">Brand Name:</label>
          <select v-model="filters.brandName" id="brandName" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-black rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
          </select>
        </div>
        <div>
          <label for="foodType" class="block text-base font-bold mb-2">Food Type:</label>
          <select v-model="filters.foodType" id="foodType" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-black rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="type in foodTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <div>
          <label for="animalType" class="block text-base font-bold mb-2">Animal Type:</label>
          <select v-model="filters.animalType" id="animalType" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-black rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="animal in animalTypes" :key="animal" :value="animal">{{ animal }}</option>
          </select>
        </div>
        <div>
          <label for="ageGroup" class="block text-base font-bold mb-2">Age Group:</label>
          <select v-model="filters.ageGroup" id="ageGroup" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-black rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="age in ageGroups" :key="age" :value="age">{{ age }}</option>
          </select>
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
        <table class="min-w-full leading-normal ">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Brand Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Food Type</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Animal Type</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Age Group</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Weight</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Expiration Date</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Quantity</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider">Price</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-base font-bold text-stone-200 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" class="border-b border-customBlack cursor-pointer" >
              <td class="px-5 py-5 text-base font-bold text-left">
                  <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-stone-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
             </td>  
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.brandName }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.name }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.foodType }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.animalType }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.ageGroup }} years</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.weight }}{{ item.measurementWeight }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ formatDate(item.exporationDate) }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.quantity }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.price+" €" }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">
               
                <button  @click="increment(item.id)"  type="button" class="mb-4  text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
               <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
              </svg>
              <span class="block text-base font-bold mx-2 ">Add</span>
              </button>
              </td>
              <td class="px-5 py-5 text-base font-bold text-left">
              
                <button @click="decrement(item.id)" type="button" class="mb-4  text-stone-200 bg-red-400 hover:bg-red-500 focus:ring-3 focus:outline-none focus:ring-red-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"></path>
                  </svg>
              <span class="block text-base font-bold mx-2 ">Remove</span>
              </button>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>





  
   <!-- Main modal -->
<div  v-if="add" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center  items-center  overflow-x-auto custom-scrollbar">
    <div class="relative p-4 w-full max-w-md max-h-full custom-scrollbar">
        <!-- Modal content -->
        <div class="relative bg-black rounded-lg shadow-sm dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-stone-200">
                    Add Food
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
                        <label for="brandName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Brand Name</label>
                        <input type="text" name="brandName" id="brandName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Cuwex" v-model="brandNameAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="name" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Name</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bone123" v-model="nameAdd" required="">
                    </div>
                  
              
                    <div class="col-span-2 sm:col-span-1">
                        <label for="foodType" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Food Type</label>
                        <input type="text" name="foodType" id="foodType" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bone" v-model="foodTypeAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="animalType" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Animal Type</label>
                        <input type="text" name="animalType" id="animalType" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Dog" v-model="animalTypeAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                        <label for="ageGroup" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Age Group</label>
                        <input type="text" name="ageGroup" id="ageGroup" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2-5"v-model="ageGroupAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                        <label for="expirationDate" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Expiration Date</label>
                        <input type="date" name="expirationDate" id="expirationDate" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2-5"v-model="exporationDateAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="weith" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Weith</label>
                        <input    type="number" min="0" name="weith" id="weith" step="0.1" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="5"v-model="weightAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="mesurmentUnits" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Mesurment Units</label>
                        <input type="text" name="mesurmentUnits" id="mesurmentUnits" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="kg" v-model="measurementWeightAdd" required="">
                    </div>

                    <div class="col-span-2 sm:col-span-1">
                        <label for="weithPerServing" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Weight Per Serving</label>
                        <input    type="number" min="0" name="intweithPerServingake" step="0.01" id="weithPerServing" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="5" v-model="weightPerServingAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="mesurmentUnits" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Mesurment Units</label>
                        <input type="text" name="mesurmentUnits" id="mesurmentUnits" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="g" v-model="measurementPerServingAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="caloriesPerServingAdd" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Calories Per Serving</label>
                        <input    type="number" min="0" name="caloriesPerServingAdd" step="0.01" id="caloriesPerServingAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2.5"v-model="caloriesPerServingAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="fiberContent" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Fiber Content</label>
                        <input    type="number" min="0" name="fiberContent" step="0.01" id="fiberContent" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2.5" v-model="fiberContentAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="fatContent" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Fat Content</label>
                        <input    type="number" min="0" name="fatContent" step="0.01" id="fatContent" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2.5" v-model="fatContentAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="quantity" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Quantity</label>
                        <input    type="number" min="0"  name="quantity" step="1.0" id="quantity" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2" v-model="quantityAdd" required="">
                    </div>
                     <div class="col-span-2 sm:col-span-1">
                        <label for="quantity" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Price</label>
                        <input    type="number" min="0"  name="price" step="1.0" id="priceAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="10€/pc" v-model="priceAdd" required="">
                    </div>
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Notes</label>
                        <textarea id="description" rows="2" class="block p-1 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Write description here" v-model="notesAdd"></textarea>                    
                    </div>
                </div>
                
              
                <button  class="text-stone-200 inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
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
              <label for="singleCode" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Name</label>
              <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
              {{ this.singleItem.name }}
            </span>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="animalName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Barand Name</label>
              <span type="text" id="animalName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.brandName }}
            </span>
            </div>
            <div class="col-span-2">
              <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Food Type</label>
              <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.foodType }}
            </span>
            </div>
            <div class="col-span-2  ">
              <label for="singleDate" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Age Group</label>
              <span type="date" id="singleDate"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.ageGroup }}
            </span>
            </div>
            <div class="col-span-2  sm:col-span-1">
              <label for="singleDate" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Weight</label>
              <span type="date" id="singleDate"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.weight }}{{ this.singleItem.measurementWeight }}
            </span>
            </div>
          
            <div class="col-span-2  sm:col-span-1">
              <label for="singleDate" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Calories per Serving</label>
              <span type="date" id="singleDate"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.caloriesPerServing }}{{ this.singleItem.measurementPerServing }}
            </span>
            </div>
            <div class="col-span-2  sm:col-span-1">
              <label for="singleDate" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Fat Content</label>
              <span type="date" id="singleDate"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.fatContent }}
            </span>
            </div>
            <div class="col-span-2  sm:col-span-1">
              <label for="singleDate" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Fiber Content</label>
              <span type="date" id="singleDate"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.fiberContent }}
            </span>
            </div>
            <div class="col-span-2  ">
              <label for="singleDate" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Expiration Date</label>
              <span type="date" id="singleDate"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ formatDate(this.singleItem.exporationDate) }}
            </span>
            </div>
            <div class="col-span-2  ">
              <label for="singleDate" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Quantity</label>
              <span type="date" id="singleDate"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.quantity }}
            </span>
            </div>
            <div class="col-span-2  ">
              <label for="singleDate" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Notes</label>
              <span type="date" id="singleDate"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.notes }}
            </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

    
  
<script>
import Swal from 'sweetalert2'
import WorkerNavigation from './WorkerNavigation.vue';
import instance from '@/axiosBase';
import Loading from '../Loading.vue';

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
      add: false,
      items: [],
      brands: [],
      foodTypes: [],
      animalTypes: [],
      ageGroups: [],
      //brandName, name, foodType, animalType, ageGroup, weight, caloriesPerServing, weightPerServing, measurementPerServing, fatContent, fiberContent, exporationDate, quantity, notes, measurementWeight
      brandNameAdd: '',
      nameAdd: '',
      foodTypeAdd: '',
      animalTypeAdd: '',
      ageGroupAdd: '',
      weightAdd: '',
      caloriesPerServingAdd: '',
      weightPerServingAdd: '',
      measurementPerServingAdd: '',
      fatContentAdd: '',
      fiberContentAdd: '',
      exporationDateAdd: '',
      quantityAdd: '',
      notesAdd: '',
      measurementWeightAdd: '',
      quantityAdd: '',
      priceAdd: '',
      
      single: false,
      singleItem:[],

      filters: {
        brandName: '',
        foodType: '',
        animalType: '',
        ageGroup: '',
      },
      // Početno stanje učitavanja
    };
  },
  computed: {
   filteredItems() {
    const query = this.generalSearchQuery?.toLowerCase().trim() || '';

    return this.items.filter(item => {
      const brandMatch = item.brandName?.toLowerCase().includes(query);
      const nameMatch = item.name?.toLowerCase().includes(query);
      const typeMatch = item.foodType?.toLowerCase().includes(query);
      const animalMatch = item.animalType?.toLowerCase().includes(query);
      const ageGroupMatch = item.ageGroup?.toLowerCase().includes(query);
      const weightMatch = item.weight?.toString().toLowerCase().includes(query);
      const measurementMatch = item.measurementWeight?.toLowerCase().includes(query);
      const quantityMatch = item.quantity?.toString().toLowerCase().includes(query);
      const priceMatch = item.price?.toString().toLowerCase().includes(query);
      const expDateMatch = this.formatDate(item.exporationDate)?.toLowerCase().includes(query);

      return (
        brandMatch ||
        nameMatch ||
        typeMatch ||
        animalMatch ||
        ageGroupMatch ||
        weightMatch ||
        measurementMatch ||
        quantityMatch ||
        priceMatch ||
        expDateMatch
      );
    });
  }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async openSinglModal(item) {
      this.single = true;
      this.singleItem = item;
  
    },




    async increment(id){
      try {
        const response = await instance.put("animal/updateFoodDomainIncrement",{id:id});
    
        console.log(this.items);
        window.location.reload();
      } catch (error) {
        console.error('There was an error!', error);
      }
    },
     async decrement(id){
      try {
        if(this.items.find(item => item.id === id).quantity <= 0){
          Swal.fire({
            title: "Ooops!",
            text: "You can't take more items, there are none left!",
            icon: "warning"
          });
                    return;
        }else{
        const response = await instance.put("animal/updateFoodDomainDecrement",{id:id});
   
        console.log(this.items);
        window.location.reload();}
      } catch (error) {
        console.error('There was an error!', error);
      }


     },
     
    async handleSubmit(){


    try{
      const response = await instance.post('animal/addFood',{

                            Name: this.nameAdd,
                            AgeGroup: this.ageGroupAdd,
                            AnimalType: this.animalTypeAdd,
                            BrandName:  this.brandNameAdd,
                            CaloriesPerServing: this.caloriesPerServingAdd,
                            ExporationDate:`${this.exporationDateAdd}T00:00:00.00`,
                            FatContent:this.fatContentAdd,
                            FiberContent:this.fiberContentAdd,
                            FoodType: this.foodTypeAdd,//prolem
                            MeasurementPerServing: this.measurementPerServingAdd,
                            MeasurementWeight: this.measurementWeightAdd,
                            Notes: this.notesAdd,
                            Quantity: parseInt( this.quantityAdd),
                            Weight:  parseFloat( this.weightAdd),
                            WeightPerServing: parseFloat( this.weightPerServingAdd),
                            Price: parseFloat( this.priceAdd),

      },
      {
          headers: {
            Authorization: `Bearer ${this.token}`,  // Authorization header
    
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
      console.log('Name:', this.nameAdd);
                console.log('Food Type:', this.foodTypeAdd);
                console.log('Animal Type:', this.animalTypeAdd);
                console.log('Age Group:', this.ageGroupAdd);
                console.log('Weight:', this.weightAdd);
                console.log('Calories Per Serving:', this.caloriesPerServingAdd);
                console.log('Weight Per Serving:', this.weightPerServingAdd);
                console.log('Measurement Per Serving:', this.measurementPerServingAdd);
                console.log('Fat Content:', this.fatContentAdd);
                console.log('Fiber Content:', this.fiberContentAdd);
                console.log('Expiration Date:', `${this.exporationDateAdd}T00:00:00.00`);
                console.log('Quantity:', this.quantityAdd);
                console.log('Notes:', this.notesAdd);
                console.log('Measurement Weight:', this.measurementWeightAdd);
      console.error('There was an error!', error);
      Swal.fire({
            title: "Ooops!",
            text: "There was an error!",
            draggable: true,
            icon: "error"
          });

    }
    
    },
   async fetchData() {

      try {
        this.loadingError=true
        const response = await instance.get('animal/food_db');
        this.items = response.data;
        if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                }
        console.log(this.items);
        this.populateFilters();
        
      } catch (error) {
        setTimeout(() => {
                this.loadingError = true; 
                }, 5000)
                this.$router.push(`/workerHome`);
        console.error('There was an error!', error);
        
      }
    },
    populateFilters() {
      this.brands = [...new Set(this.items.map(item => item.brandName))];
      this.foodTypes = [...new Set(this.items.map(item => item.foodType))];
      this.animalTypes = [...new Set(this.items.map(item => item.animalType))];
      this.ageGroups = [...new Set(this.items.map(item => item.ageGroup))];
    },
    navigateToDetails(id) {
      this.$router.push(`/singleFood/${id}`);
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
            (!this.filters.brandName || item.BrandName === this.filters.brandName) &&
            (!this.filters.foodType || item.FoodType === this.filters.foodType) &&
            (!this.filters.animalType || item.AnimalType === this.filters.animalType) &&
            (!this.filters.ageGroup || item.AgeGroup === this.filters.ageGroup)
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
  