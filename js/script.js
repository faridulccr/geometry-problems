const geometryCards = document.getElementsByClassName("geometry-card");

// when mouseover a geometry card it will change background color randomly
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

// area calculation related task
const getElementById = (idName) => {
    return document.getElementById(idName);
};

const getNumberValue = (element) => {
    const number = parseFloat(element.value);

    if (isNaN(number) || number <= 0) {
        alert("Please enter a valid positive number!");
        return;
    }
    return number;
};

// set area result in result container
const setAreaResult = (function () {
    let html = "";
    return (areaName, result) => {
        const resultContainer = getElementById("result-container");
        html += `<li class="text-xl">
                    <span class="text-2xl mr-12">${areaName}</span
                    >
                    <span>${result}</span>
                    <span>cm<sup>2</sup></span>
                </li>`;
        resultContainer.innerHTML = html;
    };
})();

// to calculate area of geometry area
const areaOfGeometry = (a, b, areaName) => {
    // to calculate area for Triangle, Rhombus and Pentagon (A = 0.5 * b * h)
    if (
        areaName === "triangle" ||
        areaName === "rhombus" ||
        areaName === "pentagon"
    ) {
        const result = (a * b) / 2;
        return result.toFixed(2);
    }

    //to calculate area for Rectangle and Parallelogram and Square (A = b * h)
    if (areaName === "rectangle" || areaName === "parallelogram") {
        const result = a * b;
        return result.toFixed(2);
    }

    //to calculate area for Ellipse (A = πab)
    if (areaName === "ellipse") {
        const result = Math.PI * a * b;
        return result.toFixed(2);
    }
};
