const hinddenNumber = document.querySelector("#hiddenNumber");
const hinddenWord = document.querySelector(".hiddenWord");
const number = document.querySelectorAll("#num");
const timing = document.querySelector(".time");
const chances = document.querySelector(".chances");
const fail = document.querySelector(".fail");
const guessedIt = document.querySelector(".greatWork");
const level = document.querySelector(".levels .level");
const points = document.querySelector(".points .val");
const guessedNo = document.querySelector('.no-is');
const wordAssociated = document.querySelector('.wordsAssociated');

const guessWord = document.querySelector("#guessWord");
const guessNumber = document.querySelector("#guessNumber");
const hidden_words = document.querySelector('.hidden-Words');
const singular_plural = document.querySelector('.hidden-Words');
const syllables = document.querySelector('.hidden-Words');
const methaphor = document.querySelector('.methaphor')

const resetGame = document.querySelector("#reset");
const play = document.querySelector("#play");
const submit_Word = document.querySelector("#submit-word");

const level1 = document.querySelector(".level1");
const level2 = document.querySelector(".level2");
const level3 = document.querySelector(".level3");
const level4 = document.querySelector(".level4");
const level5 = document.querySelector(".level5");
const better = document.querySelector(".better");
const completed = document.querySelector(".completed");
const guessed = document.querySelector(".guessedIt");
const tryIt = document.querySelector(".try");
const clever = document.querySelector(".clever");

const wordHolder = document.querySelector('.wordInWord');
let wordStore = document.querySelector("#word");
let pointsEarned = 0;
let timeOver;
class Guess {
    constructor(number, word) {
        this.number = number;
        this.word = word;
        this.restart();
    }

