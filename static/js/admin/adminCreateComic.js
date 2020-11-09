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

// Array to store id of Author, to bind it to Fetch API
var listOfAuthor = []

const searchInput = document.getElementById("searchAuthorInput")
searchInput.addEventListener("input", (e) => {
    let searchResult = document.querySelector(".searchResult")
    let authorName = e.target.value
    if(authorName === "") {
        searchResult.innerHTML = ""
    } else {
        fetch(`/api/author/search/${authorName}`)
        .then(res => res.json())
        .then(data => {
            if(data.message) {
                searchResult.innerHTML = data.message
            } else {
                searchResult.innerHTML = ""
                constructAuthorBox(data)
            }
        })
    }
})

function constructAuthorBox(authors) {
    let searchResult = document.querySelector(".searchResult")
    for(let i=0; i<authors.length; i++) {
        let box = `
            <div class="authorResultBox">
                <div class="authorName">
                    ${authors[i].name}
                </div>
                <button class="addAuthor" data-id="${authors[i].id}" data-name="${authors[i].name}">addAuthor</button>
            </div>
        `
        searchResult.innerHTML += box
    }
    let addAuthorButton = document.querySelectorAll(".addAuthor")
    addAuthorButton.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault()
            addAuthor(e.target.dataset.id, e.target.dataset.name)
        })
    })
}

function addAuthor(id, name) {
    let toBeAuthor = document.querySelector(".toBeAuthor")
    let authorBoxes = document.querySelectorAll(".authorBox")
    let box = `
        <div class="authorBox" data-id="${id}" data-name="${name}">
            <div class="name">
                ${name}
            </div>
            <div class="action">
                <button class="removeAuthor" data-id="${id}" data-name="${name}">
                    Remove
                </button>
            </div>
        </div>
    `
    if(authorBoxes.length == 0) {
        toBeAuthor.innerHTML += box
        listOfAuthor.push(id)
    } else {
        let goAdd = true
        for(let i=0; i<authorBoxes.length; i++) {
            if(authorBoxes[i].dataset.id === id) {
                goAdd = false
            }
        }
        if(goAdd) {
            toBeAuthor.innerHTML += box
            listOfAuthor.push(id)
        }
    }

    let removeButtons = document.querySelectorAll(".removeAuthor")
    removeButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault()
            removeAuthor(e.target.dataset.id)
        })
    })
}

function removeAuthor(id) {
    console.log(listOfAuthor, "old")
    let authorBoxes = document.querySelectorAll(".authorBox")
    let newAuthors = []
    authorBoxes.forEach(box => {
        if(box.dataset.id == id) {
            box.remove()
        }
    })
    listOfAuthor.forEach(i => {
        if(i !== id) {
            newAuthors.push(i)
        }
    })
    listOfAuthor = newAuthors
}

let form = document.getElementById("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let content = CKEDITOR.instances['id_content'].getData()
    let description = CKEDITOR.instances['id_description'].getData()
    let isPublic;
    if (form.isPublic.checked) {
        isPublic = true
    } else {
        isPublic = false
    }
    console.log(isPublic)
    fetch('/admin/create/comic/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
            author: listOfAuthor,
            title: form.title.value,
            image_cover: form.image_cover.value,
            content: content,
            description: description,
            isPublic: isPublic
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            location.assign("/admin/comic")
        }
    })
})
