<template>
  <div class="flex  min-h-screen text-stone-200">
    <!-- Sidebar -->
    <div class="w-1/6 p-4 bg-black border-r border-stone-600 backdrop-blur-md rounded-l-xl shadow-inner">
      <WorkerNavigation/>
    </div>

    <!-- Form Section -->
    <div class="w-3/6 mx-auto bg-stone-800/90 mt-5 rounded-2xl  p-8 rounded-r-xl">
     <!-- Animal Info -->
<div class="mt-4 mb-4 p-6 bg-stone-800/60 border border-stone-500/40 rounded-2xl backdrop-blur-md shadow-inner hover:scale-[1.01] transition-all duration-200">
  <h2 class="text-2xl font-bold mb-6 text-stone-100">Animal Info</h2>

  <!-- Animal ID -->
  <div class="mb-6">
    <div class="flex items-center justify-between mb-3">
      <label class="font-semibold text-stone-300">Animal ID:</label>

      <!-- Toggle Manual / Random -->
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="manualId" class="sr-only peer" />
        <div
          class="w-11 h-6 bg-stone-600/60 peer-focus:ring-2 peer-focus:ring-stone-300 rounded-full relative after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:w-5 after:h-5 after:bg-stone-300 after:rounded-full after:transition-all peer-checked:bg-emerald-600 peer-checked:after:translate-x-full"
        ></div>
        <span class="ml-3 text-stone-200 font-medium">Manual Entry</span>
      </label>
    </div>

    <div class="flex items-center space-x-3">
      <!-- Ako je Manual Entry uključen -->
      <template v-if="manualId">
        <input
          type="number"
          v-model="idAnimalInput"
          placeholder="Enter Animal ID"
          class="w-full py-2 px-3 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none"
        />
      </template>

      <!-- Ako je Manual Entry isključen -->
      <template v-else>
        <input
          type="number"
          v-model="randomAnimalId"
          placeholder="Click 'Random'"
          readonly
          class="w-full py-2 px-3 border border-stone-400/40 bg-stone-700/50 text-stone-400 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none"
        />
        <button
          @click="generateRandomId"
          class="px-4 py-2 bg-stone-700 hover:bg-stone-600 text-stone-100 rounded-full font-semibold transition-all"
        >
          Random
        </button>
      </template>

      <!-- Check button -->
      <button
        @click="checkAnimalId"
        class="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-full text-stone-100 font-semibold focus:ring-2 focus:ring-stone-300 focus:outline-none transition-all"
      >
        Check
      </button>
    </div>
  </div>

  <!-- Common Animal Fields -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Name -->
    <div>
      <label for="name" class="block font-semibold mb-2 text-stone-300">Name:</label>
      <input type="text" id="name" v-model="name"
        class="w-full py-2 px-3 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none"/>
    </div>

    <!-- Family -->
    <div>
      <label for="family" class="block font-semibold mb-2 text-stone-300">Family:</label>
      <select id="family" v-model="selectedFamily"
        class="w-full py-2 px-3 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none">
        <option value="Mammal">Mammal</option>
        <option value="Bird">Bird</option>
        <option value="Fish">Fish</option>
        <option value="Reptile">Reptile</option>
        <option value="Amphibian">Amphibian</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <!-- Species -->
    <div>
      <label for="species" class="block font-semibold mb-2 text-stone-300">Species:</label>
      <input type="text" id="species" v-model="species"
        class="w-full py-2 px-3 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none"/>
    </div>

    <!-- Subspecies -->
    <div>
      <label for="subspecies" class="block font-semibold mb-2 text-stone-300">Subspecies:</label>
      <input type="text" id="subspecies" v-model="subspecies"
        class="w-full py-2 px-3 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none"/>
    </div>

    <!-- Age -->
    <div>
      <label for="age" class="block font-semibold mb-2 text-stone-300">Age:</label>
      <input type="number" min="0" id="age" v-model="age"
        class="w-full py-2 px-3 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none"/>
    </div>

    <!-- Gender -->
    <div>
      <label for="gender" class="block font-semibold mb-2 text-stone-300">Gender:</label>
      <select id="gender" v-model="gender"
        class="w-full py-2 px-3 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>

    <!-- Weight -->
    <div>
      <label for="weight" class="block font-semibold mb-2 text-stone-300">Weight:</label>
      <input type="number" min="0" id="weight" v-model="weight"
        class="w-full py-2 px-3 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none"/>
    </div>

    <!-- Height -->
    <div>
      <label for="height" class="block font-semibold mb-2 text-stone-300">Height:</label>
      <input type="number" min="0" id="height" v-model="height"
        class="w-full py-2 px-3 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none"/>
    </div>

    <!-- Length -->
    <div>
      <label for="length" class="block font-semibold mb-2 text-stone-300">Length:</label>
      <input type="number" min="0" id="length" v-model="length"
        class="w-full py-2 px-3 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none"/>
    </div>

    <!-- CHECKBOXES (ručno razdvojeni) -->
    <div>
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="neutered" class="sr-only peer">
        <div class="w-11 h-6 bg-stone-600/60 peer-focus:ring-2 peer-focus:ring-stone-300 rounded-full relative after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:w-5 after:h-5 after:bg-stone-300 after:rounded-full after:transition-all peer-checked:bg-emerald-600 peer-checked:after:translate-x-full"></div>
        <span class="ml-3 text-stone-200 font-medium">Neutered</span>
      </label>
    </div>

    <div>
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="vaccinated" class="sr-only peer">
        <div class="w-11 h-6 bg-stone-600/60 peer-focus:ring-2 peer-focus:ring-stone-300 rounded-full relative after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:w-5 after:h-5 after:bg-stone-300 after:rounded-full after:transition-all peer-checked:bg-emerald-600 peer-checked:after:translate-x-full"></div>
        <span class="ml-3 text-stone-200 font-medium">Vaccinated</span>
      </label>
    </div>

    <div>
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="microchipped" class="sr-only peer">
        <div class="w-11 h-6 bg-stone-600/60 peer-focus:ring-2 peer-focus:ring-stone-300 rounded-full relative after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:w-5 after:h-5 after:bg-stone-300 after:rounded-full after:transition-all peer-checked:bg-emerald-600 peer-checked:after:translate-x-full"></div>
        <span class="ml-3 text-stone-200 font-medium">Microchipped</span>
      </label>
    </div>

    <div>
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="trained" class="sr-only peer">
        <div class="w-11 h-6 bg-stone-600/60 peer-focus:ring-2 peer-focus:ring-stone-300 rounded-full relative after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:w-5 after:h-5 after:bg-stone-300 after:rounded-full after:transition-all peer-checked:bg-emerald-600 peer-checked:after:translate-x-full"></div>
        <span class="ml-3 text-stone-200 font-medium">Trained</span>
      </label>
    </div>

    <div>
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="socialized" class="sr-only peer">
        <div class="w-11 h-6 bg-stone-600/60 peer-focus:ring-2 peer-focus:ring-stone-300 rounded-full relative after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:w-5 after:h-5 after:bg-stone-300 after:rounded-full after:transition-all peer-checked:bg-emerald-600 peer-checked:after:translate-x-full"></div>
        <span class="ml-3 text-stone-200 font-medium">Socialized</span>
      </label>
    </div>

    <div>
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="adopted" class="sr-only peer">
        <div class="w-11 h-6 bg-stone-600/60 peer-focus:ring-2 peer-focus:ring-stone-300 rounded-full relative after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:w-5 after:h-5 after:bg-stone-300 after:rounded-full after:transition-all peer-checked:bg-emerald-600 peer-checked:after:translate-x-full"></div>
        <span class="ml-3 text-stone-200 font-medium">Adopted</span>
      </label>
    </div>
  </div>

  <!-- Textareas -->
  <div class="mt-6">
    <label for="healthIssues" class="block font-semibold mb-2 text-stone-300">Health Issues:</label>
    <textarea id="healthIssues" v-model="healthIssues"
      class="w-full py-2 px-3 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-300"></textarea>
  </div>

  <div class="mt-4">
    <label for="personalityDescription" class="block font-semibold mb-2 text-stone-300">Personality Description:</label>
    <textarea id="personalityDescription" v-model="personalityDescription"
      class="w-full py-2 px-3 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-300"></textarea>
  </div>
