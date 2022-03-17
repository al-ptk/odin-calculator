'use strict';
const p = (str) => console.log(str);

function bindButtonsToArea (calc) {
    const btns = calc.children;
    for (const btn of btns) {
        btn.style.gridArea = btn.id;
        p(btn.style.gridArea);
    }
}

const calc = document.querySelector('.calculator');
bindButtonsToArea(calc);