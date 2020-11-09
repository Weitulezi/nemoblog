
const writingId = document.getElementById("writingId").dataset.id
function loadWriting() {
    fetch(`/api/writing/${writingId}/`)
    .then(res => res.json())
    .then(data => {
        let writing = data
        constructWritingBox(writing)
        constructContentAuthorBox(writing.author)
    })
}
loadWriting()

function constructWritingBox(writing) {
    const authorsName = getAuthorsName(writing)
    const writingBox = document.getElementById("writingBox")
    if(writing.image_cover) {
        let box = `
            <div class="title">
                <h1 id="writingTitle">${writing.title}</h1>
            </div>
            <div class="image-cover">
                <img src="${writing.image_cover}" alt="">
            </div>
            <div class="author">
                <h4>Created by ${authorsName}</h4>
            </div>
            <div class="content">
                ${writing.content}
            </div>
        `
        writingBox.innerHTML += box
    } else {
        let box = `
            <div class="title">
                <h1 id="writingTitle">${writing.title}</h1>
            </div>
            <div class="author">
                <h4>Created by ${authorsName}</h4>
            </div>
            <div class="content">
                ${writing.content}
            </div>
        `
        writingBox.innerHTML += box
    }
}

function getAuthorsName(writing) {
    let authorsName = ""
    for(let i=0; i<writing.author.length; i++) {
        if(writing.author.length > 1) {
            if(i == 0) {
                authorsName += `<a href="/author/${writing.author[i].name}">${writing.author[i].name}</a>`
            } else if (writing.author[i] > 0 && writing.author[i] !== writing.author.length-1) {
                authorsName += ", " + `<a href="/author/${writing.author[i].name}">${writing.author[i].name}</a>`
            } else {
                authorsName += " and " + `<a href="/author/${writing.author[i].name}">${writing.author[i].name}</a>`
            }
        } else {
            authorsName += `<a href="/author/${writing.author[i].name}">${writing.author[i].name}</a>`
        }
    }
    return authorsName
}

function constructContentAuthorBox(authors) {
    let boxWrapper = `
        <div class="contentAuthorBox">
            <h1>Author</h1>
        </div>
    `
    let writingBox = document.getElementById("writingBox")
    writingBox.innerHTML += boxWrapper
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