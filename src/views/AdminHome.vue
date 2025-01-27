<template>
  <div class="container mx-auto px-4">  
    <!-- Navigation and content layout -->
    <div class="flex">
      <!-- Admin navigation -->
    <AdminNavigation class="w-1/6" />

      <!-- Warning message -->
      <div class="w-5/6 ml-auto">
        <div class="flex justify-center items-center h-screen">
          <div class="text-center">
            <h1 class="text-3xl font-bold text-red-500 mb-4">Access Restricted!</h1>
            <p class="text-lg text-white mb-8">This area is restricted to administrators only.</p>
            <p class="text-lg text-white">If you believe you should have access, please contact the administrator.</p>
          </div>
        </div>

        <!-- Policy text -->
        <div class="flex justify-start items-left h-screen mb-0">
          
  <div class="text-left"> <!-- Promijenjen text-center u text-left -->
    <h2 class="mb-5 text-2xl font-bold text-white text-center mb-4">Usage Policy</h2>
    <h2 class="text-2xl font-bold text-white mb-4">Disclaimer: </h2>
    <p class="text-lg text-white mb-8">
      The administrative part of the page serves exclusively for adding relevant data in accordance with the defined goals. All information entered must be true and relevant.
    </p>
    <h2 class="text-2xl font-bold text-white mb-4">Privacy protection: </h2>
    <p class="text-lg text-white">
   
Any added data must comply with privacy protection rules. It is not allowed to enter sensitive or personal data without the user's consent.
    </p>
    <h2 class="text-2xl font-bold text-white mb-4">Access control: </h2>
    <p class="text-lg text-white">
      Only authorized users have access to the administrative part of the site. Each user is responsible for the security of their access data and may not share it with others.
    </p>
    <h2 class="text-2xl font-bold text-white mb-4"> Data accuracy checked:  </h2>
    <p class="text-lg text-white">
      Before adding new data, users are obliged to check their accuracy and relevance. Any information should be confirmed from reliable sources.
    </p>
    <h2 class="text-2xl font-bold text-white mb-4">Security measures:  </h2>
    <p class="text-lg text-white">
      The administrative part of the site has implemented security measures to protect against unauthorized access and abuse. Each user must respect these security protocols.
    </p>
  </div>
</div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavigation from './AdminNavigation.vue';

export default {
  components: {
    AdminNavigation,
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
