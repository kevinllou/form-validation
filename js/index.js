import { msgInput } from "./const.js";
import { checkInputValidation, checkPasswordMatch } from "./helper.js";

const form = document.querySelector(".form");
const inputElements = document.querySelectorAll("input");
const keypressed = [];
const secretCode = "applaudo";
const closebtn = document.querySelector(".sectionModal__close");
const modal = document.querySelector(".sectionModal");

/* Event  listener to each input element*/
inputElements.forEach((inputElement) => {
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
      /* get the current password to validate */
      const currentPass = document.querySelector("#password").value;
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

/* ---- SUBMIT LISTENER ----*/

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
  /* Print out form data if there is no errors */
  if (validatedElements === values.length) {
    console.log(values);
  }
  event.preventDefault();
});

/* ---- KONAMI CODE ---- */

window.addEventListener("keyup", (event) => {
  /* Add the pressed key to the array */
  keypressed.push(event.key);
  /* Limit the length of the array by tracking just the last n (length of the secret code)
   letters so that way we can still compare with an small amount  */
  keypressed.splice(
    -secretCode.length - 1,
    keypressed.length - secretCode.length
  );
 /* If the secret code is pressed it will trigger a modal */
  if (keypressed.join("").includes(secretCode)) {
    modal.style.display = "flex";
  }
});

/* Close the modal once it's open */
closebtn.addEventListener("click", (event) => {
  if (modal.style.display === "flex") {
    modal.style.display = "none";
  }
});
