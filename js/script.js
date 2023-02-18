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
const resultContainer = document.getElementById("result-container");
// to add and remove list item
let listItems = [];
const setAreaResult = (areaName, result) => {
    const list = `<li class="text-xl my-2">
                        <span class="text-2xl mr-8">${areaName}</span
                        >
                        <span>${result}</span>
                        <span>cm<sup>2</sup></span>
                        <button class="convert-btn bg-blue-600 px-3 py-1 rounded mx-2 text-white mt-1" name="convert-meter">
                            convert to m<sup>2</sup>
                        </button>
                        <button class="close-btn px-2 text-white bg-red-600 rounded-full ml-1">X</button>
                    </li>`;
    listItems.push(list);
    let html = "";
    for (let li of listItems) {
        html += li;
    }
    resultContainer.innerHTML = html;
};

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

// add event listener to result container to delete result
resultContainer.addEventListener("click", (event) => {
    const btn = event.target;
    const indexPositionOfList = listItems.indexOf(btn.parentNode);

    // remove item from listItems when close btn click
    if (btn.classList[0] === "close-btn") {
        resultContainer.removeChild(btn.parentNode);
        listItems.splice(indexPositionOfList, 1);
    }
    // convert units when convert btn click
    if (btn.classList[0] === "convert-btn") {
        const cm = btn.previousElementSibling;
        const result = cm.previousElementSibling;
        if (btn.name === "convert-meter") {
            result.textContent = `${convert_cm_to_m(result.textContent)}`;
            cm.innerHTML = `m<sup>2</sup>`;
            btn.innerHTML = `convert to cm<sup>2</sup>`;
            btn.name = "convert-cm";
        } else {
            result.textContent = `${convert_m_to_cm(result.textContent)}`;
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
