<template>
  <div class="flex justify-center items-start mt-8 py-20 text-stone-200">
    <!-- Navigation -->
    <div class="w-1/4 bg-black rounded-l-xl shadow-inner">
      <AdminNavigation />
    </div>

    <div class="w-3/4 flex flex-col space-y-10 px-6">
      <Loading v-if="loadingError" />

      <!-- Animal details -->
      <div
        v-if="animal"
        class="flex flex-col md:flex-row mx-4 p-8 rounded-2xl bg-stone-800/90 backdrop-blur-md border border-stone-500/40 shadow-inner transition-all hover:scale-[1.01]"
      >
        <!-- Image -->
        <div class="md:w-1/3">
          <img
            :src="'data:image/jpeg;base64,' + animal.picture"
            :alt="animal.name"
            class="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>

        <!-- Info -->
        <div class="md:w-2/3 md:ml-6 mt-6 md:mt-0">
          <h1 class="text-3xl font-semibold mb-6 text-stone-100">{{ animal.name }}</h1>

          <div class="grid grid-cols-2 gap-4">
            <div><strong>Family:</strong> {{ animal.family }}</div>
            <div><strong>Species:</strong> {{ animal.species }}</div>
            <div><strong>Subspecies:</strong> {{ animal.subspecies }}</div>
            <div><strong>Age:</strong> {{ animal.age }} years</div>
            <div><strong>Gender:</strong> {{ animal.gender }}</div>
            <div><strong>Weight:</strong> {{ animal.weight }} kg</div>
            <div><strong>Height:</strong> {{ animal.height }} cm</div>
            <div><strong>Length:</strong> {{ animal.length }} cm</div>
          </div>

          <!-- Checkboxes -->
          <div class="mt-6 grid grid-cols-2 gap-4">
            <div
              v-for="trait in [
                { key: 'neutered', label: 'Neutered' },
                { key: 'vaccinated', label: 'Vaccinated' },
                { key: 'microchipped', label: 'Microchipped' },
                { key: 'trained', label: 'Trained' },
                { key: 'socialized', label: 'Socialized' },
              ]"
              :key="trait.key"
              class="flex items-center"
            >
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="animal[trait.key]" class="sr-only peer" disabled />
                <div
                  class="relative w-11 h-6 bg-stone-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:bg-emerald-700 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
                ></div>
                <span class="ml-3 text-base">{{ trait.label }}</span>
              </label>
            </div>
          </div>

          <!-- Text info -->
          <div class="mt-6 space-y-2">
            <div><strong>Health Issues:</strong> {{ animal.healthIssues }}</div>
            <div><strong>Personality:</strong> {{ animal.personalityDescription }}</div>
          </div>

          <!-- Family specific -->
          <template v-if="animal.family === 'Mammal'">
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div v-if="additionalDetails.coatType"><strong>Coat Type:</strong> {{ additionalDetails.coatType }}</div>
              <div v-if="additionalDetails.groomingProducts"><strong>Grooming Products:</strong> {{ additionalDetails.groomingProducts }}</div>
            </div>
          </template>

          <template v-else-if="animal.family === 'Bird'">
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div v-if="additionalDetails.cageSize"><strong>Cage Size:</strong> {{ additionalDetails.cageSize }}</div>
              <div v-if="additionalDetails.recommendedToys"><strong>Recommended Toys:</strong> {{ additionalDetails.recommendedToys }}</div>
              <div v-if="additionalDetails.sociability"><strong>Sociability:</strong> {{ additionalDetails.sociability }}</div>
            </div>
          </template>

          <template v-else-if="animal.family === 'Fish'">
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div v-if="additionalDetails.tankSize"><strong>Tank Size:</strong> {{ additionalDetails.tankSize }}</div>
              <div v-if="additionalDetails.compatibleSpecies"><strong>Compatible Species:</strong> {{ additionalDetails.compatibleSpecies }}</div>
              <div v-if="additionalDetails.recommendedItems"><strong>Recommended Items:</strong> {{ additionalDetails.recommendedItems }}</div>
            </div>
          </template>

          <template v-else-if="animal.family === 'Reptile'">
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div v-if="additionalDetails.tankSize"><strong>Tank Size:</strong> {{ additionalDetails.tankSize }}</div>
              <div v-if="additionalDetails.sociability"><strong>Sociability:</strong> {{ additionalDetails.sociability }}</div>
              <div v-if="additionalDetails.compatibleSpecies"><strong>Compatible Species:</strong> {{ additionalDetails.compatibleSpecies }}</div>
            </div>
          </template>

          <template v-else-if="animal.family === 'Amphibian'">
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div v-if="additionalDetails.humidity"><strong>Humidity:</strong> {{ additionalDetails.humidity }} %</div>
              <div v-if="additionalDetails.temperature"><strong>Temperature:</strong> {{ additionalDetails.temperature }} °C</div>
            </div>
          </template>

          <!-- Buttons -->
          <div class="flex justify-center mt-10 space-x-6">
            <button
              @click="isEditing = !isEditing"
              class="bg-emerald-700 hover:bg-emerald-600 text-stone-100 font-semibold py-2 px-6 rounded-full shadow-md transition-all hover:scale-[1.03]"
            >
              Edit
            </button>
          </div>
          </div>
           </div>
    
