<template>
    <Navigation/>
    <div class="flex justify-center items-center min-h-screen">
      <div class="h-[1000px] my-10 w-96 md:w-4/5 shadow-2xl rounded-lg md:rounded-lg">
        <div class="flex h-full w-full">
          <div class="ml-2  h-full p-3 rounded-lg w-full ">
            
            <div class="mt-10 w-full border-black flex flex-col">
                <ul class="grid w-full gap-6 md:grid-cols-2">
             <li>
             <input type="radio" id="d1" name="hosting" value="d1" class="hidden peer" required />
             <label for="d1" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-green-500 peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
             <div class="block">
                <div class="w-full text-lg font-semibold">Where it's neaded</div>
                <div class="w-full">"Let's allocate our donation to where it can make the greatest impact."</div>
             </div>
            
             </label>
             </li>
             <li>
             <input type="radio" id="d2" name="hosting" value="d2" class="hidden peer">
             <label for="d2" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-green-500 peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="block">
                <div class="w-full text-lg font-semibold">Shelter upgrades</div>
                <div class="w-full">"Enhancing shelter facilities for a better tomorrow."</div>
            </div>
             </label>
             </li>
            
             <li>
             <input type="radio" id="d3" name="hosting" value="d3" class="hidden peer" required />
             <label for="d3" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
             <div class="block">
                <div class="pt-2 w-full text-lg font-semibold">Food</div>
                <div class="pt-3 w-full">"Nourishing lives, one meal at a time."</div>
             </div>
            
             </label>
             </li>
             <li>
             <input type="radio" id="d4" name="hosting" value="d4" class="hidden peer">
             <label for="d4" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-green-500 peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="block">
                <div class="w-full text-lg font-semibold">Toys for animals</div>
                <div class="w-full">"Bringing joy to our furry friends, one toy at a time.</div>
            </div>
             </label>
             </li>
             </ul>
            </div>
  
            
           
  
           
            <form class="mt-10 ml-4 max-w-[18rem] mx-auto flex">
    <label for="currency-input" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
        </svg>
        </div>
        <input type="number" id="currency-input" class="block p-2.5 w-full z-20 ps-10 text-sm  text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Enter amount" required />
    </div>
    <button type="button" class="rounded-e-lg inline-flex bg-white w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-200" role="menuitem">
                <div class="inline-flex items-center">
                    <svg class="mr-2 h-6 w-6 text-blue-800"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
  EUR
                </div>
            </button>
    
</form>

<form class="mt-5 ml-4 max-w-sm mx-auto">
    <label for="card-number-input" class="sr-only">Card number:</label>
    <div class="relative">
        <input type="text" id="card-number-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="4242 4242 4242 4242" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <svg fill="none" class="h-6 text-[#1434CB] dark:text-white" viewBox="0 0 36 21"><path fill="currentColor" d="M23.315 4.773c-2.542 0-4.813 1.3-4.813 3.705 0 2.756 4.028 2.947 4.028 4.332 0 .583-.676 1.105-1.832 1.105-1.64 0-2.866-.73-2.866-.73l-.524 2.426s1.412.616 3.286.616c2.78 0 4.966-1.365 4.966-3.81 0-2.913-4.045-3.097-4.045-4.383 0-.457.555-.957 1.708-.957 1.3 0 2.36.53 2.36.53l.514-2.343s-1.154-.491-2.782-.491zM.062 4.95L0 5.303s1.07.193 2.032.579c1.24.442 1.329.7 1.537 1.499l2.276 8.664h3.05l4.7-11.095h-3.043l-3.02 7.543L6.3 6.1c-.113-.732-.686-1.15-1.386-1.15H.062zm14.757 0l-2.387 11.095h2.902l2.38-11.096h-2.895zm16.187 0c-.7 0-1.07.37-1.342 1.016L25.41 16.045h3.044l.589-1.68h3.708l.358 1.68h2.685L33.453 4.95h-2.447zm.396 2.997l.902 4.164h-2.417l1.515-4.164z"/></svg>
        </div>
    </div>
    <div class="grid grid-cols-3 gap-4 my-4">
        <div class="relative max-w-sm col-span-2">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
            </div>
            <label for="card-expiration-input" class="sr-only">Card expiration date:</label>
            <input datepicker datepicker-format="mm/yy" id="card-expiration-input" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12/23" required />
        </div>
        <div class="col-span-1">
            <label for="cvv-input" class="sr-only">Card CVV code:</label>
            <input type="number" id="cvv-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CVV" required />
        </div>
    </div>
    <button  @click="submitForm" type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Pay now</button>
</form>
            
          
          </div>
          <div class="h-full hidden md:block relative md:rounded-lg overflow-hidden bg-[url('https://imgur.com/2hR32WP.jpg')] w-full">
           
          <img class="h-full w-full object-cover" src="https://firebasestorage.googleapis.com/v0/b/animalrescue-fa5f9.appspot.com/o/DONATE.png?alt=media&token=c78dd20b-3abb-4221-a565-4d836b56e522">
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>
<script>
import Navigation from '../Navigation.vue';
import Footer from '../Footer.vue';

export default {
    components: {
        Navigation,
        Footer,
    },
    data() {
        return {
            donationPurpose: '', 
            donationAmount: '', 
            cardNumber: '', 
            cardExpiration: '', 
            cvv: '', 
           
        };
    },
    methods: {
        submitForm() {
          
            if (!this.donationPurpose || !this.donationAmount || !this.cardNumber || !this.cardExpiration || !this.cvv) {
           
                 
            } else {
               
            setTimeout(() => {
                  
                    this.donationPurpose = '';
                    this.donationAmount = '';
                    this.cardNumber = '';
                    this.cardExpiration = '';
                    this.cvv = '';
                    setTimeout(() => {
                        
                    }, 5000); 
                }, 2000); 

            }
        },
    },
};
</script>

<style>

</style>