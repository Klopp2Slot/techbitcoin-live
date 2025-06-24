
function toggleView(view) {
  document.getElementById('content').innerHTML = '<p>Loading ' + view + ' data...</p>';
  setTimeout(() => {
    document.getElementById('content').innerHTML = 
      '<table><tr><th>#</th><th>Coin</th><th>Price</th><th>24h</th></tr>' +
      '<tr><td>1</td><td><a href="pages/coin.html">Bitcoin</a></td><td>$65,000</td><td class="green">+2.5%</td></tr>' +
      '<tr><td>2</td><td><a href="pages/coin.html">Ethereum</a></td><td>$3,500</td><td class="red">-1.2%</td></tr>' +
      '</table>';
  }, 1000);
}
window.onload = () => toggleView('market');
