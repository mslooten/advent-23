const rawInput = await Bun.file("05/input.txt").text();
console.time();
const input = rawInput.split(/\n\n/).map((val) => {
  return val
    .split(/\n/)
    .map((sub) =>
      sub
        .match(/\d+/g)
        ?.filter((val) => val)
        .map(Number)
    )
    .filter(Boolean);
});

const seeds = input[0][0];

const locationResolver = (source: number): number => {
  let index = 1;
  let searchVal = source;
  while (index < 8) {
    const foundArr = input[index].find((inner) => {
      return inner[1] <= searchVal && inner[1] + inner[2] >= searchVal;
    });
    if (foundArr) {
      searchVal = foundArr[0] + searchVal - foundArr[1];
      if (index === 7) return searchVal;
    }
    index++;
  }
  return searchVal;
};

const result = Math.min(...seeds.map((seed) => locationResolver(seed)));

console.log(result);
console.timeEnd();
