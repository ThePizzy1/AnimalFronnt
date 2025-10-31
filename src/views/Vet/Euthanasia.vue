<template>
  <div class="flex min-h-screen text-stone-200 ">
    <!-- Sidebar -->
    <aside class="w-1/6 shadow-lg p-4">
      <WorkerNavigation />
    </aside>

    <!-- Main content -->
    <main class="w-5/6 mt-5 p-6 rounded-lg mr-8 bg-[#0e0e0e] shadow-lg border border-white/10 space-y-6">
      <!-- Header -->
      <header class="flex justify-between items-center border-b border-gray-800 pb-4">
        <h1 class="text-2xl font-bold text-emerald-400">Euthanasia</h1>

        <button
          @click="add = true"
          :disabled="userRole !== 'HeadVet'"
          type="button"
          class="flex items-center bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-full shadow-md transition"
        >
          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
            />
          </svg>
          Add Euthanasia
        </button>
      </header>

      <!-- Search -->
      <div class="relative mt-4">
        <input
          v-model="generalSearchQuery"
          type="text"
          placeholder="Search..."
          class="w-full px-5 py-2 pr-12 text-gray-200 placeholder-gray-400 bg-black border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
        <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>

      <!-- Table -->
      <section class="bg-[#121212] p-6 rounded-xl border border-gray-800 shadow-lg overflow-x-auto">
        <table class="min-w-full text-left border-collapse">
          <thead>
            <tr class="text-emerald-400 border-b border-gray-700">
              <th class="py-3 px-4 font-semibold"></th>
              <th class="py-3 px-4 font-semibold">Animal Code</th>
              <th class="py-3 px-4 font-semibold">Name Of Disease</th>
              <th class="py-3 px-4 font-semibold">Date</th>
              <th class="py-3 px-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in paginatedItems"
              :key="item.id"
              :class="[
                'border-b border-gray-800 hover:bg-[#1a1a1a] transition',
                item.complited ? 'text-gray-500' : 'text-gray-200'
              ]"
            >
              <td class="px-4 py-3">
                <svg
                  @click="openSinglModal(item)"
                  class="w-6 h-6 cursor-pointer text-emerald-400 hover:text-emerald-300 transition"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </td>

              <td class="px-4 py-3 font-semibold">{{ item.animalId }}</td>
              <td class="px-4 py-3">{{ item.nameOfDesissse }}</td>
              <td class="px-4 py-3">{{ formatDate(item.date) }}</td>

              <td class="px-4 py-3 flex gap-3 justify-center">
                <!-- Update -->
                <button
                  @click="openUpdateModal(item)"
                  class="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-3 py-1 rounded-full shadow transition"
                >
                  <svg
                    class="w-4 h-4 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536M9 11l3 3L20.485 5.515a2.121 2.121 0 0 0-3-3L9 11z"
                    />
                  </svg>
                  Update
                </button>

                <!-- Done -->
                <button
                  @click="openRemoveModal(item)"
                  :disabled="userRole !== 'HeadVet'"
                  class="flex items-center bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-3 py-1 rounded-full shadow transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg
                    class="w-4 h-4 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Done
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-3 mt-6">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Prev
          </button>

          <div class="flex gap-2">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-3 py-1 rounded-md text-sm font-medium transition',
                page === currentPage
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  </div>

  
  <!-- Add Euthanasia Modal -->
<div
  v-if="add"
  class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-6"
