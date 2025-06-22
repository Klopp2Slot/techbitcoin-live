let currentPage = 1;
const perPage = 20;
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

document.getElementById("category-title").innerText = category.replace(/-/g, ' ').toUpperCase();

async function fetchCategoryData(page = 1) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${category}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d`
  );
  const data = await res.json();
  const tableBody = document.getElementById("category-table");
  tableBody.innerHTML = "";
  document.getElementById("category-page-number").innerText = "Page " + currentPage;

  data.forEach((coin, index) => {
    const row = document.createElement("tr");
    row.style.cursor = "pointer";
    row.onclick = () => window.location.href = `coin.html?id=${coin.id}`;

    const formatChange = (val) => {
      if (val === null || val === undefined) return "N/A";
      const cls = val >= 0 ? "green" : "red";
      return `<span class="${cls}">${val.toFixed(2)}%</span>`;
    };

    const drawSparkline = (prices) => {
      const max = Math.max(...prices), min = Math.min(...prices);
      const range = max - min;
      const points = prices.map((p, i) => {
        const x = (i / (prices.length - 1)) * 100;
        const y = 30 - ((p - min) / range) * 30;
        return [x.toFixed(2), y.toFixed(2)];
      });
      const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
      return `<svg width="100" height="30"><path d="${path}" stroke="gray" fill="none" stroke-width="1.5"/></svg>`;
    };

    row.innerHTML = `
      <td>${(page - 1) * perPage + index + 1}</td>
      <td><img src="${coin.image}" alt="${coin.name}" width="24"/> ${coin.name} (${coin.symbol.toUpperCase()})</td>
      <td>$${coin.current_price.toLocaleString()}</td>
      <td>${formatChange(coin.price_change_percentage_1h_in_currency)}</td>
      <td>${formatChange(coin.price_change_percentage_24h_in_currency)}</td>
      <td>${formatChange(coin.price_change_percentage_7d_in_currency)}</td>
      <td>$${coin.total_volume.toLocaleString()}</td>
      <td>$${coin.market_cap.toLocaleString()}</td>
      <td>${drawSparkline(coin.sparkline_in_7d.price)}</td>
    `;
    tableBody.appendChild(row);
  });
}

function changeCategoryPage(dir) {
  currentPage += dir;
  if (currentPage < 1) currentPage = 1;
  fetchCategoryData(currentPage);
}

fetchCategoryData(currentPage);
