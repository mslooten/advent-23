const rawInput = await Bun.file("04/input.txt").text();

const input = rawInput.split(/\n+/);

const points = input.map((line) => {
  const [firstPart, secondPart] = line.substring(10).split("|");
  const winners = [...firstPart.match(/\d+/g)];
  const scratchNrs = [...secondPart.match(/\d+/g)];

  const result = winners.map((winner) => {
    return scratchNrs.includes(winner);
  });
  const nrOfCorrect = result.filter((winOrNot) => Boolean(winOrNot)).length;
  return nrOfCorrect;
});

console.log(points);

// card map
// index + 1 = card nr
// value = number of resulting cards

// card 0 => 1, 2, 3, 4, 5, 6, 7, 8
// card 1 => 2, 3, 4, 5,
// card 2 => 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
