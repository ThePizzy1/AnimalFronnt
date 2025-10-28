<template>
  <Loading v-if="loadingError" />

  <Navigation />

  <!-- GLAVNI KONTEJNER -->
  <div class="bg-opacity-20 py-2 mt-10">

    <!-- FILTER SEKCIJA -->
    <div class="bg-stone-700/40 backdrop-blur-md rounded-2xl mx-auto my-8 py-6 px-4 shadow-xl border border-stone-500/50 max-w-6xl">

      <!-- ICON FILTERS -->
      <div class="flex flex-wrap justify-center gap-6 mb-8">
        <div
          v-for="(icon, family) in {
            All: '/icon1.png',
            Mammal: '/icon2.png',
            Fish: '/icon3.png',
            Reptile: '/icon4.png',
            Amphibian: '/icon5.png',
            Bird: '/icon6.png'
          }"
          :key="family"
          @click="setFamilyFilter(family)"
          class="hover:scale-110 transition transform w-20 h-20 rounded-full overflow-hidden cursor-pointer border-4 border-stone-300 hover:border-stone-400 shadow-md"
        >
          <img :src="icon" :alt="family + ' Filter'" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- DROPDOWN FILTERS -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-stone-100 mb-6">
        <div v-for="(options, label) in {
          Family: uniqueFamilies,
          Species: uniqueSpecies,
          Subspecies: uniqueSubspecies,
          Age: uniqueAges
        }" :key="label" class="flex flex-col text-left">
          <label class="mb-1 font-semibold text-stone-300">{{ label }}</label>
          <select
            v-model="filters[label.toLowerCase()]"
            @change="applyFilters"
            class="bg-stone-800/60 border border-stone-300/40 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none text-stone-200"
          >
            <option value="">All</option>
            <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>

        <!-- GENDER -->
        <div class="flex flex-col text-left">
          <label class="mb-1 font-semibold text-stone-300">Gender</label>
          <select
            v-model="filters.gender"
            @change="applyFilters"
            class="bg-stone-800/60 border border-stone-300/40 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-stone-300 focus:outline-none text-stone-200"
          >
            <option value="">All</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
      </div>

      <!-- TRUE/FALSE FILTERS -->
      <div class="flex flex-wrap justify-center gap-6 text-stone-100">
        <div
          v-for="(label, key) in {
            neutered: 'Neutered',
            vaccinated: 'Vaccinated',
            microchipped: 'Microchipped',
            trained: 'Trained',
            socialized: 'Socialized'
          }"
          :key="key"
          class="flex items-center space-x-3"
        >
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="filters[key]"
              @change="applyFilters"
              class="sr-only peer"
            />
            <div
              class="relative w-12 h-7 bg-stone-500 peer-focus:ring-4 peer-focus:ring-emerald-400 rounded-full peer peer-checked:bg-emerald-500 transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-6 after:h-6 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-5"
            ></div>
            <span class="ml-3 text-sm font-medium">{{ label }}</span>
          </label>
        </div>
      </div>

      <!-- SEARCH -->
      <div class="flex items-center justify-center mt-8">
        <div class="relative w-full max-w-md">
          <input
            v-model="searchQuery"
            @keydown.enter="submitSearch"
            class="w-full h-12 px-5 pr-12 rounded-lg bg-stone-800/70 text-stone-100 placeholder-stone-400 border border-emerald-400/40 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            type="search"
            placeholder="Search for an animal..."
          />
          <button
            type="submit"
            @click="submitSearch"
            class="absolute right-3 top-3 text-emerald-400 hover:text-emerald-300 transition"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- CONTENT SECTION -->
  <div class="container px-4 mt-25 py-4 mx-auto lg:pt-8 min-h-80 shadow-2xl">
    <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 lg:gap-4 rounded-md">
      <router-link
        v-for="item in filteredItems"
        :key="item.id"
        :to="'/animal/' + item.idAnimal"
        class="hover:scale-110 mt-4 relative flex justify-center flex-col items-center rounded-lg shadow-lg transition transform"
      >
        <img
          v-if="item.picture"
          class="w-full h-90 rounded-xl"
          :src="'data:image/jpeg;base64,' + item.picture"
          :alt="item.name"
        />
        <div class="absolute bottom-0 w-full mx-2 bg-black bg-opacity-80 text-stone-200 text-xl font-extrabold py-4 text-center rounded-b-xl">
          {{ item.name }}
        </div>
      </router-link>
    </div>

    <hr class="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-emerald-300 to-transparent opacity-40" />
  </div>

  <Footer />
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
          console.log(response.data);
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
