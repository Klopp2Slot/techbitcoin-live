
let currentPage = 1;
let currentView = "market";
let currentCategory = "real-world-assets";

function switchView(view) {
  currentView = view;
  currentPage = 1;
  fetchData();
}

function changePage(delta) {
  currentPage += delta;
  if (currentPage < 1) currentPage = 1;
  fetchData();
}

function fetchData() {
  document.getElementById("crypto-table").innerHTML = "Loading coins...";
  document.getElementById("page-number").innerText = "Page " + currentPage;
  let url = currentView === "market"
    ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${currentPage}&sparkline=true&price_change_percentage=1h,24h,7d`
    : `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${currentCategory}&order=market_cap_desc&per_page=20&page=${currentPage}&sparkline=true&price_change_percentage=1h,24h,7d`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const table = `
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>1h %</th>
              <th>24h %</th>
              <th>7d %</th>
              <th>Volume (24h)</th>
              <th>Market Cap</th>
              <th>7d Chart</th>
            </tr>
          </thead>
          <tbody>
            ${data.map((coin, index) => `
              <tr>
                <td>${(currentPage - 1) * 20 + index + 1}</td>
                <td><img src="${coin.image}" width="20" /> ${coin.name} (${coin.symbol.toUpperCase()})</td>
                <td>$${coin.current_price.toLocaleString()}</td>
                <td style="color:${coin.price_change_percentage_1h_in_currency >= 0 ? 'green' : 'red'}">${coin.price_change_percentage_1h_in_currency?.toFixed(2)}%</td>
                <td style="color:${coin.price_change_percentage_24h_in_currency >= 0 ? 'green' : 'red'}">${coin.price_change_percentage_24h_in_currency?.toFixed(2)}%</td>
                <td style="color:${coin.price_change_percentage_7d_in_currency >= 0 ? 'green' : 'red'}">${coin.price_change_percentage_7d_in_currency?.toFixed(2)}%</td>
                <td>$${coin.total_volume.toLocaleString()}</td>
                <td>$${coin.market_cap.toLocaleString()}</td>
                <td><img src="https://www.coingecko.com/coins/${coin.id}/sparkline" height="24" /></td>
              </tr>`).join('')}
          </tbody>
        </table>`;
      document.getElementById("crypto-table").innerHTML = table;
    });
}

document.addEventListener("DOMContentLoaded", fetchData);
