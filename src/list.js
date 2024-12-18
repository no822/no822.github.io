import * as A from "./area.js";

export function pair(x, y) {
  function set_x(v) {
    x = v;
  }

  function set_y(v) {
    y = v;
  }

  function dispatch(n) {
    return n === 0
      ? x
      : n === 1
        ? y
        : n === "set_head"
          ? set_x
          : n === "set_tail"
            ? set_y
            : "error";
  }

  return dispatch;
}

export function set_head(z, new_value) {
  z("set_head")(new_value);
  return z;
}

export function set_tail(z, new_value) {
  z("set_tail")(new_value);
  return z;
}

export function is_pair(p) {
  return typeof p === "function" && head(p) !== undefined;
}

export function is_null(n) {
  return n == null;
}

export function head(p) {
  return p(0);
}

export function tail(p) {
  return p(1);
}

export function list(...items) {
  const [first, ...rest] = items;
  if (is_null(first)) return null;
  return pair(first, list(...rest));
}

/**
 * list 함수로 만든 연결리스트를 배열로 변환합니다.
 */
export function listToArray(list) {
  if (is_null(list)) return [];
  return is_pair(head(list))
    ? [listToArray(head(list)), ...listToArray(tail(list))]
    : [head(list), ...listToArray(tail(list))];
}

/**
 * 배열을 list 연결리스트로 변환합니다. 2중첩 배열까지 지원합니다.
 * TODO 재귀 버전으로 재구현
 */
export function arrayToList(array) {
  const accList = [];

  for (const item of array) {
    if (Array.isArray(item)) {
      accList.push(list(...item));
    } else {
      accList.push(item);
    }
  }

  return list(...accList);
}

export function copy_list(list) {
  return arrayToList(listToArray(list));
}

export function for_each(list, callback) {
  if (is_null(list)) return;

  if (is_pair(head(list))) {
    for_each(head(list), callback);
  } else {
    callback(head(list), callback);
  }

  return for_each(tail(list), callback);
}

export function filter(list, predicate) {
  return arrayToList(listToArray(list).filter(predicate));
}

export function map(list, callback) {
  return arrayToList(
    listToArray(list).map((yItem, yIndex) => {
      if (Array.isArray(yItem)) {
        return yItem.map((xItem, xIndex) => callback(xItem, xIndex, yIndex));
      }
      return callback(yItem, yIndex);
    }),
  );
}

export function point(x, y, list) {
  try {
    const result = listToArray(list)[y][x];
    return result;
  } catch (error) {
    return null;
  }
}

export function find_coordinate(l, n) {
  const array = listToArray(l);
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === n) {
        return list(j, i);
      }
    }
  }
  return null;
}

export function set_point(x, y, value, list) {
  try {
    const targetList = listToArray(list);
    targetList[y][x] = value;
    return arrayToList(targetList);
  } catch {
    return list;
  }
}

export function move_active_points(list) {
  return function (moveInfos) {
    const deleted = moveInfos.reduce((newList, [sourceX, sourceY]) => {
      return set_point(sourceX, sourceY, A.empty(), newList);
    }, list);

    const moved = moveInfos.reduce((deletedNewList, [, , targetX, targetY]) => {
      return set_point(targetX, targetY, A.active(), deletedNewList);
    }, deleted);

    return moved;
  };
}
