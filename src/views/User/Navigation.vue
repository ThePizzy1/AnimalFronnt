<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';
import instance from '@/axiosBase';

const token = ref(localStorage.getItem('token'));
const userId = ref(localStorage.getItem('userId'));
const userName = ref(localStorage.getItem('userName'));

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  window.location.href = '/';  
  window.location.reload();    
};

onMounted(async () => {
  if (!token.value) {
    router.push({ path: '/' }); 
  }
});

const navigation = [
  { name: 'Home',  to: '/home', current: true },
  { name: 'Animals', to: '/animals', current: false },
  { name: 'Contact', to: '/contact', current: false },
  { name: 'Donation', to: '/donation', current: false },
];

</script>

<template>
  <Disclosure as="nav" class="bg-black" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-7 lg:px-8">
      <div class="relative flex h-17 py-1 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-16 w-auto" src="/luna1.png" alt="Your Company" />
            <div class="w-full lg:w-8/12 ">
              <h1 class="text-base lg:text-base text-customGreen">LUNA</h1>
              <h2 class="text-base lg:text-base text-customGreen">Animal Rescue</h2>
            </div>
          </div>
        </div>
        <div class="flex flex-shrink-0 items-center">
          <div class="hidden sm:ml-6 sm:flex sm:space-x-4">
            <RouterLink v-for="item in navigation" :key="item.name" :to="item.to" :class="[item.current ? 'bg-neutral-500 text-white' : 'text-customGreen hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</RouterLink>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton class="flex rounded-full bg-stone-800 text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-800">
                <span class="sr-only">Open user menu</span>
                <Bars3Icon class="h-6 w-6 text-customGreen hover:text-white" aria-hidden="true" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <router-link to="/profile" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-base text-gray-700']" >Your profile</router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <router-link to="/" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-base text-gray-700']" @click="logout">Sign out</router-link>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-green-900 text-white' : 'text-green-400 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
