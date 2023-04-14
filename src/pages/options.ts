console.log("Greeting from options.js page script!");

const optionButton = document.querySelector(`button`);
optionButton?.addEventListener(`click`, () => {
  alert(`Clicked Button on Options Page!`);
});
