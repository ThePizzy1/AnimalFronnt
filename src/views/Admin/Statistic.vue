<template>
  <div class="flex bg-[#0f0f0f] min-h-screen overflow-hidden">
    <!-- Navigacija -->
    <aside class="w-1/5 bg-[#151515] p-4 border-r border-gray-800 overflow-y-auto">
      <AdminNavigation />
    </aside>

    <!-- Glavni sadržaj -->
    <main class="flex-1 p-8 text-gray-100 overflow-y-auto">
      <h1 class="text-3xl font-bold mb-8">📊 Admin Analytics Dashboard</h1>

      <div v-if="loading" class="text-center text-gray-400 text-lg py-10">
        ⏳ Učitavanje podataka...
      </div>

      <div
        v-else-if="chartsReady"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-[500px]"
      >
        <!-- PRVI RED -->
        <div class="chart-card">
          <h2 class="chart-title">👥 Users by Role</h2>
          <Doughnut
            v-if="roleChart"
            :chart-data="roleChart"
            :chart-options="pieOptions"
          />
        </div>

        <div class="chart-card">
          <h2 class="chart-title">🧑‍⚕️ Vet vs HeadVet</h2>
          <Pie
            v-if="vetChart"
            :chart-data="vetChart"
            :chart-options="pieOptions"
          />
        </div>

        <div class="chart-card">
          <h2 class="chart-title">💼 Manager vs Worker</h2>
          <Pie
            v-if="managerWorkerChart"
            :chart-data="managerWorkerChart"
            :chart-options="pieOptions"
          />
        </div>

        <!-- DRUGI RED -->
        <div class="chart-card">
          <h2 class="chart-title">🏢 Associations / Surrenderers / Welfare Officers</h2>
          <Pie
            v-if="otherRolesChart"
            :chart-data="otherRolesChart"
            :chart-options="pieOptions"
          />
        </div>

        <div class="chart-card">
          <h2 class="chart-title">🥇 Top 3 Submitters</h2>
          <Pie
            v-if="submitterChart"
            :chart-data="submitterChart"
            :chart-options="pieOptions"
          />
        </div>

        <div class="chart-card">
          <h2 class="chart-title">🐾 Animals by Family</h2>
          <Bar
            v-if="familyChart"
            :chart-data="familyChart"
            :chart-options="barOptions"
          />
        </div>

        <!-- TREĆI RED -->
        <div class="chart-card col-span-1 md:col-span-2 xl:col-span-3 h-[500px]">
          <h2 class="chart-title">🔄 Animal Process States</h2>
          <Bar
            v-if="animalProcessChart"
            :chart-data="animalProcessChart"
            :chart-options="barOptions"
          />
        </div>

        <!-- ČETVRTI RED -->
        <div class="chart-card col-span-1 md:col-span-2 xl:col-span-3 h-[500px]">
          <h2 class="chart-title">💰 Funds per Account</h2>
          <Line
            v-if="fundsChart"
            :chart-data="fundsChart"
            :chart-options="lineOptions"
          />
        </div>
      </div>

      <div v-else class="text-gray-400 text-center py-10">
        📉 Nema dostupnih podataka.
      </div>
    </main>
  </div>
</template>

<script>
import AdminNavigation from "../Admin/AdminNavigation.vue";
import instance from "@/axiosBase";
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
  LinearScale,
} from "chart.js";
import { Bar, Pie, Line, Doughnut } from "vue-chartjs";

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
);

