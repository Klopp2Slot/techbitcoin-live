
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

document.addEventListener("DOMContentLoaded", () => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#coinTable tbody");
      data.forEach((coin, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${coin.name} (${coin.symbol.toUpperCase()})</td>
          <td>$${coin.current_price.toLocaleString()}</td>
          <td>${coin.price_change_percentage_1h_in_currency?.toFixed(2) ?? 'N/A'}%</td>
          <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
          <td>${coin.price_change_percentage_7d_in_currency?.toFixed(2) ?? 'N/A'}%</td>
          <td>$${coin.market_cap.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
      });
    });

  document.getElementById("searchInput").addEventListener("input", function () {
    const value = this.value.toLowerCase();
    const rows = document.querySelectorAll("#coinTable tbody tr");
    rows.forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(value) ? "" : "none";
    });
  });
});

function showSection(sectionId) {
  document.querySelectorAll("main section").forEach(section => {
    section.className = section.id === sectionId ? "visible" : "hidden";
  });
}
