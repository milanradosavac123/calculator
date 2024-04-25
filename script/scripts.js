const root = document.getElementById("root");
const numberGrid = document.getElementById("numberGrid");
const operatorColumn = document.getElementById("operatorColumn");
const additionalFunctionRow = document.getElementById("additionalFunctionRow");

const resultText = document.createElement("p");
resultText.id = "resultText";
resultText.innerHTML = "0";
root.appendChild(resultText);

const title = document.createElement("h1");
title.id = "title";
title.innerHTML = "Calculator - Ana Zeljkovic ft. Marko Maric & Milan Radosavac";
document.body.appendChild(title);

const operators = "+ - x /".split(" ");
const numbers = Array.from({ length: 9 }, (_, index) => index + 1);

function handleButtonClick(buttonText) {

    if (resultText.innerHTML === "0") {

        if (buttonText === ".") return;

        resultText.innerHTML = buttonText;
        return;
    }

    resultText.innerHTML += buttonText;
}

numbers.forEach((number, i) => {
    const numberButton = document.createElement("button");
    numberButton.innerHTML = `${10 - number}`;
    if(i <= 2) {
        numberButton.className = "firstRow"
    } 
    numberButton.onclick = () => {
        handleButtonClick(`${10 - number}`);
    };
    numberGrid.appendChild(numberButton);
});

operators.forEach((operator) => {
    const operatorButton = document.createElement("button");
    operatorButton.className = "operator";
    operatorButton.innerHTML = operator;
    operatorButton.onclick = () => {
        if (!operators.includes(resultText.innerHTML[resultText.innerHTML.length - 1]) && resultText.innerHTML !== "0" && resultText.innerHTML[resultText.innerHTML.length - 1] !== ".") handleButtonClick(`${operator}`);
    };
    operatorColumn.appendChild(operatorButton);
});

"0 . =".split(" ").forEach((f) => {
    const additionalFunctionButton = document.createElement("button");
    additionalFunctionButton.innerHTML = f;
    additionalFunctionButton.onclick = async () => {
        if (f !== "=") {
            if (f === ".") {
                if (numbers.includes(parseInt(resultText.innerHTML[resultText.innerHTML.length - 1])) || resultText.innerHTML[resultText.innerHTML.length - 1] === "0") {
                    handleButtonClick(f);
                    return;
                }
            } else {
                handleButtonClick(f);
                return;
            }
        }
        if (f === "=") {

            let expression = resultText.innerHTML;

            if(resultText.innerHTML.includes("x")) {
                expression = resultText.innerHTML.replace("x", "*");
            }

            const response = await fetch(`http://localhost:5000/expression/evaluate/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(
                    {
                        expression: expression
                    }
                )
            })

            resultText.innerHTML = await response.json()
        }
    };
    additionalFunctionRow.appendChild(additionalFunctionButton);
});