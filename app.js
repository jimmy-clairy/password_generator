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

const copyBtn = document.querySelector(".copy-btn")
copyBtn.addEventListener('click', handlePasswordCopy)
let locked = false
function handlePasswordCopy() {
    const password = document.querySelector('.password-content').textContent
    navigator.clipboard.writeText(password)

    if (!locked) {
        copyBtn.classList.add("active")
        locked = true;
        setTimeout(() => {
            copyBtn.classList.remove("active")
            locked = false;
        }, 600)
    }
}

const checkboxes = document.querySelectorAll('.checkbox-group input')
const rangeInput = document.querySelector('.range-group input')
const rangeLabel = document.querySelector('.range-group label')
updateRangeLabel()

function updateRangeLabel() {
    rangeLabel.textContent = `Taille du mot de passe : ${rangeInput.value}`
}

const passwordSettings = {
    length: rangeInput.value,
    ifLowerCaseChars: checkboxes[0].checked,
    ifUpperCaseChars: checkboxes[1].checked,
    ifNumbers: checkboxes[2].checked,
    ifSymbols: checkboxes[3].checked,
}

rangeInput.addEventListener('change', handleInputChange)
function handleInputChange() {
    updateRangeLabel()
    passwordSettings.length = rangeInput.value
}

checkboxes.forEach(checkbox => checkbox.addEventListener('change', handleCheckboxChange))
function handleCheckboxChange(e) {
    if (e.target.id === 'lowerCaseChars') { passwordSettings.ifLowerCaseChars = e.target.checked }
    if (e.target.id === 'upperCaseChars') { passwordSettings.ifUpperCaseChars = e.target.checked }
    if (e.target.id === 'numbers') { passwordSettings.ifNumbers = e.target.checked }
    if (e.target.id === 'symbols') { passwordSettings.ifSymbols = e.target.checked }
}

const btnGenerate = document.querySelector('.generate-password-btn')
btnGenerate.addEventListener('click', handleGenerate)

function handleGenerate() {
    const password = `${passwordSettings.ifLowerCaseChars ? charactersSet.lowerCaseChars : ''}${passwordSettings.ifUpperCaseChars ? charactersSet.upperCaseChars : ''}${passwordSettings.ifNumbers ? charactersSet.numbers : ''}${passwordSettings.ifSymbols ? charactersSet.symbols : ''}`

    if (password === '') {
        alert('Choisi des options')
        return
    }

    let passwordGenerate = ''
    for (let index = 0; index < passwordSettings.length; index++) {
        passwordGenerate += password[getRandomNumber(0, password.length - 1)]
    }
    const passwordText = document.querySelector('.password-content')
    passwordText.textContent = passwordGenerate
}
handleGenerate()