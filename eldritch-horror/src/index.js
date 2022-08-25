import { brownCards, greenCards, blueCards } from "./data/mythicCards";
import ancients from "./data/ancients.js";
import difficulties from "./data/difficulties.js";

const ancientsCards = document.querySelectorAll(".ancients-img");
const difficultBtns = document.querySelectorAll(".btn");
const deckCover = document.querySelector(".deck-cover");
const deckFace = document.querySelector(".deck-face");
const difficultContent = document.querySelector(".difficult-content");
const deckContent = document.querySelector(".deck-content");
const reset = document.querySelector(".reset");
const stageCount = document.querySelector(".stage-count");
const stageOneCount = document.querySelector(".stage-one");
const stageTwoCount = document.querySelector(".stage-two");
const stageThreeCount = document.querySelector(".stage-three");

const state = {
  ancient: {},
  difficult: "",
};

let stage1 = [];
let stage2 = [];
let stage3 = [];

let randomNumber = 0;

let stageOneGreen = 0;
let stageOneBrown = 0;
let stageOneBlue = 0;
let stageTwoGreen = 0;
let stageTwoBrown = 0;
let stageTwoBlue = 0;
let stageThreeGreen = 0;
let stageThreeBrown = 0;
let stageThreeBlue = 0;

// console.log(stageOneCount.childNodes);

// let veryEasyBrown = [];
// let veryEasyGreen = [];
// let veryEasyBlue = [];

let difficultBrown = [];
let difficultGreen = [];
let difficultBlue = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function setCounts() {
  for (let i = 0; i < stageOneCount.childNodes.length; i++) {
    if (stageOneCount.childNodes[i].className === "circle green") {
      stageOneCount.childNodes[i].textContent = stageOneGreen;
    }
    if (stageOneCount.childNodes[i].className === "circle brown") {
      stageOneCount.childNodes[i].textContent = stageOneBrown;
    }
    if (stageOneCount.childNodes[i].className === "circle blue") {
      stageOneCount.childNodes[i].textContent = stageOneBlue;
    }
    if (stageTwoCount.childNodes[i].className === "circle green") {
      stageTwoCount.childNodes[i].textContent = stageTwoGreen;
    }
    if (stageTwoCount.childNodes[i].className === "circle brown") {
      stageTwoCount.childNodes[i].textContent = stageTwoBrown;
    }
    if (stageTwoCount.childNodes[i].className === "circle blue") {
      stageTwoCount.childNodes[i].textContent = stageTwoBlue;
    }
    if (stageThreeCount.childNodes[i].className === "circle green") {
      stageThreeCount.childNodes[i].textContent = stageThreeGreen;
    }
    if (stageThreeCount.childNodes[i].className === "circle brown") {
      stageThreeCount.childNodes[i].textContent = stageThreeBrown;
    }
    if (stageThreeCount.childNodes[i].className === "circle blue") {
      stageThreeCount.childNodes[i].textContent = stageThreeBlue;
    }
  }
}

console.log(blueCards);
console.log(ancients);

ancientsCards.forEach((ancient, i) => {
  ancient.addEventListener("click", () => {
    stageOneGreen = ancients[i].firstStage.greenCards;
    stageOneBrown = ancients[i].firstStage.brownCards;
    stageOneBlue = ancients[i].firstStage.blueCards;
    stageTwoGreen = ancients[i].secondStage.greenCards;
    stageTwoBrown = ancients[i].secondStage.brownCards;
    stageTwoBlue = ancients[i].secondStage.blueCards;
    stageThreeGreen = ancients[i].thirdStage.greenCards;
    stageThreeBrown = ancients[i].thirdStage.brownCards;
    stageThreeBlue = ancients[i].thirdStage.blueCards;
    resetAncientActive();
    ancient.classList.add("active");
    state.ancient = ancients[i];
    difficultContent.classList.add("active");
    setCounts();
  });
});

difficultBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    resetBtnActive();
    state.difficult = difficulties[i].id;
    btn.classList.add("active");
    deckContent.classList.add("active");
    stageCount.classList.add("active");
    if (state.difficult === "easy") {
      setDifficult(state.ancient, "hard");
    }
    if (state.difficult === "normal") {
      setDifficult(state.ancient, "");
    }
    if (state.difficult === "hard") {
      setDifficult(state.ancient, "easy");
    }
  });
});

