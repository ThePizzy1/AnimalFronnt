<template>
       <Loading v-if="loadingError" /> 

  <Navigation />


   <div class=" bg-opacity-20 py-2 mt-10"> 
  <div class=" flex justify-center my-4 space-x-4  ">
    <!-- Icon Filters -->
    <div class="hover:scale-110 w-20 h-20 rounded-full overflow-hidden cursor-pointer border-4 border-white" @click="setFamilyFilter('All')">
      <img class="w-full h-full object-cover" src="/icon1.png" alt="All Filter" />
    </div>
    <div class="hover:scale-110 w-20 h-20 rounded-full overflow-hidden cursor-pointer border-4 border-white" @click="setFamilyFilter('Mammal')">
      <img class="w-full h-full object-cover" src="/icon2.png" alt="Mammal Filter" />
    </div>
    <div class="hover:scale-110 w-20 h-20 rounded-full overflow-hidden cursor-pointer border-4 border-white" @click="setFamilyFilter('Fish')">
      <img class="w-full h-full object-cover" src="/icon3.png" alt="Fish Filter" />
    </div>
    <div class="hover:scale-110 w-20 h-20 rounded-full overflow-hidden cursor-pointer border-4 border-white" @click="setFamilyFilter('Reptile')">
      <img class="w-full h-full object-cover" src="/icon4.png" alt="Reptile Filter" />
    </div>
    <div class="hover:scale-110 w-20 h-20 rounded-full overflow-hidden cursor-pointer border-4 border-white" @click="setFamilyFilter('Amphibian')">
      <img class="w-full h-full object-cover" src="/icon5.png" alt="Amphibian Filter" />
    </div>
    <div class="hover:scale-110 w-20 h-20 rounded-full overflow-hidden cursor-pointer border-4 border-white" @click="setFamilyFilter('Bird')">
      <img class="w-full h-full object-cover" src="/icon6.png" alt="Bird Filter" />
    </div>
    
  </div>

  <!-- Dropdown Filters -->
  <div class="flex justify-center my-4 space-x-4 text-white">
    <div class="flex flex-col">
      <label for="family" class="font-semibold">Family</label>
      <select v-model="filters.family" @change="applyFilters" class="text-gray-300 border rounded px-3 py-2">
        <option value="">All</option>
        <option v-for="family in uniqueFamilies" :key="family" :value="family">{{ family }}</option>
      </select>
    </div>
    <div class="flex flex-col">
      <label for="species" class="font-semibold">Species</label>
      <select v-model="filters.species" @change="applyFilters" class="text-gray-400 border rounded px-3 py-2">
        <option value="">All</option>
        <option v-for="species in uniqueSpecies" :key="species" :value="species">{{ species }}</option>
      </select>
    </div>
    <div class="flex flex-col">
      <label for="subspecies" class="font-semibold">Subspecies</label>
      <select v-model="filters.subspecies" @change="applyFilters" class="text-gray-400 border rounded px-3 py-2">
        <option value="">All</option>
        <option v-for="subspecies in uniqueSubspecies" :key="subspecies" :value="subspecies">{{ subspecies }}</option>
      </select>
    </div>
    <div class="flex flex-col">
      <label for="age" class="font-semibold">Age</label>
      <select v-model="filters.age" @change="applyFilters" class="text-gray-400 border rounded px-3 py-2">
        <option value="">All</option>
        <option v-for="age in uniqueAges" :key="age" :value="age">{{ age }}</option>
      </select>
    </div>
    <div class="flex flex-col">
      <label for="gender" class="font-semibold">Gender</label>
      <select v-model="filters.gender" @change="applyFilters" class="text-gray-400 border rounded px-3 py-2">
        <option value="">All</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
    </div>

  </div>

  <!-- True False Filters -->
  <div class="flex justify-center my-4 space-x-4 text-white">
   
    <div class="hover:scale-110 flex flex-col">
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="filters.neutered" @change="applyFilters" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        <span class="ms-3 text-sm font-medium">Neutered</span>
      </label>
    </div>
    <div class="hover:scale-110 flex flex-col">
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="filters.vaccinated" @change="applyFilters" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        <span class="ms-3 text-sm font-medium">Vaccinated</span>
      </label>
    </div>
    <div class="hover:scale-110 flex flex-col">
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="filters.microchipped" @change="applyFilters" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        <span class="ms-3 text-sm font-medium">Microchipped</span>
      </label>
    </div>
    <div class="hover:scale-110 flex flex-col">
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="filters.trained" @change="applyFilters" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none
        peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        <span class="ms-3 text-sm font-medium">Trained</span>
      </label>
    </div>
    <div class="hover:scale-110 flex flex-col">
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="filters.socialized" @change="applyFilters" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        <span class="ms-3 text-sm font-medium">Socialized</span>
      </label>
    </div>
   
  </div>
  <div class="flex items-center justify-center ">
    <div class="relative w-2/5">
      <input v-model="searchQuery" @keydown.enter="submitSearch" class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full" type="search" name="search" placeholder="Search" />
      <button type="submit" @click="submitSearch" class="absolute right-0 top-0 mt-2.5 mr-4">
        <svg
          class="text-gray-600 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          style="enable-background:new 0 0 56.966 56.966;"
          xml:space="preserve"
          width="512px"
          height="512px"
        >
          <path
            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
          />
        </svg>
      </button>
    </div>
  </div>