<!-- Edit section -->
<div
  v-if="isEditing"
  class="mx-4 p-8 rounded-2xl bg-stone-800/90 backdrop-blur-md border border-stone-500/40 shadow-inner"
>
  <h2 class="text-2xl font-semibold mb-6 text-stone-100">Edit {{ animalEdit.name }}</h2>

  <!-- Ako je životinja posvojena -->
  <p v-if="animalEdit.adopted" class="text-red-500 text-center mb-6 font-semibold">
    ⚠️ Ova životinja je već posvojena — izmjene nisu dopuštene.
  </p>

  <!-- Ako nije posvojena -->
  <div v-else>
    <div class="grid grid-cols-2 gap-6 mb-6">
      <div>
        <strong>Family:</strong>
        <input
          v-model="animalEdit.family"
          class="ml-2 px-3 py-1 rounded-full bg-stone-700/40 border border-stone-400/40 text-stone-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
      </div>

      <div>
        <strong>Species:</strong>
        <input
          v-model="animalEdit.species"
          class="ml-2 px-3 py-1 rounded-full bg-stone-700/40 border border-stone-400/40 text-stone-100 focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <strong>Subspecies:</strong>
        <input
          v-model="animalEdit.subspecies"
          class="ml-2 px-3 py-1 rounded-full bg-stone-700/40 border border-stone-400/40 text-stone-100 focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <strong>Age:</strong>
        <input
          v-model="animalEdit.age"
          class="ml-2 px-3 py-1 rounded-full bg-stone-700/40 border border-stone-400/40 text-stone-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
      </div>
      <div>
        <strong>Weight:</strong>
        <input
          v-model="animalEdit.weight"
          class="ml-2 px-3 py-1 rounded-full bg-stone-700/40 border border-stone-400/40 text-stone-100 focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div>
        <strong>Height:</strong>
        <input
          v-model="animalEdit.height"
          class="ml-2 px-3 py-1 rounded-full bg-stone-700/40 border border-stone-400/40 text-stone-100 focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div>
        <strong>Length:</strong>
        <input
          v-model="animalEdit.length"
          class="ml-2 px-3 py-1 rounded-full bg-stone-700/40 border border-stone-400/40 text-stone-100 focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </div>

    <!-- True/false svojstva -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      <div
        v-for="trait in [
          { key: 'neutered', label: 'Neutered' },
          { key: 'vaccinated', label: 'Vaccinated' },
          { key: 'microchipped', label: 'Microchipped' },
          { key: 'trained', label: 'Trained' },
          { key: 'socialized', label: 'Socialized' },
        ]"
        :key="trait.key"
        class="flex items-center"
      >
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            :checked="animalEdit[trait.key]"
            @change="toggleTrait(trait.key)"
            class="sr-only peer"
          />
          <div
            class="relative w-11 h-6 bg-stone-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:bg-emerald-700 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
          ></div>
          <span class="ml-3 text-base">{{ trait.label }}</span>
        </label>
      </div>
    </div>

    <!-- Ostali opisi -->
    <div class="mt-6 space-y-4">
      <div><strong>Health Issues:</strong>
        <textarea
          v-model="animalEdit.healthIssues"
          class="w-full mt-2 p-3 rounded-xl bg-stone-700/40 border border-stone-400/40 text-stone-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        ></textarea>
      </div>
      <div><strong>Personality Description:</strong>
        <textarea
          v-model="animalEdit.personalityDescription"
          class="w-full mt-2 p-3 rounded-xl bg-stone-700/40 border border-stone-400/40 text-stone-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        ></textarea>
      </div>
    </div>

    <div class="flex justify-center mt-10">
      <button
        @click="editAnimal"
        class="bg-emerald-700 hover:bg-emerald-600 text-stone-100 font-semibold py-2 px-6 rounded-full shadow-md transition-all hover:scale-[1.03]"
      >
        Save Changes
      </button>
    </div>
  </div>
