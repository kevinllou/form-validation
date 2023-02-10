const form = document.querySelector(".form");

/* REGEX OBJECT  */
const regexForInputs = {
  firstName: /^[\p{L} ,.'-]+$/u,
  lastName: /^[\p{L} ,.'-]+$/u,
  phoneNumber: /^\d{4}[-]\d{4}$/,
  email: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
  age: /^[1-9][0-9]$/,
  website:
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

/* OBJECT MESSAGE */
const msgInput = {
  firstName: "Please provide a valid name",
  lastName: "Please provide a valid last name",
  phoneNumber: "Please provide a valid phone number Ej [7809-9087]",
  email: "Please provide a valid email",
  age: "Please provide a valid age. Ej [1 - 99]",
  website: "Please provide a valid website URL",
  password:
    "it must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  passwordConfirmation: "The passwords do not match",
};

const inputTexts = document.querySelectorAll("input");

/* Add event  listener to each input text type*/
inputTexts.forEach((inputElement) => {
  inputElement.addEventListener("input", (event) => {
    const inputId = inputElement.id;
    let lastPasswordValue = "";
    /* get the id span value by merging strings */
    const tempString = `msg${inputId
      .charAt(0)
      .toUpperCase()}${inputId.substring(1)}`;
    const span = document.getElementById(tempString);

    if (inputId !== "password") {
      checkPasswordMatch(lastPasswordValue, inputElement.value, inputId, span);
    } else {
      lastPasswordValue = inputElement.value;
      checkInputValidation(inputId, inputElement.value, span);
    }
  });
});

/* Check if the passwords match */
function checkPasswordMatch(passwordVal, passwordCheck,idReference, spanElem) {
  if (!passwordVal.includes(passwordCheck)) {
    spanElem.innerHTML = msgInput[idReference];
  } else {
    spanElem.innerHTML = "";
  }
}

/* If it doesn't match we change the span value to an error, if not, 
   we remove the span error message.
 */
function checkInputValidation(idReference, currentValue, spanElem) {
  if (!regexForInputs[idReference].test(currentValue)) {
    spanElem.innerHTML = msgInput[idReference];
  } else {
    spanElem.innerHTML = "";
  }
}

/* SUBMIT */

form.addEventListener("submit", (event) => {
  /* Get the form data through the object Form Data */
  const formData = new FormData(form);
  const values = [...formData.entries()];

  /* Loop through every input to check if there is information avaliable, if not,
    we alert the user that he needs to enter valid information. 
  */

  values.forEach((inputValue) => {
    if (inputValue[1] === "") {
      /* Get access to the span element of each input to alert the user that
          there is information missing.
       */
      const tempCharacter = `#msg${inputValue[0]
        .charAt(0)
        .toUpperCase()}${inputValue[0].substring(1)}`;
      const spanElement = document.querySelector(tempCharacter);
      spanElement.innerHTML = msgInput[inputValue[0]];
    }
  });
  event.preventDefault();
});
