const currencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "INR",
  "NPR",
  "SGD",
  "AED",
  "SAR",
  "KRW",
  "MXN",
  "BRL",
  "ZAR",
  "HKD",
  "NOK",
  "SEK",
  "DKK",
  "NZD",
  "THB",
  "MYR",
];

function populateDropdowns() {
  const fromSelect = document.getElementById("fromCurrency");
  const toSelect = document.getElementById("toCurrency");

  currencies.forEach((currency) => {
    fromSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
    toSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
  });

  fromSelect.value = "USD";
  toSelect.value = "NPR";
}

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const errorMsg = document.getElementById("errorMsg");
  const result = document.getElementById("result");

  if (!amount || amount <= 0) {
    errorMsg.textContent = "Please enter a valid amount!";
    result.style.display = "none";
    return;
  }

  errorMsg.textContent = "";

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[to];
      const converted = (amount * rate).toFixed(2);

      document.getElementById("resultText").textContent =
        `${amount} ${from} = ${converted} ${to}`;
      document.getElementById("rateText").textContent =
        `1 ${from} = ${rate.toFixed(4)} ${to}`;

      result.style.display = "block";
    })
    .catch(() => {
      errorMsg.textContent = "Something went wrong. Try again!";
    });
}

function swapCurrencies() {
  const from = document.getElementById("fromCurrency");
  const to = document.getElementById("toCurrency");
  const temp = from.value;
  from.value = to.value;
  to.value = temp;
}

document.getElementById("amount").addEventListener("keypress", function (e) {
  if (e.key === "Enter") convertCurrency();
});

populateDropdowns();
