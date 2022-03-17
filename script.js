'use strict';
const p = (str) => console.log(str);

function bindButtonsToArea (calc) {
    const btns = calc.children;
    for (const btn of btns) {
        btn.style.gridArea = btn.id;
    }
}

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

function applyStyles(parent, stylesheet) {
    const pickStyleBy = (className) => stylesheet[className];
    for (const elem of parent.children){
        const elemProperties = pickStyleBy(elem.className);
        for (const styleProperty in elemProperties){
            elem.style.setProperty(styleProperty, elemProperties[styleProperty]);
        }
    }
}

const calc = document.querySelector('.calculator');
bindButtonsToArea(calc);
applyStyles(calc, stylesheet1);