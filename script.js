async function loadCryptoData() {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true';
  try {
    const response = await fetch(url);
    const data = await response.json();

    const tbody = document.querySelector('#crypto-table tbody');
    tbody.innerHTML = '';

    data.forEach((coin, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><a href="coins/${coin.id}.html">${coin.name}</a></td>
        <td>$${coin.current_price}</td>
        <td>${coin.price_change_percentage_1h_in_currency?.toFixed(2) || "N/A"}%</td>
        <td>${coin.price_change_percentage_24h?.toFixed(2) || "N/A"}%</td>
        <td>${coin.price_change_percentage_7d_in_currency?.toFixed(2) || "N/A"}%</td>
        <td>$${coin.market_cap.toLocaleString()}</td>
        <td>$${coin.total_volume.toLocaleString()}</td>
        <td><img src="${coin.sparkline_in_7d?.price?.length ? 'https://www.coingecko.com/coins/' + coin.id + '/sparkline' : ''}" width="80"/></td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
loadCryptoData();