</div>

<!-- Conditional Info Blocks -->
<template v-if="selectedFamily === 'Mammal'">
  <div class="p-6 mt-4 bg-stone-800/60 border border-stone-500/40 rounded-2xl shadow-inner backdrop-blur-md hover:scale-[1.01] transition-all">
    <h2 class="text-xl font-bold mb-4 text-stone-100">Mammal Info</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Coat Type:</label>
        <input type="text" v-model="coatType"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Grooming Products:</label>
        <input type="text" v-model="groomingProducts"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
    </div>
  </div>
</template>

<!-- Bird -->
<template v-else-if="selectedFamily === 'Bird'">
  <div class="p-6 mt-4 bg-stone-800/60 border border-stone-500/40 rounded-2xl shadow-inner backdrop-blur-md hover:scale-[1.01] transition-all">
    <h2 class="text-xl font-bold mb-4 text-stone-100">Bird Info</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Cage Size:</label>
        <input type="text" v-model="cageSize"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Recommended Toys:</label>
        <input type="text" v-model="recommendedToys"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Sociability:</label>
        <input type="text" v-model="sociability"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
    </div>
  </div>
</template>

<!-- Fish -->
<template v-else-if="selectedFamily === 'Fish'">
  <div class="p-6 mt-4 bg-stone-800/60 border border-stone-500/40 rounded-2xl shadow-inner backdrop-blur-md hover:scale-[1.01] transition-all">
    <h2 class="text-xl font-bold mb-4 text-stone-100">Fish Info</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Tank Size:</label>
        <input type="text" v-model="tankSize"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Compatible Species:</label>
        <input type="text" v-model="compatibleSpecies"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Recommended Items:</label>
        <input type="text" v-model="recommendedItems"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
    </div>
  </div>
