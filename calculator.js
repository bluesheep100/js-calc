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
console.log(operate("*", 4, 0))
