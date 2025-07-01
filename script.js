
async function loadCryptoData() {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const tbody = document.querySelector('#crypto-table tbody');
    tbody.innerHTML = '';

    data.forEach((coin, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><a href="coins/${coin.id}.html">${coin.name} (${coin.symbol.toUpperCase()})</a></td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td style="color:${coin.price_change_percentage_1h_in_currency >= 0 ? 'green' : 'red'};">
          ${coin.price_change_percentage_1h_in_currency?.toFixed(2) ?? 'N/A'}%
        </td>
        <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'};">
          ${coin.price_change_percentage_24h?.toFixed(2) ?? 'N/A'}%
        </td>
        <td style="color:${coin.price_change_percentage_7d_in_currency >= 0 ? 'green' : 'red'};">
          ${coin.price_change_percentage_7d_in_currency?.toFixed(2) ?? 'N/A'}%
        </td>
        <td>$${coin.market_cap.toLocaleString()}</td>
        <td>$${coin.total_volume.toLocaleString()}</td>
        <td><img src="${coin.sparkline_in_7d?.price ? `https://quickchart.io/chart?c={type:'sparkline',data:{datasets:[{data:[${coin.sparkline_in_7d.price.join(',')}]}]}}` : ''}" width="80"/></td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Failed to load data:", err);
  }
}
loadCryptoData();