</template>

<!-- Reptile -->
<template v-else-if="selectedFamily === 'Reptile'">
  <div class="p-6 mt-4 bg-stone-800/60 border border-stone-500/40 rounded-2xl shadow-inner backdrop-blur-md hover:scale-[1.01] transition-all">
    <h2 class="text-xl font-bold mb-4 text-stone-100">Reptile Info</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Tank Size:</label>
        <input type="text" v-model="tankSize"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Sociability:</label>
        <input type="text" v-model="sociability"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Compatible Species:</label>
        <input type="text" v-model="compatibleSpecies"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Recommended Items:</label>
        <input type="text" v-model="recommendedItems"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
    </div>
  </div>
</template>

<!-- Amphibian -->
<template v-else-if="selectedFamily === 'Amphibian'">
  <div class="p-6 mt-4 bg-stone-800/60 border border-stone-500/40 rounded-2xl shadow-inner backdrop-blur-md hover:scale-[1.01] transition-all">
    <h2 class="text-xl font-bold mb-4 text-stone-100">Amphibian Info</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Humidity:</label>
        <input type="text" v-model="humidity"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Temperature:</label>
        <input type="text" v-model="temperature"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
    </div>
  </div>
</template>

<!-- Other -->
<template v-else-if="selectedFamily === 'Other'">
  <div class="p-6 mt-4 bg-stone-800/60 border border-stone-500/40 rounded-2xl shadow-inner backdrop-blur-md hover:scale-[1.01] transition-all">
    <h2 class="text-xl font-bold mb-4 text-stone-100">Other Family</h2>
    <div class="grid grid-cols-1 gap-4">
      <div>
        <label class="block font-semibold mb-2 text-stone-300">Enter Family Name:</label>
        <input type="text" v-model="other"
          class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-full shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      </div>
    </div>
  </div>
</template>


