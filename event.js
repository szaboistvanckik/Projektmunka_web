const colors = [
    'red', 'white', 'blue', 'pink',
    'orange', 'purple', 'yellow', 'green'
];

function gen_table() {
    

    const row = document.querySelector(".rows .row");
    const rows = document.querySelector(".rows");
    
    const f_colorpeg = row.querySelector('.colors .peg');
    f_colorpeg.style.backgroundColor = colors[0];
    row.style.display = 'flex';

    for (let i = 1; i < 10; i++) {
        const clone = row.cloneNode(true);
        const colorpeg = clone.querySelector('.colors .peg');
        
        if (i - 1 < colors.length - 1) {
            colorpeg.style.backgroundColor = colors[i];
        } else {
            colorpeg.remove();
        }
        
        rows.appendChild(clone);
    }
}

function main() {
    gen_table();
}