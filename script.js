const API_URL = "https://api.coingecko.com/api/v3/coins/markets";
const table = document.querySelector("#crypto-table tbody");
const loader = document.getElementById("loader");

fetch(`${API_URL}?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h,24h,7d`)
  .then(res => res.json())
  .then(data => {
    loader.style.display = "none";
    document.getElementById("crypto-table").style.display = "table";

    data.forEach((coin, index) => {
      const row = document.createElement("tr");

      const color = (val) =>
        val === null
          ? "gray"
          : val >= 0
          ? "green"
          : "red";

      row.innerHTML = `
        <td>${index + 1}</td>
        <td><img src="${coin.image}" width="20" alt="${coin.name} logo" /> ${coin.name} (${coin.symbol.toUpperCase()})</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td style="color:${color(coin.price_change_percentage_1h_in_currency)};">
          ${coin.price_change_percentage_1h_in_currency?.toFixed(2) ?? "N/A"}%
        </td>
        <td style="color:${color(coin.price_change_percentage_24h_in_currency)};">
          ${coin.price_change_percentage_24h_in_currency?.toFixed(2) ?? "N/A"}%
        </td>
        <td style="color:${color(coin.price_change_percentage_7d_in_currency)};">
          ${coin.price_change_percentage_7d_in_currency?.toFixed(2) ?? "N/A"}%
        </td>
      `;
      table.appendChild(row);
    });
  })
  .catch((err) => {
    loader.textContent = "Failed to load data.";
    console.error(err);
  });
