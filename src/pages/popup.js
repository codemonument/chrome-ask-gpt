console.log('Greeting from popup.js script!');

const button = document.querySelector(`button`); 
button.addEventListener(`click`, () => {
    alert(`Clicked Button in Popup!`)
})