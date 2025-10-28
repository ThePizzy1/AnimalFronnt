<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
    <div class="p-6 rounded-lg shadow-lg bg-gradient-to-r from-green-500 via-teal-500 to-blue-500">
      <h2 class="text-xl font-bold mb-4">Adoption Details</h2>
      
      <!-- Adopter Details -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2">Adopter Information</h3>
        <p><strong>Username:</strong> {{ adoption.adopter.username }}</p>
        <p><strong>First Name:</strong> {{ adoption.adopter.firstName }}</p>
        <p><strong>Last Name:</strong> {{ adoption.adopter.lastName }}</p>
        <p><strong>Residence:</strong> {{ adoption.adopter.residence }}</p>
      </div>
      
      <!-- Animal Details -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2">Animal Information</h3>
        <p><strong>Name:</strong> {{ adoption.animal.name }}</p>
        <p><strong>Family:</strong> {{ adoption.animal.family }}</p>
        <p><strong>Subspecies:</strong> {{ adoption.animal.subspecies }}</p>
        <p><strong>Species:</strong> {{ adoption.animal.species }}</p>
        <p><strong>Age:</strong> {{ adoption.animal.age }}</p>
        <p><strong>Gender:</strong> {{ adoption.animal.gender }}</p>
        <p><strong>Weight:</strong> {{ adoption.animal.weight }} kg</p>
        <p><strong>Height:</strong> {{ adoption.animal.height }} cm</p>
        <p><strong>Length:</strong> {{ adoption.animal.length }} cm</p>
        <p><strong>Health Issues:</strong> {{ adoption.animal.healthIssues }}</p>
        <p><strong>Personality:</strong> {{ adoption.animal.personalityDescription }}</p>
        <p><strong>Neutered:</strong> {{ adoption.animal.neutered ? 'Yes' : 'No' }}</p>
        <p><strong>Vaccinated:</strong> {{ adoption.animal.vaccinated ? 'Yes' : 'No' }}</p>
        <p><strong>Microchipped:</strong> {{ adoption.animal.microchipped ? 'Yes' : 'No' }}</p>
        <p><strong>Trained:</strong> {{ adoption.animal.trained ? 'Yes' : 'No' }}</p>
        <p><strong>Socialized:</strong> {{ adoption.animal.socialized ? 'Yes' : 'No' }}</p>
        <img v-if="adoption.animal.picture" :src="'data:image/jpeg;base64,' + adoption.animal.picture" :alt="adoption.animal.name" class="w-40 h-40 rounded-xl mt-4" />
      </div>

      <!-- Adoption Details -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2">Adoption Details</h3>
        <p><strong>Adoption Code:</strong> {{ adoption.code }}</p>
        <p><strong>Animal ID:</strong> {{ adoption.animalId }}</p>
        <p><strong>Adopter ID:</strong> {{ adoption.adopterId }}</p>
        <p><strong>Adoption Date:</strong> {{ formatDate(adoption.adoptionDate) }}</p>
      </div>
      
      <button @click="closeModal" class="mt-4 px-4 py-2 bg-blue-500 text-stone-200 rounded-md">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    adoption: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      return date.toISOString().split('T')[0];
    }
  }
};
</script>

<style scoped>
/* Gradient background for modal */
.bg-gradient-to-r {
  background: linear-gradient(-40deg, #01b501, #01ad40, #01b29a, #005cf1);
  background-size: 400% 400%;
  animation: gradient 22s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>


  
  <style scoped>
  /* Modal styles */
  .modal-content {
    background: linear-gradient(-40deg, #2be02b, #26e66c, #08d8bd, #1b6ef3);
    background-size: 400% 400%;
    animation: gradient 22s ease infinite;
    color: white;
  }
  
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  /* Optional additional styling for modal content */
  .modal-content {
    border: 1px solid rgba(255, 255, 255, 0.2); /* Add a border for better contrast */
  }
  </style>
  