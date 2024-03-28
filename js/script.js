const game = document.getElementById("game");

const startGame = (game, cardCount) => {
    const cardNumberArray = [];
    let firstCard = null;
    let secondCard = null;

    for (let i = 1; i <= cardCount; i++) {
        cardNumberArray.push(i, i);
    }

    for (let i = 0; i < cardNumberArray.length; i++) {
        let randomIndex = Math.floor(Math.random() * cardNumberArray.length);

        let temp = cardNumberArray[i];
        cardNumberArray[i] = cardNumberArray[randomIndex];
        cardNumberArray[randomIndex] = temp;
    }

    let columns = 2;

    if (cardCount === 3) {
        columns = 3;
    }

    if (cardCount === 4) {
        columns = 4;
    }

    if (cardCount === 5) {
        columns = 5;
    }

    if (cardCount === 6) {
        columns = 4;
    }

    game.style = `grid-template-columns: repeat(${columns}, 1fr);`;

    for (const cardNumber of cardNumberArray) {
        let card = document.createElement("div");
        card.textContent = cardNumber;
        game.append(card);
        card.classList.add("card");

        card.addEventListener("click", function () {
            if (card.classList.contains("visible") || card.classList.contains("match")) {
                return;
            }

            if (firstCard != null && secondCard != null) {
                firstCard.classList.remove("visible");
                secondCard.classList.remove("visible");
                firstCard = null;
                secondCard = null;
            }

            card.classList.add("visible");

            if (firstCard === null) {
                firstCard = card;
            } else {
                secondCard = card;
            }

            if (firstCard != null && secondCard != null) {
                let firstCardIndex = firstCard.textContent;
                let secondCardIndex = secondCard.textContent;

                if (firstCardIndex === secondCardIndex) {
                    firstCard.classList.add("match");
                    secondCard.classList.add("match");
                }

                // if (firstCard.classList.contains("visible") || secondCard.classList.contains("visible")) {
                //     setTimeout(() => {
                //         firstCard.classList.remove("visible");
                //         secondCard.classList.remove("visible");
                //     }, 2200);
                // }
            }
            if (cardNumberArray.length === document.querySelectorAll(".match").length) {
                setTimeout(() => {
                    game.innerHTML = "";
                    alert("You Won!");

                    let cardCount = Number(prompt("Enter number of pairs (up to 6)", 4));

                    if (cardCount < 1 || cardCount > 6 || isNaN(cardCount)) {
                        alert("Please enter a number from 1 to 6.");
                        cardCount = Number(prompt("Enter number of pairs (up to 6):", 4));
                    }

                    startGame(game, cardCount);
                }, 400);
            }
        });

        game.append(card);
    }
};

let cardCount = Number(prompt("Enter number of pairs (up to 6)", 4));

if (cardCount < 1 || cardCount > 6 || isNaN(cardCount)) {
    alert("Please enter a number from 1 to 6.");
    cardCount = Number(prompt("Enter number of pairs (up to 6):", 4));
}

startGame(game, cardCount);