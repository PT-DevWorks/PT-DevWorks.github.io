/* ================
   Detect Page Type
   ================ */
const pageType = document.body.className;
const navActions = document.getElementById("navigationActions");
switch (true) {
    case pageType.classList.contains("index"):
    
        break;

    case pageType.classList.contains("caseStudy"):
        
        break;
}



/* ========================
   Navigation Bar Functions
   ======================== */

//#region Navigation Bar Brand Title Typing Effect
const typingText = document.getElementById("typingText");
const brandTitles = ["Game Developer", "Software Developer"];

const typeSpeed = 200;
const deleteSpeed = 200;
const pauseAfterFull = 2500;
const pauseAfterDelete = 2500;

function getCycleTime(word) {
    return (
        word.length * typeSpeed +
        pauseAfterFull +
        word.length * deleteSpeed +
        pauseAfterDelete
    );
}

let startTime = parseInt(localStorage.getItem("typingStartTime"));
if (!startTime) {
    startTime = Date.now();
    localStorage.setItem("typingStartTime", startTime);
}

function animateTyper() {
    if (!typingText) return;

    const now = Date.now();
    let elapsed = now - startTime;
    let wordIndex = 0;

    while (true) {
        const word = brandTitles[wordIndex];
        const cycleTime = getCycleTime(word);

        if (elapsed < cycleTime) break;

        elapsed -= cycleTime;
        wordIndex = (wordIndex + 1) % brandTitles.length;
    }

    const currentWord = brandTitles[wordIndex];
    const typingTime = currentWord.length * typeSpeed;
    const fullPauseEnd = typingTime + pauseAfterFull;
    const deletingTime = fullPauseEnd + currentWord.length * deleteSpeed;

    let text = "";

    if (elapsed < typingTime) {
        const chars = Math.floor(elapsed / typeSpeed);
        text = currentWord.substring(0, chars);
    } else if (elapsed < fullPauseEnd) {
        text = currentWord;
    } else if (elapsed < deletingTime) {
        const deleteElapsed = elapsed - fullPauseEnd;
        const charsLeft =
            currentWord.length -
            Math.floor(deleteElapsed / deleteSpeed);
        text = currentWord.substring(0, charsLeft);
    } else {
        text = "";
    }

    typingText.textContent = text;
    requestAnimationFrame(animateTyper);
}

animateTyper();
//#endregion

//#region Navigation Bar Action and Social Items

//#endregion

//#region Navigation Bar Hamburger
function ToggleMenu() {
    const navItems = document.querySelector(".navItems");
    const hamburger = document.querySelector(".hamburger");

    const isOpen = navItems.classList.contains("show");

    if (isOpen) {
        navItems.classList.remove("show");
        hamburger.classList.remove("open");
    } else {
        navItems.classList.add("show");

        navItems.classList.remove("animate-out");
        navItems.classList.add("animate-in");

        hamburger.classList.add("open");
    }
}
//#endregion

