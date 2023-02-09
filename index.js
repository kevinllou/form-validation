const form = document.querySelector(".form");
const firstName = document.querySelector("#firstname");

/* REGEX OBJECT  */
const regexForInputs = {
  firstName: /^[\p{L} ,.'-]+$/u,
  lastName: /^[\p{L} ,.'-]+$/u,
  phoneNumber: /^\d{4}[-]\d{4}$/,
  email: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
  age: /^[1-9][0-9]$/,
  website:
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
};

/* OBJECT MESSAGE */
const msgInput = {
  firstName: "Please provide a valid name",
  lastName: "Please provide a valid last name",
  phoneNumber: "It must be a valid phone number Ej [7809-9087]",
  email: "Please provide a valid email",
  age: "Please provide a valid age. Ej [1 - 99]",
  website: "Please provide a valid website URL",
};

/* EVENT FOR FIRST NAME*/
var inputs = document.querySelectorAll('input[type="text"]');
inputs.forEach((inputElement) => {
  inputElement.addEventListener("input", (event) => {
    const inputId = inputElement.id;
    /* get the id span value by merging strings */
    const tempString = `msg${inputId
      .charAt(0)
      .toUpperCase()}${inputId.substring(1)}`;
    const span = document.getElementById(tempString);
    /* Check if the input value matches with the regex rule */
    checkInput(inputId, event.target.value, span);
  });
});

/* If it doesn't match we change the span value to an error, if not, 
   we remove the span error message.
 */
function checkInput(idReference, currentValue, spanElem) {
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
        .toUpperCase()}${inputValue[0].substring(1, inputValue[0].length)}`;
      const spanElement = document.querySelector(tempCharacter);
      spanElement.innerHTML = msgInput[inputValue[0]];
    }
  });
  event.preventDefault();
});
