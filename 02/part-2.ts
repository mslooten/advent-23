const rawInput = await Bun.file("02/input.txt").text();
const input = rawInput.split(/\n+/);

const maxPowers = input.map((game) => {
  const red = Math.max(
    ...game.match(/\d+(?=\sred)/g).map((val) => parseInt(val, 10))
  );
  const green = Math.max(
    ...game.match(/\d+(?=\sgreen)/g).map((val) => parseInt(val, 10))
  );
  const blue = Math.max(
    ...game.match(/\d+(?=\sblue)/g).map((val) => parseInt(val, 10))
  );

  return red * green * blue;
});

const result = maxPowers.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(result);
