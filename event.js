const colors = [
    'red', 'white', 'blue', 'pink',
    'orange', 'purple', 'yellow', 'green'
];

let selected_c;
let selected_e;

function gen_table() {
    const row = document.querySelector(".rows .row");
    const rows = document.querySelector(".rows");
    const verify = document.querySelector("button:last-of-type");
    verify.style.display = 'flex';
    
    const f_colorpeg = row.querySelector('.colors .peg');
    f_colorpeg.style.backgroundColor = colors[0];
    row.style.display = 'flex';

    f_colorpeg.addEventListener('click', function() {
        select(f_colorpeg, colors[0]);
    });

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

function main() {
    gen_table();
}