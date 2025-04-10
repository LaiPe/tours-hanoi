const colors = [
    "#1a75ff", // bleu vif
    "#ff6b6b", // rouge corail
    "#50c878", // vert émeraude
    "#9370db", // violet moyen
    "#ff8c00", // orange foncé
    "#20b2aa", // turquoise clair
    "#ff1493", // rose profond
    "#ffd700", // or
    "#8a2be2", // bleu violet
    "#00ced1"  // turquoise moyen
];

const tours = document.querySelectorAll(".tour");
const nb_plates_input = document.querySelector("#nb-plates");
const idle_speed_input = document.querySelector("#idle-speed");
const launch_idle_button = document.querySelector("#launch-idle");

const stop_restart_idle_button = document.querySelector("#stop-restart-idle");
const stop_icon = stop_restart_idle_button.querySelector("#stop-icon");
const restart_icon = stop_restart_idle_button.querySelector("#restart-icon");

let nb_plates;
let is_running;

function init() {
    // Update variables
    nb_plates = nb_plates_input.value;

    // Update buttons
    if (nb_plates != 0) {
        idle_speed_input.disabled = false;
        launch_idle_button.disabled = false;
        stop_restart_idle_button.disabled = true;
    } 
    else {
        idle_speed_input.disabled = true;
        launch_idle_button.disabled = true;
        stop_restart_idle_button.disabled = true;
    }

    // Update DOM
    tours.forEach(tour => {
        tour.querySelectorAll(".plate").forEach(plate => plate.remove());
    });
    for (let i = 1; i <= nb_plates; i++){
        tours[0].appendChild(createPlateDOM(i));
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function hanoi(n, from, to, pivot) {
    if (!is_running) return;
    
    if (n == 1) {
        await movePlate(from, to);
    } else {
        await hanoi(n-1, from, pivot, to);
        if (!is_running) return;
        
        await movePlate(from, to);
        if (!is_running) return;
        
        await hanoi(n-1, pivot, to, from);
    }
}

function updatePlateWidth(plate){
    let num = parseInt(plate.getAttribute("num"));
    let w = 20 + (60 / nb_plates) * (num - 1);
    plate.style.width = w + "%";
}

function createPlateDOM(num){
    const plate = document.createElement("div");
    plate.classList.add("plate");
    plate.setAttribute("num", num);
    plate.style.backgroundColor = colors[(num - 1) % colors.length];
    updatePlateWidth(plate);
    return plate;
}

async function movePlate(from, to){
    const plate = tours[from].querySelector(".plate:first-child");
    plate.remove();
    await sleep(200 / idle_speed_input.value);
    tours[to].prepend(plate);
    await sleep(500 / idle_speed_input.value);
}



nb_plates_input.addEventListener("change", init);


launch_idle_button.addEventListener("click", async function(){
    launch_idle_button.disabled = true;
    stop_restart_idle_button.disabled = false;

    is_running = true;
    await hanoi(nb_plates,0,2,1);

    if (is_running){ // If normal run , not stoped by user input
        stop_icon.classList.add("hidden"); // hide stop icon
        restart_icon.classList.remove("hidden"); // show restart icon
    }

    is_running = false;

});

stop_restart_idle_button.addEventListener("click", () => {
    stop_restart_idle_button.disabled = true;

    if (!is_running){ // If "restart button"
        restart_icon.classList.add("hidden"); // hide restart icon
        stop_icon.classList.remove("hidden"); // show stop icon
    }

    is_running = false;
    init();
}); 
