const calculator = document.querySelector('.calc-bg');
const operators = ['+', '-', 'x', '/'];

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