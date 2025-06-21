
const container = document.getElementById("crypto-container");

async function fetchCryptoData() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,litecoin,dogecoin,solana,cardano&order=market_cap_desc"
  );
  const data = await response.json();

  container.innerHTML = "";

  data.forEach((coin) => {
    const coinDiv = document.createElement("div");
    coinDiv.className = "crypto";

    const priceClass = coin.price_change_percentage_24h >= 0 ? "green" : "red";

    coinDiv.innerHTML = `
      <div class="crypto-name">
        <img src="${coin.image}" alt="${coin.name}" />
        ${coin.name} (${coin.symbol.toUpperCase()})
      </div>
      <div class="price">
        $${coin.current_price.toLocaleString()}<br>
        <span class="${priceClass}">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
    `;

    container.appendChild(coinDiv);
  });
}

fetchCryptoData();
setInterval(fetchCryptoData, 60000); // Refresh every 60s
