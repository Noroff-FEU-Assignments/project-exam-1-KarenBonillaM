const carousel = document.querySelector(".carousel-container");
arrowIcons = document.querySelectorAll(".blogs-wrapper i");

let isDragStart = false, prevPageX, prevScrollLeft;

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX;
  prevScrollLeft = carousel.scrollLeft;
}

const showHideIcons = () => {
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

const dragging = (e) => {
  if(!isDragStart) return;
  e.preventDefault();
  carousel.classList.add("dragging");
  let positionDiff = e.pageX - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
}

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);


//VALIDATE EMAIL 
const buttonSingUp = document.querySelector(".cta-signup");
const emailSubscribe = document.querySelector("#subscribe-email");
const subscribeError = document.querySelector("#subscribeError");
const subscribeSuccess = document.querySelector("#subscribe-success");



function validateSubscribeInput() {
  event.preventDefault();

  //VALIDATE EMAIL
  if(validateEmail(emailSubscribe.value) === true) {
    subscribeError.style.display = "none";
  } else {
    subscribeError.style.display = "block";
  }

if((validateEmail(emailSubscribe.value) === true)) {
  subscribeSuccess.style.display = "block";
} else {
  subscribeSuccess.style.display = "none";
}
}

buttonSingUp.addEventListener("click", validateSubscribeInput);


function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

const closeIcon = document.querySelector(".close-icon");

closeIcon.addEventListener("click", function(){
  subscribeSuccess.style.display = "none"
})