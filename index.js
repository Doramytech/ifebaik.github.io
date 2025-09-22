const pyramidContainer = document.getElementById("pyramid");
const wordInput = document.getElementById("wordInput");
const searchBarContainer = document.querySelector(".search-bar-container");
const magnifier = document.querySelector(".search");

// Load stored words or start fresh
const words = JSON.parse(localStorage.getItem("pyramidWords")) || [];

// Build pyramid from stored words
function buildPyramid() {
  pyramidContainer.innerHTML = "";
  let index = 0;
  let currentLine = 1;

  while (index < words.length) {
    const lineWords = [];
    for (let i = 0; i < currentLine && index < words.length; i++) {
      lineWords.push(words[index]);
      index++;
    }

    const line = document.createElement("div");
    line.className = "line";

    const highlightWords = ["bola", "shade", "baraka"];
    line.innerHTML = lineWords.map(w => {
      return highlightWords.includes(w)
        ? `<span style="color: red;">${w}</span>`
        : w;
    }).join(" ,");

    pyramidContainer.appendChild(line);
    currentLine++;
  }
}

// Add word to pyramid and localStorage
function addWord(event) {
  event.preventDefault();
  const word = wordInput.value.trim();
  if (!word) return;

  words.push(word);
  wordInput.value = "";
  localStorage.setItem("pyramidWords", JSON.stringify(words));
  buildPyramid();
}

// Clear pyramid and localStorage
function clearPyramid() {
  words.length = 0;
  localStorage.removeItem("pyramidWords");
  pyramidContainer.innerHTML = "";
}

// Submit word with Enter key
wordInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addWord(event);
  }
});

// Reveal search bar on click
magnifier.addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector(".search-wrapper").classList.remove("active");
});

// Build pyramid on page load
buildPyramid();

