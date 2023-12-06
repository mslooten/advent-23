const rawInput = await Bun.file("06/input.txt").text();

const [time, distance] = rawInput
  .split(/\n+/)
  .map((line) => line.match(/\d+/g).map(Number));

const winningTimes = time.map((raceTime, index) => {
  let count = 0;
  for (let i = 0; i < raceTime; i++) {
    const restTime = raceTime - i;
    const result = restTime * i;
    if (result > distance[index]) {
      count++;
    }
  }
  return count;
});

const result = winningTimes.reduce((acc, curr) => acc * curr);

console.log(result);
