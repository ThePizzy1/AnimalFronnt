<template>
   
   <div class="w-full h-full fixed top-0 left-0 bg-gray-600 opacity-75 z-50 content-center"> 
    <div class="design-loadnig max-h-fit">
      <img class="paw1 " :src="pawSrc" alt="Paw Animation">
      <img class="paw2" :src="pawSrc" alt="Paw Animation">
      <img class="paw3" :src="pawSrc" alt="Paw Animation">
    </div>
    <div class="design-loadnig max-h-fit ">
      <h2  class=" text-white ">Loading...</h2>     
    </div>
   
  <div class="flex justify-center items-center mt-[50vh]">
    <div class="fas fa-circle-notch fa-spin fa-5x text-violet-600">  
</div>
  </div>
    </div>
  </template>
  
  <script>
  /*
     
  */ 
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
  .design-loadnig {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .paw1 {
    width: 40px;
    height: auto;
    margin: 0 10px;
    animation: pulse 1s infinite alternate;
    animation: bounce 1s infinite alternate;
    animation-delay: 0.2s;
  }
  .paw2 {
    width: 40px;
    height: auto;
    margin: 0 10px;
    animation: pulse 1s infinite alternate;
    animation: bounce 1s infinite alternate;
    animation-delay: 0.4s;
  }
  .paw3 {
    width: 40px;
    height: auto;
    margin: 0 10px;
    animation: pulse 1s infinite alternate;
    animation: bounce 1s infinite alternate;
    animation-delay: 0.6s;
  }
  .loading {
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
  @keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
  </style>
  