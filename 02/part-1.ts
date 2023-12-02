const rawInput = await Bun.file("02/input.txt").text();
const input = rawInput.split(/\n+/);

let count = 0;

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

input.forEach((game, index) => {
  const red = Math.max(
    ...game.match(/\d+(?=\sred)/g).map((val) => parseInt(val, 10))
  );
  const green = Math.max(
    ...game.match(/\d+(?=\sgreen)/g).map((val) => parseInt(val, 10))
  );
  const blue = Math.max(
    ...game.match(/\d+(?=\sblue)/g).map((val) => parseInt(val, 10))
  );

  if (red > MAX_RED || green > MAX_GREEN || blue > MAX_BLUE) return;
  else {
    count += index + 1;
  }
});

console.log(count);