</div>
  <!-- Content Section -->
  <div class="container px-4 mt-25 py-4 mx-auto lg:pt-8 min-h-80 shadow-2xl">
    
    <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 lg:gap-4 rounded-md">
      <router-link
    v-for="item in filteredItems"
    :key="item.id"
    :to="'/animal/' + item.idAnimal" 
    
    class="hover:scale-110 mt-4 relative  flex justify-center flex-col items-center rounded-lg shadow-lg"
  >
    <img v-if="item.picture" class="w-full h-90  rounded-xl" :src="'data:image/jpeg;base64,' + item.picture" :alt="item.name" />
    <div class="absolute bottom-0 w-full mx-2 bg-black mx-1 bg-opacity-90 text-white text-xl font-extrabold py-4 text-center rounded-b-xl">
      {{ item.name }}
    </div>
  </router-link>
        
      
      
    </div>
    <hr
    class="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent opacity-40 dark:via-white" />
  </div>
  <Footer/>
</template>

<script>
import instance from '@/axiosBase';
import Navigation from '../User/Navigation.vue';
import Footer from '../User/Footer.vue';
import Loading from '../Loading.vue';

export default {
  components: {
    Navigation,
    Footer,
    Loading,
  },
  data() {
    return {
      loadingError: false,
      items: [],
      filters: {
        family: '',
        species: '',
        subspecies: '',
        age: '',
        gender: '',
        neutered: false,
        vaccinated: false,
        microchipped: false,
        trained: false,
        socialized: false,
        kidsfriendly: false,
      },
      searchQuery: '',
    };
  },
  computed: {
    uniqueFamilies() {
      return [...new Set(this.items.map(item => item.family))];
    },
    uniqueSpecies() {
      return [...new Set(this.items.map(item => item.species))];
    },
    uniqueSubspecies() {
      return [...new Set(this.items.map(item => item.subspecies))];
    },
    uniqueAges() {
      return [...new Set(this.items.map(item => item.age))];
    },
    filteredItems() {
      return this.items.filter(item => {
        return (
          (this.filters.family === '' || item.family === this.filters.family) &&
          (this.filters.species === '' || item.species === this.filters.species) &&
          (this.filters.subspecies === '' || item.subspecies === this.filters.subspecies) &&
          (this.filters.age === '' || item.age === this.filters.age) &&
          (this.filters.gender === '' || item.gender === this.filters.gender) &&
          (!this.filters.neutered || item.neutered) &&
          (!this.filters.vaccinated || item.vaccinated) &&
          (!this.filters.microchipped || item.microchipped) &&
          (!this.filters.trained || item.trained) &&
          (!this.filters.socialized || item.socialized) &&
          (!this.filters.kidsfriendly || item.kidsfriendly) &&
          (this.searchQuery === '' ||
            item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.species.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.gender.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.family.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.age.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.subspecies.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      });
    },
  },
  methods: {
    applyFilters() {
      // Logic to apply filters
      // For now, just log the filters
      console.log(this.filters);
    },
    setFamilyFilter(family) {
      this.filters.family = family;
      this.applyFilters();
    },
    submitSearch() {
      // Logic to handle search
      // For now, just log the search query
      console.log(this.searchQuery);
    },
    fetchData() {
      this.loadingError = true;
      instance
        .get('animal/animalA_db')
        .then(response => {
          this.items = response.data;
          if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                }
        })
        .catch(error => {
           setTimeout(() => {
                this.loadingError = true; 
                }, 5000)
                this.$router.push(`/Home`);
          console.error('There was an error!', error);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>







<style scoped>
.hover\:scale-110:hover {
  transform: scale(1.1);
}
.h-90 {
  height: calc(100% - 10px); /* Smanjivanje visine slike za 10px */
}
.rounded-xl {
  border-radius: 1rem; /* Veći zaobljeni rubovi */
}
.rounded-b-xl {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
.w-90 {
  width: 90%;
}
.text-customGreen {
  color: #38b2ac; /* prilagodite ovu boju prema vašoj potrebi */
}
.absolute {
  position: absolute;
}
.bottom-0 {
  bottom: 0;
}
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
.text-xl {
  font-size: 1.25rem;
}
.font-extrabold {
  font-weight: 800;
}
.rounded-md {
  border-radius: 0.375rem;
}
</style>
