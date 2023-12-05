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
console.log(seeds);

let minVal: { val: number; source?: number } = {
  val: 4294967295,
};

const locationResolver = (source: number) => {
  let index = 1;
  let searchVal = source;
  while (index < 8) {
    const foundArr = input[index].find((inner) => {
      return inner[1] <= searchVal && inner[1] + inner[2] >= searchVal;
    });
    if (foundArr) {
      searchVal = foundArr[0] + searchVal - foundArr[1];
      if (index === 7) {
        if (minVal.val > searchVal) {
          minVal.source = source;
          minVal.val = searchVal;
        }
      }
    } else {
      if (index === 7) {
        if (minVal.val > searchVal) {
          minVal.source = source;
          minVal.val = searchVal;
        }
      }
    }
    index++;
  }
};

for (let i = 0; i <= seeds.length / 2; i += 2) {
  for (let j = seeds[i]; j < seeds[i] + seeds[i + 1]; j += 100000) {
    locationResolver(j);
  }
}

for (let i = minVal.source - 99999; i < minVal.source; i++) {
  locationResolver(i);
}
console.log(minVal);

console.timeEnd();
