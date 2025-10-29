<template>
  <Navigation/>

  <!-- PAGE BACKGROUND -->
  <div class="flex justify-center items-center min-h-screen text-stone-200">
    <!-- MAIN CONTAINER -->
    <div class="h-[1000px] my-10 w-96 md:w-4/5 shadow-2xl rounded-lg bg-stone-800/60 backdrop-blur-sm border border-stone-600">
      <div class="flex h-full w-full">
        
        <!-- LEFT COLUMN -->
        <div class="ml-2 h-full p-6 rounded-lg w-full">
          
          <!-- RADIO CARDS -->
          <div class="mt-10 w-full flex flex-col">
            <ul class="grid w-full gap-6 md:grid-cols-2">
              
              <!-- Option 1 -->
              <li>
                <input v-model="picked" type="radio" id="d1" name="hosting" value="Where it's needed" class="hidden peer" required />
                <label
                  for="d1"
                  class="inline-flex items-center justify-between w-full p-5 text-stone-200 bg-stone-700 border border-stone-500 rounded-lg cursor-pointer hover:bg-stone-600 peer-checked:border-stone-300 peer-checked:text-stone-100 transition"
                >
                  <div class="block">
                    <div class="w-full text-lg font-semibold">Where it's needed</div>
                    <div class="w-full text-stone-400">"Let's allocate our donation to where it can make the greatest impact."</div>
                  </div>
                </label>
              </li>

              <!-- Option 2 -->
              <li>
                <input v-model="picked" type="radio" id="d2" name="hosting" value="Shelter upgrades" class="hidden peer" />
                <label
                  for="d2"
                  class="inline-flex items-center justify-between w-full p-5 text-stone-200 bg-stone-700 border border-stone-500 rounded-lg cursor-pointer hover:bg-stone-600 peer-checked:border-stone-300 peer-checked:text-stone-100 transition"
                >
                  <div class="block">
                    <div class="w-full text-lg font-semibold">Shelter upgrades</div>
                    <div class="w-full text-stone-400">"Enhancing shelter facilities for a better tomorrow."</div>
                  </div>
                </label>
              </li>

              <!-- Option 3 -->
              <li>
                <input v-model="picked" type="radio" id="d3" name="hosting" value="Food" class="hidden peer" required />
                <label
                  for="d3"
                  class="inline-flex items-center justify-between w-full p-5 text-stone-200 bg-stone-700 border border-stone-500 rounded-lg cursor-pointer hover:bg-stone-600 peer-checked:border-stone-300 peer-checked:text-stone-100 transition"
                >
                  <div class="block">
                    <div class="pt-2 w-full text-lg font-semibold">Food</div>
                    <div class="pt-3 w-full text-stone-400">"Nourishing lives, one meal at a time."</div>
                  </div>
                </label>
              </li>

              <!-- Option 4 -->
              <li>
                <input v-model="picked" type="radio" id="d4" name="hosting" value="Toys for animals" class="hidden peer" />
                <label
                  for="d4"
                  class="inline-flex items-center justify-between w-full p-5 text-stone-200 bg-stone-700 border border-stone-500 rounded-lg cursor-pointer hover:bg-stone-600 peer-checked:border-stone-300 peer-checked:text-stone-100 transition"
                >
                  <div class="block">
                    <div class="w-full text-lg font-semibold">Toys for animals</div>
                    <div class="w-full text-stone-400">"Bringing joy to our furry friends, one toy at a time."</div>
                  </div>
                </label>
              </li>

            </ul>
          </div>

          <!-- AMOUNT INPUT -->
          <form class="mt-10 ml-4 max-w-[18rem] mx-auto flex">
            <label for="currency-input" class="sr-only">Amount</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-4 h-4 text-stone-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                </svg>
              </div>
              <input
                type="number"
                v-model="amount"
                min="1"
                id="currency-input"
                class="block p-2.5 w-full z-20 ps-10 text-base text-stone-100 bg-stone-800 rounded-s-lg border border-stone-600 placeholder-stone-500 focus:ring-2 focus:ring-stone-300 focus:border-stone-300 outline-none"
                placeholder="Enter amount"
                required
              />
            </div>
            <button
              type="button"
              class="rounded-e-lg inline-flex bg-stone-700 w-full px-4 py-2 text-base text-stone-100 hover:bg-stone-600 transition"
              role="menuitem"
            >
              <div class="inline-flex items-center">
                <svg class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                EUR
              </div>
            </button>
          </form>

          <!-- CARD FORM -->
          <form class="mt-5 ml-4 max-w-sm mx-auto">
            <label for="card-number-input" class="sr-only">IBAN / Card number</label>
            <div class="relative">
              <input
                v-model="iban"
                type="text"
                id="card-number-input"
                class="bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-400 text-base rounded-lg focus:ring-2 focus:ring-stone-300 focus:border-stone-300 block w-full pe-10 p-2.5 outline-none"
                placeholder="HR1235412548452125481"
                required
              />
            </div>

            <div class="grid grid-cols-3 gap-4 my-4">
              <!-- Expiry -->
              <div class="relative max-w-sm col-span-2">
                <input
                  id="card-expiration-input"
                  type="text"
                  placeholder="12/23"
                  class="bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-400 text-base rounded-lg focus:ring-2 focus:ring-stone-300 focus:border-stone-300 block w-full ps-10 p-2.5 outline-none"
                  required
                />
              </div>

              <!-- CVV -->
              <div class="col-span-1">
                <input
                  type="number"
                  min="0"
                  id="cvv-input"
                  class="bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-400 text-base rounded-lg focus:ring-2 focus:ring-stone-300 focus:border-stone-300 block w-full p-2.5 outline-none"
                  placeholder="CVV"
                  required
                />
              </div>
            </div>

            <button
              @click="handleSubmit"
              type="button"
              class="text-stone-900 bg-stone-300 hover:bg-stone-400 focus:ring-4 focus:ring-stone-300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 focus:outline-none transition"
            >
              Pay now
            </button>
          </form>
        </div>

        <!-- RIGHT COLUMN (IMAGE) -->
        <div class="h-full hidden md:block relative overflow-hidden w-full">
          <img
            class="h-full w-full object-cover opacity-30"
            src="https://firebasestorage.googleapis.com/v0/b/animalrescue-fa5f9.appspot.com/o/DONATE.png?alt=media&token=c78dd20b-3abb-4221-a565-4d836b56e522"
            alt="Donate"
          />
        </div>
      </div>
    </div>
  </div>

  <Footer/>
