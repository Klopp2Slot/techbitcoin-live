// Fetch top 100 coins with extended data and sparklines
fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d")
  .then(res => res.json())
  .then(data => displayCoins(data))
  .catch(err => console.error("Error fetching data:", err));

// Main display function
function displayCoins(coins) {
  const tbody = document.getElementById("coin-data");
  tbody.innerHTML = "";

  coins.forEach((coin, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td><img src="${coin.image}" width="24" height="24"/></td>
      <td>${coin.name} (${coin.symbol.toUpperCase()})</td>
      <td>$${coin.current_price.toLocaleString()}</td>
      <td class="${colorClass(coin.price_change_percentage_1h_in_currency)}">${coin.price_change_percentage_1h_in_currency?.toFixed(2)}%</td>
      <td class="${colorClass(coin.price_change_percentage_24h_in_currency)}">${coin.price_change_percentage_24h_in_currency?.toFixed(2)}%</td>
      <td class="${colorClass(coin.price_change_percentage_7d_in_currency)}">${coin.price_change_percentage_7d_in_currency?.toFixed(2)}%</td>
      <td>$${coin.total_volume.toLocaleString()}</td>
      <td>$${coin.market_cap.toLocaleString()}</td>
      <td><canvas id="spark-${index}" width="100" height="30"></canvas></td>
    `;

    tbody.appendChild(row);
    drawSparkline(`spark-${index}`, coin.sparkline_in_7d.price);
  });
}

// Helper to color % changes
function colorClass(value) {
  if (value == null) return "";
  return value >= 0 ? "green" : "red";
}

// Draw 7d sparkline chart
function drawSparkline(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i),
      datasets: [{
        data: data,
        borderColor: '#4caf50',
        borderWidth: 1,
        fill: false,
        pointRadius: 0,
        tension: 0.3
      }]
    },
    options: {
      responsive: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}
