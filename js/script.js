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
        return false;
    }
    return number;
};

// to calculate area of geometry area
const areaOfGeometry = (a, b, areaName) => {
    // to calculate area for Triangle, Rhombus and Pentagon (A = 0.5 * b * h)
    if (
        areaName === "triangle" ||
        areaName === "rhombus" ||
        areaName === "pentagon"
    ) {
        const result = (a * b) / 2;
        return result.toFixed(1);
    }

    //to calculate area for Rectangle and Parallelogram and Square (A = b * h)
    if (areaName === "rectangle" || areaName === "parallelogram") {
        const result = a * b;
        return result.toFixed(1);
    }

    //to calculate area for Ellipse (A = πab)
    if (areaName === "ellipse") {
        const result = Math.PI * a * b;
        return result.toFixed(1);
    }
};

// set area result in result container
const setAreaResult = (function () {
    let html = "";
    return (areaName, result) => {
        const resultContainer = getElementById("result-container");
        html += `<li class="text-xl my-2">
                        <span class="text-2xl mr-12">${areaName}</span
                        >
                        <span>${result}</span>
                        <span>cm<sup>2</sup></span>
                    </li>`;
        resultContainer.innerHTML = html;
    };
})();

// html collection of all area buttons
const areaButtons = document.getElementsByClassName("area-btn");
// add event listener to all area buttons
for (let button of areaButtons) {
    button.addEventListener("click", (event) => {
        const btnIdName = event.target.id;
        if (btnIdName === "triangle-btn") {
            const base = getNumberValue(getElementById("triangle-base"));
            const height = getNumberValue(getElementById("triangle-height"));
            if (base && height) {
                const result = areaOfGeometry(base, height, "triangle");
                setAreaResult("Triangle", result);
            } else alert("Please enter a valid positive number!");
        }
        if (btnIdName === "rectangle-btn") {
            const width = getNumberValue(getElementById("rectangle-width"));
            const length = getNumberValue(getElementById("rectangle-length"));
            if (width && length) {
                const result = areaOfGeometry(width, length, "rectangle");
                setAreaResult("Rectangle", result);
            } else alert("Please enter a valid positive number!");
        }
        if (btnIdName === "parallelogram-btn") {
            const base = getNumberValue(getElementById("parallelogram-base"));
            const height = getNumberValue(
                getElementById("parallelogram-height")
            );
            if (base && height) {
                const result = areaOfGeometry(base, height, "parallelogram");
                setAreaResult("Parallelogram", result);
            } else alert("Please enter a valid positive number!");
        }
        if (btnIdName === "rhombus-btn") {
            const d1 = getNumberValue(getElementById("rhombus-d1"));
            const d2 = getNumberValue(getElementById("rhombus-d2"));
            if (d1 && d2) {
                const result = areaOfGeometry(d1, d2, "rhombus");
                setAreaResult("Rhombus", result);
            } else alert("Please enter a valid positive number!");
        }
        if (btnIdName === "pentagon-btn") {
            const p = getNumberValue(getElementById("pentagon-p"));
            const b = getNumberValue(getElementById("pentagon-b"));
            if (p && b) {
                const result = areaOfGeometry(p, b, "pentagon");
                setAreaResult("Pentagon", result);
            } else alert("Please enter a valid positive number!");
        }
        if (btnIdName === "ellipse-btn") {
            const a = getNumberValue(getElementById("ellipse-a"));
            const b = getNumberValue(getElementById("ellipse-b"));
            if (a && b) {
                const result = areaOfGeometry(a, b, "ellipse");
                setAreaResult("Ellipse", result);
            } else alert("Please enter a valid positive number!");
        }
    });
}
