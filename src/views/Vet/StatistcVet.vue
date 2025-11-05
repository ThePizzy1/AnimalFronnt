<template>
  <div class="flex bg-[#0f0f0f] min-h-screen overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-1/5 bg-[#151515] p-4 border-r border-gray-800 overflow-y-auto">
      <VetNavigation />
    </aside>

    <!-- Main -->
    <main class="flex-1 p-8 text-gray-100 overflow-y-auto">
      <h1 class="text-3xl font-bold mb-8">📊 Vet Analytics Dashboard</h1>

      <div v-if="loading" class="text-center text-gray-400 text-lg py-10">
        ⏳ Učitavanje podataka...
      </div>

      <div v-else-if="chartsReady" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-[520px]">
        <!-- Visits: ukupno po tipu -->
        <div class="chart-card">
          <h2 class="chart-title">🩺 Vet Visits — by Type</h2>
          <Doughnut v-if="visitsOverallChart" :chart-data="visitsOverallChart" :chart-options="pieOptions" />
          <p class="mt-3 text-sm text-gray-400" v-if="visitsTotalsSum > 0">
            Total visits: <span class="text-emerald-400 font-semibold">{{ visitsTotalsSum }}</span>
          </p>
        </div>

        <!-- Individual Visit Type Charts -->
        <div
          v-for="(chart, index) in visitsStatusCharts"
          :key="index"
          class="chart-card flex flex-col items-center justify-center"
        >
          <h2 class="chart-title text-center">⏱️ {{ chart.label }} — Active vs Completed</h2>
          <Doughnut :chart-data="chart.data" :chart-options="miniPieOptions" class="w-60 h-60" />
          <p class="mt-2 text-sm text-gray-300 text-center">
            Active: <span class="text-amber-400">{{ chart.active }}</span> | Completed:
            <span class="text-emerald-400">{{ chart.completed }}</span>
          </p>
        </div>

        <!-- Top 5 Medicines -->
        <div class="chart-card">
          <h2 class="chart-title">💊 Top 5 Medicines</h2>
          <Bar v-if="medicinesTopChart" :chart-data="medicinesTopChart" :chart-options="barOptions" />
        </div>

        <!-- Top 5 Diseases -->
        <div class="chart-card">
          <h2 class="chart-title">🦠 Top 5 Diseases — Infected vs Recovered</h2>
          <Bar v-if="diseasesStackedChart" :chart-data="diseasesStackedChart" :chart-options="stackedBarOptions" />
        </div>

        <!-- Outcomes -->
        <div class="chart-card">
          <h2 class="chart-title">🏁 Outcomes — Adopted vs Euthanized</h2>
          <Pie v-if="outcomesChart" :chart-data="outcomesChart" :chart-options="pieOptions" />
        </div>
      </div>

      <div v-else class="text-gray-400 text-center py-10">📉 Nema dostupnih podataka.</div>
    </main>
  </div>
</template>

