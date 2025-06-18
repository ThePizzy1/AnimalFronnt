<template>
  <div class="flex">
    <div class="w-1/6 text-white p-4 rounded-l-lg">
     <WorkerNavigation />
    </div>
    <!-- Form -->
    <div class="w-3/6 text-white p-8 rounded-r-lg mb-2 mx-auto overflow-hidden ">
      <div class="mt-4 mb-4  p-2 border-2 border-natural-400 rounded-md shadow-sm hover:scale-105"> 
              <h2 class="text-xl mt-2 font-bold mb-4">Animal info</h2>        
     
      <div class="grid grid-cols-1 md:grid-cols-2 mb-5 lg:grid-cols-3 gap-4 mb-auto">
       
        <!-- Common Animal Fields -->
        <div>
          <label for="name" class="block text-base font-bold mb-2">Name:</label>
          <input type="text" id="name" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" v-model="name" />
        </div>
        <div>
          <label for="family" class="block text-base font-bold mb-2">Family:</label>
          <select id="family" v-model="selectedFamily" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
            <option value="Mammal">Mammal</option>
            <option value="Bird">Bird</option>
            <option value="Fish">Fish</option>
            <option value="Reptile">Reptile</option>
            <option value="Amphibian">Amphibian</option>
             <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label for="species" class="block text-base font-bold mb-2">Species:</label>
          <input type="text" id="species" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" v-model="species" />
        </div>
        <div>
          <label for="subspecies" class="block text-base font-bold mb-2">Subspecies:</label>
          <input type="text" id="subspecies" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" v-model="subspecies" />
        </div>
        <div>
          <label for="age" class="block text-base font-bold mb-2">Age:</label>
          <input    type="number" min="0" id="age" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" v-model="age" />
        </div>
        <div>
          <label for="gender" class="block text-base font-bold mb-2">Gender:</label>
          <select id="gender" v-model="gender" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label for="weight" class="block text-base font-bold mb-2">Weight:</label>
          <input    type="number" min="0" id="weight" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" v-model="weight" />
        </div>
        <div>
          <label for="height" class="block text-base font-bold mb-2">Height:</label>
          <input    type="number" min="0" id="height" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" v-model="height" />
        </div>
        <div>
          <label for="length" class="block text-base font-bold mb-2">Length:</label>
          <input    type="number" min="0" id="length" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" v-model="length" />
        </div>
        
        <div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="neutered" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span class="ms-3 text-base font-medium">Neutered</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="vaccinated" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span class="ms-3 text-base font-medium">Vaccinated</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="microchipped" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span class="ms-3 text-base font-medium overflow-hidden break-before-all">Microchipped</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="trained" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span class="ms-3 text-base font-medium">Trained</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="socialized" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span class="ms-3 text-base font-medium">Socialized</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="adopted" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focused:ring-4 peer-focused:ring-green-300 dark:peer-focused:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span class="ms-3 text-base font-medium">Adopted</span>
          </label>
        </div>
      </div>
      <div class="w-full px-2 mb-4">
        <label for="healthIssues" class="block text-base font-bold mb-2">Health Issues:</label>
        <textarea id="healthIssues" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="healthIssues"></textarea>
      </div>
      <div class="w-full px-2 mb-4">
        <label for="personalityDescription" class="block text-base font-bold mb-2">Personality Description:</label>
        <textarea id="personalityDescription" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="personalityDescription"></textarea>
      </div></div>
      <div class="mt-2 mb-2"></div>
      <!-- Additional Fields based on selected family -->
      <template v-if="selectedFamily === 'Mammal'">

        <div class="mt-auto p-2 border-2 border-natural-400 rounded-md shadow-sm hover:scale-105 overflow-hidden"> 
            <h2 class="text-xl mt-2 font-bold mb-4">Mammal info</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label for="coatType" class="block text-base font-bold mb-2">Coat Type:</label>
            <input type="text" id="coatType" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="coatType" />
          </div>
          <div>
            <label for="groomingProducts" class="block text-base font-bold mb-2">Grooming Products:</label>
            <input type="text" id="groomingProducts" class="text-gray-500 w-v py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="groomingProducts" />
          </div>
        </div></div>
      </template>
      <template v-else-if="selectedFamily === 'Bird'">
        <div class="mt-5 p-2 border-2 border-natural-400 rounded-md shadow-sm hover:scale-105 overflow-hidden"> 
           <h2 class="text-xl mt-2 font-bold mb-4">Bird info</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label for="cageSize" class="block text-base font-bold mb-2">Cage Size:</label>
            <input type="text" id="cageSize" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="cageSize" />
          </div>
          <div>
            <label for="recommendedToys" class="block text-base font-bold mb-2">Recommended Toys:</label>
            <input type="text" id="recommendedToys" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="recommendedToys" />
          </div>
          <div>
            <label for="sociability" class="block text-base font-bold mb-2">Sociability:</label>
            <input type="text" id="sociability" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="sociability" />
          </div>
        </div></div>
      </template>
      <template v-else-if="selectedFamily === 'Fish'">
        <div class="mt-5 p-2 border-2 border-natural-400 rounded-md shadow-sm hover:scale-105 overflow-hidden"> 
            <h2 class="text-xl mt-2 font-bold mb-4">Fish info</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label for="tankSize" class="block text-base font-bold mb-2">Tank Size:</label>
            <input type="text" id="tankSize" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="tankSize" />
          </div>
          <div>
            <label for="compatibleSpecies" class="block text-base font-bold mb-2">Compatible Species:</label>
            <input type="text" id="compatibleSpecies" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="compatibleSpecies" />
          </div>
          <div>
            <label for="recommendedItems" class="block text-base font-bold mb-2">Recommended Items:</label>
            <input type="text" id="recommendedItems" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="recommendedItems" />
          </div>
        </div></div>
      </template>

      <template v-else-if="selectedFamily === 'Reptile'">
        <div class="mt-5 p-2 border-2 border-natural-400 rounded-md shadow-sm hover:scale-105 overflow-hidden"> 
            <h2 class="text-xl mt-2 font-bold mb-4">Reptile info</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label for="tankSize" class="block text-base font-bold mb-2">Tank Size:</label>
            <input type="text" id="tankSize" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="tankSize" />
          </div>
          <div>
            <label for="sociability" class="block text-base font-bold mb-2">Sociability:</label>
            <input type="text" id="sociability" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="sociability" />
          </div>
          <div>
            <label for="compatibleSpecies" class="block text-base font-bold mb-2">Compatible Species:</label>
            <input type="text" id="compatibleSpecies" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="compatibleSpecies" />
          </div>
          <div>
            <label for="recommendedItems" class="block text-base font-bold mb-2">Recommended Items:</label>
            <input type="text" id="recommendedItems" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="recommendedItems" />
          </div>
        </div></div>
      </template>
      <template v-else-if="selectedFamily === 'Amphibian'">
        <div class="mt-5 p-2 border-2 border-natural-400 rounded-md shadow-sm hover:scale-105 overflow-hidden"> 
          <h2 class="text-xl mt-2 font-bold mb-4">Amphibian info</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label for="humidity" class="block text-base font-bold mb-2">Humidity:</label>
            <input type="text" id="humidity" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="humidity" />
          </div>
          <div>
            <label for="temperature" class="block text-base font-bold mb-2">Temperature:</label>
            <input type="text" id="temperature" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="temperature" />
          </div>
        </div></div>
      </template>
  <template v-else-if="selectedFamily === 'Other'">
        <div class="mt-5 p-2 border-2 border-natural-400 rounded-md shadow-sm hover:scale-105 overflow-hidden"> 
          <h2 class="text-xl mt-2 font-bold mb-4">Enter the animal's family</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
            <input type="text" id="otherFamily" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="other" />
          </div>
        </div></div>
      </template>
  


      <!-- Surenderer info -->
      <div class="mt-4 p-2 border-2 border-natural-400 rounded-md shadow-sm hover:scale-105 overflow-hidden">
    <h2 class="text-xl mt-2 font-bold mb-4">Surenderer info</h2>
    <div class="grid grid-cols-1 md:grid-cols-2  gap-4 mb-4">
      <div>
      <label for="username" class="block text-base font-bold mb-2">Username Surenderer:</label>
      <div class="flex items-center">
        
        <input type="text" id="username" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="username"/>
      <div class="ml-2">
        <svg v-if="this.userExists && this.userExists!=null && this.username" class="w-5 h-5 fill-[#FFFD00]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
        </svg>
        <svg v-if="!this.userExists  && this.userExists!=null && this.username" class="w-5 h-5 fill-[#e00000]" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
        </div>
      </div>
    </div>
      <div>
      <label for="checkUser" class="block text-base font-bold mb-2">Check User</label>
     
       
        
        <svg @click="checkUser" class="w-10 h-10 text-white dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
        </svg>
      
       
      </div>
    </div>
  </div>


