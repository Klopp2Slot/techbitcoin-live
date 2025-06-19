
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&price_change_percentage=1h,24h,7d';

document.addEventListener("DOMContentLoaded", () => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#coinTable tbody");
      const gainers = [...data].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 5);
      const losers = [...data].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 5);

      data.forEach((coin, index) => {
        const row = document.createElement("tr");
        const class1h = coin.price_change_percentage_1h_in_currency >= 0 ? 'green' : 'red';
        const class24h = coin.price_change_percentage_24h >= 0 ? 'green' : 'red';
        const class7d = coin.price_change_percentage_7d_in_currency >= 0 ? 'green' : 'red';

        row.innerHTML = `
          <td>${index + 1}</td>
          <td><img src="${coin.image}" alt="${coin.name}"></td>
          <td>${coin.name} (${coin.symbol.toUpperCase()})</td>
          <td>$${coin.current_price.toLocaleString()}</td>
          <td class="${class1h}">${coin.price_change_percentage_1h_in_currency?.toFixed(2) ?? 'N/A'}%</td>
          <td class="${class24h}">${coin.price_change_percentage_24h?.toFixed(2)}%</td>
          <td class="${class7d}">${coin.price_change_percentage_7d_in_currency?.toFixed(2) ?? 'N/A'}%</td>
          <td>$${coin.market_cap.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
      });

      const gainersList = document.getElementById("gainersList");
      gainers.forEach(coin => {
        const item = document.createElement("li");
        item.innerHTML = `<img src="${coin.image}" alt="${coin.name}" /> ${coin.name}: <span class="green">${coin.price_change_percentage_24h.toFixed(2)}%</span>`;
        gainersList.appendChild(item);
      });

      const losersList = document.getElementById("losersList");
      losers.forEach(coin => {
        const item = document.createElement("li");
        item.innerHTML = `<img src="${coin.image}" alt="${coin.name}" /> ${coin.name}: <span class="red">${coin.price_change_percentage_24h.toFixed(2)}%</span>`;
        losersList.appendChild(item);
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
