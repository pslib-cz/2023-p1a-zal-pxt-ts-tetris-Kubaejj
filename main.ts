led.setBrightness(105)
let start: Array<Array<number>> = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];



let lines: number = 0;
let speed: number = 300;


let startingPosX: number = 2;

let startingPosY: number = 0;

let currentX: number = startingPosX;
let currentY: number = startingPosY;

let lock: boolean = false;



function render(a: number[][]): void {
    for (let y: number = 0; y < start.length; y += 1) {
        for (let x: number = 0; x < start[y].length; x += 1) {
            if (start[y][x] === 0) {
                led.unplot(x, y);
            } else {
                led.plot(x, y);
            }
        }
    }
}

function checklines(): boolean {
    let sum: number = 0;
    for (let i: number = 0; i < start[start.length - 1].length; i += 1) {
        sum += start[start.length - 1][i];
    };

    if (sum === 5) {
        return true;
    };
    return false;
}

function move(dir: number) {
    if (currentY > 0 && currentY < start.length) {
        start[currentY - 1][currentX] = 0;

        if (dir === 0 && currentX !== 0 && start[currentY][currentX - 1] === 0) {
            currentX -= 1;
        } else if (dir === 1
            &&
            currentX !== start[0].length - 1
            &&
            start[currentY][currentX + 1] === 0) {
            currentX += 1;
        };

        start[currentY - 1][currentX] = 1;
        render(start);
    }
}




basic.forever(function () {

    if (currentY < start.length) {
        start[currentY][currentX] = 1;

        if (currentY !== 0) {
            start[currentY - 1][currentX] = 0;

        };

        render(start);

        if (currentY !== start.length - 1) {
            if (start[currentY + 1][currentX] === 1) {
                currentY = start.length - 1;

            };
        };

        currentY += 1;

    } else {
        currentX = startingPosX;
        currentY = startingPosY;

        if (start[startingPosY][startingPosX] === 1) {
           
            basic.showIcon(IconNames.No)
            basic.pause(2000)


           
          


        };

        if (checklines()) {
            speed -= 20; //zryhcleni


            lines += 1 //pocet oddstr. rad
            basic.showNumber(lines)
            start.pop();
            start.unshift([0, 0, 0, 0, 0]);

        };
    };
    if (lines > 9) {
        basic.pause(200)
        basic.showString("U WON")
        basic.showNumber(speed)
    }



    basic.pause(speed);
}
)

//chybel jsem pri zadavani o hodine

input.onButtonPressed(Button.A, function () {
    move(0); // na a se to posouva doleva
})

input.onButtonPressed(Button.B, function () {
    move(1); //na b do prava
})

input.onButtonPressed(Button.AB, function () {


    basic.showNumber(lines)
    basic.pause(8000)
})
//
