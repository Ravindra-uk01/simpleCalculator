const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

//  Calculate first and second value depending on operator
const calculate = {
    '+': (firstNumber, secondNumber)=> firstNumber + secondNumber,
    '-': (firstNumber,secondNumber) => firstNumber - secondNumber,
    '*': (firstNumber,secondNumber) => firstNumber * secondNumber,
    '/': (firstNumber,secondNumber) => firstNumber / secondNumber,
    '=': (firstNumber,secondNumber) => secondNumber,
}

let operatorValue ='';
let awaitingNextValue = false;
let firstValue = 0;

function sendNumberValue(number){
    // Replace Current Display value if, first value was entered
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }else{
    // If current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        console.log(displayValue);
        calculatorDisplay.textContent = displayValue ==='0'?number: displayValue + number;
    }
}

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // To prevent multiple errors
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    }

    // Assign first value if no value
     if(!firstValue){
         firstValue = currentValue;   
     }else{
        //  console.log(firstValue, operator, currentValue);
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
     }

     // Ready of next value
       awaitingNextValue = true;
       operatorValue = operator;
    }

    function addDecimal(){
        // if operator is pressed , no decimal allowed
        if(awaitingNextValue){
            return;
        }
        if(!calculatorDisplay.textContent.includes('.')){
             calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
         }
    }

    // Reset all values and display
     function resetAll(){
         firstValue = 0;
         operatorValue = '';
         awaitingNextValue = false;
         calculatorDisplay.textContent = '0';
     }


// Add event listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn)=>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', ()=>sendNumberValue(inputBtn.value));
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',()=>useOperator(inputBtn.value));
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',addDecimal);
    }
})

// Event listener
clearBtn.addEventListener('click',resetAll);