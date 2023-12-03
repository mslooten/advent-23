const rawInput = await Bun.file("03/input.txt").text();
const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
const input = testInput.split(/\n+/);

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
  const found = search.match(/[\*]/)?.length > 0;
  if (found) {
    console.log(search.matchAll(/[\*]/g));
  }
  return search.match(/[\*]/)?.length > 0;
};

const mapOfAsterisks = {};

input.forEach((line, index, arr) => {
  const matches = line.matchAll(/\d+/g);
  for (const match of matches) {
    const indexStart = match.index - 1;
    const indexEnd = match.index + match[0].length + 1;
    if (isAdjacentSymbol(index, indexStart, indexEnd, arr)) {
      const nr = parseInt(match[0], 10);
      total += nr;
    }
  }
});
console.log(total);
