
const images = document.querySelectorAll(".image")

images.forEach(image => {
    image.addEventListener('click', (e) => {
        e.preventDefault()
        const imgSrc = e.target.src
        const drawingPage = document.querySelector(".drawing-page")
        const bigScreenWrapper = document.querySelector(".drawing-big-screen")
        const wrapper = document.querySelector(".bigScreen-wrapper")
        const bigScreen = document.getElementById("big-screen")
        drawingPage.style.display ="none"
        bigScreenWrapper.style.display = "flex"
        $("#big-screen").hide().slideDown(1500)
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
    $(".drawing-big-screen").hide(1000)
    $(".drawing-page").fadeIn(1500)
    // drawingPage.style.display = "flex"
}