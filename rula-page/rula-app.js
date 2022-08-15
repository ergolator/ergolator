"use strict";
// let test = 1;

let rulaObject = {
  upperArmPos: 0,
  shoulderRaised: 0,
  armAbducted: 0,
  armSupported: 0,

  lowerArmPos: 0,
  lowerArmMidline: 0,
  lowerArmOutToSide: 0,

  wristPos: 0,
  wristMidline: 0,

  wristTwist: 0,
};

const wrist1 = {
  wristTwist1: [
    [1, 2, 2],
    [2, 3, 3],
    [3, 3, 4],
    [4, 4, 4],
    [5, 5, 6],
    [7, 8, 9],
  ],
  wristTwist2: [
    [2, 2, 3],
    [3, 3, 4],
    [3, 4, 4],
    [4, 4, 4],
    [5, 6, 6],
    [7, 8, 9],
  ],
};

const wrist2 = {
  wristTwist1: [
    [2, 2, 3],
    [3, 3, 4],
    [4, 4, 4],
    [4, 4, 4],
    [5, 6, 6],
    [7, 8, 9],
  ],
  wristTwist2: [
    [2, 2, 3],
    [3, 3, 4],
    [4, 4, 4],
    [4, 4, 5],
    [5, 6, 7],
    [7, 8, 9],
  ],
};

const wrist3 = {
  wristTwist1: [
    [2, 3, 3],
    [3, 3, 4],
    [4, 4, 4],
    [4, 4, 5],
    [5, 6, 7],
    [7, 8, 9],
  ],
  wristTwist2: [
    [3, 3, 3],
    [4, 4, 4],
    [4, 4, 5],
    [5, 5, 5],
    [6, 6, 7],
    [8, 9, 9],
  ],
};

const wrist4 = {
  wristTwist1: [
    [3, 3, 4],
    [4, 4, 5],
    [5, 5, 5],
    [5, 5, 6],
    [6, 7, 7],
    [8, 9, 9],
  ],
  wristTwist2: [
    [3, 3, 4],
    [4, 4, 5],
    [5, 5, 5],
    [5, 5, 6],
    [7, 7, 8],
    [9, 9, 9],
  ],
};

const testBtn = document.querySelector(".test-btn");
const upperArmSelection = document.querySelectorAll(".upper-arm-radio");
const lowerArmSelection = document.querySelectorAll(".lower-arm-radio");
const wristSelection = document.querySelectorAll(".wrist-radio");
const wristTwistSelection = document.querySelectorAll(".wrist-twist-pos");
const armsCheckboxes = document.querySelectorAll(`input[type="checkbox"]`);

testBtn.addEventListener("click", tempRulaRunner);

function getUpperArmInputs() {
  upperArmSelection.forEach((item) => {
    if (item.checked) {
      rulaObject[`${item.name}`] = Number(item.value);
    }
  });
}
function getLowerArmInputs() {
  lowerArmSelection.forEach((item) => {
    if (item.checked) {
      rulaObject[`${item.name}`] = Number(item.value);
    }
  });
}
function getWristInputs() {
  wristSelection.forEach((item) => {
    if (item.checked) {
      rulaObject[`${item.name}`] = Number(item.value);
    }
  });
}
function getWristTwistInputs() {
  wristTwistSelection.forEach((item) => {
    if (item.checked) {
      rulaObject[`${item.name}`] = Number(item.value);
    }
  });
}
function getCheckboxInputs() {
  armsCheckboxes.forEach((item) => {
    if (item.checked) {
      rulaObject[`${item.name}`] = Number(item.value);
    }
  });
}

function consoleTable() {
  console.table(rulaObject);
}

function getUpperArmScore() {
  getUpperArmInputs();
  return (
    rulaObject.upperArmPos +
    rulaObject.shoulderRaised +
    rulaObject.armAbducted +
    rulaObject.armSupported
  );
}
function getLowerArmScore() {
  getLowerArmInputs();
  return (
    rulaObject.lowerArmPos +
    rulaObject.lowerArmMidline +
    rulaObject.lowerArmOutToSide
  );
}
function getWristScore() {
  getWristInputs();
  return rulaObject.wristPos + rulaObject.wristMidline;
}
// function getWristTwistScore() {}

function getTableAScore() {
  getWristTwistInputs();
  getCheckboxInputs();

  let upperArmScore = getUpperArmScore();
  let lowerArmScore = getLowerArmScore();
  let wristScore = getWristScore();
  let wristTwistScore = rulaObject.wristTwist;
  const objSelectionArray = [wrist1, wrist2, wrist3, wrist4];

  return objSelectionArray[wristScore - 1][`wristTwist${wristTwistScore}`][
    upperArmScore - 1
  ][lowerArmScore - 1];
}

// ===========TEMP===========
const displayResult = document.querySelector(".rula-result");
function tempRulaRunner() {
  displayResult.textContent = getTableAScore();
}
