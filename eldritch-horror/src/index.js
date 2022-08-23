import { brownCards, greenCards, blueCards } from "./data/mythicCards";
import ancients from "./data/ancients.js";
import difficulties from "./data/difficulties.js";

const ancient = document.querySelector(".ancients-img");
const difficultBtns = document.querySelectorAll(".btn");
const deckFace = document.querySelector(".deck-face");

const state = {
  ancient: "",
  difficult: "",
};

let allStages = [];

let stage1 = [];
let stage2 = [];
let stage3 = [];

function getRandomNumber(cards) {
  return Math.floor(Math.random() * cards.length);
}

console.log(blueCards);
console.log(ancients);

difficultBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    state.difficult = difficulties[i].id;
  });
});

ancient.addEventListener("click", () => {
  ancient.classList.toggle("active");
  state.ancient = ancients[0].name;
});

function collectDeck(cards, numberCards, stage) {
  for (let i = 0; i < numberCards; i++) {
    stage.push(cards[getRandomNumber(cards)]);
  }
}

function normalDifficult(ancient) {
  collectDeck(brownCards, ancient.firstStage.brownCards, stage1);
  collectDeck(greenCards, ancient.firstStage.greenCards, stage1);
  collectDeck(blueCards, ancient.firstStage.blueCards, stage1);
  collectDeck(brownCards, ancient.secondStage.brownCards, stage2);
  collectDeck(greenCards, ancient.secondStage.greenCards, stage2);
  collectDeck(blueCards, ancient.secondStage.blueCards, stage2);
  collectDeck(brownCards, ancient.thirdStage.brownCards, stage3);
  collectDeck(greenCards, ancient.thirdStage.greenCards, stage3);
  collectDeck(blueCards, ancient.thirdStage.blueCards, stage3);
}

normalDifficult(ancients[0]);

deckFace.src = stage1[0].cardFace;

console.log(stage1);
console.log(stage2);
console.log(stage3);
