const questions = [
    {
        type: "mcq",
        question: "What is the first step in effective time management?",
        options: ["A) Making a rough list of tasks", "B) Prioritizing tasks", "C) Allocating time", "D) Avoiding tasks"],
        answer: "A"
    },
    {
        type: "mcq",
        question: "Why is prioritizing tasks important?",
        options: ["A) It helps in planning effectively", "B) It saves time", "C) It ensures important tasks are done first", "D) All of the above"],
        answer: "D"
    },
    {
        type: "fill_blank",
        question: "Ein _________ hilft bei der Organisation täglicher Aufgaben.",
        answer: "Zeitplan"
    },
    {
        type: "fill_blank",
        question: "Das Setzen von __________ ist wichtig für ein gutes Zeitmanagement.",
        answer: "Prioritäten"
    }
];

let currentQuestionIndex = 0;
let timer = 15 * 60;

function displayQuestion(index) {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";
    const q = questions[index];

    const questionText = document.createElement("h2");
    questionText.textContent = q.question;
    questionContainer.appendChild(questionText);

    if (q.type === "mcq") {
        q.options.forEach(option => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "answer";
            input.value = option;
            label.appendChild(input);
            label.append(option);
            questionContainer.appendChild(label);
            questionContainer.appendChild(document.createElement("br"));
        });
    } else {
        const input = document.createElement("input");
        input.type = "text";
        input.id = "fill-answer";
        questionContainer.appendChild(input);
    }
}

function createQuestionNav() {
    const navContainer = document.getElementById("question-nav");
    questions.forEach((_, index) => {
        const btn = document.createElement("button");
        btn.textContent = index + 1;
        btn.onclick = () => {
            currentQuestionIndex = index;
            displayQuestion(index);
        };
        navContainer.appendChild(btn);
    });
}

function updateTimer() {
    const timerElement = document.getElementById("timer");
    if (timer > 0) {
        timer--;
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    } else {
        alert("Time is up!");
        document.getElementById("submit").click();
    }
}

document.getElementById("prev").addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
});

document.getElementById("next").addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
});

document.getElementById("save").addEventListener("click", () => {
    alert("Answer saved!");
});

document.getElementById("submit").addEventListener("click", () => {
    alert("Test submitted successfully!");
});

setInterval(updateTimer, 1000);

window.onload = function () {
    displayQuestion(0);
    createQuestionNav();
};
