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

const state = {
  ancient: {},
  difficult: "",
};

let stage1 = [];
let stage2 = [];
let stage3 = [];

let veryEasyBrown = [];
let veryEasyGreen = [];
let veryEasyBlue = [];

let difficultBrown = [];
let difficultGreen = [];
let difficultBlue = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getRandomNumber(cards) {
  return Math.floor(Math.random() * cards.length);
}

console.log(blueCards);
console.log(ancients);

ancientsCards.forEach((ancient, i) => {
  ancient.addEventListener("click", () => {
    resetAncientActive();
    ancient.classList.add("active");
    state.ancient = ancients[i];
    difficultContent.classList.add("active");
    deckContent.classList.add("active");
  });
});

difficultBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    resetBtnActive();
    state.difficult = difficulties[i].id;
    btn.classList.add("active");
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
  resetAncientActive();
  resetBtnActive();
  state.ancient = {};
  state.difficult = "";
  deckFace.src = "";
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
  for (let i = 0; i < numberCards; i++) {
    if (!stage.includes(cards[getRandomNumber(cards)])) {
      stage.push(cards[getRandomNumber(cards)]);
    } else {
      continue;
    }
  }
  console.log(stage);
}

function veryEasyDifficult(ancient) {
  veryEasyBrown = brownCards.filter((card) => card.difficulty === "easy");
  veryEasyGreen = greenCards.filter((card) => card.difficulty === "easy");
  veryEasyBlue = blueCards.filter((card) => card.difficulty === "easy");
}

function setDifficult(ancient, difficult) {
  difficultBrown = brownCards.filter((card) => card.difficulty !== difficult);
  difficultGreen = greenCards.filter((card) => card.difficulty !== difficult);
  difficultBlue = blueCards.filter((card) => card.difficulty !== difficult);

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
  if (stage1.length) {
    shuffleArray(stage1);
    deckFace.src = stage1[stage1.length - 1].cardFace;
    stage1.pop();
    console.log("stage1", stage1);
    if (stage1.length === 0) {
      return;
    }
  }

  if (stage2.length && !stage1.length) {
    shuffleArray(stage2);
    deckFace.src = stage2[stage2.length - 1].cardFace;
    stage2.pop();
    console.log("stage2: ", stage2);
    if (stage2.length === 0) {
      return;
    }
  }
  if (stage2.length === 0 && stage3.length) {
    shuffleArray(stage3);
    deckFace.src = stage3[stage3.length - 1].cardFace;
    stage3.pop();
    console.log("stage3: ", stage3);
    if (stage3.length === 0) {
      return;
    }
  }
}
