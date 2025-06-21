
let currentPage = 1;
const perPage = 20;

async function fetchCryptoData(page = 1) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h,24h,7d`
  );
  const data = await response.json();

  const tableBody = document.getElementById("crypto-table");
  tableBody.innerHTML = "";
  document.getElementById("page-number").innerText = "Page " + currentPage;

  data.forEach((coin, index) => {
    const row = document.createElement("tr");

    const formatChange = (value) => {
      if (value === null || value === undefined) return "N/A";
      const cls = value >= 0 ? "green" : "red";
      return `<span class="${cls}">${value.toFixed(2)}%</span>`;
    };

    row.innerHTML = `
      <td>${(page - 1) * perPage + index + 1}</td>
      <td><img src="${coin.image}" alt="${coin.name}" /> ${coin.name} (${coin.symbol.toUpperCase()})</td>
      <td>$${coin.current_price.toLocaleString()}</td>
      <td>${formatChange(coin.price_change_percentage_1h_in_currency)}</td>
      <td>${formatChange(coin.price_change_percentage_24h_in_currency)}</td>
      <td>${formatChange(coin.price_change_percentage_7d_in_currency)}</td>
    `;

    tableBody.appendChild(row);
  });
}

function changePage(direction) {
  currentPage += direction;
  if (currentPage < 1) currentPage = 1;
  fetchCryptoData(currentPage);
}

fetchCryptoData(currentPage);
