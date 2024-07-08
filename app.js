const passageText = document.getElementById("paragraph");
const typedText = document.getElementById("typedText").value;
const mistakes = document.getElementById("mistakes");

let passage = 'The cards spoke of fate, but the future they predicted was always left up to interpretation of the one reading them. Most people were almost illiterate. Preston fancied himself better than that. He pondered that conclusion as he stared at the cards before him. He knew his present was a pair of jacks grinning at him, but his future? The jacks might have been a good a few hands ago, but now he was down to just a two more big blinds. “What will it be?” asked Jerry with that lopsided grin he always wore. He sat behind a large chip stack that everyone at the table had been contributing to over the last hour or so. Preston stared at his opponent trying to get a read, but Jerry was a stone wall. Preston thought about folding, but there wasn’t a promise of a better hand in the wings. This was the poker player’s dilemma. What did the future hold? The jacks were mute, but Preston decided that the future was bright. He didn’t care if the light was that of victory or the burn out of defeat. He adjusted his shades and matched Jerry’s goofy grin. “All in.”';
let correct = 0;
let incorrect = 0;
let correctWords = 0;
let typedWords = 0;


document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('typedText').value = '';  // Clear the textarea on refresh
});

// Defines the passage and input text and splits it into characters.

let arrPassage = passage.split('');
console.log(arrPassage);

let arrTypedText = typedText.split('');
console.log(arrTypedText);

// Displays the passage on the page.

function changePassage() {
    const element = passageText;
    element.innerHTML = passage;
}
changePassage();

// Compares the user input and the correct input and iterates itself to the next input

class myClass {
    constructor() {
        this.index = 0;
        this.passage = arrPassage;
        this.arrTypedText = arrTypedText;
        this.timerStarted = false;
        document.getElementById('typedText').addEventListener('input', this.checkArray.bind(this));
    }

    checkArray() {
        const typedText = document.getElementById("typedText").value;

        if (!this.timerStarted) {
            startTimer();
            this.timerStarted = true;
        }

        this.arrTypedText = typedText.split('');
        let wordCount = typedText.split(' ').filter(word => word.length > 0).length;
        typedWords = wordCount;

        if (this.passage[this.index] === this.arrTypedText[this.index]) {
            correct++;
            this.index += 1;
            this.updateParagraph();
        } else {
            incorrect++;
            this.index += 1;
            this.updateParagraph();
        }

        let typedWordsArray = typedText.split(' ');
        let passageWordsArray = passage.split(' ');

        correctWords = typedWordsArray.filter((word, index) => word === passageWordsArray[index]).length;

        updateCount();
    }

    // Changes background color depending on if the input is correct or incorrect

    updateParagraph() {
        let html = '';
        for (let i = 0; i < this.passage.length; i++) {
            let spanClass = '';
            if (i < this.index) {
                spanClass = this.passage[i] === this.arrTypedText[i] ? 'correct' : 'incorrect';
            }
            html += `<span class="${spanClass}">${this.passage[i]}</span>`;
        }
        passageText.innerHTML = html;
    }
}

const instance = new myClass();

let timeLimit = 60;
let timer;

// Displays WPM, time, mistakes, and accuracy.

function updateCount() {
    const wordCountParagraph = document.getElementById('wpm');
    wordCountParagraph.textContent = `Wpm: ${Math.round((correctWords / (60 - timeLimit)) * 60)}`;

    const timeCount = document.getElementById('timer');
    timeCount.textContent = `${timeLimit}s`;

    const mistakeCount = document.getElementById('mistakes');
    mistakeCount.textContent = `Mistakes: ${incorrect}`;

    const accuracyCount = document.getElementById('accuracy');
    accuracyCount.textContent = `Accuracy: ${(correct / (incorrect + correct) * 100).toFixed(2)}%`;
}

// Logic of the timer and what happens when the timer runs out of time.

function timerLogic() {
    updateCount();
    if (timeLimit === 0) {
        clearInterval(timer);
        document.getElementById('typedText').readOnly = true;
        console.log('time limit reached');
    } else {
        timeLimit--;
    }
}

document.getElementById('typedText').addEventListener('input', startTimer);

// Starts the timer if it has not already been started

function startTimer() {
    if (!timer) {
        timer = setInterval(timerLogic, 1000);
        console.log(timeLimit);
    }
}

// Add this function to disable the backspace key
function disableBackspace(event) {
    if (event.key === 'Backspace') {
        event.preventDefault();
    }
}

// Add an event listener to the textarea to call the disableBackspace function
document.getElementById('typedText').addEventListener('keydown', disableBackspace);
