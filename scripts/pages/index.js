// Index
// Get photographer data
async function getPhotographers() {
    const result = await fetch("./data/photographers.json")
    const data = await result.json()
    const photographers = await data.photographers
        return { photographers }
}

// Display photographer data
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section")

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer)
        const userCardDOM = photographerModel.getUserCardDOM()
        photographersSection.appendChild(userCardDOM)
    })
}

async function init() {
    const { photographers } = await getPhotographers()
    displayData(photographers)
}

init()