    genNumer() {
        let numberGen = Math.floor(Math.random() * 6);
        hinddenNumber.innerHTML = numberGen;
        this.generatedNumber = numberGen;
    }
    chancesDown() {
        if (this.chanceHave > 0) {
            let chance = this.chanceHave--;
            chances.innerText = chance;
        } else {
            chances.innerText = 0;
            window.clearInterval(timeOver);
            fail.innerText = "Better luck next time🙄";
            better.play();
            setTimeout(() => {
                fail.innerText = "";
                resetGame.removeAttribute("disabled");
                better.pause();
            }, 3700);
        }
    }
    guessNumber(number) {
        if (number === this.generatedNumber) {
            hinddenNumber.setAttribute("id", "show");
            guessedIt.innerText = "Oh you Guessed it😄";
            this.guessedNumber = this.generatedNumber;
            guessed.play();
            setTimeout(() => {
                guessedIt.innerText = "";
                guessWord.setAttribute("id", "active");
                guessNumber.setAttribute("id", "deactive");
                level.innerText = 2;
                guessedNo.innerText = this.guessedNumber;
                guessed.pause();
                points.innerText = this.pointsIncrease();
            }, 3500);
            window.clearInterval(timeOver);
        }
        if (this.generatedNumber != number) this.chancesDown();
    }
    timeDown() {
        let time = this.time;
        timeOver = setInterval(function timeOutStop() {
            time--;
            timing.innerHTML = time;
            if (time == 0) {
                stop()
                tryIt.play();
                setTimeout(() => {
                    tryIt.pause();
                }, 3000)

            };
        }, 1000);

        function stop() {
            window.clearInterval(timeOver);
        }
    }
    pointsIncrease() {
        pointsEarned += 30;
        return points.innerText = pointsEarned;
    }
    guessWord(word) {
        let numberInWord;
        this.guessedWord = word;
        if (this.guessedNumber == 0) {
            numberInWord = "zero";
            this.numMeaning[numberInWord].includes(word) ?
                activeDeactive(word) :
                tryAgain();
            this.pointsIncrease();
        }
        if (this.guessedNumber == 1) {
            numberInWord = "one";
            this.numMeaning[numberInWord].includes(word) ?
                activeDeactive(word) :
                tryAgain();
            this.pointsIncrease();
        }
        if (this.guessedNumber == 2) {
            numberInWord = "two";
            this.numMeaning[numberInWord].includes(word) ?
                activeDeactive(word) :
                tryAgain();
            this.pointsIncrease();
        }
        if (this.guessedNumber == 3) {
            numberInWord = "three";
            this.numMeaning[numberInWord].includes(word) ?
                activeDeactive(word) :
                tryAgain();
            this.pointsIncrease();
        }
        if (this.guessedNumber == 4) {
            numberInWord = "four";
            this.numMeaning[numberInWord].includes(word) ?
                activeDeactive(word) :
                tryAgain();
            this.pointsIncrease();
        }
        if (this.guessedNumber == 5) {
            numberInWord = "five";

            this.numMeaning[numberInWord].includes(word) ?
                activeDeactive(word) :
                tryAgain();
            this.pointsIncrease();
        }

        function wordCheck(wordToCheck) {
            return wordToCheck === word;
        }

        function activeDeactive(wordGuessed) {
            hinddenWord.innerText = "Very Clever 👍";
            let list = document.createElement('li')
            list.innerText = wordGuessed;
            wordAssociated.appendChild(list);
            wordStore.value = '';

            clever.play();
            if (wordAssociated.childElementCount == 3) {
                hinddenWord.innerText = 'Level Completed😊👏👏'
                setTimeout(() => {
                    hidden_words.setAttribute("id", "active");
                    guessWord.setAttribute("id", "deactive");
                    level.innerText = 3;
                }, 2000)
            }
            setTimeout(() => {
                hinddenWord.innerText = "";
                pointsEarned = pointsEarned + 30;
                clever.pause();
            }, 4000);
        }

        function tryAgain() {
            hinddenWord.innerText = "Try Again 👎";
            wordStore.value = '';
            tryIt.play();
            setTimeout(() => {
                hinddenWord.innerText = "💭";
                tryIt.pause();
            }, 3000);
        }
    }
    hiddenWords(hiddenWord) {

        if (hiddenWord === "do") {
            document.querySelector('.wordInWord-1').classList.add('visibleToCheck');
            document.querySelector('.wordInWord-0').style.textDecoration = 'line-through'
            wordHolder.value = "";
            this.pointsIncrease();
        }
        if (hiddenWord === "at") {
            document.querySelector('.wordInWord-2').classList.add('visibleToCheck');
            document.querySelector('.wordInWord-1').style.textDecoration = 'line-through'
            wordHolder.value = "";
            this.pointsIncrease();
        }
        if (hiddenWord === "ox") {
            document.querySelector('.wordInWord-3').classList.add('visibleToCheck');
            document.querySelector('.wordInWord-2').style.textDecoration = 'line-through'
            wordHolder.value = "";
            this.pointsIncrease();
        }
        if (hiddenWord === "rat" || hiddenWord === "rate") {
            document.querySelector('.wordInWord-4').classList.add('visibleToCheck');
            document.querySelector('.wordInWord-3').style.textDecoration = 'line-through'
            wordHolder.value = "";
            this.pointsIncrease();
        }

        if (hiddenWord === 'cot' || hiddenWord === 'tag') {
            document.querySelector('.wordInWord-5').classList.add('visibleToCheck');
            document.querySelector('.wordInWord-4').style.textDecoration = 'line-through'
            wordHolder.value = "";
            this.pointsIncrease();

        }
        if (hiddenWord === 'us' || hiddenWord === "use") {
            document.querySelector('.wordInWord-6').classList.add('visibleToCheck');
            document.querySelector('.wordInWord-5').style.textDecoration = 'line-through'
            wordHolder.value = "";
            this.pointsIncrease();
            return;
        }

        if (hiddenWord === 'age') {
            document.querySelector('.wordInWord-7').classList.add('visibleToCheck');
            document.querySelector('.wordInWord-6').style.textDecoration = 'line-through'
            wordHolder.value = "";
            this.pointsIncrease();
            return;
        }
        if (hiddenWord === 'able' || hiddenWord === "tab") {
            document.querySelector('.wordInWord-8').classList.add('visibleToCheck');
            document.querySelector('.wordInWord-7').style.textDecoration = 'line-through'
            wordHolder.value = "";
            this.pointsIncrease();

        }

        if (hiddenWord === 'end') {
            document.querySelector('.wordInWord-9').classList.add('visibleToCheck');
            document.querySelector('.wordInWord-8').style.textDecoration = 'line-through'
            wordHolder.value = "";
            this.pointsIncrease();

        }
        if (hiddenWord === 'science') {
            document.querySelector('.wordInWord-9').style.textDecoration = 'line-through'
            wordHolder.value = "";
            this.pointsIncrease();
            clever.play();
            setTimeout(() => {
                clever.pause();
            }, 2000);
        }

    }
    singularPlural(letter) {}
    syllables(num) {}
    methaphor(sentence) {}
    restart() {
        this.generatedNumber = "";
        this.guessedNumber = "";
        this.timeOut;
        this.guessedWord = "";
        this.points = 0;
        window.clearInterval(this.timeOut);
        this.time = 11;
        this.chanceHave = 3;
        chances.innerText = " ";
        timing.innerText = " ";
        this.numMeaning = {
            zero: ["absent", "null", "none", "ziltch", "void", "nothing", "nought"],
            one: ["unity", "one", "single", "alone", "love"],
            two: ["union", "double", "couple", "love", "trust", "duality"],
            three: ["three", "triple", "third", "cheerful", "beginnings"],
            four: ["four", "quart", "fourth", "eve", "stability"],
            five: ["love", "fifth", "loyalty", "marriage"],
        };
        this.syllables = {
            syllables: [
                "Wednesday",
                "handbag",
                "february",
                "cat",
                "drinking",
                "yesterday",
            ],


        };
        this.syllable = [];
        this.hiddenWord = [];
        setTimeout(() => {
            resetGame.disabled = true;
        }, 1000);
    }
}

const guessGame = new Guess(number);
play.addEventListener("click", () => {
    guessGame.genNumer();
    guessGame.timeDown();
    guessGame.chancesDown();
    number.forEach(button => { button.removeAttribute('disabled') });

    setTimeout(() => {
        play.setAttribute('id', "deactive");

    }, 2000)
});
resetGame.addEventListener("click", () => {
    guessGame.restart();
    play.setAttribute('id', 'play')
    number.forEach((button) => {
        button.disabled = true;
    });
})
number.forEach(button => {
    button.addEventListener("click", (i) => {
        guessGame.guessNumber(parseInt(i.target.innerText));
    });
})
submit_Word.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    console.log(document.querySelector('#word').value);
    guessGame.guessWord(document.querySelector('#word').value);
})
document.querySelector('#submit-word-in-word').addEventListener('pointerdown', () => {
    let wrd = wordHolder.value;
    guessGame.hiddenWords(wrd);
})