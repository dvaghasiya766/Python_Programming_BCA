function calculateOperator() {

    const value1Input =
        document.getElementById("value1").value.trim();

    const value2Input =
        document.getElementById("value2").value.trim();

    const operator =
        document.getElementById("operator").value;

    const resultBox =
        document.getElementById("operatorResult");


    try {

        let a;
        let b;

        /*
         * Try to convert numeric values.
         * If conversion fails, treat them as strings.
         */

        if (
            value1Input !== "" &&
            !isNaN(value1Input)
        ) {
            a = Number(value1Input);
        } else {
            a = value1Input;
        }


        if (
            value2Input !== "" &&
            !isNaN(value2Input)
        ) {
            b = Number(value2Input);
        } else {
            b = value2Input;
        }


        let result;


        /* Arithmetic */

        if (operator === "+") {

            result = a + b;

        } else if (operator === "-") {

            result = a - b;

        } else if (operator === "*") {

            result = a * b;

        } else if (operator === "/") {

            if (b === 0) {
                throw new Error(
                    "Division by zero is not allowed."
                );
            }

            result = a / b;

        } else if (operator === "%") {

            result = a % b;

        } else if (operator === "**") {

            result = a ** b;

        } else if (operator === "//") {

            result = Math.floor(a / b);

        }


        /* Comparison */
        else if (operator === "==") {

            result = a == b;

        } else if (operator === "!=") {

            result = a != b;

        } else if (operator === ">") {

            result = a > b;

        } else if (operator === "<") {

            result = a < b;

        } else if (operator === ">=") {

            result = a >= b;

        } else if (operator === "<=") {

            result = a <= b;

        }


        /* Logical */
        else if (operator === "and") {

            result = Boolean(a) && Boolean(b);

        } else if (operator === "or") {

            result = Boolean(a) || Boolean(b);

        } else if (operator === "not") {

            result = !Boolean(a);

        }


        /* Bitwise */
        else if (operator === "&") {

            result = Number(a) & Number(b);

        } else if (operator === "|") {

            result = Number(a) | Number(b);

        } else if (operator === "^") {

            result = Number(a) ^ Number(b);

        } else if (operator === "<<") {

            result = Number(a) << Number(b);

        } else if (operator === ">>") {

            result = Number(a) >> Number(b);

        } else {

            throw new Error(
                "Unsupported operator."
            );

        }


        resultBox.innerHTML = `

            <strong>Expression:</strong>
            ${displayValue(a)}
            ${operator}
            ${displayValue(b)}

            <br><br>

            <strong>Result:</strong>
            ${displayValue(result)}

            <br>

            <strong>Result Type:</strong>
            ${getType(result)}

        `;

    } catch (error) {

        resultBox.innerHTML = `

            <strong>❌ Error:</strong>
            ${error.message}

        `;

    }

}


/* Assignment Operators */

function calculateAssignment() {

    let value =
        Number(
            document.getElementById("assignValue").value
        );

    const operator =
        document.getElementById("assignOperator").value;

    const number =
        Number(
            document.getElementById("assignNumber").value
        );

    const resultBox =
        document.getElementById("assignmentResult");


    try {

        let originalValue = value;


        switch (operator) {

            case "=":
                value = number;
                break;

            case "+=":
                value += number;
                break;

            case "-=":
                value -= number;
                break;

            case "*=":
                value *= number;
                break;

            case "/=":

                if (number === 0) {
                    throw new Error(
                        "Division by zero is not allowed."
                    );
                }

                value /= number;
                break;

            case "%=":
                value %= number;
                break;

            case "//=":
                value = Math.floor(value / number);
                break;

            case "**=":
                value **= number;
                break;

            default:
                throw new Error(
                    "Invalid assignment operator."
                );
        }


        resultBox.innerHTML = `

            <strong>Original Value:</strong>
            ${originalValue}

            <br>

            <strong>Operation:</strong>
            ${operator} ${number}

            <br>

            <strong>Final Value:</strong>
            ${value}

        `;

    } catch (error) {

        resultBox.innerHTML = `

            <strong>❌ Error:</strong>
            ${error.message}

        `;

    }

}


/* Display Value */

function displayValue(value) {

    if (typeof value === "string") {

        return `"${value}"`;

    }

    return value;

}


/* Get Data Type */

function getType(value) {

    if (typeof value === "boolean") {

        return "bool";

    }

    if (typeof value === "number") {

        if (Number.isInteger(value)) {

            return "int";

        }

        return "float";

    }

    if (typeof value === "string") {

        return "str";

    }

    return typeof value;

}