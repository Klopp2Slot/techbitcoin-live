let allData = [];
const perPage = 100;
let currentPage = 1;

async function fetchAllData() {
  allData = [];
  for (let page = 1; page <= 4; page++) {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d`;
    const res = await fetch(url);
    const data = await res.json();
    allData = allData.concat(data);
  }
  showPage(1);
  renderPagination();
}

function renderPagination() {
  const pageCount = Math.ceil(allData.length / perPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.onclick = () => showPage(i);
    if (i === currentPage) btn.disabled = true;
    pagination.appendChild(btn);
  }
}

function showPage(page) {
  currentPage = page;
  const tbody = document.querySelector('#crypto-table tbody');
  tbody.innerHTML = '';

  const start = (page - 1) * perPage;
  const end = start + perPage;

  allData.slice(start, end).forEach((coin, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${start + index + 1}</td>
      <td><a href="coin.html?id=${coin.id}"><img src="${coin.image}" width="20" /> ${coin.name}</a></td>
      <td>$${coin.current_price.toLocaleString()}</td>
      <td style="color:${coin.price_change_percentage_1h_in_currency >= 0 ? 'green' : 'red'}">
        ${coin.price_change_percentage_1h_in_currency?.toFixed(2) ?? 'N/A'}%
      </td>
      <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
        ${coin.price_change_percentage_24h?.toFixed(2) ?? 'N/A'}%
      </td>
      <td style="color:${coin.price_change_percentage_7d_in_currency >= 0 ? 'green' : 'red'}">
        ${coin.price_change_percentage_7d_in_currency?.toFixed(2) ?? 'N/A'}%
      </td>
      <td>$${coin.market_cap.toLocaleString()}</td>
      <td>$${coin.total_volume.toLocaleString()}</td>
      <td><canvas id="sparkline-${coin.id}" width="100" height="30"></canvas></td>
    `;
    tbody.appendChild(row);

    const ctx = document.getElementById(`sparkline-${coin.id}`).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array(coin.sparkline_in_7d.price.length).fill(''),
        datasets: [{
          data: coin.sparkline_in_7d.price,
          borderColor: 'blue',
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        plugins: { legend: { display: false }},
        elements: { point: { radius: 0 }},
        scales: { x: { display: false }, y: { display: false }}
      }
    });
  });
}

fetchAllData();
