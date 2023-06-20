let input = document.querySelector("#exp");
let error = document.querySelector("#error");
let answer = document.querySelector('#answer')
let lastExp = document.querySelector('#lastExp')
let mytable = document.querySelector('#mytable')
let list = document.querySelector('#optionsList')
let listContainer = document.querySelector('#listContainer')
let tableContainer = document.querySelector('#tableContainer')
let MoreOptions = document.querySelector('#MoreOptions')
let Graph = document.querySelector('.Graph')
let canvas = document.querySelector('#myCanvos')
let Original = document.querySelector('.ToOriginal')
let XRow = document.querySelector('.XRow')


function showOptions() {
    if (listContainer.style.display == 'block') {
        anime({
            targets: list,
            opacity: [
                1, 0
            ],
            duration: 500,
            easing: 'easeInCubic'
        })
        setTimeout(() => {
            listContainer.style.display = 'none';
        }, 800);
        MoreOptions.title = 'другие действия'
    } else {
        listContainer.style.display = 'block';
        anime({
            targets: list,
            opacity: [
                0, 1
            ],
            duration: 500,
            easing: 'easeInCubic'
        })
        // setTimeout(() => {
        //     listContainer.style.display = 'block';
        // }, 300);
        MoreOptions.title = 'скрыть дополнительные действия'
    }
}
// function showOptions(){
//     if(tableContainer.style.display == 'none'){
//         list.classList.remove('fade-inlist')
//         list.classList.add('fade-outlist');
//         setTimeout(() => {
//             listContainer.style.display = 'none';
//             tableContainer.style.display = 'block';
//             mytable.classList.add('fade-intable');
//         }, 300);
//         MoreOptions.title = 'другие действия'
//     } else {
//         mytable.classList.remove('fade-intable')
//         mytable.classList.add('fade-outtable');
//         setTimeout(() => {
//             tableContainer.style.display = 'none';
//             listContainer.style.display = 'block';
//             list.classList.add('fade-inlist');
//         }, 300);
//         MoreOptions.title = 'обычный калькулятор'
//     }
// }


document.addEventListener('dblclick', function (e) {
    e.preventDefault()
    return
})

function PressNumber(a, event) {
    let arr = input.value.split("");
    if (input.value.length > 29) {
        error.innerHTML = "слишком большое число";
        return;
    }
    if (arr[arr.length - 1] == 'x') {
        error.innerHTML = 'неверный порядок выражения'
        return
    }
    input.value += "" + a;
    error.innerHTML = ''
    answer.value = ""
    defaultCalculating()
    if (input.value == answer.value) {
        answer.value = ''
    }
}

function printX() {
    let arr = input.value.split("");
    if (arr[arr.length - 1] == '.' || arr[arr.length - 1] == 'x') {
        error.innerHTML = 'неверный порядок выражения'
        return
    }
    if (arr[arr.length - 1] == ')') {
        error.innerHTML = ''
        input.value += '×x'
    }
    error.innerHTML = ''
    input.value += 'x'
}

function clearAll() {
    if (input.value.startsWith('y=')) {
        input.value = 'y='
        clearCanvas()
        return
    }
    input.value = "";
    error.innerHTML = "";
    answer.value = ""
    lastExp.value = ""
}


