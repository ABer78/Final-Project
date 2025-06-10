// log of answers
let answersLog = []

// country list
const countries = {
    "Afghanistan": "afghanistan",
    "Albania": "albania",
    "Algeria": "algeria",
    "Andorra": "andorra",
    "Angola": "angola",
    "Antigua and Barbuda": "antigua-and-barbuda",
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
    "Belgium": "belgium",
    "Belize": "belize",
    "Benin": "benin",
    "Bhutan": "bhutan",
    "Bolivia": "bolivia",
    "Bosnia and Herzegovina": "bosnia-and-herzegovina",
    "Botswana": "botswana",
    "Brunei": "brunei",
    "Bulgaria": "bulgaria",
    "Burkina Faso": "burkina-faso",
    "Burundi": "burundi",
    "Cambodia": "cambodia",
    "Cameroon": "cameroon",
    "Cape Verde": "cape-verde",
    "Central African Republic": "central-african-republic",
    "Chile": "chile",
    "Colombia": "colombia",
    "Comoros": "comoros",
    "Costa Rica": "costa-rica",
    "Croatia": "croatia",
    "Cuba": "cuba",
    "Cyprus": "cyprus",
    "Czech Republic": "czech-republic",
    "Denmark": "denmark",
    "Djibouti": "djibouti",
    "Dominica": "dominica",
    "Dominican Republic": "dominican-republic",
    "Ecuador": "ecuador",
    "Egypt": "egypt",
    "El Salvador": "el-salvador",
    "Equatorial Guinea": "equatorial-guinea",
    "Eritrea": "eritrea",
    "Estonia": "estonia",
    "Ethiopia": "ethiopia",
    "Fiji": "fiji",
    "France": "france",
    "Gabon": "gabon",
    "Gambia": "gambia",
    "Ghana": "ghana",
    "Greece": "greece",
    "Grenada": "grenada",
    "Guatemala": "guatemala",
    "Guinea": "guinea",
    "Guinea-Bissau": "guinea-bissau",
    "Guyana": "guyana",
    "Haiti": "haiti",
    "Honduras": "honduras",
    "Hungary": "hungary",
    "Iceland": "iceland",
    "Indonesia": "indonesia",
    "Iraq": "iraq",
    "Ireland": "ireland",
    "Israel": "israel",
    "Italy": "italy",
    "Jamaica": "jamaica",
    "Jordan": "jordan",
    "Kenya": "kenya",
    "Kiribati": "kiribati",
    "Kuwait": "kuwait",
    "Kyrgyzstan": "kyrgyzstan",
    "Laos": "laos",
    "Latvia": "latvia",
    "Lebanon": "lebanon",
    "Lesotho": "lesotho",
    "Liberia": "liberia",
    "Libya": "libya",
    "Liechtenstein": "liechtenstein",
    "Lithuania": "lithuania",
    "Luxembourg": "luxembourg",
    "Madagascar": "madagascar",
    "Malawi": "malawi",
    "Malaysia": "malaysia",
    "Maldives": "maldives",
    "Mali": "mali",
    "Malta": "malta",
    "Marshall Islands": "marshall-islands",
    "Mauritania": "mauritania",
    "Mauritius": "mauritius",
    "Mexico": "mexico",
    "Micronesia": "micronesia",
    "Moldova": "moldova",
    "Monaco": "monaco",
    "Montenegro": "montenegro",
    "Morocco": "morocco",
    "Mozambique": "mozambique",
    "Myanmar": "myanmar",
    "Namibia": "namibia",
    "Nauru": "nauru",
    "Nepal": "nepal",
    "Netherlands": "netherlands",
    "New Zealand": "new-zealand",
    "Nicaragua": "nicaragua",
    "Niger": "niger",
    "Nigeria": "nigeria",
    "North Korea": "north-korea",
    "North Macedonia": "north-macedonia",
    "Norway": "norway",
    "Oman": "oman",
    "Pakistan": "pakistan",
    "Palau": "palau",
    "Panama": "panama",
    "Papua New Guinea": "papua-new-guinea",
    "Paraguay": "paraguay",
    "Peru": "peru",
    "Philippines": "philippines",
    "Poland": "poland",
    "Qatar": "qatar",
    "Romania": "romania",
    "Russia": "russia",
    "Saint Kitts and Nevis": "saint-kitts-and-nevis",
    "Saint Lucia": "saint-lucia",
    "Saint Vincent and the Grenadines": "saint-vincent-and-the-grenadines",
    "Samoa": "samoa",
    "San Marino": "san-marino",
    "Sao Tome and Principe": "sao-tome-and-principe",
    "Saudi Arabia": "saudi-arabia",
    "Senegal": "senegal",
    "Serbia": "serbia",
    "Seychelles": "seychelles",
    "Sierra Leone": "sierra-leone",
    "Singapore": "singapore",
    "Slovakia": "slovakia",
    "Slovenia": "slovenia",
    "Solomon Islands": "solomon-islands",
    "Somalia": "somalia",
    "Sri Lanka": "sri-lanka",
    "Sudan": "sudan",
    "Suriname": "suriname",
    "Sweden": "sweden",
    "Switzerland": "switzerland",
    "Syria": "syria",
    "Taiwan": "taiwan",
    "Tajikistan": "tajikistan",
    "Tanzania": "tanzania",
    "Thailand": "thailand",
    "Togo": "togo",
    "Tonga": "tonga",
    "Trinidad and Tobago": "trinidad-and-tobago",
    "Tunisia": "tunisia",
    "Turkey": "turkey",
    "Turkmenistan": "turkmenistan",
    "Tuvalu": "tuvalu",
    "Uganda": "uganda",
    "Ukraine": "ukraine",
    "United Arab Emirates": "united-arab-emirates",
    "United Kingdom": "united-kingdom",
    "Uruguay": "uruguay",
    "Uzbekistan": "uzbekistan",
    "Vanuatu": "vanuatu",
    "Vatican City": "vatican-city",
    "Venezuela": "venezuela",
    "Zambia": "zambia",
    "Zimbabwe": "zimbabwe"
}

