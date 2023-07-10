const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.canvas.style.width = '100%';
context.canvas.style.height = '100%';

context.canvas.width = canvas.offsetWidth;
context.canvas.height = canvas.offsetHeight;

context.lineWidth = 0.2;

let camera_x = 0;
let camera_y = 0;

let cube_size = 40;
let base_position_x = 10;
let base_position_y = 10;

let map_width = 500;
let map_height = 500;

function draw_cube(x, y, size, size_by_2) {
    context.beginPath();

    context.moveTo(x - size_by_2, y - size_by_2);
    context.lineTo(x + size_by_2, y - size_by_2);
    context.lineTo(x + size_by_2, y + size_by_2);
    context.lineTo(x - size_by_2, y + size_by_2);
    context.lineTo(x - size_by_2, y - size_by_2);

    context.lineTo(x                    , y - (size/1.5));
    context.lineTo(x + size             , y - (size/1.5));
    context.lineTo(x + size - size_by_2 , y - size_by_2);

    context.moveTo(x + size             , y - (size/1.5));
    context.lineTo(x + size             , y + (size/3));
    context.lineTo(x + size_by_2        , y + size_by_2);

    context.stroke();
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

    // draw_scene();
}

function handle_mouse_move(event) {
    let pos_x = Math.floor(event.clientX / cube_size) * cube_size;
    let pos_y = Math.floor(event.clientY / cube_size) * cube_size;
    size_by_2 = cube_size/2;
    draw_cube(pos_x, pos_y, cube_size, size_by_2);
}

function handle_mouse_click(event){
    let pos_x = Math.floor(event.clientX / cube_size) * cube_size;
    let pos_y = Math.floor(event.clientY / cube_size) * cube_size;
    size_by_2 = cube_size/2;
    draw_cube(pos_x, pos_y, cube_size, size_by_2);
}

// This function draws the grid on the base Z0 axe
function draw_grid() {
    context.lineWidth = 0.1;
    for(let i = 0; i < canvas.offsetWidth; i += cube_size) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.offsetHeight);
        context.stroke();
    }
}

document.addEventListener("keydown", handle_key_down);
document.addEventListener("mousemove", handle_mouse_move);
document.addEventListener("click", handle_mouse_click);

function draw_scene() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    size_by_2 = cube_size/2;

    for(let i = base_position_x; i <= base_position_x + map_width; i += cube_size) {
        for(let j = base_position_y; j <= base_position_y + map_height; j += cube_size) {
            draw_cube(i + cube_size, j + cube_size, cube_size, size_by_2);
        }
    }
}

draw_grid();

// draw_scene();
