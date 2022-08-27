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
const shuffleDeckBtn = document.querySelector(".shuffle");

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

let difficultBrown = [];
let difficultGreen = [];
let difficultBlue = [];

let greenDeck = [];
let blueDeck = [];
let brownDeck = [];

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
    console.log(state.ancient);
  });
});

difficultBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    resetBtnActive();
    state.difficult = difficulties[i].id;
    btn.classList.add("active");
    shuffleDeckBtn.classList.add("active");
  });
});

reset.addEventListener("click", resetAncient);

function resetAncient() {
  difficultContent.classList.remove("active");
  deckContent.classList.remove("active");
  reset.classList.remove("active");
  stageCount.classList.remove("active");
  deckFace.classList.remove("active");
  shuffleDeckBtn.classList.remove("active");
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

function checkDifficult(color, colorArray, cards, difficult) {
  if (difficult === "veryEasy") {
    if (color <= cards.filter((card) => card.difficulty === "easy").length) {
      for (let i = 0; i < color; i++) {
        randomNumber = Math.floor(
          Math.random() *
            cards.filter((card) => card.difficulty === "easy").length
        );
        if (
          colorArray.includes(
            cards.filter((card) => card.difficulty === "easy")[randomNumber]
          )
        ) {
          i--;
          continue;
        } else {
          colorArray.push(
            cards.filter((card) => card.difficulty === "easy")[randomNumber]
          );
        }
      }
    } else {
      for (
        let i = 0;
        i < cards.filter((card) => card.difficulty === "easy").length;
        i++
      ) {
        colorArray.push(cards.filter((card) => card.difficulty === "easy")[i]);
      }
      if (color >= colorArray.length) {
        for (let i = 0; i <= color - colorArray.length + 2; i++) {
          randomNumber = Math.floor(
            Math.random() *
              cards.filter((card) => card.difficulty === "normal").length
          );
          if (
            colorArray.includes(
              cards.filter((card) => card.difficulty === "normal")[randomNumber]
            )
          ) {
            i--;
            continue;
          } else {
            colorArray.push(
              cards.filter((card) => card.difficulty === "normal")[randomNumber]
            );
          }
        }
      }
    }
  }
  if (difficult === "easy") {
    for (let i = 0; i < color; i++) {
      randomNumber = Math.floor(
        Math.random() *
          cards.filter((card) => card.difficulty !== "hard").length
      );
      if (
        colorArray.includes(
          cards.filter((card) => card.difficulty !== "hard")[randomNumber]
        )
      ) {
        i--;
        continue;
      } else {
        colorArray.push(
          cards.filter((card) => card.difficulty !== "hard")[randomNumber]
        );
      }
    }
  }
  if (difficult === "normal") {
    for (let i = 0; i < color; i++) {
      randomNumber = Math.floor(Math.random() * cards.length);
      if (colorArray.includes(cards[randomNumber])) {
        i--;
        continue;
      } else {
        colorArray.push(cards[randomNumber]);
      }
    }
  }
  if (difficult === "hard") {
    for (let i = 0; i < color; i++) {
      randomNumber = Math.floor(
        Math.random() *
          cards.filter((card) => card.difficulty !== "easy").length
      );
      if (
        colorArray.includes(
          cards.filter((card) => card.difficulty !== "easy")[randomNumber]
        )
      ) {
        i--;
        continue;
      } else {
        colorArray.push(
          cards.filter((card) => card.difficulty !== "easy")[randomNumber]
        );
      }
    }
  }
  if (difficult === "veryHard") {
    if (color <= cards.filter((card) => card.difficulty === "hard").length) {
      for (let i = 0; i < color; i++) {
        randomNumber = Math.floor(
          Math.random() *
            cards.filter((card) => card.difficulty === "hard").length
        );
        if (
          colorArray.includes(
            cards.filter((card) => card.difficulty === "hard")[randomNumber]
          )
        ) {
          i--;
          continue;
        } else {
          colorArray.push(
            cards.filter((card) => card.difficulty === "hard")[randomNumber]
          );
        }
      }
    } else {
      for (
        let i = 0;
        i < cards.filter((card) => card.difficulty === "hard").length;
        i++
      ) {
        colorArray.push(cards.filter((card) => card.difficulty === "hard")[i]);
      }

      if (color >= colorArray.length) {
        for (let i = 0; i <= color - colorArray.length + 2; i++) {
          randomNumber = Math.floor(
            Math.random() *
              cards.filter((card) => card.difficulty === "normal").length
          );
          if (
            colorArray.includes(
              cards.filter((card) => card.difficulty === "normal")[randomNumber]
            )
          ) {
            i--;
            continue;
          } else {
            colorArray.push(
              cards.filter((card) => card.difficulty === "normal")[randomNumber]
            );
          }
        }
      }
    }
  }
  shuffleArray(colorArray);
}

function collectDeck(ancient) {
  let stageGreen =
    ancient.firstStage.greenCards +
    ancient.secondStage.greenCards +
    ancient.thirdStage.greenCards;

  let stageBrown =
    ancient.firstStage.brownCards +
    ancient.secondStage.brownCards +
    ancient.thirdStage.brownCards;

  let stageBlue =
    ancient.firstStage.blueCards +
    ancient.secondStage.blueCards +
    ancient.thirdStage.blueCards;

  checkDifficult(stageBlue, blueDeck, blueCards, state.difficult);
  checkDifficult(stageGreen, greenDeck, greenCards, state.difficult);
  checkDifficult(stageBrown, brownDeck, brownCards, state.difficult);

  setStageDeck();

  stageCount.classList.add("active");

  deckContent.classList.add("active");
}

shuffleDeckBtn.addEventListener("click", () => {
  collectDeck(state.ancient);
});

function setStageDeck() {
  if (state.ancient.firstStage.brownCards) {
    for (let i = 0; i < state.ancient.firstStage.brownCards; i++) {
      stage1.push(brownDeck[brownDeck.length - 1]);
      brownDeck.pop();
    }
  }
  if (state.ancient.firstStage.greenCards) {
    for (let i = 0; i < state.ancient.firstStage.greenCards; i++) {
      stage1.push(greenDeck[greenDeck.length - 1]);
      greenDeck.pop();
    }
  }

  if (state.ancient.firstStage.blueCards) {
    for (let i = 0; i < state.ancient.firstStage.blueCards; i++) {
      stage1.push(blueDeck[blueDeck.length - 1]);
      blueDeck.pop();
    }
  }

  if (state.ancient.secondStage.brownCards) {
    for (let i = 0; i < state.ancient.secondStage.brownCards; i++) {
      stage2.push(brownDeck[brownDeck.length - 1]);
      brownDeck.pop();
    }
  }

  if (state.ancient.secondStage.greenCards) {
    for (let i = 0; i < state.ancient.secondStage.greenCards; i++) {
      stage2.push(greenDeck[greenDeck.length - 1]);
      greenDeck.pop();
    }
  }

  if (state.ancient.secondStage.blueCards) {
    for (let i = 0; i < state.ancient.secondStage.blueCards; i++) {
      stage2.push(blueDeck[blueDeck.length - 1]);
      blueDeck.pop();
    }
  }

  if (state.ancient.thirdStage.brownCards) {
    for (let i = 0; i < state.ancient.thirdStage.brownCards; i++) {
      stage3.push(brownDeck[brownDeck.length - 1]);
      brownDeck.pop();
    }
  }

  if (state.ancient.thirdStage.greenCards) {
    for (let i = 0; i < state.ancient.thirdStage.greenCards; i++) {
      stage3.push(greenDeck[greenDeck.length - 1]);
      greenDeck.pop();
    }
  }

  if (state.ancient.thirdStage.blueCards) {
    for (let i = 0; i < state.ancient.thirdStage.blueCards; i++) {
      stage3.push(blueDeck[blueDeck.length - 1]);
      blueDeck.pop();
    }
  }

  console.log(stage1);
  console.log(stage2);
  console.log(stage3);
}

deckCover.addEventListener("click", showCards);

function showCards() {
  deckFace.classList.add("active");
  if (stage1.length) {
    shuffleArray(stage1);
    deckFace.style.backgroundImage = `url(${
      stage1[stage1.length - 1].cardFace
    })`;
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
    if (stage1.length === 0) {
      return;
    }
  }

  if (stage2.length && !stage1.length) {
    shuffleArray(stage2);
    deckFace.style.backgroundImage = `url(${
      stage2[stage2.length - 1].cardFace
    })`;
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
    deckFace.style.backgroundImage = `url(${
      stage3[stage3.length - 1].cardFace
    })`;
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
