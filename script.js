const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 3464;
canvas.height = 3464;

let userImg = null;
let template = new Image();

let posX = canvas.width / 2;
let posY = canvas.height / 2;

let zoom = 1;
let rotation = 0;

let dragging = false;
let startX = 0;
let startY = 0;


/* load template */

template.src = "assets/robocat.png";

template.onload = () => {
    draw();
};


/* upload user image */

document.getElementById("upload").addEventListener("change", e => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = ev => {

        userImg = new Image();

        userImg.onload = () => {

            posX = canvas.width / 2;
            posY = canvas.height / 2;

            zoom = 1;
            rotation = 0;

            draw();
        };

        userImg.src = ev.target.result;
    };

    reader.readAsDataURL(file);

});


/* drag image */

canvas.addEventListener("mousedown", e => {

    dragging = true;
    startX = e.offsetX;
    startY = e.offsetY;

});

canvas.addEventListener("mousemove", e => {

    if (!dragging || !userImg) return;

    posX += e.offsetX - startX;
    posY += e.offsetY - startY;

    startX = e.offsetX;
    startY = e.offsetY;

    draw();

});

canvas.addEventListener("mouseup", () => dragging = false);
canvas.addEventListener("mouseleave", () => dragging = false);


/* zoom */

document.getElementById("zoom").addEventListener("input", e => {

    zoom = parseFloat(e.target.value);
    draw();

});


/* rotate */

document.getElementById("rotate").addEventListener("input", e => {

    rotation = e.target.value * Math.PI / 180;
    draw();

});


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (userImg) {

        ctx.save();

        ctx.translate(posX, posY);
        ctx.rotate(rotation);
        ctx.scale(zoom, zoom);

        ctx.drawImage(userImg, -userImg.width / 2, -userImg.height / 2);

        ctx.restore();
    }

    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

}


/* download */

document.getElementById("download").onclick = () => {

    const link = document.createElement("a");

    link.href = canvas.toDataURL("image/png");
    link.download = "prisma-pfp.png";

    link.click();

};