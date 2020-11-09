function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

var fixAuthor = []

let searchAuthor = document.getElementById("searchAuthor")
searchAuthor.addEventListener("input", (e) => {
    let authorResult = document.querySelector(".authorResult")
    let name = e.target.value
    if(name === "") {
        authorResult.innerHTML = ""
    } else {
        fetch(`/api/author/search/${name}`)
        .then(res => res.json())
        .then(data => {
            let authors = data
            if(data.message) {
                authorResult.innerHTML = data.message
            } else {
                authorResult.innerHTML = ""
                constructAuthorResult(authors)
            }
        })
    }
})

function constructAuthorResult(authors) {
    let authorResult = document.querySelector(".authorResult")
    for(let i=0; i<authors.length; i++) {
        let box = `
            <div class="authorBox">
                <div class="authorName">
                    ${authors[i].name}
                </div>
                <div class="action">
                    <button data-id="${authors[i].id}" data-name="${authors[i].name}" class="addAuthor">Add as author</button>
                </div>
            </div>
        `
        authorResult.innerHTML += box
    }
    let addButton = document.querySelectorAll(".addAuthor")
    addButton.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault()
            addAuthor(e.target.dataset.id, e.target.dataset.name)
        })
    })
}

function addAuthor(authorId, authorName) {
    let toBeAuthor = document.querySelector(".toBeAuthor")
    let authorBoxes =  document.querySelectorAll(".toBeAuthorBox")
    let box = `
        <div class="toBeAuthorBox" data-id="${authorId}" data-name="${authorName}">
            <div class="name">
                ${authorName}
            </div>
            <div class="action">
                <button class="removeAuthor" data-id="${authorId}" data-name="${authorName}">
                    Remove
                </button>
            </div>
        </div>
    `
    if(authorBoxes.length == 0) {
        toBeAuthor.innerHTML += box
        fixAuthor.push(authorId)
    } else {
        let goAdd = true
        for(let i=0; i<fixAuthor.length; i++) {
            if(fixAuthor[i] == authorId) {
                goAdd = false
            }
        }
        if(goAdd) {
            toBeAuthor.innerHTML += box
            fixAuthor.push(authorId)
        }
    }
    let removeButtons = document.querySelectorAll(".removeAuthor")
    removeButtons.forEach(removeBtn => {
        removeBtn.addEventListener("click", (e) => {
            e.preventDefault()
            removeAuthor(e.target.dataset.id)
        })
    })
}

function removeAuthor(authorId) {
    let toBeAuthor = document.querySelector(".toBeAuthor")
    let authorBoxes =  document.querySelectorAll(".toBeAuthorBox")
    let newToBeAuthor
    for(let i=0; i<authorBoxes.length; i++) {
        if(authorBoxes[i].dataset.id == authorId) {
            authorBoxes[i].remove()
        }
    }
    let newAuthor = []
    for(let i=0; i<fixAuthor.length; i++) {
        if(fixAuthor[i] !== authorId) {
            newAuthor.push(fixAuthor[i])
        }
    }
    fixAuthor = newAuthor
}

let form = document.getElementById("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let content = CKEDITOR.instances['id_content'].getData()
    let description = CKEDITOR.instances['id_description'].getData()
    let formData = new FormData(form)
    fetch('/admin/create/writing/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
            author: fixAuthor,
            title: formData.get("title"),
            image_cover: formData.get("image_cover"),
            content: content,
            description: description,
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            location.assign("/admin/writing")
        }
    })
})