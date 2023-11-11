// corner cross template

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
    cross(section); // add cross to all sections
})


// Global Helper Functions

function avg(arr){
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    return sum / arr.length;
}


// Pixelated Image

function pixelateImage(tech) {
    const originalImage = tech.image;
    const canvas = tech.element.querySelector('canvas');
    const ctx = canvas.getContext("2d", {willReadFrequently: true});

    const saturation = tech.saturation;
    const pixelationFactor = tech.pixelationFactor;
    const noise = tech.noise;

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
        //! RANDOM NOISE STRENGTH = SATURATION * NOISE FRACTION
        if (Math.random() < saturation * noise){
            dark = 2;
        }

        let rgb = [
            originalImageData[pixelIndexPosition]/dark,
            originalImageData[pixelIndexPosition + 1]/dark,
            originalImageData[pixelIndexPosition + 2]/dark,
        ]

        let avg_rgb = avg(rgb);
        let color;

        if(Math.random() < saturation){
            color = `rgb(
                ${rgb[0]},
                ${rgb[1]},
                ${rgb[2]}
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
}


// Helper functions to pixelateImage

function animateImage(img){
    clearInterval(img.animationInterval);
    img.animationInterval = setInterval(() => {
        img.saturation += 0.3
        img.saturation = Math.min(img.saturation, 1);
        pixelateImage(img);
    },120)
}

function deanimateImage(img){
    clearInterval(img.animationInterval);
    img.animationInterval = setInterval(() => {
        img.saturation -= 0.3
        if(img.saturation <= 0){
            img.saturation = Math.max(img.saturation, 0);
            clearInterval(img.animationInterval);
        }
        pixelateImage(img);
    },120)
}

function initTechCanvas(tech){
    tech.image.src = tech.url;
    tech.element.querySelector('canvas').style.filter = tech.filter;
    tech.image.onload = () => {
        pixelateImage(tech);

        tech.element.addEventListener("mouseenter", () => {
            techHover = true;
            animateTechHeader(tech);
            animateImage(tech);
        });

        tech.element.addEventListener("mouseleave", () => {
            techHover = false;
            setTimeout(() => {
                if(!techHover){
                    deanimateTechHeader();
                }
            }, animationTime*2);
            deanimateImage(tech);
        });
    }
}


// Helper functions for Tech Header Animation

function createTechHeader(){
    let techHeader = document.createElement("span");
    techHeader.classList.add("tech-header-span");
    techHeaderContainer.appendChild(techHeader);
    return techHeader;
}

function animateTechHeader(tech){
    let tempHeader = createTechHeader();
    tempHeader.innerHTML = tech.tag;
    tempHeader.style.color = tech.color;

    tempHeader.style.transformOrigin = "top";
    tempHeader.style.transform = "scaleY(0)";
    tempHeader.style.opacity = 0;
    tempHeader.style.transition = `transform ${animationTime}ms linear, opacity ${animationTime}ms ease-in`;

    setTimeout(() => {
        tempHeader.style.transform = "scaleY(1)";
        tempHeader.style.opacity = 1;
    }, 1);

    currentTechHeader.style.transition = `transform ${animationTime}ms linear, opacity ${animationTime}ms ease-in`;
    currentTechHeader.style.transformOrigin = "bottom";
    currentTechHeader.style.transform = "scaleY(0)";
    currentTechHeader.style.opacity = 0;

    setTimeout(() => {
        currentTechHeader.remove();
        currentTechHeader = tempHeader;
    }, animationTime);
}

function deanimateTechHeader(){
    tech = {
        tag: defaultHeader,
        color: "white",
    }
    animateTechHeader(tech);
}


// Init for tech stack

function initTechStack(){
    // header
    currentTechHeader = createTechHeader();

    currentTechHeader.innerHTML = defaultHeader;
    currentTechHeader.style.color = "white";

    // image
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
        initTechCanvas(tech);
        i++;
    }
}

let currentTechHeader;
let techHover = false;
const techHeaderContainer = document.getElementById("tech-header-container");

initTechStack();