>
  <div
    class="relative bg-[#0f0f0f] border border-gray-800 rounded-xl shadow-lg w-full max-w-lg animate-fade-in"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between px-6 py-3 border-b border-gray-800"
    >
      <h3 class="text-lg font-semibold text-emerald-400">
        Add Animal for Euthanasia
      </h3>
      <button
        @click="add = false"
        class="text-gray-400 hover:text-white transition"
      >
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>













      <!-- Body -->
      <form
        @submit.prevent="handleSubmit"
        class="p-6 grid grid-cols-2 gap-5 text-gray-200"
      >
        <!-- Animal Code -->
        <div class="col-span-2 sm:col-span-1">
          <label class="block mb-2 text-sm font-semibold text-gray-300"
            >Animal Code</label
          >
          <div class="flex items-center">
            <input
              type="text"
              v-model="code"
              id="code"
              class="flex-1 bg-black border border-emerald-600 text-gray-100 rounded-md p-2.5 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
            <div class="ml-2">
              <!-- ✅ Exists -->
              <svg
                v-if="animalExists && animalExists != null && code"
                class="w-5 h-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
              <!-- ❌ Not Exists -->
              <svg
                v-if="!animalExists && animalExists != null && code"
                class="w-5 h-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Check -->
        <div class="col-span-2 sm:col-span-1 flex items-end">
          <div>
            <label class="block mb-2 text-sm font-semibold text-gray-300"
              >Check</label
            >
            <svg
              @click="checkAnimal(code)"
              class="w-8 h-8 cursor-pointer text-emerald-500 hover:text-emerald-300 transition"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-width="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>

        <!-- Disease Name -->
        <div class="col-span-2 sm:col-span-1">
          <label class="block mb-2 text-sm font-semibold text-gray-300"
            >Name of Disease</label
          >
          <input
            type="text"
            v-model="nameOfDesissseAdd"
            id="nameOfDesissseAdd"
            class="w-full bg-black border border-emerald-600 text-gray-100 rounded-md p-2.5 focus:ring-emerald-500 focus:border-emerald-500 transition"
            required
          />
        </div>

        <!-- Date -->
        <div class="col-span-2 sm:col-span-1">
          <label class="block mb-2 text-sm font-semibold text-gray-300"
            >Date</label
          >
          <input
            type="date"
            v-model="dateAdd"
            id="dateAdd"
            class="w-full bg-black border border-emerald-600 text-gray-100 rounded-md p-2.5 focus:ring-emerald-500 focus:border-emerald-500 transition"
            required
          />
        </div>

        <!-- Submit -->
        <div class="col-span-2 mt-3">
          <button
            type="submit"
            class="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md px-4 py-2.5 transition focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Add Euthanasia
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- INFO MODAL -->
  <div
    v-if="single"
    class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-6"
  >
    <div
      class="relative bg-[#0f0f0f] border border-gray-800 rounded-xl shadow-lg w-full max-w-md animate-fade-in"
    >
      <div
        class="flex items-center justify-between px-6 py-3 border-b border-gray-800"
      >
        <h3 class="text-lg font-semibold text-emerald-400">Animal Details</h3>
        <button
          @click="single = false"
          class="text-gray-400 hover:text-white transition"
        >
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="p-6 grid grid-cols-2 gap-4 text-gray-200">
        <div>
          <label class="block mb-2 text-sm font-semibold text-gray-300"
            >Animal Code</label
          >
          <span
            class="block bg-black border border-emerald-600 rounded-md p-2.5"
            >{{ singleCode }}</span
          >
        </div>
        <div>
          <label class="block mb-2 text-sm font-semibold text-gray-300"
            >Animal Name</label
          >
          <span
            class="block bg-black border border-emerald-600 rounded-md p-2.5"
            >{{ singleAnimalName }}</span
          >
        </div>
        <div class="col-span-2">
          <label class="block mb-2 text-sm font-semibold text-gray-300"
            >Name Of Disease</label
          >
          <span
            class="block bg-black border border-emerald-600 rounded-md p-2.5"
            >{{ singleName }}</span
          >
        </div>
        <div class="col-span-2">
          <label class="block mb-2 text-sm font-semibold text-gray-300"
            >Date</label
          >
          <span
            class="block bg-black border border-emerald-600 rounded-md p-2.5"
            >{{ singleDate }}</span
          >
        </div>
      </div>
    </div>
  </div>

  <!-- UPDATE MODAL -->
  <div
    v-if="update"
    class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-6"
  >
    <div
      class="relative bg-[#0f0f0f] border border-gray-800 rounded-xl shadow-lg w-full max-w-md animate-fade-in"
    >
      <div
        class="flex items-center justify-between px-6 py-3 border-b border-gray-800"
      >
        <h3 class="text-lg font-semibold text-emerald-400">
          Update Euthanasia Record
        </h3>
        <button
          @click="update = false"
          class="text-gray-400 hover:text-white transition"
        >
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleUpdate" class="p-6 space-y-5 text-gray-200">
        <div>
          <label class="block mb-2 text-sm font-semibold text-gray-300"
            >Euthanasia Date</label
          >
          <input
            type="date"
            v-model="date"
            required
            class="w-full bg-black border border-emerald-600 text-gray-100 rounded-md p-2.5 focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>

        <button
          type="submit"
          class="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md px-4 py-2.5 transition focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          Update Record
        </button>
      </form>
    </div>
  </div>

  <!-- REMOVE MODAL -->
  <div
    v-if="showRemuve"
    class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-6"
  >
    <div
      class="relative bg-[#0f0f0f] border border-gray-800 rounded-xl shadow-lg w-full max-w-md text-center p-8 animate-fade-in"
    >
      <h2 class="text-2xl font-bold text-emerald-400 mb-6">Euthanasia</h2>
      <p class="text-gray-300 mb-6">Confirm animal euthanasia?</p>

      <div class="flex justify-center gap-4">
        <button
          @click="approveEuthanasia(remuveitem)"
          class="px-6 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
        >
          Confirm
        </button>
        <button
          @click="showRemuve = false"
          class="px-6 py-2.5 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

  
  <script>
  //nema dobar alert i napravi da je info širi
  //napravi ako nešto ne može se učitat da je push to home nakon npr 5000
  import WorkerNavigation from '../Vet/VetNavigation.vue';
  import instance from '@/axiosBase';
  import Loading from '../Loading.vue';
  import Swal from 'sweetalert2'
  export default {
    components: {
      WorkerNavigation,
      Loading,

    },
    data() {
      return {
           // PAGINACIJA
      currentPage: 1,
      itemsPerPage: 15,
         userRole: localStorage.getItem('userRole'),  
         generalSearchQuery: '',
        remuveitem: null,
        showRemuve: false,
        loadingError:false,
        add:false,
        single: false,
        update: false,
        singleCode: '',
        singleDate: '',
        singleName: '',
        singleAnimalName: '',
        code: '',
        animalExists: null,
        dateAdd: '',
       nameOfDesissseAdd: '',
       complitedAdd:false,
          update: false,
          idUpdate: null,
          date: '',
          complited: '',
        items: [],
        filters: {
          date: '',
          name: '',
        },
      };
    },
    computed: {
           totalPages() {
  return Math.max(1, Math.ceil(this.filteredItems.length / this.itemsPerPage));
},
paginatedItems() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.filteredItems.slice(start, start + this.itemsPerPage);
},
     filteredItems() {
    const query = this.generalSearchQuery?.toLowerCase().trim() || '';

    return this.items.filter(item => {
      const animalIdMatch = item.animalId?.toString().toLowerCase().includes(query);
      const diseaseMatch = item.nameOfDesissse?.toLowerCase().includes(query);
      const dateMatch = this.formatDate(item.date)?.toLowerCase().includes(query);

      return animalIdMatch || diseaseMatch || dateMatch;
    });
  }
    },
    mounted() {
      this.fetchData();
    },
    methods: {
          nextPage() {
  if (this.currentPage < this.totalPages) this.currentPage++;
},
prevPage() {
  if (this.currentPage > 1) this.currentPage--;
},
       openRemoveModal(item) {
    this.remuveitem = item;
    console.log("Remove item:", this.remuveitem);
    this.showRemuve = true;
  },
      async approveEuthanasia(animalR) {
  try {
    console.log("Euthanasia id:"+animalR.id);
    
    const response = await instance.put(`animal/updateAnimalRecord/`, {
      animalId: parseInt(animalR.animalId),
      recordId: 8, // eutanazija
    }, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    console.log("Response from updateAnimalRecord:", response.data);
  await instance.put("animal/updateEuthanasiaDomainDone", {
          id: parseInt(animalR.id),
          complited: true
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
    if (response.status === 200) {
      await Swal.fire({
        title: "Animal euthanized!",
        icon: "success",
        draggable: true
      });
      window.location.reload();
    } else {
      await Swal.fire({
        title: "Oops!",
        icon: "error",
        draggable: true
      });
    }
  } catch (error) {
    console.error(error);
    await Swal.fire({
      title: "Error occurred!",
      icon: "error"
    });
  }
},
   openUpdateModal(item) {
      this.update = true;
      this.idUpdate = item.id;
      this.date = item.date; // Format za <input type="date">
      this.complited = item.complited;
    },
    async handleUpdate() {
      try {
        console.log("Update id:"+this.idUpdate);
        console.log("Update date:"+this.date);
        console.log("Update complited:"+this.complited);
        await instance.put("animal/updateEuthanasiaDomain", {
          id: this.idUpdate,
          date:`${this.date}T00:00:00.00`,
         
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });

        await Swal.fire({
          title: "Euthanasia updated",
          icon: "success"
        });

        this.update = false;
        window.location.reload();

      } catch (error) {
        await Swal.fire({
          title: "Update failed",
          text: "There was a problem while updating euthanasia record.",
          icon: "error"
        });
      }
    },

  
      async openSinglModal(item) {
          this.single = true;
          this.singleCode = item.animalId;
          this.singleName = item.nameOfDesissse;
          this.singleDate = item.date.split('T')[0]; // Extract date part
          this.loadingError=true;
          const animalResponse = await instance.get(`animal/allanimal/${this.singleCode}`);
              const animalData = animalResponse.data;
               this.singleAnimalName=animalData.name;
             if(this.singleAnimalName!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                }
                else{
                  setTimeout(() => {
                this.loadingError = true; 
                }, 5000)
                this.$router.push(`/vetHome`);
                }
           
            console.log("Id animal:"+this.singleAnimalName); 
        },
      async handleSubmit(){
        try{
          console.log("Register id:"+this.registerId);
          const response = await instance.post('animal/addEuthanasia',{
            animalId:this.registerId,
            date: `${this.dateAdd}T00:00:00.00` ,
            nameOfDesissse: this.nameOfDesissseAdd,
            complited: this.complitedAdd
          },
            {
              headers: {Authorization: `Bearer ${this.token}`,   },
            } );
            await  Swal.fire({
                    title: "Item added!",
                    draggable: true,
                    icon: "success"
                  });
                  if(response.status==200){
                    window.location.reload();
                  }
               
        }
        catch(error){
          console.log('There was an error!', error);
          await  Swal.fire({
                title: "Ooops!",
                text: "There was an error!",
                draggable: true,
                icon: "error"
              });
        }},

      async checkAnimal(id) {
        try{
              const animalResponse = await instance.get(`animal/allanimal/${id}`);
              const animalData = animalResponse.data;       
              this.registerId=animalData.idAnimal;
              this.singleAnimalName=animalData.name;
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
      async fetchData() {
            try {
              this.loadingError = true;
              const response = await instance.get('animal/euthanasia_db');
              console.log("Euthanasia data:", response.data);
              this.items = response.data;
              if(this.items!=null) {
                setTimeout(() => {
                this.loadingError = false; 
                }, 1000)
                } 
              console.log(this.items);
            } catch (error) {
              setTimeout(() => {
                this.loadingError = true; 
                }, 5000)
                this.$router.push(`/vetHome`);

              console.error('There was an error!', error);
            }
          },
        getTodayDate(endD) {
            const today = new Date();
            const endDate = new Date(endD);
         
       
          },
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
          }
        },
    watch: {
      filters: {
        handler() {
          this.filteredItems = this.items.filter(item => {
            return (
              (!this.filters.date || item.date.includes(this.filters.date)) &&
              (!this.filters.nameOfDesissse || item.nameOfDesissse=== this.filters.nameOfDesissse) &&
              (!this.filters.animalId || item.animalId === this.filters.animalId)
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
    