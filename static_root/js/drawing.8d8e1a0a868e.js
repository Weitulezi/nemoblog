
const images = document.querySelectorAll(".image")

images.forEach(image => {
    image.addEventListener('click', (e) => {
        e.preventDefault()
        const imgSrc = e.target.src
        const imgId = e.target.dataset.id
        const drawingPage = document.querySelector(".drawing-page")
        const bigScreenWrapper = document.querySelector(".drawing-big-screen")
        const wrapper = document.querySelector(".bigScreen-wrapper")
        const bigScreen = document.getElementById("big-screen")
        const drawingLink = document.getElementById("drawing-link")
        // drawingPage.style.display ="none"
        bigScreenWrapper.style.display = "flex"
        $("#big-screen").hide().slideDown(1500)
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
}