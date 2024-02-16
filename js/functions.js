function checkLengthString(string, length) {
  if(string.length <= length) {
    return true;
  }

  return false;
}

// Строка короче 20 символов
checkLengthString('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkLengthString('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkLengthString('проверяемая строка', 10); // false

function isPalindrome(string) {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  const length = normalizeString.length - 1;
  let newString = '';
  for(let i = length; i >= 0; i--) {
    newString += normalizeString[i];
  }

  if(normalizeString === newString){
    return true;
  }

  return false;
}

isPalindrome('топот'); //true
isPalindrome('ДовОд'); //true
isPalindrome('Кекс'); //false
isPalindrome('Лёша на полке клопа нашёл '); // true

function extractNumber(string) {
  string = string.toString();
  let newString = '';
  for(let i = 0; i < string.length; i++) {
    const char = string[i];
    if(!Number.isNaN(parseInt(char, 10))) {
      newString += char;
    }
  }

  return parseInt(newString, 10);
}

extractNumber('2023 год'); //2023
extractNumber('ECMAScript 2022'); //2022
extractNumber('1 кефир, 0.5 батона');//105
extractNumber('агент 007'); //7
extractNumber('а я томат'); //NaN
extractNumber(2023); //2023
extractNumber(-1);// 1
extractNumber(1.5);//15
