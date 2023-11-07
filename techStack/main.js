function createCross(position, element){
    let cross = document.createElement("div");
    cross.classList.add("cross");
    cross.classList.add(`cross-${position}`);

    let crossHalfVertical = document.createElement("div");
    crossHalfVertical.classList.add("cross-half-vertical");
    let crossHalfHorizontal = document.createElement("div");
    crossHalfHorizontal.classList.add("cross-half-horizontal");

    cross.appendChild(crossHalfVertical);
    cross.appendChild(crossHalfHorizontal);

    element.appendChild(cross);
}

function cross(element){
    createCross("top", element);
    createCross("bottom", element);
}


const sections = document.querySelectorAll("section");
sections.forEach((section) => {
    cross(section);
})



// Helper Functions

function avg(arr){
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
}

// Pixelated Image

function pixelateImage(image) {
    const originalImage = image.image
    const canvas = image.element.querySelector('canvas');
    const ctx = canvas.getContext("2d", {willReadFrequently: true});

    const opacity = image.opacity;
    const pixelationFactor = image.pixelationFactor;

    // originalImage.width = canvas.getBoundingClientRect().width;
    // originalImage.height = canvas.getBoundingClientRect().height;

    const originalWidth = originalImage.width;
    const originalHeight = originalImage.height;

    const canvasWidth = originalWidth;
    const canvasHeight = originalHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
    const originalImageData = ctx.getImageData(
        0,
        0,
        originalWidth,
        originalHeight
    ).data;

    for (let y = 0; y < originalHeight; y += pixelationFactor) {
        for (let x = 0; x < originalWidth; x += pixelationFactor) {
        // extracting the position of the sample pixel
        const pixelIndexPosition = (x + y * originalWidth) * 4;
        // drawing a square replacing the current pixels
        let dark = 1;
        if (Math.random() > 0.8){
            dark = 2;
        }

        let rgba = [
            originalImageData[pixelIndexPosition],
            originalImageData[pixelIndexPosition + 1],
            originalImageData[pixelIndexPosition + 2],
        ]

        let avg_rgb = avg(rgba)/dark;
        let color;

        if(Math.random() < opacity){
            color = `rgb(
                ${rgba[0]/dark},
                ${rgba[1]/dark},
                ${rgba[2]/dark}
            )`;
        }
        else{
            color = `rgb(${avg_rgb}, ${avg_rgb}, ${avg_rgb})`;
        }
        

        ctx.fillStyle = color;
        ctx.fillRect(x, y, pixelationFactor, pixelationFactor);
        ctx.strokeSyle = "black";
        ctx.strokeRect(x, y, pixelationFactor, pixelationFactor);
        }
    }
    // originalImage.src = canvas.toDataURL();
}

// Helper functions to pixelateImage

function animateImage(img){
    clearInterval(img.animationInterval);
    img.animationInterval = setInterval(() => {
        img.opacity += 0.3
        img.opacity = Math.min(img.opacity, 1);
        pixelateImage(img);
    },100)
}

function deanimateImage(img){
    clearInterval(img.animationInterval);
    img.animationInterval = setInterval(() => {
        img.opacity -= 0.3
        if(img.opacity <= 0){
            img.opacity = Math.max(img.opacity, 0);
            clearInterval(img.animationInterval);
        }
        pixelateImage(img);
    },100)
}

function initTechCanvas(tech){
    tech.image.src = tech.url;
    tech.element.querySelector('canvas').style.filter = tech.filter;
    tech.image.onload = () => {
        pixelateImage(tech);
        tech.element.addEventListener("mouseenter", () => {animateImage(tech);});
        tech.element.addEventListener("mouseleave", () => {deanimateImage(tech)});
    }
}


const tech_python = {
    tag: "Python",
    url: './assets/pixel_python.png',
    filter: "brightness(1.3)",
    element: document.getElementsByClassName("tech-icon")[0],

    opacity: 0,
    pixelationFactor: 7,

    animationInterval: null,
    image: new Image(),
};

const tech_js = {
    tag: "Javascripting",
    url: './assets/pixel_javascript.png',
    filter: "brightness(1.15) contrast(1.1)",
    element: document.getElementsByClassName("tech-icon")[1],

    opacity: 0,
    pixelationFactor: 8,

    animationInterval: null,
    image: new Image(),
};

const tech_css = {
    tag: "CSS styling",
    url: './assets/pixel_css.png',
    filter: "brightness(1.25) contrast(1.1)",
    element: document.getElementsByClassName("tech-icon")[2],

    opacity: 0,
    pixelationFactor: 8,

    animationInterval: null,
    image: new Image(),
};

const tech_react = {
    tag: "ReactJS",
    url: './assets/pixel_reactjs.png',
    filter: "brightness(1) ",
    element: document.getElementsByClassName("tech-icon")[3],

    opacity: 0,
    pixelationFactor: 8,

    animationInterval: null,
    image: new Image(),
};

const tech_c = {
    tag: "C_programming",
    url: './assets/pixel_c.png',
    filter: "brightness(1.25)",
    element: document.getElementsByClassName("tech-icon")[4],

    opacity: 0,
    pixelationFactor: 8,

    animationInterval: null,
    image: new Image(),
};

const tech_pytorch = {
    tag: "PyTorch",
    url: './assets/pixel_pytorch.png',
    filter: "brightness(1.25)",
    element: document.getElementsByClassName("tech-icon")[5],

    opacity: 0,
    pixelationFactor: 7,

    animationInterval: null,
    image: new Image(),
};

const tech_threejs = {
    tag: "ThreeJS",
    url: './assets/pixel_three.png',
    filter: "brightness(0.85) contrast(1.3)",
    element: document.getElementsByClassName("tech-icon")[6],

    opacity: 0,
    pixelationFactor: 7,

    animationInterval: null,
    image: new Image(),
};

const tech_java = {
    tag: "Java",
    url: './assets/pixel_java.png',
    filter: "brightness(1.5) contrast(1.1)",
    element: document.getElementsByClassName("tech-icon")[7],

    opacity: 0,
    pixelationFactor: 9,

    animationInterval: null,
    image: new Image(),
};

const tech_ts = {
    tag: "Typrscripting",
    url: './assets/pixel_ts.png',
    filter: "brightness(1.15) contrast(1.1)",
    element: document.getElementsByClassName("tech-icon")[8],

    opacity: 0,
    pixelationFactor: 8,

    animationInterval: null,
    image: new Image(),
};

initTechCanvas(tech_python);
initTechCanvas(tech_js);
initTechCanvas(tech_css);
initTechCanvas(tech_react);
initTechCanvas(tech_c);
initTechCanvas(tech_pytorch);
initTechCanvas(tech_threejs);
initTechCanvas(tech_java);
initTechCanvas(tech_ts);
