import * as L from "./list.js";
import * as A from "./area.js";

// moveBlock :: Area -> Direction -> Area
export function moveBlock(area, direction) {
  return direction === "left"
    ? internal_moveBlock(area, -1, 0)
    : direction === "right"
      ? internal_moveBlock(area, 1, 0)
      : direction === "down"
        ? internal_moveBlock(area, 0, 1)
        : direction === "up"
          ? internal_moveBlock(area, 0, -1)
          : "error";
}

// removeActive :: list -> list
function removeActive(list) {
  return L.map(list, (item) => {
    if (A.is_active(item)) return A.empty();
    return item;
  });
}

// internal_moveBlock :: area -> xMove -> yMove -> area
function internal_moveBlock(area, xMove, yMove) {
  return (function recur(nextCoordInfos, currentArea) {
    if (nextCoordInfos.length === 0) return currentArea;

    const [[x, y, point], ...rest] = nextCoordInfos;
    const newArea = L.set_point(x, y, point, currentArea);

    return recur(rest, newArea);
  })(A.activeMap(area, xMove, yMove), removeActive(area));
}