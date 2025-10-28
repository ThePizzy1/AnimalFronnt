<template>
  <div class="flex">
    <div class="w-1/6 text-stone-200 p-4 rounded-l-lg">
       <Loading v-if="loadingError" /> 

      <WorkerNavigation />
    </div>
    <div class="w-5/6 text-stone-200 p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Animal Toy Database</h1>
      <button @click="add = true" :disabled="userRole !== 'Menager'" type="button"   class="mb-4 text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
          <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>

              </svg>
        <span class="block text-base font-bold mx-2 ">Add toys</span>
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
          <label for="toyType" class="block text-base font-bold mb-2">Toy Type:</label>
          <select v-model="filters.toyType" id="toyType" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-black rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="type in toyTypes" :key="type" :value="type">{{ type }}</option>
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
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider">Brand Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider">Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider">Toy Type</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider">Animal Type</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider">Age Group</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider">Quantity</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider">Price</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-center text-base font-bold text-stone-200 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" class="border-b border-customBlack cursor-pointer" >
              <td class="px-5 py-5 text-base font-bold text-left">
                  <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-stone-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
             </td>  
              <td class="px-5 py-5 text-base font-bold text-center">{{ item.brandName }}</td>
              <td class="px-5 py-5 text-base font-bold text-center">{{ item.name }}</td>
              <td class="px-5 py-5 text-base font-bold text-center">{{ item.toyType }}</td>
              <td class="px-5 py-5 text-base font-bold text-center">{{ item.animalType }}</td>
              <td class="px-5 py-5 text-base font-bold text-center">{{ item.ageGroup }} years</td>  
              <td class="px-5 py-5 text-base font-bold text-center">{{ item.quantity }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">{{ item.price+" €" }}</td>
              <td class="px-5 py-5 text-base font-bold text-left">
                <button @click="increment(item.id)" type="button" class="mb-4  text-stone-200 bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-base p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
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
<div  v-if="add" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-black rounded-lg shadow-sm dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-stone-200">
                    Add Toys
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
                        <label for="name" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Brand Name</label>
                        <input type="text" name="name" id="name" v-model="brandNameAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Cuwex" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="name" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Name</label>
                        <input type="text" name="name" id="name" v-model="nameAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bone123" required="">
                    </div>
                  
              
                    <div class="col-span-2 sm:col-span-2">
                        <label for="intake" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Toy Type</label>
                        <input type="text" name="intake" id="intake" v-model="toyTypeAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bone" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                        <label for="intake" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Animal Type</label>
                        <input type="text" name="intake" id="intake" v-model="animalTypeAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Dog"required="" >
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                        <label for="intake" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Age Group</label>
                        <input type="text" name="intake" id="intake"  v-model="ageGroupAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2-5"required="" >
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="intake" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Width</label>
                        <input    type="number" min="0" name="intake" id="intake" step="0.01"  v-model="widthAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="5.50"required="" >
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="intake" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Heigh</label>
                        <input    type="number" min="0"  name="intake" id="intake" step="0.01" v-model="heightAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="5.50"required="">
                    </div>
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Notes</label>
                        <textarea id="description" rows="4"  v-model="notesAdd" class="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Write description here" required="" ></textarea>                    
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="quantity" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Quantity</label>
                        <input    type="number" min="0" id="quantity" step="1.0" rows="4"  v-model="quantityAdd" class="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="10" required="" >                    
                    </div>
                     <div class="col-span-2 sm:col-span-1">
                        <label for="quantity" step="0.01" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Price</label>
                        <input    type="number" min="0" id="price" rows="4"  v-model="priceAdd" class="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="10€/pc" required="" >                    
                    </div>
                </div>
                <button  type="submit" class="text-stone-200 inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
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
            <div class="col-span-2 sm:col-span-1">
              <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Toy Type</label>
              <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.toyType }}
            </span>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="singleName" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Animal Type</label>
              <span type="text" id="singleName"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.animalType }}
            </span>
            </div>
            <div class="col-span-2  ">
              <label for="singleDate" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Age Group</label>
              <span type="date" id="singleDate"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.ageGroup }}
            </span>
            </div>
            <div class="col-span-2  sm:col-span-1">
              <label for="singleDate" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Width</label>
              <span type="date" id="singleDate"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.width }} cm
            </span>
            </div>
          
            <div class="col-span-2  sm:col-span-1">
              <label for="singleDate" class="block mb-2 text-base font-medium text-gray-900 dark:text-stone-200">Hight</label>
              <span type="date" id="singleDate"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.hight }} cm
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
      toyTypes: [],
      animalTypes: [],
      ageGroups: [],
      brandNameAdd: '',
      nameAdd: '',
      toyTypeAdd: '',
      animalTypeAdd: '',
      ageGroupAdd: '',
      widthAdd: '',
      heightAdd: '',
      notesAdd: '',
      quantityAdd: '',
      priceAdd: '',

      single: false,
      singleItem:[],

      filters: {
        brandName: '',
        toyType: '',
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
      const typeMatch = item.toyType?.toLowerCase().includes(query);
      const animalMatch = item.animalType?.toLowerCase().includes(query);
      const ageGroupMatch = item.ageGroup?.toLowerCase().includes(query);
      const quantityMatch = item.quantity?.toString().toLowerCase().includes(query);
      const priceMatch = item.price?.toString().toLowerCase().includes(query);

      return (
        brandMatch ||
        nameMatch ||
        typeMatch ||
        animalMatch ||
        ageGroupMatch ||
        quantityMatch ||
        priceMatch
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
    async handleSubmit() {
    try {
      const response = await instance.post('animal/addToy', {
        brandName: this.brandNameAdd,
        name: this.nameAdd,
        animalType: this.animalTypeAdd,
        toyType: this.toyTypeAdd,
        ageGroup: this.ageGroupAdd,
        hight:parseFloat(this.heightAdd),
        width:parseFloat( this.widthAdd),
        quantity:parseInt( this.quantityAdd),
        notes: this.notesAdd,
        price:parseFloat( this.priceAdd),
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
      console.log('Toy Type:', this.toyTypeAdd);
      console.log('Animal Type:', this.animalTypeAdd);
      console.log('Age Group:', this.ageGroupAdd);
      console.log('Width:', this.widthAdd);
      console.log('Height:', this.heightAdd);
      console.log('Quantity:', this.quantityAdd);
      console.log('Notes:', this.notesAdd);
      console.error('There was an error!', error);
      Swal.fire({
            title: "Oops!",
            text: "There was an error adding the item!",
            draggable: true,
            icon: "error"
          });
    }
  },
    
    
    
    
    
    async increment(id){

try {
  const response = await instance.put("animal/updateToyDomainIncrement",{id:id});

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
      text: "You can't take more toys, there are none left!",
      icon: "error"
    });
              return;
  }else{
  const response = await instance.put("animal/updateToysDomainDecrement",{id:id});

  console.log(this.items);
  window.location.reload();}
} catch (error) {
  console.error('There was an error!', error);
}


},
    async fetchData() {
      try {
        this.loadingError = true;
        const response = await instance.get('animal/toys_db');
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
      this.toyTypes = [...new Set(this.items.map(item => item.toyType))];
      this.animalTypes = [...new Set(this.items.map(item => item.animalType))];
      this.ageGroups = [...new Set(this.items.map(item => item.ageGroup))];
    },
    navigateToDetails(id) {
      this.$router.push(`/singleToy/${id}`);
      console.log(`Navigate to details of item with ID: ${id}`);
    },
  },
  watch: {
    filters: {
      handler() {
        this.filteredItems = this.items.filter(item => {
          return (
            (!this.filters.brandName || item.brandName === this.filters.brandName) &&
            (!this.filters.toyType || item.toyType === this.filters.toyType) &&
            (!this.filters.animalType || item.animalType === this.filters.animalType) &&
            (!this.filters.ageGroup || item.ageGroup === this.filters.ageGroup)
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
  