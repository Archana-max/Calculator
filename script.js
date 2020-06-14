class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }
    clear() {

        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;

    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {

        if (number === "." && this.currentOperand.includes(".")) return;

        this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    chooseOperation(operation) {

        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";

    }

    compute() {

        let computation;
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case "+":
                computation = prev + curr;
                break;
            case "-":
                computation = prev - curr;
                break;
            case "x":
                computation = prev * curr;
                break;
            case "/":
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.readyToReset = true;
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplay(number) {
        const stringNumber = number.toString();
        const integer = parseFloat(stringNumber.split(".")[0]);
        const decimal = stringNumber.split(".")[1];

        let integerDisplay;

        if (isNaN(integer)) {
            integerDisplay = "";
        }
        else {
            integerDisplay = integer.toLocaleString("en", {
                maximumFractionDigits: 0
            })
        }
        if (decimal != null) {
            return `${integerDisplay}.${decimal}`;
        }
        else {
            return `${integerDisplay}`;
        }

    }

    updateDisplay() {

        
        this.currentOperandTextElement.innerText = this.getDisplay(this.currentOperand);

        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplay(this.previousOperand)} ${this.operation}`;
        }
        else {
            this.previousOperandTextElement.innerText= "";
        }
        // console.log(this.currentOperandTextElement.innerText);
    }

}



const numberButtons = document.querySelectorAll('[data-number]')

const operationButtons = document.querySelectorAll("[data-operation]");

const deleteButton = document.querySelector("[data-delete]");

const allClearButton = document.querySelector("[data-all-clear]");

const equalsButton = document.querySelector("[data-equals]");

const previousOperandTextElement = document.querySelector("[data-prev-operand]");

const currentOperandTextElement = document.querySelector("[data-curr-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {

    button.addEventListener('click', () => {

        // console.log(button.innerText);
        if (calculator.previousOperand === "" &&
            calculator.currentOperand !== "" &&
            calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }

        calculator.appendNumber(button.innerText);

        calculator.updateDisplay();

    })
});

operationButtons.forEach(button => {

    button.addEventListener('click', () => {

        // console.log(button.innerText);

        calculator.chooseOperation(button.innerText);

        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", button => {

    calculator.compute();
    calculator.updateDisplay();

});


allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})

