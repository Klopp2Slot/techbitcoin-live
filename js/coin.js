const urlParams = new URLSearchParams(window.location.search);
const coinId = urlParams.get('coin');
document.getElementById('coin-name').textContent = coinId;

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('coin-name').textContent = data.name;
    document.getElementById('coin-details').innerHTML = `
      <p>Symbol: ${data.symbol.toUpperCase()}</p>
      <p>Current Price: $${data.market_data.current_price.usd.toLocaleString()}</p>
      <p>All Time High: $${data.market_data.ath.usd.toLocaleString()}</p>
      <p>Description: ${data.description.en.split('. ')[0]}.</p>
    `;
  });
