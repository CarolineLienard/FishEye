function photographerFactory(data, mediaAll) {
    const { name, portrait, city, country, tagline, price, id, likes } = data
    const picture = "assets/photographers/" + portrait
    
    // Create photographers cards
    function getUserCardDOM() {
    
        // Main card
        const article = document.createElement('article')
        const img = document.createElement('img')
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Vignette du photographe : " + name);

        // Name
        const h2 = document.createElement('h2')
        h2.textContent = name

        // Adresse
        const adresse = document.createElement ("p")
        adresse.textContent = city + ", " + country
        adresse.classList.add('adresse')

        // Tagline
        const tag = document.createElement ("p")
        tag.textContent = tagline
        tag.classList.add('tagline')

        // Price rates
        const priceTag = document.createElement ("p")
        priceTag.textContent = price + "€/jour"
        priceTag.classList.add('price')

        // Profile link
        const link = document.createElement ('a')
        link.setAttribute('href', "photographer.html?id=" + id);

        // Display elements
        article.appendChild(link)
        link.appendChild(img)
        link.appendChild(h2)
        article.appendChild(adresse)
        article.appendChild(tag)
        article.appendChild(priceTag)
        return (article)
    }

    // Photographer page
    function getUserDetail() {

        // Main card
        const article = document.createElement('article')
        const divGauche = document.createElement('div')
        const divDroite = document.createElement('div')
        const divCentre = document.createElement('div')

        // Name
        const h2 = document.createElement('h2')
        h2.textContent = name
    
        //Adress
        const adresse = document.createElement("h2")
        adresse.textContent = `${city}, ${country}`
        adresse.classList.add("adresse")

        //Tagline
        const tag = document.createElement("p")
        tag.textContent = tagline
        tag.classList.add("tagline")

        // Contact Button
        const button = document.createElement("button")
        button.textContent = "Contactez moi"
        button.classList.add("contact_button")
        button.setAttribute("type", "button")
        button.setAttribute("onclick", "displayModal()")

        //Image
        const img = document.createElement("img")
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Vignette de contact : " + name)

        //Display elements
        article.appendChild(divGauche)
        article.appendChild(divCentre)
        article.appendChild(divDroite)
        divGauche.appendChild(h2)
        divGauche.appendChild(adresse)
        divGauche.appendChild(tag)
        divCentre.appendChild(button)
        divDroite.appendChild(img)
        return article
    }

    // Get likes
    function getUserLikes() {
        let numLikes = new Number()
        mediaAll.forEach((media) => {
            numLikes += media.likes
        })
        const countLikes = document.createElement("div")
        countLikes.classList.add("countLikes")
        const divGauche = document.createElement("div")
        const divDroite = document.createElement("div")

        const span = document.createElement("span")
        span.textContent = numLikes

        const i = document.createElement("i")
        i.classList.add("fas")
        i.classList.add("fa-heart")

        const p = document.createElement("p")
        p.textContent = price + "€ / jour"

        countLikes.appendChild(divGauche)
        countLikes.appendChild(divDroite)
        divGauche.appendChild(span)
        divGauche.appendChild(i)
        divDroite.appendChild(p)

        return countLikes
    }
    return { 
        name, 
        picture, 
        city, 
        country, 
        tagline, 
        price, 
        id,
        likes,
        getUserCardDOM,
        getUserDetail,
        getUserLikes,
    }
}

// Display medias
function mediaFactory(media, photographers, index) {
    const { title, image, video, likes, date, price, id } = media
    let { name } = photographers[0]
    name = name.split(" ")[0].replace("-", " ")

    let type = ""
    let source = ""
    if (image) {
        type = 'image'
        source = `assets/${name}/${image}`
    } else {
        type = 'video';
        source = `assets/${name}/${video}`
    }


    //Medias cards
    function getMediaCardDom() {
        const article = document.createElement("article")
        
        //Thumbnail
        let thumbnail = {}
        type == "image"
        ? (thumbnail = document.createElement('img'))
        : (thumbnail = document.createElement('video'))
        thumbnail.setAttribute('src', source)
        thumbnail.addEventListener('click', () => {
            showLightbox(title, source, type, id)
        })
        thumbnail.setAttribute('tabindex', index)
        thumbnail.addEventListener('keydown', function(e) {
            if (e.code == "Enter") {
             showLightbox(title, source, type, id) 
            }
        })
        type == "image" &&
        thumbnail.setAttribute("alt", "Vignette de media : " + title)
        const desc = document.createElement("div");

        // Media title
        const h2 = document.createElement("h2")
        h2.textContent = title

        // Media likes
        const divLikes = document.createElement("div")
        divLikes.classList.add("likes")
        divLikes.setAttribute('alt', 'Nombre de likes : ' + likes)
        
        //Tagline
        const likeTag = document.createElement("p")
        likeTag.textContent = likes

        const imageLike = document.createElement("i")
        imageLike.classList.add("far")
        imageLike.classList.add("fa-heart")

        article.appendChild(thumbnail)
        article.appendChild(desc)
        desc.appendChild(h2)
        desc.appendChild(divLikes)
        divLikes.appendChild(likeTag)
        divLikes.appendChild(imageLike)
        divLikes.addEventListener('click', () => {
            addLikes(likeTag, imageLike)
        })
        return article
    }
    return {
        title,
        image,
        video,
        likes,
        date,
        price,
        type,
        source,
        id,
        getMediaCardDom,
    }
}

//Like function
function addLikes(likeTag, imageLike) {
    if (imageLike.classList.contains("far")) {
        likeTag.textContent++
        document.querySelector(".countLikes span").textContent++
        imageLike.classList.replace("far", "fas")
        return true
      }
      {
        likeTag.textContent--
        document.querySelector(".countLikes span").textContent--
        imageLike.classList.replace("fas", "far")
        return false
      }
}