const geometryCards = document.getElementsByClassName("geometry-card");

// when hover a geometry card it will change background color randomly
// add event listener to all geometry card to listen mouse enter event
for (let card of geometryCards) {
    card.addEventListener("mouseenter", () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        card.style.transition = "0.3s";

        if (randomColor === "000000") {
            card.style.backgroundColor = `#${randomColor}`;
            card.style.color = "#ffffff";
        } else {
            card.style.backgroundColor = `#${randomColor}`;
        }
    });
}

// add event listener to all geometry card to lister mouse leave event
for (let card of geometryCards) {
    card.addEventListener("mouseleave", () => {
        card.style.backgroundColor = "#ffffff";
    });
}
