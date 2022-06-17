const buttons = document.querySelectorAll("#num");
const play = document.querySelector("#play");
const restart = document.querySelector("#reset");
const message = document.querySelector(".fail");
const submitWord = document.querySelector("#submit-word");
const submit_Word_in_word = document.querySelector("#submit-word-in-word");
const changeToPlural = document.querySelector("#submit-letter");
const submitNumber = document.querySelector("#submit-number");
const slide = document.querySelectorAll(".slide");
let guessWord;
let hideWord;
let timeOver;
let singularToPlural;
let syllableGuess;
let count = 0;

const completed = document.querySelector(".completed");
const guessed = document.querySelector(".guessedIt");
const tryIt = document.querySelector(".try");
const clever = document.querySelector(".clever");
const better = document.querySelector(".better");
const timeTicking = document.querySelector(".time");
const chancesDown = document.querySelector('.chances');
const wordCheck = document.querySelector("#word");


class GuessWord {
    constructor(number, word) {
        this.number = number;
        this.word = word;
        this.declair();
    }
    declair() {
        this.wordFetch = '';
        this.wordMath = '';
        this.guessedWords = [];
        this.j = -100;
    }
    async fetchData() {
        const url = "https://samoel33.github.io/guessGame/words.json";
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (err) {

        }
    }
    async wordAssociation(word) {

        this.word = word;
        let data = await this.fetchData();
        if (data.wordsAss[this.number].includes(this.word)) {
            count++;
            this.guessedWords.push(word);
            document.querySelector('.got').innerText = this.guessedWords.length;
            wordCheck.value = '';
            this.clever();
            if (this.guessedWords.length == 5) {
                hideWord = new WordInWord(this.guessedWords.length);
                this.slideUp();
                document.querySelector(".level").innerText = 3;
            }
        } else {
            wordCheck.value = "";
            this.tryAgain();
        }
    }
    slideUp() {
        this.j -= 100;
        slide.forEach((s, i) => s.style.transform = `translateY(${(this.j)}%)`)
    }
    clever() {
        document.querySelector(".correct_not").innerText = "Very Clever 😄";
        clever.play();
        setTimeout(() => {
            document.querySelector(".correct_not").innerText = "";
            clever.pause();
        }, 3000);
    }
    tryAgain() {
        document.querySelector(".correct_not").innerText = "Try Again😄";
        tryIt.play();
        setTimeout(() => {
            document.querySelector(".correct_not").innerText = "";
            tryIt.pause();
        }, 3000);
    }
    betterLuck() {
        better.play();
        document.querySelector(".gameOver").classList.add("big");
        setTimeout(() => {
            better.pause();
            window.location.reload();
        }, 5000);
    }
}
class SingularPlural extends GuessWord {
    constructor(plural) {
        super();
        this.plural = plural
        this.randomNum;
        this.randomNumber1();
        this.j = -300;
    }
    async randomNumber1() {
        this.randomNum = Math.floor(Math.random() * 5);
        let plural = await this.fetchData();
        this.plural = plural.singularPlural[this.randomNum];
        document.querySelector('.letter').innerText = plural.singularPlural[this.randomNum];
    }
    toPlural(pluralWord) {
        function reload() {
            syllableGuess = new Syllables();
        }
        if (this.plural === pluralWord) {
            this.clever();
            this.slideUp();
            reload();
        } else {
            this.betterLuck();
        }
    }
}
class WordInWord extends GuessWord {
    constructor(hiddenWord) {
        super();
        this.hiddenWord = hiddenWord;
        this.randomNumber;
        this.i = 0;
        this.j = -200;
        this.randomGenNumber();
    }

    async randomGenNumber() {
        this.randomNumber = Math.floor(Math.random() * 12);
        let words = await this.fetchData();
        document.querySelector('.hiddenWords').innerText = words.hidenWords[this.randomNumber];
    }
    giveWordInWord(word) {

        this.hiddenWord = word;
        let arrayAnswers = [
            "Do",
            "Ox", ["Rate", "Ate", "At"],
            ["Cot", "Age"],
            "Science",
            "Ant",
            "Nation",
            "End",
            "Table",
            "End", ["No", "On", "One"],
            ["Cap", "Size"],
        ];
        const answer = arrayAnswers[this.randomNumber];

        if (
            this.randomNumber == 2 ||
            this.randomNumber == 3 ||
            this.randomNumber == 10 ||
            this.randomNumber == 11
        ) {
            const nested = arrayAnswers[this.randomNumber];
            if (nested.includes(this.hiddenWord)) {
                this.countClever();
            }
        } else {
            if (answer.includes(this.hiddenWord)) {
                this.countClever()
            } else {
                this.tryAgain();
            }
        }
        if (this.i == 3) {
            document.querySelector('.levelCompleted').innerText = "Level Completed😄"
            setTimeout(() => {
                document.querySelector(".levelCompleted").innerText = "";
                this.slideUp();
                document.querySelector(".level").innerText = 4;

                singularToPlural = new SingularPlural();
            }, 3000);

        }
    }
    countClever() {
        this.i++;
        this.clever();
        setTimeout(() => {
            this.randomGenNumber();

        }, 1000);
    }
}

