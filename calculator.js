const calculator = document.querySelector('.calc-bg');
const calculatorOutput = calculator.querySelector('output');

const operators = ['+', '-', 'x', '/'];

let userInput,
    lastResult,
    operator;

// Arithmetic Functions

const add = (a, b) =>  a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

function divide(a, b) {
    if (parseFloat(a) !== 0 || !isNaN(a) ||
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

// MAIN OPERATING FUNCTIONALITY

function operatorInput(newOperator) {
    /**
     * If the user has input a number but there is no operator yet, store the
     * number as the first operand and store operator. [This allows to start
     * anew if the user presses a number after the equal button]
     *
     * Else, if there is already a stored number and a new number, performe the
     * operation that was stored in operator, store it for new operations, and
     * store the operator for the next operation. [This allows to perform
     * calculations afer pressing an equal button with the previous result]
     *
     * In the default case, we just update the operator that was previously set
     */
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
    /**
     * The condition checks if we have to numbers to operate (the operator is
     * implicitly set if this condition is met; see operatorInput)
     *
     * If met, we perform the calculation, store it for later, show the result
     * and reset userInput and operator
     */
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
