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

function loadComic() {
    fetch(`/api/comic/`)
    .then(res => res.json())
    .then(data => {
        let comics = data
        if (comics.length > 0) {
            constructComicBox(comics)
        }
    })
}
loadComic()

function constructComicBox(comics) {
    let comicListWrapper = document.querySelector(".comicListWrapper")
    for(let i=0; i<comics.length; i++) {
        let box = `
            <div class="comicBox">
                <div class="comicTitle">
                    ${comics[i].title}
                </div>
                <div class="action">
                    <a href="/admin/comic/${comics[i].id}">Edit</a>
                    <button data-id="${comics[i].id}" data-title="${comics[i].title}" class="deleteComic">Delete</button>
                </div>
            </div>
        `
        comicListWrapper.innerHTML += box
    }
    let deleteComicButton = document.querySelectorAll(".deleteComic")
    deleteComicButton.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault()
            deleteComic(e.target.dataset.id)
        })
    })
}

// SEARCH COMIC
let searchComicInput = document.querySelector(".searchComicInput")
searchComicInput.addEventListener("input", (e) => {
    e.preventDefault()
    let comicListWrapper = document.querySelector(".comicListWrapper")
    let title = e.target.value
    if (title === "") {
        comicListWrapper.innerHTML = ""
        loadComic()
    } else {
        fetch(`/api/comic/search/${title}`)
        .then(res => res.json())
        .then(data => {
            if(data.message) {
                comicListWrapper.innerHTML = data.message
            } else {
                construcSearchResult(data)
            }
        })
    }
})

function construcSearchResult(comics) {
    let comicListWrapper = document.querySelector(".comicListWrapper")
    comicListWrapper.innerHTML = ""
    for(let i=0; i<comics.length; i++) {
        let box = `
            <div class="comicBox">
                <div class="comicTitle">
                    ${comics[i].title}
                </div>
                <div class="action">
                    <a href="/admin/comic/${comics[i].id}">Edit</a>
                    <button data-id="${comics[i].id}" data-title="${comics[i].title}" class="deleteComic">Delete</button>
                </div>
            </div>
        `
        comicListWrapper.innerHTML += box
    }
    let deleteComicButton = document.querySelectorAll(".deleteComic")
    deleteComicButton.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault()
            deleteComic(e.target.dataset.id)
        })
    })
}

function deleteComic(id) {
    let comicListWrapper = document.querySelector(".comicListWrapper")
    let deleteComicBox = document.querySelector(".deleteComicBox")
    let box = `
        <div class="deleteConfirm">
            <div class="optionWrapper">
                <h3>Are you sure?</h3>
                <div class="option">
                    <button id="yes">Yes</button>
                    <button id="no">No</button>
                </div>
            </div>
        </div>
    `
    deleteComicBox.innerHTML += box
    deleteComicBox.style.display = "flex"

    let yesButton = document.getElementById("yes")
    let noButton = document.getElementById("no")

    // DELETE USER
    yesButton.addEventListener("click", function(e) {
        e.preventDefault()
        fetch(`/api/comic/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken
            }
            })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                alert(`${data.message}`)
                comicListWrapper.innerHTML = ""
                loadComic()
            } else {
                console.log(data)
            }
        })
        deleteComicBox.innerHTML = ""
        deleteComicBox.style.display = "none"
    })
    // CANCE DELETE
    noButton.addEventListener("click", (e) => {
        e.preventDefault()
        deleteComicBox.innerHTML = ""
        deleteComicBox.style.display = "none"
    })
}