<!-- Owner info -->
<div class="mt-4 p-2 border-2 border-natural-400 rounded-md shadow-sm hover:scale-105 overflow-hidden">
  <h2 class="text-xl mt-2 font-bold mb-4">Owner info</h2>

<!-- Switch -->
<label class="inline-flex items-center cursor-pointer mb-4">
  <input type="checkbox" v-model="isEditable" class="sr-only peer" />
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
  <span class="ms-3 text-base font-medium">Omogući uređivanje</span>
</label>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
    <div>
      <label for="name" class="block text-base font-bold mb-2">Name:</label>
      <input
        type="text"
        id="ownerName"
        v-model="ownerName"
        :disabled="!isEditable"
        :class="[
          'w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none',
          isEditable
            ? 'bg-white text-gray-700 border-gray-300 focus:ring-primary-500 focus:border-primary-500'
            : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
        ]"
      />
    </div>
    <div>
      <label for="surname" class="block text-base font-bold mb-2">Surname:</label>
      <input
        type="text"
        id="ownerSurname"
        v-model="ownerSurname"
        :disabled="!isEditable"
        :class="[
          'w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none',
          isEditable
            ? 'bg-white text-gray-700 border-gray-300 focus:ring-primary-500 focus:border-primary-500'
            : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
        ]"
      />
    </div>
    <div>
      <label for="oib" class="block text-base font-bold mb-2">OIB:</label>
      <input
        type="text"
        id="oib"
        v-model="ownerOIB"
        :disabled="!isEditable"
        :class="[
          'w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none',
          isEditable
            ? 'bg-white text-gray-700 border-gray-300 focus:ring-primary-500 focus:border-primary-500'
            : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
        ]"
      />
    </div>
    <div>
      <label for="phoneNumber" class="block text-base font-bold mb-2">Phone Number:</label>
      <input
        type="text"
        id="phoneNumber"
        v-model="ownerPhoneNumber"
        :disabled="!isEditable"
        :class="[
          'w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none',
          isEditable
            ? 'bg-white text-gray-700 border-gray-300 focus:ring-primary-500 focus:border-primary-500'
            : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
        ]"
      />
    </div>
  </div>
