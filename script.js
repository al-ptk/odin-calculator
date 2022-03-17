'use strict';
const p = (str) => console.log(str);

function bindButtonsToArea (calc) {
    const btns = calc.children;
    for (const btn of btns) {
        btn.style.gridArea = btn.id;
    }
}

const stylesheet = {
    'number' : {
        'background':       'lightgreen',
        'border':           '.1rem solid',
        'border-radius':    '.5rem',
        'color':            'black'
    },
    'operator' : {
        'background':       'lightblue',
        'border':           '.1rem solid',
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

function applyStyles(calc) {
    const pickStyleBy = (className) => stylesheet[className];
    const btns = calc.querySelectorAll('button');
    for (const btn of btns){
        const btnProperties = pickStyleBy(btn.className);
        for (const styleProperty in btnProperties){
            btn.style.setProperty(btnProperties, btnProperties[styleProperty]);
        }
    }
}

const calc = document.querySelector('.calculator');
bindButtonsToArea(calc);
configureButtonStyles(calc);