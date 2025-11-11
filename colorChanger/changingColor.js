// document.addEventListener('DOMContentLoaded', () => {
// const boxes = document.querySelectorAll(".box");

// const cont = document.querySelector(".container");


// boxes.forEach(box => {
//     box.addEventListener("click", () => {
//         box.style.color = getRandomColor();
//         box.style.backgroundColor = getRandomColor();
//         cont.style.backgroundColor = getRandomColor();
//     })
// })
// })

// function getRandomColor() {
    // const letters = '0123456789ABCDEF';
    // let color = '#';
    // for (let i = 0; i < 6; i++) {
    //     color = color + letters[Math.floor(Math.random() * 16)]
    // }
    // return color;

    // or another way to genearte different color
    // let val1 = Math.random();
    // let val2 = Math.random();
    // let val3= Math.random();
    // return `rgb(${val1}, ${val2}, ${val3})`
// }


// AMOTHER MEHTOD TO COLOR 
const boxes = document.getElementsByClassName("box")
const cont = document.querySelector(".container");

function getRandomColor() {
    let val1 = Math.ceil(0 + Math.random()*255);
    let val2 = Math.ceil(0 + Math.random()*255);
    let val3= Math.ceil(0 + Math.random()*255);
    return `rgb(${val1}, ${val2}, ${val3})`
}

Array.from(boxes).forEach((box) => {
    box.style.backgroundColor = getRandomColor();
    box.style.color = getRandomColor();
    cont.style.backgroundColor = getRandomColor();
})