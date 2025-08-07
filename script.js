function getData() {
  return JSON.parse(localStorage.getItem("airdrops") || "[]");
}

function saveData(data) {
  localStorage.setItem("airdrops", JSON.stringify(data));
}

function addData() {
  const data = getData();
  const item = {
    project: document.getElementById("project").value,
    kategori: document.getElementById("kategori").value,
    tanggal: document.getElementById("tanggal").value,
    status: document.getElementById("status").value,
    wallet: document.getElementById("wallet").value,
    source: document.getElementById("source").value,
    reward: parseFloat(document.getElementById("reward").value) || 0,
    cost: parseFloat(document.getElementById("cost").value) || 0,
    note: document.getElementById("note").value,
    net: 0
  };
  item.net = item.reward - item.cost;
  data.push(item);
  saveData(data);
  updateTable();
  updateCharts();
  updateMonthlyAndYearlyIncome();
  clearForm();
}

function deleteData(index) {
  const data = getData();
  data.splice(index, 1);
  saveData(data);
  updateTable();
  updateCharts();
  updateMonthlyAndYearlyIncome();
}

function updateTable() {
  const tbody = document.querySelector("#airdropTable tbody");
  const data = getData();
  tbody.innerHTML = "";
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.project}</td>
      <td>${item.kategori}</td>
      <td>${item.tanggal}</td>
      <td>${item.status}</td>
      <td>${item.wallet}</td>
      <td><a href="${item.source}" target="_blank">Link</a></td>
      <td>${item.reward}</td>
      <td>${item.cost}</td>
      <td>${item.net}</td>
      <td><button onclick="deleteData(${index})">❌</button></td>
    `;
    tbody.appendChild(row);
  });
}

function clearForm() {
  document.querySelectorAll("input").forEach(input => input.value = "");
  document.getElementById("kategori").value = "";
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// Call on load
updateTable();
updateCharts();
updateMonthlyAndYearlyIncome();