const form = document.querySelector(".contact-form");
const fullName = document.querySelector("#name");
const nameError = document.querySelector("#fullNameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const messageSuccess = document.querySelector(".message-success")

function validateForm() {
  event.preventDefault();

  //VALIDATE NAME
  if(checkLength(fullName.value, 5) === true) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }

  //VALIDATE EMAIL
  if(validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  //VALIDATE SUBJECT
  if(checkLength(subject.value, 15) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  //VALIDATE MESSAGE
  if(checkLength(message.value, 25) === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

if((checkLength(fullName.value, 0) === true) & (validateEmail(email.value) === true) & (checkLength(subject.value, 15) === true) & (checkLength(message.value, 25) === true)) {
  messageSuccess.style.display = "block";
} else {
  messageSuccess.style.display = "none";
}
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
  if(value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}


function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}