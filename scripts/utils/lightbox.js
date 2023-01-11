// Lightbox 

// Lightbox elements
function lightboxContent(title, source, type, id, lightbox) {
  
  //CLose lightbox
  const close = document.createElement("button")
  close.setAttribute("aria-label", "close")
  close.classList.add("lightbox__close")
  close.addEventListener("click", () => closeLightbox())
  
  //Next lightbox
  const next = document.createElement("button")
  next.setAttribute("aria-label", "next")
  next.classList.add("lightbox__next")
  next.addEventListener("click", () => nextLightbox(source, id))
  
  //Previous lightbox
  const prev = document.createElement("button")
  prev.setAttribute("aria-label", "prev")
  prev.classList.add("lightbox__prev")
  prev.addEventListener("click", () => prevLightbox(source, id))
  
  //Accessibility
  document.addEventListener("keydown", keydown, true)
  function keydown(e) {
    if (e.code == "ArrowRight") {
      nextLightbox(source, id);
    } else if (e.code == "ArrowLeft") {
      prevLightbox(source, id);
    } else if (e.code == "Escape") {
      closeLightbox();
    }
    document.removeEventListener("keydown", keydown, true)
  }

  //Image lightbox
  const container = document.createElement("div")
  container.classList.add("lightbox__container")
  
  //Image or video
  const content =
    type == "image"
      ? document.createElement("img")
      : document.createElement("video")

  type == "video" && content.setAttribute("controls", false)
  
  type == "video" && content.setAttribute("autoplay", false)
  content.setAttribute("src", source)
  content.classList.add("thumbnail")
  content.setAttribute("alt", title)

  //Image title
  const titleText = document.createElement("h2")
  titleText.textContent = title

  //Video Subtitles
  if (type == 'video') {
    const subtitle = document.createElement('track')
    subtitle.setAttribute('kind', 'subtitles')
    subtitle.setAttribute('label', 'English')
    subtitle.setAttribute('srclang', 'en')
    subtitle.setAttribute('src', 'chrome-subtitles-zh.vtt')
    const paragraph = document.createElement('h3')
    paragraph.textContent = "Ce navigateur ne prend pas en en charge l'élément vidéo."
    content.appendChild(subtitle)
    content.appendChild(paragraph)

  }
  // Create elements
  lightbox.appendChild(close)
  lightbox.appendChild(next)
  lightbox.appendChild(prev)
  lightbox.appendChild(container)
  container.appendChild(content)
  container.appendChild(titleText)
}

// Lightbox main
function lightbox(title, source, type, id) {

  //Ligtht box container
  const lightbox = document.createElement("div")
  lightbox.classList.add("lightbox")
  lightbox.setAttribute("alt", "image closeup view")
  
  //Add lightbox elements
  lightboxContent(title, source, type, id, lightbox)
  return lightbox
}

//Display lightbox
function showLightbox(title, source, type, id) {
  document
    .getElementById("main")
    .appendChild(lightbox(title, source, type, id))
  }

//Buttons
//Close lightbox
function closeLightbox() {
  document.querySelector(".lightbox").remove()
}

//Next image
function nextLightbox(source, id) {
  lightboxNextPrev(source, id, "next")
}

//Previous image
function prevLightbox(source, id) {
  lightboxNextPrev(source, id, "prev")
}

// Next image function
async function lightboxNextPrev(source, id, option) {
  
  // Get all medias files
  const { mediaFiltered } = await getPhotographer()
  
  // Get media index
  let mediaIndex = await mediaFiltered.findIndex((media) => media.id == id)
  
  //Navigate through index
  option == "next" ? mediaIndex++ : mediaIndex--
  
  //Check our array position
  const max = mediaFiltered.length
  const min = -1
  if (mediaIndex == min) {
    mediaIndex = max - 1
  } else if (mediaIndex == max) {
    mediaIndex = 0
  }
  
  // Get next or previous media (the new one)
  const newMedia = mediaFiltered[mediaIndex]
  
  // Get new media type
  const newMediaType = newMedia.image ? "image" : "video"
  
  // Get new media source
  const newMediaName =
    newMediaType == "image" ? newMedia.image : newMedia.video
  const newMediaSource = "assets/" + source.split("/")[1] + "/" + newMediaName
  
  // Get new media title
  const newMediaTitle = newMedia.title
  
  // Get new media id
  const newMediaId = newMedia.id
  
  // Get lightbox
  const recupLightbox = document.querySelector(".lightbox")
  
  // Empty lightbox
  document.querySelector(".lightbox").innerHTML = ""
  // Add new content
  lightboxContent(
    newMediaTitle,
    newMediaSource,
    newMediaType,
    newMediaId,
    recupLightbox
  )
}