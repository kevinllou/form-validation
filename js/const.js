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
    "it must contain at least 8 characters, one uppercase letter, lowercase letter, number and one special character <i class='fa-solid fa-circle-exclamation'>",
  passwordConfirmation:
    "The passwords do not match <i class='fa-solid fa-circle-exclamation'>",
};

export { regexForInputs, msgInput };
