const planos = {
  1:   0.0025,
  30:  0.0030,
  90:  0.0035,
  180: 0.0040,
  360: 0.0050
};

const taxaRendimentos = 0.002; // 0,2%

function calcular(capital, taxaCapital, dias) {
  let rendimentos = 0;

  for (let d = 1; d <= dias; d++) {
    let ganhoCapital = capital * taxaCapital;
    let ganhoRendimentos = d >= 2 ? rendimentos * taxaRendimentos : 0;
    rendimentos += ganhoCapital + ganhoRendimentos;
  }

  return rendimentos;
}

function simular() {
  const aporte = parseFloat(document.getElementById("aporte").value);
  const dolar = parseFloat(document.getElementById("dolar").value);
  const prazo = parseInt(document.getElementById("prazo").value);

  if (!aporte || !dolar) {
    alert("Preencha todos os campos");
    return;
  }

  const precoUSDT = dolar * 1.01964;
  const capitalUSDT = aporte / precoUSDT;
  const taxaCapital = planos[prazo];

  const lucro30 = calcular(capitalUSDT, taxaCapital, 30);
  const lucroPrazo = calcular(capitalUSDT, taxaCapital, prazo);

  const resultado = document.getElementById("resultado");
  resultado.style.display = "block";
  resultado.innerHTML = `
    <h3>Resultado em 30 dias</h3>
    Lucro: ${lucro30.toFixed(4)} USDT<br>
    Lucro: R$ ${(lucro30 * dolar).toFixed(2)}<br><br>

    <h3>Resultado em ${prazo} dias</h3>
    Lucro: ${lucroPrazo.toFixed(4)} USDT<br>
    Lucro: R$ ${(lucroPrazo * dolar).toFixed(2)}<br>
  `;
}