"use strict";

let tableAObject = {
  upperArmPos: 0,
  shoulderRaised: 0,
  armAbducted: 0,
  armSupported: 0,

  lowerArmPos: 0,
  lowerArmAdjustment: 0,

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

const tableARadios = document.querySelectorAll(
  `.rula-table-a input[type="radio"]`
);
const armsCheckboxes = document.querySelectorAll(
  `.rula-table-a input[type="checkbox"]`
);

const tableBRadios = document.querySelectorAll(
  `.rula-table-b input[type="radio"]`
);
const tableBCheckboxes = document.querySelectorAll(
  `.rula-table-b input[type="checkbox"]`
);

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
  checkRadioState(tableARadios, 4) ? switchToNextView() : throwWarning(4);
});
tableBBtn.addEventListener("click", () => {
  if (checkRadioState(tableBRadios, 3)) {
    switchToResultsView();
    displayScoreValues();
  } else {
    throwWarning(3);
  }
});

function switchToNextView() {
  tableAView.classList.add("hidden-block");
  tableBView.classList.remove("hidden-block");
  document.querySelector("header").scrollIntoView();
}
function switchToResultsView() {
  tableBView.classList.add("hidden-block");
  resultView.classList.remove("hidden-block");
  finalScoreBox.scrollIntoView();
}

function checkRadioState(radioNodes, radioLimit) {
  let itemCount = 0;

  radioNodes.forEach((item) => {
    if (item.checked == true) {
      itemCount += 1;
    }
  });

  return itemCount >= radioLimit ? true : false;
}

function throwWarning(items) {
  alert(
    `You must select at least 1 choice in each of the top ${items} sections`
  );
}

// ===============tableA===============
function getTableARadioInputs() {
  tableARadios.forEach((item) => {
    if (item.checked) {
      tableAObject[item.name] = Number(item.value);
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

function calcUpperArmScore() {
  return (
    tableAObject.upperArmPos +
    tableAObject.shoulderRaised +
    tableAObject.armAbducted +
    tableAObject.armSupported
  );
}
function calcLowerArmScore() {
  return tableAObject.lowerArmPos + tableAObject.lowerArmAdjustment;
}
function calcWristScore() {
  return tableAObject.wristPos + tableAObject.wristMidline;
}

function calcTableAScore() {
  getTableARadioInputs();
  getTableACheckboxInputs();

  const upperArmScore = calcUpperArmScore();
  const lowerArmScore = calcLowerArmScore();
  const wristScore = calcWristScore();
  const wristTwistScore = tableAObject.wristTwist;
  const columnSelectionArray = [wrist1, wrist2, wrist3, wrist4];
  return columnSelectionArray[wristScore - 1][`wristTwist${wristTwistScore}`][
    upperArmScore - 1
  ][lowerArmScore - 1];
}

// ===============tableB===============
function getTableBRadioInputs() {
  tableBRadios.forEach((item) => {
    if (item.checked) {
      tableBObject[item.name] = Number(item.value);
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

function calcNeckScore() {
  return (
    tableBObject.neckPos +
    tableBObject.twistedNeck +
    tableBObject.neckSideBending
  );
}
function calcTrunkScore() {
  return (
    tableBObject.trunkPos +
    tableBObject.trunkTwisted +
    // tableBObject.trunkSupported +
    tableBObject.trunkSideBending
  );
}

function calcTableBScore() {
  getTableBRadioInputs();
  getTableBCheckboxInputs();
  const legScore = tableBObject.legSupported;
  const columnSelectionArray = [trunk1, trunk2, trunk3, trunk4, trunk5, trunk6];
  return columnSelectionArray[calcTrunkScore() - 1][`leg${legScore}`][
    calcNeckScore() - 1
  ];
}

// ===========Result===========
function getFinalScore(tableBScore, tableAScore) {
  tableBScore += tableBObject.tableBForceScore + tableBObject.tableBMuscleScore;

  tableAScore += tableAObject.tableAForceScore + tableAObject.tableAMuscleScore;

  const columnSelectionArray = [
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
  return columnSelectionArray[tableBScore - 1][tableAScore - 1];
}

function displayScoreValues() {
  const tableBScore = calcTableBScore();
  const tableAScore = calcTableAScore();
  const finalScoreVal = getFinalScore(tableBScore, tableAScore);

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
