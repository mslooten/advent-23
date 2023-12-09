const rawInput = await Bun.file("08/input.txt").text();

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

let result = "AAA";
let index = 0;

while (result !== "ZZZ" && index < 250000) {
  result = letterMap[result][instructions[index % instructions.length]];
  index++;
}

console.log("result " + result, index);
