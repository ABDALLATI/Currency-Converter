// Dark Mode
const darkModeToggle = document.querySelector(".thems button");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// get dada from api
const getData = (apilink) => {
  return new Promise((resolve, reject) => {
    let myRequest = new XMLHttpRequest();
    myRequest.onload = function () {
      if (this.status === 200 && this.readyState === 4) {
        resolve(JSON.parse(this.responseText));
      } else {
        reject(new Error("Failed to fetch data"));
      }
    };
    myRequest.open("GET", apilink);
    myRequest.send();
  });
};
// select
const select = document.querySelectorAll("select");
// get input value
const inputValue = document.querySelector(".current-value");
// option
const option = document.querySelectorAll("option");
// result
let fromCurrency = select[0].value;
let toCurrency = select[1].value;
let fromRate;
let toRate;
const result = document.querySelector(".result");
// get convert icon
const convertIcon = document.querySelector(".icon-convert");
// click convert button
const convertButton = document.querySelector(".convert");
convertButton.disabled = true;
// getData("http://api.exchangeratesapi.io/v1/latest?access_key=26ee11b1c996b7fe33798cb9f927d35a")
getData("../api.json")
  .then((data) => {
    let rates = Object.entries(data.rates);
    for (let i = 0; i < rates.length; i++) {
      // create option element
      let option = document.createElement("option");
      option.value = rates[i][0];
      option.textContent = rates[i][0];
      select[0].appendChild(option);
      select[1].appendChild(option.cloneNode(true));
    }
    convertButton.disabled = false;
    convertButton.addEventListener("click", getConvert);
    function getConvert() {
      if (inputValue.value === "") {
        alert("Please enter a value to convert");
        return;
      }
      fromCurrency = select[0].value;
      toCurrency = select[1].value;
      fromRate = data.rates[fromCurrency];
      toRate = data.rates[toCurrency];
      result.textContent = (inputValue.value * (toRate / fromRate)).toFixed(2);
    }
    convertIcon.addEventListener("click", () => {
      const temp = select[1].value;
      select[1].value = select[0].value;
      select[0].value = temp;
      getConvert();
    });
  })
  .catch((error) => {
    console.error(error);
     alert("Please Check Your Internet Connection");
        return;
  });
// // ============ Config ============
// const API_URL = "https://open.er-api.com/v6/latest/USD";
// // API مجاني، HTTPS، مش محتاج key
// // بترجع { result: "success", rates: { USD: 1, EGP: 48.5, ... }, time_last_update_utc: "..." }

// // ============ DOM refs ============
// const themeToggle   = document.getElementById("theme-toggle");
// const selectFrom    = document.getElementById("sel-one");
// const selectTo      = document.getElementById("sel-two");
// const inputValue    = document.querySelector(".current-value");
// const convertButton = document.querySelector(".convert");
// const convertIcon   = document.querySelector(".icon-convert");
// const resultEl      = document.querySelector(".result");
// const statusEl      = document.querySelector(".status");

// // ============ State ============
// let rates = {};           // { USD: 1, EGP: 48.5, ... }
// let lastUpdate = "";

// // ============ Helpers ============
// function showStatus(message, isError = true) {
//   statusEl.textContent = message;
//   statusEl.classList.toggle("success", !isError);
// }

// function clearStatus() {
//   statusEl.textContent = "";
//   statusEl.classList.remove("success");
// }

// // ============ Dark Mode ============
// themeToggle.addEventListener("click", () => {
//   document.body.classList.toggle("dark-mode");
// });

// // ============ Fetch data (fetch + async/await) ============
// async function loadRates() {
//   try {
//     showStatus("Loading exchange rates...", false);
//     const response = await fetch(API_URL);
//     if (!response.ok) throw new Error(`HTTP ${response.status}`);

//     const data = await response.json();
//     if (data.result !== "success") throw new Error("API returned error");

//     rates = data.rates;
//     lastUpdate = data.time_last_update_utc || "";
//     populateSelects();
//     showStatus(`Rates updated: ${lastUpdate}`, false);

//     // enable UI
//     selectFrom.disabled = false;
//     selectTo.disabled = false;
//     convertButton.disabled = false;
//   } catch (err) {
//     console.error(err);
//     showStatus("Failed to load rates. Check your connection and try again.");
//     convertButton.disabled = true;
//   }
// }

// // ============ Populate selects ============
// function populateSelects() {
//   const currencyCodes = Object.keys(rates).sort();

//   // default
//   const defaultFrom = "USD";
//   const defaultTo   = rates["EGP"] ? "EGP" : currencyCodes[1] || currencyCodes[0];

//   for (const code of currencyCodes) {
//     const opt1 = new Option(code, code);
//     const opt2 = new Option(code, code);
//     selectFrom.appendChild(opt1);
//     selectTo.appendChild(opt2);
//   }

//   if (rates[defaultFrom]) selectFrom.value = defaultFrom;
//   if (rates[defaultTo])   selectTo.value   = defaultTo;
// }

// // ============ Convert ============
// function convert() {
//   clearStatus();

//   const amount = parseFloat(inputValue.value);

//   if (isNaN(amount) || amount < 0) {
//     showStatus("Please enter a valid positive number.");
//     return;
//   }

//   const from = selectFrom.value;
//   const to   = selectTo.value;
//   const fromRate = rates[from];
//   const toRate   = rates[to];

//   if (!fromRate || !toRate) {
//     showStatus("Selected currency is not available.");
//     return;
//   }

//   // convert: amount * (toRate / fromRate)
//   const converted = (amount * toRate) / fromRate;

//   resultEl.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
// }

// // ============ Swap ============
// convertIcon.addEventListener("click", () => {
//   const temp = selectFrom.value;
//   selectFrom.value = selectTo.value;
//   selectTo.value = temp;
//   if (inputValue.value !== "") convert();
// });

// // ============ Events ============
// convertButton.addEventListener("click", convert);
// inputValue.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") convert();
// });

// // ============ Init ============
// loadRates();