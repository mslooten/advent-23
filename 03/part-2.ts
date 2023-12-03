const rawInput = await Bun.file("03/input.txt").text();
const input = rawInput.split(/\n+/);

const starMap = {};

input.forEach((line, index) => {
  const matches = line.matchAll(/[\*]/g);
  for (const match of matches) {
    starMap[`${index}_${match.index}`] = [];
  }
});

const fillStarMap = (
  str: string,
  arrIndex: number,
  offset: number,
  nr: number
) => {
  const matches = str.matchAll(/[\*]/g);
  for (const match of matches) {
    Array.isArray(starMap[`${arrIndex}_${match.index + offset}`])
      ? starMap[`${arrIndex}_${match.index + offset}`].push(nr)
      : (starMap[`${arrIndex}_${match.index + offset}`] = [nr]);
  }
};

const mapToStarMap = (
  index: number,
  indexStart: number,
  indexEnd: number,
  arr: string[],
  nr: number
) => {
  if (index > 0) {
    fillStarMap(
      arr[index - 1].substring(indexStart, indexEnd),
      index - 1,
      indexStart,
      nr
    );
  }
  fillStarMap(
    arr[index].substring(indexStart, indexEnd),
    index,
    indexStart,
    nr
  );
  if (index < arr.length - 1) {
    fillStarMap(
      arr[index + 1].substring(indexStart, indexEnd),
      index + 1,
      indexStart,
      nr
    );
  }
};

input.forEach((line, index, arr) => {
  const matches = line.matchAll(/\d+/g);
  for (const match of matches) {
    const indexStart = match.index > 0 ? match.index - 1 : match.index;
    const indexEnd = match.index + match[0].length + 1;
    mapToStarMap(index, indexStart, indexEnd, arr, Number(match[0]));
  }
});

const filteredAndMultiplied = Object.values(starMap)
  .filter((arr: number[]) => {
    return arr.length > 1;
  })
  .flatMap((arr: number[]) => arr.reduce((a, b) => a * b));

const result = filteredAndMultiplied.reduce((a, b) => {
  return a + b;
}, 0);

console.log(result);