// действия
function plusNumber() {
    let arr = input.value.split("");
    if (!/[0-9)]?$/.test(arr[arr.length - 1])) {
        error.innerHTML = 'знак невозможно использовать не к числу'
        return
    }
    if (arr.length == 0) {
        error.innerHTML = 'выражение не может начинаться со знака действия'
        return
    }
    if (arr[arr.length - 1] == '-' || arr[arr.length - 1] == '×' || arr[arr.length - 1] == ':') {
        error.innerHTML = 'не правельный порядок действий'
        return
    }
    if (arr.length > 29) {
        error.innerHTML = 'слишком большое выражение'
        return
    }
    if (arr[arr.length - 1] == "+") {
        error.innerHTML = "знак повторяться не может";
        return;
    }
    error.innerHTML = ''
    input.value += "+";
    answer.value = ""
}
function minusNumber() {
    let arr = input.value.split("");
    if (!/[0-9)]?$/.test(arr[arr.length - 1])) {
        error.innerHTML = 'знак невозможно использовать не к числу'
        return
    }
    if (arr[arr.length - 1] == '+' || arr[arr.length - 1] == '×' || arr[arr.length - 1] == ':') {
        error.innerHTML = 'не правельный порядок действий'
        return
    }
    if (arr.length > 29) {
        error.innerHTML = 'слишком большое выражение'
        return
    }
    if (arr[arr.length - 1] == '-') {
        error.innerHTML = 'знак повторяться не может'
        return
    }

    error.innerHTML = ''
    input.value += '-'
    answer.value = ""
}
function divideNumber() {
    let arr = input.value.split("");
    if (!/[0-9)]?$/.test(arr[arr.length - 1])) {
        error.innerHTML = 'знак невозможно использовать не к числу'
        return
    }
    if (arr.length == 0) {
        error.innerHTML = 'выражение не может начинаться со знака действия'
        return
    }
    if (arr[arr.length - 1] == '-' || arr[arr.length - 1] == '×' || arr[arr.length - 1] == '+') {
        error.innerHTML = 'не правельный порядок действий'
        return
    }
    if (arr.length > 29) {
        error.innerHTML = 'слишком большое выражение'
        return
    }
    if (arr[arr.length - 1] == ":") {
        error.innerHTML = "знак повторяться не может";
        return;
    }

    error.innerHTML = ''
    input.value += ':'
    answer.value = ""
}
function multiplyNumber() {
    let arr = input.value.split("");
    if (!/[0-9)]?$/.test(arr[arr.length - 1])) {
        error.innerHTML = 'знак невозможно использовать не к числу'
        return
    }
    if (arr.length == 0) {
        error.innerHTML = 'выражение не может начинаться со знака действия'
        return
    }
    if (arr[arr.length - 1] == '-' || arr[arr.length - 1] == '+' || arr[arr.length - 1] == ':') {
        error.innerHTML = 'не правельный порядок действий'
        return
    }
    if (arr.length > 29) {
        error.innerHTML = 'слишком большое выражение'
        return
    }
    if (arr[arr.length - 1] == "×") {
        error.innerHTML = "знак повторяться не может";
        return;
    }

    error.innerHTML = ''
    input.value += '×'
    answer.value = ""
}
let testError = false

