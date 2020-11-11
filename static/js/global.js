$("body").hide().fadeIn(1000)

const navHamburger = document.getElementById("navHamburger")
const bigBoxContainer = document.querySelector(".bigBoxContainer")
navHamburger.addEventListener("click", function(e) {
    let bigBox = `
        <h1>Metagius</h1>
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
    bigBoxContainer.style.flexDirection = "column"
    bigBoxContainer.innerHTML += `<div class="closeBigBox">&#x2716;</div>`
    $(".closeBigBox").fadeIn(1000)
    $(".closeBigBox").click(function() {
        $(".bigBoxContainer").slideUp(1000)
        $(".closeBigBox").fadeOut(800)
    })
})

// HANDLE LOGOUT
const logoutButton = document.getElementById("logout")
logoutButton.addEventListener("click", (e) => {
    e.preventDefault()
    let logoutConfirmWrapper = document.getElementById("logoutConfirmWrapper")
    let logoutConfirm = `
        <div id="logoutConfirm">
            <h1>Are you sure?</h1>
            <div class="confirm">
                <button id="yesLogout" data-option="yes" class="confirmOption" autofocus>Yes</button>
                <button id="noLogout" data-option="no" class="confirmOption">No</button>
            </div>
        </div>
    `
    logoutConfirmWrapper.innerHTML += logoutConfirm
    logoutConfirmWrapper.style.display = "flex"
    let optionButton = document.querySelectorAll(".confirmOption")
    // Immdiaetley focus YES Button
    optionButton[0].focus()
    optionButton.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault()
            if(btn.dataset.option == "yes") {
                location.assign("/logout")
            } else {
                logoutConfirmWrapper.style.display = "none"
                logoutConfirmWrapper.innerHTML = ""
            }
        })
    })

    logoutConfirmWrapper.addEventListener("click", (e) => {
        e.preventDefault()
        logoutConfirmWrapper.style.display = "none"
        logoutConfirmWrapper.innerHTML = ""
    })

})