// to show which question the user is on
function updateProgress() {
    const progressElement = document.getElementById("progress")
    progressElement.textContent = `Question ${currentIndex + 1} / ${quizOrder.length}`
  }

//loads flag quicker
function preloadFlag(countryCode) {
    const img = new Image()
    img.src = `https://cdn.countryflags.com/thumbs/${countryCode}/flag-800.png`
}


let quizOrder = Object.keys(countries)
let currentIndex = 0
let score = 0


document.getElementById("final").style.display = "none"

// show resume button if there is saved data
const resumeBtn = document.getElementById("resumeBtn")

if (localStorage.getItem("flagQuizAnswers")) {
    resumeBtn.style.display = "inline-block"
} else {
    resumeBtn.style.display = "none"
}


// starts quiz
function startQuiz() {
    document.getElementById("welcome").style.display = "none"
    document.getElementById("question").style.display = "block"

    localStorage.removeItem("answersLog")

    // get difficulty
    const difficulty = document.getElementById("difficulty").value

    // quizOrder based on difficulty
    let allCountries = Object.keys(countries).sort(() => Math.random() - 0.5)

    if (difficulty === "easy") {
        quizOrder = allCountries.slice(0, 5)
    } else if (difficulty === "medium") {
        quizOrder = allCountries.slice(0, 25)
    } else {
        quizOrder = allCountries
    }

    // shuffle the quiz order
    quizOrder = quizOrder.sort(() => Math.random() - 0.5)

    currentIndex = 0
    score = 0
    answersLog = []

    saveProgress()
    showQuestion()

    document.getElementById("nextbtn").style.display = "none"
    document.getElementById("checkbtn").style.display = "inline-block"
}

// resume quiz 
function resumeQuiz() {
    // to get the user's answers, quizOrder, index, and score
    const savedAnswers = JSON.parse(localStorage.getItem("flagQuizAnswers"))
    const savedOrder = JSON.parse(localStorage.getItem("quizOrder"))
    const savedIndex = JSON.parse(localStorage.getItem("currentIndex"))
    const savedScore = JSON.parse(localStorage.getItem("score"))

    if (savedAnswers && savedOrder && savedIndex !== null && savedScore !== null) {
        answersLog = savedAnswers
        quizOrder = savedOrder
        currentIndex = savedIndex
        score = savedScore

        document.getElementById("welcome").style.display = "none"
        document.getElementById("question").style.display = "block"

        showQuestion()

        document.getElementById("nextbtn").style.display = "none"
        document.getElementById("checkbtn").style.display = "inline-block"
    }
}

