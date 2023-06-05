$(document).ready(function () {
  const currencyElementOne = $("#currency-one");
  const currencyElementTwo = $("#currency-two");
  const amountElementOne = $("#amount-one");
  const amountElementTwo = $("#amount-two");

  async function calculate1() {
    const currencyOne = currencyElementOne.val();
    console.log(currencyOne);
    const currencyTwo = currencyElementTwo.val();

    await fetch(
      `https://v6.exchangerate-api.com/v6/3ffba8d8c5b5e3395dba02c9/latest/${currencyOne}`
    )
      .then((res) => res.json())
      .then((data) => {
        const rate1 = data.conversion_rates[currencyTwo];
        $("#rate").text(`1 ${currencyOne} = ${rate1} ${currencyTwo}`);
        amountElementTwo.val(parseInt(Number(amountElementOne.val())) * rate1);
      })
      .catch((error) => console.log(error));
  }
  async function calculate2() {
    const currencyOne = currencyElementOne.val();
    const currencyTwo = currencyElementTwo.val();

    await fetch(
      `https://v6.exchangerate-api.com/v6/3ffba8d8c5b5e3395dba02c9/latest/${currencyTwo}`
    )
      .then((res) => res.json())
      .then((data) => {
        const rate2 = data.conversion_rates[currencyOne];

        $("#rate").text(`1 ${currencyOne} = ${rate2} ${currencyTwo}`);
        amountElementOne.val(parseInt(Number(amountElementTwo.val())) * rate2);
      })
      .catch((error) => console.log(error));
  }

  currencyElementOne.on("change", calculate1);
  currencyElementTwo.on("change", calculate2);
  $("#amount-one").keyup(calculate1);
  $("#amount-two").keyup(calculate2);
});

fetch("https://v6.exchangerate-api.com/v6/3ffba8d8c5b5e3395dba02c9/latest/USD")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    for (const key in data.conversion_rates) {
      $("#currency-one").append(
        `<option value="${key}">${key}</option>
              `
      );
      $("#currency-two").append(
        `<option value="${key}">${key}</option>
              `
      );
    }
  })
  .catch((error) => console.log(error));
