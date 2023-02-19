// when mouseover a geometry card it will change background color randomly
// add event listener to all geometry card to listen mouse enter event
const geometryCards = document.getElementsByClassName("geometry-card");
for (let card of geometryCards) {
    card.addEventListener("mouseenter", () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        card.style.transition = "0.3s";
        card.style.backgroundColor = `#${randomColor}`;
    });
}

// add event listener to all geometry card to lister mouse leave event
// for (let card of geometryCards) {
//     card.addEventListener("mouseleave", () => {
//         card.style.backgroundColor = "#ffffff";
//     });
// }

// area calculation and set result to result container related task
const getInputValueByID = (idName) => {
    const element = document.getElementById(idName);
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
        areaName === "Triangle" ||
        areaName === "Rhombus" ||
        areaName === "Pentagon"
    ) {
        return ((a * b) / 2).toFixed(1);
    }
    //to calculate area for Rectangle and Parallelogram and Square (A = b * h)
    if (areaName === "Rectangle" || areaName === "Parallelogram") {
        return (a * b).toFixed(1);
    }
    //to calculate area for Ellipse (A = πab)
    if (areaName === "Ellipse") {
        return (Math.PI * a * b).toFixed(1);
    }
};

// set area result in result container
const resultContainer = document.getElementById("result-container");
// to add and remove list item
const setAreaResult = (areaName, area) => {
    const list = `<li class="text-xl my-2">
                        <span class="text-2xl mr-8">${areaName}</span
                        >
                        <span>${area}</span>
                        <span>cm<sup>2</sup></span>
                        <button class="convert-btn bg-blue-600 px-3 py-1 rounded mx-2 text-white mt-1" name="convert-meter">
                            convert to m<sup>2</sup>
                        </button>
                        <button class="close-btn px-2 text-white bg-red-600 rounded-full ml-1">X</button>
                    </li>`;
    resultContainer.innerHTML += list;
};

const showResult = (inputId1, inputId2, areaName) => {
    const a = getInputValueByID(inputId1);
    const b = getInputValueByID(inputId2);
    if (a && b) {
        const area = areaOfGeometry(a, b, areaName);
        setAreaResult(areaName, area);
    } else alert("Please enter a valid positive number!");
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

// add event listener to result container to delete result
resultContainer.addEventListener("click", (event) => {
    const btn = event.target;

    // remove item from listItems when close btn click
    if (btn.classList.contains("close-btn")) {
        resultContainer.removeChild(btn.parentElement);
    }
    // convert units when convert btn click
    if (btn.classList.contains("convert-btn")) {
        const cm = btn.previousElementSibling;
        const area = cm.previousElementSibling;
        if (btn.name === "convert-meter") {
            area.textContent = `${convert_cm_to_m(area.textContent)}`;
            cm.innerHTML = `m<sup>2</sup>`;
            btn.innerHTML = `convert to cm<sup>2</sup>`;
            btn.name = "convert-cm";
        } else {
            area.textContent = `${convert_m_to_cm(area.textContent)}`;
            cm.innerHTML = `cm<sup>2</sup>`;
            btn.innerHTML = `convert to m<sup>2</sup>`;
            btn.name = "convert-meter";
        }
    }
});

// to cm square to m square
function convert_cm_to_m(cm) {
    return parseFloat(cm) / 10000;
}
// to m square to cm square
function convert_m_to_cm(m) {
    return (parseFloat(m) * 10000).toFixed(1);
}
