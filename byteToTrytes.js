

function byteToTrytes(char) {
  var availValues = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  var asciiValue = char.charCodeAt(0);

  var firstValue = asciiValue % 27;
  var secondValue = (asciiValue - firstValue) / 27;

  console.log(firstValue, secondValue);

  var trytesValue = availValues[firstValue] + availValues[secondValue];

  return trytesValue;
}

console.log(byteToTrytes())
