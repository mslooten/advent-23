const rawInput = await Bun.file("08/input.txt").text();
const example = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const input = rawInput.split(/\n+/);

const instructions = input
  .shift()
  .split("")
  .map((lOrR) => (lOrR === "L" ? 0 : 1));

const letterMap = {};

input.forEach((line) => {
  const [key, ...letterParts] = line.match(/\w+/g);
  letterMap[key] = letterParts;
});

const endsWithA = Object.keys(letterMap).filter((letters) =>
  letters.endsWith("A")
);

const resultMap = {};

endsWithA.forEach((val) => {
  resultMap[val] = [];
  let result = val;
  let index = 0;

  while (index < 250000) {
    result = letterMap[result][instructions[index % instructions.length]];
    if (result.endsWith("Z")) {
      resultMap[val].push(index);
    }
    index++;
  }
});

console.log(resultMap);