</template>

<script>
import Navigation from '../User/Navigation.vue';
import Footer from '../User/Footer.vue';
import Swal from 'sweetalert2';
import instance from '@/axiosBase';
import moment from 'moment';

export default {
  components: { Navigation, Footer },
  data() {
    return {
      adopterId: localStorage.getItem('adopterid'),
      amount: '',
      picked: '',
      iban: '',
      token: localStorage.getItem('token'),
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.picked || !this.amount || !this.iban) {
          await Swal.fire({ title: "Please fill all fields!", icon: "warning" });
          return;
        }

        const donationAccounts = {
          "Food": { id: 1, iban: "HR1424300091111111111" },
          "Toys for animals": { id: 2, iban: "HR9823600012222222222" },
          "Shelter upgrades": { id: 3, iban: "HR4424840081333333333" },
          "Where it's needed": { id: 4, iban: "HR6823900123444444444" },
        };

        const selected = donationAccounts[this.picked];
        if (!selected) {
          await Swal.fire({ title: "Invalid donation type!", icon: "error" });
          return;
        }

        console.log("💰 Starting donation...");
        console.log("Purpose:", this.picked);
        console.log("From:", this.iban, "To:", selected.iban);

        // ADD FUNDS
        const addFunds = await instance.post("animal/addFunds", {
          AdopterId: parseInt(this.adopterId),
          Amount: parseFloat(this.amount),
          Purpose: this.picked,
          Iban: this.iban,
        });

        console.log("✅ Funds Added:", addFunds.status);

        // UPDATE BALANCE
        const updateBal = await instance.put("animal/updateBalansDomain", {
          id: selected.id,
          balance: parseFloat(this.amount),
        });

        console.log("💹 Balance Updated:", updateBal.status);

        // ADD TRANSACTION
        const addTransaction = await instance.post("animal/addTransactions", {
          Iban: this.iban,
          IbanAnimalShelter: selected.iban,
          Type: "payment",
          Cost: parseFloat(this.amount),
          Purpose: this.picked,
        });

        console.log("📒 Transaction Added:", addTransaction.status);

        await Swal.fire({
          title: "Donation Successful!",
          text: `Your ${this.picked.toLowerCase()} donation has been processed.`,
          icon: "success",
        });

        window.location.reload();

      } catch (error) {
        console.error("❌ Donation error:", error.response?.data || error.message);
        await Swal.fire({
          title: "Error",
          text: "Something went wrong while processing your donation.",
          icon: "error",
        });
      }
    },
  },
};
</script>
