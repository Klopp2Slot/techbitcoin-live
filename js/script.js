
let allCoins = [];

function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

function filterCoins() {
  const term = document.getElementById('search').value.toLowerCase();
  const filtered = allCoins.filter(c => c.name.toLowerCase().includes(term));
  renderCoins(filtered);
}

function renderCoins(coins) {
  const body = document.getElementById("coinBody");
  body.innerHTML = coins.map((coin, i) => \`
    <tr>
      <td>\${i + 1}</td>
      <td><img src="\${coin.image}" width="20"/> \${coin.name}</td>
      <td>$\${coin.current_price.toLocaleString()}</td>
      <td style="color:\${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
        \${coin.price_change_percentage_24h?.toFixed(2)}%
      </td>
      <td>$\${coin.market_cap.toLocaleString()}</td>
    </tr>
  \`).join('');
}

function populateMovers(data) {
  const gainers = [...data].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 50);
  const losers = [...data].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 50);

  document.getElementById("gainersBody").innerHTML = gainers.map(coin => \`
    <tr><td>\${coin.name}</td><td>$\${coin.current_price.toLocaleString()}</td>
    <td style="color:green">\${coin.price_change_percentage_24h?.toFixed(2)}%</td></tr>\`).join('');

  document.getElementById("losersBody").innerHTML = losers.map(coin => \`
    <tr><td>\${coin.name}</td><td>$\${coin.current_price.toLocaleString()}</td>
    <td style="color:red">\${coin.price_change_percentage_24h?.toFixed(2)}%</td></tr>\`).join('');
}

async function fetchCoins() {
  let coins = [];
  for (let page = 1; page <= 20; page++) {
    const res = await fetch(\`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=\${page}&sparkline=false\`);
    const data = await res.json();
    coins = coins.concat(data);
  }
  allCoins = coins;
  renderCoins(coins);
  populateMovers(coins);
}

fetchCoins();
