<template>
    <div class="container mx-auto px-4">  
      <!-- Navigation and content layout -->
      <div class="flex">
        <!-- Admin navigation -->
      <VetNavigation class="w-1/6" />
  
        <!-- Warning message -->
        <div class="w-5/6 ml-auto">
          <div class="flex justify-center items-center h-screen">
            <div class="text-center">
              <h1 class="text-3xl font-bold text-red-500 mb-4">Access Restricted!</h1>
              <p class="text-lg text-white mb-8">This area is restricted to Veterinarinans only.</p>
              <p class="text-lg text-white">If you believe you should have access, please contact the administrator.</p>
            </div>
          </div>
  
          <!-- Policy text -->
          <div class="flex justify-start items-left h-screen mb-0">
            
            <div class="text-left">
  <h2 class="mb-5 text-2xl font-bold text-white text-center mb-4">Usage Policy for Veterinarians</h2>
  <h2 class="text-2xl font-bold text-white mb-4">Disclaimer: </h2>
  <p class="text-lg text-white mb-8">
    The veterinary section of the page is intended exclusively for adding and managing animal health records and related data. All information entered must be accurate and relevant.
  </p>
  <h2 class="text-2xl font-bold text-white mb-4">Privacy Protection: </h2>
  <p class="text-lg text-white">
    Any data added must comply with privacy protection rules. It is not allowed to enter sensitive or personal data without the owner's consent.
  </p>
  <h2 class="text-2xl font-bold text-white mb-4">Access Control: </h2>
  <p class="text-lg text-white">
    Only authorized veterinarians have access to this section of the site. Each user is responsible for the security of their access data and may not share it with others.
  </p>
  <h2 class="text-2xl font-bold text-white mb-4">Data Accuracy: </h2>
  <p class="text-lg text-white">
    Before adding new data, veterinarians are obliged to check its accuracy and relevance. Any information should be confirmed from reliable sources.
  </p>
  <h2 class="text-2xl font-bold text-white mb-4">Security Measures: </h2>
  <p class="text-lg text-white">
    The veterinary section of the site has implemented security measures to protect against unauthorized access and abuse. Each user must respect these security protocols.
  </p>
  <h2 class="text-2xl font-bold text-white mb-4">Professional Conduct: </h2>
  <p class="text-lg text-white">
    Veterinarians must adhere to professional conduct and ethical standards while using this section of the site. Any misuse or unethical behavior will result in access being revoked.
  </p>
</div>
  </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import VetNavigation from './VetNavigation.vue';

  
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
  