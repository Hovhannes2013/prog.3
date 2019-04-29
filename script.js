var side = 30;
var xotArr = []; //խոտերի զանգված
var eatArr = []; //խոտակերների զանգված
var gishArr = []; //gishatich
var supArr = [];   //hzor
var fireArr = [];   //fire


// var matrix = [
//     [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
//     [0, 1, 1, 0, 0, 2, 3, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
//     [0, 1, 0, 0, 0, 3, 0, 0, 1, 0, 1, 3, 1, 1, 3, 1, 1],
//     [0, 2, 3, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 2, 1],
//     [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 2, 1],
//     [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 4, 1, 1, 1, 1, 2],
//     [0, 0, 0, 0, 0, 1, 3, 0, 1, 0, 0, 3, 1, 1, 2, 2, 1],
//     [0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 3, 1, 1, 1, 1, 3, 1],
//     [0, 0, 0, 2, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
//     [0, 0, 0, 3, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
//     [2, 0, 0, 0, 2, 1, 0, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1],
//     [2, 0, 0, 0, 0, 2, 0, 1, 1, 2, 2, 1, 2, 3, 1, 1, 1],
//     [1, 1, 1, 1, 0, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 5],
// ]

function genetareMatrix(lengthY, lengthX, number) {

    let matrix = [];
    
    function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
    }
    
    for (let y = 0; y < lengthY; y++) {
    matrix.push([]);
    for (let x = 0; x < lengthX; x++) {
    let randomCount = getRandomInt(number);
    matrix[y].push(randomCount);
    }
    }
    return matrix;
    
    }
    
    let matrix = genetareMatrix(30,30,5);


function setup() {
    
    frameRate(50);
    createCanvas(matrix[0].length * side, matrix.length * side); //կտավի չափերը դնել մատրիցայի չափերին համապատասխան
    background('#acacac');

    //Կրկնակի ցիկլը լցնում է օբյեկտներով խոտերի և խոտակերների զանգվածները
    //հիմնվելով մատրիցի վրա 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var Gishatich = new gishatich(x, y);
                gishArr.push(Gishatich);
            }
            else if (matrix[y][x] == 4) {
                var sup = new hzor(x, y);
                supArr.push(sup);
            }

        }
    }
}

//draw ֆունկցիան գծում է «կադրերը», վարկյանում 60 կադր արագությամբ
//եթե տրված չէ այլ կարգավորում frameRate ֆունկցիայի միջոցով
//draw ֆունկցիան ինչ որ իմաստով անվերջ կրկնություն է (цикл, loop)
function draw() {
    console.log(matrix)
    //Գծում է աշխարհը, հիմվելով matrix-ի վրա
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("yellow");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 3) {
                fill('red');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill('purple');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill('orange');
                rect(j * side, i * side, side, side);
            }
        }
    }


    // խոտ փորձում է բազմանալ
    for (var i in xotArr) {
        xotArr[i].mul();
    }

    // խոտակեր փորձում է ուտել խոտ
    for (var i in eatArr) {
        eatArr[i].eat();
    }
    //գիշատիչը ուտում է խոտակերին
    for (var i in gishArr) {
        gishArr[i].eat();
    }
    //ուտում է բոլորին անխտիր
    for (var i in supArr) {
        supArr[i].teleport();
    }
}