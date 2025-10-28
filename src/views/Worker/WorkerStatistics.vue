<template>
    <div class="container mx-auto px-4">  
      <!-- Navigation and content layout -->
      <div class="flex">
        <!-- Admin navigation -->
      <WorkerNavigation class="w-1/6" />
  
        <!-- Warning message -->
        <div class="w-5/6 ml-auto">
          <div class="flex justify-center items-center h-screen">
            <div class="text-center">
              <h1 class="text-3xl font-bold text-stone-200-500 mb-4">Statistics</h1>
    
            </div>
          </div>
  
         
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import WorkerNavigation from './WorkerNavigation.vue';

  
  export default {
    components: {
        WorkerNavigation,
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
  