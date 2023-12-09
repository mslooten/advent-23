const rawInput = await Bun.file("07/input.txt").text();
const example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
const input = rawInput.split(/\n+/).map((val) => val.split(" "));

// console.log(input);

const results = [[], [], [], [], [], [], []];

const typeOfHand = (hand) => {
  const handResult = {};
  const cards = hand.split("");
  cards.forEach((hand) => {
    handResult[hand] ? handResult[hand]++ : (handResult[hand] = 1);
  });
  const counts = Object.values(handResult).sort(
    (a: number, b: number) => b - a
  );
  if (counts[0] === 5) {
    results[0].push(hand);
  }
  if (counts[0] === 4) {
    results[1].push(hand);
  }
  if (counts[0] === 3) {
    if (counts[1] === 2) {
      results[2].push(hand);
    } else {
      results[3].push(hand);
    }
  }
  if (counts[0] === 2) {
    if (counts[1] === 2) {
      results[4].push(hand);
    } else {
      results[5].push(hand);
    }
  }
  if (counts[0] === 1) {
    results[6].push(hand);
  }
};

input.forEach((line) => {
  typeOfHand(line[0]);
});
// console.log(results);

const letters = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
].reverse();

const sorter = (a, b) => {
  const first = letters.indexOf(a);
  const second = letters.indexOf(b);
  return second - first;
};

const res = results.map((group) => {
  return group.sort((a, b) => {
    let i = 0;
    let sortRes = 0;
    while (i < 5 && sortRes === 0) {
      sortRes = sorter(a[i], b[i]);
      i++;
    }
    return sortRes;
  });
});

console.log(res);

const finalRes = res
  .flat()
  .reverse()
  .map((val, i) => {
    const nr = input.find((item) => item[0] === val)?.[1];
    console.log(val, nr, i);
    if (nr) {
      return Number(nr) * (i + 1);
    }
    return i;
  })
  .reduce((acc: number, curr: number) => {
    return acc + curr;
  }, 0);

console.log(finalRes);
