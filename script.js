
// country list
const countries = {
    "Armenia": "armenia",
    "United States of America": "united-states-of-america",
    "India": "india",
    "Austria": "austria",
    "Canada": "canada"
}

let quizOrder = Object.keys(countries)
let currentIndex = 0
let score = 0

function startQuiz() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("question").style.display = "block";

    // shuffle the quiz order
    quizOrder = quizOrder.sort(() => Math.random() - 0.5);

    currentIndex = 0;
    score = 0;
    showQuestion();

    document.getElementById("nextbtn").style.display = "none";
    document.getElementById("checkbtn").style.display = "inline-block";
}

function showQuestion() {
    const country = quizOrder[currentIndex];
    const flagUrl = `https://cdn.countryflags.com/thumbs/${countries[country]}/flag-800.png`;

    document.getElementById("flag").src = flagUrl
    document.getElementById("flag").alt = country + " Flag"

    document.getElementById("answer").value = ""
    document.getElementById("answer").disabled = false;

    document.getElementById("nextbtn").style.display = "none"
    document.getElementById("checkbtn").style.display = "inline-block"
}

function submitAnswer() {
    const answer = document.getElementById("answer").value.trim().toLowerCase()
    const correctAnswer = quizOrder[currentIndex].toLowerCase()

    document.getElementById("answer").disabled = true

    if (answer === correctAnswer) {
        score++
    }

    document.getElementById("checkbtn").style.display = "none"
    document.getElementById("nextbtn").style.display = "inline-block"
}

function nextQue() {
    currentIndex++

    if (currentIndex < quizOrder.length) {
        showQuestion()
    } else {
        showFinalScore()
    }
}

function showFinalScore() {
    document.getElementById("question").innerHTML = `
        <h2>Quiz Finished!</h2>
        <p>You scored ${score} out of ${quizOrder.length}.</p>
    `
}
