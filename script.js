
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let starArray;


function Star(x, y, size, color){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.isShrink = false;
}


Star.prototype.draw = function(){
    ctx.beginPath();
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x - this.size / 2, this.y + this.size  / 2);
    ctx.lineTo(this.x, this.y + this.size );
    ctx.lineTo(this.x + this.size  / 2, this.y + this.size  / 2);
    ctx.fillStyle = this.color;
    ctx.fill();
}


Star.prototype.update = function(){
    if(this.size <= 1){
        this.isShrink = false;
    }
    if(this.size >= 5){
        this.isShrink = true;
    }
    if(this.isShrink ){
        this.size -= .01;
    } 
    if(!this.isShrink){
        this.size += .01;
    }
    
    this.draw();
}

function arrayInit(){
    starArray = [];
    for(let i = 0; i < 400; i++){
        let size = Math.random() * 5;
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let color = randomColors(i);
        starArray.push(new Star(x, y, size, color))
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);

    for(let i = 0; i< starArray.length; i++){
        starArray[i].update();
    }
}

//Every 4th is a yellow,

function randomColors(num){
    const colorArray = ['#04c2c9', '#FFFFFF', '#FFFF8F' ];
    if(num % 8 == 0){
        return colorArray[2];
    } else {
        
        let rN = Math.floor((Math.random() * 4));
        return colorArray[rN];
    }
    
}


arrayInit();
animate();

// Event listener to make sure the animation looks good 
window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        arrayInit();
    }
)


let welcomeText = document.querySelector('.text-1');
let beforeText = document.querySelector('.text-2');
let landingText = document.querySelector('.text-3');

async function fadein(element, ms){
    let temp = 0;
    console.log(element);
    while(element.style.opacity != 1){
        temp += 0.01;
        await sleep(ms)
        element.style.opacity = temp;
    }
}

async function fadeout(element, ms){
    let temp = 1;
    while(temp > 0){
        temp -= 0.01;
        await sleep(ms)
        element.style.opacity = temp;
    }
    console.log('done')
    return temp;

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function webPageStart(){
    await fadein(welcomeText, 15);
    await fadeout(welcomeText, 15);
    await fadein(beforeText, 15);
    await fadein(landingText, 10);
    await fadeout(beforeText, 15);
}
webPageStart();