// Photographer page
const id = window.location.href.split("id=")[1]
let photographerName = ""
let photographerFiltered
let mediaFiltered

//Get photographer datas
async function getPhotographer() {
  try {
    const response = await fetch("./data/photographers.json")
    const data = await response.json()
    const photographers = await data.photographers
    
    //Medias filter
    photographerFiltered = photographers.filter(
      (photographer) => photographer.id == id
    )
    const mediaAll = await data.media
    mediaFiltered = mediaAll.filter((media) => media.photographerId == id)
    return { photographerFiltered, mediaFiltered }
  } catch (error) {
    console.error(error)
  }
}

// Display medias
async function displayData() {
  const photographersSection = document.querySelector(".photograph-header")
  const mediaSection = document.querySelector(".media-section")
  
  if (photographersSection.children.length == 0) {
    photographerFiltered.forEach((photographer) => {
      const photographerModel = photographerFactory(
        photographer,
        mediaFiltered
      )
      const userCardDOM = photographerModel.getUserDetail()
      const userLikes = photographerModel.getUserLikes()
      photographersSection.appendChild(userCardDOM)
      photographersSection.appendChild(userLikes)
    })
  }

  mediaFiltered.forEach((media, index) => {
    const mediaModel = mediaFactory(media, photographerFiltered, index)
    const mediaCardDom = mediaModel.getMediaCardDom()
    mediaSection.appendChild(mediaCardDom)
  })
}

async function init(option) {
  const { photographerFiltered, mediaFiltered } = await getPhotographer()

  // Date filter
  switch (option) {
    case 'popularité':
      mediaFiltered.sort((a, b) => b.likes - a.likes)
      break
    case 'titre':
      mediaFiltered.sort(function (a, b) {
        const titleA = a.title.toLowerCase()
        const titleB = b.title.toLowerCase()
        if (titleA < titleB)
         return -1
         return 1
      })
      break;
    case 'date':
    default:
      mediaFiltered.sort((a, b) => new Date(b.date) - new Date(a.date))
    break
  }

  photographerFiltered.length == 0
  ? (window.location.href = 'index.html')
  : displayData(photographerFiltered, mediaFiltered)
  photographerName = photographerFiltered[0].name
}

init()