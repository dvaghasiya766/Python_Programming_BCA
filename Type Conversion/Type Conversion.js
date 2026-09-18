function convertValue() {

    const input = document.getElementById("inputValue").value;
    const fromType = document.getElementById("fromType").value;
    const toType = document.getElementById("toType").value;

    const resultBox = document.getElementById("result");
    const codeBox = document.getElementById("pythonCode");

    let value;

    try {

        // Convert input into its original type
        if (fromType === "str") {
            value = input;
        } else if (fromType === "int") {
            value = parseInt(input);

            if (isNaN(value)) {
                throw new Error("Invalid integer value.");
            }
        } else if (fromType === "float") {
            value = parseFloat(input);

            if (isNaN(value)) {
                throw new Error("Invalid float value.");
            }
        } else if (fromType === "bool") {
            if (
                input.toLowerCase() === "true" ||
                input === "1"
            ) {
                value = true;
            } else if (
                input.toLowerCase() === "false" ||
                input === "0" ||
                input === ""
            ) {
                value = false;
            } else {
                throw new Error(
                    "Enter True, False, 1 or 0 for Boolean."
                );
            }
        }


        // Perform conversion
        let convertedValue;
        let pythonFunction;

        if (toType === "int") {

            if (typeof value === "boolean") {
                convertedValue = value ? 1 : 0;
            } else {
                convertedValue = parseInt(value);

                if (isNaN(convertedValue)) {
                    throw new Error(
                        "This value cannot be converted to integer."
                    );
                }
            }

            pythonFunction = "int()";
        } else if (toType === "float") {

            if (typeof value === "boolean") {
                convertedValue = value ? 1.0 : 0.0;
            } else {
                convertedValue = parseFloat(value);

                if (isNaN(convertedValue)) {
                    throw new Error(
                        "This value cannot be converted to float."
                    );
                }
            }

            pythonFunction = "float()";
        } else if (toType === "str") {

            if (typeof value === "boolean") {
                convertedValue = value ? "True" : "False";
            } else {
                convertedValue = String(value);
            }

            pythonFunction = "str()";
        } else if (toType === "bool") {

            convertedValue = Boolean(value);

            pythonFunction = "bool()";
        }


        // Display result
        resultBox.innerHTML = `
            <strong>Original Value:</strong> ${value}<br>
            <strong>Original Type:</strong> ${getTypeName(value)}<br>
            <strong>Converted Value:</strong> ${convertedValue}<br>
            <strong>Converted Type:</strong> ${getTypeName(convertedValue)}
        `;


        // Generate Python code
        let pythonValue;

        if (typeof value === "string") {
            pythonValue = `"${value}"`;
        } else {
            pythonValue = value;
        }

        codeBox.innerHTML = `
            value = ${pythonValue}<br>
            result = ${pythonFunction.replace("()", "")}(value)<br>
            print(result)<br>
            print(type(result))
        `;

    } catch (error) {

        resultBox.innerHTML = `
            <strong>❌ Error:</strong> ${error.message}
        `;

        codeBox.innerHTML = `
            Conversion could not be performed.
        `;
    }
}


function getTypeName(value) {

    if (typeof value === "string") {
        return "str";
    }

    if (typeof value === "number") {

        if (Number.isInteger(value)) {
            return "int";
        }

        return "float";
    }

    if (typeof value === "boolean") {
        return "bool";
    }

    return typeof value;
}