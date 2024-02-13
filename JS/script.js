const playButton = document.querySelector(".play");
const homePage = document.querySelector(".homepage");
const gamePage = document.querySelector(".game");
const textItems = document.querySelectorAll(".match-cards .match-card");
const cardItems = document.querySelectorAll(".cards .card-item");
const cardsText = document.querySelectorAll(".cards .card-item .text");
const successModal = document.querySelector(".success-card");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".closeModal");
let animationCounter = 0;
let counter = 0;
playButton.addEventListener("click", () => {
  document.querySelector("#start-audio").play();
  homePage.classList.add("hide");
  homePage.addEventListener("animationend", () => {
    homePage.classList.remove("hide");
    homePage.style.visibility = "hidden";
    gamePage.style.visibility = "visible";
    cardItems.forEach((card) => {
      card.classList.add("show");
      card.addEventListener("animationend", () => {
        animationCounter++;
        if (animationCounter === textItems.length) {
          textItems.forEach((item) => {
            item.classList.add("visible");
            item.classList.add("show");
            item.addEventListener("animationend",()=>{
              item.classList.remove("show");
            })
          });
        }
      });
    });
  });
});
textItems.forEach((textItem) => {
  textItem.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("id", event.target.dataset.index);
    document.querySelector(`audio[id="${event.target.dataset.index}"]`).play();
  });
});
cardsText.forEach((cardItem) => {
  cardItem.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  cardItem.addEventListener("drop", (event) => {
    event.preventDefault();
    const index = event.target.dataset.index;
    const textId = event.dataTransfer.getData("id");
    const text = document.querySelector(
      `.match-cards .match-card[data-index="${textId}"]`
    );
    if (index === textId) {
      document.querySelector("#correct-audio").play();
      const textContent = text.textContent;
      counter += 1;
      document.querySelector(
        ".score"
      ).textContent = `${counter}/${textItems.length}`;
      document
        .querySelector(":root")
        .style.setProperty("--width", `${(100 / textItems.length) * counter}%`);
      cardItem.classList.add("shrink");
      cardItem.textContent = textContent;
      cardItem.classList.add("animate");
      cardItem.addEventListener("animationend", () => {
        cardItem.classList.remove("animate");
      });
      text.classList.remove("visible");
    } else {
      document.querySelector("#wrong-audio").play();
      text.classList.add("vibrate");
      text.addEventListener("animationend", () => {
        text.classList.remove("vibrate");
      });
    }
    if (counter === cardsText.length) {
      const text = document.querySelector(".text-card .score-text");
      text.textContent = `${counter}/${cardsText.length}`;
      successModal.classList.add("show");
      overlay.classList.add("show");
    }
  });
});
document.addEventListener("click", function (event) {
  const isVisible =
    window.getComputedStyle(successModal).visibility === "visible";
  var isClickInside =
    successModal.contains(event.target) || event.target === closeButton;
  if (!isClickInside && isVisible) {
    successModal.classList.remove("show");
    setTimeout(() => {
      overlay.classList.remove("show");
    }, 400);
  }
});
closeButton.addEventListener("click", () => {
  successModal.classList.remove("show");
  setTimeout(() => {
    overlay.classList.remove("show");
  }, 400);
});
window.addEventListener("load", () => {
  document.querySelector(".score").textContent = `0/${textItems.length}`;
});
