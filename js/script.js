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
const getInputValueByID = (idName) => {
    const element = document.getElementById(idName);
    const number = parseFloat(element.value);
    if (isNaN(number) || number <= 0) {
        return false;
    }
    return number;
};

// set area result in result container
const setAreaResult = (function () {
    const resultContainer = document.getElementById("result-container");
    let html = "";
    return (areaName, result) => {
        html += `<li class="text-xl my-2">
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
    if (a && b) {
        // to calculate area for Triangle, Rhombus and Pentagon (A = 0.5 * b * h)
        if (
            areaName === "Triangle" ||
            areaName === "Rhombus" ||
            areaName === "Pentagon"
        ) {
            const result = ((a * b) / 2).toFixed(1);
            setAreaResult(areaName, result);
        }
        //to calculate area for Rectangle and Parallelogram and Square (A = b * h)
        if (areaName === "Rectangle" || areaName === "Parallelogram") {
            const result = (a * b).toFixed(1);
            setAreaResult(areaName, result);
        }
        //to calculate area for Ellipse (A = πab)
        if (areaName === "Ellipse") {
            const result = (Math.PI * a * b).toFixed(1);
            setAreaResult(areaName, result);
        }
    } else alert("Please enter a valid positive number!");
};

const showResult = (inputId1, inputId2, areaName) => {
    const a = getInputValueByID(inputId1);
    const b = getInputValueByID(inputId2);
    areaOfGeometry(a, b, areaName);
};

// geometry cards container
const cardsContainer = document.getElementById("geometry-cards-container");
// add event listener to cards container for buttons click using delegation
cardsContainer.addEventListener("click", (event) => {
    const btnIdName = event.target.id;
    if (btnIdName === "triangle-btn") {
        showResult("triangle-base", "triangle-height", "Triangle");
    }
    if (btnIdName === "rectangle-btn") {
        showResult("rectangle-width", "rectangle-length", "Rectangle");
    }
    if (btnIdName === "parallelogram-btn") {
        showResult(
            "parallelogram-base",
            "parallelogram-height",
            "Parallelogram"
        );
    }
    if (btnIdName === "rhombus-btn") {
        showResult("rhombus-d1", "rhombus-d2", "Rhombus");
    }
    if (btnIdName === "pentagon-btn") {
        showResult("pentagon-p", "pentagon-b", "Pentagon");
    }
    if (btnIdName === "ellipse-btn") {
        showResult("ellipse-a", "ellipse-b", "Ellipse");
    }
});