// to load question and flag
function showQuestion() {
    const country = quizOrder[currentIndex]
    const correctAnswer = country.toLowerCase()
    const flagUrl = `https://cdn.countryflags.com/thumbs/${countries[country]}/flag-800.png`

    document.getElementById("flag").src = flagUrl
    document.getElementById("flag").alt = country + " Flag"

    // check if the current question has already been answered
    const previous = answersLog.find(entry => entry.country === correctAnswer)

    const answerInput = document.getElementById("answer")
    const label = document.getElementById("flag-label")

    if (previous) {
        // already answered — show what they entered
        answerInput.value = previous.userAnswer
        answerInput.disabled = true
        label.textContent = previous.userAnswer || "[No answer entered]"
        document.getElementById("checkbtn").style.display = "none"
        document.getElementById("nextbtn").style.display = "inline-block"
    } else {
        // not answered yet 
        answerInput.value = ""
        answerInput.disabled = false
        label.textContent = "Name of Country Flag"
        document.getElementById("checkbtn").style.display = "inline-block"
        document.getElementById("nextbtn").style.display = "none"
    }

    if (currentIndex > 0) {
        document.getElementById("prevbtn").style.display = "inline-block"
    } else {
        document.getElementById("prevbtn").style.display = "none"
    }

    updateProgress();
}

function submitAnswer() {

    const answerInput = document.getElementById("answer")
    const answer = answerInput.value.trim().toLowerCase()
    const correctAnswer = quizOrder[currentIndex].toLowerCase()


    let log = JSON.parse(localStorage.getItem("answersLog")) || []
    log.push({
        country: quizOrder[currentIndex].toLowerCase(),
        userAnswer: answer || "[No answer entered]"
    })
    localStorage.setItem("answersLog", JSON.stringify(log))

    answerInput.disabled = true

    if (answer === correctAnswer) {
        score++
    }

    //push answer to answer log
    answersLog.push({
        country: correctAnswer,
        userAnswer: answer || "[No answer entered]"
    })

    saveProgress()

    document.getElementById("flag-label").textContent = answer || "[No answer entered]"
    document.getElementById("checkbtn").style.display = "none"
    document.getElementById("nextbtn").style.display = "inline-block"
}

// to go to next question
function nextQue() {
    currentIndex++

    saveProgress()

    if (currentIndex < quizOrder.length) {
        showQuestion()
        // if the max amount of question is reached
    } else {
        showFinalScore()
    }

}


function showFinalScore() {
    document.getElementById("final-score").textContent = `You scored ${score} out of ${quizOrder.length}`
    document.getElementById("question").style.display = "none"
    document.getElementById("final").style.display = "block"

    // clear saved progress since quiz ended
    localStorage.removeItem("flagQuizAnswers")
    localStorage.removeItem("quizOrder")
    localStorage.removeItem("currentIndex")
    localStorage.removeItem("score")
}

function saveProgress() {
    localStorage.setItem("flagQuizAnswers", JSON.stringify(answersLog))
    localStorage.setItem("quizOrder", JSON.stringify(quizOrder))
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex))
    localStorage.setItem("score", JSON.stringify(score))
}

// previous button functionality
function prevque() {
    if (currentIndex > 0) {
        currentIndex--
        showQuestion()
    }
}

// retake quiz

document.querySelectorAll(".retakequiz").forEach(btn => {
    btn.addEventListener("click", () => {
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
        document.getElementById("review").style.display = "none"
        document.getElementById("final").style.display = "none"
        document.getElementById("question").style.display = "none"
        document.getElementById("welcome").style.display = "block"

        // seeing if resume button would show
        if (localStorage.getItem("flagQuizAnswers")) {
            document.getElementById("resumeBtn").style.display = "inline-block"
        } else {
            document.getElementById("resumeBtn").style.display = "none"
        }
    })
})



function reviewAnswers() {
    document.getElementById("final").classList.remove("active")
    document.getElementById("review").classList.add("active")

    const reviewList = document.getElementById("reviewList")
    reviewList.innerHTML = ""

    const log = JSON.parse(localStorage.getItem("answersLog"))


    //checks if log is empty
    if (!log || log.length === 0) {
        reviewList.innerHTML = "<p>No answers to review.</p>"
        return
    }

    log.forEach(answer => {
        const correct = countries[answer.country]
        const isCorrect = answer.userAnswer === correct

        const item = document.createElement("div")
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
    reviewList.innerHTML = "" // clear previous content

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



