// Saving display screens and buttons in variables 
let calcScreen = document.querySelector(".calc-screen");
let calculation = document.querySelector(".eval")
let calcNumbers = document.querySelectorAll(".calc-numbers button");
let calcFunc = document.querySelectorAll(".calc-func-1 button");
let calcEqual = document.querySelector("#equal");
let calcHistory = document.querySelector(".calc-history");

// List of numbers and functions to be used in the calculator
let nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "Backspace"];
let funcs = ["+", "-", "/", "*", "^"]

// Variable to track if the next number input is coming after an operator
let next;


 
// Adding event listeners to the buttons
calcNumbers.forEach(button => {
    button.addEventListener("click", numberClick);
    
});
calcFunc.forEach(button => {
    button.addEventListener("click", funcClick);
});
calcEqual.addEventListener("click", equalClick);

// Adding event listener for keyboard input
document.addEventListener("keydown", (e) => {
    // For when a number is clicked
    if (nums.includes(e.key)) {
        let numClicked = document.querySelector(`.calc-numbers button[value="${e.key}"]`);
        numberClick({ target: numClicked });
    }
    // For when an operator is clicked
    if (funcs.includes(e.key)) {
        let funcClicked = document.querySelector(`.calc-func-1 button[value="${e.key}"]`);
        funcClick({ target: funcClicked });
    }
    // For when the equal or enter is clicked
    if (e.key === "Enter" || e.key === "=") {
        equalClick({ target: calcEqual });
    }
})


// Fuction to handle number button clicks
function numberClick(e) {
    //  For backspace
    if (e.target.id === "Backspace") {
      calcScreen.innerText = calcScreen.innerText.slice(0, -1);
      if (calcScreen.innerText === "" ) {
        calcScreen.innerText = "0";
      }   
    }
    // For preventing excessive digits
    else if (calcScreen.innerText.length >= 15 && !next) {
        alert("can't enter more than 16 digits");
    }
    // For period
    else if (e.target.id === "period") {
        if (calcScreen.innerText.includes(".")) {
        }
        else if (next) {
            calcScreen.innerText = "0.";
        }
        else {
            calcScreen.innerText += e.target.value;
        }
    }
    // For other numbers
    else {
        if (calcScreen.innerText === "0" || next) {
            calcScreen.innerText = e.target.value;
            next = false
        }
        else{
            calcScreen.innerText += e.target.value;
        }
    }
    
}

// Function to handle operator button clicks
function funcClick(e) {
    let symbol = e.target.value // Get the symbol of the operator clicked
    // For clear button
    if (e.target.value === "clear") {
        calculation.innerText = "";
        calcScreen.innerText = "0"
    }
    // For other operators
    else {
        // If calculator screen is empty
        if (calculation.innerText.length === 0 && calcScreen.innerText === "0") {
            // Do nothing
        }
        // To change the selected operator
        else if (calculation.innerText.length > 0 && next) {
            calculation.innerText = calculation.innerText.slice(0, -1)
            calculation.innerText += symbol
    }
        // To add operator
        else {
            calculation.innerText += calcScreen.innerText
            calcScreen.innerText = eval(expo(calculation.innerText))
            calculation.innerText += symbol
            next = true
        }

}

}

// Function to handle equal button click
function equalClick(e) {
    // For empty screen, do nothing
    if (calculation.innerText.length === 0) {}
    // For non-empty screen
    else {
        let calc = calculation.innerText
        
        if (!next) {
        calc += calcScreen.innerText 
        calcScreen.innerText = eval(expo(calc))
        calculation.innerText = ""
        next = true
        }
        else {
            calc = calc.slice(0, -1)
            calculation.innerText = ""
            next = true
        }
        let historyItem = document.createElement("span");
        historyItem.innerText = calc + " = " + calcScreen.innerText;
        calcHistory.insertBefore(historyItem, calcHistory.firstChild);
        if (calcHistory.children.length > 10) {
            calcHistory.removeChild(calcHistory.lastChild);
        }
    }
}

// Function to replace ^ with ** for eval method
function expo(equation) {
    let newequation = "";
    for (let i = 0; i < equation.length; i++) {

        if (equation[i] === "^") {
            newequation += "**";
        }
        else {
            newequation += equation[i];
        }
    }
    return newequation;
}