const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const grid_size_selector = document.getElementById("grid-size-selector");
const grid_lines_checkbox = document.getElementById("grid-lines");

let grid_lines = grid_lines_checkbox.value;

context.canvas.style.width = '100%';
context.canvas.style.height = '100%';

context.canvas.width = canvas.offsetWidth;
context.canvas.height = canvas.offsetHeight;

context.lineWidth = 0.2;

let camera_x = 0;
let camera_y = 0;

let cube_size = +grid_size_selector.value;
let base_position_x = 0;
let base_position_y = 0;

let map_width = 500;
let map_height = 500;

let cubes = new Map();

function draw_cube(x, y, size, size_by_2) {
    context.lineWidth = 0.5;

    // Red rectangle
    context.beginPath();
    context.lineWidth = "1";
    context.strokeStyle = "red";
    context.fillStyle = 'rgba(255,255,255,1)';
    context.fillRect(x, y, size, size);
    context.rect(x, y, size, size);
    context.stroke();


    context.beginPath();
    context.lineWidth = "1";
    context.strokeStyle = "red";
    context.fillStyle = 'rgba(255,255,255,1)';
    context.fillRect(x+size, y, size, size);
    context.rect(x+size, y, size, size);
    context.stroke();

    context.fillRect(x, y, size, size);
    context.rect(x, y, size, size);
    context.stroke();

    context.beginPath();
    // context.moveTo(x,        y);
    // context.lineTo(x + size, y);
    // context.lineTo(x + size, y + size);
    // context.lineTo(x,        y + size);
    // context.lineTo(x,        y);

    // context.lineTo(x + size/2,   y - size/2);
    // context.lineTo(x + size*1.5, y - size/2);
    // context.lineTo(x + size*1.5, y + size/2);
    // context.lineTo(x + size,     y + size);

    // context.moveTo(x + size,    y );
    // context.lineTo(x + size*1.5,  y - size/2);

    // context.stroke();
}

function handle_key_down(event) {
    const step = 10;
    switch(event.key) {
        case "ArrowUp": {
            base_position_y += cube_size;
        } break;
        case "ArrowDown": {
            base_position_y -= cube_size;
        } break;
        case "ArrowLeft": {
            base_position_x += cube_size;
        } break;
        case "ArrowRight": {
            base_position_x -= cube_size;
        } break;
        default:
            console.log("invalid input");
            break;
    }
    console.log({base_position_x, base_position_y });

    draw_scene();
}

function handle_mouse_move(event) {
    console.log({x: event.clientX, y: event.clientY});
    let pos_x = Math.floor(event.clientX / cube_size) * cube_size;
    let pos_y = Math.floor(event.clientY / cube_size) * cube_size;
    size_by_2 = cube_size/2;
    draw_cube(pos_x, pos_y, cube_size, size_by_2);
}

function handle_mouse_click(event){
    let pos_x = (Math.floor(event.clientX / cube_size) * cube_size) + (-base_position_x);
    let pos_y = (Math.floor(event.clientY / cube_size) * cube_size) + (-base_position_y);
    console.log({pos_x, pos_y});
    size_by_2 = cube_size/2;
    cubes.set("" + pos_x + "-" + pos_y, [pos_x, pos_y]);
    draw_cube(base_position_x + pos_x,base_position_y + pos_y, cube_size, size_by_2);
}

function draw_grid() {
    if (!grid_lines) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 0.1;
    for(let i = 0; i < canvas.offsetWidth; i += cube_size) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.offsetHeight);
        context.stroke();

    }

    for(let i = 0; i < canvas.offsetHeight; i += cube_size) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.offsetWidth, i);
        context.stroke();
    }
}

document.addEventListener("keydown", handle_key_down);
// document.addEventListener("mousemove", handle_mouse_move);
document.addEventListener("click", handle_mouse_click);

function draw_scene() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw_grid();
    for (value of cubes.values()) {
        draw_cube(base_position_x + value[0], base_position_y + value[1], cube_size, cube_size/2);
    }
}

draw_grid();

grid_size_selector.addEventListener("change", (event) => {
    cube_size = +event.target.value;
    draw_grid();
})

grid_lines_checkbox.addEventListener("change", (event) => {
    grid_lines = event.target.checked;
    draw_scene();
})

// draw_scene();
