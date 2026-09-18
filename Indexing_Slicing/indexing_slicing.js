const textInput =
    document.getElementById("textInput");

const showStringBtn =
    document.getElementById("showStringBtn");

const positiveIndexes =
    document.getElementById("positiveIndexes");

const negativeIndexes =
    document.getElementById("negativeIndexes");

const characters =
    document.getElementById("characters");

const indexInput =
    document.getElementById("indexInput");

const checkIndexBtn =
    document.getElementById("checkIndexBtn");

const indexResult =
    document.getElementById("indexResult");

const startInput =
    document.getElementById("startInput");

const stopInput =
    document.getElementById("stopInput");

const stepInput =
    document.getElementById("stepInput");

const sliceBtn =
    document.getElementById("sliceBtn");

const sliceResult =
    document.getElementById("sliceResult");

const sliceVisualization =
    document.getElementById(
        "sliceVisualization"
    );


// ======================================
// DISPLAY STRING
// ======================================

function displayString() {

    const text = textInput.value;

    positiveIndexes.innerHTML = "";
    negativeIndexes.innerHTML = "";
    characters.innerHTML = "";

    if (text.length === 0) {
        return;
    }


    for (let i = 0; i < text.length; i++) {

        // Positive Index
        const positive =
            document.createElement("div");

        positive.className =
            "index-box";

        positive.textContent = i;

        positive.style.background =
            "#e7f0ff";

        positive.style.color =
            "#1769aa";

        positiveIndexes.appendChild(
            positive
        );


        // Character
        const character =
            document.createElement("div");

        character.className =
            "character-box";

        character.textContent =
            text[i];

        character.dataset.index =
            i;

        characters.appendChild(
            character
        );


        // Negative Index
        const negative =
            document.createElement("div");

        negative.className =
            "index-box";

        negative.textContent =
            i - text.length;

        negative.style.background =
            "#fff0e6";

        negative.style.color =
            "#c45b15";

        negativeIndexes.appendChild(
            negative
        );
    }
}


// ======================================
// DISPLAY BUTTON
// ======================================

showStringBtn.addEventListener(
    "click",
    function() {

        displayString();

        indexResult.classList.add(
            "hidden"
        );

        sliceResult.classList.add(
            "hidden"
        );

        sliceVisualization.innerHTML =
            "";

    }
);


// ======================================
// INDEXING
// ======================================

checkIndexBtn.addEventListener(
    "click",
    function() {

        const text =
            textInput.value;

        const index =
            Number(indexInput.value);


        document
            .querySelectorAll(".character-box")
            .forEach(
                box =>
                box.classList.remove(
                    "selected"
                )
            );


        if (text.length === 0) {

            showIndexError(
                "Please enter a string first."
            );

            return;
        }


        if (
            Number.isNaN(index) ||
            index >= text.length ||
            index < -text.length
        ) {

            showIndexError(
                `❌ Index ${index} is out of range.`
            );

            return;
        }


        // Convert negative index
        // into positive position

        const actualIndex =
            index >= 0 ?
            index :
            text.length + index;


        const character =
            text[actualIndex];


        const boxes =
            document.querySelectorAll(
                ".character-box"
            );


        boxes[actualIndex]
            .classList.add("selected");


        indexResult.innerHTML = `

            <div>
                Python Expression:
                <strong>
                    "${text}"[${index}]
                </strong>
            </div>

            <div>
                Result:
                <strong>
                    '${character}'
                </strong>
            </div>

            <div>
                Character position:
                <strong>
                    ${actualIndex}
                </strong>
            </div>

        `;

        indexResult.classList.remove(
            "hidden"
        );

        indexResult.classList.remove(
            "error"
        );

    }
);


function showIndexError(message) {

    indexResult.innerHTML =
        message;

    indexResult.classList.remove(
        "hidden"
    );

    indexResult.classList.add(
        "error"
    );
}


// ======================================
// PYTHON-LIKE SLICE FUNCTION
// ======================================

