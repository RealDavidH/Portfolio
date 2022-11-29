const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
const welcomeText = document.querySelector(".text-1");
const beforeText = document.querySelector(".text-2");
const landingText = document.querySelector(".text-3");
const canvasElement = document.querySelector(".canvas");
let starArray;
//927
//974

//Forces the window back to the top on refreshes and load only on firefox....
// window.onload = function () {
//     document.body.scrollTop = document.documentElement.scrollTop = 0;
// };

//Event listener to find where on the page the user is. bunch of ifs for different elements
window.addEventListener("scroll", (e) => {
    let nav = document.querySelector(".nav");
    let scrollPos = document.documentElement.scrollTop;
    let landingTop = document.getElementById("landing").offsetTop;
    let aboutTop = document.getElementById("about").offsetTop;
    let projectTop = document.getElementById("project").offsetTop;
    let contactTop = document.getElementById("contact").offsetTop;

    if (scrollPos == landingTop) {
        prevElement.classList.remove("currentNav");
        document.getElementById("nav-1").classList.add("currentNav");
        prevElement = document.getElementById("nav-1");
    }
    else if (scrollPos == aboutTop) {
        prevElement.classList.remove("currentNav");
        document.getElementById("nav-2").classList.add("currentNav");
        prevElement = document.getElementById("nav-2");
    }
    else if (scrollPos == projectTop) {
        prevElement.classList.remove("currentNav");
        document.getElementById("nav-3").classList.add("currentNav");
        prevElement = document.getElementById("nav-3");
    }
    else if (scrollPos == contactTop) {
        prevElement.classList.remove("currentNav");
        document.getElementById("nav-4").classList.add("currentNav");
        prevElement = document.getElementById("nav-4");
    }

    if (nav.style.position != "sticky" && scrollPos >= aboutTop + 1) {
        //Nav doesn't show when clicking to the about section
        nav.style.position = "sticky";
    } else if (nav.style.position == "sticky" && scrollPos < aboutTop) {
        nav.style.position = "";
    }
});

// Event listener to make sure the animation looks good
window.addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    arrayInit();
});

function Star(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.isShrink = false;
}

Star.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
    ctx.lineTo(this.x, this.y + this.size);
    ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
    ctx.fillStyle = this.color;
    ctx.fill();
};

Star.prototype.update = function () {
    if (this.size <= 1) {
        this.isShrink = false;
    }
    if (this.size >= 5) {
        this.isShrink = true;
    }
    if (this.isShrink) {
        this.size -= 0.01;
    }
    if (!this.isShrink) {
        this.size += 0.01;
    }
    this.draw();
};

function arrayInit() {
    starArray = [];
    for (let i = 0; i < 400; i++) {
        let size = Math.random() * 5;
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let color = randomColors(i);
        starArray.push(new Star(x, y, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < starArray.length; i++) {
        starArray[i].update();
    }
}

//Every 4th is a yellow,

function randomColors(num) {
    const colorArray = ["#04c2c9", "#FFFFFF", "#FFFF8F"];
    if (num % 8 == 0) {
        return colorArray[2];
    } else {
        let rN = Math.floor(Math.random() * 4);
        return colorArray[rN];
    }
}

let prevElement = document.getElementsByClassName("currentNav")[0];
//Set what nav item is pink
function setNav(element) {
    prevElement.classList.remove("currentNav");
    element.classList.add("currentNav");
    console.log(prevElement, "prev element");
    prevElement = element;
    console.log(prevElement, "new prev")
}

//Did animations in js cause made more sense than css
async function fadein(element, ms) {
    let temp = 0;
    while (element.style.opacity != 1) {
        temp += 0.01;
        await sleep(ms);
        element.style.opacity = temp;
    }
}

async function fadeout(element, ms) {
    let temp = 1;
    while (temp > 0) {
        temp -= 0.01;
        await sleep(ms);
        element.style.opacity = temp;
    }
    return temp;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function webPageStart() {
    // await fadein(welcomeText, 0);
    // await fadeout(welcomeText, 0);
    // await fadein(beforeText, 0);
    await fadein(landingText, 0);
    // await fadeout(beforeText, 0);
}

arrayInit();
animate();
webPageStart();

