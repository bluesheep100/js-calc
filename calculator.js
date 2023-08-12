const calculator = document.querySelector('.calc-bg');
const calculatorOutput = calculator.querySelector('output');

const operators = ['+', '-', 'x', '/'];

let userInput,
    lastResult,
    operator;

// Arithmetic Functions

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (parseFloat(b) !== 0 || !isNaN(b)) {
        return a / b;
    }
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

// Helper and handler functions

function updateOutput(text) {
    calculatorOutput.innerText = text;
}

function clearCalculator() {
    userInput = '';
    lastResult = '';
    operator = '';
    updateOutput('0');
}

function backSpace() {
    userInput = userInput.slice(0, userInput.length - 1);

    if (!userInput) {
        updateOutput('0');
        return;
    }

    updateOutput(userInput);
}

function numberInput(num) {
    if (!userInput || userInput === '0') {
        userInput = num;
    } else {
        userInput += num;
    }

    updateOutput(userInput);
}

function periodInput() {
    // if the input includes anything that is not a number, do nothing
    if (!userInput) {
        userInput = '0.';
    } else if (userInput.match(/^\d+$/)) {
        userInput += '.';
    }

    updateOutput(userInput);
}

// MAIN OPERATING FUNCTIONALITY

function operatorInput(newOperator) {
    if (!operator && userInput) {
        operator = newOperator;
        lastResult = Number(userInput);
        updateOutput(operator);
    } else if (lastResult && userInput) {
        // TODO: We should truncate the output of floats 'intelligently'
        lastResult = operate(operator, lastResult, Number(userInput));
        updateOutput(lastResult);
        operator = newOperator;
    } else {
        operator = newOperator;
        updateOutput(operator);
    }
    
    userInput = undefined;
}

function equals() {
    if (lastResult && userInput) {
        // TODO: We should truncate the output of floats 'intelligently'
        lastResult = operate(operator, lastResult, Number(userInput));
        updateOutput(lastResult);
        userInput = undefined;
        operator = '';
    }
}

function handleInput(input) {
    if (!isNaN(input) && input !== ' ') {
        numberInput(input);
    }

    if (input === '.') {
        periodInput();
    }

    if (!input || input === 'Backspace') {
        backSpace();
    }

    if (operators.includes(input)) {
        operatorInput(input);
    }
    
    if (input === '=' || input === 'Enter') {
        equals();
    }

    if (input.match(/^[A|C]/i)) {
        clearCalculator();
    }
}

// Event listeners

calculator.addEventListener('click', (e) => {
    if (e.target.nodeName !=='OUTPUT') {
        handleInput(e.target.innerText);
    }
});

document.addEventListener('keydown', (e) => {
    handleInput(e.key);
});