<script>
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
import { Bar, Pie, Doughnut } from "vue-chartjs";
import VetNavigation from "../Vet/VetNavigation.vue";

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
  components: { VetNavigation, Bar, Pie, Doughnut },

  data() {
    return {
      loading: true,
      chartsReady: false,
      visits: [],
      contagious: [],
      medicines: [],
      animals: [],
      // charts
      visitsOverallChart: null,
      visitsTotalsSum: 0,
      visitsStatusCharts: [],
      medicinesTopChart: null,
      diseasesStackedChart: null,
      outcomesChart: null,
    };
  },

  async mounted() {
    await this.fetchData();
    this.prepareCharts();
    this.loading = false;
    this.chartsReady = true;
  },

  methods: {
async fetchData() {
  try {
    const [visitsRes, contRes, medsRes, animalsRes, euthRes, recordsRes] = await Promise.all([
      instance.get("animal/vetvisit_db"),
      instance.get("animal/contageusanimals_db"),
      instance.get("animal/medicines_db"),
      instance.get("animal/animalAVet_db"),
      instance.get("animal/euthanasia_db"),
      instance.get("animal/animalrecord_db"),
    ]);

    this.visits = visitsRes.data || [];
    this.contagious = contRes.data || [];
    this.medicines = medsRes.data || [];
    this.animals = animalsRes.data || [];
    this.euthanasia = euthRes.data || [];
    this.animalRecords = recordsRes.data || [];
    console.log("Adopted:"+this.animals.length);

  } catch (err) {
    console.error("❌ Greška pri dohvaćanju:", err);
  }
},


    prepareCharts() {
      this.buildVisitsCharts();
      this.buildMedicinesChart();
      this.buildDiseasesChart();
      this.buildOutcomesChart();
    },

    // === Visits ===
    buildVisitsCharts() {
      const labelMap = {
        Vaccination: "Vaccination",
        Quarantine: "Quarantine",
        Operations: "Operations",
        Operation: "Operations",
        Checkups: "Checkups",
        Checkup: "Checkups",
      };

      const countsByType = {};
      const statusByType = {};
      const now = new Date();

      for (const v of this.visits) {
        let t = v.typeOfVisit || "Unknown";
        t = labelMap[t] || t;

        countsByType[t] = (countsByType[t] || 0) + 1;

        const end = v.endTime ? new Date(v.endTime) : null;
        const completed = !!end && end <= now;
        const stateKey = completed ? "completed" : "active";

        if (!statusByType[t]) statusByType[t] = { active: 0, completed: 0 };
        statusByType[t][stateKey]++;
      }

      const orderedTypes = ["Vaccination", "Quarantine", "Operations", "Checkups"].filter(
        (t) => countsByType[t]
      );

      const totals = orderedTypes.map((t) => countsByType[t]);
      this.visitsTotalsSum = totals.reduce((a, b) => a + b, 0);

      // Total Doughnut
      this.visitsOverallChart = {
        labels: orderedTypes,
        datasets: [
          {
            data: totals,
            backgroundColor: ["#10B981", "#3B82F6", "#F59E0B", "#8B5CF6"],
          },
        ],
      };

      // One chart per type
      this.visitsStatusCharts = orderedTypes.map((t) => {
        const { active = 0, completed = 0 } = statusByType[t] || {};
        return {
          label: t,
          active,
          completed,
          data: {
            labels: ["Active", "Completed"],
            datasets: [
              {
                data: [active, completed],
                backgroundColor: ["#F59E0B", "#10B981"],
              },
            ],
          },
        };
      });
    },

    // === Medicines ===
    buildMedicinesChart() {
      const counter = {};
      for (const m of this.medicines) {
        const name = (m.nameOfMedicines || m.medicineName || "Unknown").trim();
        counter[name] = (counter[name] || 0) + 1;
      }
      const sorted = Object.entries(counter).sort((a, b) => b[1] - a[1]).slice(0, 5);
      const labels = sorted.map(([k]) => k);
      const data = sorted.map(([, v]) => v);

      this.medicinesTopChart = {
        labels,
        datasets: [
          {
            label: "Count",
            data,
            backgroundColor: "#F59E0B",
            borderRadius: 6,
          },
        ],
      };
    },

    // === Diseases ===
    buildDiseasesChart() {
      const byDisease = {};
      for (const r of this.contagious) {
        const disease = r.desisseName || "Unknown disease";
        const recovered = r.complited === true || r.completed === true;

        if (!byDisease[disease]) byDisease[disease] = { infected: 0, recovered: 0 };
        if (recovered) byDisease[disease].recovered++;
        else byDisease[disease].infected++;
      }

      const sorted = Object.entries(byDisease)
        .map(([k, v]) => [k, v, v.infected + v.recovered])
        .sort((a, b) => b[2] - a[2])
        .slice(0, 5);

      const labels = sorted.map(([k]) => k);
      const infected = sorted.map(([, v]) => v.infected);
      const recovered = sorted.map(([, v]) => v.recovered);

      this.diseasesStackedChart = {
        labels,
        datasets: [
          {
            label: "Infected",
            data: infected,
            backgroundColor: "#EF4444",
          },
          {
            label: "Recovered",
            data: recovered,
            backgroundColor: "#10B981",
          },
        ],
      };
    },

   // === Outcomes ===
buildOutcomesChart() {
  let adopted = 0;
  let euth = 0;



  // 2️⃣ Broji eutanazirane iz baze eutanazija
  euth = this.euthanasia.length;
  adopted=this.animals.length;

  console.log(`📊 Adopted: ${adopted}, Euthanized: ${euth}`);

  this.outcomesChart = {
    labels: ["Adopted", "Euthanized"],
    datasets: [
      {
        data: [adopted, euth],
        backgroundColor: ["#10B981", "#EF4444"],
      },
    ],
  };
},

    },

  computed: {
    tooltip: {
  callbacks: {
    label: (ctx) => {
      const total = ctx.dataset.data.reduce((a, b) => a + b, 0) || 1;
      const val = ctx.parsed;
      const pct = ((val / total) * 100).toFixed(1);
      return `${ctx.label}: ${val} (${pct}%)`;
    },
  },
},

    pieOptions() {
      return {
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { color: "#ddd" } },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0) || 1;
                const val = ctx.parsed;
                const pct = ((val / total) * 100).toFixed(1);
                return `${ctx.label}: ${val} (${pct}%)`;
              },
            },
          },
        },
      };
    },
    miniPieOptions() {
      return {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0) || 1;
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
          x: { ticks: { color: "#ddd" }, grid: { color: "rgba(255,255,255,0.06)" } },
          y: { beginAtZero: true, ticks: { color: "#ddd" }, grid: { color: "rgba(255,255,255,0.06)" } },
        },
      };
    },
    stackedBarOptions() {
      return {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "#ddd" } } },
        scales: {
          x: { stacked: true, ticks: { color: "#ddd" }, grid: { color: "rgba(255,255,255,0.06)" } },
          y: { stacked: true, beginAtZero: true, ticks: { color: "#ddd" }, grid: { color: "rgba(255,255,255,0.06)" } },
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
  display: flex;
  flex-direction: column;
}
.chart-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #e5e7eb;
}
</style>
