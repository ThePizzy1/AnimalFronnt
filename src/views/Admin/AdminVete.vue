<template>
  <div class="flex bg-[#0f0f0f] min-h-screen">
    <!-- Navigacija -->
    <div class="w-1/5 bg-[#151515] p-4 border-r border-gray-800">
      <AdminNavigation />
    </div>

    <!-- Glavni sadržaj -->
    <div class="w-4/5 p-8 text-gray-100">
      <h1 class="text-3xl font-bold mb-8">📊 Admin Analytics Dashboard</h1>

      <div v-if="loading" class="text-center text-gray-400 text-lg py-10">
        Učitavanje podataka...
      </div>

      <div v-if="!loading && chartsReady" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <!-- 👥 Korisnici po ulozi -->
        <div class="chart-card">
          <h2 class="chart-title">👥 User Roles Distribution</h2>
          <Doughnut v-if="roleChart" :chart-data="roleChart" :options="pieOptions" />
        </div>

        <!-- 🧑‍⚕️ Veterinari i glavni veterinari -->
        <div class="chart-card">
          <h2 class="chart-title">🧑‍⚕️ Vets vs Head Vets</h2>
          <Pie v-if="vetChart" :chart-data="vetChart" :options="pieOptions" />
        </div>

        <!-- 🧑‍🤝‍🧑 Udio udruga -->
        <div class="chart-card">
          <h2 class="chart-title">🏢 Organization Participation</h2>
          <Pie v-if="orgChart" :chart-data="orgChart" :options="pieOptions" />
        </div>

        <!-- 🏆 Top 3 predavatelja životinja -->
        <div class="chart-card">
          <h2 class="chart-title">🏆 Top 3 Submitters</h2>
          <Bar v-if="submitterChart" :chart-data="submitterChart" :options="barOptions" />
        </div>

        <!-- 🐾 Status životinja -->
        <div class="chart-card">
          <h2 class="chart-title">🐾 Animal Status Overview</h2>
          <Bar v-if="animalStatusChart" :chart-data="animalStatusChart" :options="barOptions" />
        </div>

        <!-- 🔄 Proces životinja prema SystemRecord -->
        <div class="chart-card">
          <h2 class="chart-title">🔄 Animal Process States</h2>
          <Bar v-if="animalProcessChart" :chart-data="animalProcessChart" :options="barOptions" />
        </div>

        <!-- 🐕 Obitelji životinja -->
        <div class="chart-card">
          <h2 class="chart-title">🦴 Animal Families</h2>
          <Bar v-if="familyChart" :chart-data="familyChart" :options="barOptions" />
        </div>

        <!-- 💰 Stanje računa -->
        <div class="chart-card col-span-1 md:col-span-2 xl:col-span-3">
          <h2 class="chart-title">💰 Funds per Account</h2>
          <Line v-if="fundsChart" :chart-data="fundsChart" :options="lineOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavigation from '../Admin/AdminNavigation.vue'
import instance from '@/axiosBase'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar, Pie, Line, Doughnut } from 'vue-chartjs'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
)

