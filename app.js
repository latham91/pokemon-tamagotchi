///////////////
/// CLASSES ///
///////////////

// Construct Pet Class
class Pet {
    constructor(name, status) {
        this.name = name;
        this.status = status;
        this.health = 100;
        this.hunger = 0;
        this.happiness = 100;
        this.sleepiness = 0;
    }

    // Methods
    feedPet() {
        this.hunger -= 20;
        this.happiness += 10;
        this.sleepiness += 10;
        this.health += 10;
    }

    playWithPet() {
        this.happiness += 20;
        this.hunger += 10;
        this.sleepiness += 10;
    }

    sleepPet() {
        this.sleepiness -= 40;
        this.hunger += 10;
        this.happiness += 10;
        this.health += 10;
    }
}

// Contruct Pet Type
class Venusaur extends Pet {
    constructor(name, status) {
        super(name, status);
    }
}

class Blastoise extends Pet {
    constructor(name, status) {
        super(name, status);
    }
}

class Charizard extends Pet {
    constructor(name, status) {
        super(name, status);
    }
}

/////////////////
/// VARIABLES ///
/////////////////

const app = document.getElementById("app");
const container = document.querySelector(".container");

let chosenPet;
let gameInProgress = false;

/////////////////
/// FUNCTIONS ///
/////////////////

// Start App
selectCharView();

// Main Game Loop
function startGame(pet) {
    app.replaceChildren(gameView(pet), createControls());

    gameInProgress = true;

    const loopInterval = setInterval(() => {
        if (gameInProgress) {
            gameLoop();
            updateStats();
        } else {
            clearInterval(loopInterval);
        }
    }, 1000);
}

function gameLoop() {
    // Stat ticks
    if (chosenPet.health >= 1) {
        chosenPet.health -= 2;
    }

    if (chosenPet.health > 100) {
        chosenPet.health = 100;
    }

    if (chosenPet.hunger <= 98) {
        chosenPet.hunger += 2;
    }

    if (chosenPet.hunger === 100) {
        chosenPet.health -= 5;
    }

    if (chosenPet.hunger > 100) {
        chosenPet.hunger = 100;
    }

    if (chosenPet.happiness >= 4) {
        chosenPet.happiness -= 4;
    }

    if (chosenPet.happiness > 100) {
        chosenPet.happiness = 100;
    }

    if (chosenPet.happiness === 0) {
        chosenPet.health -= 5;
    }

    if (chosenPet.sleepiness <= 96) {
        chosenPet.sleepiness += 4;
    }

    if (chosenPet.sleepiness < 0) {
        chosenPet.sleepiness = 0;
    }

    if (chosenPet.sleepiness > 100) {
        chosenPet.sleepiness = 100;
    }

    if (chosenPet.sleepiness === 100) {
        chosenPet.health -= 5;
    }

    if (chosenPet.health <= 0) {
        console.log("DEAD");
        console.table(chosenPet);
        gameInProgress = false;
        container.replaceChildren(gameOverView());
    }
}

function updateStats() {
    const healthNum = document.querySelector(".health-number");
    const hungerNum = document.querySelector(".hunger-number");
    const happinessNum = document.querySelector(".happiness-number");
    const sleepinessNum = document.querySelector(".sleepiness-number");

    const health = document.querySelector(".health");
    const hunger = document.querySelector(".hunger");
    const happiness = document.querySelector(".happiness");
    const sleepiness = document.querySelector(".sleepiness");

    healthNum.textContent = chosenPet.health;
    hungerNum.textContent = chosenPet.hunger;
    happinessNum.textContent = chosenPet.happiness;
    sleepinessNum.textContent = chosenPet.sleepiness;

    if (chosenPet.health <= 50) {
        healthNum.style.color = "black";
    } else {
        healthNum.style.color = "white";
    }

    if (chosenPet.hunger >= 50) {
        hungerNum.style.color = "white";
    } else {
        hungerNum.style.color = "black";
    }

    if (chosenPet.happiness <= 50) {
        happinessNum.style.color = "black";
    } else {
        happinessNum.style.color = "white";
    }

    if (chosenPet.sleepiness >= 50) {
        sleepinessNum.style.color = "white";
    } else {
        sleepinessNum.style.color = "black";
    }

    health.style.background = `linear-gradient(to right, crimson ${chosenPet.health}%, #ffffff ${chosenPet.health}%)`;
    hunger.style.background = `linear-gradient(to right, orange ${chosenPet.hunger}%, #ffffff ${chosenPet.hunger}%)`;
    happiness.style.background = `linear-gradient(to right, #cac600 ${chosenPet.happiness}%, #ffffff ${chosenPet.happiness}%)`;
    sleepiness.style.background = `linear-gradient(to right, #0037ee ${chosenPet.sleepiness}%, #ffffff ${chosenPet.sleepiness}%)`;
}

