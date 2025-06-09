// log of answers
let answersLog = []

// country list
const countries = {
    "Afghanistan": "afghanistan",
    "Albania": "albania",
    "Algeria": "algeria",
    "Andorra": "andorra",
    "Angola": "angola",
    "Antigua and Barbuda": "antigua" || "barbuda",
    "Argentina": "argentina",
    "Armenia": "armenia",
    "Australia": "australia",
    "Austria": "austria",
    "Azerbaijan": "azerbaijan",
    "Bahamas": "bahamas",
    "Bahrain": "bahrain",
    "Bangaldesh": "bangladesh",
    "Barbados": "barbados",
    "Belarus": "belarus",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "Brazil": "brazil",
    "Chad": "chad",
    "China": "china",
    "United States of America": "united-states-of-america",
    "India": "india",
    "Canada": "canada",
    "Japan": "japan",
    "Portugal": "portugal",
    "Spain": "spain",
    "Germany": "germany",
    "Mongolia": "mongolia",
    "South Sudan": "south-sudan",
    "South Africa": "south-africa",
    "Rwanda": "rwanda",
    "Iran": "iran",
    "Finland": "finland",
    "Vietnam": "vietnam",
}

let quizOrder = Object.keys(countries)
let currentIndex = 0
let score = 0


document.getElementById("final").style.display = "none"

// show resume button if there is saved data
const resumeBtn = document.getElementById("resumeBtn");

if (localStorage.getItem("flagQuizAnswers")) {
    resumeBtn.style.display = "inline-block";
} else {
    resumeBtn.style.display = "none";
}

function startQuiz() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("question").style.display = "block";

    localStorage.removeItem("answersLog");

    // get difficulty
    const difficulty = document.getElementById("difficulty").value;

    // quizOrder based on difficulty
    let allCountries = Object.keys(countries).sort(() => Math.random() - 0.5);

    if (difficulty === "easy") {
        quizOrder = allCountries.slice(0, 3);
    } else if (difficulty === "medium") {
        quizOrder = allCountries.slice(0, 5);
    } else {
        quizOrder = allCountries;
    }

    // shuffle the quiz order
    quizOrder = quizOrder.sort(() => Math.random() - 0.5)

    currentIndex = 0
    score = 0
    answersLog = []

    saveProgress()
    showQuestion()

    document.getElementById("nextbtn").style.display = "none";
    document.getElementById("checkbtn").style.display = "inline-block";
}

function resumeQuiz() {
    const savedAnswers = JSON.parse(localStorage.getItem("flagQuizAnswers"));
    const savedOrder = JSON.parse(localStorage.getItem("quizOrder"));
    const savedIndex = JSON.parse(localStorage.getItem("currentIndex"));
    const savedScore = JSON.parse(localStorage.getItem("score"));

    if (savedAnswers && savedOrder && savedIndex !== null && savedScore !== null) {
        answersLog = savedAnswers
        quizOrder = savedOrder
        currentIndex = savedIndex
        score = savedScore

        document.getElementById("welcome").style.display = "none";
        document.getElementById("question").style.display = "block";

        showQuestion()

        document.getElementById("nextbtn").style.display = "none";
        document.getElementById("checkbtn").style.display = "inline-block";
    }
}

function showQuestion() {
    const country = quizOrder[currentIndex];
    const correctAnswer = country.toLowerCase();
    const flagUrl = `https://cdn.countryflags.com/thumbs/${countries[country]}/flag-800.png`;

    document.getElementById("flag").src = flagUrl;
    document.getElementById("flag").alt = country + " Flag";

    // check if the current question has already been answered
    const previous = answersLog.find(entry => entry.country === correctAnswer);

    const answerInput = document.getElementById("answer");
    const label = document.getElementById("flag-label");

    if (previous) {
        // already answered — show what they entered
        answerInput.value = previous.userAnswer;
        answerInput.disabled = true;
        label.textContent = previous.userAnswer || "[No answer entered]";
        document.getElementById("checkbtn").style.display = "none";
        document.getElementById("nextbtn").style.display = "inline-block";
    } else {
        // Not answered yet — clean input
        answerInput.value = "";
        answerInput.disabled = false;
        label.textContent = "Name of Country Flag";
        document.getElementById("checkbtn").style.display = "inline-block";
        document.getElementById("nextbtn").style.display = "none";
    }

    if (currentIndex > 0) {
        document.getElementById("prevbtn").style.display = "inline-block";
    } else {
        document.getElementById("prevbtn").style.display = "none";
    }
}

