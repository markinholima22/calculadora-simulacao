// Taxas diárias aplicadas SOMENTE sobre o capital, conforme o prazo escolhido
const planos = {
  1:   0.0025, // 0,25% ao dia
  30:  0.0030, // 0,30% ao dia
  90:  0.0035, // 0,35% ao dia
  180: 0.0040, // 0,40% ao dia
  360: 0.0050  // 0,50% ao dia
};

// Taxa aplicada SOMENTE sobre os rendimentos (a partir do 2º dia)
const taxaRendimentos = 0.002; // 0,2%

// Taxa de retirada aplicada SOMENTE sobre os rendimentos
const taxaRetirada = 0.05; // 5%

// Função principal de cálculo
function calcular(capital, taxaCapital, dias) {
  let rendimentos = 0;

  for (let d = 1; d <= dias; d++) {
    // Ganho diário sobre o capital (capital nunca cresce)
    const ganhoCapital = capital * taxaCapital;

    // Ganho sobre rendimentos apenas a partir do 2º dia
    const ganhoRendimentos = d >= 2 ? rendimentos * taxaRendimentos : 0;

    // Soma dos ganhos do dia
    rendimentos += ganhoCapital + ganhoRendimentos;
  }

  return rendimentos;
}

// Função chamada pelo botão "Simular"
function simular() {
  const aporte = parseFloat(document.getElementById("aporte").value);
  const dolar = parseFloat(document.getElementById("dolar").value);
  const prazo = parseInt(document.getElementById("prazo").value);

  if (!aporte || !dolar || !prazo) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  // Conversão BRL -> USDT com spread
  const precoUSDT = dolar * 1.01964;
  const capitalUSDT = aporte / precoUSDT;

  // Taxa conforme o plano escolhido
  const taxaCapital = planos[prazo];

  // Cálculos
  const lucro30Bruto = calcular(capitalUSDT, taxaCapital, 30);
  const lucroPrazoBruto = calcular(capitalUSDT, taxaCapital, prazo);

  // Aplicação da taxa de retirada (5%) SOMENTE sobre os rendimentos
  const lucro30Liquido = lucro30Bruto * (1 - taxaRetirada);
  const lucroPrazoLiquido = lucroPrazoBruto * (1 - taxaRetirada);

  // Exibição do resultado
  const resultado = document.getElementById("resultado");
  resultado.style.display = "block";
  resultado.innerHTML = `
    <h3>Resultado em 30 dias</h3>
    Lucro bruto: ${lucro30Bruto.toFixed(4)} USDT<br>
    Lucro líquido (–5%): ${lucro30Liquido.toFixed(4)} USDT<br>
    Lucro líquido: R$ ${(lucro30Liquido * dolar).toFixed(2)}<br><br>

    <h3>Resultado em ${prazo} dias</h3>
    Lucro bruto: ${lucroPrazoBruto.toFixed(4)} USDT<br>
    Lucro líquido (–5%): ${lucroPrazoLiquido.toFixed(4)} USDT<br>
    Lucro líquido: R$ ${(lucroPrazoLiquido * dolar).toFixed(2)}<br>
  `;
}
    Lucro: ${lucroPrazo.toFixed(4)} USDT<br>
    Lucro: R$ ${(lucroPrazo * dolar).toFixed(2)}<br>
  `;

}
