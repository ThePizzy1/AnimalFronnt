<template>
  <Navigation/>

  <!-- PAGE BACKGROUND -->
  <div class="flex justify-center items-center py-16 px-4 text-stone-200">
    <!-- MAIN CONTAINER -->
    <div class="w-full max-w-6xl shadow-2xl rounded-2xl bg-stone-800/60 backdrop-blur-sm border border-stone-700 overflow-hidden">
      <div class="flex flex-col lg:flex-row">

        <!-- LEFT COLUMN -->
        <div class="w-full lg:w-1/2 p-8">

          <!-- TITLE -->
          <h2 class="text-3xl font-semibold mb-8 text-center text-stone-100">Choose where to help 💛</h2>

          <!-- RADIO OPTIONS -->
          <div class="grid gap-4 mb-10 md:grid-cols-2">
            <label
              v-for="(option, i) in donationOptions"
              :key="i"
              class="cursor-pointer bg-stone-700 border border-stone-600 rounded-xl p-5 hover:bg-stone-600 transition peer-checked:border-stone-300"
            >
              <input
                type="radio"
                v-model="picked"
                :value="option.title"
                class="hidden"
              />
              <span class="font-semibold text-lg">{{ option.title }}</span>
              <p class="text-stone-400 text-sm mt-1">"{{ option.desc }}"</p>
            </label>
          </div>

          <!-- AMOUNT INPUT -->
          <div class="flex items-center mb-6">
            <div class="relative flex-1">
              <input
                type="number"
                v-model.number="amount"
                min="0"
                step="0.01"
                @input="validateAmount"
                id="currency-input"
                class="block w-full p-3 pl-10 text-base text-stone-100 bg-stone-800 rounded-l-lg border border-stone-600 placeholder-stone-400 focus:ring-2 focus:ring-stone-300 focus:border-stone-300 outline-none"
                placeholder="Enter amount"
                required
              />
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-stone-400">
                €
              </div>
            </div>
            <button
              disabled
              class="bg-stone-700 px-4 py-3 rounded-r-lg text-base text-stone-100 cursor-default"
            >
              EUR
            </button>
          </div>

          <!-- IBAN INPUT -->
          <div class="mb-6">
            <input
              v-model="iban"
              type="text"
              maxlength="21"
              class="w-full bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-400 text-base rounded-lg focus:ring-2 focus:ring-stone-300 focus:border-stone-300 p-3 outline-none"
              placeholder="HR1234567890123456789"
              required
            />
          </div>

          <!-- EXPIRY + CVV -->
          <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="col-span-2">
              <input
                v-model="expiry"
                type="text"
                maxlength="5"
                placeholder="MM/YY"
                class="w-full bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-400 text-base rounded-lg focus:ring-2 focus:ring-stone-300 focus:border-stone-300 p-3 outline-none"
                required
              />
            </div>
            <div class="col-span-1">
              <input
                v-model="cvv"
                type="password"
                maxlength="3"
                placeholder="CVV"
                class="w-full bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-400 text-base rounded-lg focus:ring-2 focus:ring-stone-300 focus:border-stone-300 p-3 outline-none"
                required
              />
            </div>
          </div>

          <!-- PAY BUTTON -->
          <button
            @click="handleSubmit"
            type="button"
            class="w-full text-stone-900 bg-stone-300 hover:bg-stone-400 focus:ring-4 focus:ring-stone-300 font-medium rounded-lg text-base px-5 py-3 mb-2 focus:outline-none transition"
          >
            Pay now
          </button>
        </div>

        <!-- RIGHT COLUMN (IMAGE) -->
        <div class="w-full lg:w-1/2 relative">
          <img
            class="h-full w-full object-cover"
            src="/donate.png"
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

export default {
  components: { Navigation, Footer },
  data() {
    return {
      adopterId: localStorage.getItem('adopterid'),
      amount: '',
      picked: '',
      iban: '',
      expiry: '',
      cvv: '',
      token: localStorage.getItem('token'),
      donationOptions: [
        { title: 'Where it\'s needed', desc: 'Let\'s allocate our donation to where it can make the greatest impact.' },
        { title: 'Shelter upgrades', desc: 'Enhancing shelter facilities for a better tomorrow.' },
        { title: 'Food', desc: 'Nourishing lives, one meal at a time.' },
        { title: 'Toys for animals', desc: 'Bringing joy to our furry friends, one toy at a time.' },
      ],
    };
  },
  methods: {
    validateAmount() {
      if (this.amount < 0) this.amount = 0;
    },
    validateIBAN(iban) {
      return /^HR\d{19}$/.test(iban.trim());
    },
    async handleSubmit() {
      try {
        if (!this.picked || !this.amount || !this.iban || !this.expiry || !this.cvv) {
          await Swal.fire({ title: "Please fill all fields!", icon: "warning" });
          return;
        }

        if (this.amount <= 0) {
          await Swal.fire({ title: "Amount must be greater than 0!", icon: "warning" });
          return;
        }

        if (!this.validateIBAN(this.iban)) {
          await Swal.fire({ title: "Invalid Croatian IBAN format!", icon: "error" });
          return;
        }

        if (!/^\d{2}\/\d{2}$/.test(this.expiry)) {
          await Swal.fire({ title: "Expiry must be in MM/YY format!", icon: "error" });
          return;
        }

        if (!/^\d{3}$/.test(this.cvv)) {
          await Swal.fire({ title: "CVV must be 3 digits!", icon: "error" });
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

        console.log("💰 Donation Details:", {
          purpose: this.picked,
          from: this.iban,
          to: selected.iban,
          amount: this.amount,
        });

        // ADD FUNDS
        await instance.post("animal/addFunds", {
          AdopterId: parseInt(this.adopterId),
          Amount: parseFloat(this.amount),
          Purpose: this.picked,
          Iban: this.iban,
        });

        // UPDATE BALANCE
        await instance.put("animal/updateBalansDomain", {
          id: selected.id,
          balance: parseFloat(this.amount),
        });

        // ADD TRANSACTION
        await instance.post("animal/addTransactions", {
          Iban: this.iban,
          IbanAnimalShelter: selected.iban,
          Type: "payment",
          Cost: parseFloat(this.amount),
          Purpose: this.picked,
        });

        await Swal.fire({
          title: "Donation Successful! 🎉",
          text: `Your donation for "${this.picked}" has been processed successfully.`,
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