export default {
  components: { AdminNavigation, Bar, Pie, Line, Doughnut },
  data() {
    return {
      loading: true,
      chartsReady: false,
      users: [],
      animals: [],
      balances: [],
      animalRecords: [],
      systemRecords: [],
      foundRecords: [],
      roleChart: null,
      vetChart: null,
      managerWorkerChart: null,
      otherRolesChart: null,
      submitterChart: null,
      animalProcessChart: null,
      familyChart: null,
      fundsChart: null,
    };
  },

  async mounted() {
    await this.fetchData();
    await this.prepareCharts();
    this.loading = false;
    this.chartsReady = true;
  },

  methods: {
    async fetchData() {
      try {
        const [usersRes, animalsRes, balancesRes, sysRes, animalRecRes, foundRes] =
          await Promise.all([
            instance.get("auth/getAll"),
            instance.get("animal/animal_pc"),
            instance.get("animal/balans_db"),
            instance.get("animal/systemrecord_db"),
            instance.get("animal/animalrecord_db"),
            instance.get("animal/foundrecord_db"),
          ]);

        this.users = usersRes.data || [];
        this.animals = animalsRes.data || [];
        this.balances = balancesRes.data || [];
        this.systemRecords = sysRes.data || [];
  
        this.foundRecords = foundRes.data || [];
          this.animalRecords = (animalRecRes.data || []).map((r) => {
          let recordId = r.RecordId ?? r.recordId;
          let animalId = r.AnimalId ?? r.animalId;
          // ako su zamijenjeni
          if (recordId > 9 && animalId <= 9) {
            const tmp = recordId;
            recordId = animalId;
            animalId = tmp;
          }
          return { animalId, recordId };
        });
        this.systemRecords = systemRecRes.data || [];
        this.foundRecords = foundRecRes.data || [];
      } catch (err) {
        console.error("❌ Greška pri dohvaćanju:", err);
      }
    },

    async getUserNameById(id) {
      try {
        const res = await instance.get(`auth/getUserById/${id}`);
        return `${res.data.name} ${res.data.surname}`;
      } catch {
        return "Nepoznat";
      }
    },

    async prepareCharts() {
      const countRole = (r) => this.users.filter((u) => u.roles?.includes(r)).length;

      // 👥 Roles
      const roles = [
        "User",
        "Vet",
        "HeadVet",
        "Surenderer",
        "AnimalWelffereOfficer",
        "Association",
        "Worker",
        "Menager",
      ];
      this.roleChart = {
        labels: roles,
        datasets: [
          {
            data: roles.map(countRole),
            backgroundColor: [
              "#3B82F6",
              "#10B981",
              "#F59E0B",
              "#EF4444",
              "#8B5CF6",
              "#14B8A6",
              "#EAB308",
              "#6366F1",
            ],
          },
        ],
      };

      // Vets
      this.vetChart = {
        labels: ["Vet", "HeadVet"],
        datasets: [
          { data: [countRole("Vet"), countRole("HeadVet")], backgroundColor: ["#3B82F6", "#10B981"] },
        ],
      };

      // Managers vs Workers
      this.managerWorkerChart = {
        labels: ["Manager", "Worker"],
        datasets: [
          { data: [countRole("Menager"), countRole("Worker")], backgroundColor: ["#F59E0B", "#6366F1"] },
        ],
      };

      // Other roles
      this.otherRolesChart = {
        labels: ["Association", "Surrenderer", "Welfare Officer"],
        datasets: [
          {
            data: [
              countRole("Association"),
              countRole("Surenderer"),
              countRole("AnimalWelffereOfficer"),
            ],
            backgroundColor: ["#EF4444", "#F59E0B", "#10B981"],
          },
        ],
      };

      // 🥇 Top submitters
      const submitCounts = {};
      for (const f of this.foundRecords)
        submitCounts[f.registerId] = (submitCounts[f.registerId] || 0) + 1;

      const sorted = Object.entries(submitCounts).sort((a, b) => b[1] - a[1]);
      const top3 = sorted.slice(0, 3);
      const rest = sorted.slice(3).reduce((s, [, v]) => s + v, 0);
      const labels = [];
      for (const [id] of top3) labels.push(await this.getUserNameById(id));
      labels.push("Others");

      this.submitterChart = {
        labels,
        datasets: [
          {
            data: [...top3.map(([, v]) => v), rest],
            backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#6B7280"],
          },
        ],
      };

        // === ANIMAL PROCESS STATES ===
 // --- Animal Process States ---
      

     // 🔄 ANIMAL PROCESS STATES
const countsByRecord = Array(9).fill(0);

// Broji koliko životinja ima svaki RecordId (1-9)
this.animalRecords.forEach((r) => {
  const recordId = r.RecordId ?? r.recordId;
  if (recordId >= 1 && recordId <= 9) countsByRecord[recordId - 1]++;
});

// Mapiraj SystemRecord u redoslijedu 1-9
const sysMap = {
  1: "Arrival",
  2: "First Vet Visit",
  3: "Quarantine",
  4: "Shelter",
  5: "Socialized",
  6: "Approve for Adoption",
  7: "Adopted",
  8: "Euthanasia",
  9: "Return",
};

// Kreiraj chart
this.animalProcessChart = {
  labels: Object.values(sysMap),
  datasets: [
    {
      label: "Animals",
      data: countsByRecord,
      backgroundColor: "#3B82F6",
    },
  ],
};

              // 🐾 Families
          const familyCounts = {};

          // Broji koliko ima svaka životinjska obitelj
          this.animals.forEach((a) => {
            const fam = a.family || "Unknown";
            familyCounts[fam] = (familyCounts[fam] || 0) + 1;
          });

          // Sortiraj abecedno po imenu obitelji
          const fams = Object.keys(familyCounts).sort();

          // Napravi chart
          this.familyChart = {
            labels: fams,
            datasets: [
              {
                label: "Count",
                data: fams.map((f) => familyCounts[f]),
                backgroundColor: "#F59E0B",
                borderRadius: 6,
              },
            ],
          };


      // 💰 Balances
      const labelsBal = this.balances.map((b) => b.iban);
      const dataBal = this.balances.map((b) => b.balance || 0);
      this.fundsChart = {
        labels: labelsBal,
        datasets: [
          {
            label: "Account Balance",
            data: dataBal,
            borderColor: "#10B981",
            backgroundColor: "rgba(16,185,129,0.4)",
            fill: false,
            tension: 0.3,
          },
        ],
      };
    },
  },

  computed: {
    pieOptions() {
      return {
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { color: "#ddd" } },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const val = ctx.parsed;
                const pct = ((val / total) * 100).toFixed(1);
                return `${ctx.label}: ${val} (${pct}%)`;
              },
            },
          },
        },
      };
    },
    barOptions() {
      return {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "#ddd" } } },
        scales: {
          x: { ticks: { color: "#ddd" } },
          y: { beginAtZero: true, ticks: { color: "#ddd" } },
        },
      };
    },
    lineOptions() {
      return {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "#ddd" } } },
        scales: {
          x: { ticks: { color: "#ddd" } },
          y: { beginAtZero: true, ticks: { color: "#ddd" } },
        },
      };
    },
  },
};
</script>

<style scoped>
.chart-card {
  background-color: #111;
  border: 1px solid #222;
  border-radius: 1rem;
  padding: 1.25rem;
  overflow: hidden;
}
.chart-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #e5e7eb;
}
</style>
