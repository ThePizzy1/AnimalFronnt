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
            <h1 class="text-5xl font-bold text-red-800 mb-4 drop-shadow-md ">Access Restricted!</h1>
            <p class="text-lg text-stone-200 font-semibold mb-2">This area is restricted to administrators only.</p>
            <p class="text-lg text-stone-200 font-semibold">If you believe you should have access, please contact the administrator.</p>
          </div>
        </div>

        <!-- Policy text -->
        <div class="flex justify-start items-left h-screen mb-0">
          
  <div class="text-left"> <!-- Promijenjen text-center u text-left -->
    <h2 class="mb-5 text-3xl font-bold text-stone-200 text-center mb-4 ">Usage Policy</h2>
    <h2 class="text-2xl font-bold text-stone-200 mb-2">Disclaimer: </h2>
    <p class="text-lg text-stone-200 mb-8 font-semibold">
      The administrative part of the page serves exclusively for adding relevant data in accordance with the defined goals. All information entered must be true and relevant.
    </p>
    <h2 class="text-2xl font-bold text-stone-200 mb-2 font-bold">Privacy protection: </h2>
    <p class="text-lg text-stone-200 mb-8 font-semibold">
   
Any added data must comply with privacy protection rules. It is not allowed to enter sensitive or personal data without the user's consent.
    </p>
    <h2 class="text-2xl font-bold text-stone-200 mb-2 font-bold">Access control: </h2>
    <p class="text-lg text-stone-200 mb-8 font-semibold">
      Only authorized users have access to the administrative part of the site. Each user is responsible for the security of their access data and may not share it with others.
    </p>
    <h2 class="text-2xl font-bold text-stone-200 mb-2 font-bold"> Data accuracy checked:  </h2>
    <p class="text-lg text-stone-200 mb-8 font-semibold">
      Before adding new data, users are obliged to check their accuracy and relevance. Any information should be confirmed from reliable sources.
    </p>
    <h2 class="text-2xl font-bold text-stone-200 mb-2 font-bold">Security measures:  </h2>
    <p class="text-lg text-stone-200 mb-8 font-semibold">
      The administrative part of the site has implemented security measures to protect against unauthorized access and abuse. Each user must respect these security protocols.
    </p>
  </div>
</div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavigation from '../Admin/AdminNavigation.vue';

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
