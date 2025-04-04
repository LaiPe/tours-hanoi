function initPile(h) {
    let pile = [];
    for (let i = h ; i > 0 ; i--) {
        pile.push(i);
    }
    return pile;
}

/*function printPiles(){
    for (let i = 0 ; i < piles.length ; i++) {
        console.log(piles[i]);
    }
    console.log("");
}*/
function printPiles(){
    for (let i = h - 1 ; i >= 0 ; i--) {
        for (let j = 0 ; j < piles.length ; j++){
            if (piles[j][i] == undefined){
                process.stdout.write("|");
            } else {
                process.stdout.write(piles[j][i].toString());
            }
            process.stdout.write("\t");
        }
        process.stdout.write("\n");
    }
    process.stdout.write("\n");
    process.stdout

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

const h = 12;
const piles = [initPile(h),[],[]];

printPiles();
hanoi(h,0,2,1);


