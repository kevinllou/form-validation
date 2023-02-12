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
  firstName:
    "Please provide a valid name <i class='fa-solid fa-circle-exclamation'></i>",
  lastName:
    "Please provide a valid last name <i class='fa-solid fa-circle-exclamation'></i>",
  phoneNumber:
    "Please provide a valid phone number Ej [7809-9087] <i class='fa-solid fa-circle-exclamation'></i>",
  email:
    "Please provide a valid email <i class='fa-solid fa-circle-exclamation'>",
  age: "Please provide a valid age. Ej [1 - 99] <i class='fa-solid fa-circle-exclamation'>",
  website:
    "Please provide a valid website URL <i class='fa-solid fa-circle-exclamation'>",
  password:
    "it must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character <i class='fa-solid fa-circle-exclamation'>",
  passwordConfirmation:
    "The passwords do not match <i class='fa-solid fa-circle-exclamation'>",
};

const inputTexts = document.querySelectorAll("input");

/* Add event  listener to each input text type*/
inputTexts.forEach((inputElement) => {
  inputElement.addEventListener("input", (event) => {
    const inputId = inputElement.id;
    /* get the id span value by merging strings */
    const tempString = `msg${inputId
      .charAt(0)
      .toUpperCase()}${inputId.substring(1)}`;
    const span = document.getElementById(tempString);

    if (inputId !== "passwordConfirmation") {
      checkInputValidation(inputId, event.target.value, inputElement, span);
    } else {
      /* get the current password to compare */
      let currentPass = document.querySelector("#password").value;
      checkPasswordMatch(
        currentPass,
        event.target.value,
        inputElement,
        inputId,
        span
      );
    }
  });
});

/* Check if the passwords match */
function checkPasswordMatch(
  passwordVal,
  passwordCheck,
  inputElem,
  idReference,
  spanElem
) {
  /*   console.log(`ps1: ${passwordVal}, ps2: ${passwordCheck}`); */
  if (!passwordVal.includes(passwordCheck)) {
    spanElem.innerHTML = msgInput[idReference];
    inputElem.style.border = "2px solid #b43333";
  } else {
    spanElem.innerHTML = "";
    inputElem.style.border = "";
  }
}

/* If it doesn't match we change the span value to an error, if not, 
   we remove the span error message.
 */
function checkInputValidation(idReference, currentValue, inputElem, spanElem) {
  if (!regexForInputs[idReference].test(currentValue)) {
    spanElem.innerHTML = msgInput[idReference];
    inputElem.style.border = "1.5px solid #b43333";
  } else {
    spanElem.innerHTML = "";
    inputElem.style.border = "";
  }
}

/* SUBMIT */

form.addEventListener("submit", (event) => {
  /* Get the form data through the object Form Data */
  const formData = new FormData(form);
  const values = [...formData.entries()];
  let validatedElements = values.length;

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

      const inputElement = document.getElementById(inputValue[0]);
      const spanElement = document.querySelector(tempCharacter);

      inputElement.style.border = inputElement.style.border =
        "1.5px solid #b43333";
      spanElement.innerHTML = msgInput[inputValue[0]];

      /* Decrease the number of inputs which haven't been submitted correctly */
      validatedElements--;
    }
  });
  console.log(validatedElements);
  /* Print out form data if there is no errors */
  if (validatedElements === values.length) {
    console.log(values);
  }

  event.preventDefault();
});
