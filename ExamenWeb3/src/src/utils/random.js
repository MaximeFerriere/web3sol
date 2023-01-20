// Get random number
const randomNum = (max) => Math.floor(Math.random() * max);

// Get random date for a year
const randomDate = (year) =>
  new Date(
    +new Date(+year, 0) +
      Math.random() *
        (new Date(+year + 1, 0).getTime() - new Date(+year, 0).getTime())
  );

// get random item
const randomItem = (items) => items[randomNum(items.length)];

export { randomNum, randomDate, randomItem };
