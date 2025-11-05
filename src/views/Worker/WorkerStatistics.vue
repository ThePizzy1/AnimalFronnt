<template>
  <div class="flex bg-[#0f0f0f] min-h-screen overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-1/5 bg-[#151515] p-4 border-r border-gray-800 overflow-y-auto">
      <WorkerNavigation />
    </aside>

    <!-- Main -->
    <main class="flex-1 p-8 text-gray-100 overflow-y-auto space-y-16">
      <h1 class="text-3xl font-bold mb-8">📊 Worker Analytics Dashboard</h1>

      <!-- ===================== 🥫 FOOD ===================== -->
      <section>
        <h2 class="text-2xl font-semibold text-emerald-400 mb-6">🥫 Food Analytics</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-[520px]">
          <div class="chart-card">
            <h2 class="chart-title">💰 Top 5 Most Expensive Foods</h2>
            <Bar v-if="foodExpensiveChart" :chart-data="foodExpensiveChart" :chart-options="barOptions" />
          </div>
          <div class="chart-card">
            <h2 class="chart-title">🪙 Top 5 Cheapest Foods</h2>
            <Bar v-if="foodCheapChart" :chart-data="foodCheapChart" :chart-options="barOptions" />
          </div>
          <div class="chart-card">
            <h2 class="chart-title">📦 Top 5 Most Stocked Foods</h2>
            <Bar v-if="foodMostChart" :chart-data="foodMostChart" :chart-options="barOptions" />
          </div>
          <div class="chart-card">
            <h2 class="chart-title">🍽️ Food Type — Percentage</h2>
            <Doughnut v-if="foodTypeChart" :chart-data="foodTypeChart" :chart-options="pieOptions" />
          </div>
          <div class="chart-card">
            <h2 class="chart-title">⚠️ Food to Restock</h2>
            <Bar v-if="foodRestockChart" :chart-data="foodRestockChart" :chart-options="barOptions" />
          </div>
        </div>
      </section>

      <!-- ===================== 🧸 TOYS ===================== -->
      <section>
        <h2 class="text-2xl font-semibold text-emerald-400 mb-6">🧸 Toy Analytics</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-[520px]">
          <div class="chart-card">
            <h2 class="chart-title">💰 Top 5 Most Expensive Toys</h2>
            <Bar v-if="toyExpensiveChart" :chart-data="toyExpensiveChart" :chart-options="barOptions" />
          </div>
          <div class="chart-card">
            <h2 class="chart-title">🪙 Top 5 Cheapest Toys</h2>
            <Bar v-if="toyCheapChart" :chart-data="toyCheapChart" :chart-options="barOptions" />
          </div>
          <div class="chart-card">
            <h2 class="chart-title">📦 Top 5 Most Stocked Toys</h2>
            <Bar v-if="toyMostChart" :chart-data="toyMostChart" :chart-options="barOptions" />
          </div>
          <div class="chart-card">
            <h2 class="chart-title">🧩 Toy Type — Percentage</h2>
            <Doughnut v-if="toyTypeChart" :chart-data="toyTypeChart" :chart-options="pieOptions" />
          </div>
          <div class="chart-card">
            <h2 class="chart-title">⚠️ Toys to Restock</h2>
            <Bar v-if="toyRestockChart" :chart-data="toyRestockChart" :chart-options="barOptions" />
          </div>
        </div>
      </section>

      <!-- ===================== 💬 CONTACT ===================== -->
      <section>
        <h2 class="text-2xl font-semibold text-emerald-400 mb-6">💬 Contact Analytics</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-[520px]">
          <div class="chart-card">
            <h2 class="chart-title">📨 Top 5 Most Active Contacts</h2>
            <Bar v-if="contactTopChart" :chart-data="contactTopChart" :chart-options="barOptions" />
          </div>
          <div class="chart-card">
            <h2 class="chart-title">📬 Messages — Replied vs Pending</h2>
            <Pie v-if="contactStatusChart" :chart-data="contactStatusChart" :chart-options="pieOptions" />
          </div>
        </div>
      </section>

      <!-- ===================== 💰 BALANCE ===================== -->
      <section>
        <h2 class="text-2xl font-semibold text-emerald-400 mb-6">💰 Financial Overview</h2>
        <div class="chart-card h-[520px]">
          <Line v-if="fundsChart" :chart-data="fundsChart" :chart-options="lineOptions" />
        </div>
      </section>
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
import { Bar, Pie, Line, Doughnut } from "vue-chartjs";
import WorkerNavigation from "../Worker/WorkerNavigation.vue";

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale);