</div>
         
            </div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import AdminNavigation from "../Admin/AdminNavigation.vue";
import Loading from "../Loading.vue";
import instance from "@/axiosBase";

const token = ref(localStorage.getItem("token"));

export default defineComponent({
  name: "AnimalDetails",
  components: { AdminNavigation, Loading },
  data() {
    return {
      loadingError: false,
      animal: null,
      animalEdit: null,
      additionalDetailsEdit: null,
      additionalDetails: {},
      showRemuve: false,
      isEditing: false,
    };
  },
  async created() {
    const id = this.$route.params.id;
    this.fetchAnimalDetails(id);
  },
  methods: {
     toggleTrait(key) {
    // Ako je trenutno true — ne dopušta promjenu
    if (this.animalEdit[key] === true) return;
    // Inače, promijeni vrijednost
    this.animalEdit[key] = !this.animalEdit[key];
  },
    async removeAnimal() {
      try {
        this.loadingError = true;
        const response = await instance.put(
          "animal/updateAnimalRecord/",
          { animalId: this.animal.idAnimal, recordId: 8 },
          { headers: { Authorization: `Bearer ${token.value}` } }
        );
        if (response.status === 200) {
          this.loadingError = false;
          this.$router.push("/search");
        }
      } catch (error) {
        console.error("Error removing animal:", error);
      }
    },
    async fetchAnimalDetails(id) {
      try {
        this.loadingError = true;
        const response = await instance.get(`animal/allanimal/${id}`);
        this.animal = response.data;
        this.animalEdit = response.data;
        if (this.animal && this.animal.idAnimal) this.loadingError = false;
      } catch (error) {
        console.error("Error fetching animal details:", error);
      }
    },
    async editAnimal() {
      try {
        const id = this.$route.params.id;
        await instance.put(
          `animal/updateAnimal/${id}`,
          {
            Animal: {
              IdAnimal: parseInt(id),
              Age: this.animalEdit.age,
              Weight: this.animalEdit.weight,
              Height: parseFloat(this.animalEdit.height),
              Length: parseFloat(this.animalEdit.length),
              Neutered: this.animalEdit.neutered,
              Vaccinated: this.animalEdit.vaccinated,
              Microchipped: this.animalEdit.microchipped,
              Trained: this.animalEdit.trained,
              Socialized: this.animalEdit.socialized,
              HealthIssues: this.animalEdit.healthIssues,
              PersonalityDescription: this.animalEdit.personalityDescription,
            },
          },
          { headers: { Authorization: `Bearer ${token.value}` } }
        );
        this.isEditing = false;
      } catch (error) {
        console.error("Error editing animal details:", error);
      }
    },
  },
});
</script>