<!-- Surrenderer info -->
<div class="mt-6 p-6 bg-stone-800/60 border border-stone-500/40 rounded-2xl shadow-inner backdrop-blur-md hover:scale-[1.01] transition-all duration-200 overflow-hidden">
  <h2 class="text-2xl font-bold mb-6 text-stone-100">Surrenderer Info</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Username -->
    <div>
      <label for="username" class="block text-base font-semibold mb-2 text-stone-300">Username Surrenderer:</label>
      <div class="flex items-center">
        <input
          type="text"
          id="username"
          v-model="username"
          class="w-full py-2 px-4 border border-stone-400/40 bg-stone-700/50 text-stone-100 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-300 transition-all"
        />
        <div class="ml-3 flex items-center">
          <!-- User Exists -->
          <svg
            v-if="this.userExists && this.userExists != null && this.username"
            class="w-6 h-6 fill-yellow-400 drop-shadow-md"
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 
              0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 
              105.4c12.5-12.5 32.8-12.5 45.3 0z"
            />
          </svg>
          <!-- User Not Found -->
          <svg
            v-if="!this.userExists && this.userExists != null && this.username"
            class="w-6 h-6 fill-red-500 drop-shadow-md"
            viewBox="0 0 384 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 
              0-45.3s-32.8-12.5-45.3 0L192 210.7 
              86.6 105.4c-12.5-12.5-32.8-12.5-45.3 
              0s-12.5 32.8 0 45.3L146.7 256 41.4 
              361.4c-12.5 12.5-12.5 32.8 0 
              45.3s32.8 12.5 45.3 0L192 301.3 
              297.4 406.6c12.5 12.5 32.8 
              12.5 45.3 0s12.5-32.8 
              0-45.3L237.3 256 
              342.6 150.6z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Check User Button -->
    <div>
      <label for="checkUser" class="block text-base font-semibold mb-2 text-stone-300">Check User:</label>
      <div class="flex items-center justify-start">
        <svg
          @click="checkUser"
          class="w-12 h-12 text-stone-200 hover:text-emerald-400 cursor-pointer transition-all duration-200 drop-shadow-md hover:scale-110"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 
            1.415 1.415-.797.796c.188.318.333.665.428 
            1.032H21v2h-1.126c-.095.367-.24.714-.428 
            1.032l.797.796-1.415 1.415-.796-.797a3.979 
            3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 
            3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 
            3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 
            1.415-1.415.796.797A3.977 3.977 0 0 1 
            15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 
            1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 
            2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 
            7.938.703 7.029 7.029 0 0 0-3.235 
            3.235A4 4 0 0 1 5 8Zm4.29 
            5H7a4 4 0 0 0-4 4v1a2 
            2 0 0 0 2 2h6.101A6.979 
            6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
</div>


      <!-- Owner Info -->
      <div class="mt-6 p-6 bg-stone-800/60 border border-stone-500/40 rounded-2xl shadow-inner backdrop-blur-md">
        <h2 class="text-xl font-bold mb-4 text-stone-100">Owner Info</h2>

        <label class="inline-flex items-center cursor-pointer mb-4">
          <input type="checkbox" v-model="isEditable" class="sr-only peer" />
          <div
            class="relative w-11 h-6 bg-stone-600/60 peer-focus:ring-2 peer-focus:ring-stone-300 rounded-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:w-5 after:h-5 after:bg-stone-300 after:rounded-full after:transition-all peer-checked:bg-emerald-600 peer-checked:after:translate-x-full">
          </div>
          <span class="ml-3 text-stone-200 font-medium">Enable Editing</span>
        </label>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="field in [
            {id:'ownerName', label:'Name', model:'ownerName'},
            {id:'ownerSurname', label:'Surname', model:'ownerSurname'},
            {id:'ownerOIB', label:'OIB', model:'ownerOIB'},
            {id:'ownerPhoneNumber', label:'Phone Number', model:'ownerPhoneNumber'}
          ]" :key="field.id">
            <label :for="field.id" class="block font-semibold mb-2 text-stone-300">{{ field.label }}:</label>
            <input :id="field.id" v-model="field.model" :disabled="!isEditable"
              class="w-full py-2 px-3 border border-stone-400/40 rounded-full shadow-inner"
              :class="isEditable ? 'bg-stone-700/50 text-stone-100 focus:ring-2 focus:ring-stone-300 focus:outline-none' : 'bg-stone-600/40 text-stone-400 cursor-not-allowed'" />
          </div>
        </div>
      </div>

      <!-- Found Info -->
      <div class="mt-6 p-6 bg-stone-800/60 border border-stone-500/40 rounded-2xl shadow-inner backdrop-blur-md">
        <h2 class="text-xl font-bold mb-4 text-stone-100">Found Info</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block mb-2 text-stone-300">Address:</label>
            <input type="text" v-model="adress"
              class="w-full py-2 px-3 bg-stone-700/50 border border-stone-400/40 text-stone-100 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
          </div>
          <div>
            <label class="block mb-2 text-stone-300">Date:</label>
            <input type="date" v-model="date"
              class="w-full py-2 px-3 bg-stone-700/50 border border-stone-400/40 text-stone-100 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
          </div>
          <div>
            <label class="block mb-2 text-stone-300">Time:</label>
            <input type="time" v-model="time"
              class="w-full py-2 px-3 bg-stone-700/50 border border-stone-400/40 text-stone-100 rounded-full focus:ring-2 focus:ring-stone-300 focus:outline-none" />
          </div>
        </div>
        <div class="mt-4">
          <label for="description" class="block font-semibold mb-2 text-stone-300">Description:</label>
          <textarea id="description" v-model="description"
            class="w-full py-2 px-3 bg-stone-700/50 text-stone-100 border border-stone-400/40 rounded-xl shadow-inner focus:ring-2 focus:ring-stone-300 focus:outline-none"></textarea>
        </div>
      </div>

      <!-- Image Upload -->
      <div class="mt-6">
        <label for="image" class="block font-semibold mb-2 text-stone-300">Image:</label>
        <label for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-stone-400/40 rounded-2xl cursor-pointer bg-stone-800/60 hover:bg-stone-700/60 transition-all">
          <div v-if="!fileName" class="flex flex-col items-center justify-center text-stone-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="white">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p><span class="font-semibold">Click to upload</span> or drag and drop</p>
          </div>
          <div v-else>
            <p class="text-stone-200">{{ fileName }}</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" @change="onFileChange" />
        </label>
      </div>

      <!-- Submit -->
      <div class="mt-8 text-center">
        <button @click="handleSubmit"
          class="px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-600 text-stone-100 font-semibold transition-all focus:ring-2 focus:ring-stone-300 focus:outline-none">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
