/**
 * Constrói uma div que representa um card.
 *
 * @param {string | number | HTMLElement} content
 * @param {Set<string | number>} selectedCards
 * @returns {HTMLDivElement}
 */
function makeCard(content, selectedCards) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";

  if (typeof content != "object") {
    cardElement.innerHTML = content;
  } else {
    cardElement.appendChild(content);
  }

  cardElement.addEventListener("click", () => {
    if (selectedCards.has(content)) {
      selectedCards.delete(content);
      cardElement.classList.remove("card-selected");
      cardElement.classList.add("card-unselected");
    } else {
      selectedCards.add(content);
      cardElement.classList.remove("card-unselected");
      cardElement.classList.add("card-selected");
    }
  });

  return cardElement;
}

/**
 *
 * @param {number} number O máximo valor que se deseja.
 * @returns {number[]} A sequência de Fibonacci.
 */
function getFibonacciSequentUpTo(number) {
  const result = [1, 2];
  let currentNumber = 0;
  let currIdx = 1;

  do {
    currentNumber = result[currIdx] + result[currIdx - 1];
    result.push(currentNumber);
    currIdx++;
  } while (currentNumber < number);

  return result;
}

/**
 *
 * @param {string} icon
 * @returns {HTMLSpanElement}
 */
function makeIconCard(icon) {
  iconHousing = document.createElement("span");
  iconHousing.className = "material-icons";
  iconHousing.innerText = icon;
  return iconHousing;
}

/**
 *
 * @param {HTMLDivElement[]} available Os cards disponíveis.
 * @returns {Set<number | string | HTMLElement>}
 */
function loadSelectedCardsOrFallbackToAvailable(available) {
  const persistentSelectedCards = localStorage.getItem("selectedCards");
  let cards;
  if (persistentSelectedCards) {
    cards = JSON.parse(persistentSelectedCards);
  } else {
    cards = available;
  }

  return new Set(cards);
}

const cardHousing = document.querySelector(".card-housing");

const availableCardContents = getFibonacciSequentUpTo(89);
availableCardContents.push(makeIconCard("all_inclusive"));
availableCardContents.push(makeIconCard("coffee"));

const selectedCards = loadSelectedCardsOrFallbackToAvailable(
  availableCardContents
);

for (const content of availableCardContents) {
  card = makeCard(content, selectedCards);
  if (selectedCards.has(content)) {
    card.classList.add("card-selected");
  }
  cardHousing.appendChild(card);
}