reset.addEventListener("click", resetAncient);

function resetAncient() {
  difficultContent.classList.remove("active");
  deckContent.classList.remove("active");
  reset.classList.remove("active");
  resetAncientActive();
  resetBtnActive();
  state.ancient = {};
  state.difficult = "";
  deckFace.src = "";
  stage1 = [];
  stage2 = [];
  stage3 = [];
}

function resetAncientActive() {
  ancientsCards.forEach((ancient) => {
    ancient.classList.remove("active");
  });
}

function resetBtnActive() {
  difficultBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
}

function collectDeck(cards, numberCards, stage) {
  console.log(randomNumber);
  for (let i = 0; i < numberCards; i++) {
    randomNumber = Math.floor(Math.random() * cards.length);
    if (stage.includes(cards[randomNumber])) {
      i--;
      continue;
    } else {
      stage.push(cards[randomNumber]);
    }
  }
}

function veryEasyDifficult(ancient) {
  veryEasyBrown = brownCards.filter((card) => card.difficulty === "easy");
  veryEasyGreen = greenCards.filter((card) => card.difficulty === "easy");
  veryEasyBlue = blueCards.filter((card) => card.difficulty === "easy");
}

function setDifficult(ancient, difficult) {
  if (difficult === "easy" || difficult === "" || difficult === "hard") {
    difficultBrown = brownCards.filter((card) => card.difficulty !== difficult);
    difficultGreen = greenCards.filter((card) => card.difficulty !== difficult);
    difficultBlue = blueCards.filter((card) => card.difficulty !== difficult);
  }

  collectDeck(difficultBrown, ancient.firstStage.brownCards, stage1);
  collectDeck(difficultGreen, ancient.firstStage.greenCards, stage1);
  collectDeck(difficultBlue, ancient.firstStage.blueCards, stage1);
  collectDeck(difficultBrown, ancient.secondStage.brownCards, stage2);
  collectDeck(difficultGreen, ancient.secondStage.greenCards, stage2);
  collectDeck(difficultBlue, ancient.secondStage.blueCards, stage2);
  collectDeck(difficultBrown, ancient.thirdStage.brownCards, stage3);
  collectDeck(difficultGreen, ancient.thirdStage.greenCards, stage3);
  collectDeck(difficultBlue, ancient.thirdStage.blueCards, stage3);
}

deckCover.addEventListener("click", showCards);

function showCards() {
  deckFace.classList.add("active");
  if (stage1.length) {
    shuffleArray(stage1);
    console.log(stage1);
    deckFace.src = stage1[stage1.length - 1].cardFace;
    if (stage1[stage1.length - 1].color === "green") {
      stageOneGreen--;
      setCounts();
    }
    if (stage1[stage1.length - 1].color === "brown") {
      stageOneBrown--;
      setCounts();
    }
    if (stage1[stage1.length - 1].color === "blue") {
      stageOneBlue--;
      setCounts();
    }
    stage1.pop();
    console.log("stage1", stage1);
    if (stage1.length === 0) {
      return;
    }
  }

  if (stage2.length && !stage1.length) {
    shuffleArray(stage2);
    deckFace.src = stage2[stage2.length - 1].cardFace;
    if (stage2[stage2.length - 1].color === "green") {
      stageTwoGreen--;
      setCounts();
    }
    if (stage2[stage2.length - 1].color === "brown") {
      stageTwoBrown--;
      setCounts();
    }
    if (stage2[stage2.length - 1].color === "blue") {
      stageTwoBlue--;
      setCounts();
    }
    stage2.pop();
    if (stage2.length === 0) {
      return;
    }
  }
  if (stage2.length === 0 && stage3.length) {
    shuffleArray(stage3);
    deckFace.src = stage3[stage3.length - 1].cardFace;
    if (stage3[stage3.length - 1].color === "green") {
      stageThreeGreen--;
      setCounts();
    }
    if (stage3[stage3.length - 1].color === "brown") {
      stageThreeBrown--;
      setCounts();
    }
    if (stage3[stage3.length - 1].color === "blue") {
      stageThreeBlue--;
      setCounts();
    }
    stage3.pop();
    if (stage3.length === 0) {
      reset.classList.add("active");
      return;
    }
  }
}