function calculate() {
    if (Graph.style.display == 'none') {
        clearCanvas()
        let x = null
        let y = null
        let previousX
        let previousY
        let exp = input.value.slice(2, input.value.length)
        exp = exp.replace(/:/g, '/')
        exp = exp.replace(/×/g, '*')
        exp = exp.replace(/\^/g, '**')
        exp = exp.replace(/√\((.*)\)/g, "Math.sqrt($1)")
        ctx.translate(canvasWidth/2, canvasWidth/2)
        for (let i = -canvasWidth; i <= canvasWidth ; i += 0.1) {
            let updatedExp = exp.replace(/(?<![0-9])x/g, i).replace(/(?<=[0-9])x/g, '*' + i);
            x = i
            if (i == -canvasWidth) {
                console.log(x)
            }

            try{
                y = eval(updatedExp)
                if (y === undefined || y === NaN || y === Infinity || y === -Infinity) {
                    throw new Error('Невозможно выполнить это выражение')
                }
            } catch(err) {
                previousX = x
                previousY = y
                if (i == -canvasWidth) {
                    console.log([x,y])
                }
                continue
            }
            if (i == -canvasWidth) {
                console.log([x,y])
            }

            y *= -1
            if (typeof previousY == 'number') {
                ctx.beginPath()
                ctx.moveTo(previousX, previousY)
                ctx.lineTo(x, y)
                ctx.strokeStyle = '#FFFFFF'
                ctx.stroke()
            }
            previousX = x
            previousY = y
        }
        ctx.translate(-canvasWidth/2, -canvasWidth/2)
    } else {
        error.innerHTML = ''
        let exp = input.value.replace(/:/g, '/')
        exp = exp.replace(/×/g, '*')
        exp = exp.replace(/\^/g, '**')
        exp = exp.replace(/√\((.*)\)/g, "Math.sqrt($1)")
        try {
            answer.value = eval(exp)
            if (answer.value === undefined || answer.value === NaN || answer.value === Infinity || answer.value === -Infinity) {
                throw new Error('Невозможно выполнить это выражение')
            }
        } catch (err) {
            error.innerHTML = 'Невозможно выполнить это выражение'
        }
        if (answer.value === "Infinity" || answer.value === "-Infinity" || answer.value === "NaN") {
            answer.value = extraTest(exp)
            if (testError) {
                error.innerHTML = 'Невозможно выполнить это выражение'
                answer.value = ''
            }
        }
    }
}
function extraTest(exp) {
    exp += ')'
    exp = exp.replace(/√\((.*)\)/g, "Math.sqrt($1)")
    let newAnswer
    try {
        newAnswer = eval(exp)
        if (newAnswer == undefined || newAnswer == NaN || newAnswer == Infinity || newAnswer == -Infinity) {
            throw new Error('Невозможно выполнить это выражение снова')
        }
    } catch (err) {
        testError = true
    }
    return newAnswer
}
function defaultCalculating() {
    // calculate()
    if (answer.value == '' || error.innerHTML != '') {
        error.innerHTML = ''
        answer.value = ''
        return
    }
}
function calculateAnswer() {
    calculate()
    if (answer.value != '' && error.innerHTML == '') {
        lastExp.value = input.value;
        input.value = ''
        input.value = answer.value;
        answer.value = ''
    }
}
function deleteLast() {
    if(Graph.style.display = 'none') {
        clearCanvas()
    } 
    if (input.value == 'y=') {
        return
    } else {
        input.value = input.value.slice(0, -1)
        error.innerHTML = ''
        answer.value = ""
        if (input.value == '') {
            lastExp.value = ''
        }
    }
}
function addOpenBracket() {
    let arr = input.value.split("");
    if (arr[arr.length - 1] == "1" || arr[arr.length - 1] == "2" || arr[arr.length - 1] == "3" || arr[arr.length - 1] == "4" || arr[arr.length - 1] == "5" || arr[arr.length - 1] == "6" || arr[arr.length - 1] == "7" || arr[arr.length - 1] == "8" || arr[arr.length - 1] == "9" || arr[arr.length - 1] == "0") {
        input.value += '×('
        return
    }
    input.value += '('
    error.innerHTML = ''
    answer.value = ""
}
function addCloseBracket() {
    let arr = input.value.split("");
    if (!/[0-9x]$/.test(arr[arr.length - 1])) {
        error.innerHTML = 'выражение не закончено'
        return
    }
    if (arr[arr.length - 1] == '-' || arr[arr.length - 1] == '+' || arr[arr.length - 1] == ':' || arr[arr.length - 1] == '×') {
        error.innerHTML = 'выражение не закончено'
        return
    }
    input.value += ')'
    error.innerHTML = ''
    answer.value = ""
    defaultCalculating()
}
function addPoint() {
    let arr = input.value.split("");
    let numbers = input.value.split(/[\+\-\*\/]/)
    if (numbers[numbers.length - 1].indexOf('.') != -1) {
        error.innerHTML = "в числе может быть только одна точка"
        return
    }
    if (!/[0-9]$/.test(arr[arr.length - 1])) {
        error.innerHTML = 'это не число'
        return
    }
    input.value += '.'
    error.innerHTML = ''
    answer.value = ''
}
function exponentiate() {
    let arr = input.value.split("");
    if (!(/[\dx\)]$/.test(arr[arr.length - 1]))) {
        error.innerHTML = 'в степень можно возводить только выражение или число'
        return
    }
    error.innerHTML = ''
    input.value += '^('
    answer.value = ''
}
function RootExtraction() {
    let arr = input.value.split("");
    if (/\d|\)|\.$/.test(arr[arr.length - 1])) {
        error.innerHTML = ''
        input.value += '×√('
        answer.value = ''
    } else {
        error.innerHTML = ''
        input.value += '√('
        answer.value = ''
    }
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasWidth)
    ctx.beginPath()
    ctx.moveTo(canvasWidth / 2, 0)
    ctx.lineTo(canvasWidth / 2, canvasWidth)
    ctx.moveTo(0, canvasWidth / 2)
    ctx.lineTo(canvasWidth, canvasWidth / 2)
    ctx.strokeStyle = '#FFFFFF'
    ctx.stroke()
    let part = canvasWidth / 20
    let gradation = (canvasWidth * 3) / 100
    for (let i = part; i <= canvasWidth - part; i += part) {
        ctx.beginPath()
        ctx.moveTo(i, (canvasWidth / 2) - (gradation / 2))
        ctx.lineTo(i, (canvasWidth / 2) + (gradation / 2))
        ctx.strokeStyle = '#FFFFFF'
        ctx.stroke()
    }
    for (let i = part; i <= canvasWidth - part; i += part) {
        ctx.beginPath()
        ctx.moveTo((canvasWidth / 2) - (gradation / 2), i)
        ctx.lineTo((canvasWidth / 2) + (gradation / 2), i)
        ctx.strokeStyle = '#FFFFFF'
        ctx.stroke()
    }
    ctx.font = "35px";
    ctx.textAlign = "center";
    ctx.fillStyle = '#FFFFFF'
    let Position = part * 2 + 3
    for (let i = 8; i > 0; i -= 2) { // верх
        ctx.fillText(i, (canvasWidth / 2) + (gradation / 2) * 2.5, Position)
        Position += part * 2
    }
    Position = part * 2
    for (let i = -8; i < 0; i += 2) { // лево
        ctx.fillText(i, Position, (canvasWidth / 2) - (gradation / 2) * 1.5)
        Position += part * 2
    }
    Position = part * 12 + 3
    for (let i = -2; i > -10; i -= 2) { // низ
        ctx.fillText(i, (canvasWidth / 2) - (gradation / 2) * 2, Position)
        Position += part * 2
    }
    Position = part * 12
    for (let i = 2; i < 10; i += 2) { // право
        ctx.fillText(i, Position, (canvasWidth / 2) + (gradation / 2) * 3)
        Position += part * 2
    }
}
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width
function Graphing() {
    error.innerHTML = ''
    input.value = "y="
    answer.style.display = 'none'
    lastExp.style.display = 'none'
    Graph.style.display = 'none'
    anime({
        targets: list,
        opacity: [
            1, 0
        ],
        duration: 500,
        easing: 'easeInCubic'
    })
    setTimeout(() => {
        listContainer.style.display = 'none';
    }, 800);
    MoreOptions.title = 'другие действия'
    Original.style.display = 'block'
    canvas.style.display = 'block'
    anime({
        targets: canvas,
        opacity: [
            0, 1
        ],
        duration: 500,
        easing: 'easeInCubic'
    })
    tableContainer.style.height = '1098'
    XRow.style.display = 'table-row'
    anime({
        targets: XRow,
        opacity: [
            0, 1
        ],
        duration: 500,
        easing: 'easeInCubic'
    })

    canvas.height = canvas.width
    ctx.beginPath()
    ctx.moveTo(canvasWidth / 2, 0)
    ctx.lineTo(canvasWidth / 2, canvasWidth)
    ctx.moveTo(0, canvasWidth / 2)
    ctx.lineTo(canvasWidth, canvasWidth / 2)
    ctx.strokeStyle = '#FFFFFF'
    ctx.stroke()
    let part = canvasWidth / 20
    let gradation = (canvasWidth * 3) / 100
    for (let i = part; i <= canvasWidth - part; i += part) {
        ctx.beginPath()
        ctx.moveTo(i, (canvasWidth / 2) - (gradation / 2))
        ctx.lineTo(i, (canvasWidth / 2) + (gradation / 2))
        ctx.strokeStyle = '#FFFFFF'
        ctx.stroke()
    }
    for (let i = part; i <= canvasWidth - part; i += part) {
        ctx.beginPath()
        ctx.moveTo((canvasWidth / 2) - (gradation / 2), i)
        ctx.lineTo((canvasWidth / 2) + (gradation / 2), i)
        ctx.strokeStyle = '#FFFFFF'
        ctx.stroke()
    }
    ctx.font = "35px";
    ctx.textAlign = "center";
    ctx.fillStyle = '#FFFFFF'
    let Position = part * 2 + 3
    for (let i = 8; i > 0; i -= 2) { // верх
        ctx.fillText(i, (canvasWidth / 2) + (gradation / 2) * 2.5, Position)
        Position += part * 2
    }
    Position = part * 2
    for (let i = -8; i < 0; i += 2) { // лево
        ctx.fillText(i, Position, (canvasWidth / 2) - (gradation / 2) * 1.5)
        Position += part * 2
    }
    Position = part * 12 + 3
    for (let i = -2; i > -10; i -= 2) { // низ
        ctx.fillText(i, (canvasWidth / 2) - (gradation / 2) * 2, Position)
        Position += part * 2
    }
    Position = part * 12
    for (let i = 2; i < 10; i += 2) { // право
        ctx.fillText(i, Position, (canvasWidth / 2) + (gradation / 2) * 3)
        Position += part * 2
    }


}
