import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/navigation',
      name: 'Navigation',
      component: () => import('../views/Navigation.vue')
    },
    {
      path: '/workerNavigation',
      name: 'WorkerNavigation',
      component: () => import('../views/WorkerNavigation.vue')
    },
    {
      path: '/workerHome',
      name: 'WorkerHome',
      component: () => import('../views/WorkerHome.vue')
    },
    {
      path: '/surenderersHome',
      name: 'SurenderersHome',
      component: () => import('../views/SurenderersHome.vue')
    },
    {
      path: '/vetNavigation',
      name: 'VetNavigation',
      component: () => import('../views/VetNavigation.vue')
    },
    {
      path: '/vetHome',
      name: 'VetHome',
      component: () => import('../views/VetHme.vue')
    },
    {
      path: '/vetAllAnimals',
      name: 'VetAllAnimals',
      component: () => import('../views/VetAllAnimals.vue')
    },
    {
      path: '/vetSingleAnimal/:id',
      name: 'VetSingleAnimal',
      component: () => import('../views/VetSingleAnimal.vue')
    },//C:\Users\ivozab\Documents\AnimalRescue\src\views\VetSingleAnimal.vue
    {
      path: '/footer',
      name: 'Footer',
      component: () => import('../views/Footer.vue')
    },
    {
      path: '/adminNavigation',
      name: 'Adminnavigation',
      component: () => import('../views/AdminNavigation.vue')
    },
    {
      path: '/search',
      name: 'AdminSearch',
      component: () => import('../views/AdminSearch.vue')
    }, {
      path: '/adminHome',
      name: 'AdminHome',
      component: () => import('../views/AdminHome.vue')
    },
    {
      path: '/adminUsers',
      name: 'AdminUsers',
      component: () => import('../views/AdminUsers.vue')
    },    
    {
      path: '/addUsers',
      name: 'AddUsers',
      component: () => import('../views/AddUser.vue')
    },
    {
      path: '/adminAdopted',
      name: 'AdminAdopted',
      component: () => import('../views/AdminAdopted.vue')
    },
    {
      path: '/adminRaturnd',
      name: 'AdminRaturnd',
      component: () => import('../views/AdminRaturnd.vue')
    }, {
      path: '/adminAdd',
      name: 'AdminAdd',
      component: () => import('../views/AdminAdd.vue')
    },
    {
      path: '/statistic',
      name: 'Stanistic',
      component: () => import('../views/Statistic.vue')
    },
   
    {
      path: '/animals',
      name: 'Animals',
      component: () => import('../views/Animals.vue')
    },
    {
      path: '/animal/:id',
      name: 'Animal',
      props: true,
      component: () => import('../views/Animal.vue')
    },
    {
      path: '/user/:id',
      name: 'User',
      props: true,
      component: () => import('../views/AdminUser.vue')
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/register/:username',
      name: 'Register',
      component: () => import('../views/RegistrationUser.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/',
      name: 'LogIn',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/loading',
      name: 'Loading',
      props: true,
      component: () => import('../views/Loading.vue')
    },
    {
      path: '/adminAnimals/:id',
      name: 'AdminAnimals',
      props: true,
      component: () => import('../views/AdminAnimals.vue')
    },
    {
      path: '/ivavozab',
      name: 'IvaVozab',
      props: true,
      component: () => import('../views/IvaVozab.vue')
    },
    {
      path: '/donation',
      name: 'Donation',
      component: () => import('../views/Donation.vue')
    }
  ]
})

export default router
