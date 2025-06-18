
document.addEventListener("DOMContentLoaded", () => {
  const marketTableBody = document.querySelector("#coin-table tbody");
  const gainersList = document.getElementById("gainers-list");
  const losersList = document.getElementById("losers-list");
  const searchInput = document.getElementById("search");

  function showSection(id) {
    document.querySelectorAll("main section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }
  window.showSection = showSection;

  function loadMarketData() {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1")
      .then(res => res.json())
      .then(data => {
        marketTableBody.innerHTML = "";
        data.forEach((coin, i) => {
          const row = `<tr>
            <td>${i + 1}</td>
            <td><img src="${coin.image}" alt="${coin.name}" width="20"> ${coin.name}</td>
            <td>$${coin.current_price.toLocaleString()}</td>
            <td style="color:${coin.price_change_percentage_24h >= 0 ? 'lime' : 'red'}">
              ${coin.price_change_percentage_24h.toFixed(2)}%
            </td>
            <td>$${coin.market_cap.toLocaleString()}</td>
          </tr>`;
          marketTableBody.insertAdjacentHTML("beforeend", row);
        });

        searchInput.addEventListener("input", () => {
          const search = searchInput.value.toLowerCase();
          document.querySelectorAll("#coin-table tbody tr").forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(search) ? "" : "none";
          });
        });
      });
  }

  function loadMovers(type, container) {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=percent_change_24h_desc&per_page=100&page=1")
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) =>
          type === "gainers" ? b.price_change_percentage_24h - a.price_change_percentage_24h :
                               a.price_change_percentage_24h - b.price_change_percentage_24h
        ).slice(0, 10);
        container.innerHTML = "";
        sorted.forEach(coin => {
          const item = `<li>${coin.name}: ${coin.price_change_percentage_24h.toFixed(2)}%</li>`;
          container.insertAdjacentHTML("beforeend", item);
        });
      });
  }

  loadMarketData();
  loadMovers("gainers", gainersList);
  loadMovers("losers", losersList);
});
