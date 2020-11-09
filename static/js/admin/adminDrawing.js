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

function loadDrawing() {
    fetch(`/api/drawing/`)
    .then(res => res.json())
    .then(data => {
        constructDrawingBox(data)
    })
}
loadDrawing()

function constructDrawingBox(drawings) {
    let drawingListWrapper = document.querySelector(".drawingListWrapper")
    for(let i=0; i<drawings.length; i++) {
        let box = `
            <div class="drawingBox">
                <div class="drawingTitle">
                    ${drawings[i].title}
                </div>
                <div class="action">
                    <a href="/admin/drawing/${drawings[i].id}">Edit</a>
                    <button data-id="${drawings[i].id}" data-title="${drawings[i].title}" class="deleteDrawing">Delete</button>
                </div>
            </div>
        `
        drawingListWrapper.innerHTML += box
    }
    let deleteDrawingButtons = document.querySelectorAll(".deleteDrawing")
    deleteDrawingButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            deleteDrawing(e.target.dataset.id)
        })
    })
}

let searchDrawingInput = document.querySelector(".searchDrawingInput")
searchDrawingInput.addEventListener("input", (e) => {
    e.preventDefault()
    let drawingListWrapper = document.querySelector(".drawingListWrapper")
    let title = e.target.value
    if(title === "") {
        drawingListWrapper.innerHTML = ""
        loadDrawing()
    } else {
        fetch(`/api/drawing/search/${title}`)
        .then(res => res.json())
        .then(data => {
            if(data.message) {
                drawingListWrapper.innerHTML = data.message
            } else {
                drawingListWrapper.innerHTML = ""
                constructSearchResult(data)
            }
        })
    }
})

function constructSearchResult(drawings) {
    let drawingListWrapper = document.querySelector(".drawingListWrapper")
    for(let i=0; i<drawings.length; i++) {
        let box = `
            <div class="drawingBox">
                <div class="drawingTitle">
                    ${drawings[i].title}
                </div>
                <div class="action">
                    <a href="/admin/drawing/${drawings[i].id}">Edit</a>
                    <button data-id="${drawings[i].id}" data-title="${drawings[i].title}" class="deleteDrawing">Delete</button>
                </div>
            </div>
        `
        drawingListWrapper.innerHTML += box
    }
    let deleteDrawingButtons = document.querySelectorAll(".deleteDrawing")
    deleteDrawingButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            deleteDrawing(e.target.dataset.id)
        })
    })
}

function deleteDrawing(id) {
    let drawingListWrapper = document.querySelector(".drawingListWrapper")
    let deleteDrawingBox = document.querySelector(".deleteDrawingBox")
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
    deleteDrawingBox.innerHTML += box
    deleteDrawingBox.style.display = "flex"

    let yesButton = document.getElementById("yes")
    let noButton = document.getElementById("no")

    // DELETE USER
    yesButton.addEventListener("click", function(e) {
        e.preventDefault()
        fetch(`/api/drawing/${id}`, {
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
                drawingListWrapper.innerHTML = ""
                loadDrawing()
            } else {
                alert(`${data.message}`)
                drawingListWrapper.innerHTML = ""
            }
        })
        deleteDrawingBox.innerHTML = ""
        deleteDrawingBox.style.display = "none"
    })
    // CANCE DELETE
    noButton.addEventListener("click", (e) => {
        e.preventDefault()
        deleteDrawingBox.innerHTML = ""
        deleteDrawingBox.style.display = "none"
    })
}