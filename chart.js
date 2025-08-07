let monthlyChart, yearlyChart;

function updateCharts() {
  const data = getData();
  const monthly = {};
  const yearly = {};

  data.forEach(item => {
    const date = new Date(item.tanggal);
    const ym = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`;
    const y = `${date.getFullYear()}`;

    if (!monthly[ym]) monthly[ym] = { reward: 0, cost: 0 };
    if (!yearly[y]) yearly[y] = { reward: 0, cost: 0 };

    monthly[ym].reward += item.reward;
    monthly[ym].cost += item.cost;

    yearly[y].reward += item.reward;
    yearly[y].cost += item.cost;
  });

  // Monthly chart
  const mLabels = Object.keys(monthly);
  const mRewards = mLabels.map(k => monthly[k].reward);
  const mCosts = mLabels.map(k => monthly[k].cost);

  if (monthlyChart) monthlyChart.destroy();
  monthlyChart = new Chart(document.getElementById("monthlyChart"), {
    type: "bar",
    data: {
      labels: mLabels,
      datasets: [
        { label: "Reward", data: mRewards, backgroundColor: "skyblue" },
        { label: "Cost", data: mCosts, backgroundColor: "pink" },
      ]
    }
  });

  // Yearly chart
  const yLabels = Object.keys(yearly);
  const yRewards = yLabels.map(k => yearly[k].reward);
  const yCosts = yLabels.map(k => yearly[k].cost);

  if (yearlyChart) yearlyChart.destroy();
  yearlyChart = new Chart(document.getElementById("yearlyChart"), {
    type: "bar",
    data: {
      labels: yLabels,
      datasets: [
        { label: "Reward", data: yRewards, backgroundColor: "skyblue" },
        { label: "Cost", data: yCosts, backgroundColor: "pink" },
      ]
    }
  });
}

function updateMonthlyAndYearlyIncome() {
  const data = getData();
  const monthlyIncome = {};
  let yearlyIncome = 0;

  data.forEach(item => {
    const date = new Date(item.tanggal);
    const ym = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const net = parseFloat(item.net);

    if (!monthlyIncome[ym]) monthlyIncome[ym] = 0;
    monthlyIncome[ym] += net;
    yearlyIncome += net;
  });

  const lastMonth = Object.keys(monthlyIncome).pop();
  const lastMonthIncome = monthlyIncome[lastMonth] || 0;

  document.getElementById("monthlyIncome").innerText = `$${lastMonthIncome.toFixed(2)}`;
  document.getElementById("yearlyIncome").innerText = `$${yearlyIncome.toFixed(2)}`;
}