function gen_table() {
    const row = document.querySelector(".rows .row");
    const rows = document.querySelector(".rows");

    for (let i = 0; i < 9; i++) {
        const clone = row.cloneNode(true);
        rows.appendChild(clone);
    }
}

function main() {
    gen_table();
}