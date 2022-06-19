/**
 * Step 1: Identify and mimic user intent.
 * User intent: Type a number, choose an operator, input another number, press equal sign and get result.
 * Happy path: 5+5 = 10 i.e this is exactly what we trying to do,some simple arithmetic you know!
 * Edge  Case: 2 + 5 - 5 + 10 / 2 = 6 i.e we aren't doing this with our calculator, maybe some other time lol!
 */

let preEntry = 0;
let operator = null;
let currentEntry = 0;
let result = 0;

// Step 2: selecting all the  element we need on the screen.

let display = document.querySelector('#display');
let button = document.querySelectorAll('.btn');
let operators = document.querySelectorAll('.operator');
updateScreen(result);

// Step 3: Create a function that listens to key's pressed and let us know which key is been pressed.

button.forEach( btn => {
    btn.addEventListener('click', function(){
        let btnClicked = this.innerText; 
        display.value = btnClicked; 

        // Step 4: Define the functionality for each button and explains how it works.

        if (btnClicked === 'AC'){
            currentEntry = 0;
            result = 0;
        }else if(btnClicked === '+/-'){
            currentEntry *= -1;
        }else if(btnClicked === '.'){
            currentEntry += '.';
        }else if(btnClicked === 'x'){
            preEntry = currentEntry;
            operator = '*';
            currentEntry = '';
        }else if(btnClicked === '÷'){
            preEntry = currentEntry;
            operator = '/';
            currentEntry = '';
        }else if(isNumber(btnClicked)){
            // If display is 0,replace the 0 with btnClicked.
            // Or
            // If result is displayed, reset number.
            if(currentEntry === 0 || currentEntry === result){
                currentEntry = btnClicked;
                // if numbers are displayed, add to display area.
            }else {
                currentEntry += btnClicked;
            }
        }else if(isOperator(btnClicked)){
            preEntry = currentEntry;
            operator = btnClicked;
            currentEntry = '';
        }else if(btnClicked === '%'){
            currentEntry /= 100;
        }else if (btnClicked === '='){
            result = operate(preEntry, operator, currentEntry);
            operator = null;
            currentEntry = result;
        }
        updateScreen(currentEntry);
    });
});

// Step 5: Create a function to teach our Javascript programs what a numbers are.

function isNumber(value){
    return !isNaN(value);
}

// Step 6: Create a function to teach our Javascript program what an operator is.

function isOperator(value){
    return value === '/' ||  value === '+' || value === '*' || value === '-'; 
}

// Step 7: Create a function to teach our Javascript equation.

function operate(a,operator,b){
    a = parseFloat(a);
    b = parseFloat(b);
    switch(operator){
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
    }
}

// Step 8: Create a function to display the results on the screen.

function updateScreen(result){
    let displayValue = result.toString();
    display.value = displayValue.substring(0,6);
};