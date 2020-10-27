let burger = document.getElementById("burger")
let burgerOriginal = burger.innerHTML
let newNav = document.querySelector(".newNav")
burger.addEventListener("click", (e) => {
    e.preventDefault()
    burger.style.display = "none"
    newNav.style.display = "flex"
    newNav.style.flexDirection = 'column'
    let closeNav = document.getElementById("closeNav")
    closeNav.addEventListener("click", (e) => {
        e.preventDefault()
        newNav.style.display = "none"
        burger.style.display = "block"
    })
})