function loadWriting() {
    fetch(`/api/writing_list`)
    .then(res => res.json())
    .then(data => {
        let writing = data
        constructWritingBox(writing)
    })
}
loadWriting()

function constructWritingBox(writing) {
    let writingWrapper = document.querySelector(".writing-wrapper")
    for(let i=0; i<writing.length; i++) {
        if(writing[i].image_cover != "") {
            let box = `
                <div class="writing-box">
                    <div class="title">
                        <h1>${writing[i].title}</h1>
                    </div>
                    <div class="image-cover">
                        <img src="${writing[i].image_cover}" alt="">
                    </div>
                    <div class="author">
                        <h4>Oleh ${writing[i].author_name}</h4>
                    </div>
                    <div class="description">
                        ${writing[i].description}
                    </div>
                    <div class="link">
                        <a href="/writing/${writing[i].id}">Read more</a>
                    </div>
                </div>
            `
            writingWrapper.innerHTML += box
        } else {
            let box = `
            <div class="writing-box">
                <div class="title">
                    <h1>${writing[i].title}</h1>
                </div>
                <div class="author">
                    <h4>Oleh ${writing[i].author_name}</h4>
                </div>
                <div class="description">
                    ${writing[i].description}
                </div>
                <div class="link">
                    <a href="/writing/${writing[i].id}">Read more</a>
                </div>
            </div>
        `
        writingWrapper.innerHTML += box
        }
    }
}