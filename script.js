const field = document.querySelector(".field");
const roadFiled = document.querySelector(".road");
const sizeField = 3;
//["top", "bottom", "top", "bottom", "top", "bottom", "top", "bottom",]
//['top', 'right'.....] //8 элементов
const objArrow = {
    "top": "./arrow-img/up-arrow.svg",
    "rigth": "./arrow-img/right-arrow.svg",
    "bottom": "./arrow-img/down-arrow.svg",
    "left": "./arrow-img/left-arrow.svg",
}
//Функция генерации случайного числа от 0 включительно до value не включитель
function randomNumber(value){
    return Math.floor(Math.random() * value);
}
//Функция отрисовки всего поля с квадратами
function drawSquare(n = sizeField){
    for(let y = 0; y < n; y++){
        for(let x = 0; x < n; x++){
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.x = x;
            square.dataset.y = y;
            field.append(square);
        }
    }
}
drawSquare(3);
//Функция для генерации стрелок
function test(road){
    for(let i = 0; i < road.length; i++){
        (function(param){
            setTimeout(()=>{
                let img = new Image();
                img.src = objArrow[road[i]];
                img.classList.add("img");
                roadFiled.append(img);
            }, param * 1000 + 1000);
        })(i);
    }
}
//Функция для генерации дороги
function generateRoad(x, y){
    let road = [];
    for(let i = 0; i < 8; i++){
        if(x === 0 && y === 0){
            const directions = ["rigth", "bottom"]; //левый верхний угол
            const q = randomNumber(directions.length); //случайно сгенерировали направление движения
            if(directions[q] === directions[0]){
                x++
            }
            if(directions[q] === directions[1]){
                y++
            }
            road.push(directions[q]);
            continue;
        }
        if(x === sizeField - 1 && y === 0){
            const directions = ["left", "bottom"]; //правый верхний угол
            const q = randomNumber(directions.length); //случайно сгенерировали направление движения
            if(directions[q] === directions[0]){
                x--;
            }
            if(directions[q] === directions[1]){
                y++
            }
            road.push(directions[q]);
            continue;
        }
        if(x === sizeField - 1 && y === sizeField - 1){
            const directions = ["left", "top"]; //правый нижний угол
            const q = randomNumber(directions.length); //случайно сгенерировали направление движения
            if(directions[q] === directions[0]){
                x--;
            }
            if(directions[q] === directions[1]){
                y--;
            }
            road.push(directions[q]);
            continue;
        }
        if(x === 0 && y === sizeField - 1){
            const directions = ["rigth", "top"]; //левый нижний угол
            const q = randomNumber(directions.length); //случайно сгенерировали направление движения
            if(directions[q] === directions[0]){
                x++;
            }
            if(directions[q] === directions[1]){
                y--;
            }
            road.push(directions[q]);
            continue;
        }
        if(x > 0 && x < sizeField && y === 0){
            const directions = ["left", "rigth", "bottom"]; //Верхняя грань
            const q = randomNumber(directions.length);
            if(directions[q] === directions[0]){
                x--;
            }
            if(directions[q] === directions[1]){
                x++;
            }
            if(directions[q] === directions[2]){
                y++;
            }
            road.push(directions[q]);
            continue;
        }
        if(x === sizeField - 1 && y > 0 && y < sizeField){
            const directions = ["left", "top", "bottom"]; //Правая грань грань
            const q = randomNumber(directions.length);
            if(directions[q] === directions[0]){
                x--;
            }
            if(directions[q] === directions[1]){
                y--;
            }
            if(directions[q] === directions[2]){
                y++;
            }
            road.push(directions[q]);
            continue;
        }
        if(x > 0 && x < sizeField && y === sizeField - 1){
            const directions = ["left", "rigth", "top"]; //Нижняя грань
            const q = randomNumber(directions.length);
            if(directions[q] === directions[0]){
                x--;
            }
            if(directions[q] === directions[1]){
                x++;
            }
            if(directions[q] === directions[2]){
                y--;
            }
            road.push(directions[q]);
            continue;
        }
        if(x === 0 && y > 0 &&  y < sizeField){
            const directions = ["rigth", "top", "bottom"]; //Левая грань
            const q = randomNumber(directions.length);
            if(directions[q] === directions[0]){
                x++;
            }
            if(directions[q] === directions[1]){
                y--;
            }
            if(directions[q] === directions[2]){
                y++;
            }
            road.push(directions[q]);
            continue;
        }
        else{
            const directions = ["left", "rigth", "top", "bottom"]; //По центру поля
            const q = randomNumber(directions.length);
            if(directions[q] === directions[0]){
                x--;
            }
            if(directions[q] === directions[1]){
                x++;
            }
            if(directions[q] === directions[2]){
                y--;
            }
            if(directions[q] === directions[3]){
                y++;
            }
            road.push(directions[q]);
            continue;
        }
    }
    console.log(road);
    test(road);
    field.addEventListener("click", function(event){
        if(event.target.classList.contains("square")){
            if(+event.target.dataset.x === x && +event.target.dataset.y === y){
                event.target.style.background = "green";
            }
            else{
                event.target.style.background = "red";
            }
            setTimeout(()=>{
                location.reload();
            }, 1500)
        }
    });
}

//Функция отрисовки линии старт
function drawStartLine(){
    const xRandomCoordinate = randomNumber(sizeField);
    const yRandomCoordinate = randomNumber(sizeField);
    let fieldChildes = [...field.children];
    for(let i = 0; i < fieldChildes.length; i++){
        let xSquare = +fieldChildes[i].dataset.x;
        let ySquare = +fieldChildes[i].dataset.y;
        if(xRandomCoordinate === xSquare && yRandomCoordinate === ySquare){
            fieldChildes[i].classList.add("startLine");
        }
    }
    generateRoad(xRandomCoordinate, yRandomCoordinate);
}
drawStartLine();
