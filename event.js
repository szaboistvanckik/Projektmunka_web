const colors = [
    'red', 'white', 'blue', 'pink',
    'orange', 'purple', 'yellow', 'green'
];

const combination = [];

let selected_c;
let selected_e;
let currentrow = 0;
let gameover = false;
let gamestarted = false;

function main() {
    if (gamestarted) {
        reset();
    }

    gen_table();
    const btn = document.querySelector("button:first-of-type");
    btn.innerHTML = "Reset";

    gamestarted = true;
}

function gen_table() {
    const row = document.querySelector(".rows .row");
    const rows = document.querySelector(".rows");

    showbutton();
    gen_colorpeg(row);
    clone(rows, row);
    gen_color(combination);
}

function reset() {
    const rows = document.querySelector(".rows");

    gameover = false;
    currentrow = 0;
    selected_c = null;
    selected_e = null;

    const trow = document.querySelector('.top-row');
    const tpeg = trow.querySelectorAll('.guess');
    for (let peg of tpeg) {
        peg.style.backgroundColor = '';
        peg.textContent = '?';
    }

    while (rows.firstChild) {
        rows.removeChild(rows.firstChild);
    }

    const newrow = document.createElement('div');
    newrow.classList.add('row');
    
    newrow.innerHTML = `
        <div class="guesses">
            <div class="peg"></div>
            <div class="peg"></div>
            <div class="peg"></div>
            <div class="peg"></div>
        </div>
        <div class="feedback">
            <div class="peg small"></div>
            <div class="peg small"></div>
            <div class="peg small"></div>
            <div class="peg small"></div>
        </div>
        <div class="colors">
            <div class="peg"></div>
        </div>
    `;

    rows.appendChild(newrow);
}

function submit() {
    if (gameover) return;

    const rows = document.querySelectorAll('.rows .row');
    const cur = rows[currentrow];
    const guesspegs = cur.querySelectorAll('.guesses .peg');
    
    let allcolored = true;
    for (let i = 0; i < guesspegs.length && allcolored; i++) {
        if (!guesspegs[i].style.backgroundColor) {
            allcolored = false;
        }
    }

    if (allcolored) {
        check(cur);
        if (++currentrow == 10 && !gameover) {
            alert("Vesztettél!");
            gameover = true;
        }
        console.log("moving to:", currentrow);
    } else {
        alert("Rakj le 4 színt az ellenőrzéshez!");
    }
}

function check(cur) {
    const guesspegs = cur.querySelectorAll('.guesses .peg');
    const feedbackpegs = cur.querySelectorAll('.feedback .peg');
    
    const guess = [];
    for (let peg of guesspegs) {
        guess.push(peg.style.backgroundColor);
    }

    const used_guess = [false, false, false, false];
    const used_combo = [false, false, false, false];

    let blacks = 0;
    let whites = 0;
    let isfound = false;

    for (let i = 0; i < 4; i++) {
        if (guess[i] == combination[i]) {
            blacks++;
            used_guess[i] = true;
            used_combo[i] = true;
        }
    }

    for (let i = 0; i < 4; i++) {
        if (!used_guess[i]) {
            isfound = false;

            for (let j = 0; j < 4 && !isfound; j++) {
                if (!used_combo[j] && guess[i] == combination[j]) {
                    whites++;

                    used_guess[i] = true;
                    used_combo[j] = true;

                    isfound = true;
                }
            }
        }
    }

    let ind = 0;
    for (let i = 0; i < blacks; i++) {
        feedbackpegs[ind++].style.backgroundColor = 'black';
    }
    for (let i = 0; i < whites; i++) {
        feedbackpegs[ind++].style.backgroundColor = 'white';
    }

    if (blacks == 4) {
        win();
    }
}

function win() {
    const trow = document.querySelector('.top-row');
    const tpeg = trow.querySelectorAll('.guess');

    for (let i = 0; i < 4; i++) {
        tpeg[i].style.backgroundColor = combination[i];
        tpeg[i].innerHTML = "";
    }

    alert("Gratulálok, nyertél!");
    gameover = true;
}

function gen_color(arr) {
    arr.length = 0;

    while (arr.length < 4) {
        const randc = colors[Math.floor(Math.random() * colors.length)];
        arr.push(randc);
    }

    console.log("combination: " + arr);
}

function clone(rows, row) {
    for (let i = 1; i < 10; i++) {
        const clone = row.cloneNode(true);
        const colorpeg = clone.querySelector('.colors .peg');
        const guesspegs = clone.querySelectorAll('.guesses .peg');

        for (let i = 0; i < guesspegs.length; i++) {
            guesspegs[i].addEventListener('click', function() {
                place(guesspegs[i]);
            });
        }

        if (i - 1 < colors.length - 1) {
            colorpeg.style.backgroundColor = colors[i];
            colorpeg.addEventListener('click', function() {
                select(colorpeg, colors[i]);
            });
        } else {
            colorpeg.remove();
        }

        rows.appendChild(clone);
    }
}

function gen_colorpeg(row) {
    const f_colorpeg = row.querySelector('.colors .peg');
    f_colorpeg.style.backgroundColor = colors[0];
    row.style.display = 'flex';

    f_colorpeg.addEventListener('click', function() {
        select(f_colorpeg, colors[0]);
    });

    const guesspegs = row.querySelectorAll('.guesses .peg');
    for (let i = 0; i < guesspegs.length; i++) {
        guesspegs[i].addEventListener('click', function() {
            place(guesspegs[i]);
        });
    }
}

function place(cur) {
    if (gameover) return;

    const row = cur.closest('.row');
    const rows = document.querySelectorAll('.rows .row');

    if ([...rows].indexOf(row) == currentrow) {
        cur.style.backgroundColor == selected_c
        ? cur.style.backgroundColor = "#5c3c1f"
        : cur.style.backgroundColor = selected_c;
    }
}

function select(element, color) {
    if (gameover) return;

    if (selected_e == element) {
        element.classList.remove('selected');
        selected_e = null;
        selected_c = null;
    } else {
        if (selected_e) {
            selected_e.classList.remove('selected');
        }

        element.classList.add('selected');
        selected_e = element;
        selected_c = color;
    }
    
    console.log(selected_c);
}

function showbutton() {
    const verify = document.querySelector("button:last-of-type");
    verify.style.display = 'flex';
}