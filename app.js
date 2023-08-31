// function getRandom(min, max) {
//     return Math.trunc(Math.random() * (max - min + 1)) + min;
// }
// console.log(getRandom(0, 2));

function getRandomNumber(min, max) {
    let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0]
    // 32 bits = max de 0 à 4 294 967 295
    randomNumber = randomNumber / 4294967296
    return Math.trunc(randomNumber * (max - min + 1)) + min;
}
console.log(getRandomNumber(0, 5));

function addASet(fromCode, toCode) {
    let characterList = "";
    for (let i = fromCode; i <= toCode; i++) {
        characterList += String.fromCharCode(i)
    }
    return characterList;
}

const charactersSet = {
    lowerCaseChars: addASet(97, 122),
    upperCaseChars: addASet(65, 90),
    numbers: addASet(48, 57),
    symbols: addASet(33, 47) + addASet(58, 64) + addASet(91, 96) + addASet(123, 126)
}
let numbersList = addASet(48, 57)
let lowerCaseCharsList = addASet(97, 122)
let upperCaseCharsList = addASet(65, 90)
let symbolsList = addASet(48, 57)
console.log(charactersSet);