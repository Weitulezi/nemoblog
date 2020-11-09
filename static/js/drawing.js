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

const images = document.querySelectorAll(".image")

images.forEach(image => {
    image.addEventListener('click', (e) => {
        e.preventDefault()
        const imgSrc = e.target.src
        const imgId = e.target.dataset.id
        imageClick(imgId)
        const drawingPage = document.querySelector(".drawing-page")
        const bigScreenWrapper = document.querySelector(".drawing-big-screen")
        const wrapper = document.querySelector(".bigScreen-wrapper")
        const bigScreen = document.getElementById("big-screen")
        const drawingLink = document.getElementById("drawing-link")
        // drawingPage.style.display ="none"
        $(".drawing-big-screen").slideDown(1000)
        bigScreenWrapper.style.display = "flex"
        $("#big-screen").hide().fadeIn(1000)
        drawingLink.href = `/drawing/${imgId}`
        bigScreen.src = imgSrc

        const closeButton = document.querySelector(".closeButton")
        closeButton.addEventListener("click", closeScreen)
    })
})

const closeScreen = (e) => {
    const drawingPage = document.querySelector(".drawing-page")
    const bigScreenWrapper = document.querySelector(".drawing-big-screen")
    const bigScreen = document.getElementById("big-screen")
    e.preventDefault()
    $(".drawing-big-screen").slideUp(1000)
    $("#big-screen").fadeOut(800)
    $(".drawing-page").fadeIn(1000)
    // drawingPage.style.display = "flex"
    const drawingLink = document.getElementById("drawing-link")
    drawingLink.href = ""
}

function imageClick(imageId) {
    fetch("/handle_drawing_click/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({
            imageId: imageId
        })
    })
    .then(res => res.json())
    .then(data => {
    })
}