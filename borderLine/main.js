function getCenter(element){
    let rect = element.getClientRects()[0];
    return [rect.x + (rect.width/2), rect.y + (rect.height/2)];
}

function distance(cords1, cords2){
    let x = cords2[0] - cords1[0];
    let y = cords2[1] - cords1[1];
    return [x, y];
}

function cap(value, min, max){
    value = Math.min(value, max);
    value = Math.max(value, min);
    return value;
}

function normalize(value ,oldMin, oldMax, newMin, newMax, capToggle = false){
    value = (value - oldMin)/(oldMax - oldMin);
    value = (value * (newMax - newMin)) + newMin;
    if(capToggle) value = cap(value, newMin, newMax);
    return value;
}


const cards = document.getElementsByClassName("card");

document.addEventListener("mousemove", (event) => {
    let mouse = [event.x, event.y];
    for(let card of cards){
        // let cardRect = card.getClientRects()[0];
        // let cardCenter = getCenter(card);
        // let dist = distance(mouse, cardCenter);
        // let normalDistX = normalize(dist[0], 0, cardRect.width/2, 0, 1);
        // console.log(normalDistX);

        let cardBorder = card.querySelector(".card-border");
        cardBorder.animate({
            left: `${event.x}px`,
            top: `${event.y}px`
        }, {fill: "forwards", duration: 200});
        console.log(cardBorder.style);
    }
})