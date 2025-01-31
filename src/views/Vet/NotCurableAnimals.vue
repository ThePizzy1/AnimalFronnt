<template>
    <div class="container mx-auto px-4">  
      <!-- Navigation and content layout -->
      <div class="flex">
    
      <VetNavigation class="w-1/6" />
  
        <!-- Warning message -->
        <div class="w-5/6 ml-auto">
          <div class="flex justify-center items-center h-screen">
            <div class="text-center">
              <h1 class="text-3xl font-bold text-white-500 mb-4">Not Curable Animals</h1>
      
            </div>
          </div>
  
        
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import VetNavigation from '../Vet/VetNavigation.vue';

  
  export default {
    components: {
      VetNavigation,
    },
    // Add your component logic here
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
  