<template>
    <div class="flex justify-start items-start mt-8 py-20 mx-25 ml-25">
      <!-- Navigation on the left side -->
      <div class="w-1/4">
        <AdminNavigation/>
      </div>
  
      <!-- Statistics on the right side -->
      <div class="w-3/4 p-4">
        <!-- Loading state while data is loading -->
        <div v-if="loading" class="text-center text-white">Loading...</div>
  
        <!-- When data is available -->
        <div v-if="!loading && chartDataReady">
            <div class="mb-10">
          <h1 class="text-2xl text-white font-bold mb-4">Animal Statistics</h1>
            </div>
          <div class="mb-8">
            <!-- Check if datasets are defined before displaying the chart -->
            <Bar 
              v-if="chartData && chartData.datasets && chartData.datasets.length > 0"
              :chart-options="chartOptions"
              :chart-data="chartData"
              :chart-id="chartId"
              :dataset-id-key="datasetIdKey"
              :plugins="plugins"
              :css-classes="cssClasses"
              :styles="styles"
              :width="width"
              :height="height"
            />
          </div>
  
          <div class="mb-8 mt-8">
            <!-- Check if datasets are defined before displaying the chart -->
            <Bar 
              v-if="familyChartData && familyChartData.datasets && familyChartData.datasets.length > 0"
              :chart-options="chartOptions"
              :chart-data="familyChartData"
              :chart-id="chartId"
              :dataset-id-key="datasetIdKey"
              :plugins="plugins"
              :css-classes="cssClasses"
              :styles="styles"
              :width="width"
              :height="height"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
//dodaj statistiku radnika, mjesečnu statistiku primanja, probaj i u koje vrijeme i kojeg datuma se najviše životinja pronalazi, koji surender najviše vraća životija


import AdminNavigation from '../Admin/AdminNavigation.vue';
  import { defineComponent, ref, onMounted } from 'vue';
  import instance from '@/axiosBase';
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  export default defineComponent({
    components: {
      Bar,
      AdminNavigation,
    },
    setup() {
      const loading = ref(true);
      const allAnimals = ref([]);
      const adoptedAnimals = ref([]);
      const returnedAnimals = ref([]);
      const totalAnimals = ref(0);
      const adoptedPercentage = ref(0);
      const returnedPercentage = ref(0);
      const chartDataReady = ref(false); 
      const differencePercentage = ref(0); 
      const remainingAnimals = ref(0); 
      const familyGroups = ref({});
    const familyPercentages = ref({});
    const familyChartData = ref(null); // Nova varijabla za podatke grafa
   // Opcije za novi graf
      const chartData = ref(null); // Initially null to prevent errors until data loads
  
      // Chart.js options
      // Chart.js options
// Chart.js options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return tooltipItem.raw + '%';
        }
      }
    },
    legend: {
      labels: {
        color: '#FFFFFF' // Promjena boje legendi na bijelu
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#FFFFFF', // Promjena boje oznaka na X-osi na bijelu
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#FFFFFF', // Promjena boje oznaka na Y-osi na bijelu
        callback: function(value) {
          return value + '%'; // Dodaj znak "%" nakon vrijednosti
        }
      }
    }
  }
};

const familyChartOptions = { // Opcije za novi graf
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.raw + '%';
            }
          }
        },
        legend: {
          labels: {
            color: '#FFFFFF' // Promjena boje legendi na bijelu
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#FFFFFF', // Promjena boje oznaka na X-osi na bijelu
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#FFFFFF', // Promjena boje oznaka na Y-osi na bijelu
            callback: function(value) {
              return value + '%'; // Dodaj znak "%" nakon vrijednosti
            }
          }
        }
      }
    };

  
      const fetchData = async () => {
        try {
          const token = 'your-token-here'; // Replace with your token
  
          const allAnimalsResponse = await instance.get('animal/animal_pc', {
            headers: { Authorization: `Bearer ${token}` },
          });
          allAnimals.value = allAnimalsResponse.data || [];
  
          const adoptedResponse = await instance.get('animal/adopted_db', {
            headers: { Authorization: `Bearer ${token}` },
          });
          adoptedAnimals.value = adoptedResponse.data || [];
  
          const returnedResponse = await instance.get('animal/reaturned_db', {
            headers: { Authorization: `Bearer ${token}` },
          });
          returnedAnimals.value = returnedResponse.data || [];
  
          calculateStatistics();
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          loading.value = false;
        }
      };
  
      const calculateStatistics = () => {
        totalAnimals.value = allAnimals.value.length;
        const adoptedCount = adoptedAnimals.value.length;
        const returnedCount = returnedAnimals.value.length;
  
        adoptedPercentage.value = totalAnimals.value > 0 ? ((adoptedCount / totalAnimals.value) * 100).toFixed(2) : 0;
        returnedPercentage.value = totalAnimals.value > 0 ? ((returnedCount / totalAnimals.value) * 100).toFixed(2) : 0;
        differencePercentage.value = (adoptedPercentage.value - returnedPercentage.value).toFixed(2);
        const remainingAnimalsForAdoption = totalAnimals.value - adoptedCount;
        remainingAnimals.value =100-adoptedPercentage.value;
            // Izračun postotaka za svaki family
  const families = ['Mammal', 'Bird', 'Fish', 'Reptile', 'Amphibian'];
  const familyCounts = families.reduce((acc, family) => {
    acc[family] = allAnimals.value.filter(animal => animal.family === family).length;
    return acc;
  }, {});

  const familyPercentages = families.reduce((acc, family) => {
    const count = familyCounts[family];
    acc[family] = totalAnimals.value > 0 ? ((count / totalAnimals.value) * 100).toFixed(2) : 0;
    return acc;
  }, {});
        // Check if there are any animals to make the chart meaningful
        if (totalAnimals.value > 0) {
            familyChartData.value = {
    labels: Object.keys(familyPercentages),
    datasets: [
      {
        label: 'Percentage of Animal Families',
        backgroundColor: '#3FFF00',
        data: Object.values(familyPercentages).map(value => parseFloat(value))
      }
    ]
  };

          chartData.value = {
            labels: ['Adopted', 'Returned', 'Difference', 'Available'],
            datasets: [
              {
                label: 'Animals',
                backgroundColor: '#42A5F5',
                data: [adoptedPercentage.value, returnedPercentage.value, differencePercentage.value, remainingAnimals.value]
              }
            ]
          };
  
          chartDataReady.value = true; // Data is now ready
        }
      };
  
      onMounted(() => {
        fetchData();
      });
  
      return {
        loading,
      totalAnimals,
      adoptedPercentage,
      returnedPercentage,
      chartData,
      chartDataReady,
      chartOptions,
      familyChartData,
      familyChartOptions,
      chartId: 'animalChart',
      datasetIdKey: 'id', // Optional unique identifier for dataset
      plugins: [],
      cssClasses: 'chart-container',
      styles: { position: 'relative', height: '600px', width: '1000px' }, // Customize styles
      width: 1200,
      height: 500
      };
    }
  });
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 100%;
  }
  </style>
  