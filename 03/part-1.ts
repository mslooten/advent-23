const rawInput = await Bun.file("03/input.txt").text();
const input = rawInput.split(/\n+/);

let total = 0;

const isAdjacentSymbol = (
  index: number,
  indexStart: number,
  indexEnd: number,
  arr: string[]
): boolean => {
  let search = "";
  if (index > 0) {
    search += arr[index - 1].substring(indexStart, indexEnd);
  }
  search += arr[index].substring(indexStart, indexEnd);
  if (index < arr.length - 1) {
    search += arr[index + 1].substring(indexStart, indexEnd);
  }
  return search.match(/[^\w\s.]/)?.length > 0;
};

input.forEach((line, index, arr) => {
  const matches = line.matchAll(/\d+/g);
  for (const match of matches) {
    const indexStart = match.index - 1;
    const indexEnd = match.index + match[0].length + 1;
    if (isAdjacentSymbol(index, indexStart, indexEnd, arr)) {
      total += Number(match[0]);
    }
  }
});
console.log(total);