</div>



  <!-- Found info -->


  <div class="mt-4 p-2 border-2 border-natural-400 rounded-md shadow-sm hover:scale-105 overflow-hidden">
      <h2 class="text-xl mt-2 font-bold mb-4">Found info</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
   
      <div>
        <label for="adress" class="block text-base font-bold mb-2">Adress:</label>
        <input type="text" id="adress" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" v-model="adress" />
      </div>
      <div>
        <label for="date" class="block text-base font-bold mb-2">Date:</label>
        <input type="date" id="date" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" v-model="date" />
      </div> 
                      
                      <div>
                        <label for="time" class="block text-base font-bold mb-2">Time:</label>
                        <div class="relative">
                        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                          <svg class="w-2 h-2 fill-[#8e8e8e]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

                                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>

                                </svg>
                        </div>
                        <input type="time" id="time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-base rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"v-model="time" min="09:00" max="18:00" value="00:00" required />
                    </div>  
                  </div> 

      
          <div class="w-full px-2 mb-4 ">
        <label for="description" class="block text-base font-bold mb-2"> Description:</label>
        <textarea id="description" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" v-model="description"></textarea>
      </div>

    </div>
</div>














      <div class="mt-2 p-2">
        <label for="image" class="mt-2 block text-base font-bold mb-2 text-white">Image:</label>
        <div class="flex items-center justify-center w-full ">
          <label :key="fileName" for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:scale-105">
            <div v-if="!fileName" class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p class="mb-2 text-base text-white"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            </div>
            <div v-else class="flex flex-col items-center justify-center pt-5 pb-6">
              <p class="mb-2 text-base text-white">{{ fileName }}</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" @change="onFileChange" />
          </label>
        </div>
      </div>
      <!-- Submit Button -->
      <div class="mt-4">
        <button @click="handleSubmit" class="text-white bg-green-700 hover:bg-emerald-700 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Submit</button>
      </div>
    </div>
  </div>

</template>