export default {
  components: { AdminNavigation, Bar, Pie, Line, Doughnut },
  data() {
    return {
      loading: true,
      chartsReady: false,
      users: [],
      animals: [],
      adopted: [],
      returned: [],
      euthanasia: [],
      funds: [],
      balances: [],
      systemRecords: [],
      animalRecords: [],

      // Chart podaci
      roleChart: null,
      vetChart: null,
      orgChart: null,
      submitterChart: null,
      animalStatusChart: null,
      animalProcessChart: null,
      familyChart: null,
      fundsChart: null
    }
  },

  async mounted() {
    await this.fetchData()
    setTimeout(() => {
      this.prepareCharts()
      this.chartsReady = true
    }, 300)
  },

  methods: {
    async fetchData() {
      try {
        const [
          usersRes,
          animalsRes,
          adoptedRes,
          returnedRes,
          euthanasiaRes,
          fundsRes,
          balansRes,
          systemRecordRes,
          animalRecordRes
        ] = await Promise.all([
          instance.get('auth/getAll'),
          instance.get('animal/animal_pc'),
          instance.get('animal/adopted_db'),
          instance.get('animal/reaturned_db'),
          instance.get('animal/euthanasia_db'),
          instance.get('animal/funds_db'),
          instance.get('animal/balans_db'),
          instance.get('animal/systemrecord_db'),
          instance.get('animal/animalrecord_db')
        ])

        // Ispis u konzolu za debug
        console.log('📘 USERS:', usersRes.data)
        console.log('🐾 ANIMALS:', animalsRes.data)
        console.log('🏡 ADOPTED:', adoptedRes.data)
        console.log('🔁 RETURNED:', returnedRes.data)
        console.log('⚰️ EUTHANASIA:', euthanasiaRes.data)
        console.log('💰 FUNDS:', fundsRes.data)
        console.log('🏦 BALANCES:', balansRes.data)
        console.log('📋 SYSTEM RECORDS:', systemRecordRes.data)
        console.log('📋 ANIMAL RECORDS:', animalRecordRes.data)

        this.users = usersRes.data
        this.animals = animalsRes.data
        this.adopted = adoptedRes.data
        this.returned = returnedRes.data
        this.euthanasia = euthanasiaRes.data
        this.funds = fundsRes.data
        this.balances = balansRes.data
        this.systemRecords = systemRecordRes.data
        this.animalRecords = animalRecordRes.data
      } catch (err) {
        console.error('❌ Greška pri dohvaćanju podataka:', err)
      } finally {
        this.loading = false
      }
    },

    prepareCharts() {
      // 👥 Korisnici po ulozi
      const roles = ['Manager', 'Worker', 'Vet', 'HeadVet', 'Association', 'Surrenderer']
      const roleCounts = roles.map(r => this.users.filter(u => u.roles?.includes(r)).length)
      this.roleChart = {
        labels: roles,
        datasets: [
          {
            label: 'User Roles',
            backgroundColor: ['#34d399', '#3b82f6', '#fbbf24', '#ef4444', '#a855f7', '#14b8a6'],
            data: roleCounts
          }
        ]
      }

      // 🧑‍⚕️ Veterinari
      const vets = this.users.filter(u => u.roles?.includes('Vet')).length
      const headVets = this.users.filter(u => u.roles?.includes('HeadVet')).length
      this.vetChart = {
        labels: ['Vet', 'Head Vet'],
        datasets: [
          {
            backgroundColor: ['#3b82f6', '#f59e0b'],
            data: [vets, headVets]
          }
        ]
      }

      // 🏢 Udio udruga
      const orgs = this.users.filter(u => u.roles?.includes('Association')).length
      const others = this.users.length - orgs
      this.orgChart = {
        labels: ['Organizations', 'Other Users'],
        datasets: [
          {
            backgroundColor: ['#10b981', '#6b7280'],
            data: [orgs, others]
          }
        ]
      }

      // 🏆 Top 3 submittera
      const submissions = {}
      this.animals.forEach(a => {
        if (a.submittedBy)
          submissions[a.submittedBy] = (submissions[a.submittedBy] || 0) + 1
      })
      const sorted = Object.entries(submissions).sort((a, b) => b[1] - a[1])
      const top3 = sorted.slice(0, 3)
      const rest = sorted.slice(3).reduce((sum, [, val]) => sum + val, 0)
      const labels = top3.map(([name]) => name).concat('Others')
      const data = top3.map(([, count]) => count).concat(rest)
      this.submitterChart = {
        labels,
        datasets: [
          {
            label: 'Submitted Animals',
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#6b7280'],
            data
          }
        ]
      }

      // 🐾 Status životinja
      const total = this.animals.length
      const adopted = this.adopted.length
      const returned = this.returned.length
      const euth = this.euthanasia.length
      const available = Math.max(total - adopted - returned - euth, 0)
      this.animalStatusChart = {
        labels: ['Adopted', 'Returned', 'Euthanized', 'Available'],
        datasets: [
          {
            label: 'Animals',
            backgroundColor: ['#34d399', '#f87171', '#ef4444', '#3b82f6'],
            data: [adopted, returned, euth, available]
          }
        ]
      }

      // 🔄 Proces životinja prema RecordId 1–9
      const statusGroups = {
        1: 'Arrival',
        2: 'First Vet Visit',
        3: 'Quarantine',
        4: 'Shelter',
        5: 'Socialized',
        6: 'Approve for Adoption',
        7: 'Adopted',
        8: 'Euthanasia',
        9: 'Returned'
      }

      const groupedCounts = {}
      this.animalRecords.forEach(record => {
        const recordName = statusGroups[record.recordId] || 'Unknown'
        groupedCounts[recordName] = (groupedCounts[recordName] || 0) + 1
      })

      this.animalProcessChart = {
        labels: Object.keys(groupedCounts),
        datasets: [
          {
            label: 'Animals (%)',
            backgroundColor: [
              '#10B981', '#3B82F6', '#F59E0B', '#EF4444',
              '#8B5CF6', '#F472B6', '#14B8A6', '#EAB308', '#6B7280'
            ],
            data: Object.values(groupedCounts).map(
              val => ((val / this.animals.length) * 100).toFixed(1)
            )
          }
        ]
      }

      // 🐕 Obitelji životinja
      const families = ['Mammal', 'Bird', 'Fish', 'Reptile', 'Amphibian']
      const familyCounts = families.map(f => this.animals.filter(a => a.family === f).length)
      this.familyChart = {
        labels: families,
        datasets: [
          {
            label: 'Families',
            backgroundColor: '#f59e0b',
            data: familyCounts
          }
        ]
      }

      // 💰 Stanje računa
      const balancesByIban = {}
      this.balances.forEach(b => {
        balancesByIban[b.iban] = b.balance || 0
      })
      this.fundsChart = {
        labels: Object.keys(balancesByIban),
        datasets: [
          {
            label: 'Account Balances',
            borderColor: '#10b981',
            backgroundColor: '#10b981',
            fill: false,
            data: Object.values(balancesByIban)
          }
        ]
      }
    }
  },

  computed: {
    barOptions() {
      return {
        responsive: true,
        plugins: { legend: { labels: { color: '#ddd' } } },
        scales: {
          y: { beginAtZero: true, ticks: { color: '#ddd' } },
          x: { ticks: { color: '#ddd' } }
        }
      }
    },
    pieOptions() {
      return {
        plugins: {
          legend: { position: 'bottom', labels: { color: '#ddd' } }
        }
      }
    },
    lineOptions() {
      return {
        responsive: true,
        plugins: { legend: { labels: { color: '#ddd' } } },
        scales: {
          x: { ticks: { color: '#ddd' } },
          y: { ticks: { color: '#ddd' } }
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-card {
  background-color: #111;
  border: 1px solid #222;
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
.chart-title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #e5e7eb;
}
</style>
