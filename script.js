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
    applyStyles(calc, stylesheet1);
    return calc;
}

function createToggleStyleButton (parent) {
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
    ]));
    parent.appendChild(btn);
}

function cycleStyles (stylesheets) {
    styleToggle = !styleToggle;
    applyStyles(calc, stylesheets[+styleToggle]);
}

var styleToggle = false;
const body = document.querySelector('body');
const toggleStyleBtn = createToggleStyleButton(body);
const calc = setUpCalc();


/* APP LOGIC */


