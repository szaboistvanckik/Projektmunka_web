const colors = [
    'red', 'white', 'blue', 'pink',
    'orange', 'purple', 'yellow', 'green'
];

const combination = [];

let selected_c;
let selected_e;

function showbutton() {
    const verify = document.querySelector("button:last-of-type");
    verify.style.display = 'flex';
}

function select(element, color) {
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

function gen_colorpeg(row) {
    const f_colorpeg = row.querySelector('.colors .peg');
    f_colorpeg.style.backgroundColor = colors[0];
    row.style.display = 'flex';
    
    f_colorpeg.addEventListener('click', function() {
        select(f_colorpeg, colors[0]);
    });
}

function clone(rows, row) {
    for (let i = 1; i < 10; i++) {
        const clone = row.cloneNode(true);
        const colorpeg = clone.querySelector('.colors .peg');
        
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

function gen_color(arr) {
    arr = [];

    while (arr.length < 4) {
        const randc = colors[Math.floor(Math.random() * colors.length)];
        arr.push(randc);
    }

    console.log("combination: " + arr);
}

function gen_table() {
    const row = document.querySelector(".rows .row");
    const rows = document.querySelector(".rows");

    showbutton();
    gen_colorpeg(row);
    clone(rows, row);
    gen_color(combination);
}

function submit() {
    console.log("submit");
}

function main() {
    gen_table();
}