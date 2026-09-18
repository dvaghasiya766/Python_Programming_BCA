function showAnswer(number) {

    const answer = document.getElementById("answer" + number);

    if (answer.style.display === "block") {
        answer.style.display = "none";
    } else {
        answer.style.display = "block";
    }
}


function runMethod() {

    const input = document.getElementById("inputString").value;
    const method = document.getElementById("method").value;

    let result;

    switch (method) {

        case "upper":
            result = input.toUpperCase();
            break;

        case "lower":
            result = input.toLowerCase();
            break;

        case "title":
            result = input
                .toLowerCase()
                .replace(/\b\w/g, char => char.toUpperCase());
            break;

        case "capitalize":
            result =
                input.charAt(0).toUpperCase() +
                input.slice(1).toLowerCase();
            break;

        case "swapcase":
            result = [...input]
                .map(char =>
                    char === char.toUpperCase() ?
                    char.toLowerCase() :
                    char.toUpperCase()
                )
                .join("");
            break;

        case "strip":
            result = input.trim();
            break;

        case "lstrip":
            result = input.trimStart();
            break;

        case "rstrip":
            result = input.trimEnd();
            break;

        case "isdigit":
            result = /^[0-9]+$/.test(input);
            break;

        case "isalpha":
            result = /^[A-Za-z]+$/.test(input);
            break;

        case "isalnum":
            result = /^[A-Za-z0-9]+$/.test(input);
            break;

        case "isspace":
            result = /^\s+$/.test(input);
            break;

        case "count":

            const character =
                prompt("Enter substring to count:");

            if (character === null || character === "") {
                result = "Please enter a substring.";
            } else {

                let count = 0;
                let position = 0;

                while (
                    (position = input.indexOf(character, position)) !== -1
                ) {
                    count++;
                    position += character.length;
                }

                result = count;
            }

            break;

        default:
            result = "Select a method.";
    }

    document.getElementById("output").textContent = result;
}