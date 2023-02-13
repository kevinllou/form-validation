import { regexForInputs, msgInput } from "./const.js";

function checkPasswordMatch(
  passwordVal,
  passwordCheck,
  inputElem,
  idReference,
  spanElem
) {
  if (!passwordVal.includes(passwordCheck)) {
    spanElem.innerHTML = msgInput[idReference];
    inputElem.style.border = "2px solid #b43333";
  } else {
    spanElem.innerHTML = "";
    inputElem.style.border = "";
  }
}

function checkInputValidation(idReference, currentValue, inputElem, spanElem) {
  if (!regexForInputs[idReference].test(currentValue)) {
    spanElem.innerHTML = msgInput[idReference];
    inputElem.style.border = "1.5px solid #b43333";
  } else {
    spanElem.innerHTML = "";
    inputElem.style.border = "";
  }
}

export { checkPasswordMatch, checkInputValidation };
