const rawInput = await Bun.file("01/input.txt").text();
const input = rawInput.split(/\n+/);

const writtenNumbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const replaceWrittenNumber = (str: string) => {
  return str.replaceAll(
    /(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g,
    (writtenNumber) =>
      writtenNumbers[writtenNumber] + writtenNumber[writtenNumber.length - 1]
  );
};

const firstAndLastDigit = (str: string) => {
  const parsedStr = replaceWrittenNumber(replaceWrittenNumber(str)); // do it twice for the overlapping edge cases
  let firstDigit: string;
  let lastDigit: string;
  for (let letter of parsedStr) {
    if (letter.match(/\d/)) {
      firstDigit = letter;
      break;
    }
  }
  for (let i = parsedStr.length - 1; i >= 0; i--) {
    if (parsedStr[i].match(/\d/)) {
      lastDigit = parsedStr[i];
      break;
    }
  }
  return Number(firstDigit + lastDigit);
};

const answer: number = input.reduce((acc: number, curr: string) => {
  return acc + firstAndLastDigit(curr);
}, 0);

console.log(answer);
