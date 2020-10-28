$(".curtainButton").click(function () {
    const bigBoxContainer = document.querySelector(".bigBoxContainer")
    let bigBox = `
        <div class="bigBox">
            <div class="link">
                <a href="/writing">Writing</a>
            </div>
            <div class="link">
                <a href="/comic">Comic</a>
            </div>
            <div class="link">
                <a href="/drawing">Drawing</a>
            </div>
            <div class="link">
                <a href="/about">About</a>
            </div>
        </div>
    `
    bigBoxContainer.innerHTML = bigBox
    $(".bigBoxContainer").slideDown(1000)
    bigBoxContainer.style.display = "flex"
    bigBoxContainer.innerHTML += `<div class="closeBigBox">&#x2716;</div>`
    $(".closeBigBox").fadeIn(1000)
    $(".closeBigBox").click(function() {
        $(".bigBoxContainer").slideUp(1000)
        $(".closeBigBox").fadeOut(800)
    })
})

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