function createPet(pet) {
    if (pet === "Venusaur") {
        chosenPet = new Venusaur("Venusaur", "happy");
    }

    if (pet === "Blastoise") {
        chosenPet = new Blastoise("Blastoise", "happy");
    }

    if (pet === "Charizard") {
        chosenPet = new Charizard("Charizard", "happy");
    }
}

function gameOverView() {
    const gameOverScreen = document.createElement("div");
    const gameOverTitle = document.createElement("h1");
    const gameOverMessage = document.createElement("p");
    const newGameButton = document.createElement("button");

    gameOverScreen.classList.add("flex", "justify-center", "items-center", "flex-col", "w-full");
    gameOverTitle.classList.add("text-4xl");
    gameOverMessage.classList.add("text-xl");

    gameOverTitle.textContent = `Game Over!, ${chosenPet.name} has died.`;
    gameOverMessage.textContent = "To start a new game, click the button below.";
    newGameButton.textContent = "New Game";

    gameOverScreen.appendChild(gameOverTitle);
    gameOverScreen.appendChild(gameOverMessage);
    gameOverScreen.appendChild(newGameButton);

    newGameButton.addEventListener("click", () => {
        container.innerHTML = "";
        container.replaceChildren(selectCharView());
    });

    return gameOverScreen;
}

function selectCharView() {
    container.innerHTML = "";
    const venusaurDiv = document.createElement("div");
    const blastoiseDiv = document.createElement("div");
    const charizardDiv = document.createElement("div");

    const venusaurImg = document.createElement("img");
    const blastoiseImg = document.createElement("img");
    const charizardImg = document.createElement("img");

    const venusaurTitle = document.createElement("h3");
    const blastoiseTitle = document.createElement("h3");
    const charizardTitle = document.createElement("h3");

    venusaurDiv.appendChild(venusaurImg);
    blastoiseDiv.appendChild(blastoiseImg);
    charizardDiv.appendChild(charizardImg);

    venusaurDiv.appendChild(venusaurTitle);
    blastoiseDiv.appendChild(blastoiseTitle);
    charizardDiv.appendChild(charizardTitle);

    venusaurDiv.classList.add("flex", "justify-center", "items-center", "flex-col", "w-full", "pet");
    blastoiseDiv.classList.add("flex", "justify-center", "items-center", "flex-col", "w-full", "pet");
    charizardDiv.classList.add("flex", "justify-center", "items-center", "flex-col", "w-full", "pet");

    venusaurTitle.innerText = "Venusaur";
    blastoiseTitle.innerText = "Blastoise";
    charizardTitle.innerText = "Charizard";

    venusaurImg.src = "./assets/Venusaur.gif";
    blastoiseImg.src = "./assets/Blastoise.gif";
    charizardImg.src = "./assets/Charizard.gif";

    venusaurDiv.addEventListener("click", () => {
        createPet("Venusaur");
        startGame("Venusaur");
    });

    blastoiseDiv.addEventListener("click", () => {
        createPet("Blastoise");
        startGame("Blastoise");
    });

    charizardDiv.addEventListener("click", () => {
        createPet("Charizard");
        startGame("Charizard");
    });

    container.appendChild(venusaurDiv);
    container.appendChild(blastoiseDiv);
    container.appendChild(charizardDiv);

    return container;
}

