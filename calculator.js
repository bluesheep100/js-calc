const calculator = document.querySelector('.calc-bg');
const calculatorOutput = calculator.querySelector('output');

const operators = ['+', '-', 'x', '/'];

let userInput,
    lastResult,
    operator;

// Arithmetic Functions

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

function divide(a, b) {
    if (parseFloat(a) !== 0 || !isNaN(a) ||
        parseFloat(b) !== 0 || !isNaN(b)) {
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

function updateOperator(newOperator) {
    operator = newOperator;
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
    if (!userInput) {
        userInput = '0.';
    } else if (userInput.match(/^\d+$/)) {
        userInput += '.';
    }

    updateOutput(userInput);
}

function changeInputSign() {
    if (!isNaN(userInput)) {
        userInput = (userInput * -1).toString();
        updateOutput(userInput);
    }
}

// MAIN OPERATING FUNCTIONALITY

function startNewOperation(newOperator) {
    updateOperator(newOperator);
    lastResult = Number(userInput);
    updateOutput(operator);
}

function operateWithPreviousResult(newOperator) {
    // TODO: We should truncate the output of floats 'intelligently'
    lastResult = operate(operator, lastResult, Number(userInput));
    updateOutput(lastResult);
    updateOperator(newOperator);
}

function operatorInput(newOperator) {
    if (!operator && userInput) {
        startNewOperation(newOperator);
    } else if (lastResult && userInput) {
        operateWithPreviousResult(newOperator);
    } else {
        updateOperator(newOperator);
        updateOutput(operator);
    }

    userInput = undefined;
}

function equals() {
    if (lastResult && userInput) {
        operateWithPreviousResult('');
        userInput = undefined;
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

    if (input === 'Sign') {
        changeInputSign();
    }

    if (input === '=' || input === 'Enter') {
        equals();
    }

    if (input.match(/^[A|C]/i)) {
        clearCalculator();
    }
}

// Event listeners
calculator.addEventListener('click', e => {
    if (e.target.nodeName === 'BUTTON') {
        handleInput(e.target.innerText);
    }
});

document.addEventListener('keydown', (e) => {
    handleInput(e.key);
});
