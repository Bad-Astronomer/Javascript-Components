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




const tech_stack = {
    tech_python: {
        tag: "Python",
        url: './assets/pixel_python.png',
        filter: "brightness(1.3)",
    
        opacity: 0,
        pixelationFactor: 7,
        image: new Image(),
    },
    
    tech_js: {
        tag: "Javascripting",
        url: './assets/pixel_javascript.png',
        filter: "brightness(1.15) contrast(1.1)",
    
        opacity: 0,
        pixelationFactor: 8,
        image: new Image(),
    },
    
    tech_css: {
        tag: "CSS styling",
        url: './assets/pixel_css.png',
        filter: "brightness(1.25) contrast(1.1)",
    
        opacity: 0,
        pixelationFactor: 8,
        image: new Image(),
    },
    
    tech_react: {
        tag: "ReactJS",
        url: './assets/pixel_reactjs.png',
        filter: "brightness(1) ",
    
        opacity: 0,
        pixelationFactor: 8,
        image: new Image(),
    },
    
    tech_c: {
        tag: "C_programming",
        url: './assets/pixel_c.png',
        filter: "brightness(1.25)",
    
        opacity: 0,
        pixelationFactor: 8,
        image: new Image(),
    },
    
    tech_pytorch: {
        tag: "PyTorch",
        url: './assets/pixel_pytorch.png',
        filter: "brightness(1.25)",
    
        opacity: 0,
        pixelationFactor: 7,
        image: new Image(),
    },
    
    tech_threejs: {
        tag: "ThreeJS",
        url: './assets/pixel_three.png',
        filter: "brightness(0.85) contrast(1.3)",
    
        opacity: 0,
        pixelationFactor: 7,
        image: new Image(),
    },
    
    tech_java: {
        tag: "Java",
        url: './assets/pixel_java.png',
        filter: "brightness(1.5) contrast(1.1)",
    
        opacity: 0,
        pixelationFactor: 9,
        image: new Image(),
    },
    
    tech_ts : {
        tag: "Typrscripting",
        url: './assets/pixel_ts.png',
        filter: "brightness(1.15) contrast(1.1)",
    
        opacity: 0,
        pixelationFactor: 8,
        image: new Image(),
    },
}

function initTechStack(){
    for(let i = 0; i < 9; i++){
        const techDiv = document.createElement("div");
        techDiv.classList.add("tech-icon");
        const techImg = document.createElement("canvas");
        techImg.classList.add("tech-img");
        techDiv.appendChild(techImg);
        document.getElementById("tech").append(techDiv);
    }


    let i = 0;
    for (const [_, tech] of Object.entries(tech_stack)){
        tech.element = document.getElementsByClassName("tech-icon")[i+1];
        console.log(tech.element);
        initTechCanvas(tech);
        i++;
    }
}
initTechStack();
