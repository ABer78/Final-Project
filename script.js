// switching to question screen
function startQuiz() {
    document.getElementById("welcome").classList.remove("active");
    document.getElementById("welcome").classList.add("screen");

    document.getElementById("question").classList.add("active");

<<<<<<< HEAD
    // flag setup
    const countries = {
        "Armenia": "armenia",
        "United States of America": "america",
        "India": "india",
        "Austria": "austria",
        "Canada": "canada"
    };

    const country = "Armenia"; // later you can randomize this
    const flagUrl = `https://cdn.countryflags.com/thumbs/${countries[country]}/flag-800.png`;

    document.getElementById("flag").src = flagUrl;
    document.getElementById("flag").alt = `${country} Flag`;
}
=======
// switch questions
function nextQue() {
    
}

>>>>>>> 3039945b5478caa43a706864dbb49e09fd730394
