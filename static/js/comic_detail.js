const comicId = document.getElementById("comicId").dataset.id

function loadComic() {
    fetch(`/api/comic/${comicId}`)
    .then(res => res.json())
    .then(data => {
        let comic = data
        constructComicBox(comic)
        constructComicAuthor(comic.author)
    })
}
loadComic()

function constructComicBox(comic) {
    let comicWrapper = document.querySelector(".comicWrapper")
    let authorsName = getAuhtorsName(comic.author)
    
    let box = `
        <div class="title">
            <h1 id="comicTitle" >${comic.title}</h1>
        </div>
        <div class="author">
            <h4>Created by ${authorsName}</h4>
        </div>
        <div class="content">
            ${comic.content}
        </div>
    `
    comicWrapper.innerHTML += box
}

function getAuhtorsName(authors) {
    let authorName = ``
    for(let i=0; i<authors.length; i++) {
        // More than one author
        if(authors.length > 1) {
            if(i == 0) {
                authorName += `<a href="/author/${authors[i].name}">${authors[i].name}</a>`
            } else if (i > 0 && i !== authors.length-1) {
                authorName += `, ` + `<a href="/author/${authors[i].name}">${authors[i].name}</a>`
            } else {
                authorName +=  ` and ` + `<a href="/author/${authors[i].name}">${authors[i].name}</a>`
            }
        } else {
            authorName += `<a href="/author/${authors[i].name}">${authors[i].name}</a>`
        }
    }
    return authorName
}

function constructComicAuthor(authors) {
    let boxWrapper = `
        <div class="contentAuthorBox">
            <h1>Author</h1>
        </div>
    `
    let comciWrapper = document.querySelector(".comicWrapper")
    comciWrapper.innerHTML += boxWrapper
    let contentAuthorBox = document.querySelector(".contentAuthorBox")
    
    for(let i=0; i<authors.length; i++) {
        if(authors[i].profile_photo) {
            let box = `
                <div class="authorBox">
                    <div class="authorHeader">
                        <div class="authorPhoto">
                            <img src="${authors[i].profile_photo}">
                        </div>
                        <div class="authorName">
                            <a href="/author/${authors[i].name}">${authors[i].name}</a>
                        </div>
                    </div>
                    <div class="authorDescription">
                        ${authors[i].description}
                    </div>
                </div>
            `
            contentAuthorBox.innerHTML += box
        } else {
            let box = `
                <div class="authorBox">
                <div class="authorHeader">
                    <div class="authorName">
                        <a href="/author/${authors[i].name}">${authors[i].name}</a>
                    </div>
                </div>
                    <div class="authorDescription">
                        ${authors[i].description}
                    </div>
                </div>
            `
            contentAuthorBox.innerHTML += box
        }
    }
}

