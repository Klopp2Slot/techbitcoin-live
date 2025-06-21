
const params = new URLSearchParams(window.location.search);
const coinId = params.get("id");

async function loadCoinDetails() {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
  const data = await res.json();

  document.getElementById("coin-name").innerText = data.name + " (" + data.symbol.toUpperCase() + ")";
  document.getElementById("coin-info").innerHTML = `
    <img src="${data.image.large}" alt="${data.name}" style="width:50px">
    <p>Current Price: $${data.market_data.current_price.usd.toLocaleString()}</p>
    <p>Market Cap: $${data.market_data.market_cap.usd.toLocaleString()}</p>
    <p>24h High: $${data.market_data.high_24h.usd}</p>
    <p>24h Low: $${data.market_data.low_24h.usd}</p>
  `;

  const prices = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
  const priceData = await prices.json();

  const labels = priceData.prices.map(p => new Date(p[0]).toLocaleDateString());
  const dataPoints = priceData.prices.map(p => p[1]);

  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Price (USD)',
        data: dataPoints,
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { display: true },
        y: { display: true }
      }
    }
  });
}

loadCoinDetails();