<script>
//zapis životinje, rekorda, gdje je životinja pronađena, napravi nešto da se može upisat id osobe koja je donjela životinju
//Dodaj zapis pojedinih podataka životinja primjer ti je u single animal admin pod brianjem


import WorkerNavigation from '../Worker/WorkerNavigation.vue';
  import Swal from 'sweetalert2'
import instance from '@/axiosBase';
//import jwtDecode from 'jwt-decode';

localStorage.getItem('userRole');
console.log(localStorage.getItem('userRole'));
export default {
  components: {

    WorkerNavigation
  },
  data() {
    return {

      token: localStorage.getItem('worker_token'),
      role: "", 
      name: '',
      selectedFamily: '',
      species: '',
      subspecies: '',
      age: '',
      gender: '',
      weight: '',
      height: '',
      length: '',
      neutered: false,
      vaccinated: false,
      microchipped: false,
      trained: false,
      socialized: false,
      adopted: false,
      coatType: '',
      groomingProducts: '',
      cageSize: '',
      tankSize: '',
      humidity: '',
      temperature: '',
      compatibleSpecies: '',
      recommendedItems: '',
      healthIssues: '',
      personalityDescription: '',
      image: null,
      selectedFiles: [],
      fileName: '',
      token: 'your-token-here',
      username: '',
      idUser:'',
      anialId:"",
      date:"",
      adress:"",
      description:"",
      ownerName:"",
      ownerSurname:"",
      ownerPhoneNumber:"",
      ownerOIB:"",
      registerId:"",
      formatDateTime:"",
      userExists: null,
      responseFamily:"",
      other: '',
       isEditable: false,
  
    };
  },
  methods: {
    async checkUser() {
   try{
        const userResponse = await instance.get(`auth/getUserByUsername/${this.username}`);
        const userData = userResponse.data;
        
      this.registerId=userData.id;
      console.log(this.registerId);
       
        if(this.registerId!=null){
          this.userExists=true;
        }
   }
   catch (error) {this.userExists=false}
      
    },

     formatDateTime() {
      if (this.date && this.time) {
        this.formattedDateTime = `${this.date}T${this.time}:00.0000000`;
        console.log(formattedDateTime);
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFiles = [file];
        this.fileName = file.name;
      }
    },
    async convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
      });
    },
   
    async handleSubmit() {
      console.log("Submitting form data...");

      try {
        // Prepare form data
        const formData = new FormData();
        formData.append('name', this.name);
        if (this.selectedFamily === 'Other') {
          formData.append('family', this.other);
        } else {
          formData.append('family', this.selectedFamily);
        }    
        formData.append('species', this.species);
        formData.append('subspecies', this.subspecies);
        formData.append('age', this.age);
        formData.append('gender', this.gender);
        formData.append('weight', this.weight);
        formData.append('height', this.height);
        formData.append('length', this.length);
        formData.append('neutered', this.neutered);
        formData.append('vaccinated', this.vaccinated);
        formData.append('microchipped', this.microchipped);
        formData.append('trained', this.trained);
        formData.append('socialized', this.socialized);
        formData.append('healthIssues', this.healthIssues);
        formData.append('personalityDescription', this.personalityDescription);
        formData.append('adopted', this.adopted);

        if (this.selectedFiles.length > 0) {
          const file = this.selectedFiles[0];
          console.log("Selected file:", file);
          formData.append('image', file);  
          console.log("File added to FormData:", file);
        }

        // Ispis svih podataka koji se šalju
        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }

        const response = await instance.post('animal/addAnimal', formData, {
          headers: { Authorization: `Bearer ${this.token}`,   }, });
     
        console.log("Animal created:", response.data);
        console.log("Animal ID:", response.data.idAnimal);
        this.animalId=response.data.idAnimal;
        this.responseFamily=response.data.family;

        if (this.animalId !=null && this.responseFamily!=null) {
           
     
            //radi
            switch (this.responseFamily) {
              case 'Mammal':
               var responseM= await instance.post('animal/addMammal', 
                { 
                  animalId:this.animalId,
                  coatType:this.coatType,
                  groomingProducts:this.groomingProducts,
                }
              ,{
                headers: { Authorization: `Bearer ${this.token}`,   }, });
                console.log("Mammel"+ responseM.data);
                break;

              case 'Bird':
                var responseM= await instance.post('animal/addBird', 
                { 
                  animalId:this.animalId,
                  cageSize:this.cageSize,
                  recommendedToys:this.recommendedToys,
                  sociability:this.sociability

                }
              ,{
                headers: { Authorization: `Bearer ${this.token}`,   }, });
                console.log("Bird");
                break;

              case 'Fish':
              var responseM= await instance.post('animal/addFish', 
                { 
                  animalId:this.animalId,
                  tankSize:this.tankSize,
                  compatibleSpecies:this.compatibleSpecies,
                  recommendedItems:this.recommendedItems

                }
              ,{
                headers: { Authorization: `Bearer ${this.token}`,   }, });
                console.log("Fish");
                break;

              case 'Reptile':              
                 var responseM= await instance.post('animal/addReptile', 
                { 
                  animalId:this.animalId,
                  tankSize:this.tankSize,
                  sociability:this.sociability,
                  compatibleSpecies:this.compatibleSpecies,
                  recommendedItems: this.recommendedItems

                }
              ,{
                headers: { Authorization: `Bearer ${this.token}`,   }, });
                console.log("Reptile");
                break;
              case 'Amphibian':
                var responseM= await instance.post('animal/addAmphibian', 
                { 
                  animalId:this.animalId,
                  humidity:parseFloat(this.humidity),
                  temperature:parseFloat(this.temperature)

                }
              ,{
                headers: { Authorization: `Bearer ${this.token}`,   }, });
                console.log("Amphibian");
                break;
              default:
                console.error('Unknown family:', this.responseFamily);
                return;
            }
      
         
        
        console.log("Family data added");







        
          

    
        //Add record
        const responseRecord = await instance.post('animal/addAnimalRecord', 
          {animalId: this.animalId}
        ,{
          headers: {Authorization: `Bearer ${this.token}`, },});

        console.log("Record created:" , responseRecord.data);

  await Swal.fire({
                title: "Animal added!",
                draggable: true,
                icon: "success"
              });

       
   //FAUND DATA
        const responseFound = await instance.post('animal/addAnimalFound', 
          { animalId:this.animalId,
          date:`${this.date}T${this.time}:00.0000000`,
         adress:this.adress,
          description:this.description,
            ownerName:this.ownerName,
            ownerSurname:this.ownerSurname,
            ownerPhoneNumber:this.ownerPhoneNumber,
            ownerOIB:this.ownerOIB,
            registerId:this.registerId
          
          }
        ,{
          headers: { Authorization: `Bearer ${this.token}`,   }, });
        console.log("Found created:" , responseFound.data);
        }
          } catch (error) {
            console.error("Error submitting form:", error);
            if (error.response) {
              console.error("Response data:", error.response.data);
          
            } else if (error.request) {
              console.error("Request error:", error.request);
            } else {
              console.error("Error message:", error.message);
            }
            console.error("Config:", error.config);
          }
    },
    async adAditionalData() {
        try {
       

          if (this.animal && this.animal.family) {
            let familyRoute = '';
            const familyData = {};
            familyData.idAnimal= parseInt(id);
            switch (this.animal.family) {
              case 'Mammal':
                familyRoute = 'updateMammal';
                familyData.coatType = this.coatType;
                familyData.groomingProducts = this.groomingProducts;
                break;
              case 'Bird':
                familyRoute = 'updateBird';
                familyData.cageSize = this.cageSize;
                familyData.recommendedToys = this.recommendedToys;
                familyData.sociability = this.sociability;
                break;
              case 'Fish':
                familyRoute = 'updateFish';
                familyData.tankSize = this.tankSize;
                familyData.compatibleSpecies = this.compatibleSpecies;
                familyData.recommendedItems = this.recommendedItems;
                break;
              case 'Reptile':
                familyRoute = 'updateReptile';
                familyData.tankSize = this.tankSize;
                familyData.sociability = this.sociability;
                familyData.compatibleSpecies = this.compatibleSpecies;
                break;
              case 'Amphibian':
                familyRoute = 'updateAmphibian';
                familyData.humidity = this.humidity;
                familyData.temperature = this.temperature;
                break;
              default:
                console.error('Unknown family:', this.animal.family);
                return;
            }

            await instance.push( `animal/${familyRoute}`,
              familyData,
              {
                headers: {  Authorization: `Bearer ${token.value}`,  },});
          }
        } 
        catch (error) { console.error('Error editing animal details:', error);}
      },

  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
