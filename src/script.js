const de = document.getElementById("de");
const para = document.getElementById("para");
const moedainput = document.getElementById("moedainput");
const res = document.getElementById("res");

let Moeda1;
let Moeda2;

function getMoeda() {
  let selec = document.getElementById("selec");
  if (Moeda1 == "select" || Moeda2 == "select") {
    selec.innerHTML = `Você precisa selecionar as moedas`;
    selec.style.visibility = "Visible";
    hideselec();
    return;
  }

  if (Moeda1 == Moeda2) {
    selec.innerHTML = `Você selecionou duas moedas iguais`;
    selec.style.visibility = "Visible";
    hideselec();
    return;
  }

  function hideselec() {
    setTimeout(function () {
      //tira a menssagem depois de 5 segundos
      selec.style.visibility = "hidden";
    }, 2000);
  }

  let cotacaourl = "https://economia.awesomeapi.com.br/json/last/";
  fetch(`${cotacaourl}${Moeda1}-${Moeda2}`)
    .then((res) => res.json())
    .then((json) => Converter(json));
}

function converterParaBTC(result) {
  let valorBTC = Number(result[`${Moeda1}`].last);

  let multiTObtc = parseFloat(moedainput.value) / valorBTC;

  let convertToBTC = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: Moeda2,
    minimumFractionDigits: 8
  });

  res.innerHTML = `
    <div>
    ${convertToBTC.format(multiTObtc).replace(/BTC/, "Ƀ")}
    </div>`;

  res.style.visibility = "Visible";
}

function converterBTC(result) {
  let valorBTC = Number(result[`${Moeda2}`].last);

  let multi = parseFloat(moedainput.value) * valorBTC;

  let convert = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: Moeda2
  });

  res.innerHTML = `
    <div>
    ${convert.format(multi).replace(/BTC/, "Ƀ")}
    </div>`;

  res.style.visibility = "Visible";
}

function Converter(result) {
  let valorDaMoeda = Number(result[`${Moeda1}${Moeda2}`]?.ask);

  let multi = parseFloat(moedainput.value) * valorDaMoeda;

  let convert = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: Moeda2
  });

  res.innerHTML = `
    <div>
    ${convert.format(multi)}
    </div>`;

  res.style.visibility = "Visible";
}

function changeMoeda() {
  Moeda1 = de.value;
  Moeda2 = para.value;
}
changeMoeda();
