'use strict';
const p = (str) => console.log(str);

/* LAYOUT CONFIGURATION */

const stylesheet1 = {
    'display' : {
        'background':       'white',
        'color':            '#2f2f2f',
    },
    'number' : {
        'background':       'lightgreen',
        'border':           '.1rem solid',
        'border-radius':    '.5rem',
        'color':            'black'
    },
    'operator' : {
        'background':       'lightblue',
        'border':           '.1rem solid black',
        'border-radius':    '.5rem',
        'color':            'black'
    },
    'function' : {
        'background':       'lightsalmon',
        'border':           '.1rem solid',
        'border-radius':    '.5rem',
        'color':            'black'
    }
}

const stylesheet2 = {
    'display' : {
        'background':       'black',
        'color':            'rgb(0, 186, 248)',
    },
    'number' : {
        'background':       'black',
        'border':           '.2rem solid',
        'border-radius':    '.5rem',
        'color':            'lightgreen'
    },
    'operator' : {
        'background':       'black',
        'border':           '.2rem solid',
        'border-radius':    '.5rem',
        'color':            'lightblue'
    },
    'function' : {
        'background':       'black',
        'border':           '.2rem solid',
        'border-radius':    '.5rem',
        'color':            'lightsalmon'
    }
}

const stylesheet3 = {
    'display' : {
        'background':       'black',
        'color':            'rgb(0, 186, 248)',
        'border':           '.2rem solid white',
    },
    'number' : {
        'background':       'black',
        'border':           '.2rem solid white',
        'border-radius':    '.5rem',
        'color':            'white'
    },
    'operator' : {
        'background':       'black',
        'border':           '.2rem solid white',
        'border-radius':    '.5rem',
        'color':            'white'
    },
    'function' : {
        'background':       'black',
        'border':           '.2rem solid white',
        'border-radius':    '.5rem',
        'color':            'white'
    }/*, 
    'calculator': {
        'background :       'black',
        'border:            '.2rem solid white',
    }*/
}

function bindButtonsToGridArea (calc) {
    const btns = calc.children;
    for (const btn of btns) {
        btn.style.gridArea = btn.id;
    }
}

function applyStyles(parent, stylesheet) {
    const pickStyleBy = (className) => stylesheet[className];
    for (const elem of parent.children){
        const elemProperties = pickStyleBy(elem.className);
        for (const styleProperty in elemProperties){
            elem.style.setProperty(styleProperty, elemProperties[styleProperty]);
        }
    }
}

function setUpCalc () {
    const calc = document.querySelector('.calculator');
    bindButtonsToGridArea(calc);
    bindOperations(calc, Operations);
    bindFunctions(calc, Functions);
    bindNumbers(calc);
    applyStyles(calc, stylesheet3);
    return calc;
}

function createToggleStyleButton (parent, calc) {
    const btn = document.createElement('button')
    btn.classList.add('toggle');
    btn.style.borderRadius = '50%';
    btn.style.background = 'yellow';
    btn.style.height = '50px';
    btn.style.width = '50px';
    btn.style.position = 'absolute';
    btn.style.top = '1rem';
    btn.style.left = "1rem";
    btn.addEventListener('click', (e) => cycleStyles([
        stylesheet1,
        stylesheet2
    ], calc));
    parent.appendChild(btn);
}

function cycleStyles (stylesheets, calc) {
    styleToggle = !styleToggle;
    applyStyles(calc, stylesheets[+styleToggle]);
}

/* ---------------------- APP LOGIC ----------------------------- */
function pushInputToOutput (){
    CalculatorBuffers.output = CalculatorBuffers.input;
}

function pushOutputToInput() {
    CalculatorBuffers.input = CalculatorBuffers.output;
}

function clearInput () {
    CalculatorBuffers.input = '0';
}

function displayResult () {
    CalculatorDisplay.textContent = CalculatorBuffers.output;
}

const Operations = {
    'equal' : (buffers) => {
        /*bad coding righ here */
    },
    'add' : (buffers) => {
        buffers.output = +buffers.output + +buffers.input
        buffers.output = buffers.output.toString();
    },
    'subtract' : (buffers) => {
        buffers.output -= buffers.input;
        buffers.output = buffers.output.toString();
    },
    'multiply' : (buffers) => {
        buffers.output *= buffers.input;
        buffers.output = buffers.output.toString();
    },
    'divide' : (buffers) => {
        buffers.output = buffers.output / buffers.input
        buffers.output = buffers.output.toString();
    },
    'decimal' : (buffers) => {
        if (buffers.output.includes('.')) return ;
        buffers.output += '.';
    }
}

function setCurretOperation(op){
    CalculatorBuffers.currentOp = op;
}

function bindOperations (calc, opSet) {
    const operators = calc.querySelectorAll('.operator');
    operators.forEach( elem => {
        elem.addEventListener('click', e => {
            if (CalculatorBuffers.currentOp == '') {
                setCurretOperation(elem.id)
                pushInputToOutput();
                clearInput();
            } else {
                if (elem.id == 'equal') {
                    opSet[CalculatorBuffers.currentOp](CalculatorBuffers);
                    setCurretOperation(elem.id)
                    displayResult()
                    clearInput();
                } else {
                    if (CalculatorBuffers.currentOp == elem.id) {
                        opSet[CalculatorBuffers.currentOp](CalculatorBuffers);
                        displayResult()
                    } else {
                        setCurretOperation(elem.id)
                        clearInput();
                    }
                }
            }
            p(CalculatorBuffers);
        });
    });
}

const Functions = {
    'display-clear' : (buffers, display) => {
        buffers.input = '0';
        display.textContent = buffers.input;
        CalculatorBuffers.currentOp = '';
    },
    'switch-signs' : (buffers, display) => {
        let text = buffers.input;
        if (text.charAt(0) == '-') {
            buffers.input = text.slice(1);
        } else {
            buffers.input = '-' + text
        }
        display.textContent = buffers.input;
    },
    'backspace' : (buffers, display) => {
        buffers.input = buffers.input.slice(0, buffers.input.length - 1);
        if (buffers.input == '') buffers.input = '0';
        display.textContent = buffers.input;
    }
}

function bindFunctions (calc, opSet) {
    const functions = calc.querySelectorAll('.function');
    functions.forEach( elem => {
        elem.addEventListener('click', e => {
            opSet[elem.id](CalculatorBuffers, CalculatorDisplay);
        });
    });
}


function takeNumber(num) {
    if (CalculatorBuffers.input == '0') {
        CalculatorBuffers.input = '';
    }
    CalculatorBuffers.input +=  num;
    CalculatorDisplay.textContent = CalculatorBuffers.input;
}

function bindNumbers (calc) {
    const nums = calc.querySelectorAll('.number');
    nums.forEach(elem => {
        elem.addEventListener('click', e => {
            takeNumber(elem.textContent);
            p(CalculatorBuffers);
        })
    });
}


/* Main */
const CalculatorBuffers = {
    output : '0',
    input : '0',
    currentOp : ''
}
var styleToggle = false;
const body = document.querySelector('body');
const Calculator = setUpCalc();
const CalculatorDisplay = document.querySelector('.display');
CalculatorDisplay.textContent = CalculatorBuffers.input;
const toggleStyleBtn = createToggleStyleButton(body, Calculator);