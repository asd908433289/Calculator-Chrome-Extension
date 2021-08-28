class Calculator{
    constructor( previousOperandDivTagId, currentOperandDivTagId ){
        this.previousOperandDivElement = document.getElementById(previousOperandDivTagId);
        this.currentOperandDivElement = document.getElementById(currentOperandDivTagId);
        this.clear();
    }

    clear(){
        this.operation = undefined;
        this.previousOperand = '';
        this.currentOperand = '';
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number ){
        if ( number === '.'  &&  this.currentOperand.toString().includes('.') ){
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number;

    }

    selectOperation( operation ){
       if( this.currentOperand === ''  && this.previousOperand === '' ){
           return;
       }
       else if(this.currentOperand === ''  && this.previousOperand !== ''){
           this.operation = operation;
       }
       else if(this.currentOperand !== ''  && this.previousOperand === ''){
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
       }
       else{
        this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
       }
       
       
      
    }

    compute(){
        if(this.operation === undefined) return;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        switch( this.operation ){
            case '+':
                this.currentOperand = previous + current;
                break;
            case '-':
                this.currentOperand = previous - current;
                break;
            case '*':
                this.currentOperand = previous * current;
                break;
            case '/':
                this.currentOperand = previous / current;
                break;
            default:
                return;
        }
        this.operation = undefined;
        this.previousOperand = '';

    }

    formatNumber( number ){
        const numberString = number.toString();
        const integerDigits = numberString.split('.')[0];
        const decimalDigits = numberString.includes('.')  ?  '.'+numberString.split('.')[1] : '';
        let result =  '';
        let count = 3;
        for(let i =integerDigits.length-1;i>=0; i-- ){
            if( count === 0 ){
                result = integerDigits.charAt(i) + ',' +result;
                count = 2;
            }
            else{
                count--;
                result = integerDigits.charAt(i)  +result;
            }
        }

        return result  + decimalDigits;
    }

    updateDisplay(){
        this.previousOperandDivElement.innerHTML =  this.operation ===undefined ?   this.formatNumber(this.previousOperand) :  this.formatNumber(this.previousOperand) + ' ' + this.operation.toString();
        this.currentOperandDivElement.innerHTML = this.formatNumber(this.currentOperand);
    }

}





document.addEventListener('DOMContentLoaded', function(){
    const numberButtons = document.getElementsByClassName("data-number");
    const operationButtons = document.getElementsByClassName('data-operation');
const equalsButton = document.getElementById("data-equals");
const allClearButton = document.getElementById("data-all-clear");
const deleteButton = document.getElementById("data-delete");

const calculator = new Calculator('data-previous-operand','data-current-operand');
for(let i=0;i<numberButtons.length;i++  ){
    numberButtons.item(i).addEventListener( 'click', () => {
        calculator.appendNumber(numberButtons.item(i).innerHTML);
        calculator.updateDisplay();
    });
}

for(let i=0; i<operationButtons.length;i++ ){
    operationButtons.item(i).addEventListener('click', () => {
        calculator.selectOperation(operationButtons.item(i).innerHTML);
        calculator.updateDisplay();
    });
}

equalsButton.addEventListener( 'click', () =>{
    calculator.compute();
    calculator.updateDisplay();
} );

allClearButton.addEventListener( 'click', () => {
    calculator.clear();
    calculator.updateDisplay();
} );

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
} );
},false);

