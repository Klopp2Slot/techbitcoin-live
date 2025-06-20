fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#coinTable tbody');
    data.forEach((coin, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><a href="pages/coin.html?coin=${coin.id}">${coin.name} (${coin.symbol.toUpperCase()})</a></td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td>${coin.price_change_percentage_1h_in_currency?.toFixed(2) || 'n/a'}%</td>
        <td>${coin.price_change_percentage_24h_in_currency?.toFixed(2) || 'n/a'}%</td>
        <td>${coin.price_change_percentage_7d_in_currency?.toFixed(2) || 'n/a'}%</td>
      `;
      tbody.appendChild(row);
    });
  });
