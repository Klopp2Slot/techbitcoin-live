async function toggleView(view) {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
  const data = await response.json();
  let html = '<table><tr><th>#</th><th>Coin</th><th>Price</th><th>24h</th></tr>';
  data.forEach((coin, index) => {
    html += `<tr><td>${index+1}</td><td><a href='pages/${coin.id}.html'>${coin.name}</a></td><td>$${coin.current_price}</td><td>${coin.price_change_percentage_24h.toFixed(2)}%</td></tr>`;
  });
  html += '</table>';
  document.getElementById('coinTable').innerHTML = html;
}
toggleView('marketCap');