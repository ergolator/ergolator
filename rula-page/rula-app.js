"use strict";

let tableAObject = {
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

  tableAForceScore: 0,

  tableAMuscleScore: 0,
};

let tableBObject = {
  neckPos: 0,
  twistedNeck: 0,
  neckSideBending: 0,

  trunkPos: 0,
  // trunkSupported: 0,
  trunkTwisted: 0,
  trunkSideBending: 0,

  legSupported: 0,

  tableBForceScore: 0,

  tableBMuscleScore: 0,
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

const trunk1 = { leg1: [1, 2, 3, 5, 7, 8], leg2: [3, 3, 3, 5, 7, 8] };
const trunk2 = { leg1: [2, 2, 3, 5, 7, 8], leg2: [3, 3, 4, 6, 7, 8] };
const trunk3 = { leg1: [3, 4, 4, 6, 7, 8], leg2: [4, 5, 5, 7, 8, 8] };
const trunk4 = { leg1: [5, 5, 5, 7, 8, 8], leg2: [5, 5, 6, 7, 8, 9] };
const trunk5 = { leg1: [6, 6, 6, 7, 8, 9], leg2: [6, 7, 7, 7, 8, 9] };
const trunk6 = { leg1: [7, 7, 7, 8, 8, 9], leg2: [7, 7, 7, 8, 8, 9] };

const finalTableColumn1 = [1, 2, 3, 3, 4, 4, 5, 5];
const finalTableColumn2 = [2, 2, 3, 3, 4, 4, 5, 5];
const finalTableColumn3 = [3, 3, 3, 3, 4, 5, 6, 6];
const finalTableColumn4 = [3, 4, 4, 4, 5, 6, 6, 7];
const finalTableColumn5 = [4, 4, 4, 5, 6, 6, 7, 7];
const finalTableColumn6 = [5, 5, 5, 6, 7, 7, 7, 7];
const finalTableColumn7 = [5, 5, 6, 6, 7, 7, 7, 7];

const upperArmSelection = document.querySelectorAll(".upper-arm-radio");
const lowerArmSelection = document.querySelectorAll(".lower-arm-radio");
const wristSelection = document.querySelectorAll(".wrist-radio");
const wristTwistSelection = document.querySelectorAll(".wrist-twist-pos");
const tableARadios = document.querySelectorAll(
  `.rula-table-a input[type="radio"]`
);
const armsCheckboxes = document.querySelectorAll(
  `.rula-table-a input[type="checkbox"]`
);
const tableAForceSelection = document.querySelectorAll(".table-a-force-score");

const neckRadio = document.querySelectorAll(".neck-radio");
const trunkRadio = document.querySelectorAll(".trunk-radio");
const trunkSupportedRadio = document.querySelectorAll(".trunk-supported");
const legRadio = document.querySelectorAll(".leg-radio");
const tableBRadios = document.querySelectorAll(
  `.rula-table-b input[type="radio"]`
);
const tableBCheckboxes = document.querySelectorAll(
  `.rula-table-b input[type="checkbox"]`
);
const tableBForceSelection = document.querySelectorAll(".table-b-force-score");

const resultTableA = document.querySelector(".table-a-score");
const resultTableB = document.querySelector(".table-b-score");
const finalScoreBox = document.querySelector(".final-score-box");
const finalScore = document.querySelector(".final-score");
const finalScoreSeverity = document.querySelector(".result-severity p");

const tableABtn = document.querySelector(".table-a-btn");
const tableBBtn = document.querySelector(".table-b-btn");

const tableAView = document.querySelector(".rula-table-a");
const tableBView = document.querySelector(".rula-table-b");
const resultView = document.querySelector(".results-section");

tableABtn.addEventListener("click", () => {
  checkRadioState(tableARadios, 4);
});
tableBBtn.addEventListener("click", () => {
  if (checkRadioState(tableBRadios, 3)) {
    switchToResultsView();
    displayScoreValues();
  }
});

function switchToNextView() {
  tableAView.classList.add("hidden-block");
  tableBView.classList.remove("hidden-block");
}
function switchToResultsView() {
  tableBView.classList.add("hidden-block");
  resultView.classList.remove("hidden-block");
}

function checkRadioState(radioNodes, radioLimit) {
  let itemCount = 0;

  radioNodes.forEach((item) => {
    if (item.checked == true) {
      itemCount += 1;
    }
  });

  if (itemCount >= radioLimit) {
    switchToNextView();
    return true;
  }
}

// ===============tableA===============
function getUpperArmInputs() {
  upperArmSelection.forEach((item) => {
    if (item.checked) {
      tableAObject[`${item.name}`] = Number(item.value);
    }
  });
}
function getLowerArmInputs() {
  lowerArmSelection.forEach((item) => {
    if (item.checked) {
      tableAObject[`${item.name}`] = Number(item.value);
    }
  });
}
function getWristInputs() {
  wristSelection.forEach((item) => {
    if (item.checked) {
      tableAObject[`${item.name}`] = Number(item.value);
    }
  });
}
function getWristTwistInputs() {
  wristTwistSelection.forEach((item) => {
    if (item.checked) {
      tableAObject[`${item.name}`] = Number(item.value);
    }
  });
}
function getTableAForceInputs() {
  tableAForceSelection.forEach((item) => {
    if (item.checked) {
      tableAObject[`${item.name}`] = Number(item.value);
    }
  });
}
function getTableACheckboxInputs() {
  armsCheckboxes.forEach((item) => {
    if (item.checked) {
      tableAObject[`${item.name}`] = Number(item.value);
    }
  });
}

function getUpperArmScore() {
  getUpperArmInputs();
  return (
    tableAObject.upperArmPos +
    tableAObject.shoulderRaised +
    tableAObject.armAbducted +
    tableAObject.armSupported
  );
}
function getLowerArmScore() {
  getLowerArmInputs();
  return (
    tableAObject.lowerArmPos +
    tableAObject.lowerArmMidline +
    tableAObject.lowerArmOutToSide
  );
}
function getWristScore() {
  getWristInputs();
  return tableAObject.wristPos + tableAObject.wristMidline;
}

function getTableAScore() {
  getWristTwistInputs();
  getTableACheckboxInputs();

  let upperArmScore = getUpperArmScore();
  let lowerArmScore = getLowerArmScore();
  let wristScore = getWristScore();
  let wristTwistScore = tableAObject.wristTwist;
  const objSelectionArray = [wrist1, wrist2, wrist3, wrist4];
  return objSelectionArray[wristScore - 1][`wristTwist${wristTwistScore}`][
    upperArmScore - 1
  ][lowerArmScore - 1];
}

// ===============tableB===============
function getNeckInput() {
  neckRadio.forEach((item) => {
    if (item.checked) {
      tableBObject[`${item.name}`] = Number(item.value);
    }
  });
}
function getTrunkInput() {
  trunkRadio.forEach((item) => {
    if (item.checked) {
      tableBObject[`${item.name}`] = Number(item.value);
    }
  });
}
// function getTrunkSupportInput() {
//   trunkSupportedRadio.forEach((item) => {
//     if (item.checked) {
//       tableBObject[`${item.name}`] = Number(item.value);
//     }
//   });
// }
function getLegInput() {
  legRadio.forEach((item) => {
    if (item.checked) {
      tableBObject[`${item.name}`] = Number(item.value);
    }
  });
}
function getTableBCheckboxInputs() {
  tableBCheckboxes.forEach((item) => {
    if (item.checked) {
      tableBObject[`${item.name}`] = Number(item.value);
    }
  });
}
function getTableBForceInputs() {
  tableBForceSelection.forEach((item) => {
    if (item.checked) {
      tableBObject[`${item.name}`] = Number(item.value);
    }
  });
}

function getNeckScore() {
  getNeckInput();
  return (
    tableBObject.neckPos +
    tableBObject.twistedNeck +
    tableBObject.neckSideBending
  );
}
function getTrunkScore() {
  getTrunkInput();
  // getTrunkSupportInput();
  return (
    tableBObject.trunkPos +
    tableBObject.trunkTwisted +
    tableBObject.trunkSideBending
    // tableBObject.trunkSupported +
  );
}

function getTableBScore() {
  getLegInput();
  getTableBCheckboxInputs();
  let legScore = tableBObject.legSupported;
  const objSelectionArray = [trunk1, trunk2, trunk3, trunk4, trunk5, trunk6];
  return objSelectionArray[getTrunkScore() - 1][`leg${legScore}`][
    getNeckScore() - 1
  ];
}

// ===========Result===========
function getFinalScore(tableBScore, tableAScore) {
  getTableBForceInputs();
  tableBScore += tableBObject.tableBForceScore + tableBObject.tableBMuscleScore;

  getTableAForceInputs();
  tableAScore += tableAObject.tableAForceScore + tableAObject.tableAMuscleScore;

  const selectionArray = [
    finalTableColumn1,
    finalTableColumn2,
    finalTableColumn3,
    finalTableColumn4,
    finalTableColumn5,
    finalTableColumn6,
    finalTableColumn7,
  ];
  if (tableBScore > 7) {
    tableBScore = 7;
  }
  if (tableAScore > 8) {
    tableAScore = 8;
  }
  return selectionArray[tableBScore - 1][tableAScore - 1];
}

function displayScoreValues() {
  let tableBScore = getTableBScore();
  let tableAScore = getTableAScore();
  let finalScoreVal = getFinalScore(tableBScore, tableAScore);

  resultTableA.textContent = `${tableAScore}`;
  resultTableB.textContent = `${tableBScore}`;
  finalScore.textContent = `${finalScoreVal}`;
  displayFinalScoreColor(finalScoreVal);
}

function displayFinalScoreColor(finalScore) {
  if (finalScore < 3) {
    finalScoreBox.classList.add("score-green");
    finalScoreSeverity.textContent = "Acceptable";
  } else if (finalScore < 5) {
    finalScoreBox.classList.add("score-yellow");
    finalScoreSeverity.textContent = "Investigate further";
  } else if (finalScore < 7) {
    finalScoreBox.classList.add("score-orange");
    finalScoreSeverity.textContent = "Investigate further and change soon";
  } else {
    finalScoreBox.classList.add("score-red");
    finalScoreSeverity.textContent = "Investigate and change Immediately";
  }
}
// ===========TEMP===========
const displayResult = document.querySelector(".rula-result");
function tempRulaRunner() {
  displayResult.textContent = getTableAScore();
}
