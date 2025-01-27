<template>
    <div v-if="visible" class="loading-animation">
      <img class="paw" :src="pawSrc" alt="Paw Animation">
      <img class="paw" :src="pawSrc" alt="Paw Animation">
      <img class="paw" :src="pawSrc" alt="Paw Animation">
    </div>
  </template>
  
  <script>
  import pawImage from '/paw.png'; // Adjust path according to your project structure
  
  export default {
    name: 'Loading',
    props: {
      visible: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        pawSrc: pawImage
      };
    }
  }
  </script>
  
  <style>
  .loading-animation {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .paw {
    width: 40px;
    height: auto;
    margin: 0 10px;
    animation: pulse 1s infinite alternate;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2);
    }
  }
  </style>
  