function pythonSlice(
    text,
    start,
    stop,
    step
) {

    const length =
        text.length;


    // Default step

    if (step === 0) {

        throw new Error(
            "Step cannot be zero."
        );

    }


    // ----------------------------------
    // Positive Step
    // ----------------------------------

    if (step > 0) {

        if (start === null) {
            start = 0;
        }

        if (stop === null) {
            stop = length;
        }


        // Convert negative indexes

        if (start < 0) {
            start =
                Math.max(
                    length + start,
                    0
                );
        }

        if (stop < 0) {
            stop =
                Math.max(
                    length + stop,
                    0
                );
        }


        start =
            Math.min(
                Math.max(start, 0),
                length
            );

        stop =
            Math.min(
                Math.max(stop, 0),
                length
            );


        let result = "";

        let indexes = [];


        for (
            let i = start; i < stop; i += step
        ) {

            result += text[i];

            indexes.push(i);

        }


        return {
            result,
            indexes
        };

    }


    // ----------------------------------
    // Negative Step
    // ----------------------------------

    if (step < 0) {

        if (start === null) {
            start = length - 1;
        }

        if (stop === null) {
            stop = -1;
        }


        // Convert negative start

        if (start < 0) {

            start =
                length + start;

        }


        // Important:
        // Python allows stop = -1
        // to mean before index 0.

        if (
            stop < -1
        ) {

            stop =
                length + stop;

        }


        start =
            Math.min(
                Math.max(start, -1),
                length - 1
            );


        let result = "";

        let indexes = [];


        for (
            let i = start; i > stop; i += step
        ) {

            if (
                i >= 0 &&
                i < length
            ) {

                result += text[i];

                indexes.push(i);

            }

        }


        return {
            result,
            indexes
        };

    }

}


// ======================================
// SLICING
// ======================================

sliceBtn.addEventListener(
    "click",
    generateSlice
);


function generateSlice() {

    const text =
        textInput.value;


    if (text.length === 0) {

        showSliceError(
            "Please enter a string first."
        );

        return;
    }


    const start =
        parseOptionalNumber(
            startInput.value
        );


    const stop =
        parseOptionalNumber(
            stopInput.value
        );


    const step =
        stepInput.value === "" ?
        1 :
        Number(stepInput.value);


    if (step === 0) {

        showSliceError(
            "❌ Step cannot be zero."
        );

        return;
    }


    try {

        const sliced =
            pythonSlice(
                text,
                start,
                stop,
                step
            );


        const expression =
            buildSliceExpression(
                start,
                stop,
                step
            );


        sliceResult.innerHTML = `

            <div class="slice-code">
                "${text}"${expression}
            </div>

            <div>
                Result:
            </div>

            <div class="slice-output">
                "${sliced.result}"
            </div>

        `;


        sliceResult.classList.remove(
            "hidden"
        );


        displaySliceIndexes(
            text,
            sliced.indexes
        );

    } catch (error) {

        showSliceError(
            error.message
        );

    }

}


// ======================================
// OPTIONAL NUMBER
// ======================================

function parseOptionalNumber(value) {

    if (value === "") {
        return null;
    }

    return Number(value);

}


// ======================================
// SLICE EXPRESSION
// ======================================

function buildSliceExpression(
    start,
    stop,
    step
) {

    const startText =
        start === null ?
        "" :
        start;

    const stopText =
        stop === null ?
        "" :
        stop;

    const stepText =
        step === 1 ?
        "" :
        step;


    return `[${startText}:${stopText}:${stepText}]`;
}


// ======================================
// SLICE VISUALIZATION
// ======================================

function displaySliceIndexes(
    text,
    activeIndexes
) {

    sliceVisualization.innerHTML =
        "";


    for (
        let i = 0; i < text.length; i++
    ) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "slice-character";


        if (
            activeIndexes.includes(i)
        ) {

            wrapper.classList.add(
                "active"
            );

        }


        wrapper.innerHTML = `

            <div class="char">
                ${text[i]}
            </div>

            <div class="position">
                Index ${i}
            </div>

        `;


        sliceVisualization.appendChild(
            wrapper
        );

    }

}


