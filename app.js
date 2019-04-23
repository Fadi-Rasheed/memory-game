let levelButton = document.querySelector('#level')
let clicksCounter = document.querySelector('.clicks')
let cards = document.querySelectorAll(".list__elem");
let listCards = document.querySelector(".list__cards");
let message = document.querySelector('.message');
let reset = document.querySelector('.reset')
let timer = document.querySelector('.timer')
let count;
let seconds;
let level = 1;
let colors = [];
let clickedCards = [];
let matchedCards = [];

let timerFunction = setInterval(function(){
    timer.innerHTML = ++seconds + ' Secondes'
},1000)

function stopTimer() {
    clearInterval(timerFunction);
  }

function clicks(){
    count += 1;
    clicksCounter.innerHTML = "Number of clicks: " + count;
}

function win(){
    message.textContent = 'You Won';
    message.classList.add('win');
    stopTimer();

}

function generateRandomColors(num){
    let arr = [];
    for(let i = 0 ; i<num;i++){
        arr.push(randomColor());
    }
    let arrDouble = [...arr,...arr];
    let shuffledArray = shuffle(arrDouble)
    return shuffledArray;
}

function randomColor(){
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    return `rgb(${r},${g},${b})`;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function flip(){
    clicks();
    this.classList.add('open');
    clickedCards.push(this);
    if(clickedCards.length > 1){matchColor.bind(this)()}
    console.log(matchedCards)
}

function flipBack(x,y){
    setTimeout(() => {
        x.classList.remove('open');
        y.classList.remove('open');
    }, 1500);
}

function matchColor(){
    if (clickedCards[0].style.backgroundColor !== clickedCards[1].style.backgroundColor){
        flipBack(clickedCards[0],clickedCards[1]);
        } else {
             matchedCards.push('one');
        }
    if (matchedCards.length === colors.length/2){
        win();
    }
    clickedCards = [];
}

function resetGame(){
    listCards.innerHTML = '';
    colors = [];
    matchedCards = [];
    creatCards();
    message.classList.remove('win');
    message.textContent = '';
}

function creatCards(){
    seconds = 0;
    count = 0;
    timer.innerHTML = seconds + ' Secondes';
    clicksCounter.innerHTML = "Number of clicks: " + count;
    colors = generateRandomColors(level*4);
    for(let i = 0 ; i< colors.length ; i++){
        let card = document.createElement("LI");
        card.setAttribute("class", "list__elem")
        listCards.appendChild(card)
        card.style.backgroundColor = colors[i];
        card.addEventListener('click', flip)
    }
}

levelButton.onchange = function(){
    level = this.value
    resetGame();
}

reset.addEventListener('click', resetGame);

creatCards();