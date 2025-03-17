<template>

    <div class="flex">
                <div class="w-1/6 text-white p-4 rounded-l-lg">
                    <component :is="role === 'Admin' ? 'AdminNavigation' : 'WorkerNavigation'" />
                </div>
             <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
                    <h1 class="text-xl font-bold mb-4">News</h1>

                    <button @click="add = true"  :class="{ 'cursor-allowed opacity-100': checkMenager==true,   'cursor-not-allowed opacity-50': checkMenager==false}" type="button" class="mb-4 text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                        <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
                        </svg>
                        <span class="block text-sm font-bold mx-2">Add</span>
                    </button>



                    <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
                        <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                            <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
                            <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Iban</th>
                            <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Type</th>
                            <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">LastUpdated</th>
                            <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.id" class="border-b border-customBlack cursor-pointer" >
                            <td class="px-5 py-5 text-sm font-bold text-left">
                                <svg @click="openSinglModal(item)" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </td>  
                            <td class="px-5 py-5 text-sm font-bold text-left">{{ item.iban }}</td>
                            <td class="px-5 py-5 text-sm font-bold text-left">{{ item.type }}</td>
                            <td class="px-5 py-5 text-sm font-bold text-left">{{ formatDate(item.lastUpdated) }}</td>
                            <td class="px-5 py-5 text-sm font-bold text-left">{{ item.balance }}€</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
         </div>



          <!-- Single item modal -->
 <div v-if="single" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-x-auto custom-scrollbar">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Animal Details
          </h3>
          <button @click="single = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2 ">
              <label for="singleCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Iban</label>
              <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
              {{ this.singleItem.iban }}
            </span>
            </div>
            <div class="col-span-2 ">
              <label for="singleCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
              <span type="text" id="singleCode"  class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
              {{ this.singleItem.type }}
            </span>
            </div>
            <div class="col-span-2 ">
              <label for="animalName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
              <span type="text" id="animalName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ formatDate(this.singleItem.lastUpdated)}}
            </span>
            </div>
            <div class="col-span-2">
              <label for="singleName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Balance</label>
              <span type="text" id="singleName"  class="overflow-x-auto custom-scrollbar bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readonly>
                {{ this.singleItem.balance }}€
            </span>
            </div>
         
          </div>
        </form>
      </div>
    </div>
  </div>




  
   <!-- Main modal -->
   <div  v-if="add && this.role=='Admin'" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Add 
                </h3>
                <button @click="add = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
               <!-- Modal body -->
               <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="ibanAdd" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Iban</label>
                        <input type="text" name="ibanAdd" v-model="ibanAdd" id="ibanAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="HR1212345678901234567" required="">
                    </div>
                    <div class="col-span-2">
                        <label for="typeAdd" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                        <input type="text" name="typeAdd" v-model="typeAdd" id="typeAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Business" required="">
                    </div>
                  
              
                    <div class="col-span-2 sm:col-span-2">
                        <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                        <input type="date" v-model="lastUpdatedAdd" name="date" id="date" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" v-model="password" name="password" id="password" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                        <label for="passwordConfirm" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input type="password" v-model="passwordConfirm" name="passwordConfirm" id="passwordConfirm" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required="">
                    </div>
              
                    
                   
                </div>
                <button @click="handleSubmit()" type="submit" class="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add 
                </button>
              
            </form>
        </div>
    </div>
</div>




 </template>
 <script >
import AdminNavigation from '../Admin/AdminNavigation.vue';
import WorkerNavigation from '../Worker/WorkerNavigation.vue';
import instance from '@/axiosBase';
  import Swal from 'sweetalert2'
export default {
  components: {
    WorkerNavigation,
    AdminNavigation,
  }, 
   data() {
    return {
        role: localStorage.getItem('userRole') || 'Admin', 
      add: false,
      ibanAdd:"",
      lastUpdatedAdd:"",
      typeAdd:"",
      balanceAdd:0.00,
      password:"",
      passwordConfirm:"",
      items: [],
      single: false,
      singleItem:[],
      isLoading: true,
      
    };
  },
  computed:{
 checkMenager(){
            if(this.role==='Admin'){
            return true;
            }
            else{
              return false;
            }
          },
    
 

 },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await instance.get('animal/balans_db');
        this.items = response.data;
        console.log(this.items);
        this.isLoading = false;
      } catch (error) {
        console.error('There was an error!', error);
        this.isLoading = false;
      }
    },  formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    async openSinglModal(item) {
      this.single = true;
      this.singleItem = item;
      
    },
async checkData(){
 
},

    async handleSubmit() {
    try {
            var check=null;

              if(this.password==''){
                }
                else if(this.password!=this.passwordConfirm)
                {
                await Swal.fire({
                        title: "Oops!",
                        text: "Passwords do not match!",
                        draggable: true,
                        icon: "error"
                        });
                        this.check=false;
                }

                else if(this.password.length<=8){
                await Swal.fire({
                        title: "Oops!",
                        text: "Passwords is to short!",
                        draggable: true,
                        icon: "error"
                        });
                        this.check=false;
                }
             /*   else  if(!this.password.includes([A-Za-z]))
                {  await Swal.fire({
                        title: "Oops!",
                        text: "Passwords must have at least one uppercase ('A'-'Z'),at least one lowercase ('a'-'z') ",
                        draggable: true,
                        icon: "error"
                        });
                        this.check=false;
                    }*/
                    else{
                        this.check=true;
                    }
                  if(this.check){
                const response = await instance.post('animal/addBalans', {
                    Iban: this.ibanAdd, 
                    LastUpdated: "2026-05-20T00:00:00", //`${this.lastUpdatedAdd}T00:00:00.00`,
                    Password:this.password,
                    Type: this.typeAdd
                },
                {
                    headers: {
                    Authorization: `Bearer ${this.token}`, 
                    },
                    });



            console.log(response.status);
            alert("Response"+response.status);
                await  Swal.fire({
                        title: "Item added!",
                        draggable: true,
                        icon: "success"
                    });
            }
            else{return}
    } catch (error) {
      console.error('There was an error!', error);
      console.log("Iban"+this.ibanAdd);
      console.log("Type"+this.typeAdd);
      console.log("Date"+this.lastUpdatedAdd);
      console.log("Balance"+this.balanceAdd);
      console.log("Password"+this.password);
      alert("Greška");
     await Swal.fire({
            title: "Oops!",
            text: "Failed to add item. Try again.",
            draggable: true,
            icon: "error"
          });
    }
  },
  }
  
  
  
  };
</script>