function showSliceError(message) {

    sliceResult.innerHTML =
        message;

    sliceResult.classList.remove(
        "hidden"
    );
}


// ======================================
// EXAMPLE BUTTONS
// ======================================

document
    .querySelectorAll(".example-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                startInput.value =
                    this.dataset.start;

                stopInput.value =
                    this.dataset.stop;

                stepInput.value =
                    this.dataset.step;


                generateSlice();

            }
        );

    });


// ======================================
// CHALLENGE QUESTIONS
// ======================================

const challenges = [

    {
        index: 0,
        question: "Which character is present at index <strong>0</strong>?"
    },

    {
        index: 2,
        question: "Which character is present at index <strong>2</strong>?"
    },

    {
        index: -1,
        question: "Which character is present at index <strong>-1</strong>?"
    },

    {
        index: -2,
        question: "Which character is present at index <strong>-2</strong>?"
    }

];


let currentQuestion = 0;


// ======================================
// GENERATE CHALLENGE
// ======================================

function generateChallenge() {

    const text =
        textInput.value;


    if (text.length === 0) {

        question.innerHTML =
            "Enter a string first.";

        challengeOptions.innerHTML =
            "";

        return;

    }


    const challenge =
        challenges[currentQuestion];


    const index =
        challenge.index;


    const actualIndex =
        index >= 0 ?
        index :
        text.length + index;


    if (
        actualIndex < 0 ||
        actualIndex >= text.length
    ) {

        question.innerHTML =
            "Enter a longer string to attempt this question.";

        challengeOptions.innerHTML =
            "";

        return;

    }


    const correctAnswer =
        text[actualIndex];


    question.innerHTML =
        challenge.question;


    challengeOptions.innerHTML =
        "";

    challengeResult.innerHTML =
        "";


    const options =
        generateOptions(
            text,
            correctAnswer
        );


    options.forEach(
        option => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "option";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                function() {

                    checkChallenge(
                        button,
                        option,
                        correctAnswer
                    );

                }
            );


            challengeOptions.appendChild(
                button
            );

        }
    );

}


// ======================================
// OPTIONS
// ======================================

function generateOptions(
    text,
    correctAnswer
) {

    let options = [
        correctAnswer
    ];


    for (
        let i = 0; i < text.length; i++
    ) {

        if (
            !options.includes(
                text[i]
            ) &&
            options.length < 4
        ) {

            options.push(
                text[i]
            );

        }

    }


    while (
        options.length < 4
    ) {

        options.push("?");

    }


    return options.sort(
        () => Math.random() - 0.5
    );

}


// ======================================
// CHECK CHALLENGE
// ======================================

function checkChallenge(
    button,
    answer,
    correctAnswer
) {

    const buttons =
        document.querySelectorAll(
            ".option"
        );


    buttons.forEach(
        btn =>
        btn.disabled = true
    );


    if (
        answer === correctAnswer
    ) {

        button.classList.add(
            "correct"
        );

        challengeResult.innerHTML =
            "🎉 Correct! Excellent work!";

    } else {

        button.classList.add(
            "wrong"
        );

        challengeResult.innerHTML =
            `❌ Incorrect. The correct answer is '${correctAnswer}'.`;

    }

}


// ======================================
// NEXT QUESTION
// ======================================

document
    .getElementById(
        "nextQuestionBtn"
    )
    .addEventListener(
        "click",
        function() {

            currentQuestion++;

            if (
                currentQuestion >=
                challenges.length
            ) {

                currentQuestion = 0;

            }

            generateChallenge();

        }
    );


// ======================================
// INITIAL LOAD
// ======================================

displayString();

generateChallenge();

function showAnswer(questionNumber) {
    const answer = document.getElementById("answer" + questionNumber);

    if (answer.style.display === "block") {
        answer.style.display = "none";
    } else {
        answer.style.display = "block";
    }
}