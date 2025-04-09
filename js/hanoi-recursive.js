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


function initPile(h) {
    let pile = [];
    for (let i = h ; i > 0 ; i--) {
        pile.push(i);
    }
    return pile;
}

function hanoi(n,from,to,pivot){
    if (n == 1) {
        piles[to].push(piles[from].pop());
        printPiles();
    } else {
        hanoi(n-1,from,pivot,to);

        piles[to].push(piles[from].pop());
        printPiles();

        hanoi(n-1,pivot,to,from);
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

const tours = document.querySelectorAll(".tour");
const nb_plates_input = document.querySelector("#nb-plates");
const initialize_button = document.querySelector("#initialize");
const idle_speed_input = document.querySelector("#idle-speed");
const launch_idle_button = document.querySelector("#launch-idle");
const pause_idle_button = document.querySelector("#pause-idle");
const step_back_button = document.querySelector("#step-back");
const step_forward_button = document.querySelector("#step-forward");

let tours_listes;
let nb_plates;

nb_plates_input.addEventListener("change", () => {
    if (nb_plates_input.value != 0) {
        initialize_button.disabled = false;
    } else {
        initialize_button.disabled = true;
    }
});

initialize_button.addEventListener("click", () => {
    // Update variables
    nb_plates = nb_plates_input.value;
    tours_listes = [initPile(nb_plates),[],[]];

    // Update buttons
    idle_speed_input.disabled = false;
    launch_idle_button.disabled = false;
    pause_idle_button.disabled = false;
    step_back_button.disabled = false;
    step_forward_button.disabled = false;

    // Update DOM
    tours.forEach(tour => {
        tour.querySelectorAll(".plate").forEach(plate => plate.remove());
    });
    for (let i = 1; i <= nb_plates; i++){
        tours[0].appendChild(createPlateDOM(i));
    }
});


launch_idle_button.addEventListener("click", () => {
    step_back_button.disabled = true;
    step_forward_button.disabled = true;
});

pause_idle_button.addEventListener("click", () => {
    step_back_button.disabled = false;
    step_forward_button.disabled = false;
});
