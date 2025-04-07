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

const tours = document.querySelectorAll(".tour");
const nb_plates_input = document.querySelector("#nb-plates");
const initialize_button = document.querySelector("#initialize");
const idle_speed_input = document.querySelector("#idle-speed");
const launch_idle_button = document.querySelector("#launch-idle");
const pause_idle_button = document.querySelector("#pause-idle");
const step_back_button = document.querySelector("#step-back");
const step_forward_button = document.querySelector("#step-forward");

let tours_listes;

nb_plates_input.addEventListener("change", () => {
    if (nb_plates_input.value != 0) {
        initialize_button.disabled = false;
    } else {
        initialize_button.disabled = true;
    }
});

initialize_button.addEventListener("click", () => {
    let h = nb_plates_input.value;
    tours_listes = [initPile(h),[],[]];

    idle_speed_input.disabled = false;
    launch_idle_button.disabled = false;
    pause_idle_button.disabled = false;
    step_back_button.disabled = false;
    step_forward_button.disabled = false;
});


launch_idle_button.addEventListener("click", () => {
    step_back_button.disabled = true;
    step_forward_button.disabled = true;
});

pause_idle_button.addEventListener("click", () => {
    step_back_button.disabled = false;
    step_forward_button.disabled = false;
});