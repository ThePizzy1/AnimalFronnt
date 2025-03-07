<template>
  <div class="flex">
    <div class="w-1/6 text-white p-4 rounded-l-lg">
      <WorkerNavigation />
    </div>
    <div class="w-5/6 text-white p-4 rounded-r-lg mr-8">
      <h1 class="text-xl font-bold mb-4">Animal Food Database</h1>

      <button @click="add = true" type="button" class="mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
          <svg class="w-8 h-8 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>

              </svg>
        <span class="block text-sm font-bold mx-2 ">Add food</span>
        </button>
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label for="brandName" class="block text-sm font-bold mb-2">Brand Name:</label>
          <select v-model="filters.brandName" id="brandName" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
          </select>
        </div>
        <div>
          <label for="foodType" class="block text-sm font-bold mb-2">Food Type:</label>
          <select v-model="filters.foodType" id="foodType" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="type in foodTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <div>
          <label for="animalType" class="block text-sm font-bold mb-2">Animal Type:</label>
          <select v-model="filters.animalType" id="animalType" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="animal in animalTypes" :key="animal" :value="animal">{{ animal }}</option>
          </select>
        </div>
        <div>
          <label for="ageGroup" class="block text-sm font-bold mb-2">Age Group:</label>
          <select v-model="filters.ageGroup" id="ageGroup" class="text-gray-500 w-full py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All</option>
            <option v-for="age in ageGroups" :key="age" :value="age">{{ age }}</option>
          </select>
        </div>
      </div>
      <div class="overflow-x-auto shadow-2lx sm:rounded-lg">
        <table class="min-w-full leading-normal ">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Brand Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Name</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Food Type</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Animal Type</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Age Group</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Weight</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Expiration Date</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Quantity</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider">Notes</th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
              <th class="px-5 py-3 border-b-2 border-customBlack text-left text-sm font-bold text-white uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" class="border-b border-customBlack cursor-pointer" >
              <td class="px-5 py-5 text-sm font-bold text-left"@click="navigateToDetails(item.id)">{{ item.brandName }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left"@click="navigateToDetails(item.id)">{{ item.name }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left"@click="navigateToDetails(item.id)">{{ item.foodType }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left" @click="navigateToDetails(item.id)">{{ item.animalType }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left"@click="navigateToDetails(item.id)">{{ item.ageGroup }} years</td>
              <td class="px-5 py-5 text-sm font-bold text-left"@click="navigateToDetails(item.id)">{{ item.weight }}{{ item.measurementWeight }}</td>
             
              <td class="px-5 py-5 text-sm font-bold text-left"@click="navigateToDetails(item.id)">{{ formatDate(item.exporationDate) }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left"@click="navigateToDetails(item.id)">{{ item.quantity }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left"@click="navigateToDetails(item.id)">{{ item.notes }}</td>
              <td class="px-5 py-5 text-sm font-bold text-left">
               
                <button  @click="increment(item.id)"  type="button" class="mb-4  text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-3 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
               <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
              </svg>
              <span class="block text-sm font-bold mx-2 ">Add</span>
              </button>
              </td>
              <td class="px-5 py-5 text-sm font-bold text-left">
              
                <button @click="decrement(item.id)" type="button" class="mb-4  text-white bg-red-400 hover:bg-red-500 focus:ring-3 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  <svg class="w-5 h-5 fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"></path>
                  </svg>
              <span class="block text-sm font-bold mx-2 ">Remove</span>
              </button>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>





  
   <!-- Main modal -->
<div  v-if="add" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Add Food
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
                  <div class="col-span-2 sm:col-span-1">
                        <label for="brandName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand Name</label>
                        <input type="text" name="brandName" id="brandName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Cuwex" v-model="brandNameAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bone123" v-model="nameAdd" required="">
                    </div>
                  
              
                    <div class="col-span-2 sm:col-span-1">
                        <label for="foodType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Food Type</label>
                        <input type="text" name="foodType" id="foodType" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bone" v-model="foodTypeAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="animalType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Animal Type</label>
                        <input type="text" name="animalType" id="animalType" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Dog" v-model="animalTypeAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                        <label for="ageGroup" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age Group</label>
                        <input type="text" name="ageGroup" id="ageGroup" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2-5"v-model="ageGroupAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                        <label for="expirationDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiration Date</label>
                        <input type="date" name="expirationDate" id="expirationDate" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2-5"v-model="exporationDateAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="weith" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weith</label>
                        <input type="number" name="weith" id="weith" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="5"v-model="weightAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="mesurmentUnits" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mesurment Units</label>
                        <input type="text" name="mesurmentUnits" id="mesurmentUnits" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="kg" v-model="measurementWeightAdd" required="">
                    </div>

                    <div class="col-span-2 sm:col-span-1">
                        <label for="weithPerServing" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight Per Serving</label>
                        <input type="number" name="intweithPerServingake" id="weithPerServing" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="5" v-model="weightPerServingAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="mesurmentUnits" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mesurment Units</label>
                        <input type="text" name="mesurmentUnits" id="mesurmentUnits" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="g" v-model="measurementPerServingAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="caloriesPerServingAdd" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calories Per Serving</label>
                        <input type="number" name="caloriesPerServingAdd" id="caloriesPerServingAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2.5"v-model="caloriesPerServingAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="fiberContent" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fiber Content</label>
                        <input type="number" name="fiberContent" id="fiberContent" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2.5" v-model="fiberContentAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="fatContent" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fat Content</label>
                        <input type="number" name="fatContent" id="fatContent" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2.5" v-model="fatContentAdd" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                        <input type="number"  name="quantity" id="quantity" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2" v-model="quantityAdd" required="">
                    </div>
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                        <textarea id="description" rows="2" class="block p-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Write description here" v-model="notesAdd"></textarea>                    
                    </div>
                </div>
                
              
                <button @click="handleSubmit" class="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add 
                </button>
              
            </form>
        </div>
    </div>
</div> 
</template>

    
  
<script>
import Swal from 'sweetalert2'
import WorkerNavigation from './WorkerNavigation.vue';
import instance from '@/axiosBase';
import Loading from '../Loading.vue';

export default {
  components: {
    WorkerNavigation,
    Loading,
  },
  data() {
    return {
      add: false,
      items: [],
      brands: [],
      foodTypes: [],
      animalTypes: [],
      ageGroups: [],
      //brandName, name, foodType, animalType, ageGroup, weight, caloriesPerServing, weightPerServing, measurementPerServing, fatContent, fiberContent, exporationDate, quantity, notes, measurementWeight
      brandNameAdd: '',
      nameAdd: '',
      foodTypeAdd: '',
      animalTypeAdd: '',
      ageGroupAdd: '',
      weightAdd: '',
      caloriesPerServingAdd: '',
      weightPerServingAdd: '',
      measurementPerServingAdd: '',
      fatContentAdd: '',
      fiberContentAdd: '',
      exporationDateAdd: '',
      quantityAdd: '',
      notesAdd: '',
      measurementWeightAdd: '',
      quantityAdd: '',
      


      filters: {
        brandName: '',
        foodType: '',
        animalType: '',
        ageGroup: '',
      },
      isLoading: true, // Početno stanje učitavanja
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return (!this.filters.brandName || item.brandName === this.filters.brandName) &&
               (!this.filters.foodType || item.foodType === this.filters.foodType) &&
               (!this.filters.animalType || item.animalType === this.filters.animalType) &&
               (!this.filters.ageGroup || item.ageGroup === this.filters.ageGroup);
      });
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async increment(id){

      try {
        const response = await instance.put("animal/updateFoodDomainIncrement",{id:id});
    
        console.log(this.items);
        window.location.reload();
      } catch (error) {
        console.error('There was an error!', error);
      }
    },
     async decrement(id){
      try {
        if(this.items.find(item => item.id === id).quantity <= 0){
          Swal.fire({
            title: "Ooops!",
            text: "You can't take more items, there are none left!",
            icon: "warning"
          });
                    return;
        }else{
        const response = await instance.put("animal/updateFoodDomainDecrement",{id:id});
   
        console.log(this.items);
        window.location.reload();}
      } catch (error) {
        console.error('There was an error!', error);
      }


     },
     
    async handleSubmit(){


 //tu egdj egreška u formatiranju
 /**    "name": "Foodx",
    "ageGroup": "2-5",
    "animalType": "Something",
    "brandName": "Something",
    "caloriesPerServing": 0.2,
    "exporationDate": "2026-05-20T00:00:00",
    "fatContent": 1.2,
    "fiberContent": 2.1,
    "foodType": "Something",
    "measurementPerServing": "g",
    "measurementWeight": "kg",
    "notes": "zg",
    "quantity": 2,
    "weight": 3,
    "weightPerServing": 2 */
    try{
      const response = await instance.post('animal/addFood',{

                            Name: this.nameAdd,
                            AgeGroup: this.ageGroupAdd,
                            AnimalType: this.animalTypeAdd,
                            BrandName:  this.brandNameAdd,
                            CaloriesPerServing: this.caloriesPerServingAdd,
                            ExporationDate:`${this.exporationDateAdd}T00:00:00.00`,
                            FatContent:this.fatContentAdd,
                            FiberContent:this.fiberContentAdd,
                            FoodType: this.foodTypeAdd,//prolem
                            MeasurementPerServing: this.measurementPerServingAdd,
                            MeasurementWeight: this.measurementWeightAdd,
                            Notes: this.notesAdd,
                            Quantity: 2,
                            Weight:  3,
                            WeightPerServing: 2

      },
      {
          headers: {
            Authorization: `Bearer ${this.token}`,  // Authorization header
    
          },
        }
    
    );
    Swal.fire({
            title: "Item added!",
            draggable: true,
            icon: "success"
          });
    window.location.reload();
  }
    catch(error){
      console.log('Name:', this.nameAdd);
                console.log('Food Type:', this.foodTypeAdd);
                console.log('Animal Type:', this.animalTypeAdd);
                console.log('Age Group:', this.ageGroupAdd);
                console.log('Weight:', this.weightAdd);
                console.log('Calories Per Serving:', this.caloriesPerServingAdd);
                console.log('Weight Per Serving:', this.weightPerServingAdd);
                console.log('Measurement Per Serving:', this.measurementPerServingAdd);
                console.log('Fat Content:', this.fatContentAdd);
                console.log('Fiber Content:', this.fiberContentAdd);
                console.log('Expiration Date:', `${this.exporationDateAdd}T00:00:00.00`);
                console.log('Quantity:', this.quantityAdd);
                console.log('Notes:', this.notesAdd);
                console.log('Measurement Weight:', this.measurementWeightAdd);
      console.error('There was an error!', error);
      Swal.fire({
            title: "Ooops!",
            text: "There was an error!",
            draggable: true,
            icon: "error"
          });

    }
    
    },
   async fetchData() {

      try {
        const response = await instance.get('animal/food_db');
        this.items = response.data;
        console.log(this.items);
        this.populateFilters();
        this.isLoading = false;
      } catch (error) {
        console.error('There was an error!', error);
        this.isLoading = false;
      }
    },
    populateFilters() {
      this.brands = [...new Set(this.items.map(item => item.brandName))];
      this.foodTypes = [...new Set(this.items.map(item => item.foodType))];
      this.animalTypes = [...new Set(this.items.map(item => item.animalType))];
      this.ageGroups = [...new Set(this.items.map(item => item.ageGroup))];
    },
    navigateToDetails(id) {
      this.$router.push(`/singleFood/${id}`);
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
  watch: {
    filters: {
      handler() {
        this.filteredItems = this.items.filter(item => {
          return (
            (!this.filters.brandName || item.BrandName === this.filters.brandName) &&
            (!this.filters.foodType || item.FoodType === this.filters.foodType) &&
            (!this.filters.animalType || item.AnimalType === this.filters.animalType) &&
            (!this.filters.ageGroup || item.AgeGroup === this.filters.ageGroup)
          );
        });
      },
      deep: true,
    },
  },
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
  