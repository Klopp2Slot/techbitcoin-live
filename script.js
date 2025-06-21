
let currentPage = 1;
const perPage = 20;

async function fetchCryptoData(page = 1) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d`
  );
  const data = await response.json();

  const tableBody = document.getElementById("crypto-table");
  tableBody.innerHTML = "";
  document.getElementById("page-number").innerText = "Page " + currentPage;

  data.forEach((coin, index) => {
    const row = document.createElement("tr");
    row.style.cursor = "pointer";
    row.onclick = () => window.location.href = `coin.html?id=${coin.id}`;

    const formatChange = (value) => {
      if (value === null || value === undefined) return "N/A";
      const cls = value >= 0 ? "green" : "red";
      return `<span class="${cls}">${value.toFixed(2)}%</span>`;
    };

    const drawSparkline = (data) => {
      const max = Math.max(...data);
      const min = Math.min(...data);
      const range = max - min;
      const width = 100, height = 30;
      const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((d - min) / range) * height;
        return [x.toFixed(2), y.toFixed(2)];
      });
      const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
      return `<svg width="${width}" height="${height}"><path d="${path}" fill="none" stroke="gray" stroke-width="1.5"/></svg>`;
    };

    row.innerHTML = `
      <td>${(page - 1) * perPage + index + 1}</td>
      <td><img src="${coin.image}" alt="${coin.name}" /> ${coin.name} (${coin.symbol.toUpperCase()})</td>
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

function changePage(direction) {
  currentPage += direction;
  if (currentPage < 1) currentPage = 1;
  fetchCryptoData(currentPage);
}

fetchCryptoData(currentPage);