class Syllables extends GuessWord {
    constructor(number) {
        super();
        this.j = -300;
        this.number = number

    }
    async guessSyllabel(numOfSyllabel) {

        let numberOfsyllables = await this.fetchData();
        let answer = numberOfsyllables.syllablesAnswer;

        console.log(numberOfsyllables, answer);

    }
}
class GuessNumber {
    constructor(number) {
        this.number = number;
        this.clear();
    }
    clear() {
        this.numGenerated = "";
        this.guessedNumber = "";
        this.time = 30;
        this.chanceHave = 6;
        window.clearInterval(timeOver);
        chancesDown.innerText = 6;
        timeTicking.innerText = 30;
    }
    generatedNumber() {
        let numberGen = Math.floor(Math.random() * 11);
        document.querySelector("#hiddenNumber").innerHTML = numberGen;
        this.numGenerated = numberGen;
    }
    timeDown() {
        let time = this.time;
        timeOver = setInterval(function timeOutStop() {
            time--;
            document.querySelector(".time").innerHTML = time;
            if (time == 0) {
                stop();
                tryIt.play();
                setTimeout(() => {
                    tryIt.pause();
                }, 3000);
            }
        }, 1000);

        function stop() {
            window.clearInterval(timeOver);
        }
    }
    chancesDown() {
        if (this.chanceHave > 0) {
            let chance = this.chanceHave--;
            document.querySelector(".chances").innerText = chance;
        } else {
            document.querySelector(".chances").innerText = 0;
            window.clearInterval(timeOver);
            message.innerText = "Better luck next time🙄";
            better.play();
            setTimeout(() => {
                message.innerText = "";
                restart.removeAttribute("disabled");
                better.pause();
            }, 3100);
        }
    }
    guessNumber(number) {
        if (number === this.numGenerated) {
            message.innerText = "Oh you Guessed it😄";
            this.guessedNumber = this.numGenerated;
            document.querySelector("#hiddenNumber").style.display = "flex";
            guessed.play();
            guessWord = new GuessWord(this.guessedNumber);
            setTimeout(() => {
                document.querySelector(".no-is").innerText = this.guessedNumber;
                slide.forEach((s, i) => {
                    s.style.transform = "translateY(-100%)";
                })
                message.innerText = "";
                document.querySelector('.level').innerText = 2;
                guessed.pause();
            }, 3500);
            window.clearInterval(timeOver);
        }
        if (this.numGenerated != number) this.chancesDown();
    }
}

const guess = new GuessNumber(num);
play.addEventListener("pointerdown", () => {
    guess.generatedNumber();
    guess.timeDown();
    guess.chancesDown();
    buttons.forEach((button) => {
        button.removeAttribute("disabled");
    });
    play.disabled = true;
    restart.removeAttribute('disabled');
})
restart.addEventListener('pointerdown', () => {
    window.location.reload();
    document.querySelector("#guessNumber").classList.remove("translatedUp");
    document.querySelector("#guessWord").classList.remove("translateToView");
    guess.clear();
    play.removeAttribute('disabled');
    restart.disabled = true;
    buttons.forEach((button) => {
        button.disabled = true;
    });
    document.querySelector("#hiddenNumber").style.display = "none";
})
buttons.forEach((button) => {
    button.addEventListener("click", (i) => {
        guess.guessNumber(parseInt(i.target.innerText));
    });
});

submitWord.addEventListener("pointerdown", () => {
    let lowCase = document.querySelector("#word");
    const val = lowCase.value.toLowerCase();
    guessWord.wordAssociation(val);
})
submit_Word_in_word.addEventListener("pointerdown", () => {
    hideWord.giveWordInWord(document.querySelector(".wordInWord").value);
});
submitNumber.addEventListener("pointerdown", () => {
    syllableGuess.guessSyllabel(document.querySelector("#numberOfSyllables").value);
});
changeToPlural.addEventListener("pointerdown", () => {
    singularToPlural.toPlural(document.querySelector(".twoLetters").value);
});

document.querySelector(".hints").addEventListener("pointerdown", () => {
    document.querySelector(".hints").classList.remove("show");
    document.querySelector(".hints").classList.add("closed");
});
document.querySelector(".hint").addEventListener("pointerdown", () => {
    document.querySelector(".hints").classList.add("show");
    document.querySelector(".hints").classList.remove("closed");
});
document.querySelector(".close").addEventListener("pointerdown", () => {
    document.querySelector(".hints").classList.add("closed");
    document.querySelector(".hints").classList.remove("show");
});