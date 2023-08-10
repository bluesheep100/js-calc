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
    if(b != 0 ){
        return a / b;
    }
    else{
        console.log("cannot divide by 0!")
    }
    
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return (add(a, b))
        case "-":
            return (subtract(a, b));
        case "*":
            return (multiply(a, b));
        case "/":
            return (divide(a, b));
        
    }

}
console.log(operate("*", 4, 0))
