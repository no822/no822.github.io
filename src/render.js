import * as L from "./list.js";
import * as A from "./area.js";

const cellWidth = 50;

const areaWidthLength = 10;
const areaHeightLength = 20;

const areaWidth = cellWidth * areaWidthLength;
const areaHeightght = cellWidth * areaHeightLength;

const containerClass = "container";

export function clear() {
  const gameAreaContainer = document.querySelector("." + containerClass);
  if (gameAreaContainer) {
    gameAreaContainer.remove();
  }
}

// render :: Area -> void
export function render(area, activeBlockColor) {
  const areaList = L.listToArray(area);
  const body = document.querySelector("body");
  body.style.display = "flex";
  body.style.justifyContent = "center";
  body.style.alignItems = "center";
  body.style.margin = "0px";
  body.style.height = "100vh";

  const areaContainer = gameAreaContainer();
  for (let y = 0; y < areaList.length; y++) {
    for (let x = 0; x < areaList[y].length; x++) {
      const axisValue = areaList[y][x];
      const newCell = cell(axisValue, activeBlockColor);
      areaContainer.append(newCell);
    }
  }

  body.append(areaContainer);
}

function gameAreaContainer() {
  const gameAreaContainer = document.createElement("div");
  gameAreaContainer.classList.add(containerClass);
  gameAreaContainer.style.gap = 0;
  gameAreaContainer.style.display = "grid";
  gameAreaContainer.style.gridTemplateColumns = `repeat(${areaWidthLength}, 1fr)`;
  gameAreaContainer.style.gridTemplateRows = `repeat(${areaHeightLength}, 1fr)`;
  gameAreaContainer.style.border = "2px solid black";
  return gameAreaContainer;
}

function cell(value, currentColor) {
  const newCell = document.createElement("div");
  newCell.style.width = cellWidth + "px";
  newCell.style.height = cellWidth + "px";
  newCell.style.border = "1px solid black";
  newCell.textContent = value; // for debug

  if (A.is_active(value)) {
    newCell.style.background = currentColor;
  }

  if (A.is_inactive(value)) {
    newCell.style.background = A.inactiveColor(value);
  }

  return newCell;
}