export default {
  components: { WorkerNavigation, Bar, Pie, Line, Doughnut },
  data() {
    return {
      loading: true,
      chartsReady: false,
      food: [],
      toys: [],
      contacts: [],
      balances: [],
      foodExpensiveChart: null,
      foodCheapChart: null,
      foodMostChart: null,
      foodTypeChart: null,
      foodRestockChart: null,
      toyExpensiveChart: null,
      toyCheapChart: null,
      toyMostChart: null,
      toyTypeChart: null,
      toyRestockChart: null,
      contactTopChart: null,
      contactStatusChart: null,
      fundsChart: null,
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
        const [foodRes, toyRes, contactRes, balanceRes] = await Promise.all([
          instance.get("animal/food_db"),
          instance.get("animal/toys_db"),
          instance.get("animal/contact_db"),
          instance.get("animal/balans_db"),
        ]);

        this.food = foodRes.data || [];
        this.toys = toyRes.data || [];
        this.contacts = contactRes.data || [];
        this.balances = balanceRes.data || [];
      } catch (err) {
        console.error("❌ Error fetching:", err);
      }
    },

    prepareCharts() {
      this.buildFoodCharts();
      this.buildToyCharts();
      this.buildContactCharts();
      this.buildFundsChart();
    },

    // === 🥫 FOOD ===
    buildFoodCharts() {
      if (!this.food.length) return;
      const sorted = [...this.food].sort((a, b) => (b.price || 0) - (a.price || 0));
      const top5 = sorted.slice(0, 5);
      const cheap5 = sorted.slice(-5);
      const most = [...this.food].sort((a, b) => (b.quantity || 0) - (a.quantity || 0)).slice(0, 5);
      const restock = this.food.filter((f) => f.quantity < 5);

      this.foodExpensiveChart = this.barChart(top5, "name", "price", "#F59E0B");
      this.foodCheapChart = this.barChart(cheap5, "name", "price", "#10B981");
      this.foodMostChart = this.barChart(most, "name", "quantity", "#3B82F6");
      this.foodRestockChart = this.barChart(restock, "name", "quantity", "#EF4444");

      const byType = {};
      this.food.forEach((f) => (byType[f.foodType || "Unknown"] = (byType[f.foodType || "Unknown"] || 0) + 1));
      this.foodTypeChart = this.pieChart(Object.keys(byType), Object.values(byType));
    },

    // === 🧸 TOYS ===
    buildToyCharts() {
      if (!this.toys.length) return;
      const sorted = [...this.toys].sort((a, b) => (b.price || 0) - (a.price || 0));
      const top5 = sorted.slice(0, 5);
      const cheap5 = sorted.slice(-5);
      const most = [...this.toys].sort((a, b) => (b.quantity || 0) - (a.quantity || 0)).slice(0, 5);
      const restock = this.toys.filter((t) => t.quantity < 5);

      this.toyExpensiveChart = this.barChart(top5, "name", "price", "#F59E0B");
      this.toyCheapChart = this.barChart(cheap5, "name", "price", "#10B981");
      this.toyMostChart = this.barChart(most, "name", "quantity", "#3B82F6");
      this.toyRestockChart = this.barChart(restock, "name", "quantity", "#EF4444");

      const byType = {};
      this.toys.forEach((t) => (byType[t.toyType || "Unknown"] = (byType[t.toyType || "Unknown"] || 0) + 1));
      this.toyTypeChart = this.pieChart(Object.keys(byType), Object.values(byType));
    },

    // === 💬 CONTACTS ===
    buildContactCharts() {
      if (!this.contacts.length) return;
      const counter = {};
      let replied = 0;
      let pending = 0;

      this.contacts.forEach((c) => {
        const name = c.name || "Unknown";
        counter[name] = (counter[name] || 0) + 1;
        c.read ? replied++ : pending++;
      });

      const sorted = Object.entries(counter).sort((a, b) => b[1] - a[1]).slice(0, 5);
      this.contactTopChart = this.barChart(sorted.map(([n]) => ({ name: n, count: counter[n] })), "name", "count", "#3B82F6");
      this.contactStatusChart = this.pieChart(["Replied", "Pending"], [replied, pending]);
    },

    // === 💰 BALANCE ===
    buildFundsChart() {
      if (!this.balances.length) return;
      this.fundsChart = {
        labels: this.balances.map((b) => b.iban),
        datasets: [
          {
            label: "Account Balance (€)",
            data: this.balances.map((b) => b.balance || 0),
            borderColor: "#10B981",
            backgroundColor: "rgba(16,185,129,0.3)",
            fill: true,
            tension: 0.3,
          },
        ],
      };
    },

    // === HELPERS ===
    barChart(items, labelKey, valueKey, color) {
      return {
        labels: items.map((i) => i[labelKey] || "Unknown"),
        datasets: [{ data: items.map((i) => i[valueKey] || 0), backgroundColor: color, borderRadius: 6 }],
      };
    },
    pieChart(labels, data) {
      return {
        labels,
        datasets: [{ data, backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"] }],
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
        plugins: { legend: { display: false } },
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
