<template>
    <div class="flex">
      <div class="w-1/6 text-stone-200 p-4 rounded-l-lg">
        <WorkerNavigation />
      </div>
      <div class="w-5/6 text-stone-200 p-4 rounded-r-lg mr-8">
        
     
        <div class="fixed inset-0 flex justify-center items-center overflow-x-auto custom-scrollbar">
    <div class="relative mt-10 p-4 w-5xl h-full">
      <!-- Modal content -->
      <div class="relative  rounded-lg shadow-sm dark:bg-gray-700">
        <h1 class="text-xl font-bold mb-4">Add Labs</h1>
        <form v-if(!submit) class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                      <div class="col-span-2 sm:col-span-1">
                                <label for="code" class="block mb-2 text-base font-medium text-stone-200 dark:text-stone-200">Animal code:</label>
                                <div class="flex items-center">
                                <input type="text" v-model="addAnimalId" id="code" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                 <div class="ml-2">
                                <svg v-if="this.animalExists && this.animalExists!=null && this.addAnimalId" class="w-5 h-5 fill-[#FFFD00]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                </svg>
                                <svg v-if="!this.animalExists  && this.animalExists!=null && this.addAnimalId" class="w-5 h-5 fill-[#e00000]" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                </svg>
                                </div>
                                </div>
                                </div>
                                
                                <div class="col-span-2 sm:col-span-1">
                                  <label for="checkAnimal" class="block mb-2 text-base font-medium text-stone-200 dark:text-stone-200">Check</label>      
                                  <svg @click="checkAnimal(this.addAnimalId)" class="w-8 h-8 ml- text-stone-200 dark:text-stone-200 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                                  </svg>
                                </div>
                        <div class="col-span-2 sm:col-span-2">
                            <label for="dateAdd" class="block mb-2 text-base font-medium text-stone-200 dark:text-stone-200">Date</label>
                            <input type="date" v-model="addDate" name="dateAdd" id="dateAdd" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                        </div>
                    </div>
                  
               
                   
                </form>
  
              <!-- Form body -->
                 <form class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                    
                          
                        <div class="col-span-2 sm:col-span-2">
                            <label for="addParametarName" class="block mb-2 text-base font-medium text-stone-200 dark:text-stone-200">Name</label>
                            <input type="text" v-model="addParametarName" name="addParametarName" id="addParametarName" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="addParametarValue" class="block mb-2 text-base font-medium text-stone-200 dark:text-stone-200">Value</label>
                            <input type="text" v-model="addParametarValue" name="addParametarValue" id="addParametarValue" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="addParametarMesurmentUnit" class="block mb-2 text-base font-medium text-stone-200 dark:text-stone-200">Measurement Units</label>
                            <input type="text" v-model="addParametarMesurmentUnit" name="addParametarMesurmentUnit" id="addParametarMesurmentUnit" class="bg-gray-50 border border-emerald-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"  required="">
                        </div>
                  
                    <div class="col-span-2">
                          <label for="description" class="block mb-2 text-base font-medium text-stone-200 dark:text-stone-200">Remarks</label>
                          <textarea id="description" v-model="addRemarks" rows="4" class="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-stone-200 dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Write product description here"></textarea>                    
                      </div>
                      <div class="col-span-1 sm:col-span-1">
                      <button @click="handleSubmit" type="submit" class=" mt-5 text-stone-200 inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    
                        Add 
                     
                    </button>
                      </div>
                      <div class="col-span-1 sm:col-span-1 ml-5">
                    <button @click="isEditing==true" type="submit" class=" mt-5 text-stone-200 inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                      Done 
                      <svg class="ml-2 w-5 h-5 text-stone-200 dark:text-stone-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                    </svg>
                    </button>
                  </div>
                </div>
                </form>
       

              </div>       
            </div>
          </div>
      </div>
    </div>
  
  </template>
  
  <script>
  import WorkerNavigation from '../Vet/VetNavigation.vue';
  import instance from '@/axiosBase';
  import Swal from 'sweetalert2'
  export default {
    components: {
      WorkerNavigation,
    },
    data() {
      return {
        animalExists:null,
        addParametarName:"",
        addParametarValue:"",
        addParametarMesurmentUnit:"",
        addRemarks:"",
        addLabId:"",
        addAnimalId:"",
      submit:false,
      };
    },
//ZAUSTAVI DA SE TO PROKLETO UČITA SVAKI PUT KAD KLIKNEŠ NA BUTTON
    methods: {  

    formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
          },
    async checkAnimal(id) {
            try{
                  const animalResponse = await instance.get(`animal/allanimal/${id}`);
                  const animalData = animalResponse.data;       
                  this.registerId=animalData.idAnimal;          
                  console.log("Id animal:"+this.registerId);  
                  if(this.registerId!=null){
                    this.animalExists=true;     
                  }
                  else{
                    this.animalExists=false;
                  }
            }
            catch (error) {this.animalExists=false} 
      },
  
    async handleSubmit(){   
            try{
              if(this.submit==false){
                const responsel = await instance.post('animal/addLabs',{
                  AnimalId:parseInt(this.registerId),
                  DateTime: `${this.addDate}T00:00:00.00` ,
                },
                  {
                    headers: {Authorization: `Bearer ${this.token}`,   },
                  } );
                  this.addLabId=response.data.id;
                  localStorage.setItem('LabId',response.data.id);  
                  this.submit=true;
                }

                  console.log("Lab id: "+this.addLabId);
                  const response = await instance.post('animal/addParametar',{
                    labId:localStorage.getItem('LabId'),
                    parameterName:this.addParametarName,
                    parameterValue:this.addParametarValue,
                    measurementUnits:this.addParametarMesurmentUnit,
                    remarks:this.addRemarks
                  },
                    {
                      headers: {Authorization: `Bearer ${this.token}`,   },
                    } );
            
                    console.log(response.data);
                    console.log("Lab id: "+this.addLabId);
                    console.log("Parametar id: "+response.data.id);
                    console.log("Parametar name: "+response.data.parameterName);
                    console.log("Parametar value: "+response.data.parameterValue);
                    console.log("Parametar measurement unit: "+response.data.measurementUnits);
                    console.log("Parametar remarks: "+response.data.remarks);
                    

                }
              catch(error){
                console.log('There was an error!', error);              
                  }
        },
      },
      
   
  };
  </script>
  
  
  
  
  
  
  
  
  
  
  