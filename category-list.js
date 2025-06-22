
async function loadCategories() {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/categories");
  const data = await res.json();
  const table = document.getElementById("category-list-table");
  table.innerHTML = "";

  data.sort((a, b) => b.market_cap - a.market_cap);

  data.forEach((cat, index) => {
    const row = document.createElement("tr");
    row.style.cursor = "pointer";
    row.onclick = () => window.location.href = `category.html?category=${cat.id}`;
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${cat.name}</td>
      <td>$${cat.market_cap.toLocaleString()}</td>
      <td style="color:${cat.percent_change_1h >= 0 ? 'green' : 'red'}">${cat.percent_change_1h.toFixed(2)}%</td>
      <td style="color:${cat.percent_change_24h >= 0 ? 'green' : 'red'}">${cat.percent_change_24h.toFixed(2)}%</td>
      <td style="color:${cat.percent_change_7d >= 0 ? 'green' : 'red'}">${cat.percent_change_7d.toFixed(2)}%</td>
    `;
    table.appendChild(row);
  });
}

loadCategories();
