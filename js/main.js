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
    myRequest.onerror =function (){
      reject(new Error ("connection Error"))
    }
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
  getData("api.json")
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

