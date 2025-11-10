<template>
  <Navigation />

  <div class="rounded-lg pt-1 2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
    <!-- 🔹 ABOUT US -->
    <div class="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div class="flex flex-col lg:flex-row justify-between gap-8">
        <div
          class="hover:scale-110 px-5 rounded-lg shadow-lg w-full lg:w-5/12 flex flex-col justify-center bg-stone-800/60 backdrop-blur-sm border border-stone-600"
        >
          <h1 class="text-3xl lg:text-4xl font-bold leading-9 text-customGreen pb-4">About Us</h1>
          <p class="font-normal text-base leading-6 text-customGreen pb-4">
            Luna Animal Rescue was founded with the aim of rescuing and rehoming abandoned animals.
            Since its establishment in 2020, we have been dedicated to providing a safe and caring environment
            for all the animals that come into our shelter.
          </p>
        </div>
        <div class="w-full lg:w-8/12">
          <img
            class="hover:scale-110 rounded-lg w-full h-full"
            src="https://firebasestorage.googleapis.com/v0/b/animalrescue-fa5f9.appspot.com/o/s7.jpg?alt=media&token=58da4b98-415f-421c-8d79-1e1e0d315d52"
            alt="Group of People"
          />
        </div>
      </div>

      <!-- 🔹 OUR STORY + EMPLOYEES -->
      <div class="flex lg:flex-row flex-col justify-between gap-8 pt-12">
        <div
          class="hover:scale-110 px-5 rounded-lg shadow-lg w-full lg:w-5/12 flex flex-col justify-center bg-stone-800/60 backdrop-blur-sm border border-stone-600"
        >
          <h1 class="text-3xl lg:text-4xl font-bold leading-9 text-customGreen pb-4">Our Story</h1>
          <p class="font-normal text-base leading-6 text-customGreen pb-4">
            Since its inception, Luna Animal Rescue's story has been one of love for animals and a determination to
            give them a second chance. Every animal that passes through our shelter receives special attention and care,
            and we take pride in every successful adoption process we've facilitated.
          </p>
        </div>

        <div
          class="w-full lg:w-8/12 lg:pt-8 bg-stone-800/60 backdrop-blur-sm border border-stone-600 rounded-lg shadow-lg p-4"
        >
          <h1 class="text-3xl lg:text-4xl font-bold leading-9 text-customGreen pb-4">Our Employees</h1>
          <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
            <div class="hover:scale-110 p-4 pb-6 flex justify-center flex-col items-center rounded-lg shadow-lg">
              <img class="md:block hidden" src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png" alt="Alexa" />
              <img class="md:hidden block" src="https://i.ibb.co/zHjXqg4/Rectangle-118.png" alt="Alexa" />
              <p class="font-medium text-xl leading-5 text-customGreen mt-4">Alexa</p>
            </div>
            <div class="hover:scale-110 p-4 pb-6 flex justify-center flex-col items-center rounded-lg shadow-lg">
              <img class="md:block hidden" src="https://i.ibb.co/fGmxhVy/Rectangle-119.png" alt="Olivia" />
              <img class="md:hidden block" src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png" alt="Olivia" />
              <p class="font-medium text-xl leading-5 text-customGreen mt-4">Olivia</p>
            </div>
            <div class="hover:scale-110 p-4 pb-6 flex justify-center flex-col items-center rounded-lg shadow-lg">
              <img class="md:block hidden" src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png" alt="Liam" />
              <img class="md:hidden block" src="https://i.ibb.co/C5MMBcs/Rectangle-120.png" alt="Liam" />
              <p class="font-medium text-xl leading-5 text-customGreen mt-4">Liam</p>
            </div>
            <div class="hover:scale-110 p-4 pb-6 flex justify-center flex-col items-center rounded-lg shadow-lg">
              <img class="md:block hidden" src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png" alt="Elijah" />
              <img class="md:hidden block" src="https://i.ibb.co/ThZBWxH/Rectangle-121.png" alt="Elijah" />
              <p class="font-medium text-xl leading-5 text-customGreen mt-4">Elijah</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔹 NEWS SECTION -->
    <div
      class="w-full lg:w-auto lg:pt-8 min-h-80 shadow-lg bg-stone-800/60 backdrop-blur-sm border border-stone-600 rounded-lg px-4 py-6"
    >
      <h1 class="ml-5 text-3xl lg:text-4xl font-bold leading-9 text-customGreen pb-4">News</h1>

      <!-- ako postoje vijesti -->
      <div
        v-if="paginatedNews.length > 0"
        class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 rounded-md"
      >
        <div
          v-for="(item, index) in paginatedNews"
          :key="index"
          class="p-4 pb-6 flex justify-center flex-col items-center rounded-lg text-center"
        >
          <img
            v-if="item.pictureUrl"
            :src="item.pictureUrl"
            alt="news"
            class="hover:scale-110 md:block hidden w-90 h-100 rounded-md object-cover"
          />
          <img
            v-if="item.pictureUrl"
            :src="item.pictureUrl"
            alt="news"
            class="hover:scale-110 md:hidden block rounded-md object-cover"
          />

          <p class="text-stone-500 text-xs mt-1">{{ formatDate(item.dateTime) }}</p>
        </div>
      </div>

      <!-- ako nema vijesti -->
      <div v-else class="text-center text-stone-300 py-8 text-lg">
        No news available at the moment.
      </div>

      <!-- 🔹 PAGINATION -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8 gap-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-lg border border-stone-600 text-stone-300 hover:bg-stone-700 disabled:opacity-50"
        >
          ‹ Previous
        </button>
        <span class="text-stone-400 text-sm mt-2">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-lg border border-stone-600 text-stone-300 hover:bg-stone-700 disabled:opacity-50"
        >
          Next ›
        </button>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script>
import Navigation from '../User/Navigation.vue';
import Footer from '../User/Footer.vue';
import instance from '@/axiosBase';

export default {
  components: { Navigation, Footer },
  data() {
    return {
      news: [],
      currentPage: 1,
      pageSize: 6, // prikazuje 6 vijesti po stranici
    };
  },
  mounted() {
    this.fetchNews();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.news.length / this.pageSize);
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.news.slice(start, end);
    },
  },
  methods: {
    async fetchNews() {
      try {
        const response = await instance.get('animal/news_db');
        console.log('📰 News data:', response.data);

        this.news = response.data.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          dateTime: item.dateTime,
          pictureUrl: item.picture ? `data:image/jpeg;base64,${item.picture}` : null,
        }));
      } catch (error) {
        console.error('❌ Error fetching news:', error.response?.data || error.message);
      }
    },
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
  },
};
</script>

<style>
img:hover {
  transition: transform 0.3s ease-in-out;
}
button:disabled {
  cursor: not-allowed;
}
</style>
