import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/User/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //USER
      path: '/home',
      name: 'Home',
      component: () => import('../views/User/Home.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/User/Contact.vue')
    },
    {
      path: '/navigation',
      name: 'Navigation',
      component: () => import('../views/User/Navigation.vue')
    },
    {
      path: '/footer',
      name: 'Footer',
      component: () => import('../views/User/Footer.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/User/Profile.vue')
    },
    {
      path: '/ivavozab',
      name: 'IvaVozab',
      props: true,
      component: () => import('../views/User/IvaVozab.vue')
    },
    {
      path: '/donation',
      name: 'Donation',
      component: () => import('../views/User/Donation.vue')
    },




    //WORKERS
    {
      path: '/workerNavigation',
      name: 'WorkerNavigation',
      component: () => import('../views/Worker/WorkerNavigation.vue')
    },
    {
      path: '/workerHome',
      name: 'WorkerHome',
      component: () => import('../views/Worker/WorkerHome.vue')
    },
    {
      path: '/foodInventory',
      name: 'FoodInventory',
      component: () => import('../views/Worker/FoodInventory.vue')
    },
    {
      path: '/funds',
      name: 'Funds',
      component: () => import('../views/Worker/Funds.vue')
    },

    {
      path: '/inventory',
      name: 'Inventory',
      component: () => import('../views/Worker/Inventory.vue')
    },

    {
      path: '/news',
      name: 'News',
      component: () => import('../views/Worker/News.vue')
    },
    {
      path: '/toyInventory',
      name: 'ToyInventory',
      component: () => import('../views/Worker/ToyInventory.vue')
    },
    {
      path: '/workerAnimals',
      name: 'WorkerAnimals',
      component: () => import('../views/Worker/WorkerAnimals.vue')
    },
    {
      path: '/workerSingleAnimal/:id',
      name: 'WorkerSingleAnimal',
      component: () => import('../views/Worker/WorkerSingleAnimal.vue')
    },
    {
      path: '/workerStatistics',
      name: 'WorkerStatistics',
      component: () => import('../views/Worker/WorkerStatistics.vue')
    },









    //SURENDERERS
    {
      path: '/surenderersHome',
      name: 'SurenderersHome',
      component: () => import('../views/SurenderersHome.vue')
    },



    //VET
    {
      path: '/vetNavigation',
      name: 'VetNavigation',
      component: () => import('../views/Vet/VetNavigation.vue')
    },
    {
      path: '/vetHome',
      name: 'VetHome',
      component: () => import('../views/Vet/VetHome.vue')
    },
    {
      path: '/vetAllAnimals',
      name: 'VetAllAnimals',
      component: () => import('../views/Vet/VetAllAnimals.vue')
    },
    {
      path: '/vetSingleAnimal/:id',
      name: 'VetSingleAnimal',
      component: () => import('../views/Vet/VetSingleAnimal.vue')
    },
    {
      path: '/approdeAdoption',
      name: 'ApprovdAdoption',
      component: () => import('../views/Vet/ApprovdAdoption.vue')
    },
    {
      path: '/checkups',
      name: 'Checkups',
      component: () => import('../views/Vet/Checkups.vue')
    },
    {
      path: '/contageusAnimals',
      name: 'ContageusAnimals',
      component: () => import('../views/Vet/ContageusAnimals.vue')
    },
   {
      path: '/labs',
      name: 'Labs',
      component: () => import('../views/Vet/Labs.vue')
    },
    {
      path: '/notCurableAnimals',
      name: 'NotCurableAnimals',
      component: () => import('../views/Vet/NotCurableAnimals.vue')
    },
    {
      path: '/operations',
      name: 'Operations',
      component: () => import('../views/Vet/Operations.vue')
    },
    {
      path: '/quarantine',
      name: 'Quarantine',
      component: () => import('../views/Vet/Quarantine.vue')
    },
    {
      path: '/vacination',
      name: 'Vacination',
      component: () => import('../views/Vet/Vaccination.vue')
    },
    {
      path: '/animalsOnMedication',
      name: 'AnimalsOnMedication',
      component: () => import('../views/Vet/AnimalsOnMedication.vue')
    },

 //ADMIN
    {
      path: '/adminNavigation',
      name: 'Adminnavigation',
      component: () => import('../views/Admin/AdminNavigation.vue')
    },
    {
      path: '/search',
      name: 'AdminSearch',
      component: () => import('../views/Admin/AdminSearch.vue')
    }, {
      path: '/adminHome',
      name: 'AdminHome',
      component: () => import('../views/Admin/AdminHome.vue')
    },
    {
      path: '/adminUsers',
      name: 'AdminUsers',
      component: () => import('../views/Admin/AdminUsers.vue')
    },    
    {
      path: '/addUsers',
      name: 'AddUsers',
      component: () => import('../views/Admin/AddUser.vue')
    },
    {
      path: '/adminAdopted',
      name: 'AdminAdopted',
      component: () => import('../views/Admin/AdminAdopted.vue')
    },
    {
      path: '/adminRaturnd',
      name: 'AdminRaturnd',
      component: () => import('../views/Admin/AdminRaturnd.vue')
    }, {
      path: '/adminAdd',
      name: 'AdminAdd',
      component: () => import('../views/Admin/AdminAdd.vue')
    },
    {
      path: '/statistic',
      name: 'Stanistic',
      component: () => import('../views/Admin/Statistic.vue')
    },
   
    {
      path: '/animals',
      name: 'Animals',
      component: () => import('../views/User/Animals.vue')
    },
    {
      path: '/animal/:id',
      name: 'Animal',
      props: true,
      component: () => import('../views/User/Animal.vue')
    },
    {
      path: '/user/:id',
      name: 'User',
      props: true,
      component: () => import('../views/Admin/AdminUser.vue')
    },
    {
      path: '/adminAnimals/:id',
      name: 'AdminAnimals',
      props: true,
      component: () => import('../views/Admin/AdminAnimals.vue')
    },



    //REST OF ROUTES
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
      path: '/',
      name: 'LogIn',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/loading',
      name: 'Loading',
      props: true,
      component: () => import('../views/Loading.vue')
    }

   
  ]
})

export default router
