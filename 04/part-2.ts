const rawInput = await Bun.file("04/input.txt").text();
const input = rawInput.split(/\n+/);

const mapOfCards: { [key: string]: { value?: number; count: number } } = {};

input.forEach((line, index) => {
  const [firstPart, secondPart] = line.substring(10).split("|");
  const winners = firstPart.match(/\d+/g);
  const scratchNrs = secondPart.match(/\d+/g);

  const amountCorrect = winners.flatMap((winner) => {
    return scratchNrs.includes(winner) || [];
  }).length;

  const nrOfCards = mapOfCards[index]?.count ? mapOfCards[index].count + 1 : 1;

  mapOfCards[index] = {
    value: amountCorrect,
    count: nrOfCards,
  };

  for (let i = index + 1; i <= index + amountCorrect; i++) {
    if (mapOfCards[i]?.count) {
      mapOfCards[i].count = mapOfCards[i].count + nrOfCards;
    } else {
      mapOfCards[i] = { count: nrOfCards };
    }
  }
  return amountCorrect;
});

const result = Object.values(mapOfCards).reduce((a, b) => {
  return a + b.count;
}, 0);

console.log(result);