function gameView(pet) {
    container.innerHTML = "";
    const petDiv = document.createElement("div");
    const petImage = document.createElement("img");
    petDiv.classList.add("pet");
    petImage.src = `./assets/${pet}.gif`;

    const statsDiv = document.createElement("div");
    statsDiv.classList.add("stats");

    const healthDiv = document.createElement("div");
    const healthTitle = document.createElement("h3");
    const healthSpan = document.createElement("span");
    healthDiv.classList.add("health");
    healthSpan.classList.add("stats-span", "health-number");
    healthTitle.textContent = "Health";
    healthSpan.textContent = chosenPet.health;

    const hungerDiv = document.createElement("div");
    const hungerTitle = document.createElement("h3");
    const hungerSpan = document.createElement("span");
    hungerDiv.classList.add("hunger");
    hungerSpan.classList.add("stats-span", "hunger-number");
    hungerTitle.textContent = "Hunger";
    hungerSpan.textContent = chosenPet.hunger;

    const happinessDiv = document.createElement("div");
    const happinessTitle = document.createElement("h3");
    const happinessSpan = document.createElement("span");
    happinessDiv.classList.add("happiness");
    happinessSpan.classList.add("stats-span", "happiness-number");
    happinessTitle.textContent = "Happiness";
    happinessSpan.textContent = chosenPet.happiness;

    const sleepinessDiv = document.createElement("div");
    const sleepinessTitle = document.createElement("h3");
    const sleepinessSpan = document.createElement("span");
    sleepinessDiv.classList.add("sleepiness");
    sleepinessSpan.classList.add("stats-span", "sleepiness-number");
    sleepinessTitle.textContent = "Sleepiness";
    sleepinessSpan.textContent = chosenPet.sleepiness;

    petDiv.appendChild(petImage);

    statsDiv.appendChild(healthTitle);
    statsDiv.appendChild(healthDiv);

    statsDiv.appendChild(hungerTitle);
    statsDiv.appendChild(hungerDiv);

    statsDiv.appendChild(happinessTitle);
    statsDiv.appendChild(happinessDiv);

    statsDiv.appendChild(sleepinessTitle);
    statsDiv.appendChild(sleepinessDiv);

    healthDiv.appendChild(healthSpan);
    hungerDiv.appendChild(hungerSpan);
    happinessDiv.appendChild(happinessSpan);
    sleepinessDiv.appendChild(sleepinessSpan);

    container.appendChild(petDiv);
    container.appendChild(statsDiv);

    return container;
}

function createControls() {
    const controlsDiv = document.createElement("div");
    const feedButton = document.createElement("button");
    const playButton = document.createElement("button");
    const sleepButton = document.createElement("button");

    controlsDiv.classList.add("controls");

    feedButton.innerText = "FEED";
    playButton.innerText = "PLAY";
    sleepButton.innerText = "SLEEP";

    controlsDiv.appendChild(feedButton);
    controlsDiv.appendChild(playButton);
    controlsDiv.appendChild(sleepButton);

    feedButton.addEventListener("click", () => {
        setTimeout(() => {
            feedButton.disabled = false;
        }, 2000);

        feedButton.disabled = true;
        chosenPet.feedPet();
    });

    playButton.addEventListener("click", () => {
        setTimeout(() => {
            playButton.disabled = false;
        }, 2000);

        playButton.disabled = true;
        chosenPet.playWithPet();
    });

    sleepButton.addEventListener("click", () => {
        setTimeout(() => {
            sleepButton.disabled = false;
        }, 2000);

        sleepButton.disabled = true;
        chosenPet.sleepPet();
    });

    return controlsDiv;
}
