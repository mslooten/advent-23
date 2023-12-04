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
  return nrOfCorrect > 0 ? 1 * Math.pow(2, nrOfCorrect - 1) : 0;
});

const result = points.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(result);