function submitAnswer() {

    const answerInput = document.getElementById("answer")
    const answer = answerInput.value.trim().toLowerCase()
    const correctAnswer = quizOrder[currentIndex].toLowerCase()


    let log = JSON.parse(localStorage.getItem("answersLog")) || []
    log.push(answerInput)
    localStorage.setItem("answersLog", JSON.stringify(log))

    answerInput.disabled = true;

    if (answer === correctAnswer) {
        score++;
    }

    //push answer to answer log
    answersLog.push({
        country: correctAnswer,
        userAnswer: answer || "[No answer entered]"
    });

    saveProgress();

    document.getElementById("flag-label").textContent = answer || "[No answer entered]";
    document.getElementById("checkbtn").style.display = "none";
    document.getElementById("nextbtn").style.display = "inline-block";
}

function nextQue() {
    currentIndex++;

    saveProgress();

    if (currentIndex < quizOrder.length) {
        showQuestion();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    document.getElementById("final-score").textContent = `You scored ${score} out of ${quizOrder.length}`;
    document.getElementById("question").style.display = "none";
    document.getElementById("final").style.display = "block";

    // Clear saved progress since quiz ended
    localStorage.removeItem("flagQuizAnswers");
    localStorage.removeItem("quizOrder");
    localStorage.removeItem("currentIndex");
    localStorage.removeItem("score");
}

function saveProgress() {
    localStorage.setItem("flagQuizAnswers", JSON.stringify(answersLog));
    localStorage.setItem("quizOrder", JSON.stringify(quizOrder));
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
    localStorage.setItem("score", JSON.stringify(score));
}

// previous button functionality
function prevque() {
    if (currentIndex > 0) {
        currentIndex--
        showQuestion()
    }
}

// retake quiz

document.getElementById("retakequiz").addEventListener("click", () => {
    // Clear saved data
    localStorage.removeItem("flagQuizAnswers")
    localStorage.removeItem("quizOrder")
    localStorage.removeItem("currentIndex")
    localStorage.removeItem("score")

    // reset all values and randomize order
    answersLog = []
    score = 0
    currentIndex = 0
    quizOrder = Object.keys(countries)

    // reset the screens
    document.getElementById("final").style.display = "none"
    document.getElementById("question").style.display = "none"
    document.getElementById("welcome").style.display = "block"

    // seeing if resume button would show
    if (localStorage.getItem("flagQuizAnswers")) {
        document.getElementById("resumeBtn").style.display = "block"
    } else {
        document.getElementById("resumeBtn").style.display = "none"
    }
})


function reviewAnswers() {
    document.getElementById("final").classList.remove("active")
    document.getElementById("review").classList.add("active")

    const reviewList = document.getElementById("reviewList")
    reviewList.innerHTML = ""

    const log = JSON.parse(localStorage.getItem("answersLog"))

    if (!log || log.length === 0) {
        reviewList.innerHTML = "<p>No answers to review.</p>"
        return
    }

    log.forEach(answer => {
        const correct = countries[answer.country];
        const isCorrect = answer.userAnswer === correct;

        const item = document.createElement("div");
        item.innerHTML = `
            <p><strong>${answer.country}</strong></p>
            <p>Your answer: ${answer.userAnswer} ${isCorrect ? "✅" : "❌"}</p>
            ${!isCorrect ? `<p>Correct answer: ${correct}</p>` : ""}
            <hr>
        `
        reviewList.appendChild(item)
    })
}

document.getElementById("reviewbtn").addEventListener("click", () => {
    // Hide final screen and show review screen
    document.getElementById("final").style.display = "none"
    document.getElementById("review").style.display = "block"

    const reviewList = document.getElementById("reviewList")
    reviewList.innerHTML = ""; // Clear previous content

    const storedAnswers = JSON.parse(localStorage.getItem("flagQuizAnswers")) || answersLog
    const storedOrder = JSON.parse(localStorage.getItem("quizOrder")) || quizOrder

    // review list
    storedOrder.forEach((country) => {
        const correct = country.toLowerCase()
        const answerEntry = storedAnswers.find(entry => entry.country === correct)

        const div = document.createElement("div")
        div.innerHTML = `
            <strong>Flag:</strong> ${country}<br>
            <strong>Your Answer:</strong> ${answerEntry?.userAnswer || "[No answer]"}<br>
            <strong>Correct Answer:</strong> ${correct}<br><br>
        `
        reviewList.appendChild(div)
    })
})





// add more countries, improve css, and put correct answers in the log