const rawInput = await Bun.file("06/input.txt").text();

const [time, distance] = rawInput
  .split(/\n+/)
  .map((line) => Number(line.match(/\d+/g).join("")));

let result = 0;
for (let i = 0; i < time; i++) {
  const restTime = time - i;
  const raceResult = restTime * i;
  if (raceResult > distance) {
    result++;
  }
}

console.log(result);
