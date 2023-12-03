const rawInput = await Bun.file("01/input.txt").text();
const input = rawInput.split(/\n+/);

const firstAndLastDigit = (str: string) => {
  let firstDigit: string;
  let lastDigit: string;
  for (let letter of str) {
    if (letter.match(/\d/)) {
      firstDigit = letter;
      break;
    }
  }
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i].match(/\d/)) {
      lastDigit = str[i];
      break;
    }
  }
  return Number(firstDigit + lastDigit);
};

const answer: number = input.reduce((acc: number, curr: string) => {
  return acc + firstAndLastDigit(curr);
}, 0);

console.log(answer);