//zapis životinje, rekorda, gdje je životinja pronađena, napravi nešto da se može upisat id osobe koja je donjela životinju
//Dodaj zapis pojedinih podataka životinja primjer ti je u single animal admin pod brianjem

import WorkerNavigation from "./WorkerNavigation.vue";
  import Swal from 'sweetalert2'
import instance from '@/axiosBase';
//import jwtDecode from 'jwt-decode';

localStorage.getItem('userRole');
console.log(localStorage.getItem('userRole'));
export default {
  components: {
    WorkerNavigation,
  },
  data() {
    return {
         manualId: false,          // toggle za manual/random
          idAnimalInput: "",        // ID unesen ručno
          randomAnimalId: null,     // generirani ID
          animalIdExists: null,     // stanje (true/false)
          animal: null, 

      token: localStorage.getItem('userRole'),
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
    
    // 🔹 Dohvaća podatke o životinji po ID-u (brza opcija)
  async fetchAnimalDetails(id) {
    try {
      const response = await instance.get(`animal/animal/${id}`);
      this.animal = response.data;

      // Ako backend vrati null ili prazan objekt → nema životinje
      if (!this.animal || Object.keys(this.animal).length === 0) {
        return null;
      }
      return this.animal;
    } catch (error) {
      // Ako backend vrati 404 → nema životinje
      if (error.response && error.response.status === 404) {
        return null;
      }
      console.error("Error fetching animal:", error);
      return null;
    }
  },

  // 🔹 Generira random ID (min 4 znamenke) i odmah provjerava
  async generateRandomId() {
    this.randomAnimalId = Math.floor(1000 + Math.random() * 900000);
    this.animalIdExists = null;
    await this.checkAnimalId(); // automatski provjeri
  },

  // 🔹 Provjera postoji li ID u bazi
  async checkAnimalId() {
    try {
      this.animalIdExists = null;

      const idToCheck = this.manualId
        ? parseInt(this.idAnimalInput)
        : parseInt(this.randomAnimalId);

      if (!idToCheck || isNaN(idToCheck)) {
        await Swal.fire({
          icon: "warning",
          title: "Missing ID",
          text: "Please enter or generate an ID first.",
        });
        return;
      }

      const existingAnimal = await this.fetchAnimalDetails(idToCheck);

      if (existingAnimal === null) {
        // ✅ ID slobodan
        this.animalIdExists = false;
        await Swal.fire({
          icon: "success",
          title: "ID available!",
          text: `Animal ID ${idToCheck} is free to use.`,
        });
      } else {
        // ❌ ID već postoji
        this.animalIdExists = true;
        await Swal.fire({
          icon: "error",
          title: "ID already exists!",
          text: `Animal with ID ${idToCheck} already exists in the database.`,
        });
      }
    } catch (error) {
      console.error("Error checking animal ID:", error);
      this.animalIdExists = null;
    }
  },
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
        const idToCheck = this.manualId
        ? parseInt(this.idAnimalInput)
        : parseInt(this.randomAnimalId);
        const formData = new FormData();
        formData.append('idAnimal', idToCheck);
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
            if(this.responseFamily != 'Other') {
  
            
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
                console.log('Unknown family:', this.responseFamily);
                break;
            }
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
