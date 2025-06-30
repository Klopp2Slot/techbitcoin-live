async function getCoinData() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    document.getElementById('coin-name').textContent = 'Coin not found';
    return;
  }

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  const data = await res.json();

  document.getElementById('coin-name').textContent = `${data.name} (${data.symbol.toUpperCase()})`;
  document.getElementById('coin-description').innerHTML = data.description.en?.split('. ')[0] || 'No description.';
  document.getElementById('coin-price').textContent = data.market_data.current_price.usd.toLocaleString();
  document.getElementById('coin-market-cap').textContent = data.market_data.market_cap.usd.toLocaleString();
  document.getElementById('coin-volume').textContent = data.market_data.total_volume.usd.toLocaleString();
}

getCoinData();
