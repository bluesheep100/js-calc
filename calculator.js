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
    if (b != 0 || !isNaN(b)) {
        return a / b;
    }
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return (add(a, b))
        case "-":
            return (subtract(a, b));
        case "x":
            return (multiply(a, b));
        case "/":
            return (divide(a, b));
    }
}

//console.log(operate("*", 4, 0))

/**
 * MAKE THE CALCULATOR WORK!
 */
const calculator = document.querySelector('.calc-bg');
const calculator_output = calculator.getElementsByTagName('output')[0];

const operators = ['+', '-', 'x', '/'];

let output = 0,
    userInput = '0',
    lastResult = 0,
    operator;

updateOutput();

function updateOutput() {
    calculator_output.innerText = output;
}

function clearCalculator() {
    output = 0;
    userInput = '0';
    lastResult = 0;
    operator = '';
}

function backSpace() {
    userInput = userInput.slice(0, userInput.length - 1);
    
    if (!userInput) {
        userInput = '0';
    }

    output = userInput;
}

function numberInput(num) {
    if (userInput === '0' || operators.includes(userInput)) {
        userInput = num;
    } else {
        userInput += num;
    }

    output = userInput;
}

function periodInput() {
    // if the input includes anything that is not a number, do nothing
    if (userInput.match(/^\d+$/)) {
        userInput += '.';
    }

    output = userInput;
}

function operatorInput(newOperator) {
    if (!operator) {
        operator = newOperator;
        lastResult = userInput;
        userInput = '0';
    } else {
        let operation = operate(operator, Number(lastResult), Number(userInput));
        if (operation) {
            lastResult = operation;
            output = lastResult;
        }
        operator = newOperator;
        userInput = '0';
    }
    output = operator;
}

function equals() {
    lastResult = operate(operator, Number(lastResult), Number(userInput));
    if (lastResult) {
        output = lastResult;
        userInput = '0';
    }
}

function handleInput(input) {
    if (!isNaN(input) && input !== ' ') {
        numberInput(input);
    }

    if (input === '.') {
        periodInput();
    }

    if (!input && input === 'Backspace') {
        backSpace();
    }

    if (operators.includes(input)) {
        operatorInput(input);
    }
    
    if (input === '=' || input === 'Enter') {
        equals();
    }

    if (input.toLowerCase().includes('c')) {
        clearCalculator();
    }
}

calculator.addEventListener('click', (e) => {
    e.target.nodeName !='OUTPUT' && handleInput(e.target.innerText);
});

document.addEventListener('keydown', (e) => {
    handleInput(e.key);
});
